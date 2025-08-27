import type { Tenant } from "@/lib/types";
import Header1 from "@/app/(project)/templates/layout/header/header-1";
import Image from "next/image";

export const routes = [""] as const; // ⬅️ mono-page

export function Layout({ children, tenant }: { children: React.ReactNode; tenant: Tenant }) {
  return (
    <div className="mx-auto max-w-5xl p-6">
      <header className="">
        <Header1/>
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

      <Image
          src="/sites/boulangerie-marie/logo.png"
          alt="Salon de barbier moderne avec fauteuils en cuir"
          fill
          className="hidden md:block object-cover"
          priority
        />

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
