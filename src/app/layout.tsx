// app/layout.tsx (RootLayout)
import "./globals.css";
// (optionnel) si tu utilises next/font :
/*
import { Geist, Geist_Mono } from "next/font/google";
const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });
const mono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono" });
*/

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body
        // garde ici les classes de font pour éviter les divergences SSR/Client
        className={
          // `${geist.variable} ${mono.variable} min-h-screen bg-white text-gray-900`
          "min-h-screen bg-white text-gray-900"
        }
      >
        {children}
      </body>
    </html>
  );
}
