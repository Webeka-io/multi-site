import { Card, CardContent, CardHeader, CardTitle } from "@/app/secteur/barber/[slug]/model9/components/ui/card"
import { Button } from "@/components/ui/button"
import { Scissors, User, Wind, Crown, Clock, Euro } from "lucide-react"
import Link from "next/link"

const services = [
  {
    icon: <Scissors className="h-10 w-10" />,
    title: "Coupe Artisanale",
    subtitle: "Façonnée à la main",
    description:
      "Coupe personnalisée réalisée avec des ciseaux forgés et des techniques traditionnelles transmises de maître à apprenti.",
    duration: "50 minutes",
    price: "45€",
    features: ["Consultation approfondie", "Coupe aux ciseaux forgés", "Finition au rasoir", "Styling naturel"],
    popular: false,
    craftLevel: "★★★☆☆",
  },
  {
    icon: <User className="h-10 w-10" />,
    title: "Sculpture de Barbe",
    subtitle: "Art du modelage",
    description:
      "Taille et sculpture de barbe selon les règles de l'art, avec des outils artisanaux et des huiles naturelles.",
    duration: "35 minutes",
    price: "35€",
    features: ["Analyse morphologique", "Taille précise", "Huiles artisanales", "Conseils d'entretien"],
    popular: true,
    craftLevel: "★★★★☆",
  },
  {
    icon: <Wind className="h-10 w-10" />,
    title: "Rasage au Sabre",
    subtitle: "Rituel ancestral",
    description: "Rasage traditionnel au sabre avec préparation vapeur, serviettes chaudes et baumes artisanaux.",
    duration: "45 minutes",
    price: "50€",
    features: ["Préparation vapeur", "Rasage au sabre forgé", "Serviettes chaudes", "Baumes maison"],
    popular: false,
    craftLevel: "★★★★★",
  },
  {
    icon: <Crown className="h-10 w-10" />,
    title: "Expérience Complète",
    subtitle: "L'art dans sa totalité",
    description: "L'expérience artisanale complète : coupe, barbe, rasage et soins dans la pure tradition du métier.",
    duration: "90 minutes",
    price: "85€",
    features: ["Service intégral", "Massage traditionnel", "Produits artisanaux", "Thé ou café offert"],
    popular: true,
    craftLevel: "★★★★★",
  },
]

export default function ServicesCraft() {
  return (
    <section id="services" className="py-32 bg-gradient-to-b from-orange-50 to-amber-50">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-3 bg-orange-600 text-white px-6 py-3 rounded-xl border-2 border-orange-300 mb-6 shadow-lg">
            <Scissors className="h-5 w-5" />
            <span className="font-bold text-sm uppercase tracking-wider">Savoir-Faire</span>
          </div>
          <h2 className="text-6xl md:text-7xl font-bold text-amber-900 leading-tight mb-6">
            L'Art du
            <span className="block text-orange-600">Barbier</span>
          </h2>
          <div className="w-32 h-2 bg-gradient-to-r from-amber-400 to-orange-500 mx-auto mb-8 rounded-full"></div>
          <p className="text-xl text-amber-700 max-w-4xl mx-auto leading-relaxed">
            Découvrez nos services artisanaux, chacun réalisé avec des outils traditionnels et un savoir-faire
            authentique transmis de génération en génération.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <Card
              key={service.title}
              className={`bg-white border-4 ${
                service.popular ? "border-orange-400 shadow-xl" : "border-amber-200"
              } hover:border-orange-400 transition-all duration-500 group relative overflow-hidden shadow-lg`}
            >
              {service.popular && (
                <div className="absolute top-4 right-4 bg-orange-600 text-white text-xs font-bold px-4 py-2 rounded-full uppercase tracking-wider border-2 border-orange-300">
                  Populaire
                </div>
              )}
              <CardHeader className="text-center pb-6">
                <div className="mx-auto mb-4 p-4 bg-amber-100 rounded-xl border-2 border-amber-300 group-hover:bg-amber-200 transition-colors">
                  <div className="text-amber-700">{service.icon}</div>
                </div>
                <CardTitle className="text-2xl font-bold text-amber-900 mb-2">{service.title}</CardTitle>
                <p className="text-orange-600 font-semibold italic text-sm">{service.subtitle}</p>
                <div className="flex justify-center mt-2">
                  <span className="text-orange-500 text-lg">{service.craftLevel}</span>
                </div>
              </CardHeader>
              <CardContent className="px-8 pb-8">
                <p className="text-amber-700 leading-relaxed mb-6 text-center">{service.description}</p>

                <div className="flex items-center justify-between mb-6 pb-4 border-b-2 border-amber-200">
                  <div className="flex items-center gap-2 text-amber-600">
                    <Clock className="h-4 w-4" />
                    <span className="font-semibold text-sm">{service.duration}</span>
                  </div>
                  <div className="flex items-center gap-1 text-2xl font-bold text-amber-800">
                    <Euro className="h-5 w-5" />
                    {service.price}
                  </div>
                </div>

                <div className="space-y-3 mb-8">
                  {service.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-3 text-amber-700 text-sm">
                      <div className="w-2 h-2 bg-orange-500 rounded-full flex-shrink-0"></div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                <Button
                  asChild
                  className={`w-full font-bold py-3 rounded-xl transition-all duration-300 ${
                    service.popular
                      ? "bg-orange-600 hover:bg-orange-700 text-white border-2 border-orange-300"
                      : "bg-transparent border-2 border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white"
                  }`}
                >
                  <Link href="#booking">Réserver ce Service</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
