import Image from "next/image"
import { Award, Scissors, Star, Clock } from "lucide-react"

export default function ArtisanSection() {
  return (
    <section id="artisan" className="py-32 bg-gradient-to-b from-amber-100 to-orange-50 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 right-20 w-64 h-64 border-8 border-amber-300 rounded-full"></div>
        <div className="absolute bottom-20 left-20 w-48 h-48 bg-orange-200 rounded-full"></div>
      </div>

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-3 bg-amber-600 text-white px-6 py-3 rounded-xl border-2 border-amber-300 mb-6 shadow-lg">
            <Award className="h-5 w-5" />
            <span className="font-bold text-sm uppercase tracking-wider">L'Artisan</span>
          </div>
          <h2 className="text-6xl md:text-7xl font-bold text-amber-900 leading-tight mb-6">
            Maître
            <span className="block text-orange-600">Barbier</span>
          </h2>
          <div className="w-32 h-2 bg-gradient-to-r from-amber-400 to-orange-500 mx-auto mb-8 rounded-full"></div>
          <p className="text-xl text-amber-700 max-w-4xl mx-auto leading-relaxed">
            Rencontrez Thomas Dubois, artisan barbier passionné qui perpétue les traditions authentiques du métier avec
            des gestes précis et un savoir-faire unique.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border-4 border-amber-300 shadow-xl">
              <Image
                src="/placeholder.svg?width=500&height=625"
                alt="Thomas Dubois, maître barbier artisan"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-amber-900/20 to-transparent"></div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-full h-full border-4 border-orange-200 rounded-2xl -z-10"></div>
            <div className="absolute top-4 right-4 bg-amber-600 text-white p-3 rounded-xl border-2 border-amber-200 shadow-lg">
              <Scissors className="h-6 w-6" />
            </div>
          </div>

          <div className="space-y-8">
            <div className="space-y-4">
              <h3 className="text-4xl font-bold text-amber-900">Thomas Dubois</h3>
              <p className="text-xl text-orange-600 font-semibold italic">Maître Barbier & Artisan</p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="bg-amber-50 p-6 rounded-xl border-2 border-amber-200">
                <div className="flex items-center gap-3 mb-3">
                  <Clock className="h-6 w-6 text-amber-600" />
                  <span className="font-bold text-amber-800">Expérience</span>
                </div>
                <p className="text-2xl font-bold text-amber-900">15 ans</p>
                <p className="text-amber-600 text-sm">de pratique artisanale</p>
              </div>

              <div className="bg-orange-50 p-6 rounded-xl border-2 border-orange-200">
                <div className="flex items-center gap-3 mb-3">
                  <Star className="h-6 w-6 text-orange-600" />
                  <span className="font-bold text-orange-800">Spécialité</span>
                </div>
                <p className="text-lg font-bold text-orange-900">Rasage</p>
                <p className="text-orange-600 text-sm">au sabre traditionnel</p>
              </div>
            </div>

            <div className="space-y-6">
              <blockquote className="text-xl text-amber-800 italic leading-relaxed border-l-4 border-amber-400 pl-6">
                "Chaque client qui s'assoit dans mon fauteuil mérite une attention particulière. Je ne fais pas que
                couper les cheveux, je crée une expérience unique avec des gestes qui se transmettent depuis des
                générations."
              </blockquote>

              <div className="space-y-4">
                <h4 className="font-bold text-amber-900 text-lg">Formation & Certifications</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                    <span className="text-amber-700">
                      Diplôme de Barbier Traditionnel - École Française de Coiffure
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                    <span className="text-amber-700">Certification Rasage au Sabre - Maître Barbier de Lyon</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                    <span className="text-amber-700">Formation continue en techniques artisanales</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
