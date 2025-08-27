import { NextRequest, NextResponse } from "next/server";
import { matchTenantByDomain } from "@/lib/tenant";

// À personnaliser
const EXTERNAL_DEST_ORIGIN = "https://www.webeka.fr";

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

  // 1) Local / preview Vercel : pas de redirection spéciale
  const isLocal = host.includes("localhost");
  const isPreview = host.endsWith(".vercel.app");
  if (isLocal || isPreview) return NextResponse.next();

  // 2) Ne rediriger que la home "/"
  if (pathname === "/") {
    const destHost = new URL(EXTERNAL_DEST_ORIGIN).host;
    if (host !== destHost) {
      return NextResponse.redirect(EXTERNAL_DEST_ORIGIN, 308);
    }
    // déjà sur le domaine de destination → ne rien faire
    return NextResponse.next();
  }

  // 3) Multi-tenant pour le reste
  const tenant = matchTenantByDomain(host);
  if (!tenant) {
    // ⚠️ IMPORTANT : ne pas re-préfixer si la route commence déjà par /landing
    if (pathname.startsWith("/landing")) {
      return NextResponse.next(); // servir /landing et ses enfants tels quels
    }
    // sinon, fallback vers /landing + path
    return NextResponse.rewrite(new URL(`/landing${pathname}${search}`, req.url));
  }

  return NextResponse.rewrite(new URL(`/${tenant.slug}${pathname}${search}`, req.url));
}

export const config = {
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
