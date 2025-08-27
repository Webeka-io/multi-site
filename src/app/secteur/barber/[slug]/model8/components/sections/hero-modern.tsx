"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/app/secteur/barber/[slug]/model8/components/ui/badge"
import Link from "next/link"
import { ArrowRight, Star, Users, Clock, Award } from "lucide-react"

export default function HeroModern() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const checkOpenStatus = () => {
      const now = new Date()
      const currentHour = now.getHours()
      const currentDay = now.getDay()

      const isWeekday = currentDay >= 2 && currentDay <= 6
      const isOpenHour = currentHour >= 9 && currentHour < 19

      setIsOpen(isWeekday && isOpenHour)
    }

    checkOpenStatus()
    const interval = setInterval(checkOpenStatus, 60000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23000000' fillOpacity='1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>

      <div className="container mx-auto px-6 lg:px-8 relative z-10 my-[100px]">
        <div className="max-w-4xl mx-auto text-center">
          {/* Status Badge */}
          <div className="mb-8">
            <Badge
              variant={isOpen ? "default" : "secondary"}
              className={`px-4 py-2 text-sm font-medium ${
                isOpen ? "bg-green-100 text-green-800 border-green-200" : "bg-red-100 text-red-800 border-red-200"
              }`}
            >
              <div className={`w-2 h-2 rounded-full mr-2 ${isOpen ? "bg-green-500" : "bg-red-500"}`}></div>
              {isOpen ? "Ouvert maintenant" : "Fermé - Ouvre demain à 9h"}
            </Badge>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            L'art du
            <span className="block text-gray-600">barbier moderne</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Découvrez l'excellence d'un service sur-mesure dans un cadre contemporain et raffiné.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 mb-12">
            <div className="flex items-center gap-2 text-gray-700">
              <Star className="h-5 w-5 text-yellow-500" />
              <span className="font-semibold">4.9/5</span>
              <span className="text-gray-500">• 250+ avis</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <Users className="h-5 w-5 text-blue-500" />
              <span className="font-semibold">1000+</span>
              <span className="text-gray-500">clients satisfaits</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <Award className="h-5 w-5 text-purple-500" />
              <span className="font-semibold">15 ans</span>
              <span className="text-gray-500">d'expérience</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              asChild
              size="lg"
              className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-4 text-lg font-medium rounded-lg group"
            >
              <Link href="#booking" className="flex items-center gap-2">
                Réserver maintenant
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-4 text-lg font-medium rounded-lg bg-transparent"
            >
              <Link href="#services">Nos services</Link>
            </Button>
          </div>

          {/* Opening Hours */}
          <div className="mt-12 p-6 bg-white rounded-xl shadow-sm border border-gray-100 max-w-md mx-auto">
            <div className="flex items-center gap-2 mb-3">
              <Clock className="h-5 w-5 text-gray-600" />
              <span className="font-semibold text-gray-900">Horaires d'ouverture</span>
            </div>
            <div className="text-sm text-gray-600 space-y-1">
              <div className="flex justify-between">
                <span>Mardi - Vendredi</span>
                <span className="font-medium">9h - 19h</span>
              </div>
              <div className="flex justify-between">
                <span>Samedi</span>
                <span className="font-medium">9h - 18h</span>
              </div>
              <div className="flex justify-between">
                <span>Dimanche - Lundi</span>
                <span className="font-medium text-red-600">Fermé</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-gray-200 rounded-full opacity-20"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-gray-300 rounded-full opacity-10"></div>
      <div className="absolute top-1/2 left-0 w-16 h-16 bg-gray-400 rounded-full opacity-15 transform -translate-x-1/2"></div>
    </section>
  )
}
