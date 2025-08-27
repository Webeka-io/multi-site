import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Award, Clock, Users, CheckCircle, XCircle } from "lucide-react"

// Fonction pour déterminer si le salon est ouvert
function getShopStatus() {
  const now = new Date()
  const day = now.getDay()
  const hour = now.getHours()
  const minute = now.getMinutes()
  const currentTime = hour * 60 + minute

  if (day === 0 || day === 1) {
    return { isOpen: false, nextOpen: "Mardi 9h00" }
  }

  if (day >= 2 && day <= 5) {
    if (currentTime >= 540 && currentTime < 1140) {
      return { isOpen: true, closesAt: "19h00" }
    }
    return { isOpen: false, nextOpen: currentTime < 540 ? "Aujourd'hui 9h00" : "Demain 9h00" }
  }

  if (day === 6) {
    if (currentTime >= 480 && currentTime < 1080) {
      return { isOpen: true, closesAt: "18h00" }
    }
    return { isOpen: false, nextOpen: currentTime < 480 ? "Aujourd'hui 8h00" : "Mardi 9h00" }
  }

  return { isOpen: false, nextOpen: "Mardi 9h00" }
}

export default function HeroCraft() {
  const shopStatus = getShopStatus()

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 overflow-hidden"
    >
      {/* Texture Background */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="w-full h-full bg-repeat"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23D97706' fillOpacity='0.3'%3E%3Cpath d='M20 20c0 11.046-8.954 20-20 20v-40c11.046 0 20 8.954 20 20zM0 20c0-11.046 8.954-20 20-20v40c-11.046 0-20-8.954-20-20z'/%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 right-20 w-32 h-32 bg-amber-200 rounded-full opacity-30 blur-xl"></div>
      <div className="absolute bottom-40 left-20 w-24 h-24 bg-orange-200 rounded-full opacity-40 blur-lg"></div>

      <div className="container mx-auto px-6 lg:px-8 relative z-10 mt-[130px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            {/* Status Badge */}
            

            {/* Main Title */}
            <div className="space-y-4">
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-amber-900 leading-none">Gentleman's</h1>
              <div className="flex items-center gap-4">
                <div className="flex-1 h-2 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full"></div>
                <h2 className="text-4xl md:text-5xl font-bold text-orange-600 uppercase tracking-wider">CRAFT</h2>
                <div className="flex-1 h-2 bg-gradient-to-l from-amber-400 to-orange-500 rounded-full"></div>
              </div>
            </div>

            {/* Subtitle */}
            <div className="space-y-4">
              <p className="text-2xl md:text-3xl font-semibold text-amber-800 italic">
                "L'Artisanat du Barbier Authentique"
              </p>
              <p className="text-lg text-amber-700 leading-relaxed max-w-2xl">
                Dans notre atelier artisanal, chaque coupe est une œuvre unique. Nous perpétuons les gestes
                traditionnels du barbier avec des outils authentiques et un savoir-faire transmis de maître à apprenti.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Button
                asChild
                size="lg"
                className="bg-amber-600 hover:bg-amber-700 text-white font-bold text-lg px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Link href="#booking">Réserver un Créneau</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-2 border-amber-600 text-amber-600 hover:bg-amber-50 font-bold text-lg px-8 py-4 rounded-xl transition-all duration-300 bg-transparent"
              >
                <Link href="#artisan">Découvrir l'Artisan</Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-12 border-t-2 border-amber-200">
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Award className="h-6 w-6 text-orange-600 mr-2" />
                  <span className="text-3xl font-bold text-amber-800">15+</span>
                </div>
                <p className="text-amber-600 font-semibold text-sm uppercase tracking-wider">Années d'artisanat</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Users className="h-6 w-6 text-orange-600 mr-2" />
                  <span className="text-3xl font-bold text-amber-800">2K+</span>
                </div>
                <p className="text-amber-600 font-semibold text-sm uppercase tracking-wider">Clients satisfaits</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Clock className="h-6 w-6 text-orange-600 mr-2" />
                  <span className="text-3xl font-bold text-amber-800">100%</span>
                </div>
                <p className="text-amber-600 font-semibold text-sm uppercase tracking-wider">Fait main</p>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border-4 border-amber-300 shadow-2xl">
              <Image
                src="/placeholder.svg?width=600&height=750"
                alt="Atelier de barbier artisanal avec outils traditionnels"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-amber-900/30 to-transparent"></div>
            </div>

            {/* Decorative Frame */}
            <div className="absolute -top-4 -left-4 w-full h-full border-4 border-amber-200 rounded-2xl -z-10"></div>
            <div className="absolute -bottom-4 -right-4 w-full h-full bg-gradient-to-br from-orange-200 to-amber-200 rounded-2xl -z-20"></div>

            {/* Craft Badge */}
            <div className="absolute -top-6 -right-6 bg-gradient-to-br from-amber-500 to-orange-600 text-white p-4 rounded-xl border-4 border-amber-100 shadow-lg">
              <div className="text-center">
                <div className="text-sm font-bold uppercase tracking-wider">Artisan</div>
                <div className="text-lg font-bold">Certifié</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
