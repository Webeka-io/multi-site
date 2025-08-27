import { NextRequest, NextResponse } from "next/server";
import { matchTenantByDomain } from "@/lib/tenant";

// === À PERSONNALISER ===
const EXTERNAL_DEST_ORIGIN = "https://www.webeka.fr"; // où envoyer la home "/"
const CANONICAL_HOST = "www.webeka.fr";               // hôte canonique pour TOUTES les requêtes
// ========================

export function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const { pathname, search } = url;
  const host = req.headers.get("host") || "";

  // 0) Bypass: static, Next internals, API, assets
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname === "/favicon.ico" ||
    /\.(?:png|jpe?g|webp|svg|gif|ico|txt|xml|css|js|map|woff2?|ttf|eot|otf|mp4|webm|ogg|mp3)$/i.test(pathname)
  ) {
    return NextResponse.next();
  }

  // 1) En local et en preview, ne rien forcer
  const isLocal = host.includes("localhost");
  const isPreview = host.endsWith(".vercel.app");
  if (isLocal || isPreview) {
    return NextResponse.next();
  }

  // 2) Canonicaliser l'hôte (apex -> www, ou inverse)
  //    Ex: "exemple.com" -> "www.exemple.com" en 308, en conservant le path + query
  if (host !== "" && host !== CANONICAL_HOST) {
    const canonicalURL = new URL(url.toString());
    canonicalURL.host = CANONICAL_HOST;
    canonicalURL.protocol = "https:"; // force https
    return NextResponse.redirect(canonicalURL, 308);
  }

  // 3) Rediriger UNIQUEMENT la home "/" vers un site externe
  //    Évite la boucle en vérifiant qu'on n'est pas déjà sur le domaine cible.
  const destHost = new URL(EXTERNAL_DEST_ORIGIN).host;
  if (pathname === "/" && host !== destHost) {
    // vers l'origine externe, sans conserver path/query (c'est la home)
    return NextResponse.redirect(new URL(EXTERNAL_DEST_ORIGIN), 308);
  }

  // 4) Prod multi-tenant : router par domaine
  const tenant = matchTenantByDomain(host);
  if (!tenant) {
    // pas de tenant: servir la landing correspondante
    return NextResponse.rewrite(new URL(`/landing${pathname}${search}`, req.url));
  }

  return NextResponse.rewrite(new URL(`/${tenant.slug}${pathname}${search}`, req.url));
}

// Bonus : matcher qui ignore déjà les fichiers (.*\..*)
export const config = {
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
