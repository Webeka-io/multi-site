import Image from "next/image"
import { Heart, Scissors } from "lucide-react"

const team = [
  {
    name: "Antoine",
    role: "Barbier principal",
    image: "/placeholder.svg?width=300&height=400",
    experience: "8 ans",
    specialty: "Coupes naturelles",
    description: "Passionné par l'art du bien-être masculin, Antoine privilégie une approche douce et personnalisée.",
  },
  {
    name: "Julien",
    role: "Spécialiste barbe",
    image: "/placeholder.svg?width=300&height=400",
    experience: "6 ans",
    specialty: "Soins de la barbe",
    description: "Expert en soins naturels, Julien transforme l'entretien de la barbe en moment de détente.",
  },
  {
    name: "Maxime",
    role: "Barbier créatif",
    image: "/placeholder.svg?width=300&height=400",
    experience: "5 ans",
    specialty: "Coupes modernes",
    description: "Alliant tradition et modernité, Maxime crée des coupes qui révèlent votre personnalité.",
  },
]

export default function TeamNordic() {
  return (
    <section id="team" className="py-24 bg-white">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 bg-sage-100 text-sage-700 px-4 py-2 rounded-full text-sm font-light mb-6">
              <Heart className="h-4 w-4" />
              Notre Équipe
            </div>
            <h2 className="text-4xl md:text-5xl font-light text-stone-800 mb-6">
              Des artisans
              <span className="block font-normal text-sage-600">passionnés</span>
            </h2>
            <div className="w-16 h-0.5 bg-sage-400 mx-auto mb-8"></div>
            <p className="text-xl text-stone-600 leading-relaxed max-w-3xl mx-auto font-light">
              Chaque membre de notre équipe partage la même vision : faire de votre visite un moment de détente et de
              bien-être authentique.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div
                key={member.name}
                className="bg-gradient-to-b from-sage-50 to-cream-50 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group"
              >
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-sage-900/20 to-transparent"></div>
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-full">
                    <Scissors className="h-4 w-4 text-sage-600" />
                  </div>
                </div>

                <div className="p-8">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-medium text-stone-800 mb-2">{member.name}</h3>
                    <p className="text-sage-600 font-light text-sm mb-4">{member.role}</p>

                    <div className="flex items-center justify-center gap-4 mb-4">
                      <div className="flex items-center gap-1 text-stone-500">
                        <Heart className="h-4 w-4 text-sage-500" />
                        <span className="font-light text-sm">{member.experience}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-white p-4 rounded-2xl border border-sage-100">
                      <h4 className="font-medium text-stone-800 text-sm mb-2">Spécialité</h4>
                      <p className="text-sage-600 font-light text-sm">{member.specialty}</p>
                    </div>

                    <p className="text-stone-600 font-light text-sm leading-relaxed text-center italic">
                      "{member.description}"
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
