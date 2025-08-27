import MinimalHeader from "@/app/secteur/barber/[slug]/model4/components/layout/minimal-header"
import HeroClean from "@/app/secteur/barber/[slug]/model4/components/sections/hero-clean"
import AboutMinimal from "@/app/secteur/barber/[slug]/model4/components/sections/about-minimal"
import ServicesGrid from "@/app/secteur/barber/[slug]/model4/components/sections/services-grid"
import ProcessSection from "@/app/secteur/barber/[slug]/model4/components/sections/process-section"
import TestimonialsClean from "@/app/secteur/barber/[slug]/model4/components/sections/testimonials-clean"
import GalleryMinimal from "@/app/secteur/barber/[slug]/model4/components/sections/gallery-minimal"
import BookingSimple from "@/app/secteur/barber/[slug]/model4/components/sections/booking-simple"
import FooterClean from "@/app/secteur/barber/[slug]/model4/components/layout/footer-clean"
import { parseSlug, type Business } from "@/lib/parseSlug"
import type { Metadata } from "next"

export default function LandingPage(props: any) {
  const { params } = props as { params: { slug: string } }
  const business: Business = parseSlug(params.slug)
  return (
    <>
      <MinimalHeader business={business}  />
      <main>
        <HeroClean business={business} />
        <AboutMinimal />
        <ServicesGrid />
        <ProcessSection />
        <TestimonialsClean />
        <GalleryMinimal />
        <BookingSimple />
      </main>
      <FooterClean business={business} />
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
