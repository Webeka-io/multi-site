import { NextRequest, NextResponse } from "next/server";
import { matchTenantByDomain } from "@/lib/tenant";

// === À PERSONNALISER ===
const EXTERNAL_DEST_ORIGIN = "https://www.webeka.fr"; // URL externe de la home
// ========================

export function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const { pathname, search } = url;
  const host = req.headers.get("host") || "";

  // 0) Bypass: assets, Next internals, API
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname === "/favicon.ico" ||
    /\.(?:png|jpe?g|webp|svg|gif|ico|txt|xml|css|js|map|woff2?|ttf|eot|otf|mp4|webm|ogg|mp3)$/i.test(pathname)
  ) {
    return NextResponse.next();
  }

  // 1) En local ou preview vercel.app : pas de redirection
  const isLocal = host.includes("localhost");
  const isPreview = host.endsWith(".vercel.app");
  if (isLocal || isPreview) return NextResponse.next();

  // 2) Rediriger UNIQUEMENT la page "/" vers l’URL externe
  const destHost = new URL(EXTERNAL_DEST_ORIGIN).host;
  if (pathname === "/" && host !== destHost) {
    return NextResponse.redirect(EXTERNAL_DEST_ORIGIN, 308);
  }

  // 3) Sinon, fonctionnement normal multi-tenant
  const tenant = matchTenantByDomain(host);
  if (!tenant) {
    return NextResponse.rewrite(new URL(`/landing${pathname}${search}`, req.url));
  }
  return NextResponse.rewrite(new URL(`/${tenant.slug}${pathname}${search}`, req.url));
}

export const config = {
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
