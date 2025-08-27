import { NextRequest, NextResponse } from "next/server";
import { matchTenantByDomain } from "@/lib/tenant";

// À personnaliser
const EXTERNAL_DEST_ORIGIN = "https://webeka.fr"; // destination de la home "/"

export function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const { pathname, search } = url;
  const host = req.headers.get("host") || "";

  // 0) Laisser passer les assets, Next internals, API
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname === "/favicon.ico" ||
    /\.(?:png|jpe?g|webp|svg|gif|ico|txt|xml|css|js|map|woff2?|ttf|eot|otf|mp4|webm|ogg|mp3)$/i.test(pathname)
  ) {
    return NextResponse.next();
  }

  // 1) Local / preview Vercel : pas de logique spéciale
  const isLocal = host.includes("localhost");
  const isPreview = host.endsWith(".vercel.app");
  if (isLocal || isPreview) return NextResponse.next();

  // 2) Rediriger UNIQUEMENT la home "/" vers le domaine externe (évite la boucle)
  if (pathname === "/") {
    const destHost = new URL(EXTERNAL_DEST_ORIGIN).host;
    if (host !== destHost) {
      return NextResponse.redirect(EXTERNAL_DEST_ORIGIN, 308);
    }
    return NextResponse.next();
  }

  // 3) Multi-tenant par domaine quand il y en a un
  const tenant = matchTenantByDomain(host);
  if (tenant) {
    return NextResponse.rewrite(new URL(`/${tenant.slug}${pathname}${search}`, req.url));
  }

  // 4) Pas de tenant : NE PAS réécrire (laisse /secteur/... /landing/... etc. tels quels)
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
