import CraftHeader from "@/app/secteur/barber/[slug]/model9/components/layout/craft-header"
import HeroCraft from "@/app/secteur/barber/[slug]/model9/components/sections/hero-craft"
import ArtisanSection from "@/app/secteur/barber/[slug]/model9/components/sections/artisan-section"
import ServicesCraft from "@/app/secteur/barber/[slug]/model9/components/sections/services-craft"

export default function Home() {
  return (
    <main className="min-h-screen">
      <CraftHeader />
      <HeroCraft />
      <ArtisanSection />
      <ServicesCraft />
    </main>
  )
}
