// app/api/proxy/route.ts
import { NextRequest } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Domaines autorisés à être proxyfiés
const ALLOWLIST = [
  "genial-cogwheel-567577.framer.app",
  "secured-principles-292763.framer.app",
  "generous-tools-627083.framer.app",
  "daring-remember-772934.framer.app",
];
function isAllowedHost(hostname: string) {
  const h = hostname.toLowerCase();
  return ALLOWLIST.some((d) => h === d || h.endsWith(`.${d}`));
}

function parseRemove(params: URLSearchParams) {
  const out: string[] = [];
  for (const v of params.getAll("remove")) {
    v.split(",").forEach((s) => {
      const t = s.trim();
      if (t) out.push(t);
    });
  }
  // Badge Framer par défaut
  out.push("#__framer-badge-container", ".__framer-badge-container");
  return Array.from(new Set(out)).slice(0, 50);
}

/**
 * Extrait { entreprise, ville, tel, mail } depuis le pathname.
 * Formats acceptés après /api/proxy :
 *   - /api/proxy/<modele>/<entreprise>-<ville>-<tel>-<mail>
 *   - /api/proxy/<modele>/<entreprise>/<ville>/<tel>/<mail>
 *   - /api/proxy/<entreprise>-<ville>-<tel>-<mail>
 *   - /api/proxy/<entreprise>/<ville>/<tel>/<mail>
 */
function parseSlugVars(pathname: string) {
  const parts = pathname.split("/").filter(Boolean); // ex: ["api","proxy","maquette-1","Dentina-Paris-07..."]
  const idx = parts.indexOf("proxy");
  const tail = idx >= 0 ? parts.slice(idx + 1) : [];

  let entreprise = "";
  let ville = "";
  let tel = "";
  let mail = "";

  const takeFromArray = (arr: string[]) => {
    entreprise = decodeURIComponent(arr[0] || "");
    ville = decodeURIComponent(arr[1] || "");
    tel = decodeURIComponent(arr[2] || "");
    // l'email peut contenir des tirets, on regroupe le reste
    mail = decodeURIComponent(arr.slice(3).join("-") || "");
  };

  if (tail.length >= 1) {
    // Cas « tout dans un seul segment » (souvent après un nom de maquette)
    // ex: ["maquette-1","Dentina-Paris-0754-dentina@gmail.com"]
    const maybePacked = tail[tail.length - 1]; // dernier segment
    const packed = maybePacked.split("-");
    if (packed.length >= 4) {
      takeFromArray(packed);
    }
  }

  // Cas segments séparés : /proxy/maquette-1/Dentina/Paris/0754/dentina@gmail.com
  if ((!entreprise || !ville || !tel || !mail) && tail.length >= 4) {
    const last4 = tail.slice(-4).map(decodeURIComponent);
    entreprise = entreprise || last4[0] || "";
    ville = ville || last4[1] || "";
    tel = tel || last4[2] || "";
    mail = mail || last4[3] || "";
  }

  // Nettoyage simple
  tel = tel.replace(/[^\d+().\s-]/g, "").trim(); // garde chiffres, +, (), -, espaces, .
  mail = mail.trim();

  return { entreprise, ville, tel, mail };
}

/**
 * Remplace les mots ciblés UNIQUEMENT dans les textes visibles (pas dans <script>, <style>, ni les attributs).
 * On découpe l'HTML sur les blocs script/style, on remplace seulement dans les parties sûres,
 * puis on recolle.
 */
