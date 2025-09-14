import { NextRequest } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Domaines autorisés
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
  // Badge Framer par défaut
  out.push("#__framer-badge-container", ".__framer-badge-container");
  return Array.from(new Set(out)).slice(0, 50);
}

function sanitize(v: string | null): string {
  return (v || "").trim().slice(0, 128).replace(/[<>"]/g, "");
}

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get("url");
  const disableJs = req.nextUrl.searchParams.get("disableJs") === "1";
  const removeList = parseRemove(req.nextUrl.searchParams);

  const company = sanitize(req.nextUrl.searchParams.get("company"));
  const city = sanitize(req.nextUrl.searchParams.get("city"));
  const phone = sanitize(req.nextUrl.searchParams.get("phone"));
  const email = sanitize(req.nextUrl.searchParams.get("email"));

  if (!url) return new Response("Missing url", { status: 400 });

  let u: URL;
  try {
    u = new URL(url);
  } catch {
    return new Response("Bad url", { status: 400 });
  }
  if (!/^https?:$/.test(u.protocol)) return new Response("Only http/https", { status: 400 });
  if (!isAllowedHost(u.hostname)) return new Response("Domain not allowed", { status: 403 });

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

  // 1) Ajout <base> + masquage initial
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

  // 2) Suppression JS si demandé
  if (disableJs) {
    html = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "");
    html = html.replace(/<link[^>]+rel=["']modulepreload["'][^>]*>/gi, "");
  }

  // 3) Préparation des remplacements avec {{variables}}
  const replacements: Record<string, string> = {};
  if (company) replacements["Entreprise"] = company;
  if (city) replacements["Ville"] = city;
  if (phone) {
    replacements["Tél"] = phone;
    replacements["Tel"] = phone;
    replacements["Téléphone"] = phone;
  }
  if (email) {
    replacements["Email"] = email;
    replacements["E-mail"] = email;
  }

  if (Object.keys(replacements).length > 0) {
    const inlineReplaceScript =
      '<script>(function(){try{' +
      'var MAP=' + JSON.stringify(replacements) + ';' +
      'var RULES=Object.keys(MAP).map(function(key){' +
      // On cible uniquement {{Variable}}
      '  var re=new RegExp("{{\\\\s*"+key+"\\\\s*}}","g");' +
      '  return {re:re,value:MAP[key]};' +
      '});' +
      'function apply(t){var o=t;for(var i=0;i<RULES.length;i++){o=o.replace(RULES[i].re,RULES[i].value);}return o;}' +
      'function walk(n){if(!n)return;if(n.nodeType===3){var v=n.nodeValue||"";var nv=apply(v);if(nv!==v)n.nodeValue=nv;return;}' +
      'if(n.nodeType===1){var tag=n.tagName;if(tag==="SCRIPT"||tag==="STYLE"||tag==="NOSCRIPT"||tag==="IFRAME")return;}' +
      'var c=n.childNodes;for(var i=0;i<c.length;i++){walk(c[i]);}}' +
      'function run(){walk(document.documentElement);if(document.title){document.title=apply(document.title);}}' +
      'if(document.readyState==="loading"){document.addEventListener("DOMContentLoaded",run);}else{run();}' +
      'new MutationObserver(function(muts){for(var i=0;i<muts.length;i++){var m=muts[i];if(m.addedNodes){for(var j=0;j<m.addedNodes.length;j++){walk(m.addedNodes[j]);}}if(m.type==="characterData"&&m.target){walk(m.target);}}}).observe(document.documentElement,{childList:true,subtree:true,characterData:true});' +
      '}catch(e){}})();</script>';

    html = /<\/body>/i.test(html)
      ? html.replace(/<\/body>/i, inlineReplaceScript + "</body>")
      : html + inlineReplaceScript;
  }

  return new Response(html, {
    status: upstream.status,
    headers: { "content-type": "text/html; charset=utf-8", "cache-control": "no-store" },
  });
}
