import Image from "next/image";
import { getTenantBySlug } from "@/lib/tenant";
import { notFound } from "next/navigation";

export default async function Home({
  params,
}: {
  params: Promise<{ tenant: string }>;
}) {
  const { tenant } = await params;          // ⬅️ important
  const t = getTenantBySlug(tenant);
  if (!t) notFound();

  return (
    <main className="mx-auto max-w-5xl p-6 space-y-10">
      <section className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <Image src={`/sites/${t.slug}/logo.png`} alt={`${t.name} logo`} width={56} height={56} />
          <span className="font-medium opacity-70">{t.name}</span>
        </div>
        <h1 className="text-4xl font-bold">{t.content.heroTitle}</h1>
        {t.content.heroSubtitle && <p className="text-lg opacity-80">{t.content.heroSubtitle}</p>}
        {t.content.ctaLabel && (
          <a href="#contact" className="inline-block rounded-xl px-6 py-3 font-medium text-white" style={{ background: "var(--color-primary)" }}>
            {t.content.ctaLabel}
          </a>
        )}
      </section>
      {/* ... tes sections comme avant, en remplaçant tenant → t ... */}
    </main>
  );
}
