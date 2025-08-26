import Image from "next/image";
import { getTenantBySlug } from "@/lib/tenant";

export default function Home({ params }: { params: { tenant: string } }) {
  const tenant = getTenantBySlug(params.tenant)!;

  return (
    <main className="mx-auto max-w-5xl p-6 space-y-10">
      {/* Hero */}
      <section className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <Image
            src={`/sites/${tenant.slug}/logo.png`}
            alt={`${tenant.name} logo`}
            width={56}
            height={56}
          />
          <span className="font-medium opacity-70">{tenant.name}</span>
        </div>
        <h1 className="text-4xl font-bold">{tenant.content.heroTitle}</h1>
        {tenant.content.heroSubtitle && (
          <p className="text-lg opacity-80">{tenant.content.heroSubtitle}</p>
        )}
        {tenant.content.ctaLabel && (
          <a
            href="#contact"
            className="inline-block rounded-xl px-6 py-3 font-medium text-white"
            style={{ background: "var(--color-primary)" }}
          >
            {tenant.content.ctaLabel}
          </a>
        )}
      </section>

      {/* Sections génériques (services, galerie, contact, etc.) */}
      {tenant.content.sections?.map((s, i) => {
        if (s.kind === "services") {
          return (
            <section key={i} className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <h2 className="md:col-span-3 text-2xl font-semibold">{s.title ?? "Nos services"}</h2>
              {s.items?.map((it, j) => (
                <div key={j} className="rounded-2xl p-6 shadow-sm border">
                  <h3 className="font-semibold mb-2">{it.title}</h3>
                  {it.text && <p className="opacity-80">{it.text}</p>}
                </div>
              ))}
            </section>
          );
        }
        if (s.kind === "gallery") {
          return (
            <section key={i} className="space-y-4">
              <h2 className="text-2xl font-semibold">{s.title ?? "Galerie"}</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {s.items?.map((it, j) => (
                  <Image key={j} src={it.image ?? "/placeholder.png"} alt="" width={600} height={400} className="rounded-xl object-cover h-40 w-full" />
                ))}
              </div>
            </section>
          );
        }
        if (s.kind === "testimonials") {
          return (
            <section key={i} className="space-y-4">
              <h2 className="text-2xl font-semibold">{s.title ?? "Avis"}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {s.items?.map((it, j) => (
                  <blockquote key={j} className="rounded-2xl p-6 border italic opacity-90">
                    “{it.text}” — {it.title}
                  </blockquote>
                ))}
              </div>
            </section>
          );
        }
        if (s.kind === "contact") {
          return (
            <section key={i} id="contact" className="rounded-2xl p-6 border space-y-2">
              <h2 className="text-2xl font-semibold">{s.title ?? "Contact"}</h2>
              <p>Adresse : 12 rue du Four, 75000 Paris</p>
              <p>Tél : 01 23 45 67 89</p>
              <form className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3" action="https://formspree.io/f/xexample" method="POST">
                <input className="border rounded-lg p-3" name="name" placeholder="Votre nom" />
                <input className="border rounded-lg p-3" name="email" type="email" placeholder="Votre email" />
                <textarea className="border rounded-lg p-3 md:col-span-2" name="message" placeholder="Votre message" />
                <button className="rounded-lg px-5 py-3 text-white font-medium md:col-span-2" style={{ background: "var(--color-secondary)" }}>
                  Envoyer
                </button>
              </form>
            </section>
          );
        }
        return null;
      })}
    </main>
  );
}
