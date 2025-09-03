// app/portavia/page.tsx
"use client";

import React from "react";

export default function Page() {
  const TARGET = "https://portavia.framer.website/";
  const PATH = "/"; // change en "/about" pour tester cette page

  const absolute = new URL(PATH, TARGET).toString();
  const params = new URLSearchParams({
    url: absolute,
    translate: "fr", // ⬅️ active la traduction FR
    // disableJs: "1", // si besoin
  });
  const proxySrc = `/api/proxy?${params.toString()}`;

  const wrapStyle: React.CSSProperties = {
    position: "relative",
    height: "100vh",
    overflow: "hidden",
  };

  const iframeStyle: React.CSSProperties = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "130%",
    border: "0",
  };

  const gutterBase: React.CSSProperties = {
    position: "fixed",
    top: 0,
    bottom: "5vh",
    width: "45%",
    zIndex: 10000,
    background: "transparent",
    pointerEvents: "none",
  };

  const gutterLeft: React.CSSProperties = { ...gutterBase, left: 0 };
  const gutterRight: React.CSSProperties = { ...gutterBase, right: 0 };

  return (
    <>
      <style jsx global>{`
        html,
        body {
          margin: 0;
          height: 100%;
          overflow: hidden;
        }
      `}</style>

      <div style={wrapStyle}>
        <iframe
          src={proxySrc}
          style={iframeStyle}
          sandbox="allow-scripts allow-same-origin"
          referrerPolicy="no-referrer-when-downgrade"
        />
        <div style={gutterLeft} />
        <div style={gutterRight} />
      </div>
    </>
  );
}
