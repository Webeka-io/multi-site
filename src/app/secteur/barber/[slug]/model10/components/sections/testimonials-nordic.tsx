"use client"

import { useState } from "react"
import { Card, CardContent } from "@/app/secteur/barber/[slug]/model10/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/app/secteur/barber/[slug]/model10/components/ui/avatar"
import { Star, Heart, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const testimonials = [
  {
    name: "Pierre M.",
    avatar: "/placeholder.svg?width=60&height=60",
    rating: 5,
    review: "Un moment de pure détente. L'équipe est à l'écoute et l'ambiance est apaisante. Je recommande vivement !",
    service: "Expérience Complète",
  },
  {
    name: "Thomas L.",
    avatar: "/placeholder.svg?width=60&height=60",
    rating: 5,
    review: "Enfin un salon où on prend le temps. Antoine a su comprendre exactement ce que je voulais. Parfait !",
    service: "Coupe Signature",
  },
  {
    name: "Alexandre D.",
    avatar: "/placeholder.svg?width=60&height=60",
    rating: 5,
    review: "L'approche naturelle et respectueuse me correspond parfaitement. Un vrai moment de bien-être.",
    service: "Soin de la Barbe",
  },
]

export default function TestimonialsNordic() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section id="testimonials" className="py-24 bg-gradient-to-b from-cream-50 to-sage-50">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 bg-white text-sage-700 px-4 py-2 rounded-full text-sm font-light mb-6 shadow-sm">
              <Heart className="h-4 w-4" />
              Témoignages
            </div>
            <h2 className="text-4xl md:text-5xl font-light text-stone-800 mb-6">
              Ils nous font
              <span className="block font-normal text-sage-600">confiance</span>
            </h2>
            <div className="w-16 h-0.5 bg-sage-400 mx-auto mb-8"></div>
            <p className="text-xl text-stone-600 leading-relaxed font-light">
              Découvrez les expériences de nos clients
            </p>
          </div>

          <div className="relative">
            <Card className="border-0 shadow-sm bg-white rounded-3xl">
              <CardContent className="p-12 text-center">
                <div className="flex justify-center mb-6">
                  {Array(testimonials[currentIndex].rating)
                    .fill(0)
                    .map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-sage-500 fill-sage-500" />
                    ))}
                </div>
                <blockquote className="text-2xl font-light text-stone-700 leading-relaxed mb-8 italic">
                  "{testimonials[currentIndex].review}"
                </blockquote>
                <div className="flex items-center justify-center gap-4">
                  <Avatar className="w-12 h-12">
                    <AvatarImage
                      src={testimonials[currentIndex].avatar || "/placeholder.svg"}
                      alt={testimonials[currentIndex].name}
                    />
                    <AvatarFallback className="bg-sage-100 text-sage-600 font-light">
                      {testimonials[currentIndex].name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-left">
                    <div className="font-medium text-stone-800">{testimonials[currentIndex].name}</div>
                    <div className="text-sm text-stone-500 font-light">{testimonials[currentIndex].service}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-center items-center gap-4 mt-8">
              <Button
                onClick={prevTestimonial}
                variant="outline"
                size="icon"
                className="border-sage-200 hover:bg-sage-50 bg-transparent rounded-full"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentIndex ? "bg-sage-500 w-6" : "bg-sage-200"
                    }`}
                  />
                ))}
              </div>
              <Button
                onClick={nextTestimonial}
                variant="outline"
                size="icon"
                className="border-sage-200 hover:bg-sage-50 bg-transparent rounded-full"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
