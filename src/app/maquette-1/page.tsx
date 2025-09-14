// app/portavia/page.tsx
"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

const TARGET = "https://genial-cogwheel-567577.framer.app/";

function parseRemove(input: string): string[] {
  return input
    .split(/[,;\n]/)
    .map((s) => s.trim())
    .filter(Boolean)
    .slice(0, 50);
}

export default function Page() {
  const [path, setPath] = useState<string>("/");
  const [disableJs, setDisableJs] = useState<boolean>(false);
  const [removeInput, setRemoveInput] = useState<string>(
    ".__framer-badge-container, #__framer-badge-container, .framer-1fin31n-container, #framer-1fin31n-container, .framer-rcd755-container, #framer-rcd755-container,"
  );

  // Hauteur réelle du viewport visuel (corrige 100vh sur mobile)
  const [vh, setVh] = useState<number | null>(null);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  useEffect(() => {
    const updateVh = () => {
      // visualViewport est le plus fiable sur mobile (barre d'adresse dynamique)
      const vv = (window as any).visualViewport;
      const height = vv?.height ?? window.innerHeight;
      setVh(Math.round(height));
    };

    updateVh();
    const vv = (window as any).visualViewport;
    if (vv) {
      vv.addEventListener("resize", updateVh);
      vv.addEventListener("scroll", updateVh); // la barre peut bouger au scroll
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
    if (disableJs) params.set("disableJs", "1");
    for (const sel of parseRemove(removeInput)) params.append("remove", sel);
    return `/api/proxy?${params.toString()}`;
  }, [path, disableJs, removeInput]);

  // Styles : utilise dvh/svh et retombe sur la hauteur mesurée
  const wrapStyle: React.CSSProperties = {
    position: "relative",
    // dvh/svh règlent la marge fantôme sur mobile modernes ; la hauteur mesurée (vh) sert de fallback solide
    height: vh ? `${vh}px` : "100dvh",
    minHeight: vh ? `${vh}px` : "100svh",
    overflow: "hidden",
    WebkitOverflowScrolling: "touch",
  };

  const iframeStyle: React.CSSProperties = {
    position: "absolute",
    inset: 0, // top:0, right:0, bottom:0, left:0
    width: "100%",
    height: "100%",
    border: "0",
  };

  const gutterBase: React.CSSProperties = {
    position: "fixed",
    top: 0,
    bottom: 0,
    width: 0,
    zIndex: 10000,
    background: "transparent",
    pointerEvents: "none",
  };
  const gutterLeft: React.CSSProperties = { ...gutterBase, left: 0 };
  const gutterRight: React.CSSProperties = { ...gutterBase, right: 0 };

  return (
    <>
      {/* Reset global allégé : ne bloque plus le scroll système
          et corrige Safari iOS avec -webkit-fill-available */}
      <style jsx global>{`
        html,
        body,
        #__next {
          margin: 0;
          padding: 0;
          height: 100%;
        }
        html {
          height: -webkit-fill-available;
        }
        body {
          min-height: 100svh;
          overscroll-behavior-y: none;
          font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto,
            Helvetica, Arial, Apple Color Emoji, Segoe UI Emoji;
          /* NE PAS forcer overflow:hidden global, ça casse les viewports mobiles */
          overflow: hidden;
          background: #0000; /* transparent */
        }
      `}</style>

      {/* Barre d’outils (optionnelle)
      <div>
        <span>Chemin :</span>
        <input
          value={path}
          onChange={(e) => setPath(e.target.value)}
          placeholder="/, /about, /work/123…"
        />

        <span>Supprimer :</span>
        <input
          value={removeInput}
          onChange={(e) => setRemoveInput(e.target.value)}
          placeholder=".cookie, #newsletter, .ads …"
        />

        <label>
          <input
            type="checkbox"
            checked={disableJs}
            onChange={(e) => setDisableJs(e.target.checked)}
          />
          Désactiver le JS du site
        </label>
      </div>*/}

      <div style={wrapStyle}>
        <iframe
          ref={iframeRef}
          key={proxySrc}
          src={proxySrc}
          style={iframeStyle}
          // Important : laisser le scroll à l’intérieur de l’iframe
          sandbox="allow-scripts allow-same-origin"
          referrerPolicy="no-referrer-when-downgrade"
        />
        {/* Gouttières latérales (aucun impact vertical) */}
        <div style={gutterLeft} />
        <div style={gutterRight} />
      </div>
    </>
  );
}
