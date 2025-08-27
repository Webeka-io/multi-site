import Image from "next/image"
import type { Business } from "@/lib/parseSlug"
type Props = { business?: Business }

export default function PhilosophySection({ business }: Props) {
  const entreprise = business?.entreprise
  const ville = business?.ville
  const secteur = business?.secteur

  return (
    <section id="philosophy" className="py-32 bg-white">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <p className="text-amber-600 font-medium tracking-wider uppercase text-sm">Notre Philosophie</p>
              <h2 className="text-5xl md:text-6xl font-serif font-light text-stone-900 leading-tight">
                L'Art de
                <span className="block font-normal italic">l'Excellence</span>
              </h2>
            </div>
            <div className="w-16 h-px bg-amber-600"></div>
            <div className="space-y-6 text-stone-600 text-lg leading-relaxed">
              <p>
                Chez <span className="text-amber-600 font-medium tracking-wider text-lg">{entreprise}</span>, nous croyons que chaque homme mérite une expérience exceptionnelle. Notre
                philosophie repose sur trois piliers fondamentaux : l'excellence technique, l'attention personnalisée et
                l'élégance intemporelle.
              </p>
              <p>
                Nos maîtres barbiers, formés aux techniques traditionnelles européennes, allient savoir-faire ancestral
                et innovations contemporaines pour révéler votre style unique avec une précision chirurgicale.
              </p>
              <p>
                Plus qu'un simple salon, nous créons un sanctuaire masculin où le temps s'arrête, où chaque détail
                compte, où l'art du barbier devient une expérience sensorielle inoubliable.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-8 pt-8">
              <div className="text-center">
                <div className="text-3xl font-serif font-light text-amber-600 mb-2">20+</div>
                <div className="text-sm text-stone-500 uppercase tracking-wider">Années d'expertise</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-serif font-light text-amber-600 mb-2">8K+</div>
                <div className="text-sm text-stone-500 uppercase tracking-wider">Clients privilégiés</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-serif font-light text-amber-600 mb-2">100%</div>
                <div className="text-sm text-stone-500 uppercase tracking-wider">Satisfaction garantie</div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/5] relative overflow-hidden rounded-lg">
              <Image
                src="/barber-4 (1).webp"
                alt="Maître barbier au travail avec précision"
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-amber-600/10 rounded-full blur-3xl"></div>
            <div className="absolute -top-8 -left-8 w-24 h-24 bg-stone-900/10 rounded-full blur-2xl"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
