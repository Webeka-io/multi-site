import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Button } from "@/app/components/ui/button"
import { Badge } from "@/app/components/ui/badge"
import { Scissors, Crown, Users, Sparkles, Clock, Check } from "lucide-react"

export default function PricingPage() {
  const pricingTiers = [
    {
      name: "Essentiel",
      price: "25",
      icon: Scissors,
      description: "Pour un look soigné au quotidien",
      features: ["Coupe classique", "Shampooing inclus", "Finition au rasoir", "Conseil personnalisé"],
      popular: false,
      color: "border-gray-600",
    },
    {
      name: "Premium",
      price: "45",
      icon: Crown,
      description: "L'expérience complète du gentleman",
      features: [
        "Coupe + taille de barbe",
        "Shampooing premium",
        "Soin du visage",
        "Styling avec produits haut de gamme",
        "Massage du cuir chevelu",
      ],
      popular: true,
      color: "border-indigo-500",
    },
    {
      name: "VIP",
      price: "65",
      icon: Sparkles,
      description: "Le summum du raffinement",
      features: [
        "Tout du forfait Premium",
        "Rasage traditionnel à l'ancienne",
        "Masque hydratant",
        "Boisson offerte",
        "Service prioritaire",
      ],
      popular: false,
      color: "border-indigo-400",
    },
  ]

  const quickServices = [
    { name: "Retouche barbe", price: "15€", duration: "15 min" },
    { name: "Coupe enfant", price: "18€", duration: "20 min" },
    { name: "Shampooing seul", price: "8€", duration: "10 min" },
    { name: "Styling", price: "12€", duration: "15 min" },
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-black to-black"></div>
        <div className="relative max-w-6xl mx-auto px-4 py-20 text-center">
          <div className="inline-flex items-center gap-3 bg-indigo-500/20 border border-indigo-500/30 rounded-full px-6 py-2 mb-8">
            <Scissors className="w-5 h-5 text-indigo-500" />
            <span className="text-indigo-500 font-medium">Barbershop Premium</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-balance">
            Nos <span className="text-indigo-500">Forfaits</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto text-pretty leading-relaxed">
            Choisissez l'expérience qui vous correspond. Chaque forfait inclut l'expertise de nos maîtres barbiers.
          </p>
        </div>
      </div>

      {/* Main Pricing Tiers */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {pricingTiers.map((tier, index) => {
            const IconComponent = tier.icon
            return (
              <Card
                key={index}
                className={`relative bg-gray-900/50 backdrop-blur border-2 ${tier.color} transition-all duration-500 hover:scale-105 hover:bg-gray-900/70 ${
                  tier.popular ? "lg:scale-110 shadow-2xl shadow-indigo-500/20" : ""
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-indigo-500 text-black font-bold px-6 py-2 text-sm">LE PLUS POPULAIRE</Badge>
                  </div>
                )}

                <CardHeader className="text-center pb-6 pt-8">
                  <div className="flex justify-center mb-4">
                    <div className={`p-4 rounded-full ${tier.popular ? "bg-indigo-500" : "bg-gray-800"}`}>
                      <IconComponent className={`w-8 h-8 ${tier.popular ? "text-black" : "text-indigo-500"}`} />
                    </div>
                  </div>
                  <CardTitle className="text-2xl font-bold text-white mb-2">{tier.name}</CardTitle>
                  <p className="text-gray-400 text-sm">{tier.description}</p>
                </CardHeader>

                <CardContent className="text-center">
                  <div className="mb-8">
                    <span className="text-5xl font-bold text-indigo-500">{tier.price}</span>
                    <span className="text-gray-400 text-lg">€</span>
                  </div>

                  <ul className="space-y-3 mb-8 text-left">
                    {tier.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-3">
                        <Check className="w-5 h-5 text-indigo-500 flex-shrink-0" />
                        <span className="text-gray-300 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    className={`w-full font-semibold py-3 transition-all duration-300 ${
                      tier.popular
                        ? "bg-indigo-500 hover:bg-indigo-600 text-black"
                        : "bg-transparent border-2 border-indigo-500 text-indigo-500 hover:bg-indigo-500 hover:text-black"
                    }`}
                  >
                    Choisir {tier.name}
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Quick Services */}
      <div className="bg-gray-900/30 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Services Express</h2>
            <p className="text-gray-400">Retouches rapides sans rendez-vous</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickServices.map((service, index) => (
              <Card
                key={index}
                className="bg-black/50 border border-gray-700 hover:border-indigo-500/50 transition-all duration-300"
              >
                <CardContent className="p-6 text-center">
                  <h3 className="font-semibold text-white mb-2">{service.name}</h3>
                  <div className="flex items-center justify-center gap-2 text-gray-400 text-sm mb-3">
                    <Clock className="w-4 h-4" />
                    {service.duration}
                  </div>
                  <span className="text-2xl font-bold text-indigo-500">{service.price}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-indigo-600"></div>
        <div className="relative max-w-4xl mx-auto px-4 py-16 text-center">
          <Users className="w-16 h-16 text-black mx-auto mb-6" />
          <h2 className="text-4xl font-bold text-black mb-4">Rejoignez nos clients satisfaits</h2>
          <p className="text-black/80 mb-8 text-lg max-w-2xl mx-auto">
            Plus de 1000 clients nous font confiance chaque mois. Découvrez pourquoi nous sommes le barbershop de
            référence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-black text-white hover:bg-gray-800 font-semibold px-8 py-4">
              Réserver maintenant
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-black text-black hover:bg-black hover:text-white font-semibold px-8 py-4 bg-transparent"
            >
              Voir nos réalisations
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
