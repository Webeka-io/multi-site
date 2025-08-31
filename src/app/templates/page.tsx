"use client"

import React from "react";

export default function Page() {
  // Styles inline (TS-friendly)
  const wrapStyle: React.CSSProperties = {
    position: "relative",
    height: "100vh",        // on garde 95% -> 5% rognés en bas
    overflow: "hidden",    // masque le bas
  };

  const iframeStyle: React.CSSProperties = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "130%",        // dépasse de 5% pour combler le rognage
    border: "0",
  };

  const gutterBase: React.CSSProperties = {
    position: "fixed",
    top: 0,
    bottom: "5vh",         // ne couvre pas la zone rognée
    width: "45%",
    zIndex: 10000,
    background: "transparent",
    pointerEvents: "none", // laisse passer les events vers l'iframe
  };

  const gutterLeft: React.CSSProperties = { ...gutterBase, left: 0 };
  const gutterRight: React.CSSProperties = { ...gutterBase, right: 0 };

  return (
    <>
      {/* Global reset pour cette page */}
      <style jsx global>{`
        html,
        body {
          margin: 0;
          height: 100%;
          overflow: hidden; /* pas de scroll externe */
        }
      `}</style>

      <div style={wrapStyle}>
        <iframe
          src="https://portavia.framer.website/"
          style={iframeStyle}
          sandbox="allow-scripts allow-same-origin"
        />

        {/* Gouttières latérales : le scroll passe directement à l’iframe */}
        <div style={gutterLeft} />
        <div style={gutterRight} />
      </div>
    </>
  );
}
