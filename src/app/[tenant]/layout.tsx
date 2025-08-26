// app/[tenant]/layout.tsx
import { getTenantBySlug } from "@/lib/tenant";

export default function TenantLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { tenant: string };
}) {
  const tenant = getTenantBySlug(params.tenant);

  if (!tenant) {
    // pas de <html>/<body> ici !
    return <div>Client inconnu.</div>;
  }

  // On applique le thème sur un <div> conteneur (pas sur <body>)
  return (
    <div
      style={
        {
          // @ts-ignore: variables CSS custom
          "--color-primary": tenant.theme.primary,
          "--color-secondary": tenant.theme.secondary,
        } as React.CSSProperties
      }
      className="min-h-screen"
    >
      {children}
    </div>
  );
}
