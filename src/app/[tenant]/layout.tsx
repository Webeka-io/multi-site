import "@/app/globals.css";
import { getTenantBySlug } from "@/lib/tenant";
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

export default async function TenantLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ tenant: string }>;
}) {
  const { tenant } = await params;
  const t = getTenantBySlug(tenant);
  if (!t) return <>{children}</>; // ou notFound()

  const themeVars: ThemeVars = {
    "--color-primary": t.theme.primary,
    "--color-secondary": t.theme.secondary,
    "--bg": t.theme.bg ?? "#ffffff",
    "--surface": t.theme.surface ?? "#ffffff",
    "--border": t.theme.border ?? "#e5e7eb",
    "--text": t.theme.text ?? "#0f172a",
    "--radius": t.theme.radius ?? "16px",
    "--h1-size": "2.5rem",
  };

  // ⬇️ un simple wrapper qui porte les variables + classes
  return (
    <div
      data-tenant={t.slug}
      data-template={t.template}
      style={themeVars}
      className="min-h-screen text-[var(--text)] bg-[var(--bg)]"
    >
      {children}
    </div>
  );
}
