import { getTenantBySlug } from "@/lib/tenant";
import type { Tenant } from "@/lib/types";
import { templateLoaders } from "@/templates/registry";
import { notFound } from "next/navigation";

export default async function TenantPage({
  params,
}: {
  params: Promise<{ tenant: string }>;
}) {
  const { tenant } = await params;
  const t: Tenant | null = getTenantBySlug(tenant);
  if (!t) notFound();

  // ✅ t.template est un TemplateId → index sûr
  const load = templateLoaders[t.template];
  const mod = await load();

  const Layout = mod.Layout ?? (({ children }: { children: React.ReactNode }) => <>{children}</>);
  const Page = mod.Page;
  return (
    <Layout tenant={t}>
      <Page path={[]} tenant={t} />
    </Layout>
  );
}
