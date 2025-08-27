import { headers } from "next/headers";
import { matchTenantByDomain, getTenantBySlug } from "@/lib/tenant";

// Cherche d'abord par domaine, sinon tente de déduire le slug depuis le "referer"
function resolveTenantSlug(host: string, referer?: string): string | null {
  // 1) domaine (prod)
  const t = matchTenantByDomain(host);
  if (t) return t.slug;

  // 2) referer (dev/preview), ex: http://localhost:3000/webeka-io
  if (referer) {
    try {
      const u = new URL(referer);
      const seg = u.pathname.split("/").filter(Boolean)[0]; // "webeka-io"
      if (seg && getTenantBySlug(seg)) return seg;
    } catch {
      // ignore
    }
  }
  return null;
}

export async function GET(req: Request) {
  const hdrs = await headers();
  const host = (hdrs.get("host") ?? "").toLowerCase();
  const referer = hdrs.get("referer") ?? undefined;

  const slug = resolveTenantSlug(host, referer);
  const targetPath = slug
    ? `/sites/${slug}/favicon-32x32.png`
    : `/icon.png`; // ⚠️ mets /public/icon.png comme fallback global

  // Sert le binaire sans redirection
  const url = new URL(req.url);
  const res = await fetch(new URL(targetPath, url), { cache: "no-store" });
  if (!res.ok) {
    return new Response(null, { status: 404 });
  }

  return new Response(await res.arrayBuffer(), {
    headers: {
      "content-type": "image/png",
      "cache-control": "public, max-age=3600, immutable",
    },
  });
}
