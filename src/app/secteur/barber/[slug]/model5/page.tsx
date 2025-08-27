import LuxuryHeader from "@/app/secteur/barber/[slug]/model5/components/layout/luxury-header"
import HeroPremium from "@/app/secteur/barber/[slug]/model5/components/sections/hero-premium"
import HeritageSection from "@/app/secteur/barber/[slug]/model5/components/sections/heritage-section"
import ServicesLuxury from "@/app/secteur/barber/[slug]/model5/components/sections/services-luxury"
import ExclusiveSection from "@/app/secteur/barber/[slug]/model5/components/sections/exclusive-section"
import MastersSection from "@/app/secteur/barber/[slug]/model5/components/sections/masters-section"
import TestimonialsSection from "@/app/secteur/barber/[slug]/model5/components/sections/testimonials-section"
import ServicesSection from "@/app/secteur/barber/[slug]/model5//components/sections/services-section"
import ReservationSection from "@/app/secteur/barber/[slug]/model5/components/sections/reservation-section"


export default function LandingPage() {
  return (
    <>
      <LuxuryHeader />
      <main>
        <HeroPremium />
        <HeritageSection />
        <ServicesLuxury />
        <ExclusiveSection />
        <MastersSection />
        <TestimonialsSection />
        <ServicesSection />
        <ReservationSection />
      </main>
    
    </>
  )
}
