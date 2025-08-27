import { Card, CardContent, CardHeader, CardTitle } from "@/app/secteur/barber/[slug]/model5/components/ui/card"
import { Button } from "@/app/secteur/barber/[slug]/model5/components/ui/button"
import { Scissors, User, Wind, Sparkles } from "lucide-react"
import Link from "next/link"

const services = [
  {
    icon: <Scissors className="h-10 w-10 text-amber-400" />,
    title: "Coupe de Cheveux",
    duration: "45 min",
    price: "35€",
  },
  {
    icon: <User className="h-10 w-10 text-amber-400" />,
    title: "Taille de Barbe",
    duration: "30 min",
    price: "25€",
  },
  {
    icon: <Wind className="h-10 w-10 text-amber-400" />,
    title: "Rasage à la Serviette Chaude",
    duration: "45 min",
    price: "40€",
  },
  {
    icon: <Sparkles className="h-10 w-10 text-amber-400" />,
    title: "Forfait Complet",
    duration: "1h 30min",
    price: "70€",
  },
]

export default function ServicesSection() {
  return (
    <section id="services" className="py-20 md:py-32 bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white">Nos Services</h2>
          <p className="mt-4 text-lg text-gray-400">L'excellence et la tradition au service de votre style.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service) => (
            <Card
              key={service.title}
              className="bg-gray-800 border-gray-700 text-white text-center transform hover:-translate-y-2 transition-transform duration-300"
            >
              <CardHeader>
                <div className="mx-auto mb-4">{service.icon}</div>
                <CardTitle className="text-2xl font-serif">{service.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-400">{service.duration}</p>
                <p className="text-3xl font-bold text-amber-400">{service.price}</p>
                <Button
                  asChild
                  className="w-full bg-transparent border border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-gray-900 font-bold"
                >
                  <Link href="#booking">Réserver</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
