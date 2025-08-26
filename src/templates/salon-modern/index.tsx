import type { Tenant } from "@/lib/types";

export const routes = [""] as const; // ⬅️ mono-page

export function Layout({ children, tenant }: { children: React.ReactNode; tenant: Tenant }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="mx-auto max-w-6xl px-6 py-4 flex justify-between">
        <div className="font-bold">{tenant.name}</div>
        <div className="flex gap-6">
          {/* ✅ ancres internes ; plus de <a href="/"> ni /services /rdv */}
          <a href="#top">Accueil</a>
          <a href="#services">Prestations</a>
          <a href="#rdv" className="px-4 py-2 rounded text-white" style={{ background: "var(--color-secondary)" }}>
            Prendre RDV
          </a>
        </div>
      </nav>
      <main className="mx-auto max-w-6xl px-6 py-10">{children}</main>
    </div>
  );
}

export function Page({ tenant }: { path?: string[]; tenant: Tenant }) {
  return (
    <>
      <section id="top">
        <h1 className="text-5xl font-extrabold mb-2">{tenant.content.heroTitle}</h1>
        {tenant.content.heroSubtitle && <p className="text-lg opacity-80">{tenant.content.heroSubtitle}</p>}
      </section>

      <section id="services" className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">Prestations</h2>
        {/* … */}
      </section>

      <section id="rdv" className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">Prendre RDV</h2>
        {/* … */}
      </section>
    </>
  );
}
