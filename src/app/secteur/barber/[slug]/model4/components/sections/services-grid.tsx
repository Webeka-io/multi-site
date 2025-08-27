import { Card, CardContent } from "@/app/secteur/barber/[slug]/model4/components/ui/card"
import { Button } from "@/app/secteur/barber/[slug]/model4/components/ui/button"
import { Scissors, User, Wind, Crown } from "lucide-react"
import Link from "next/link"

const services = [
  {
    icon: <Scissors className="h-8 w-8" />,
    title: "Coupe Moderne",
    description: "Coupe adaptée à votre style et morphologie",
    duration: "30 min",
    price: "35€",
  },
  {
    icon: <User className="h-8 w-8" />,
    title: "Taille de Barbe",
    description: "Entretien et mise en forme de votre barbe",
    duration: "20 min",
    price: "25€",
  },
  {
    icon: <Wind className="h-8 w-8" />,
    title: "Rasage Complet",
    description: "Rasage traditionnel avec soins",
    duration: "25 min",
    price: "30€",
  },
  {
    icon: <Crown className="h-8 w-8" />,
    title: "Service Complet",
    description: "Coupe + barbe + rasage",
    duration: "60 min",
    price: "70€",
  },
]

export default function ServicesGrid() {
  return (
    <section id="services" className="py-24 bg-white">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
              Nos
              <span className="font-medium"> Services</span>
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
              Des services professionnels adaptés à vos besoins, dans un environnement moderne et relaxant.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service) => (
              <Card
                key={service.title}
                className="border-gray-100 hover:shadow-lg transition-all duration-300 group cursor-pointer"
              >
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-gray-900 transition-colors">
                    <div className="text-gray-700 group-hover:text-white transition-colors">{service.icon}</div>
                  </div>
                  <h3 className="text-xl font-medium text-gray-900 mb-3">{service.title}</h3>
                  <p className="text-gray-600 mb-6 text-sm leading-relaxed">{service.description}</p>
                  <div className="space-y-2 mb-6">
                    <div className="text-sm text-gray-500">{service.duration}</div>
                    <div className="text-2xl font-semibold text-gray-900">{service.price}</div>
                  </div>
                  <Button
                    asChild
                    variant="outline"
                    className="w-full border-gray-300 text-gray-700 hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-colors bg-transparent"
                  >
                    <Link href="#booking">Réserver</Link>
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
