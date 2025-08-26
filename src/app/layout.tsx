import "./globals.css";
import React from "react";

type ThemeVars = React.CSSProperties & {
  ["--color-primary"]?: string;
  ["--color-secondary"]?: string;
  ["--bg"]?: string;
  ["--surface"]?: string;
  ["--border"]?: string;
  ["--text"]?: string;
  ["--radius"]?: string;
  ["--h1-size"]?: string;
};

const defaultVars: ThemeVars = {
  "--color-primary": "#111827",
  "--color-secondary": "#6B7280",
  "--bg": "#ffffff",
  "--surface": "#ffffff",
  "--border": "#e5e7eb",
  "--text": "#0f172a",
  "--radius": "16px",
  "--h1-size": "2.5rem",
};

export default function RootLayout({
  children,
}: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body
        data-template="landing"
        style={defaultVars}
        className="min-h-screen text-[var(--text)] bg-[var(--bg)]"
      >
        {children}
      </body>
    </html>
  );
}
