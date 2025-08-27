import BrutalistHeader from "@/app/secteur/barber/[slug]/model6/components/layout/brutalist-header"
import HeroBrutalist from "@/app/secteur/barber/[slug]/model6/components/sections/hero-brutalist"
import ManifestoSection from "@/app/secteur/barber/[slug]/model6/components/sections/manifesto-section"
import ServicesGrid from "@/app/secteur/barber/[slug]/model6/components/sections/services-grid"
import ProcessSection from "@/app/secteur/barber/[slug]/model6/components/sections/process-section"

import TestimonialsSection from "@/app/secteur/barber/[slug]/model6/components/sections/testimonials-section"
import GallerySection from "@/app/secteur/barber/[slug]/model6/components/sections/gallery-section"
import BookingSection from "@/app/secteur/barber/[slug]/model6/components/sections/booking-section"
import FooterBrutalist from "@/app/secteur/barber/[slug]/model6/components/layout/footer"

export default function LandingPage() {
  return (
    <>
      <BrutalistHeader />
      <main>
        <HeroBrutalist />
        <ManifestoSection />
        <ServicesGrid />
        <ProcessSection />
       
        <TestimonialsSection />
        <GallerySection />
        <BookingSection />
      </main>
      <FooterBrutalist />
    </>
  )
}
