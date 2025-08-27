"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Button } from "@/app/secteur/barber/[slug]/model6/components/ui/button"
import Link from "next/link"
import { ArrowRight, Zap, Target, Scissors } from "lucide-react"

export default function HeroBrutalist() {
  const [currentWord, setCurrentWord] = useState(0)
  const words = ["RADICAL", "MODERN", "PRECISE", "BOLD"]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [words.length])

  return (
    <section id="home" className="min-h-screen flex items-center bg-white overflow-hidden relative">
      {/* Geometric Background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-32 h-32 bg-red-500 border-4 border-black rotate-45 animate-pulse"></div>
        <div className="absolute bottom-40 left-20 w-24 h-24 bg-black border-4 border-black"></div>
        <div className="absolute top-1/2 right-10 w-2 h-40 bg-red-500"></div>
        <div className="absolute bottom-20 right-1/3 w-16 h-16 bg-black rotate-12"></div>
      </div>

      <div className="container mx-auto px-6 lg:px-8 relative z-10 my-[100px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-3 bg-black text-white px-6 py-3 border-4 border-black shadow-brutal">
              <Zap className="h-5 w-5 text-red-500" />
              <span className="font-mono font-bold text-sm uppercase tracking-wider">EST. 2024</span>
            </div>

            {/* Main Title */}
            <div className="space-y-6">
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-display font-black text-black leading-none tracking-tight">
                GENTLEMAN'S
                <span className="block text-red-500">CUT</span>
              </h1>
              <div className="flex items-center gap-4">
                <div className="w-16 h-1 bg-black"></div>
                <span className="text-2xl font-mono font-bold text-black">
                  {words[currentWord]}
                  <span className="animate-pulse">_</span>
                </span>
                <div className="flex-1 h-1 bg-red-500"></div>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-6">
              <p className="text-xl md:text-2xl font-display font-bold text-black uppercase tracking-wide">
                BARBERSHOP // REDEFINED
              </p>
              <p className="text-lg text-gray-700 leading-relaxed max-w-xl font-mono">
                Design radical. Coupes précises. Attitude moderne. Nous cassons les codes du barbershop traditionnel
                pour créer quelque chose de complètement nouveau.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 pt-8">
              <Button
                asChild
                size="lg"
                className="bg-red-500 hover:bg-black text-white font-display font-black text-lg px-10 py-4 border-4 border-black shadow-brutal hover:shadow-none transition-all duration-200 transform hover:translate-x-2 hover:translate-y-2 group"
              >
                <Link href="#booking" className="rounded-none flex items-center gap-3">
                  RÉSERVER MAINTENANT
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className=" rounded-none npmborder-4 border-black text-black hover:bg-black hover:text-white font-display font-black text-lg px-10 py-4 shadow-brutal hover:shadow-none transition-all duration-200 transform hover:translate-x-2 hover:translate-y-2 bg-white"
              >
                <Link href="#manifesto">NOTRE MANIFESTO</Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-16">
              <div className="text-center">
                <div className="w-16 h-16 bg-black border-4 border-black flex items-center justify-center mx-auto mb-4">
                  <Target className="h-8 w-8 text-red-500" />
                </div>
                <div className="text-3xl font-display font-black text-black mb-2">100%</div>
                <div className="text-sm font-mono font-bold text-gray-600 uppercase tracking-wider">PRÉCISION</div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-red-500 border-4 border-black flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-8 w-8 text-white" />
                </div>
                <div className="text-3xl font-display font-black text-black mb-2">24/7</div>
                <div className="text-sm font-mono font-bold text-gray-600 uppercase tracking-wider">BOOKING</div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-black border-4 border-black flex items-center justify-center mx-auto mb-4">
                  <Scissors className="h-8 w-8 text-red-500" />
                </div>
                <div className="text-3xl font-display font-black text-black mb-2">NEW</div>
                <div className="text-sm font-mono font-bold text-gray-600 uppercase tracking-wider">GENERATION</div>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="relative aspect-[4/5] overflow-hidden border-4 border-black shadow-brutal bg-gray-100">
              <Image
                src="/placeholder.svg?width=600&height=750"
                alt="Salon moderne avec design brutaliste"
                fill
                className="object-cover filter contrast-125 saturate-110"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-6 -right-6 bg-red-500 border-4 border-black p-4 shadow-brutal">
              <div className="text-center">
                <div className="text-white font-display font-black text-lg">NEW</div>
                <div className="text-white font-mono font-bold text-sm">GEN</div>
              </div>
            </div>

            <div className="absolute -bottom-8 -left-8 bg-black border-4 border-black p-6 shadow-brutal">
              <div className="text-center">
                <div className="text-red-500 font-display font-black text-2xl mb-2">★★★★★</div>
                <div className="text-white font-mono font-bold text-sm">RATED</div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -inset-4 border-4 border-red-500 -z-10 transform translate-x-2 translate-y-2"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
