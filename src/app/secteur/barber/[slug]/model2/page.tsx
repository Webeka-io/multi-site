import FloatingNav from "@/app/secteur/barber/[slug]/model2/components/layout/floating-nav"
import HeroMinimal from "@/app/secteur/barber/[slug]/model2/components/sections/hero-minimal"
import PhilosophySection from "@/app/secteur/barber/[slug]/model2/components/sections/philosophy-section"
import ServicesLuxury from "@/app/secteur/barber/[slug]/model2/components/sections/services-luxury"
import CraftsmanshipSection from "@/app/secteur/barber/[slug]/model2/components/sections/craftsmanship-section"
import TestimonialsElegant from "@/app/secteur/barber/[slug]/model2/components/sections/testimonials-elegant"
import GalleryGrid from "@/app/secteur/barber/[slug]/model2/components/sections/gallery-grid"
import ReservationSection from "@/app/secteur/barber/[slug]/model2/components/sections/reservation-section"
import FooterMinimal from "@/app/secteur/barber/[slug]/model2/components/layout/footer-minimal"
import { parseSlug, type Business } from "@/lib/parseSlug"
import type { Metadata } from "next"

export default function Page(props: any) {
  const { params } = props as { params: { slug: string } }
  const business: Business = parseSlug(params.slug)
  return (
    <>
      <FloatingNav business={business} />
      <main className="relative">
        <HeroMinimal business={business} />
        <PhilosophySection business={business} />
        <ServicesLuxury />
        <CraftsmanshipSection />
        <TestimonialsElegant business={business} />
        <GalleryGrid business={business} />
        <ReservationSection />
      </main>
      <FooterMinimal business={business} />
    </>
  )
}

export async function generateMetadata(props: any): Promise<Metadata> {
  const { params } = props as { params: { slug: string } }
  const { entreprise, ville, secteur } = parseSlug(params.slug)
  const title = entreprise && ville ? `${entreprise} à ${ville}` : "Gentleman’s Cut"
  const description = secteur
    ? `${entreprise} — ${secteur} à ${ville}. Votre barbier de quartier, redéfini.`
    : `${entreprise} à ${ville}. Votre barbier de quartier, redéfini.`
  return { title, description }
}
