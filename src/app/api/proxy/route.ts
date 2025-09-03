// app/api/proxy/route.ts
import { NextRequest } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Autoriser ce(s) domaine(s) en proxy
const ALLOWLIST = ["portavia.framer.website"];
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
  // Supprimer le badge Framer par défaut
  out.push("#__framer-badge-container", ".__framer-badge-container");
  return Array.from(new Set(out)).slice(0, 50);
}

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get("url");
  const translateTo = (req.nextUrl.searchParams.get("translate") || "").trim().toLowerCase(); // ex: "fr"
  const disableJs = req.nextUrl.searchParams.get("disableJs") === "1";
  const removeList = parseRemove(req.nextUrl.searchParams);

  if (!url) return new Response("Missing url", { status: 400 });

  let u: URL;
  try { u = new URL(url); } catch { return new Response("Bad url", { status: 400 }); }
  if (!/^https?:$/.test(u.protocol)) return new Response("Only http/https", { status: 400 });
  if (!isAllowedHost(u.hostname)) return new Response("Domain not allowed", { status: 403 });

  // origine publique de TON site (utile pour URLs absolues en présence de <base>)
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
      headers: { "content-type": contentType, "cache-control": "no-store" },
    });
  }

  let html = await upstream.text();

  // 1) <base> + CSS pour cacher immédiatement les éléments à retirer
  if (/<head[^>]*>/i.test(html)) {
    const cssHide = removeList.length
      ? `${removeList.join(",")}{display:none !important;visibility:hidden !important}`
      : "";
    html = html.replace(
      /<head[^>]*>/i,
      (m) => `${m}<base href="${u.origin}">` + (cssHide ? `<style id="proxy-hide">${cssHide}</style>` : "")
    );
  }

  // 2) Option : couper le JS du site proxifié
  if (disableJs) {
    html = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "");
    html = html.replace(/<link[^>]+rel=["']modulepreload["'][^>]*>/gi, "");
  }

  // 3) Injection du script **externe** (pas inline) pour traduction & suppression
  if (translateTo || removeList.length) {
    const sp = new URLSearchParams();
    if (translateTo) sp.set("translate", translateTo);
    for (const sel of removeList) sp.append("remove", sel);
    const injectorSrc = `${selfOrigin}/api/injector?${sp.toString()}`;
    const tag = `<script src="${injectorSrc}" defer></script>`;

    html = /<\/body>/i.test(html)
      ? html.replace(/<\/body>/i, tag + "</body>")
      : html + tag;

    if (translateTo) {
      html = html.replace(
        /<html([^>]*)lang=["'][^"']*["']([^>]*)>/i,
        '<html$1 lang="fr"$2>'
      );
    }
  }

  return new Response(html, {
    status: upstream.status,
    headers: { "content-type": "text/html; charset=utf-8", "cache-control": "no-store" },
  });
}
