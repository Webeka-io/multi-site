import { Card, CardContent, CardHeader, CardTitle } from "@/app/secteur/barber/[slug]/model5/components/ui/card"
import { Button } from "@/app/secteur/barber/[slug]/model5/components/ui/button"
import { Crown, Scissors, User, Wind, Gem, Clock, Euro } from "lucide-react"
import Link from "next/link"

const services = [
  {
    icon: <Crown className="h-12 w-12" />,
    title: "Signature Royale",
    subtitle: "L'expérience ultime",
    description:
      "Service complet de 2h incluant coupe, barbe, rasage, soins du visage et massage relaxant dans un cadre d'exception.",
    duration: "120 minutes",
    price: "250€",
    features: ["Consultation privée", "Produits de luxe exclusifs", "Champagne offert", "Massage relaxant"],
    premium: true,
  },
  {
    icon: <Scissors className="h-12 w-12" />,
    title: "Coupe Prestige",
    subtitle: "Précision et élégance",
    description: "Coupe personnalisée réalisée par nos maîtres barbiers avec les techniques les plus raffinées.",
    duration: "60 minutes",
    price: "120€",
    features: ["Analyse morphologique", "Shampoing premium", "Coiffage professionnel", "Conseils personnalisés"],
    premium: false,
  },
  {
    icon: <User className="h-12 w-12" />,
    title: "Sculpture de Barbe",
    subtitle: "Art et précision",
    description: "Taille artistique et mise en forme de votre barbe selon les canons de l'élégance masculine.",
    duration: "45 minutes",
    price: "85€",
    features: ["Design sur mesure", "Produits nourrissants", "Finition parfaite", "Entretien conseillé"],
    premium: false,
  },
  {
    icon: <Wind className="h-12 w-12" />,
    title: "Rasage d'Exception",
    subtitle: "Tradition et luxe",
    description:
      "Rasage traditionnel au sabre avec serviettes chaudes et produits artisanaux de la plus haute qualité.",
    duration: "50 minutes",
    price: "95€",
    features: ["Préparation vapeur", "Rasage au sabre", "Soins après-rasage", "Massage facial"],
    premium: false,
  },
]

export default function ServicesLuxury() {
  return (
    <section id="services" className="py-32 bg-gradient-to-b from-charcoal to-charcoal-light">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-gold/20 to-gold-dark/20 text-gold px-6 py-3 rounded-full border border-gold/30 mb-8">
              <Gem className="h-5 w-5" />
              <span className="font-serif font-medium text-sm uppercase tracking-wider">Services de Luxe</span>
            </div>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-ivory leading-tight mb-8">
              L'Art du
              <span className="block bg-gradient-to-r from-gold via-gold-light to-gold bg-clip-text text-transparent">
                Raffinement
              </span>
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-gold to-gold-dark mx-auto mb-8"></div>
            <p className="text-xl text-ivory/70 max-w-4xl mx-auto leading-relaxed font-light">
              Découvrez nos services exclusifs, conçus pour une clientèle exigeante qui ne se contente que de
              l'excellence absolue.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <Card
                key={service.title}
                className={`bg-gradient-to-br from-ivory to-ivory-dark border-2 ${
                  service.premium ? "border-gold shadow-2xl shadow-gold/20" : "border-gold/30"
                } hover:border-gold transition-all duration-500 group relative overflow-hidden`}
              >
                {service.premium && (
                  <div className="absolute top-0 right-0 bg-gradient-to-r from-gold to-gold-dark text-charcoal text-xs font-bold px-4 py-2 rounded-bl-lg uppercase tracking-wider">
                    Premium
                  </div>
                )}
                <CardHeader className="text-center pb-6">
                  <div className="mx-auto mb-6 p-6 bg-gradient-to-br from-gold/20 to-gold-dark/20 rounded-full border border-gold/30 group-hover:shadow-gold/30 group-hover:shadow-lg transition-all duration-300">
                    <div className="text-gold">{service.icon}</div>
                  </div>
                  <CardTitle className="text-3xl font-display font-bold text-charcoal mb-3">{service.title}</CardTitle>
                  <p className="text-gold font-serif italic text-lg">{service.subtitle}</p>
                </CardHeader>
                <CardContent className="px-8 pb-8">
                  <p className="text-charcoal/70 leading-relaxed mb-8 font-light text-center">{service.description}</p>

                  <div className="flex items-center justify-between mb-8 pb-6 border-b border-gold/20">
                    <div className="flex items-center gap-2 text-charcoal/60">
                      <Clock className="h-5 w-5" />
                      <span className="font-serif">{service.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-3xl font-display font-bold text-gold">
                      <Euro className="h-6 w-6" />
                      {service.price}
                    </div>
                  </div>

                  <div className="space-y-4 mb-8">
                    {service.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-3 text-charcoal/70">
                        <div className="w-2 h-2 bg-gold rounded-full flex-shrink-0"></div>
                        <span className="font-light">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Button
                    asChild
                    className={`w-full font-serif font-bold py-4 rounded-none transition-all duration-300 ${
                      service.premium
                        ? "bg-gradient-to-r from-gold to-gold-dark hover:from-gold-dark hover:to-gold text-charcoal shadow-lg hover:shadow-gold/30"
                        : "bg-transparent border-2 border-gold text-gold hover:bg-gold hover:text-charcoal"
                    }`}
                  >
                    <Link href="#reservation">Réserver ce Service</Link>
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
