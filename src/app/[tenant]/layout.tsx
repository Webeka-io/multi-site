import "@/app/globals.css";
import { getTenantBySlug } from "@/lib/tenant";
import React from "react";

// ✅ On déclare un type pour nos variables CSS custom
type ThemeVars = React.CSSProperties & {
  ["--color-primary"]?: string;
  ["--color-secondary"]?: string;
};

export default async function TenantLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ tenant: string }>;
}) {
  const { tenant } = await params;
  const t = getTenantBySlug(tenant);

  if (!t) {
    return (
      <html lang="fr">
        <body>Client inconnu.</body>
      </html>
    );
  }

  // ✅ Objet de style typé (plus besoin d’ignore)
  const themeVars: ThemeVars = {
    "--color-primary": t.theme.primary,
    "--color-secondary": t.theme.secondary,
  };

  return (
    <html lang="fr">
      <body className="min-h-screen bg-white text-gray-900" style={themeVars}>
        {children}
      </body>
    </html>
  );
}
