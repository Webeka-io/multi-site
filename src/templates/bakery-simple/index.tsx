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

// ex. bakery-simple
export function Page({ tenant }: { tenant: Tenant }) {
  return (
    <>
      <section className="text-center space-y-4">
        <h1>{tenant.content.heroTitle}</h1>
        {tenant.content.heroSubtitle && <p className="opacity-80">{tenant.content.heroSubtitle}</p>}
        {tenant.content.ctaLabel && <a href="#contact" className="btn">{tenant.content.ctaLabel}</a>}
      </section>

      <section id="services" className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <article className="card">
          <h3 className="font-semibold mb-1">Pain au levain</h3>
          <p className="opacity-80">Cuit chaque matin</p>
        </article>
        {/* … */}
      </section>

      <section id="contact" className="mt-12 card">
        <h2 className="text-2xl font-semibold mb-2">Contact</h2>
        {/* … */}
      </section>
    </>
  );
}
