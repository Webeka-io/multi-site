"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/app/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/ui/avatar"
import { Star, Quote } from "lucide-react"

const testimonials = [
  {
    name: "Alexandre Dubois",
    avatar: "/placeholder.svg?width=80&height=80",
    rating: 5,
    quote:
      "Une expérience exceptionnelle ! L'attention aux détails et le professionnalisme sont remarquables. Je ne vais plus nulle part ailleurs.",
    service: "Expérience Complète",
  },
  {
    name: "Marc Lefebvre",
    avatar: "/placeholder.svg?width=80&height=80",
    rating: 5,
    quote:
      "Le meilleur barbier de Paris, sans hésitation. L'ambiance est parfaite et le résultat toujours impeccable. Un vrai moment de détente.",
    service: "Coupe Signature",
  },
  {
    name: "Thomas Martin",
    avatar: "/placeholder.svg?width=80&height=80",
    rating: 5,
    quote:
      "Rasage traditionnel d'exception ! La technique est parfaite et l'accueil chaleureux. Une adresse que je recommande vivement.",
    service: "Rasage Traditionnel",
  },
  {
    name: "Pierre Moreau",
    avatar: "/placeholder.svg?width=80&height=80",
    rating: 5,
    quote:
      "Enfin un salon qui comprend les hommes ! Service irréprochable, conseils personnalisés et résultat au-delà de mes attentes.",
    service: "Sculpture de Barbe",
  },
]

export default function TestimonialsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section id="testimonials" className="py-32 bg-gradient-to-b from-gray-900 to-black">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-display font-black text-white mb-6">
            ILS NOUS
            <span className="block bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">
              FONT CONFIANCE
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-red-700 mx-auto mb-8"></div>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto font-serif">
            Découvrez ce que nos clients pensent de leur expérience
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="w-full flex-shrink-0 px-4">
                  <Card className="bg-black border-2 border-gray-800 text-white">
                    <CardContent className="p-12 text-center">
                      <Quote className="h-12 w-12 text-red-500 mx-auto mb-8" />
                      <blockquote className="text-xl md:text-2xl font-serif italic text-gray-300 leading-relaxed mb-8">
                        "{testimonial.quote}"
                      </blockquote>
                      <div className="flex justify-center mb-6">
                        {Array(testimonial.rating)
                          .fill(0)
                          .map((_, i) => (
                            <Star key={i} className="h-6 w-6 text-red-500 fill-red-500" />
                          ))}
                      </div>
                      <div className="flex items-center justify-center gap-4">
                        <Avatar className="w-16 h-16 border-2 border-red-500">
                          <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.name} />
                          <AvatarFallback className="bg-red-500 text-white font-bold">
                            {testimonial.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="text-left">
                          <div className="font-display font-bold text-white text-lg">{testimonial.name}</div>
                          <div className="text-red-500 text-sm">{testimonial.service}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center mt-8 gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex ? "bg-red-500 w-8" : "bg-gray-600 hover:bg-gray-500"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
