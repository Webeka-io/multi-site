import "./globals.css";
import React from "react";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      {/* on laisse simple pour éviter tout mismatch */}
      <body className="min-h-screen">
        {children}
      </body>
    </html>
  );
}
