import { Card, CardContent } from "@/app/secteur/barber/[slug]/model2/components/ui/card"
import { Button } from "@/app/secteur/barber/[slug]/model2/components/ui/button"
import { Scissors, User, Wind, Crown } from "lucide-react"
import Link from "next/link"

const services = [
  {
    icon: <Scissors className="h-8 w-8" />,
    title: "Coupe Signature",
    subtitle: "L'art de la précision",
    description: "Coupe personnalisée selon votre morphologie et style de vie, réalisée par nos maîtres barbiers.",
    duration: "50 minutes",
    price: "65€",
    includes: ["Consultation personnalisée", "Shampoing premium", "Coiffage et finition"],
  },
  {
    icon: <User className="h-8 w-8" />,
    title: "Sculpture de Barbe",
    subtitle: "Précision millimétrique",
    description: "Taille et mise en forme artistique de votre barbe avec des techniques traditionnelles.",
    duration: "35 minutes",
    price: "45€",
    includes: ["Analyse de la pilosité", "Taille sur mesure", "Soins nourrissants"],
  },
  {
    icon: <Wind className="h-8 w-8" />,
    title: "Rasage Traditionnel",
    subtitle: "Rituel d'exception",
    description: "Rasage à l'ancienne avec serviettes chaudes et produits artisanaux de luxe.",
    duration: "45 minutes",
    price: "55€",
    includes: ["Préparation à la vapeur", "Rasage au sabre", "Soins après-rasage"],
  },
  {
    icon: <Crown className="h-8 w-8" />,
    title: "Expérience Royale",
    subtitle: "Le summum du raffinement",
    description: "L'expérience complète : coupe, barbe, rasage et soins dans un cadre d'exception.",
    duration: "2 heures",
    price: "120€",
    includes: ["Service complet", "Massage relaxant", "Boissons premium"],
  },
]

export default function ServicesLuxury() {
  return (
    <section id="services" className="py-32 bg-stone-100">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="text-center mb-20">
          <p className="text-amber-600 font-medium tracking-wider uppercase text-sm mb-4">Nos Services</p>
          <h2 className="text-5xl md:text-6xl font-serif font-light text-stone-900 leading-tight mb-6">
            Une Gamme
            <span className="block font-normal italic">d'Excellence</span>
          </h2>
          <div className="w-16 h-px bg-amber-600 mx-auto mb-8"></div>
          <p className="text-xl text-stone-600 max-w-3xl mx-auto leading-relaxed">
            Chaque service est une œuvre d'art, pensée pour révéler votre élégance naturelle
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <Card
              key={service.title}
              className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden group"
            >
              <CardContent className="p-10">
                <div className="flex items-start gap-6">
                  <div className="text-amber-600 group-hover:text-amber-700 transition-colors flex-shrink-0 mt-2">
                    {service.icon}
                  </div>
                  <div className="flex-1">
                    <div className="mb-6">
                      <h3 className="text-2xl font-serif font-light text-stone-900 mb-2">{service.title}</h3>
                      <p className="text-amber-600 font-medium text-sm uppercase tracking-wider mb-4">
                        {service.subtitle}
                      </p>
                      <p className="text-stone-600 leading-relaxed mb-6">{service.description}</p>
                    </div>

                    <div className="flex items-center justify-between mb-6 pb-6 border-b border-stone-200">
                      <div className="text-stone-500 text-sm">{service.duration}</div>
                      <div className="text-2xl font-serif font-light text-stone-900">{service.price}</div>
                    </div>

                    <div className="space-y-3 mb-8">
                      {service.includes.map((item) => (
                        <div key={item} className="flex items-center gap-3 text-stone-600 text-sm">
                          <div className="w-1.5 h-1.5 bg-amber-600 rounded-full flex-shrink-0"></div>
                          {item}
                        </div>
                      ))}
                    </div>

                    <Button
                      asChild
                      className="w-full bg-transparent border border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white font-medium py-3 rounded-full transition-all duration-300"
                    >
                      <Link href="#reservation">Réserver ce service</Link>
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
