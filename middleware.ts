import { NextRequest, NextResponse } from "next/server";
import { matchTenantByDomain } from "@/lib/tenant";

export function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const { pathname } = url;
  const host = req.headers.get("host") || "";

  // 1) Laisser passer Next internals, API et TOUS les fichiers (public/assets)
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname === "/favicon.ico" ||
    /\.(?:png|jpe?g|webp|svg|gif|ico|txt|xml|css|js|map|woff2?|ttf|eot|otf|mp4|webm|ogg|mp3)$/i.test(pathname)
  ) {
    return NextResponse.next();
  }

  // 2) Local + previews vercel.app : on teste par chemin /[tenant]
  const isLocal = host.includes("localhost");
  const isPreview = host.endsWith(".vercel.app");
  if (isLocal || isPreview) return NextResponse.next();

  // 3) Prod : router par domaine
  const tenant = matchTenantByDomain(host);
  if (!tenant) {
    return NextResponse.rewrite(new URL(`/landing${pathname}`, req.url));
  }
  return NextResponse.rewrite(new URL(`/${tenant.slug}${pathname}`, req.url));
}

// Bonus : matcher qui ignore déjà les fichiers (.*\..*)
export const config = {
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
