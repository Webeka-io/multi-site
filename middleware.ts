import { NextRequest, NextResponse } from "next/server";
import { matchTenantByDomain } from "@/lib/tenant";

export function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const { pathname } = url;
  const host = req.headers.get("host") || "";

  // Laisse passer les assets / API
  if (pathname.startsWith("/_next") || pathname.startsWith("/api") || pathname === "/favicon.ico" || pathname.startsWith("/robots") || pathname.startsWith("/sitemap")) {
    return NextResponse.next();
  }

  // En dev/local et en preview *.vercel.app → on autorise l'accès path-based (/[tenant])
  const isLocal = host.includes("localhost");
  const isPreview = host.endsWith(".vercel.app");
  if (isLocal || isPreview) return NextResponse.next();

  // Prod : on détermine le tenant via le domaine
  const tenant = matchTenantByDomain(host);
  if (!tenant) {
    // Domaine inconnu → landing générique
    return NextResponse.rewrite(new URL(`/landing${pathname}`, req.url));
  }

  // Réécrit vers /<slug> pour activer app/[tenant]
  return NextResponse.rewrite(new URL(`/${tenant.slug}${pathname}`, req.url));
}

export const config = {
  matcher: ["/((?!_next|favicon.ico).*)"],
};
