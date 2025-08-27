import { Card, CardContent, CardHeader, CardTitle } from "@/app/secteur/barber/[slug]/model7/components/ui/card"
import { Button } from "@/components/ui/button"
import { Crown, Scissors, Star, Sparkles, Clock, Euro } from "lucide-react"
import Link from "next/link"

const services = [
  {
    icon: <Crown className="h-10 w-10" />,
    title: "Coupe Royale",
    description: "L'art de la coupe masculine dans la pure tradition des maîtres barbiers parisiens.",
    duration: "60 min",
    price: "85€",
    features: ["Consultation personnalisée", "Shampoing premium", "Coiffage à la française", "Finitions parfaites"],
    premium: true,
  },
  {
    icon: <Scissors className="h-10 w-10" />,
    title: "Taille de Barbe",
    description: "Sculpture et entretien de votre barbe selon les canons de l'élégance masculine.",
    duration: "45 min",
    price: "65€",
    features: ["Taille experte", "Huiles nobles", "Modelage facial", "Conseils d'entretien"],
    premium: false,
  },
  {
    icon: <Star className="h-10 w-10" />,
    title: "Rasage Traditionnel",
    description: "L'expérience ultime du rasage au coupe-chou dans les règles de l'art.",
    duration: "50 min",
    price: "75€",
    features: ["Rasage au coupe-chou", "Serviettes chaudes", "Baumes apaisants", "Massage relaxant"],
    premium: false,
  },
  {
    icon: <Sparkles className="h-10 w-10" />,
    title: "Expérience Prestige",
    description: "Le summum du raffinement : coupe, barbe et soins dans un rituel d'exception.",
    duration: "120 min",
    price: "150€",
    features: ["Service complet", "Soins du visage", "Dégustation whisky", "Expérience VIP"],
    premium: true,
  },
]

export default function ServicesDeco() {
  return (
    <section id="services" className="py-32 bg-gradient-to-b from-burgundy-900/30 to-black relative overflow-hidden">
      {/* Motifs décoratifs */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-40 h-40 border-2 border-gold-400 transform rotate-45"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 border border-gold-400 rounded-full"></div>
      </div>

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-gold-400/20 to-burgundy-500/20 border border-gold-400/30 text-gold-400 px-6 py-3 rounded-sm backdrop-blur-sm mb-8">
              <Sparkles className="h-5 w-5" />
              <span className="font-serif tracking-wider">NOS SERVICES</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-serif text-cream-100 mb-8">
              L'Art du
              <span className="block bg-gradient-to-r from-gold-400 to-burgundy-500 bg-clip-text text-transparent">
                RAFFINEMENT
              </span>
            </h2>
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="w-20 h-0.5 bg-gradient-to-r from-transparent to-gold-400"></div>
              <Scissors className="h-6 w-6 text-gold-400" />
              <div className="w-20 h-0.5 bg-gradient-to-l from-transparent to-gold-400"></div>
            </div>
            <p className="text-xl text-cream-300 leading-relaxed max-w-3xl mx-auto font-light">
              Chaque service est un rituel d'élégance, exécuté avec la précision et le raffinement de nos maîtres
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <Card
                key={service.title}
                className={`bg-gradient-to-br from-black/80 to-burgundy-900/40 border-2 ${
                  service.premium ? "border-gold-400/50" : "border-gold-400/30"
                } shadow-2xl hover:shadow-gold-400/20 transition-all duration-500 rounded-sm overflow-hidden group backdrop-blur-sm ${
                  service.premium ? "ring-2 ring-gold-400/20" : ""
                }`}
              >
                <CardHeader className="text-center pb-6 pt-8 relative">
                  {service.premium && (
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-gold-400 to-burgundy-500 text-black px-3 py-1 rounded-sm text-xs font-serif font-semibold">
                      PRESTIGE
                    </div>
                  )}
                  <div
                    className={`w-20 h-20 ${
                      service.premium
                        ? "bg-gradient-to-br from-gold-400/30 to-burgundy-500/30 border-2 border-gold-400/50"
                        : "bg-gradient-to-br from-gold-400/20 to-burgundy-500/20 border border-gold-400/30"
                    } rounded-sm mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-all duration-500 group-hover:rotate-12`}
                  >
                    <div className="text-gold-400">{service.icon}</div>
                  </div>
                  <CardTitle className="text-2xl font-serif text-cream-100 mb-4">{service.title}</CardTitle>
                </CardHeader>
                <CardContent className="px-8 pb-8">
                  <p className="text-cream-300 leading-relaxed mb-8 font-light text-center italic">
                    {service.description}
                  </p>

                  <div className="flex items-center justify-between mb-8 pb-6 border-b border-gold-400/30">
                    <div className="flex items-center gap-2 text-cream-400">
                      <Clock className="h-4 w-4" />
                      <span className="font-light text-sm">{service.duration}</span>
                    </div>
                    <div className="flex items-center gap-1 text-3xl font-serif text-gold-400">
                      <Euro className="h-6 w-6" />
                      {service.price}
                    </div>
                  </div>

                  <div className="space-y-4 mb-8">
                    {service.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-3 text-cream-300">
                        <div className="w-2 h-2 bg-gold-400 rounded-full flex-shrink-0"></div>
                        <span className="font-light text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Button
                    asChild
                    className={`w-full ${
                      service.premium
                        ? "bg-gradient-to-r from-gold-400 to-gold-600 hover:from-gold-500 hover:to-gold-700 text-black"
                        : "bg-gradient-to-r from-gold-400/80 to-burgundy-500/80 hover:from-gold-400 hover:to-burgundy-500 text-cream-100"
                    } font-serif font-semibold py-4 rounded-sm transition-all duration-300 relative overflow-hidden group`}
                  >
                    <Link href="#booking" className="flex items-center justify-center gap-2">
                      Réserver ce Service
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
