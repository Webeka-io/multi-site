"use client"

import { Card, CardContent } from "@/app/secteur/barber/[slug]/model8/components/ui/card"
import { Badge } from "@/app/secteur/barber/[slug]/model8/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Scissors, Sparkles, Palette, Crown, Clock, Euro } from "lucide-react"

const services = [
  {
    icon: Scissors,
    title: "Coupe Classique",
    description: "Une coupe traditionnelle adaptée à votre style et morphologie",
    duration: "45 min",
    price: "35€",
    popular: false,
  },
  {
    icon: Sparkles,
    title: "Coupe & Barbe",
    description: "Service complet incluant coupe et taille de barbe professionnelle",
    duration: "60 min",
    price: "50€",
    popular: true,
  },
  {
    icon: Palette,
    title: "Coloration",
    description: "Coloration naturelle ou moderne pour sublimer votre style",
    duration: "90 min",
    price: "65€",
    popular: false,
  },
  {
    icon: Crown,
    title: "Service Premium",
    description: "Expérience complète avec soins du visage et massage du cuir chevelu",
    duration: "120 min",
    price: "85€",
    popular: false,
  },
]

export default function ServicesModern() {
  return (
    <section id="services" className="py-20 bg-white">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Nos Services</h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            Des prestations d'excellence adaptées à vos besoins, dans un environnement moderne et accueillant.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <Card key={index} className="relative group hover:shadow-lg transition-all duration-300 border-gray-100">
              {service.popular && (
                <Badge className="absolute -top-2 left-4 bg-gray-900 text-white px-3 py-1 text-xs font-medium">
                  Populaire
                </Badge>
              )}
              <CardContent className="p-6">
                <div className="mb-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-gray-900 group-hover:text-white transition-colors">
                    <service.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">{service.description}</p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 text-gray-500">
                      <Clock className="h-4 w-4" />
                      <span>{service.duration}</span>
                    </div>
                    <div className="flex items-center gap-1 font-semibold text-gray-900">
                      <Euro className="h-4 w-4" />
                      <span>{service.price}</span>
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    className="w-full border-gray-200 hover:bg-gray-900 hover:text-white transition-colors bg-transparent"
                  >
                    Réserver
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button
            size="lg"
            className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-4 text-lg font-medium rounded-lg"
          >
            Voir tous nos services
          </Button>
        </div>
      </div>
    </section>
  )
}
