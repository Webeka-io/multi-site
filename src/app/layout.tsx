import "./globals.css";
import React from "react";
import { Toaster } from "@/app/components/ui/sonner"; // ou "@/components/ui/toaster" selon la version générée


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      {/* on laisse simple pour éviter tout mismatch */}
      <body className="min-h-screen ">
        
        {children}
        <Toaster />
      </body>
    </html>
  );
}
