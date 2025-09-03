// app/api/proxy/route.ts
import { NextRequest } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Autoriser uniquement ce domaine
const ALLOWLIST = ["portavia.framer.website"];

function isAllowedHost(hostname: string) {
  const h = hostname.toLowerCase();
  return ALLOWLIST.some((d) => h === d || h.endsWith(`.${d}`));
}

// Utilitaire pour une simple recherche/remplacement serveur optionnelle
function escapeRegExp(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get("url");
  const translateTo = (req.nextUrl.searchParams.get("translate") || "").trim().toLowerCase(); // ex: "fr"
  const disableJs = req.nextUrl.searchParams.get("disableJs") === "1";
  const find = req.nextUrl.searchParams.get("find");      // optionnel (hérité de la version précédente)
  const replace = req.nextUrl.searchParams.get("replace"); // optionnel

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

  // 1) <base> pour conserver les URLs relatives
  if (/<head[^>]*>/i.test(html)) {
    html = html.replace(/<head[^>]*>/i, (m) => `${m}<base href="${u.origin}">`);
  }

  // 2) Option : couper JS
  if (disableJs) {
    html = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "");
    html = html.replace(/<link[^>]+rel=["']modulepreload["'][^>]*>/gi, "");
  }

  // 3) Option : find/replace serveur (avant trad)
  if (find && replace) {
    const re = new RegExp(escapeRegExp(find), "g");
    html = html.replace(re, replace);
  }

  // 4) Injection du traducteur si demandé
  if (translateTo) {
    const injected =
      '<script>(function(){' +
      'var TARGET_LANG=' + JSON.stringify(translateTo) + ';' +
      'var SKIP={SCRIPT:1,STYLE:1,NOSCRIPT:1,IFRAME:1,CANVAS:1,SVG:1,MATH:1};' +
      'var processed=new WeakSet();' +
      'function eligible(s){if(!s)return false;var t=s.trim();if(!t)return false; if(/^[\\s0-9.,:;!?#%&()\\[\\]{}<>+\\-_/\\\\|@\\"\\\']+$/.test(t))return false; return true;}' +
      'function collect(root){var nodes=[];try{var w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,{acceptNode:function(n){if(processed.has(n))return NodeFilter.FILTER_REJECT;var p=n.parentElement;if(!p)return NodeFilter.FILTER_REJECT;if(p.closest("[data-no-translate]"))return NodeFilter.FILTER_REJECT; if(SKIP[p.tagName])return NodeFilter.FILTER_REJECT; return eligible(n.nodeValue)?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT;}});var cur;while(cur=w.nextNode())nodes.push(cur);}catch(e){}return nodes;}' +
      'async function translateBatch(strings){try{var res=await fetch("/api/translate?tl="+encodeURIComponent(TARGET_LANG),{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({strings:strings})}); if(!res.ok)return strings; var data=await res.json(); return (data&&data.translations)||strings;}catch(e){return strings;}}' +
      'var running=false;' +
      'async function run(){ if(running) return; running=true; try{ var nodes=collect(document.body); if(nodes.length===0){running=false;return;} var uniq=[], map={}, idx=[]; for(var i=0;i<nodes.length;i++){var s=nodes[i].nodeValue; if(map[s]==null){map[s]=uniq.length; uniq.push(s);} idx.push(map[s]);}' +
      '  var outMap={}; var CHUNK=50; for(var i=0;i<uniq.length;i+=CHUNK){var part=uniq.slice(i,i+CHUNK); var trans=await translateBatch(part); for(var j=0;j<part.length;j++){outMap[part[j]]=trans[j]||part[j];}}' +
      '  for(var k=0;k<nodes.length;k++){var n=nodes[k]; var o=n.nodeValue; var t=outMap[o]; if(t && t!==o){n.nodeValue=t;} processed.add(n);} } finally { running=false; }}' +
      'function schedule(){ if(!running){ setTimeout(run, 40);} }' +
      'if(document.readyState==="loading"){document.addEventListener("DOMContentLoaded",schedule);}else{schedule();}' +
      'new MutationObserver(function(m){for(var i=0;i<m.length;i++){var a=m[i].addedNodes; for(var j=0;j<a.length;j++){var n=a[j]; if(n&&n.nodeType===1) schedule();}}}).observe(document.documentElement,{childList:true,subtree:true});' +
      '})();</script>';

    if (/<\/body>/i.test(html)) {
      html = html.replace(/<\/body>/i, injected + "</body>");
    } else {
      html += injected;
    }

    // Ajuste la langue du document si possible
    html = html.replace(/<html([^>]*)lang=["'][^"']*["']([^>]*)>/i, "<html$1lang=\"fr\"$2>");
  }

  return new Response(html, {
    status: upstream.status,
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "no-store",
    },
  });
}
