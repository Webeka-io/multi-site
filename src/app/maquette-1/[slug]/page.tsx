"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";

const TARGET = "https://genial-cogwheel-567577.framer.app/";

function parseRemove(input: string): string[] {
  return input
    .split(/[,;\n]/)
    .map((s) => s.trim())
    .filter(Boolean)
    .slice(0, 50);
}

function clean(val: string | undefined) {
  if (!val) return "";
  return decodeURIComponent(val).trim().slice(0, 128).replace(/[<>"]/g, "");
}

/**
 * Supporte :
 *  - /maquette-1/Entreprise/Ville/Tel/Email
 *  - /maquette-1/Entreprise-Ville-Tel-Email
 *  - /maquette-1/Entreprise
 */
function useSlugFields() {
  const pathname = usePathname() || "/";
  const parts = pathname.split("/").filter(Boolean);
  const last = parts[parts.length - 1] || "";

  let ent = "", city = "", phone = "", email = "";

  if (last.includes("-")) {
    // Format compact
    const t = last.split("-").map(clean);
    [ent, city, phone, email] = [t[0] || "", t[1] || "", t[2] || "", t[3] || ""];
  } else {
    // Format 4 segments
    const tail = parts.slice(-4).map(clean);
    if (tail.length === 4) {
      [ent, city, phone, email] = tail;
    } else if (tail.length >= 1) {
      ent = clean(last);
    }
  }
  return { ent, city, phone, email };
}

export default function Page() {
  const { ent, city, phone, email } = useSlugFields();

  // ✨ Overrides issus du hash (prioritaires si présents)
  const [ovr, setOvr] = useState({ ent: "", city: "", phone: "", email: "" });

  // Lis #Entreprise/Ville/Tel/Email puis nettoie l’URL (supprime le hash)
  useEffect(() => {
    if (typeof window === "undefined") return;
    const raw = window.location.hash || "";
    const hash = raw.startsWith("#") ? raw.slice(1) : raw;
    if (!hash) return;

    const parts = hash.split("/").map(clean);
    const next = {
      ent: parts[0] || "",
      city: parts[1] || "",
      phone: parts[2] || "",
      email: parts[3] || "",
    };
    setOvr(next);

    // Nettoie la barre d'adresse (garde le chemin actuel, retire juste le hash)
    try {
      const cleanUrl = window.location.pathname + window.location.search;
      window.history.replaceState(null, "", cleanUrl);
    } catch {}
  }, []);

  // Valeurs finales envoyées au proxy (hash > slug)
  const ENT = ovr.ent || ent;
  const CITY = ovr.city || city;
  const PHONE = ovr.phone || phone;
  const EMAIL = ovr.email || email;

  // iFrame / options (inchangé)
  const [path, setPath] = useState<string>("/");
  const [disableJs, setDisableJs] = useState<boolean>(false);
  const [removeInput, setRemoveInput] = useState<string>(
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

    if (ENT) params.set("company", ENT);
    if (CITY) params.set("city", CITY);
    if (PHONE) params.set("phone", PHONE);
    if (EMAIL) params.set("email", EMAIL);

    if (disableJs) params.set("disableJs", "1");
    for (const sel of parseRemove(removeInput)) params.append("remove", sel);
    return `/api/proxy?${params.toString()}`;
  }, [path, disableJs, removeInput, ENT, CITY, PHONE, EMAIL]);

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
