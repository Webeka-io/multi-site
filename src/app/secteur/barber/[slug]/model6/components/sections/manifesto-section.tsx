import { Zap, Target, Scissors, ArrowRight } from "lucide-react"

export default function ManifestoSection() {
  return (
    <section id="manifesto" className="py-32 bg-black text-white relative overflow-hidden">
      {/* Geometric Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-64 h-64 bg-red-500 -translate-x-32 -translate-y-32 rotate-45"></div>
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-white -translate-x-24 translate-y-24"></div>
        <div className="absolute top-1/2 left-1/4 w-2 h-32 bg-red-500 rotate-45"></div>
      </div>

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-3 bg-red-500 text-white px-6 py-3 border-4 border-white shadow-brutal mb-8">
              <Zap className="h-5 w-5" />
              <span className="font-mono font-bold text-sm uppercase tracking-wider">MANIFESTO</span>
            </div>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-display font-black text-white leading-tight mb-8">
              NOUS CASSONS
              <span className="block text-red-500">LES CODES</span>
            </h2>
            <div className="w-32 h-2 bg-red-500 mx-auto mb-8"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-20">
            <div className="space-y-8">
              <div className="space-y-6">
                <h3 className="text-4xl font-display font-black text-white">RÉVOLUTION CAPILLAIRE</h3>
                <p className="text-xl text-gray-300 leading-relaxed font-mono">
                  Fini les barbershops poussiéreux et les traditions dépassées. Nous créons l'avenir de la coupe
                  masculine avec une approche radicalement moderne.
                </p>
                <p className="text-lg text-gray-400 leading-relaxed font-mono">
                  Design brutal. Techniques de pointe. Attitude sans compromis. Chaque coupe est une déclaration, chaque
                  client repart transformé.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-red-500 border-2 border-white flex items-center justify-center flex-shrink-0">
                    <Target className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <h4 className="font-display font-black text-white text-lg mb-2">PRÉCISION ABSOLUE</h4>
                    <p className="text-gray-400 font-mono text-sm">Chaque millimètre compte. Zéro compromis.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-red-500 border-2 border-white flex items-center justify-center flex-shrink-0">
                    <Zap className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <h4 className="font-display font-black text-white text-lg mb-2">INNOVATION CONSTANTE</h4>
                    <p className="text-gray-400 font-mono text-sm">Toujours un pas en avant. Jamais de routine.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-red-500 border-2 border-white flex items-center justify-center flex-shrink-0">
                    <Scissors className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <h4 className="font-display font-black text-white text-lg mb-2">ATTITUDE MODERNE</h4>
                    <p className="text-gray-400 font-mono text-sm">
                      Style contemporain. Mentalité nouvelle génération.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white border-4 border-white p-12 shadow-brutal">
                <blockquote className="text-3xl md:text-4xl font-display font-black text-black leading-tight mb-8">
                  "LE FUTUR DU BARBERSHOP EST ICI"
                </blockquote>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-black border-4 border-black flex items-center justify-center">
                    <Scissors className="h-8 w-8 text-red-500" />
                  </div>
                  <div>
                    <div className="font-display font-black text-black text-lg">TEAM GENTLEMAN'S CUT</div>
                    <div className="font-mono font-bold text-gray-600 text-sm">FOUNDERS & VISIONARIES</div>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 w-full h-full bg-red-500 border-4 border-white -z-10"></div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <div className="bg-red-500 border-4 border-white p-12 shadow-brutal inline-block">
              <h3 className="text-3xl font-display font-black text-white mb-6">PRÊT POUR LA RÉVOLUTION ?</h3>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-white text-black font-display font-black px-8 py-4 border-4 border-black shadow-brutal hover:shadow-none transition-all duration-200 transform hover:translate-x-1 hover:translate-y-1 flex items-center gap-2">
                  REJOINDRE LE MOUVEMENT
                  <ArrowRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
