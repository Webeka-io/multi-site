import type { Tenant } from "@/lib/types";
import Image from "next/image";

export const routes = [""] as const; // ⬅️ mono-page

export function Layout({ children, tenant }: { children: React.ReactNode; tenant: Tenant }) {
  return (
    <div className="mx-auto max-w-5xl p-6">
      <header className="flex items-center gap-3 mb-8">
        <Image src={`/sites/${tenant.slug}/logo.png`} alt={`${tenant.name} logo`} width={40} height={40} />
        <strong>{tenant.name}</strong>
        <nav className="ml-auto flex gap-6 text-sm">
          {/* ⚠️ ancres internes, pas de /contact */}
          <a href="#services">Nos spécialités</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>
      {children}
      <footer className="mt-10 opacity-70">© {tenant.name}</footer>
    </div>
  );
}

export function Page({ tenant }: { path?: string[]; tenant: Tenant }) {
  return (
    <>
      {/* HERO */}
      <section id="top" className="text-center space-y-4">
        <h1 className="text-4xl font-bold">{tenant.content.heroTitle}</h1>
        {tenant.content.heroSubtitle && <p className="text-lg opacity-80">{tenant.content.heroSubtitle}</p>}
        {tenant.content.ctaLabel && (
          // ✅ ancre interne (plus d'erreur ESLint)
          <a href="#contact" className="inline-block rounded-xl px-6 py-3 font-medium text-white" style={{ background: "var(--color-primary)" }}>
            {tenant.content.ctaLabel}
          </a>
        )}
      </section>

      {/* SERVICES */}
      <section id="services" className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <h2 className="md:col-span-3 text-2xl font-semibold">Nos spécialités</h2>
        {/* …tes cartes de services… */}
      </section>

      {/* CONTACT */}
      <section id="contact" className="mt-12 rounded-2xl p-6 border space-y-2">
        <h2 className="text-2xl font-semibold">Contact</h2>
        <p>Adresse : 12 rue du Four, 75000 Paris</p>
        <p>Tél : 01 23 45 67 89</p>
        {/* ton formulaire… */}
      </section>
    </>
  );
}
