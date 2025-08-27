import { Card, CardContent } from "@/app/secteur/barber/[slug]/model2/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/app/secteur/barber/[slug]/model2/components/ui/avatar"
import { Star } from "lucide-react"
import type { Business } from "@/lib/parseSlug"
type Props = { business?: Business }

const testimonials = [
  {
    name: "Antoine Dubois",
    title: "Directeur Artistique",
    avatar: "/placeholder.svg?width=80&height=80",
    rating: 5,
    quote:
      "Une expérience transcendante. L'attention portée aux détails et la qualité du service dépassent toutes mes attentes. Un véritable art de vivre.",
  },
  {
    name: "Maxime Laurent",
    title: "Entrepreneur",
    avatar: "/placeholder.svg?width=80&height=80",
    rating: 5,
    quote:
      "Ce barbier a redéfini ma vision du barbier. Professionnalisme, élégance et résultat exceptionnel. Une adresse incontournable.",
  },
  {
    name: "Philippe Martin",
    title: "Avocat",
    avatar: "/placeholder.svg?width=80&height=80",
    rating: 5,
    quote:
      "Le raffinement à l'état pur. Chaque visite est un moment privilégié où l'excellence technique rencontre l'art de recevoir.",
  },
]

export default function TestimonialsElegant({ business }: Props) {
  const entreprise = business?.entreprise
  const ville = business?.ville
  const secteur = business?.secteur

  return (
    <section id="testimonials" className="py-32 bg-stone-100">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="text-center mb-20">
          <p className="text-amber-600 font-medium tracking-wider uppercase text-sm mb-4">Témoignages</p>
          <h2 className="text-5xl md:text-6xl font-serif font-light text-stone-900 leading-tight mb-6">
            La Confiance
            <span className="block font-normal italic">de nos Clients</span>
          </h2>
          <div className="w-16 h-px bg-amber-600 mx-auto mb-8"></div>
          <p className="text-xl text-stone-600 max-w-3xl mx-auto leading-relaxed">
            Leurs mots valent mieux que tous nos discours
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-500">
              <CardContent className="p-8 text-center">
                <div className="flex justify-center mb-6">
                  {Array(testimonial.rating)
                    .fill(0)
                    .map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-amber-600 fill-amber-600" />
                    ))}
                </div>
                <blockquote className="text-stone-600 leading-relaxed mb-8 italic">"{testimonial.quote}"</blockquote>
                <div className="flex items-center justify-center gap-4">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.name} />
                    <AvatarFallback className="bg-amber-600 text-white font-medium">
                      {testimonial.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-left">
                    <div className="font-medium text-stone-900">{testimonial.name}</div>
                    <div className="text-stone-500 text-sm">{testimonial.title}</div>
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
