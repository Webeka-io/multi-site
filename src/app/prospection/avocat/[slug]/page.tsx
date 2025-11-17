// app/prospection/portavia/page.tsx
"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

// ⚠️ On pointe directement sur /fr et on préservera ce préfixe
const TARGET = "https://happier-stick-364972.framer.app/fr/";

// Segments d'URL à retirer du slug ET de l'URL affichée
// (on tolère la faute pour robustesse)
const STRIP_SEGMENTS = ["prospection", "veterinaire", "vetenrinaire", "dentiste"];

function parseRemove(input: string): string[] {
  return input
    .split(/[,;\n]/)
    .map((s) => s.trim())
    .filter(Boolean)
    .slice(0, 50);
}

function clean(v?: string | null) {
  if (!v) return "";
  return decodeURIComponent(v).trim().slice(0, 128).replace(/[<>"]/g, "");
}

/**
 * Décode segments/queries/hash + calcule la racine AVANT les STRIP_SEGMENTS pour nettoyer l'URL
 * Priorité d’extraction :
 *  1) Segments après le premier segment à retirer (format compact ou multi-segments)
 *  2) Query compacte   ?v=Entreprise|Secteur|Ville|Tel|Email
 *  3) Query claire     ?company=&sector=&city=&phone=&email=
 *  4) Hash             #Entreprise/Secteur/Ville/Tel/Email
 */
function readUrlValues(): {
  rootPath: string; // ex: "/fr" si "/fr/prospection/...", sinon "/"
  ent: string; sector: string; city: string; phone: string; email: string;
  shouldClean: boolean;
} {
  if (typeof window === "undefined") {
    return { rootPath: "/", ent: "", sector: "", city: "", phone: "", email: "", shouldClean: false };
  }

  const url = new URL(window.location.href);
  const parts = url.pathname.split("/").filter(Boolean);

  // Cherche le premier index où apparaît l’un des segments à retirer
  let firstIdx = -1;
  for (let i = 0; i < parts.length; i++) {
    if (STRIP_SEGMENTS.includes(parts[i].toLowerCase())) {
      firstIdx = i;
      break;
    }
  }

  // Racine = tout ce qui est avant le premier segment à retirer (ou "/" s'il n'y a rien)
  const rootPath = firstIdx > 0 ? "/" + parts.slice(0, firstIdx).join("/") : "/";

  // Calcule la "queue" après avoir sauté tous les segments à retirer consécutifs
  let tailStart = firstIdx >= 0 ? firstIdx : parts.length;
  while (tailStart < parts.length && STRIP_SEGMENTS.includes(parts[tailStart]?.toLowerCase())) {
    tailStart++;
  }
  const tail = parts.slice(tailStart);

  let ent = "", sector = "", city = "", phone = "", email = "";
  let shouldClean = false;

  // 1) Segments après STRIP_SEGMENTS
  if (firstIdx >= 0 && tail.length > 0) {
    const last = tail[tail.length - 1];

    if (last.includes("-")) {
      // Format compact : Entreprise-Secteur-Ville-Tel-Email
      const t = last.split("-").map(clean);
      [ent, sector, city, phone, email] = [t[0] || "", t[1] || "", t[2] || "", t[3] || "", t[4] || ""];
    } else {
      // Format segments : /Entreprise/Secteur/Ville/Tel/Email
      const t = tail.map(clean);
      [ent, sector, city, phone, email] = [t[0] || "", t[1] || "", t[2] || "", t[3] || "", t[4] || ""];
    }
    shouldClean = true;
  }

  // 2) Query compacte ?v=Entreprise|Secteur|Ville|Tel|Email
  const v = url.searchParams.get("v");
  if (v) {
    const t = v.split("|").map(clean);
    ent   = t[0] || ent;
    sector= t[1] || sector;
    city  = t[2] || city;
    phone = t[3] || phone;
    email = t[4] || email;
    shouldClean = true;
  }

  // 3) Query claire ?company=&sector=&city=&phone=&email=
  const cq = {
    company: clean(url.searchParams.get("company")),
    sector:  clean(url.searchParams.get("sector")),
    city:    clean(url.searchParams.get("city")),
    phone:   clean(url.searchParams.get("phone")),
    email:   clean(url.searchParams.get("email")),
  };
  if (cq.company || cq.sector || cq.city || cq.phone || cq.email) {
    ent   = cq.company || ent;
    sector= cq.sector  || sector;
    city  = cq.city    || city;
    phone = cq.phone   || phone;
    email = cq.email   || email;
    shouldClean = true;
  }

  // 4) Hash #Entreprise/Secteur/Ville/Tel/Email (si rien trouvé avant)
  if (!ent) {
    const raw = window.location.hash || "";
    const hash = raw.startsWith("#") ? raw.slice(1) : raw;
    if (hash) {
      const h = hash.split("/").map(clean);
      ent    = h[0] || ent;
      sector = h[1] || sector;
      city   = h[2] || city;
      phone  = h[3] || phone;
      email  = h[4] || email;
      shouldClean = true;
    }
  }

  return { rootPath, ent, sector, city, phone, email, shouldClean };
}

export default function Page() {
  const [{ ent, sector, city, phone, email }, setVals] = useState({
    ent: "", sector: "", city: "", phone: "", email: ""
  });

  // Lecture + nettoyage (on enlève aussi /prospection, /veterinaire, /dentiste)
  useEffect(() => {
    const { rootPath, ent, sector, city, phone, email, shouldClean } = readUrlValues();
    setVals({ ent, sector, city, phone, email });

    if (shouldClean) {
      try {
        // Remplace l'URL visible par la racine avant les segments retirés (ex: "/" ou "/fr")
        window.history.replaceState(null, "", rootPath || "/");
      } catch {}
    }
  }, []);

  // 🔹 Titre d’onglet = uniquement le nom de l’entreprise
  useEffect(() => {
    const title = ent || "Webeka";
    document.title = title;
  }, [ent]);

  // iFrame / options
  // ⚠️ IMPORTANT: pas de "/" initial, sinon new URL("/", TARGET) supprime le /fr
  const [path] = useState<string>(""); // ex: "services" donnera …/fr/services
  const [disableJs] = useState<boolean>(false);
  const [removeInput] = useState<string>(
    ".__framer-badge-container, #__framer-badge-container"
  );

  const [vh, setVh] = useState<number | null>(null);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  useEffect(() => {
    const updateVh = () => {
      const vv = (window as any).visualViewport;
      const height = vv?.height ?? window.innerHeight;
      setVh(Math.round(height));
    };
    updateVh();
    const vv = (window as any).visualViewport;
    if (vv) {
      vv.addEventListener("resize", updateVh);
      vv.addEventListener("scroll", updateVh);
    }
    window.addEventListener("resize", updateVh);
    return () => {
      if (vv) {
        vv.removeEventListener("resize", updateVh);
        vv.removeEventListener("scroll", updateVh);
      }
      window.removeEventListener("resize", updateVh);
    };
  }, []);

  const proxySrc = useMemo(() => {
    // ⬇️ n’ajoute PAS de "/" devant path -> préserve le /fr
    const absolute = new URL(path || "", TARGET).toString();
    const params = new URLSearchParams({ url: absolute });

    // On propage les valeurs au proxy (qui gère le titre et les remplacements dans l'IFRAME)
    if (ent)    params.set("company", ent);
    if (sector) params.set("sector", sector);
    if (city)   params.set("city", city);
    if (phone)  params.set("phone", phone);
    if (email)  params.set("email", email);

    if (disableJs) params.set("disableJs", "1");
    for (const sel of parseRemove(removeInput)) params.append("remove", sel);

    return `/api/proxy?${params.toString()}`;
  }, [path, disableJs, removeInput, ent, sector, city, phone, email]);

  const wrapStyle: React.CSSProperties = {
    position: "relative",
    height: vh ? `${vh}px` : "100dvh",
    minHeight: vh ? `${vh}px` : "100svh",
    overflow: "hidden",
    WebkitOverflowScrolling: "touch",
  };

  const iframeStyle: React.CSSProperties = {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    border: "0",
  };

  return (
    <>
      <style jsx global>{`
        html, body, #__next { margin: 0; padding: 0; height: 100%; }
        html { height: -webkit-fill-available; }
        body {
          min-height: 100svh;
          overscroll-behavior-y: none;
          font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto,
            Helvetica, Arial, Apple Color Emoji, Segoe UI Emoji;
          overflow: hidden;
          background: #0000;
        }
      `}</style>

      <div style={wrapStyle}>
        <iframe
          ref={iframeRef}
          key={proxySrc}
          src={proxySrc}
          style={iframeStyle}
          sandbox="allow-scripts allow-same-origin"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </>
  );
}
