import Image from "next/image"
import { Crown, Gem, Award, Star } from "lucide-react"

export default function ExclusiveSection() {
  return (
    <section id="exclusive" className="py-32 bg-gradient-to-b from-ivory to-ivory-dark relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 right-20 w-64 h-64 border-2 border-gold rounded-full"></div>
        <div className="absolute bottom-20 left-20 w-48 h-48 bg-gold/20 rounded-full"></div>
      </div>

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-gold/20 to-gold-dark/20 text-gold px-6 py-3 rounded-full border border-gold/30 mb-8">
              <Crown className="h-5 w-5" />
              <span className="font-serif font-medium text-sm uppercase tracking-wider">Exclusivité</span>
            </div>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-charcoal leading-tight mb-8">
              Une Expérience
              <span className="block bg-gradient-to-r from-gold via-gold-light to-gold bg-clip-text text-transparent">
                Unique
              </span>
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-gold to-gold-dark mx-auto mb-8"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-20">
            <div className="space-y-8">
              <div className="space-y-6">
                <h3 className="text-4xl font-display font-bold text-charcoal">L'Excellence à l'État Pur</h3>
                <p className="text-lg text-charcoal/70 leading-relaxed font-light">
                  Chez Gentleman's Cut, chaque détail est pensé pour créer une expérience inoubliable. De l'accueil
                  personnalisé aux finitions les plus raffinées, nous redéfinissons les standards du luxe.
                </p>
                <p className="text-lg text-charcoal/70 leading-relaxed font-light">
                  Notre salon privé, nos produits exclusifs et notre service sur-mesure font de chaque visite un moment
                  d'exception réservé à une clientèle privilégiée.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-ivory to-ivory-dark p-8 rounded-lg border border-gold/20 shadow-lg">
                  <Gem className="h-10 w-10 text-gold mb-4" />
                  <h4 className="font-display font-bold text-charcoal text-xl mb-2">Produits Exclusifs</h4>
                  <p className="text-charcoal/60 text-sm font-light">Formulations artisanales de luxe</p>
                </div>
                <div className="bg-gradient-to-br from-ivory to-ivory-dark p-8 rounded-lg border border-gold/20 shadow-lg">
                  <Award className="h-10 w-10 text-gold mb-4" />
                  <h4 className="font-display font-bold text-charcoal text-xl mb-2">Service Personnalisé</h4>
                  <p className="text-charcoal/60 text-sm font-light">Attention individuelle garantie</p>
                </div>
                <div className="bg-gradient-to-br from-ivory to-ivory-dark p-8 rounded-lg border border-gold/20 shadow-lg">
                  <Star className="h-10 w-10 text-gold mb-4" />
                  <h4 className="font-display font-bold text-charcoal text-xl mb-2">Environnement Luxueux</h4>
                  <p className="text-charcoal/60 text-sm font-light">Cadre raffiné et intimiste</p>
                </div>
                <div className="bg-gradient-to-br from-ivory to-ivory-dark p-8 rounded-lg border border-gold/20 shadow-lg">
                  <Crown className="h-10 w-10 text-gold mb-4" />
                  <h4 className="font-display font-bold text-charcoal text-xl mb-2">Clientèle VIP</h4>
                  <p className="text-charcoal/60 text-sm font-light">Accès exclusif et privilégié</p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-[4/5] relative overflow-hidden rounded-lg border-4 border-gold/30 shadow-2xl">
                <Image
                  src="/placeholder.svg?width=600&height=750"
                  alt="Salon privé avec décoration luxueuse"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/30 to-transparent"></div>
              </div>

              {/* Floating Badge */}
              <div className="absolute -top-8 -left-8 bg-gradient-to-br from-gold to-gold-dark p-6 rounded-full border-4 border-ivory shadow-xl">
                <Crown className="h-8 w-8 text-charcoal" />
              </div>

              {/* Decorative Frame */}
              <div className="absolute -inset-6 border border-gold/20 rounded-lg -z-10"></div>
            </div>
          </div>

          {/* Luxury Features */}
          <div className="bg-gradient-to-r from-charcoal to-charcoal-light p-12 rounded-lg border border-gold/30 shadow-2xl">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-display font-bold text-ivory mb-4">Privilèges Exclusifs</h3>
              <p className="text-ivory/70 font-light">Réservés à notre clientèle privilégiée</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-gold to-gold-dark rounded-full flex items-center justify-center mx-auto mb-4">
                  <Crown className="h-8 w-8 text-charcoal" />
                </div>
                <h4 className="font-display font-bold text-ivory text-lg mb-2">Salon Privé</h4>
                <p className="text-ivory/60 text-sm font-light">Espace exclusif pour une intimité totale</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-gold to-gold-dark rounded-full flex items-center justify-center mx-auto mb-4">
                  <Gem className="h-8 w-8 text-charcoal" />
                </div>
                <h4 className="font-display font-bold text-ivory text-lg mb-2">Conciergerie</h4>
                <p className="text-ivory/60 text-sm font-light">Service personnalisé et sur-mesure</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-gold to-gold-dark rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-charcoal" />
                </div>
                <h4 className="font-display font-bold text-ivory text-lg mb-2">Priorité Absolue</h4>
                <p className="text-ivory/60 text-sm font-light">Réservations privilégiées garanties</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