function replaceVisibleText(
  html: string,
  map: { entreprise: string; ville: string; tel: string; mail: string }
) {
  // Séparer scripts et styles pour ne pas y toucher
  const splitter =
    /(<script\b[^>]*>[\s\S]*?<\/script>)|(<style\b[^>]*>[\s\S]*?<\/style>)/gi;

  const chunks: string[] = [];
  let lastIndex = 0;
  let m: RegExpExecArray | null;

  while ((m = splitter.exec(html))) {
    const matchStart = m.index;
    const matchEnd = splitter.lastIndex;
    // Partie « sûre » avant le bloc script/style
    chunks.push(
      html
        .slice(lastIndex, matchStart)
        .replace(/>([^<]+)</g, (_, text) => {
          let t = text;
          if (map.entreprise) t = t.replace(/\bentreprise\b/gi, map.entreprise);
          if (map.ville) t = t.replace(/\bville\b/gi, map.ville);
          if (map.tel) t = t.replace(/\btél\b/gi, map.tel);
          if (map.mail) t = t.replace(/\bmail\b/gi, map.mail);
          return `>${t}<`;
        })
    );
    // Conserver tel quel le bloc script/style
    chunks.push(html.slice(matchStart, matchEnd));
    lastIndex = matchEnd;
  }

  // Reste après le dernier script/style
  chunks.push(
    html.slice(lastIndex).replace(/>([^<]+)</g, (_, text) => {
      let t = text;
      if (map.entreprise) t = t.replace(/\bentreprise\b/gi, map.entreprise);
      if (map.ville) t = t.replace(/\bville\b/gi, map.ville);
      if (map.tel) t = t.replace(/\btél\b/gi, map.tel);
      if (map.mail) t = t.replace(/\bmail\b/gi, map.mail);
      return `>${t}<`;
    })
  );

  return chunks.join("");
}

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get("url");
  const disableJs = req.nextUrl.searchParams.get("disableJs") === "1";
  const removeList = parseRemove(req.nextUrl.searchParams);

  if (!url) return new Response("Missing url", { status: 400 });

  let u: URL;
  try {
    u = new URL(url);
  } catch {
    return new Response("Bad url", { status: 400 });
  }
  if (!/^https?:$/.test(u.protocol)) return new Response("Only http/https", { status: 400 });
  if (!isAllowedHost(u.hostname)) return new Response("Domain not allowed", { status: 403 });

  // Variables depuis le SLUG
  const { entreprise, ville, tel, mail } = parseSlugVars(req.nextUrl.pathname);

  // Origine de TON site (utile pour l’injector externe)
  const proto = req.headers.get("x-forwarded-proto") || "https";
  const host = req.headers.get("host") || "";
  const selfOrigin = `${proto}://${host}`;

  const upstream = await fetch(u.toString(), {
    headers: {
      "user-agent": req.headers.get("user-agent") || "Mozilla/5.0",
      "accept-language": req.headers.get("accept-language") || "fr-FR,fr;q=0.9",
    },
    redirect: "follow",
  });

  const contentType = upstream.headers.get("content-type") || "";
  if (!contentType.includes("text/html")) {
    const buf = await upstream.arrayBuffer();
    return new Response(buf, {
      status: upstream.status,
      headers: {
        "content-type": contentType,
        "cache-control": "no-store",
      },
    });
  }

  let html = await upstream.text();

  // 1) <base> + CSS de pré-hide + masquage immédiat des éléments à retirer
  if (/<head[^>]*>/i.test(html)) {
    const cssHideSelected = removeList.length
      ? `${removeList.join(",")}{display:none !important;visibility:hidden !important}`
      : "";
    html = html.replace(
      /<head[^>]*>/i,
      (m) =>
        `${m}<base href="${u.origin}">` +
        (cssHideSelected ? `<style id="proxy-hide">${cssHideSelected}</style>` : "")
    );
  }

  // 2) Option : couper le JS du site proxifié
  if (disableJs) {
    html = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "");
    html = html.replace(/<link[^>]+rel=["']modulepreload["'][^>]*>/gi, "");
  }

  // 3) Remplacement des textes visibles par les variables du slug
  if (entreprise || ville || tel || mail) {
    html = replaceVisibleText(html, {
      entreprise,
      ville,
      tel,
      mail,
    });
  }

  // 4) Injection du script **externe** uniquement pour suppression (plus de trad)
  if (removeList.length) {
    const sp = new URLSearchParams();
    for (const sel of removeList) sp.append("remove", sel);
    const injectorSrc = `${selfOrigin}/api/injector?${sp.toString()}`;
    const tag = `<script src="${injectorSrc}" defer></script>`;
    html = /<\/body>/i.test(html) ? html.replace(/<\/body>/i, tag + "</body>") : html + tag;
  }

  return new Response(html, {
    status: upstream.status,
    headers: { "content-type": "text/html; charset=utf-8", "cache-control": "no-store" },
  });
}
