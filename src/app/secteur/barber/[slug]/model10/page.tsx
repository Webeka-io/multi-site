import NordicHeader from "@/app/secteur/barber/[slug]/model10/components/layout/nordic-header"
import HeroNordic from "@/app/secteur/barber/[slug]/model10/components/sections/hero-nordic"
import PhilosophyNordic from "@/app/secteur/barber/[slug]/model10/components/sections/philosophy-nordic"
import ServicesNordic from "@/app/secteur/barber/[slug]/model10/components/sections/services-nordic"
import TeamNordic from "@/app/secteur/barber/[slug]/model10/components/sections/team-nordic"
import TestimonialsNordic from "@/app/secteur/barber/[slug]/model10/components/sections/testimonials-nordic"
import BookingNordic from "@/app/secteur/barber/[slug]/model10/components/sections/booking-nordic"
import ContactNordic from "@/app/secteur/barber/[slug]/model10/components/sections/contact-nordic"
import FooterNordic from "@/app/secteur/barber/[slug]/model10/components/layout/footer-nordic"

export default function LandingPage() {
  return (
    <>
      <NordicHeader />
      <main>
        <HeroNordic />
        <PhilosophyNordic />
        <ServicesNordic />
        <TeamNordic />
        <TestimonialsNordic />
        <BookingNordic />
        <ContactNordic />
      </main>
      <FooterNordic />
    </>
  )
}
