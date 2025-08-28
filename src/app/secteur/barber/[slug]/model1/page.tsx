// app/secteur/barber/[slug]/model1/page.tsx
import Navigation from "@/app/secteur/barber/[slug]/model1/components/layout/navigation"
import HeroSection from "@/app/secteur/barber/[slug]/model1/components/sections/hero-section"
import AboutSection from "@/app/secteur/barber/[slug]/model1/components/sections/about-section"
import ServicesGrid from "@/app/secteur/barber/[slug]/model1/components/sections/services-grid"
import ExperienceSection from "@/app/secteur/barber/[slug]/model1/components/sections/experience-section"
import TestimonialsCarousel from "@/app/secteur/barber/[slug]/model1/components/sections/testimonials-carousel"
import GalleryMasonry from "@/app/secteur/barber/[slug]/model1/components/sections/gallery-masonry"
import ContactSection from "@/app/secteur/barber/[slug]/model1/components/sections/contact-section"
 {/*  import BookingModal from "@/app/secteur/barber/[slug]/model1/components/modals/booking-modal"  */}
import { parseSlug, type Business } from "@/lib/parseSlug"
import { Oswald, Lora } from "next/font/google"
import type { Metadata } from "next"
import WhatsAppButton from "@/app/(project)/templates/widgets/whatsapp/WhatsAppButton"

const oswald = Oswald({ subsets: ["latin"], variable: "--font-oswald" })
const lora   = Lora({ subsets: ["latin"],  variable: "--font-lora" })

export default function Page(props: any) {
  const { params } = props as { params: { slug: string } }
  const business: Business = parseSlug(params.slug)

  return (
    <div className={`theme-model1 ${oswald.variable} ${lora.variable}`}>
      <Navigation business={business} />
      <main>
        <HeroSection business={business} />
        <AboutSection business={business} />
        <ServicesGrid />
        <ExperienceSection />
        <TestimonialsCarousel />
        <GalleryMasonry />
        <ContactSection business={business}  />
        
      </main>
     
       {/* <BookingModal />*/}
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
