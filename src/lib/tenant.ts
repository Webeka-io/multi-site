import { tenants, type Tenant } from "./tenants";

function normalizeHost(host: string) {
  const h = host.split(":")[0].toLowerCase();
  return h.startsWith("www.") ? h.slice(4) : h;
}

export function matchTenantByDomain(hostname: string): Tenant | null {
  const host = normalizeHost(hostname);
  return tenants.find(t => t.domains.some(d => normalizeHost(d) === host)) ?? null;
}

export function getTenantBySlug(slug: string): Tenant | null {
  return tenants.find(t => t.slug === slug) ?? null;
}
