// app/api/injector/route.ts
import { NextRequest } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function parseRemove(params: URLSearchParams) {
  const out: string[] = [];
  for (const v of params.getAll("remove")) {
    v.split(",").forEach((s) => {
      const t = s.trim();
      if (t) out.push(t);
    });
  }
  // garde aussi le badge framer si appelé sans proxy (sécurité)
  out.push("#__framer-badge-container", ".__framer-badge-container");
  return Array.from(new Set(out)).slice(0, 50);
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const translateTo = (searchParams.get("translate") || "").trim().toLowerCase();
  const removeList = parseRemove(searchParams);

  const js =
    `(()=>{` +
    `var TARGET_LANG=${JSON.stringify(translateTo)};` +
    `var RM=${JSON.stringify(removeList)};` +
    `var SKIP_TAG={SCRIPT:1,STYLE:1,NOSCRIPT:1,IFRAME:1,CANVAS:1,SVG:1,MATH:1,CODE:1,PRE:1,TEMPLATE:1};` +
    `var ATTRS=["alt","title","aria-label","placeholder"];` +
    `var running=false;var processedText=new WeakSet();var processedAttr=new WeakMap();var processedProp=new WeakMap();var observed=new WeakSet();` +

    // suppression générique
    `function removeAll(root){try{for(var i=0;i<RM.length;i++){try{var sel=RM[i];var els=(root.querySelectorAll?root.querySelectorAll(sel):[]);for(var j=0;j<els.length;j++){els[j].remove();}}catch(e){}}}catch(e){}}` +

    // traduction helpers
    `function eligibleText(s){if(!s)return false;var t=s.trim();if(!t)return false;if(/^[\\s0-9.,:;!?#%&()\\[\\]{}<>+\\-_/\\\\|@\\"\\']+$/.test(t))return false;return true;}` +
    `function markAttr(el,attr){var set=processedAttr.get(el);if(!set){set=new Set();processedAttr.set(el,set);}set.add(attr);}` +
    `function isAttrProcessed(el,attr){var set=processedAttr.get(el);return !!(set&&set.has(attr));}` +
    `function markProp(el){processedProp.set(el,true);}function isPropProcessed(el){return !!processedProp.get(el);}` +

    `function collectTextNodes(root){var out=[];try{var w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,{acceptNode:function(n){if(processedText.has(n))return NodeFilter.FILTER_REJECT;var p=n.parentElement;if(!p)return NodeFilter.FILTER_REJECT;if(p.closest("[data-no-translate]"))return NodeFilter.FILTER_REJECT;if(SKIP_TAG[p.tagName])return NodeFilter.FILTER_REJECT;return eligibleText(n.nodeValue)?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT;}});var cur;while(cur=w.nextNode())out.push(cur);}catch(e){}return out;}` +
    `function collectAttrTargets(root){var targets=[];try{var selector=ATTRS.map(function(a){return"["+a+"]";}).join(",");if(selector){var els=root.querySelectorAll(selector);for(var i=0;i<els.length;i++){var el=els[i];for(var k=0;k<ATTRS.length;k++){var a=ATTRS[k];if(el.hasAttribute(a)&&!isAttrProcessed(el,a)){var v=el.getAttribute(a)||"";if(eligibleText(v))targets.push({el:el,attr:a,text:v});}}}}` +
    `var inputs=root.querySelectorAll("input[type=button],input[type=submit],input[type=reset]");for(var j=0;j<inputs.length;j++){var inp=inputs[j];if(!isPropProcessed(inp)){var val=inp.value||"";if(eligibleText(val))targets.push({el:inp,prop:"value",text:val});}}` +
    `var metas=root.querySelectorAll('meta[name="description"],meta[property="og:title"],meta[property="og:description"]');for(var m=0;m<metas.length;m++){var me=metas[m];if(!isAttrProcessed(me,"content")){var c=me.getAttribute("content")||"";if(eligibleText(c))targets.push({el:me,attr:"content",text:c});}}` +
    `}catch(e){}return targets;}` +
    `function collectTitle(){try{var t=document.title||"";if(eligibleText(t))return t;}catch(e){}return null;}` +

    `async function translateBatch(strings){if(!TARGET_LANG)return strings;try{var res=await fetch(location.origin + "/api/translate?tl="+encodeURIComponent(TARGET_LANG),{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({strings:strings})});if(!res.ok)return strings;var data=await res.json();return (data&&data.translations)||strings;}catch(e){return strings;}}` +

    `function observeRoot(root){if(!root||observed.has(root))return;observed.add(root);try{new MutationObserver(function(m){for(var i=0;i<m.length;i++){var a=m[i].addedNodes;for(var j=0;j<a.length;j++){var n=a[j];if(n&&n.nodeType===1){removeAll(n);if(n.shadowRoot)observeRoot(n.shadowRoot);schedule();}}}}).observe(root,{childList:true,subtree:true});}catch(e){}}` +

    `async function run(){if(running)return;running=true;try{` +
    `removeAll(document);` +
    `if(!TARGET_LANG){running=false;return;}` +
    `var roots=[document];try{var all=document.querySelectorAll("*");for(var i=0;i<all.length;i++){if(all[i].shadowRoot)roots.push(all[i].shadowRoot);}}catch(e){}for(var r=0;r<roots.length;r++){observeRoot(roots[r]);}` +
    `var textNodes=[];for(var r2=0;r2<roots.length;r2++){textNodes=textNodes.concat(collectTextNodes(roots[r2]));}` +
    `var attrTargets=[];for(var r3=0;r3<roots.length;r3++){attrTargets=attrTargets.concat(collectAttrTargets(roots[r3]));}` +
    `var titleStr=collectTitle();if(textNodes.length===0&&attrTargets.length===0&&!titleStr){running=false;return;}` +
    `var uniq=[],indexMap=Object.create(null);function pushUniq(s){if(indexMap[s]==null){indexMap[s]=uniq.length;uniq.push(s);}return indexMap[s];}` +
    `var textIdx=[];for(var i1=0;i1<textNodes.length;i1++){textIdx.push(pushUniq(textNodes[i1].nodeValue));}` +
    `var attrIdx=[];for(var i2=0;i2<attrTargets.length;i2++){attrIdx.push(pushUniq(attrTargets[i2].text));}` +
    `var titleIdx=titleStr!=null?pushUniq(titleStr):-1;` +
    `var outMap=Object.create(null);var CHUNK=50;for(var i=0;i<uniq.length;i+=CHUNK){var part=uniq.slice(i,i+CHUNK);var trans=await translateBatch(part);for(var j=0;j<part.length;j++){outMap[part[j]]=trans[j]||part[j];}}` +
    `for(var a1=0;a1<textNodes.length;a1++){var n=textNodes[a1];var o=n.nodeValue;var t=outMap[o];if(t&&t!==o){n.nodeValue=t;}processedText.add(n);}` +
    `for(var a2=0;a2<attrTargets.length;a2++){var tgt=attrTargets[a2];var o=tgt.text;var t=outMap[o];if(t&&t!==o){if(tgt.attr){tgt.el.setAttribute(tgt.attr,t);markAttr(tgt.el,tgt.attr);}else if(tgt.prop){try{tgt.el[tgt.prop]=t;markProp(tgt.el);}catch(e){}}}else{if(tgt.attr){markAttr(tgt.el,tgt.attr);}else if(tgt.prop){markProp(tgt.el);}}}` +
    `if(titleStr!=null){var t2=outMap[titleStr];if(t2&&t2!==titleStr){try{document.title=t2;}catch(e){}}}` +
    `}finally{running=false;}}` +

    `function schedule(){if(!running){setTimeout(run,40);}}` +
    `if(document.readyState==="loading"){document.addEventListener("DOMContentLoaded",schedule);}else{schedule();}` +
    `observeRoot(document);try{var nodes=document.querySelectorAll("*");for(var i=0;i<nodes.length;i++){if(nodes[i].shadowRoot)observeRoot(nodes[i].shadowRoot);}}catch(e){}` +
    `})();`;

  return new Response(js, {
    headers: {
      "content-type": "text/javascript; charset=utf-8",
      "cache-control": "no-store",
    },
  });
}
