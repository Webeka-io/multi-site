// src/app/api/proxy/route.ts
import { NextRequest } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// ——— Allowlist ———
const ALLOWLIST = [
  "genial-cogwheel-567577.framer.app",
  "secured-principles-292763.framer.app",
  "generous-tools-627083.framer.app",
  "daring-remember-772934.framer.app",
  "beminee.webflow.io",
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
  // Masquer le badge Framer par défaut
  out.push("#__framer-badge-container", ".__framer-badge-container");
  return Array.from(new Set(out)).slice(0, 50);
}

function sanitize(v: string | null): string {
  return (v || "").trim().slice(0, 256).replace(/[<>"]/g, "");
}

// —— SSR: remplace {{tokens}} ——
function replaceTokensSSR(html: string, tokenMap: Record<string, string>) {
  const esc = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const keys = Object.keys(tokenMap);
  if (!keys.length) return html;
  const pat = keys.map(esc).join("|");
  const re = new RegExp(`{{\\s*(?:${pat})\\s*}}`, "g");
  return html.replace(re, (m) => {
    const inner = m.replace(/^{{\s*|\s*}}$/g, "");
    return tokenMap[inner] ?? m;
  });
}

// —— Force target _self ——
function rewriteTargetsSSR(html: string): string {
  return html
    .replace(/\btarget=(['"])_top\1/gi, 'target="_self"')
    .replace(/\btarget=(['"])_parent\1/gi, 'target="_self"')
    .replace(/\btarget=_top\b/gi, 'target=_self')
    .replace(/\btarget=_parent\b/gi, 'target=_self');
}

// —— Construit /api/proxy?url=… avec propagation des params ——
function buildProxyHref(absoluteUrl: string, origParams: URLSearchParams): string {
  const sp = new URLSearchParams();
  sp.set("url", absoluteUrl);
  for (const [k, v] of origParams.entries()) {
    if (k === "url") continue;
    sp.append(k, v);
  }
  return `/api/proxy?${sp.toString()}`;
}

// —— Réécrit href/src/action (absolu / racine / relatif) ——
function rewriteLinksToProxy(html: string, upstream: URL, origParams: URLSearchParams): string {
  const originEsc = upstream.origin.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&");

  // 1) Absolus vers l'origine upstream
  html = html.replace(
    new RegExp(`\\b(href|src|action)=([\'"])${originEsc}(/[^\'"]*)\\2`, "gi"),
    (_m, attr, q, path) => `${attr}=${q}${buildProxyHref(upstream.origin + path, origParams)}${q}`
  );

  // 2) Racine "/…"
  html = html.replace(
    /\b(href|src|action)=([\'"])\/([^\'"]*)\2/gi,
    (_m, attr, q, path) => `${attr}=${q}${buildProxyHref(`${upstream.origin}/${path}`, origParams)}${q}`
  );

  // 3) Relatifs "page" | "./page" | "../page"
  html = html.replace(
    /\b(href|src|action)=([\'"])(?!https?:|data:|mailto:|tel:|javascript:|#)([^\'"]+)\2/gi,
    (_m, attr, q, rel) => {
      try {
        const absolute = new URL(rel, upstream).toString();
        return `${attr}=${q}${buildProxyHref(absolute, origParams)}${q}`;
      } catch {
        return _m;
      }
    }
  );

  return html;
}

// —— Retire éventuels <meta http-equiv="CSP"> inline ——
function stripInlineCSPMeta(html: string): string {
  return html.replace(/<meta[^>]+http-equiv=["']Content-Security-Policy["'][^>]*>\s*/gi, "");
}

export async function GET(req: NextRequest) {
  const sp = req.nextUrl.searchParams;
  const url = sp.get("url");
  const disableJs = sp.get("disableJs") === "1";
  const removeList = parseRemove(sp);

  const company = sanitize(sp.get("company"));
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

  // Pass-through non-HTML (images, css, js, json, etc.)
  if (!contentType.includes("text/html")) {
    const buf = await upstream.arrayBuffer();
    const headers = new Headers();
    headers.set("content-type", contentType);
    headers.set("cache-control", "no-store");
    headers.set("x-frame-options", "ALLOW"); // neutralise XFO
    return new Response(buf, { status: upstream.status, headers });
  }

  let html = await upstream.text();

  // 0) Enlever meta CSP inline
  html = stripInlineCSPMeta(html);

  // 1) Map tokens — définie UNE SEULE FOIS et réutilisée
  const tokenMap: Record<string, string> = {};
  if (company) tokenMap["Entreprise"] = company;
  if (city)    tokenMap["Ville"]      = city;
  if (phone) { tokenMap["Tél"]=phone; tokenMap["Tel"]=phone; tokenMap["Téléphone"]=phone; }
  if (email) { tokenMap["Email"]=email; tokenMap["E-mail"]=email; }

  // 2) Injection <base target="_self"> + CSS hide + ***EARLY PATCH*** (dans <head>)
  const origParamsFlat = Array.from(sp.entries()).filter(([k]) => k !== "url");
  const upstreamOriginJSON = JSON.stringify(u.origin);
  const proxyParamsJSON = JSON.stringify(origParamsFlat);
  const tokenMapJSON = JSON.stringify(tokenMap);

  const earlyPatchParts: string[] = [];
  earlyPatchParts.push('<script>(function(){try{');
  // Config partagée
  earlyPatchParts.push(
    'var UPSTREAM_ORIGIN=' + upstreamOriginJSON + ';' +
    'var PROXY_PARAMS=' + proxyParamsJSON + ';' +
    'var MAP=' + tokenMapJSON + ';'
  );
  // Cookies pour middleware (SameSite=None; Secure)
  earlyPatchParts.push(
    'try{var paramsQS=(PROXY_PARAMS||[]).map(function(kv){return encodeURIComponent(kv[0])+("=")+encodeURIComponent(kv[1]);}).join("&");' +
    'document.cookie="proxy_origin="+encodeURIComponent(UPSTREAM_ORIGIN)+"; Path=/; Max-Age=1800; SameSite=None; Secure";' +
    'document.cookie="proxy_params="+encodeURIComponent(paramsQS)+"; Path=/; Max-Age=1800; SameSite=None; Secure";}catch(e){}'
  );
  // Helpers toProxy / isProxied
  earlyPatchParts.push(
    'function toProxy(url){try{var abs=new URL(url,UPSTREAM_ORIGIN).toString();}catch(e){return url;}var sp=new URLSearchParams();sp.set("url",abs);(PROXY_PARAMS||[]).forEach(function(kv){if(kv&&kv[0]!=="url")sp.append(kv[0],kv[1]);});return "/api/proxy?"+sp.toString();}' +
    'function isProxied(u){return typeof u==="string"&&/^\\/api\\/proxy\\?url=/.test(u);}'
  );
  // Remplacements {{…}} à l'écriture
  earlyPatchParts.push(
    'var KEYS=Object.keys(MAP||{});var RES=KEYS.map(function(k){return new RegExp("{{\\\\s*"+k.replace(/[.*+?^\\${}()|[\\]\\\\]/g,"\\\\$&")+"\\\\s*}}","g");});' +
    'function applyText(t){if(typeof t!=="string")return t;for(var i=0;i<KEYS.length;i++){t=t.replace(RES[i],MAP[KEYS[i]]);}return t;}'
  );
  // Patch DOM setters
  earlyPatchParts.push(
    '(function(){var NP=Node.prototype,EP=Element.prototype,DP=Document.prototype;' +
    'try{var dsc=Object.getOwnPropertyDescriptor(NP,"textContent");Object.defineProperty(NP,"textContent",{get:dsc.get,set:function(v){dsc.set.call(this,applyText(v));}});}catch(e){}' +
    'try{var dh=Object.getOwnPropertyDescriptor(EP,"innerHTML");Object.defineProperty(EP,"innerHTML",{get:dh.get,set:function(v){dh.set.call(this,applyText(v));}});}catch(e){}' +
    'try{var ct=DP.createTextNode;DP.createTextNode=function(v){return ct.call(this,applyText(v));};}catch(e){}' +
    'try{var dw=DP.write;DP.write=function(){for(var i=0;i<arguments.length;i++){if(typeof arguments[i]==="string")arguments[i]=applyText(arguments[i]);}return dw.apply(this,arguments);};}catch(e){}' +
    '})();'
  );
  // Interceptions SPA
  earlyPatchParts.push(
    '(function(){function proxifyArg(u){if(typeof u!=="string")return u;if(isProxied(u))return u;return toProxy(u);}var ps=history.pushState,rs=history.replaceState;' +
    'history.pushState=function(s,t,u){if(typeof u==="string"){u=proxifyArg(u);}return ps.call(this,s,t,u);};' +
    'history.replaceState=function(s,t,u){if(typeof u==="string"){u=proxifyArg(u);}return rs.call(this,s,t,u);};})();'
  );
  earlyPatchParts.push(
    '(function(){try{var loc=window.location,aAssign=loc.assign,aReplace=loc.replace;' +
    'loc.assign=function(u){u=String(u);return aAssign.call(this,isProxied(u)?u:toProxy(u));};' +
    'loc.replace=function(u){u=String(u);return aReplace.call(this,isProxied(u)?u:toProxy(u));};}catch(e){}})();'
  );
  // Clics liens
  earlyPatchParts.push(
    'document.addEventListener("click",function(ev){var a=ev.target&&(ev.target.closest?ev.target.closest("a"):null);if(!a)return;var href=a.getAttribute("href");if(!href)return;' +
    'if(href.startsWith("#")||href.startsWith("mailto:")||href.startsWith("tel:")||href.startsWith("javascript:"))return;' +
    'ev.preventDefault();var prox=toProxy(href);try{history.pushState(null,"",prox);}catch(e){}window.location.assign(prox);},true);'
  );
  // Proxifier fetch + XHR
  earlyPatchParts.push(
    '(function(){var ofetch=window.fetch;if(ofetch){window.fetch=function(input,init){try{var url=(typeof input==="string")?input:(input&&input.url);' +
    'if(url&&!isProxied(url)&&!/^(?:https?:|data:|mailto:|tel:|javascript:)/i.test(url)){url=toProxy(url);if(typeof input!=="string"){input=new Request(url,input);}else{input=url;}}}catch(e){}' +
    'return ofetch.call(this,input,init);};}})();'
  );
  earlyPatchParts.push(
    '(function(){var X=window.XMLHttpRequest;if(!X)return;var oopen=X.prototype.open;X.prototype.open=function(method,url,async,user,pass){try{' +
    'if(typeof url==="string"&&!isProxied(url)&&!/^(?:https?:|data:|mailto:|tel:|javascript:)/i.test(url)){url=toProxy(url);}}catch(e){}' +
    'return oopen.call(this,method,url,async,user,pass);};})();'
  );
  // Sûreté targets + rescan
  earlyPatchParts.push(
    'function fixTargets(){var qs=document.querySelectorAll(\'a[target="_top"],a[target="_parent"]\');for(var i=0;i<qs.length;i++){qs[i].target="_self";}}' +
    'fixTargets();new MutationObserver(function(ms){for(var i=0;i<ms.length;i++){if(ms[i].addedNodes){fixTargets();}}}).observe(document.documentElement,{childList:true,subtree:true});'
  );
  earlyPatchParts.push(
    'function walk(n){if(!n)return;if(n.nodeType===3){var v=n.nodeValue||"";var nv=applyText(v);if(nv!==v)n.nodeValue=nv;return;}if(n.nodeType===1){var sr=(n&&n.shadowRoot)||null;if(sr)walk(sr);}var c=n.childNodes;for(var i=0;i<c.length;i++)walk(c[i]);}' +
    'function run(){walk(document.documentElement);if(document.title){document.title=applyText(document.title);}}' +
    'if(document.readyState==="loading"){document.addEventListener("DOMContentLoaded",run);}else{run();}' +
    'new MutationObserver(function(ms){for(var i=0;i<ms.length;i++){var m=ms[i];if(m.addedNodes){for(var j=0;j<m.addedNodes.length;j++){walk(m.addedNodes[j]);}}if(m.type==="characterData"){walk(m.target);}}}).observe(document.documentElement,{childList:true,subtree:true,characterData:true});'
  );
  earlyPatchParts.push('}catch(e){}})();</script>');

  const earlyPatchScript = earlyPatchParts.join("");

  if (/<head[^>]*>/i.test(html)) {
    const cssHideSelected = removeList.length
      ? `${removeList.join(",")}{display:none !important;visibility:hidden !important}`
      : "";
    html = html.replace(/<head[^>]*>/i, (m) => {
      let inject = `<base target="_self">`;
      if (cssHideSelected) inject += `<style id="proxy-hide">${cssHideSelected}</style>`;
      inject += earlyPatchScript; // IMPORTANT : avant que l’app ne démarre
      return m + inject;
    });
  }

  // 3) Option : couper le JS amont
  if (disableJs) {
    html = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "");
    html = html.replace(/<link[^>]+rel=["']modulepreload["'][^>]*>/gi, "");
  }

  // 4) Rester dans l'iframe + router liens via proxy (+ propagation)
  html = rewriteTargetsSSR(html);
  html = rewriteLinksToProxy(html, u, sp);

  // 5) Remplacements SSR (premier paint) avec tokenMap
  html = replaceTokensSSR(html, tokenMap);

  // 6) En-têtes sortants (neutralise XFO/CSP) + cookies serveur (SameSite=None; Secure)
  const headers = new Headers();
  headers.set("content-type", "text/html; charset=utf-8");
  headers.set("cache-control", "no-store");
  headers.set("x-frame-options", "ALLOW");

  // Cookies côté serveur (30 min) pour le middleware
  const paramsQS = origParamsFlat
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
    .join("&");
  headers.append(
    "set-cookie",
    `proxy_origin=${encodeURIComponent(u.origin)}; Path=/; Max-Age=1800; SameSite=None; Secure`
  );
  headers.append(
    "set-cookie",
    `proxy_params=${encodeURIComponent(paramsQS)}; Path=/; Max-Age=1800; SameSite=None; Secure`
  );

  return new Response(html, { status: upstream.status, headers });
}
