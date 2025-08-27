import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Crown, Sparkles, Star, ArrowRight } from "lucide-react"

export default function HeroDeco() {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center bg-gradient-to-br from-black via-burgundy-900/20 to-black relative overflow-hidden"
    >
      {/* Motifs Art Déco en arrière-plan */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 border-2 border-gold-400 transform rotate-45"></div>
        <div className="absolute top-40 right-32 w-24 h-24 border border-gold-400 rounded-full"></div>
        <div className="absolute bottom-32 left-40 w-20 h-20 bg-gradient-to-br from-gold-400 to-burgundy-500 transform rotate-12"></div>
        <div className="absolute bottom-20 right-20 w-16 h-32 bg-gradient-to-t from-gold-400/30 to-transparent transform -skew-x-12"></div>
      </div>

      <div className="container mx-auto px-6 lg:px-8 py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-10">
            {/* Badge Prestige */}
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-gold-400/20 to-burgundy-500/20 border border-gold-400/30 text-gold-400 px-6 py-3 rounded-sm backdrop-blur-sm">
              <Crown className="h-5 w-5" />
              <span className="font-serif tracking-wider">DEPUIS 1925</span>
              <div className="w-2 h-2 bg-gold-400 rounded-full animate-pulse"></div>
            </div>

            {/* Titre Principal Art Déco */}
            <div className="space-y-6">
              <h1 className="text-6xl md:text-7xl lg:text-7xl font-serif text-cream-100 leading-none">
                GENTLEMAN'S
                <span className="block bg-gradient-to-r from-gold-400 via-gold-500 to-burgundy-500 bg-clip-text text-transparent">
                  CUT
                </span>
              </h1>
              <div className="flex items-center gap-4">
                <div className="w-16 h-0.5 bg-gradient-to-r from-gold-400 to-burgundy-500"></div>
                <p className="text-xl md:text-2xl text-gold-400 font-serif italic tracking-wide">
                  L'Art de l'Élégance Masculine
                </p>
                <div className="w-16 h-0.5 bg-gradient-to-l from-gold-400 to-burgundy-500"></div>
              </div>
            </div>

            {/* Description */}
            <p className="text-lg text-cream-300 leading-relaxed max-w-xl font-light">
              Dans l'esprit des grands salons parisiens des années folles, nous perpétuons l'art du raffinement masculin
              avec une expertise transmise de maître en apprenti depuis près d'un siècle.
            </p>

            {/* Boutons CTA */}
            <div className="flex flex-col sm:flex-row gap-6 pt-8">
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-gold-400 to-gold-600 hover:from-gold-500 hover:to-gold-700 text-black font-serif font-semibold px-10 py-4 rounded-sm relative overflow-hidden group"
              >
                <Link href="#booking" className="flex items-center gap-3">
                  <Crown className="h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
                  Prendre Rendez-vous
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-2 border-gold-400 text-gold-400 hover:bg-gold-400 hover:text-black font-serif font-semibold px-10 py-4 rounded-sm bg-transparent backdrop-blur-sm"
              >
                <Link href="#prestige">Notre Héritage</Link>
              </Button>
            </div>

            {/* Statistiques Art Déco */}
            <div className="grid grid-cols-3 gap-8 pt-16 border-t border-gold-400/30">
              <div className="text-center group">
                <div className="relative mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-gold-400/20 to-burgundy-500/20 border border-gold-400/30 rounded-sm mx-auto flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Star className="h-8 w-8 text-gold-400" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-burgundy-500 rounded-full"></div>
                </div>
                <div className="text-3xl font-serif text-gold-400 mb-2">98</div>
                <div className="text-cream-400 text-sm font-light tracking-wider uppercase">Ans d'Excellence</div>
              </div>
              <div className="text-center group">
                <div className="relative mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-gold-400/20 to-burgundy-500/20 border border-gold-400/30 rounded-sm mx-auto flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Crown className="h-8 w-8 text-gold-400" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-burgundy-500 rounded-full"></div>
                </div>
                <div className="text-3xl font-serif text-gold-400 mb-2">5K+</div>
                <div className="text-cream-400 text-sm font-light tracking-wider uppercase">Gentlemen Servis</div>
              </div>
              <div className="text-center group">
                <div className="relative mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-gold-400/20 to-burgundy-500/20 border border-gold-400/30 rounded-sm mx-auto flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Sparkles className="h-8 w-8 text-gold-400" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-burgundy-500 rounded-full"></div>
                </div>
                <div className="text-3xl font-serif text-gold-400 mb-2">100%</div>
                <div className="text-cream-400 text-sm font-light tracking-wider uppercase">Satisfaction</div>
              </div>
            </div>
          </div>

          {/* Image Hero avec cadre Art Déco */}
          <div className="relative">
            <div className="relative">
              {/* Cadre décoratif */}
              <div className="absolute -inset-4 bg-gradient-to-br from-gold-400/20 to-burgundy-500/20 border-2 border-gold-400/30 rounded-sm transform rotate-1"></div>
              <div className="absolute -inset-2 bg-gradient-to-tl from-burgundy-500/10 to-gold-400/10 border border-gold-400/20 rounded-sm transform -rotate-1"></div>

              {/* Image principale */}
              <div className="aspect-[4/5] relative overflow-hidden rounded-sm bg-gradient-to-br from-gold-400/10 to-burgundy-500/10 shadow-2xl">
                <Image
                  src="/placeholder.svg?width=600&height=750"
                  alt="Salon Art Déco élégant"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-gold-400/10"></div>
              </div>

              {/* Éléments décoratifs */}
              <div className="absolute -top-6 -right-6 w-12 h-12 bg-gradient-to-br from-gold-400 to-burgundy-500 transform rotate-45"></div>
              <div className="absolute -bottom-6 -left-6 w-8 h-8 border-2 border-gold-400 rounded-full"></div>
            </div>

            {/* Carte flottante */}
            <div className="absolute -bottom-8 -left-8 bg-black/90 backdrop-blur-md border border-gold-400/30 p-6 rounded-sm shadow-2xl">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-gold-400 to-burgundy-500 rounded-sm flex items-center justify-center">
                  <Crown className="h-6 w-6 text-black" />
                </div>
                <div>
                  <div className="font-serif text-gold-400 text-lg">Maître Barbier</div>
                  <div className="text-cream-400 text-sm">Certifié depuis 1925</div>
                </div>
              </div>
            </div>

            {/* Motifs géométriques */}
            <div className="absolute top-1/4 -right-12 w-6 h-24 bg-gradient-to-b from-gold-400 to-transparent transform skew-y-12 opacity-60"></div>
            <div className="absolute bottom-1/4 -left-12 w-4 h-16 bg-gradient-to-t from-burgundy-500 to-transparent transform -skew-y-12 opacity-60"></div>
          </div>
        </div>
      </div>

      {/* Effet de particules dorées */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-gold-400 rounded-full animate-pulse"></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-gold-400 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-gold-400 rounded-full animate-pulse delay-2000"></div>
      </div>
    </section>
  )
}
