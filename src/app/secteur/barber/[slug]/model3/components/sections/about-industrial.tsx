import Image from "next/image"
import { Wrench, Target, Zap } from "lucide-react"
import type { Business } from "@/lib/parseSlug"
type Props = { business?: Business }

export default function AboutIndustrial({ business }: Props) {
  const entreprise = business?.entreprise
  const ville = business?.ville
  const secteur = business?.secteur
  return (
    <section id="about" className="py-6 bg-zinc-800 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-orange-500/10 to-transparent"></div>
        <div className="absolute top-20 right-20 w-96 h-96 border border-zinc-700 rotate-45"></div>
        <div className="absolute bottom-20 right-20 w-64 h-64 border border-zinc-700 rotate-12"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10 mr-[] lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-px bg-orange-500"></div>
                <span className="text-orange-500 font-bold uppercase tracking-wider text-sm">À Propos</span>
              </div>
              <h2 className="text-6xl md:text-7xl font-display font-black text-white leading-tight">
                STYLE
                <span className="block text-orange-500">URBAIN</span>
                <span className="block text-4xl md:text-5xl text-zinc-400">AUTHENTIQUE</span>
              </h2>
            </div>

            <div className="space-y-6 text-zinc-300 text-lg leading-relaxed">
              <p>
                <strong className="text-white">{entreprise}</strong> n'est pas juste un barbershop. C'est un espace
                où l'art de la coupe rencontre l'esthétique urbaine moderne.
              </p>
              <p>
                Nos barbiers, formés aux techniques les plus avancées, maîtrisent autant les coupes classiques que les
                styles les plus contemporains. Chaque client repart avec une coupe qui reflète sa personnalité unique.
              </p>
              <p>
                Dans notre salon au design industriel, nous créons une expérience immersive où musique, ambiance et
                savoir-faire se conjuguent pour un moment d'exception.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
              <div className="bg-zinc-900 p-6 border-l-4 border-orange-500">
                <Wrench className="h-8 w-8 text-orange-500 mb-4" />
                <h3 className="text-white font-bold mb-2">TECHNIQUE</h3>
                <p className="text-zinc-400 text-sm">Maîtrise parfaite des outils et techniques modernes</p>
              </div>
              <div className="bg-zinc-900 p-6 border-l-4 border-orange-500">
                <Target className="h-8 w-8 text-orange-500 mb-4" />
                <h3 className="text-white font-bold mb-2">PRÉCISION</h3>
                <p className="text-zinc-400 text-sm">Chaque détail compte pour un résultat impeccable</p>
              </div>
              <div className="bg-zinc-900 p-6 border-l-4 border-orange-500">
                <Zap className="h-8 w-8 text-orange-500 mb-4" />
                <h3 className="text-white font-bold mb-2">INNOVATION</h3>
                <p className="text-zinc-400 text-sm">Toujours à la pointe des dernières tendances</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-[4/5] relative overflow-hidden">
              <Image
                src="/barber-4 (1).webp"
                alt="Barbier au travail dans un environnement moderne"
                fill
                className="object-cover filter grayscale hover:grayscale-0 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/50 to-transparent"></div>
            </div>
            <div className="absolute -top-8 -right-8 w-32 h-32 border-2 border-orange-500 rotate-45"></div>
            <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-orange-500/20"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
