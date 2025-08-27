import Image from "next/image"

export default function ExperienceSection() {
  return (
    <section id="experience" className="py-10 bg-black relative overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/placeholder.svg?width=1920&height=1080"
          alt="Intérieur luxueux du salon"
          fill
          className="object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-black"></div>
      </div>

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl">
          <h2 className="text-5xl md:text-7xl font-display font-black text-white mb-8 leading-tight">
            UNE EXPÉRIENCE
            <span className="block bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">
              INOUBLIABLE
            </span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-16">
            <div className="space-y-8">
              <div className="border-l-4 border-red-500 pl-6">
                <h3 className="text-2xl font-display font-bold text-white mb-4">AMBIANCE UNIQUE</h3>
                <p className="text-gray-400 font-serif leading-relaxed">
                  Plongez dans un univers où le cuir, le bois noble et les détails vintage créent une atmosphère
                  authentique et chaleureuse.
                </p>
              </div>

              <div className="border-l-4 border-red-500 pl-6">
                <h3 className="text-2xl font-display font-bold text-white mb-4">EXPERTISE RECONNUE</h3>
                <p className="text-gray-400 font-serif leading-relaxed">
                  Nos barbiers maîtres, formés aux techniques traditionnelles et modernes, vous garantissent un résultat
                  exceptionnel.
                </p>
              </div>
            </div>

            <div className="space-y-8">
              <div className="border-l-4 border-red-500 pl-6">
                <h3 className="text-2xl font-display font-bold text-white mb-4">PRODUITS PREMIUM</h3>
                <p className="text-gray-400 font-serif leading-relaxed">
                  Nous utilisons exclusivement des produits haut de gamme, sélectionnés pour leur qualité et leur
                  respect de votre peau.
                </p>
              </div>

              <div className="border-l-4 border-red-500 pl-6">
                <h3 className="text-2xl font-display font-bold text-white mb-4">SERVICE PERSONNALISÉ</h3>
                <p className="text-gray-400 font-serif leading-relaxed">
                  Chaque prestation est adaptée à vos besoins spécifiques, pour un résultat qui vous ressemble
                  parfaitement.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
