// app/portavia/page.tsx
"use client";

import React, { useMemo, useState } from "react";

const TARGET = "https://bombon.framer.website/";

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

  // Traduction & JS
  const [translate, setTranslate] = useState<boolean>(true);
  const [disableJs, setDisableJs] = useState<boolean>(false);

  // Sélecteurs à supprimer (le badge Framer est déjà géré côté proxy, on le laisse ici pour le montrer)
  const [removeInput, setRemoveInput] = useState<string>(
    ".__framer-badge-container, #__framer-badge-container"
  );

  const proxySrc = useMemo(() => {
    const absolute = new URL(path || "/", TARGET).toString();
    const params = new URLSearchParams({ url: absolute });
    if (translate) params.set("translate", "fr");
    if (disableJs) params.set("disableJs", "1");
    for (const sel of parseRemove(removeInput)) params.append("remove", sel);
    return `/api/proxy?${params.toString()}`;
  }, [path, translate, disableJs, removeInput]);

  // Styles inline (TS-friendly)
  const wrapStyle: React.CSSProperties = {
    position: "relative",
    height: "100vh",   // on garde 95% -> 5% rognés en bas
    overflow: "hidden" // masque le bas
  };

  const iframeStyle: React.CSSProperties = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",    // dépasse de 5% pour combler le rognage
    border: "0"
  };

  const toolbarStyle: React.CSSProperties = {
    position: "fixed",
    left: 12,
    right: 12,
    top: 12,
    zIndex: 10001,
    display: "flex",
    gap: 8,
    alignItems: "center",
    flexWrap: "wrap",
    padding: "8px 10px",
    borderRadius: 12,
    background: "rgba(255,255,255,0.9)",
    boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
    fontSize: 14
  };

  const inputStyle: React.CSSProperties = {
    padding: "6px 10px",
    border: "1px solid #ddd",
    borderRadius: 8,
    minWidth: 160
  };

  const gutterBase: React.CSSProperties = {
    position: "fixed",
    top: 0,
    bottom: "5vh",       // ne couvre pas la zone rognée
    width: "45%",
    zIndex: 10000,
    background: "transparent",
    pointerEvents: "none" // laisse passer les events vers l’iframe
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
        .toolbar-label {
          opacity: 0.7;
          margin-right: 4px;
        }
      `}</style>

      {/* Barre d’outils (optionnelle) 
      <div style={toolbarStyle}>
        <span className="toolbar-label">Chemin :</span>
        <input
          style={inputStyle}
          value={path}
          onChange={(e) => setPath(e.target.value)}
          placeholder="/, /about, /work/123…"
        />

        <span className="toolbar-label">Supprimer :</span>
        <input
          style={{ ...inputStyle, minWidth: 320 }}
          value={removeInput}
          onChange={(e) => setRemoveInput(e.target.value)}
          placeholder=".cookie, #newsletter, .ads … (séparés par , ; ou retour)"
        />

        <label style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <input
            type="checkbox"
            checked={translate}
            onChange={(e) => setTranslate(e.target.checked)}
          />
          Traduire en français
        </label>

        <label style={{ display: "flex", alignItems: "center", gap: 6 }}>
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
          key={proxySrc}              // force le reload quand l’URL change
          src={proxySrc}
          style={iframeStyle}
          sandbox="allow-scripts allow-same-origin"
          referrerPolicy="no-referrer-when-downgrade"
        />

        {/* Gouttières latérales : le scroll passe directement à l’iframe */}
        <div style={gutterLeft} />
        <div style={gutterRight} />
      </div>
    </>
  );
}
