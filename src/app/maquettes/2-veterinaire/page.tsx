// app/portavia/page.tsx
"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

const TARGET = "https://secured-principles-292763.framer.app/";

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
    ".__framer-badge-container, #__framer-badge-container, .framer-1fin31n-container, #framer-1fin31n-container, .framer-rcd755-container, #framer-rcd755-container, .framer-1limyy, #framer-1limyy"
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
    if (disableJs) params.set("disableJs", "1");
    for (const sel of parseRemove(removeInput)) params.append("remove", sel);
    return `/api/proxy?${params.toString()}`;
  }, [path, disableJs, removeInput]);

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
        <div style={gutterLeft} />
        <div style={gutterRight} />
      </div>
    </>
  );
}
