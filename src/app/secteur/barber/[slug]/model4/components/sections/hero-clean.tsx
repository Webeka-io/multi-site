import Image from "next/image"
import { Button } from "@/app/secteur/barber/[slug]/model4/components/ui/button"
import Link from "next/link"
import { ArrowRight, Star, Scissors } from "lucide-react"
import type { Business } from "@/lib/parseSlug"
type Props = { business?: Business }

export default function HeroClean({ business }: Props) {
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
    <section id="home" className="min-h-screen flex items-center bg-white">
      <div className="container mx-auto px-6 lg:px-8 my-[100px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm font-medium">
              <Star className="h-4 w-4" />
              Barbershop Moderne à {ville}
            </div>

            {/* Main Title */}
            <div className="space-y-6">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-light text-gray-900 leading-tight animate-fade-slide-right">
                {entPrefix && <span>{entPrefix}&nbsp;</span>} <br />
                {entLast && <span className="block font-medium">{entLast}</span>}
               
              </h1>

              <p className="text-xl md:text-2xl text-gray-600 font-light leading-relaxed max-w-lg">
                Simplicité. Qualité. Excellence.
              </p>
            </div>

            {/* Description */}
            <p className="text-lg text-gray-500 leading-relaxed max-w-xl">
              Une approche moderne du barbershop traditionnel. Nous nous concentrons sur l'essentiel : vous offrir une
              expérience exceptionnelle dans un environnement épuré et professionnel.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                asChild
                size="lg"
                className="bg-gray-900 hover:bg-gray-800 text-white font-medium px-8 py-4 rounded-full group"
              >
                <Link href="#booking" className="flex items-center gap-2">
                  Réserver maintenant
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-gray-300 text-gray-700 hover:bg-gray-50 font-medium px-8 py-4 rounded-full bg-transparent"
              >
                <Link href="#services">Nos services</Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-12 border-t border-gray-100">
              <div>
                <div className="text-2xl font-semibold text-gray-900 mb-1">500+</div>
                <div className="text-sm text-gray-500 uppercase tracking-wider">Clients satisfaits</div>
              </div>
              <div>
                <div className="text-2xl font-semibold text-gray-900 mb-1">4.9</div>
                <div className="text-sm text-gray-500 uppercase tracking-wider">Note moyenne</div>
              </div>
              <div>
                <div className="text-2xl font-semibold text-gray-900 mb-1">5</div>
                <div className="text-sm text-gray-500 uppercase tracking-wider">Années d'expérience</div>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="h-155 relative overflow-hidden rounded-2xl bg-gray-100">
              <Image
                src="/barber-4 (1).webp"
                alt="Salon moderne et épuré"
                fill
                className="object-cover"
                priority
              />
            </div>
            {/* Floating Card */}
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg border border-gray-100">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center">
                  <Scissors className="h-6 w-6 text-white rotate-45" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Ouvert aujourd'hui</div>
                  <div className="text-sm text-gray-500">9h - 19h</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
