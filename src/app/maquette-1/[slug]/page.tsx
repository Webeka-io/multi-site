"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

const TARGET = "https://genial-cogwheel-567577.framer.app/";
const ROUTE_SEGMENT = "maquette-1"; // nom de ta route

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

/** Extrait {basePath, ent, city, phone, email} depuis pathname/query/hash */
function readUrlValues(): {
  basePath: string; // ex: "/maquette-1" ou "/fr/maquette-1" ou "/app/fr/maquette-1"
  ent: string; city: string; phone: string; email: string;
  shouldClean: boolean; // faut-il nettoyer l’URL ?
} {
  if (typeof window === "undefined") {
    return { basePath: `/${ROUTE_SEGMENT}`, ent: "", city: "", phone: "", email: "", shouldClean: false };
  }

  const url = new URL(window.location.href);
  const pathname = url.pathname;

  // 1) Trouver la **vraie base** jusqu’au segment "maquette-1" (gère locale/basePath)
  const parts = pathname.split("/").filter(Boolean); // ex: ["fr","maquette-1","Dentia","Paris",...]
  const idx = parts.indexOf(ROUTE_SEGMENT);
  const basePath = idx >= 0 ? "/" + parts.slice(0, idx + 1).join("/") : "/" + ROUTE_SEGMENT;

  let ent = "", city = "", phone = "", email = "";
  let shouldClean = false;

  // 2) LIRE depuis les **segments** après "maquette-1"
  const tail = idx >= 0 ? parts.slice(idx + 1) : [];
  if (tail.length > 0) {
    const last = tail[tail.length - 1];
    if (last.includes("-")) {
      const t = last.split("-").map(clean);
      [ent, city, phone, email] = [t[0] || "", t[1] || "", t[2] || "", t[3] || ""];
    } else {
      const t = tail.map(clean);
      [ent, city, phone, email] = [t[0] || "", t[1] || "", t[2] || "", t[3] || ""];
    }
    shouldClean = true; // on a utilisé des segments → on les masquera
  }

  // 3) LIRE depuis **query compacte** ?v=Entreprise|Ville|Tel|Email
  const v = url.searchParams.get("v");
  if (v) {
    const t = v.split("|").map(clean);
    ent = t[0] || ent;
    city = t[1] || city;
    phone = t[2] || phone;
    email = t[3] || email;
    shouldClean = true;
  }

  // 4) LIRE depuis **query claire**
  const cq = {
    company: clean(url.searchParams.get("company")),
    city: clean(url.searchParams.get("city")),
    phone: clean(url.searchParams.get("phone")),
    email: clean(url.searchParams.get("email")),
  };
  if (cq.company || cq.city || cq.phone || cq.email) {
    ent = cq.company || ent;
    city = cq.city || city;
    phone = cq.phone || phone;
    email = cq.email || email;
    shouldClean = true;
  }

  // 5) LIRE depuis **hash** (optionnel)
  if (!ent) {
    const raw = window.location.hash || "";
    const hash = raw.startsWith("#") ? raw.slice(1) : raw;
    if (hash) {
      const h = hash.split("/").map(clean);
      ent = h[0] || ent;
      city = h[1] || city;
      phone = h[2] || phone;
      email = h[3] || email;
      shouldClean = true;
    }
  }

  return { basePath, ent, city, phone, email, shouldClean };
}

export default function Page() {
  // Valeurs lues + URL nettoyée une seule fois au montage
  const [{ ent, city, phone, email }, setVals] = useState({ ent: "", city: "", phone: "", email: "" });

  useEffect(() => {
    const { basePath, ent, city, phone, email, shouldClean } = readUrlValues();
    setVals({ ent, city, phone, email });

    if (shouldClean) {
      // ⚠️ On ne change **que** l’URL affichée, pas de navigation.
      try {
        // Conserve exactement la base détectée (locale/basePath compris)
        window.history.replaceState(null, "", basePath);
      } catch {}
    }
  }, []);

  // iFrame/options (inchangé)
  const [path] = useState<string>("/");
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
    const absolute = new URL(path || "/", TARGET).toString();
    const params = new URLSearchParams({ url: absolute });

    if (ent) params.set("company", ent);
    if (city) params.set("city", city);
    if (phone) params.set("phone", phone);
    if (email) params.set("email", email);

    if (disableJs) params.set("disableJs", "1");
    for (const sel of parseRemove(removeInput)) params.append("remove", sel);
    return `/api/proxy?${params.toString()}`;
  }, [path, disableJs, removeInput, ent, city, phone, email]);

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
