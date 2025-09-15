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
  out.push("#__framer-badge-container", ".__framer-badge-container");
  return Array.from(new Set(out)).slice(0, 50);
}
function sanitize(v: string | null): string {
  return (v || "").trim().slice(0, 256).replace(/[<>"]/g, "");
}

// —— SSR: {{tokens}} (zéro faux positifs)
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
  const sector  = sanitize(sp.get("sector"));            // 👈 NOUVEAU
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

  // 1) Inject <base target="_self"> + CSS hide + ***EARLY PATCH SCRIPT*** just after <head>
  const mapBraced: Record<string, string> = {};
  if (company) mapBraced["Entreprise"] = company;
  if (sector)  mapBraced["Secteur"]    = sector;        // 👈 NOUVEAU
  if (city)    mapBraced["Ville"]      = city;
  if (phone) { mapBraced["Tél"] = phone; mapBraced["Tel"] = phone; mapBraced["Téléphone"] = phone; }
  if (email) { mapBraced["Email"] = email; mapBraced["E-mail"] = email; }

  const earlyPatchScript =
    '<script>' +
    '(function(){try{' +
    // 1) expose map
    'window.__PROXY_MAP=' + JSON.stringify(mapBraced) + ';' +
    'var KEYS=Object.keys(window.__PROXY_MAP||{});' +
    'if(!KEYS.length)return;' +
    'var RES=KEYS.map(function(k){return new RegExp("{{\\\\s*"+k.replace(/[.*+?^${}()|[\\]\\\\]/g,"\\\\$&")+"\\\\s*}}","g");});' +
    'function applyText(t){if(typeof t!=="string")return t;var o=t;for(var i=0;i<KEYS.length;i++){o=o.replace(RES[i],window.__PROXY_MAP[KEYS[i]]);}return o;}' +
    // 2) patch setters AVANT que Framer ne tourne
    'var NP=Node.prototype, EP=Element.prototype, DP=Document.prototype, CDP=CharacterData.prototype;' +
    'try{' +
    'var dsc=Object.getOwnPropertyDescriptor(NP,"textContent");' +
    'Object.defineProperty(NP,"textContent",{get:dsc.get,set:function(v){dsc.set.call(this,applyText(v));}});' +
    '}catch(e){}' +
    'try{' +
    'var dh=Object.getOwnPropertyDescriptor(EP,"innerHTML");' +
    'Object.defineProperty(EP,"innerHTML",{get:dh.get,set:function(v){dh.set.call(this,applyText(v));}});' +
    '}catch(e){}' +
    'try{' +
    'var ct=DP.createTextNode; DP.createTextNode=function(v){return ct.call(this,applyText(v));};' +
    '}catch(e){}' +
    'try{' +
    'var dw=DP.write; DP.write=function(){for(var i=0;i<arguments.length;i++){if(typeof arguments[i]==="string") arguments[i]=applyText(arguments[i]);} return dw.apply(this,arguments);};' +
    '}catch(e){}' +
    // 3) safety: MutationObserver + Shadow DOM ouverts
    'function walk(n){if(!n)return; if(n.nodeType===3){var v=n.nodeValue||"";var nv=applyText(v); if(nv!==v)n.nodeValue=nv; return;} if(n.nodeType===1){if(n.shadowRoot) walk(n.shadowRoot);} var c=n.childNodes; for(var i=0;i<c.length;i++) walk(c[i]);}' +
    'function run(){walk(document.documentElement); if(document.title){document.title=applyText(document.title);}}' + // 👈 le Titre est aussi remplacé
    'if(document.readyState==="loading"){document.addEventListener("DOMContentLoaded",run);} else {run();}' +
    'new MutationObserver(function(ms){for(var i=0;i<ms.length;i++){var m=ms[i]; if(m.addedNodes){for(var j=0;j<m.addedNodes.length;j++){walk(m.addedNodes[j]);}} if(m.type==="characterData"){walk(m.target);}}}).observe(document.documentElement,{childList:true,subtree:true,characterData:true});' +
    // 4) Historique SPA (Framer)
    '(function(){var ps=history.pushState, rs=history.replaceState; history.pushState=function(){try{ps.apply(this,arguments);}finally{setTimeout(run,0);}}; history.replaceState=function(){try{rs.apply(this,arguments);}finally{setTimeout(run,0);}}; window.addEventListener("popstate",function(){setTimeout(run,0);});})();' +
    // 5) targets de sûreté
    'function fixTargets(){var qs=document.querySelectorAll("a[target=\\"_top\\"],a[target=\\"_parent\\"]"); for(var i=0;i<qs.length;i++){qs[i].target="_self";}} fixTargets();' +
    'new MutationObserver(function(ms){for(var i=0;i<ms.length;i++){if(ms[i].addedNodes){fixTargets();}}}).observe(document.documentElement,{childList:true,subtree:true});' +
    '}catch(e){}})();' +
    '</script>';

  if (/<head[^>]*>/i.test(html)) {
    const cssHideSelected = removeList.length
      ? `${removeList.join(",")}{display:none !important;visibility:hidden !important}`
      : "";
    html = html.replace(/<head[^>]*>/i, function (m) {
      let inject = '<base target="_self">';
      if (cssHideSelected) inject += '<style id="proxy-hide">' + cssHideSelected + '</style>';
      // IMPORTANT : injecter le patch **juste après <head>** pour exécuter AVANT Framer
      inject += earlyPatchScript;
      return m + inject;
    });
  }

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

  // 5) En-têtes sortants (neutralise XFO/CSP)
  const headers = new Headers();
  headers.set("content-type", "text/html; charset=utf-8");
  headers.set("cache-control", "no-store");
  headers.set("x-frame-options", "ALLOW");

  return new Response(html, { status: upstream.status, headers });
}
