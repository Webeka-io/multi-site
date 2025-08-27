import { Card, CardContent, CardHeader, CardTitle } from "@/app/secteur/barber/[slug]/model10/components/ui/card"
import { Button } from "@/components/ui/button"
import { Scissors, Heart, Leaf, Sparkles, Clock, Euro } from "lucide-react"
import Link from "next/link"

const services = [
  {
    icon: <Scissors className="h-8 w-8" />,
    title: "Coupe Signature",
    description: "Une coupe personnalisée qui révèle votre personnalité avec douceur et précision.",
    duration: "45 min",
    price: "42€",
    features: ["Consultation personnalisée", "Shampoing aux huiles naturelles", "Coiffage délicat"],
  },
  {
    icon: <Heart className="h-8 w-8" />,
    title: "Soin de la Barbe",
    description: "Taille et entretien de votre barbe dans le respect de sa forme naturelle.",
    duration: "30 min",
    price: "32€",
    features: ["Taille respectueuse", "Huiles nourrissantes bio", "Conseils d'entretien"],
  },
  {
    icon: <Leaf className="h-8 w-8" />,
    title: "Rasage Traditionnel",
    description: "Un moment de détente absolue avec notre rasage aux produits naturels.",
    duration: "40 min",
    price: "38€",
    features: ["Préparation douce", "Produits naturels", "Massage relaxant"],
  },
  {
    icon: <Sparkles className="h-8 w-8" />,
    title: "Expérience Complète",
    description: "L'harmonie parfaite : coupe, barbe et moment de bien-être réunis.",
    duration: "75 min",
    price: "68€",
    features: ["Service intégral", "Moment privilégié", "Tisane offerte"],
  },
]

export default function ServicesNordic() {
  return (
    <section id="services" className="py-24 bg-gradient-to-b from-sage-50 to-cream-50">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 bg-white text-sage-700 px-4 py-2 rounded-full text-sm font-light mb-6 shadow-sm">
              <Sparkles className="h-4 w-4" />
              Nos Services
            </div>
            <h2 className="text-4xl md:text-5xl font-light text-stone-800 mb-6">
              Moments de
              <span className="block font-normal text-sage-600">bien-être</span>
            </h2>
            <div className="w-16 h-0.5 bg-sage-400 mx-auto mb-8"></div>
            <p className="text-xl text-stone-600 leading-relaxed max-w-3xl mx-auto font-light">
              Chaque service est conçu comme une parenthèse de douceur dans votre quotidien, alliant expertise technique
              et moment de détente.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <Card
                key={service.title}
                className="bg-white border-0 shadow-sm hover:shadow-md transition-all duration-300 rounded-3xl overflow-hidden group"
              >
                <CardHeader className="text-center pb-6 pt-8">
                  <div className="w-16 h-16 bg-sage-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-sage-200 transition-colors">
                    <div className="text-sage-600">{service.icon}</div>
                  </div>
                  <CardTitle className="text-2xl font-medium text-stone-800 mb-3">{service.title}</CardTitle>
                </CardHeader>
                <CardContent className="px-8 pb-8">
                  <p className="text-stone-600 leading-relaxed mb-8 font-light text-center">{service.description}</p>

                  <div className="flex items-center justify-between mb-8 pb-6 border-b border-sage-100">
                    <div className="flex items-center gap-2 text-stone-500">
                      <Clock className="h-4 w-4" />
                      <span className="font-light text-sm">{service.duration}</span>
                    </div>
                    <div className="flex items-center gap-1 text-2xl font-medium text-sage-600">
                      <Euro className="h-5 w-5" />
                      {service.price}
                    </div>
                  </div>

                  <div className="space-y-3 mb-8">
                    {service.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-3 text-stone-600">
                        <div className="w-1.5 h-1.5 bg-sage-400 rounded-full flex-shrink-0"></div>
                        <span className="font-light text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Button
                    asChild
                    className="w-full bg-sage-500 hover:bg-sage-600 text-white font-light py-3 rounded-full transition-all duration-300"
                  >
                    <Link href="#booking">Choisir ce service</Link>
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
