import Image from "next/image"
import { Award, Scissors, Star } from "lucide-react"

const masters = [
  {
    name: "Antoine Dubois",
    title: "Maître Barbier - 3ème Génération",
    image: "/placeholder.svg?width=300&height=400",
    experience: "25 ans",
    specialty: "Coupes classiques & Rasage traditionnel",
    description: "Héritier de la tradition familiale, Antoine allie savoir-faire ancestral et techniques modernes.",
  },
  {
    name: "Henri Moreau",
    title: "Barbier Senior",
    image: "/placeholder.svg?width=300&height=400",
    experience: "18 ans",
    specialty: "Taille de barbe & Soins du visage",
    description: "Spécialiste reconnu de la barbe, Henri forme les nouvelles générations de barbiers.",
  },
  {
    name: "Louis Martin",
    title: "Barbier Artisan",
    image: "/placeholder.svg?width=300&height=400",
    experience: "12 ans",
    specialty: "Coupes modernes & Styling",
    description: "Passionné par les tendances actuelles, Louis apporte une touche contemporaine à nos services.",
  },
]

export default function MastersSection() {
  return (
    <section id="masters" className="py-32 bg-cream-50 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 right-20 w-64 h-64 border-8 border-burgundy-300 rounded-full"></div>
        <div className="absolute bottom-20 left-20 w-48 h-48 bg-gold-200 rounded-full"></div>
      </div>

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-3 bg-gold-100 text-burgundy-700 px-6 py-3 rounded-full border-2 border-gold-400 mb-6">
            <Award className="h-5 w-5" />
            <span className="font-serif font-bold text-sm uppercase tracking-wider">Nos Maîtres</span>
          </div>
          <h2 className="text-6xl md:text-7xl font-script text-burgundy-800 leading-tight mb-6">
            L'Excellence
            <span className="block text-gold-600">Incarnée</span>
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-gold-400 to-gold-600 mx-auto mb-8"></div>
          <p className="text-xl text-brown-600 max-w-4xl mx-auto leading-relaxed font-serif">
            Rencontrez nos maîtres barbiers, gardiens de la tradition et artisans de votre élégance. Chacun apporte son
            expertise unique au service de votre style.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {masters.map((master, index) => (
            <div
              key={master.name}
              className="bg-cream-100 rounded-lg border-4 border-gold-300 shadow-xl hover:shadow-2xl transition-all duration-500 group overflow-hidden"
            >
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src={master.image || "/placeholder.svg"}
                  alt={master.name}
                  fill
                  className="object-cover sepia-[0.3] contrast-110 group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-burgundy-900/30 to-transparent"></div>
                <div className="absolute top-4 right-4 bg-burgundy-600 text-cream-50 p-2 rounded-full border-2 border-gold-400">
                  <Scissors className="h-4 w-4 text-gold-400" />
                </div>
              </div>

              <div className="p-8">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-script text-burgundy-800 mb-2">{master.name}</h3>
                  <p className="text-gold-600 font-serif font-semibold text-sm mb-4">{master.title}</p>

                  <div className="flex items-center justify-center gap-4 mb-4">
                    <div className="flex items-center gap-1 text-burgundy-600">
                      <Star className="h-4 w-4 text-gold-500" />
                      <span className="font-serif font-bold text-sm">{master.experience}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-burgundy-50 p-4 rounded-lg border-2 border-burgundy-200">
                    <h4 className="font-serif font-bold text-burgundy-800 text-sm mb-2 uppercase tracking-wider">
                      Spécialité
                    </h4>
                    <p className="text-brown-600 font-serif text-sm">{master.specialty}</p>
                  </div>

                  <p className="text-brown-600 font-serif text-sm leading-relaxed italic text-center">
                    "{master.description}"
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
