import Image from "next/image"
import { Button } from "@/app/secteur/barber/[slug]/model2/components/ui/button"
import Link from "next/link"
import { ArrowDown } from "lucide-react"
import type { Business } from "@/lib/parseSlug"
import { OpeningHoursNavbarGlass } from "@/app/(project)/templates/widgets/opening-hour/components/opening-hours-navbar-glass"

type Props = { business?: Business }

export default function HeroMinimal({ business }: Props) {
  const entreprise = business?.entreprise
  const ville = business?.ville
  const secteur = business?.secteur

  const [entPrefix, entLast] = (() => {
  const s = (entreprise ?? "").trim()
  if (!s) return ["", ""]
  const parts = s.split(/\s+/)
  const last = parts.pop() ?? ""
  return [parts.join(" "), last]
})()

  return (
    <section id="home" className="relative min-h-screen flex items-center ">
      <div className="absolute inset-0">
        <Image
          src="/barber-11 (1).webp"
          alt="Salon de barbier élégant avec lumière naturelle"
          fill
          className="hidden md:block object-cover"
          priority
        />
        <Image
          src="/barbertel-1 (1).webp"
          alt="Salon de barbier élégant avec lumière naturelle"
          fill
          className="block md:hidden object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-br from-stone-900/40 via-stone-900/20 to-transparent"></div>
      </div>

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl">
          <div className="space-y-8">

          <OpeningHoursNavbarGlass/>

            <div className="space-y-4">
              <p className="text-amber-600 font-medium tracking-wider uppercase text-sm">
                Maison de Barbier à {ville}
              </p>
              <h1 className="animate-fade-slide-left text-6xl md:text-8xl lg:text-9xl font-serif font-light text-white leading-none tracking-tight">
                {entPrefix && <span>{entPrefix}&nbsp;</span>} <br />
                {entLast && <span className="block italic text-amber-600 font-medium">{entLast}</span>}
               
              </h1>
            </div>
            <div className="max-w-2xl space-y-6">
              <p className="text-xl md:text-2xl text-stone-100 font-light leading-relaxed">
                Votre Barbier de Quartier à {ville}
              </p>
              <p className="text-lg text-stone-100 text-shadow-xs leading-relaxed">
                L'art traditionnel du barbier sublimé par l'élégance contemporaine. Une expérience sensorielle unique au
                cœur de {ville}.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 pt-8">
              <Button
                asChild
                size="lg"
                className="bg-amber-600 hover:bg-amber-700 text-white font-medium px-8 py-4 rounded-full"
              >
                <Link href="#reservation">Prendre Rendez-vous</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-stone-900 font-medium px-8 py-4 rounded-full bg-transparent"
              >
                <Link href="#philosophy">Découvrir notre philosophie</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ArrowDown className="h-6 w-6 text-white/60" />
      </div>
    </section>
  )
}
