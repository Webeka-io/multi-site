"use client"

import { Card, CardContent } from "@/app/components/ui/card"
import { Button } from "@/app/components/ui/button"
import { Scissors, User, Wind, Sparkles, Clock, Euro } from "lucide-react"

const services = [
  {
    icon: <Scissors className="h-12 w-12" />,
    title: "Coupe Signature",
    description: "Coupe personnalisée selon votre style et morphologie",
    duration: "45 min",
    price: "45€",
    features: ["Consultation style", "Shampoing inclus", "Finition à la cire"],
  },
  {
    icon: <User className="h-12 w-12" />,
    title: "Sculpture de Barbe",
    description: "Taille et mise en forme professionnelle de votre barbe",
    duration: "30 min",
    price: "35€",
    features: ["Taille précise", "Huiles nourrissantes", "Conseils d'entretien"],
  },
  {
    icon: <Wind className="h-12 w-12" />,
    title: "Rasage Traditionnel",
    description: "Rasage à l'ancienne avec serviettes chaudes",
    duration: "45 min",
    price: "50€",
    features: ["Serviettes chaudes", "Mousse traditionnelle", "Après-rasage premium"],
  },
  {
    icon: <Sparkles className="h-12 w-12" />,
    title: "Expérience Complète",
    description: "Le summum du service barbier",
    duration: "90 min",
    price: "85€",
    features: ["Coupe + Barbe + Rasage", "Massage du cuir chevelu", "Boisson offerte"],
  },
]

export default function ServicesGrid() {
  return (
    <section id="services" className=" pb-10 bg-gray-900">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-display font-black text-white mb-6">
            NOS
            <span className="block bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">
              SERVICES
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-red-700 mx-auto mb-8"></div>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto font-serif">
            Des services premium pour révéler votre style unique
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <Card
              key={service.title}
              className="bg-black border-2 border-gray-800 hover:border-red-500/50 transition-all duration-500 group overflow-hidden"
            >
              <CardContent className="p-8">
                <div className="flex items-start gap-6">
                  <div className="text-red-500 group-hover:text-red-400 transition-colors flex-shrink-0">
                    {service.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-display font-bold text-white mb-3 group-hover:text-red-500 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-gray-400 mb-6 font-serif leading-relaxed">{service.description}</p>

                    <div className="flex items-center gap-6 mb-6 text-sm text-gray-500">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        {service.duration}
                      </div>
                      <div className="flex items-center gap-2">
                        <Euro className="h-4 w-4" />
                        {service.price}
                      </div>
                    </div>

                    <ul className="space-y-2 mb-8">
                      {service.features.map((feature) => (
                        <li key={feature} className="text-gray-400 text-sm flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-red-500 rounded-full flex-shrink-0"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <Button
                      onClick={() => {
                        const modal = document.getElementById("booking-modal")
                        if (modal) modal.click()
                      }}
                      className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white ld py-3 rounded-none transition-all duration-300"
                    >
                      RÉSERVER CE SERVICE
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
