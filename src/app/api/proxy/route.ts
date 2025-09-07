// app/api/proxy/route.ts
import { NextRequest } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Domaines autorisés à être proxyfiés
const ALLOWLIST = ["jovial-sphere-930683.framer.app", "familiar-report-107436.framer.app", "genial-cogwheel-567577.framer.app","welcome-pitch-778087.framer.app", "ancient-favorites-079735.framer.app", "energetic-minimalist-299317.framer.app","jolly-overlays-247575.framer.app","hopeful-copywriter-299860.framer.app"];
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

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get("url");
  const disableJs = req.nextUrl.searchParams.get("disableJs") === "1";
  const removeList = parseRemove(req.nextUrl.searchParams);

  if (!url) return new Response("Missing url", { status: 400 });

  let u: URL;
  try { u = new URL(url); } catch { return new Response("Bad url", { status: 400 }); }
  if (!/^https?:$/.test(u.protocol)) return new Response("Only http/https", { status: 400 });
  if (!isAllowedHost(u.hostname)) return new Response("Domain not allowed", { status: 403 });

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
      headers: { "content-type": contentType, "cache-control": "no-store" },
    });
  }

  let html = await upstream.text();

  // 1) <base> + CSS de pré-hide (pour éviter le flash) + CSS de masquage immédiat des éléments à retirer
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

  // 3) Injection du script **externe** uniquement pour suppression (plus de trad)
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
