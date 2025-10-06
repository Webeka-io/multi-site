// src/app/api/proxy/route.ts
import { NextRequest } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ALLOWLIST = [
  "genial-cogwheel-567577.framer.app",
  "secured-principles-292763.framer.app",
  "generous-tools-627083.framer.app",
  "daring-remember-772934.framer.app",
  "drivora-wcopilot.webflow.io",
  "welcome-pitch-778087.framer.app",
  "hopeful-copywriter-299860.framer.app",
  "traditional-accessibility-641041.framer.app",
  "familiar-report-107436.framer.app",
  "jovial-sphere-930683.framer.app/fr/",
  "jolly-overlays-247575.framer.app",
  "moccasin-gift-930162.framer.app",
  "jovial-sphere-930683.framer.app",
  "angelic-people-442479.framer.app",
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
  out.push("#__framer-badge-container", ".__framer-badge-container","#framer-1limyy",".framer-1limyy");
  return Array.from(new Set(out)).slice(0, 50);
}

function sanitize(v: string | null): string {
  return (v || "").trim().slice(0, 256).replace(/[<>"]/g, "");
}

// —— util: injecter du HTML juste après <head>
function injectAfterHead(html: string, snippet: string): string {
  const idx = html.search(/<head[^>]*>/i);
  if (idx === -1) {
    // pas de <head> → créer un squelette minimal
    return `<!doctype html><html><head>${snippet}</head><body>${html}</body></html>`;
  }
  const end = html.indexOf(">", idx) + 1;
  return html.slice(0, end) + snippet + html.slice(end);
}

// —— SSR: {{tokens}} sûrs (zéro faux positifs)
function replaceTokensSSR(html: string, mapBraced: Record<string, string>) {
  const esc = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const keys = Object.keys(mapBraced);
  if (!keys.length) return html;
  const pat = keys.map(esc).join("|");
  const re = new RegExp(`{{\\s*(?:${pat})\\s*}}`, "g");
  return html.replace(re, (m) => {
    const inner = m.replace(/^{{\s*|\s*}}$/g, "");
    return mapBraced[inner] ?? m;
  });
}

// —— Force target _self
function rewriteTargetsSSR(html: string): string {
  return html
    .replace(/\btarget=(['"])_top\1/gi, 'target="_self"')
    .replace(/\btarget=(['"])_parent\1/gi, 'target="_self"')
    .replace(/\btarget=_top\b/gi, 'target="_self"')
    .replace(/\btarget=_parent\b/gi, 'target="_self"');
}

// —— Rebuild /api/proxy URL with all original params (propagation)
function buildProxyHref(absoluteUrl: string, origParams: URLSearchParams): string {
  const sp = new URLSearchParams();
  sp.set("url", absoluteUrl);
  for (const [k, v] of origParams.entries()) {
    if (k === "url") continue;
    sp.append(k, v);
  }
  return `/api/proxy?${sp.toString()}`;
}

// —— Rewrite ALL href/src/action to stay inside proxy (absolute/root/relative)
function rewriteLinksToProxy(html: string, upstream: URL, origParams: URLSearchParams): string {
  const originEsc = upstream.origin.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&");

  // absolus
  html = html.replace(
    new RegExp(`\\b(href|src|action)=([\'"])${originEsc}(/[^\'"]*)\\2`, "gi"),
    (_m, attr, q, path) => `${attr}=${q}${buildProxyHref(upstream.origin + path, origParams)}${q}`
  );

  // racine "/…"
  html = html.replace(
    /\b(href|src|action)=([\'"])\/([^\'"]*)\2/gi,
    (_m, attr, q, path) => `${attr}=${q}${buildProxyHref(`${upstream.origin}/${path}`, origParams)}${q}`
  );

  // relatifs
  html = html.replace(
    /\b(href|src|action)=([\'"])(?!https?:|data:|mailto:|tel:|javascript:|#)([^\'"]+)\2/gi,
    (_m, attr, q, rel) => {
      try {
        const absolute = new URL(rel, upstream).toString();
        return `${attr}=${q}${buildProxyHref(absolute, origParams)}${q}`;
      } catch { return _m; }
    }
  );

  return html;
}

// —— Strip meta CSP inline (au cas où)
function stripInlineCSPMeta(html: string): string {
  return html.replace(/<meta[^>]+http-equiv=["']Content-Security-Policy["'][^>]*>\s*/gi, "");
}

export async function GET(req: NextRequest) {
  const sp = req.nextUrl.searchParams;
  const url = sp.get("url");
  const disableJs = sp.get("disableJs") === "1";
  const removeList = parseRemove(sp);

  const company = sanitize(sp.get("company"));
  const sector  = sanitize(sp.get("sector"));
  const city    = sanitize(sp.get("city"));
  const phone   = sanitize(sp.get("phone"));
  const email   = sanitize(sp.get("email"));

  if (!url) return new Response("Missing url", { status: 400 });

  let u: URL;
  try { u = new URL(url); } catch { return new Response("Bad url", { status: 400 }); }
  if (!/^https?:$/.test(u.protocol)) return new Response("Only http/https", { status: 400 });
  if (!isAllowedHost(u.hostname))    return new Response("Domain not allowed", { status: 403 });

  const upstream = await fetch(u.toString(), {
    headers: {
      "user-agent": req.headers.get("user-agent") || "Mozilla/5.0",
      "accept-language": req.headers.get("accept-language") || "fr-FR,fr;q=0.9",
    },
    redirect: "follow",
  });

  const contentType = upstream.headers.get("content-type") || "";

  // Pass-through non-HTML
  if (!contentType.includes("text/html")) {
    const buf = await upstream.arrayBuffer();
    const headers = new Headers();
    headers.set("content-type", contentType);
    headers.set("cache-control", "no-store");
    headers.set("x-frame-options", "ALLOW");
    return new Response(buf, { status: upstream.status, headers });
  }

  let html = await upstream.text();

  // 0) meta CSP inline -> remove
  html = stripInlineCSPMeta(html);

  // 1) Prépare remplacements
  const mapBraced: Record<string, string> = {};
  if (company) mapBraced["Entreprise"] = company;
  if (sector)  mapBraced["Secteur"]    = sector;
  if (city)    mapBraced["Ville"]      = city;
  if (phone) { mapBraced["Tél"] = phone; mapBraced["Tel"] = phone; mapBraced["Téléphone"] = phone; }
  if (email) { mapBraced["Email"] = email; mapBraced["E-mail"] = email; }

  // 1.b) CSS pour masquer les sélecteurs remove
  const hideCSS = removeList.length
    ? `<style id="__proxy-hide">/* auto-hide */
${removeList.map((s) => {
  // sécurité minimale sur le sélecteur
  const safe = s.replace(/[^\w\-#\.\[\]=\s>:,*+~'"()]/g, "");
  return `${safe}{display:none !important;visibility:hidden !important;}`;
}).join("\n")}
</style>`
    : "";

  // 1.c) base target et early patch script (CSR)
  const earlyPatchScript =
    `<base target="_self">` + hideCSS +
    '<script>(function(){try{'+
    'var MAP='+JSON.stringify(mapBraced)+';var KEYS=Object.keys(MAP||{});'+
    'function escRe(s){return s.replace(/[.*+?^${}()|[\\]\\\\]/g,"\\\\$&");}'+
    'var RES=KEYS.map(function(k){return new RegExp("{{\\\\s*"+escRe(k)+"\\\\s*}}","g");});'+
    'function applyText(t){if(typeof t!=="string")return t;var o=t;for(var i=0;i<KEYS.length;i++){o=o.replace(RES[i],MAP[KEYS[i]]);}return o;}'+
    'var sector=MAP["Secteur"]||"", city=MAP["Ville"]||"", company=MAP["Entreprise"]||"";'+
    'var desiredTitle=""; if(sector&&city){desiredTitle=sector+" à "+city;} else if(company&&city){desiredTitle=company+" — "+city;} else if(company){desiredTitle=company;} else if(city){desiredTitle=city;}'+
    'var NP=Node.prototype, EP=Element.prototype, DP=Document.prototype;'+
    'try{var dsc=Object.getOwnPropertyDescriptor(NP,"textContent");Object.defineProperty(NP,"textContent",{get:dsc.get,set:function(v){dsc.set.call(this,applyText(v));}});}catch(e){}'+
    'try{var dh=Object.getOwnPropertyDescriptor(EP,"innerHTML");Object.defineProperty(EP,"innerHTML",{get:dh.get,set:function(v){dh.set.call(this,applyText(v));}});}catch(e){}'+
    'try{var ct=DP.createTextNode; DP.createTextNode=function(v){return ct.call(this,applyText(v));};}catch(e){}'+
    'function walk(n){if(!n)return; if(n.nodeType===3){var v=n.nodeValue||"";var nv=applyText(v); if(nv!==v)n.nodeValue=nv; return;} if(n.nodeType===1&&n.shadowRoot){walk(n.shadowRoot);} var c=n.childNodes; for(var i=0;i<c.length;i++) walk(c[i]);}'+
    'function run(){walk(document.documentElement); if(desiredTitle){document.title=desiredTitle;} else if(document.title){document.title=applyText(document.title);} var bad=document.querySelectorAll("a[target=\\"_top\\"],a[target=\\"_parent\\"]"); for(var i=0;i<bad.length;i++){bad[i].setAttribute("target","_self");}}'+
    'if(document.readyState==="loading"){document.addEventListener("DOMContentLoaded",run);} else {run();}'+
    'new MutationObserver(function(ms){for(var i=0;i<ms.length;i++){var m=ms[i]; if(m.addedNodes){for(var j=0;j<m.addedNodes.length;j++){walk(m.addedNodes[j]);}} if(m.type==="characterData"){walk(m.target);}}}).observe(document.documentElement,{childList:true,subtree:true,characterData:true});'+
    '(function(){var ps=history.pushState, rs=history.replaceState; history.pushState=function(){try{ps.apply(this,arguments);}finally{setTimeout(run,0);}}; history.replaceState=function(){try{rs.apply(this,arguments);}finally{setTimeout(run,0);}}; window.addEventListener("popstate",function(){setTimeout(run,0);});})();'+
    '}catch(e){}})();</script>';

  // 2) Option : couper le JS amont
  if (disableJs) {
    html = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "");
    html = html.replace(/<link[^>]+rel=["']modulepreload["'][^>]*>/gi, "");
  }

  // 3) rester dans iframe + router liens + propager params
  html = rewriteTargetsSSR(html);
  html = rewriteLinksToProxy(html, u, sp);

  // 4) remplacements SSR (premier paint)
  html = replaceTokensSSR(html, mapBraced);

  // 5) injecter dans <head> (base target, CSS hide, patch script)
  html = injectAfterHead(html, earlyPatchScript);

  // 6) En-têtes sortants (neutralise XFO/CSP)
  const headers = new Headers();
  headers.set("content-type", "text/html; charset=utf-8");
  headers.set("cache-control", "no-store");
  headers.set("x-frame-options", "ALLOW");

  return new Response(html, { status: upstream.status, headers });
}
