"use client"
import { Badge } from "@/app/secteur/barber/[slug]/model8/components/ui/badge"
import { Award, Users, Clock, Heart } from "lucide-react"

const values = [
  {
    icon: Award,
    title: "Excellence",
    description: "15 ans d'expérience au service de votre style",
  },
  {
    icon: Users,
    title: "Personnalisation",
    description: "Chaque coupe est unique et adaptée à votre personnalité",
  },
  {
    icon: Clock,
    title: "Ponctualité",
    description: "Respect de vos rendez-vous et de votre temps",
  },
  {
    icon: Heart,
    title: "Passion",
    description: "L'amour du métier au cœur de chaque geste",
  },
]

export default function AboutModern() {
  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div>
              <Badge className="mb-4 bg-gray-900 text-white px-4 py-2">À propos de nous</Badge>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                L'art du barbier,
                <span className="block text-gray-600">réinventé</span>
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Chez Gentleman's Cut, nous combinons les techniques traditionnelles du barbier avec les tendances
                contemporaines pour vous offrir une expérience unique. Notre équipe de professionnels passionnés met son
                savoir-faire à votre service dans un cadre moderne et chaleureux.
              </p>

              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                {values.map((value, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                      <value.icon className="h-5 w-5 text-gray-700" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">{value.title}</h3>
                      <p className="text-sm text-gray-600">{value.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Image */}
            <div className="relative">
              <div className="aspect-square bg-gray-200 rounded-2xl overflow-hidden">
                <img
                  src="/placeholder.svg?height=500&width=500&text=Salon+moderne"
                  alt="Salon Gentleman's Cut"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">1000+</div>
                  <div className="text-sm text-gray-600">Clients satisfaits</div>
                </div>
              </div>
              <div className="absolute -top-6 -right-6 bg-gray-900 text-white p-4 rounded-xl">
                <div className="text-center">
                  <div className="text-2xl font-bold">4.9</div>
                  <div className="text-xs">★★★★★</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
