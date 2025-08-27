import ModernHeader from "@/app/secteur/barber/[slug]/model8/components/layout/modern-header"
import HeroModern from "@/app/secteur/barber/[slug]/model8/components/sections/hero-modern"
import AboutModern from "@/app/secteur/barber/[slug]/model8/components/sections/about-modern"
import ServicesModern from "@/app/secteur/barber/[slug]/model8/components/sections/services-modern"
import FooterModern from "@/app/secteur/barber/[slug]/model8/components/layout/footer-modern"

export default function Home() {
  return (
    <main className="min-h-screen">
      <ModernHeader />
      <HeroModern />
      <AboutModern />
      <ServicesModern />
      <FooterModern />
    </main>
  )
}
