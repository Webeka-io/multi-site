import SideNavigation from "@/app/secteur/barber/[slug]/model3/components/layout/side-navigation"
import HeroUrban from "@/app/secteur/barber/[slug]/model3/components/sections/hero-urban"
import AboutIndustrial from "@/app/secteur/barber/[slug]/model3/components/sections/about-industrial"
import ServicesGrid from "@/app/secteur/barber/[slug]/model3/components/sections/services-grid"
import SkillsSection from "@/app/secteur/barber/[slug]/model3/components/sections/skills-section"
import ReviewsSection from "@/app/secteur/barber/[slug]/model3/components/sections/reviews-section"
import WorkGallery from "@/app/secteur/barber/[slug]/model3/components/sections/work-gallery"
import BookingInline from "@/app/secteur/barber/[slug]/model3/components/sections/booking-inline"
import ContactUrban from "@/app/secteur/barber/[slug]/model3/components/sections/contact-urban"
import { parseSlug, type Business } from "@/lib/parseSlug"
import type { Metadata } from "next"

export default function LandingPage(props: any) {
  const { params } = props as { params: { slug: string } }
  const business: Business = parseSlug(params.slug)
  return (
    <div className="flex">
      <SideNavigation business={business}  />
      <main className="flex-1 mr-0 lg:mr-20">
        <HeroUrban business={business} />
        <AboutIndustrial business={business} />
        <ServicesGrid />
        <SkillsSection />
        <ReviewsSection />
        <WorkGallery />
        <BookingInline />
        <ContactUrban business={business} />
      </main>
    </div>
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