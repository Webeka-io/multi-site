"use client"

import { useState } from "react"
import { Card, CardContent } from "@/app/secteur/barber/[slug]/model4/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/app/secteur/barber/[slug]/model4/components/ui/avatar"
import { Star, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/app/secteur/barber/[slug]/model4/components/ui/button"

const testimonials = [
  {
    name: "Thomas M.",
    avatar: "/placeholder.svg?width=60&height=60",
    rating: 5,
    review: "Service impeccable, ambiance moderne et résultat parfait. Je recommande vivement !",
    service: "Coupe Moderne",
  },
  {
    name: "Pierre L.",
    avatar: "/placeholder.svg?width=60&height=60",
    rating: 5,
    review: "Équipe professionnelle, salon très propre et coupe exactement comme je voulais.",
    service: "Service Complet",
  },
  {
    name: "Marc D.",
    avatar: "/placeholder.svg?width=60&height=60",
    rating: 5,
    review: "Excellent rapport qualité-prix. Le salon est moderne et l'équipe très accueillante.",
    service: "Taille de Barbe",
  },
]

export default function TestimonialsClean() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section id="testimonials" className="py-24 bg-white">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
              Avis
              <span className="font-medium"> Clients</span>
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              Découvrez ce que nos clients pensent de leur expérience
            </p>
          </div>

          <div className="relative">
            <Card className="border-gray-100 shadow-sm">
              <CardContent className="p-12 text-center">
                <div className="flex justify-center mb-6">
                  {Array(testimonials[currentIndex].rating)
                    .fill(0)
                    .map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                    ))}
                </div>
                <blockquote className="text-2xl font-light text-gray-900 leading-relaxed mb-8">
                  "{testimonials[currentIndex].review}"
                </blockquote>
                <div className="flex items-center justify-center gap-4">
                  <Avatar className="w-12 h-12">
                    <AvatarImage
                      src={testimonials[currentIndex].avatar || "/placeholder.svg"}
                      alt={testimonials[currentIndex].name}
                    />
                    <AvatarFallback className="bg-gray-100 text-gray-600">
                      {testimonials[currentIndex].name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-left">
                    <div className="font-medium text-gray-900">{testimonials[currentIndex].name}</div>
                    <div className="text-sm text-gray-500">{testimonials[currentIndex].service}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-center items-center gap-4 mt-8">
              <Button
                onClick={prevTestimonial}
                variant="outline"
                size="icon"
                className="border-gray-300 hover:bg-gray-50 bg-transparent"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentIndex ? "bg-gray-900 w-6" : "bg-gray-300"
                    }`}
                  />
                ))}
              </div>
              <Button
                onClick={nextTestimonial}
                variant="outline"
                size="icon"
                className="border-gray-300 hover:bg-gray-50 bg-transparent"
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
