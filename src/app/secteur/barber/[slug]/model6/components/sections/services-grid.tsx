import { Card, CardContent } from "@/app/secteur/barber/[slug]/model6/components/ui/card"
import { Button } from "@/app/secteur/barber/[slug]/model6/components/ui/button"
import { Scissors, Zap, Target, ArrowRight } from "lucide-react"
import Link from "next/link"

const services = [
  {
    icon: <Scissors className="h-12 w-12" />,
    title: "RADICAL CUT",
    code: "RC_001",
    description: "Coupe révolutionnaire adaptée à votre style moderne",
    duration: "45 MIN",
    price: "45€",
    color: "red",
  },
  {
    icon: <Target className="h-12 w-12" />,
    title: "PRECISION TRIM",
    code: "PT_002",
    description: "Taille de barbe avec précision millimétrique",
    duration: "30 MIN",
    price: "35€",
    color: "black",
  },
  {
    icon: <Zap className="h-12 w-12" />,
    title: "FULL RESET",
    code: "FR_003",
    description: "Transformation complète : coupe + barbe + style",
    duration: "90 MIN",
    price: "85€",
    color: "red",
  },
  {
    icon: <Scissors className="h-12 w-12" />,
    title: "QUICK REFRESH",
    code: "QR_004",
    description: "Retouche rapide pour maintenir votre look",
    duration: "20 MIN",
    price: "25€",
    color: "black",
  },
]

export default function ServicesGrid() {
  return (
    <section id="services" className="py-32 bg-white">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-3 bg-black text-white px-6 py-3 border-4 border-black shadow-brutal mb-8">
              <Scissors className="h-5 w-5 text-red-500" />
              <span className="font-mono font-bold text-sm uppercase tracking-wider">SERVICES</span>
            </div>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-display font-black text-black leading-tight mb-8">
              NOTRE
              <span className="block text-red-500">ARSENAL</span>
            </h2>
            <div className="w-32 h-2 bg-black mx-auto mb-8"></div>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto font-mono">
              Chaque service est une arme de transformation massive. Choisissez votre niveau d'impact.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <Card
                key={service.code}
                className={`border-4 border-black shadow-brutal hover:shadow-none transition-all duration-200 transform hover:translate-x-2 hover:translate-y-2 group cursor-pointer bg-white`}
              >
                <CardContent className="p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div
                      className={`w-16 h-16 ${
                        service.color === "red" ? "bg-red-500" : "bg-black"
                      } border-4 border-black flex items-center justify-center group-hover:rotate-12 transition-transform duration-200`}
                    >
                      <div className="text-white">{service.icon}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-mono font-bold text-gray-500 text-sm">{service.code}</div>
                      <div className="font-display font-black text-2xl text-black">{service.price}</div>
                    </div>
                  </div>

                  <div className="space-y-4 mb-8">
                    <h3 className="text-2xl font-display font-black text-black">{service.title}</h3>
                    <p className="text-gray-700 font-mono leading-relaxed">{service.description}</p>
                    <div className="flex items-center gap-4">
                      <div className="font-mono font-bold text-sm text-gray-500">DURÉE:</div>
                      <div className="font-display font-black text-black">{service.duration}</div>
                    </div>
                  </div>

                  <Button
                    asChild
                    className={`w-full ${
                      service.color === "red" ? "bg-red-500 hover:bg-black" : "bg-black hover:bg-red-500"
                    } text-white font-display font-black py-4 border-4 border-black shadow-brutal hover:shadow-none transition-all duration-200 transform hover:translate-x-1 hover:translate-y-1 group`}
                  >
                    <Link href="#booking" className="flex items-center justify-center gap-2">
                      SÉLECTIONNER
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
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
