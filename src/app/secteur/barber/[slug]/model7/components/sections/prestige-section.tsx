import { Crown, Award, Star, Sparkles } from "lucide-react"

export default function PrestigeSection() {
  return (
    <section id="prestige" className="py-32 bg-gradient-to-b from-black to-burgundy-900/30 relative overflow-hidden">
      {/* Motifs Art Déco */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_25%_25%,_#d4af37_1px,_transparent_1px)] bg-[length:50px_50px]"></div>
      </div>

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-gold-400/20 to-burgundy-500/20 border border-gold-400/30 text-gold-400 px-6 py-3 rounded-sm backdrop-blur-sm mb-8">
              <Award className="h-5 w-5" />
              <span className="font-serif tracking-wider">NOTRE HÉRITAGE</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-serif text-cream-100 mb-8">
              Un Siècle de
              <span className="block bg-gradient-to-r from-gold-400 to-burgundy-500 bg-clip-text text-transparent">
                PRESTIGE
              </span>
            </h2>
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="w-20 h-0.5 bg-gradient-to-r from-transparent to-gold-400"></div>
              <Crown className="h-6 w-6 text-gold-400" />
              <div className="w-20 h-0.5 bg-gradient-to-l from-transparent to-gold-400"></div>
            </div>
            <p className="text-xl text-cream-300 leading-relaxed max-w-3xl mx-auto font-light">
              Depuis 1925, Gentleman's Cut perpétue l'art du raffinement masculin dans l'esprit des grands salons
              parisiens
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            <div className="text-center group">
              <div className="relative mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-gold-400/20 to-burgundy-500/20 border-2 border-gold-400/30 rounded-sm mx-auto flex items-center justify-center group-hover:scale-110 transition-all duration-500 group-hover:rotate-12">
                  <Crown className="h-10 w-10 text-gold-400" />
                </div>
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-burgundy-500 rounded-full"></div>
                <div className="absolute -bottom-2 -left-2 w-3 h-3 border border-gold-400 rounded-full"></div>
              </div>
              <h3 className="text-2xl font-serif text-gold-400 mb-4">Excellence</h3>
              <p className="text-cream-400 font-light leading-relaxed">
                Un savoir-faire transmis de génération en génération par nos maîtres barbiers
              </p>
            </div>
            <div className="text-center group">
              <div className="relative mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-gold-400/20 to-burgundy-500/20 border-2 border-gold-400/30 rounded-sm mx-auto flex items-center justify-center group-hover:scale-110 transition-all duration-500 group-hover:rotate-12">
                  <Award className="h-10 w-10 text-gold-400" />
                </div>
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-burgundy-500 rounded-full"></div>
                <div className="absolute -bottom-2 -left-2 w-3 h-3 border border-gold-400 rounded-full"></div>
              </div>
              <h3 className="text-2xl font-serif text-gold-400 mb-4">Tradition</h3>
              <p className="text-cream-400 font-light leading-relaxed">
                Les techniques ancestrales du barbier français, préservées et perfectionnées
              </p>
            </div>
            <div className="text-center group">
              <div className="relative mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-gold-400/20 to-burgundy-500/20 border-2 border-gold-400/30 rounded-sm mx-auto flex items-center justify-center group-hover:scale-110 transition-all duration-500 group-hover:rotate-12">
                  <Star className="h-10 w-10 text-gold-400" />
                </div>
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-burgundy-500 rounded-full"></div>
                <div className="absolute -bottom-2 -left-2 w-3 h-3 border border-gold-400 rounded-full"></div>
              </div>
              <h3 className="text-2xl font-serif text-gold-400 mb-4">Raffinement</h3>
              <p className="text-cream-400 font-light leading-relaxed">
                Chaque détail pensé pour offrir une expérience d'exception à nos gentlemen
              </p>
            </div>
            <div className="text-center group">
              <div className="relative mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-gold-400/20 to-burgundy-500/20 border-2 border-gold-400/30 rounded-sm mx-auto flex items-center justify-center group-hover:scale-110 transition-all duration-500 group-hover:rotate-12">
                  <Sparkles className="h-10 w-10 text-gold-400" />
                </div>
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-burgundy-500 rounded-full"></div>
                <div className="absolute -bottom-2 -left-2 w-3 h-3 border border-gold-400 rounded-full"></div>
              </div>
              <h3 className="text-2xl font-serif text-gold-400 mb-4">Élégance</h3>
              <p className="text-cream-400 font-light leading-relaxed">
                L'art de sublimer la personnalité de chaque homme avec distinction
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-gold-400/10 via-burgundy-500/10 to-gold-400/10 border border-gold-400/30 rounded-sm p-12 text-center backdrop-blur-sm">
            <blockquote className="text-3xl md:text-4xl font-serif text-cream-100 leading-relaxed mb-8 italic">
              "L'élégance n'est pas se faire remarquer, c'est être inoubliable"
            </blockquote>
            <div className="flex items-center justify-center gap-6">
              <div className="w-16 h-16 bg-gradient-to-br from-gold-400 to-burgundy-500 rounded-sm flex items-center justify-center">
                <Crown className="h-8 w-8 text-black" />
              </div>
              <div className="text-left">
                <div className="font-serif text-gold-400 text-xl">Maître Henri Dubois</div>
                <div className="text-cream-400 font-light">Fondateur - 1925</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
