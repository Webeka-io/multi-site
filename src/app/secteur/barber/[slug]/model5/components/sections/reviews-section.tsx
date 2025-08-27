"use client"

import { useState } from "react"
import { Card, CardContent } from "@/app/secteur/barber/[slug]/model5/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/app/secteur/barber/[slug]/model5/components/ui/avatar"
import { Star, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/app/secteur/barber/[slug]/model5/components/ui/button"

const reviews = [
  {
    name: "Kevin M.",
    avatar: "/placeholder.svg?width=60&height=60",
    rating: 5,
    review:
      "Ambiance de fou, équipe au top ! Ma coupe est parfaite, exactement ce que je voulais. Je recommande à 100%.",
    service: "Coupe Moderne",
  },
  {
    name: "Julien R.",
    avatar: "/placeholder.svg?width=60&height=60",
    rating: 5,
    review: "Le meilleur barbershop de la ville ! Technique impeccable et style unique. Mon nouveau QG beauté.",
    service: "Pack Complet",
  },
  {
    name: "Marco L.",
    avatar: "/placeholder.svg?width=60&height=60",
    rating: 5,
    review: "Enfin un salon qui comprend le style urbain ! Résultat au-delà de mes attentes, je reviendrai c'est sûr.",
    service: "Barbe Design",
  },
  {
    name: "Alex D.",
    avatar: "/placeholder.svg?width=60&height=60",
    rating: 5,
    review:
      "Service de qualité, ambiance cool et prix corrects. L'équipe est passionnée et ça se ressent sur le résultat.",
    service: "Rasage Premium",
  },
]

export default function ReviewsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextReview = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length)
  }

  const prevReview = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length)
  }

  return (
    <section id="reviews" className="py-32 bg-zinc-900">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="text-center mb-20">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-12 h-px bg-orange-500"></div>
            <span className="text-orange-500 font-bold uppercase tracking-wider text-sm">Reviews</span>
            <div className="w-12 h-px bg-orange-500"></div>
          </div>
          <h2 className="text-6xl md:text-7xl font-display font-black text-white leading-tight mb-6">
            ILS NOUS
            <span className="block text-orange-500">KIFFENT</span>
          </h2>
          <p className="text-xl text-zinc-400 max-w-3xl mx-auto">
            Découvrez ce que nos clients pensent de leur expérience
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <Card className="bg-zinc-800 border-2 border-zinc-700 text-white">
              <CardContent className="p-12">
                <div className="text-center">
                  <div className="flex justify-center mb-6">
                    {Array(reviews[currentIndex].rating)
                      .fill(0)
                      .map((_, i) => (
                        <Star key={i} className="h-6 w-6 text-orange-500 fill-orange-500" />
                      ))}
                  </div>
                  <blockquote className="text-2xl md:text-3xl text-zinc-300 leading-relaxed mb-8 font-light">
                    "{reviews[currentIndex].review}"
                  </blockquote>
                  <div className="flex items-center justify-center gap-4 mb-4">
                    <Avatar className="w-16 h-16 border-2 border-orange-500">
                      <AvatarImage
                        src={reviews[currentIndex].avatar || "/placeholder.svg"}
                        alt={reviews[currentIndex].name}
                      />
                      <AvatarFallback className="bg-orange-500 text-white font-bold">
                        {reviews[currentIndex].name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="text-left">
                      <div className="font-display font-bold text-white text-xl">{reviews[currentIndex].name}</div>
                      <div className="text-orange-500 text-sm uppercase tracking-wider">
                        {reviews[currentIndex].service}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-center items-center gap-4 mt-8">
              <Button
                onClick={prevReview}
                variant="outline"
                size="icon"
                className="bg-zinc-800 border-zinc-700 hover:bg-zinc-700 text-zinc-300 hover:text-orange-500"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <div className="flex gap-2">
                {reviews.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentIndex ? "bg-orange-500 w-8" : "bg-zinc-600 hover:bg-zinc-500"
                    }`}
                  />
                ))}
              </div>
              <Button
                onClick={nextReview}
                variant="outline"
                size="icon"
                className="bg-zinc-800 border-zinc-700 hover:bg-zinc-700 text-zinc-300 hover:text-orange-500"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
