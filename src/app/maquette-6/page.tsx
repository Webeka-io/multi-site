// app/portavia/page.tsx
"use client";

import React, { useMemo, useState } from "react";

const TARGET = "https://hopeful-copywriter-299860.framer.app/";

function parseRemove(input: string): string[] {
  return input
    .split(/[,;\n]/)        // virgules, points-virgules ou sauts de ligne
    .map((s) => s.trim())
    .filter(Boolean)
    .slice(0, 50);          // petite limite de sécurité
}

export default function Page() {
  // Chemin interne du site proxifié
  const [path, setPath] = useState<string>("/");

  // Options
  const [disableJs, setDisableJs] = useState<boolean>(false);

  // Sélecteurs à supprimer (le badge Framer est déjà géré côté proxy, on le laisse ici pour le montrer)
  const [removeInput, setRemoveInput] = useState<string>(
    ".__framer-badge-container, #__framer-badge-container, .framer-1fin31n-container, #framer-1fin31n-container,.framer-rcd755-container,#framer-rcd755-container,"
  );

  const proxySrc = useMemo(() => {
    const absolute = new URL(path || "/", TARGET).toString();
    const params = new URLSearchParams({ url: absolute });
    if (disableJs) params.set("disableJs", "1");
    for (const sel of parseRemove(removeInput)) params.append("remove", sel);
    return `/api/proxy?${params.toString()}`;
  }, [path, disableJs, removeInput]);

  // Styles inline (TS-friendly)
  const wrapStyle: React.CSSProperties = {
    position: "relative",
    height: "100vh",
    overflow: "hidden"
  };

  const iframeStyle: React.CSSProperties = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    border: "0"
  };

  const gutterBase: React.CSSProperties = {
    position: "fixed",
    top: 0,
    bottom: "5vh",
    width: "45%",
    zIndex: 10000,
    background: "transparent",
    pointerEvents: "none"
  };

  const gutterLeft: React.CSSProperties = { ...gutterBase, left: 0 };
  const gutterRight: React.CSSProperties = { ...gutterBase, right: 0 };

  return (
    <>
      {/* Reset global pour cette page */}
      <style jsx global>{`
        html,
        body {
          margin: 0;
          height: 100%;
          overflow: hidden; /* pas de scroll externe */
          font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto,
            Helvetica, Arial, Apple Color Emoji, Segoe UI Emoji;
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
          key={proxySrc}
          src={proxySrc}
          style={iframeStyle}
          sandbox="allow-scripts allow-same-origin"
          referrerPolicy="no-referrer-when-downgrade"
        />

        {/* Gouttières latérales */}
        <div style={gutterLeft} />
        <div style={gutterRight} />
      </div>
    </>
  );
}
