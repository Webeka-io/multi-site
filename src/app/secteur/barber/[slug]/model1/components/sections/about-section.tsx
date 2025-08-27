import Image from "next/image"

import type { Business } from "@/lib/parseSlug"
type Props = { business?: Business }


 
export default function AboutSection({ business }: Props) {
  const entreprise = business?.entreprise
  const ville = business?.ville
  const secteur = business?.secteur
  return (
    <section id="about" className="py-32 bg-gradient-to-b from-black to-gray-900">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-red-600 to-red-800 rounded-lg blur opacity-25"></div>
            <Image
              src="/barber-4 (1).webp"
              alt="Barbier professionnel au travail"
              width={600}
              height={800}
              className="relative rounded-lg shadow-2xl"
            />
          </div>
          <div className="space-y-8">
            <div>
              <h2 className="text-5xl md:text-6xl font-display font-black text-white mb-6 leading-tight">
                L'ART DU
                <span className="block bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">
                  BARBIER
                </span> 
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-red-700"></div>
            </div>
            <div className="space-y-6 text-gray-300 text-lg leading-relaxed font-serif">
              <p>
                Depuis plus de 15 ans, chez <span className=" bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">{entreprise}</span> nous perpétuons l'art traditionnel du barbier avec une approche résolument
                moderne. Chaque coupe est une œuvre d'art, chaque client une histoire unique.
              </p>
              <p>
                Notre équipe de maîtres barbiers combine techniques ancestrales et innovations contemporaines pour vous
                offrir une expérience incomparable. Du rasage à l'ancienne aux coupes les plus tendances, nous
                sculpteons votre style avec passion et précision.
              </p>
              <p>
                <span className=" bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">{entreprise}</span> , c'est plus qu'un salon : c'est un sanctuaire masculin où tradition et modernité se
                rencontrent pour révéler le meilleur de vous-même.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-8 pt-8">
              <div className="text-center">
                <div className="text-4xl font-display font-black text-red-500 mb-2">15+</div>
                <div className="text-sm text-gray-400 uppercase tracking-wider">Années d'expérience</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-display font-black text-red-500 mb-2">5000+</div>
                <div className="text-sm text-gray-400 uppercase tracking-wider">Clients satisfaits</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-display font-black text-red-500 mb-2">100%</div>
                <div className="text-sm text-gray-400 uppercase tracking-wider">Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
