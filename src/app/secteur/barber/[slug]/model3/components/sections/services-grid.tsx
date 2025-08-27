import { Card, CardContent } from "@/app/secteur/barber/[slug]/model3/components/ui/card"
import { Button } from "@/app/secteur/barber/[slug]/model3/components/ui/button"
import { Scissors, User, Wind, Crown, Clock, Euro } from "lucide-react"
import Link from "next/link"

const services = [
  {
    icon: <Scissors className="h-10 w-10" />,
    title: "COUPE MODERNE",
    category: "SIGNATURE",
    description: "Coupe tendance adaptée à votre style et morphologie",
    duration: "40 min",
    price: "35€",
    popular: false,
  },
  {
    icon: <User className="h-10 w-10" />,
    title: "BARBE DESIGN",
    category: "STYLE",
    description: "Taille et design de barbe avec finition premium",
    duration: "30 min",
    price: "28€",
    popular: true,
  },
  {
    icon: <Wind className="h-10 w-10" />,
    title: "RASAGE PREMIUM",
    category: "CLASSIC",
    description: "Rasage traditionnel avec serviettes chaudes",
    duration: "35 min",
    price: "32€",
    popular: false,
  },
  {
    icon: <Crown className="h-10 w-10" />,
    title: "PACK COMPLET",
    category: "ULTIMATE",
    description: "L'expérience complète : coupe + barbe + rasage",
    duration: "75 min",
    price: "65€",
    popular: true,
  },
]

export default function ServicesGrid() {
  return (
    <section id="services" className="py-6 bg-zinc-900">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="text-center mb-20">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-12 h-px bg-orange-500"></div>
            <span className="text-orange-500 font-bold uppercase tracking-wider text-sm">Services</span>
            <div className="w-12 h-px bg-orange-500"></div>
          </div>
          <h2 className="text-6xl md:text-7xl font-display font-black text-white leading-tight mb-6">
            NOS
            <span className="block text-orange-500">SERVICES</span>
          </h2>
          <p className="text-xl text-zinc-400 max-w-3xl mx-auto">
            Des prestations de qualité pour révéler votre style unique
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <Card
              key={service.title}
              className={`bg-zinc-800 border-2 ${
                service.popular ? "border-orange-500" : "border-zinc-700"
              } hover:border-orange-500 transition-all duration-500 group relative overflow-hidden`}
            >
              {service.popular && (
                <div className="absolute top-4 right-4 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  Populaire
                </div>
              )}
              <CardContent className="p-8">
                <div className="flex items-start gap-6">
                  <div className="text-orange-500 group-hover:text-orange-400 transition-colors flex-shrink-0 p-4 bg-zinc-900 rounded-lg">
                    {service.icon}
                  </div>
                  <div className="flex-1">
                    <div className="mb-6">
                      <div className="text-orange-500 font-bold text-sm uppercase tracking-wider mb-2">
                        {service.category}
                      </div>
                      <h3 className="text-2xl font-display font-bold text-white mb-4 group-hover:text-orange-500 transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-zinc-400 leading-relaxed mb-6">{service.description}</p>
                    </div>

                    <div className="flex items-center justify-between mb-8 pb-6 border-b border-zinc-700">
                      <div className="flex items-center gap-4 text-zinc-500 text-sm">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          {service.duration}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-2xl font-display font-bold text-orange-500">
                        <Euro className="h-5 w-5" />
                        {service.price}
                      </div>
                    </div>

                    <Button
                      asChild
                      className={`w-full font-bold py-3 rounded-none transition-all duration-300 ${
                        service.popular
                          ? "bg-orange-500 hover:bg-orange-600 text-white"
                          : "bg-transparent border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white"
                      }`}
                    >
                      <Link href="#booking">RÉSERVER CE SERVICE</Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
