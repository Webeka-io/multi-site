import Image from "next/image"

export default function CraftsmanshipSection() {
  return (
    <section id="craftsmanship" className="py-32 bg-white">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="text-center mb-20">
          <p className="text-amber-600 font-medium tracking-wider uppercase text-sm mb-4">Savoir-faire</p>
          <h2 className="text-5xl md:text-6xl font-serif font-light text-stone-900 leading-tight mb-6">
            L'Art du
            <span className="block font-normal italic">Détail</span>
          </h2>
          <div className="w-16 h-px bg-amber-600 mx-auto mb-8"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="space-y-8">
            <div className="aspect-square relative overflow-hidden rounded-lg">
              <Image
                src="/barber-8 (1).webp"
                alt="Outils de barbier artisanaux"
                fill
                className="object-cover"
              />
            </div>
            <div className="space-y-4">
              <h3 className="text-2xl font-serif font-light text-stone-900">Outils d'Exception</h3>
              <p className="text-stone-600 leading-relaxed">
                Nos instruments, sélectionnés parmi les plus prestigieuses maisons européennes, garantissent une
                précision et un confort inégalés.
              </p>
            </div>
          </div>

          <div className="space-y-8">
            <div className="aspect-square relative overflow-hidden rounded-lg">
              <Image
                src="/barber-11 (1).webp"
                alt="Produits de soin premium"
                fill
                className="object-cover"
              />
            </div>
            <div className="space-y-4">
              <h3 className="text-2xl font-serif font-light text-stone-900">Produits Artisanaux</h3>
              <p className="text-stone-600 leading-relaxed">
                Formulations exclusives aux ingrédients naturels, créées en partenariat avec les meilleurs artisans
                parfumeurs parisiens.
              </p>
            </div>
          </div>

          <div className="space-y-8">
            <div className="aspect-square relative overflow-hidden rounded-lg">
              <Image
                src="/barber-9 (1).webp"
                alt="Technique de coupe précise"
                fill
                className="object-cover"
              />
            </div>
            <div className="space-y-4">
              <h3 className="text-2xl font-serif font-light text-stone-900">Technique Millimétrique</h3>
              <p className="text-stone-600 leading-relaxed">
                Chaque geste est calculé, chaque coupe pensée selon les règles de l'art barbier traditionnel européen,
                transmises de maître à apprenti.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
