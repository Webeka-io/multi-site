import DecoHeader from "@/app/secteur/barber/[slug]/model7/components/layout/deco-header"
import HeroDeco from "@/app/secteur/barber/[slug]/model7/components/sections/hero-deco"
import PrestigeSection from "@/app/secteur/barber/[slug]/model7/components/sections/prestige-section"
import ServicesDeco from "@/app/secteur/barber/[slug]/model7/components/sections/services-deco"

export default function LandingPage() {
  return (
    <>
      <DecoHeader />
      <main>
        <HeroDeco />
        <PrestigeSection />
        <ServicesDeco />
      </main>
    </>
  )
}
