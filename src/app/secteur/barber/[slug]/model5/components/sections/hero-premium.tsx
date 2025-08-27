"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Button } from "@/app/secteur/barber/[slug]/model5/components/ui/button"
import Link from "next/link"
import { Crown, Star, Award, ArrowRight } from "lucide-react"

export default function HeroPremium() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-charcoal via-charcoal-light to-charcoal"
    >
      {/* Animated Background */}
      <div className="absolute inset-0">
        <Image
          src="/placeholder.svg?width=1920&height=1080"
          alt="Salon de luxe avec décoration raffinée"
          fill
          className="object-cover opacity-30"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/80 to-transparent"></div>
      </div>

      {/* Floating Gold Particles */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(212, 175, 55, 0.3) 0%, transparent 50%)`,
        }}
      ></div>

      {/* Decorative Elements */}
      <div className="absolute top-20 right-20 w-32 h-32 border border-gold/30 rotate-45 animate-pulse"></div>
      <div className="absolute bottom-40 right-40 w-16 h-16 bg-gold/20 rotate-12"></div>
      <div className="absolute top-1/2 right-10 w-1 h-32 bg-gradient-to-b from-gold to-transparent"></div>

      <div className="container mx-auto px-6 lg:px-8 relative z-10 my-[100px]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              {/* Premium Badge */}
              <div className="inline-flex items-center gap-3 bg-gradient-to-r from-gold/20 to-gold-dark/20 text-gold px-6 py-3 rounded-full border border-gold/30 backdrop-blur-sm">
                <Crown className="h-5 w-5" />
                <span className="font-serif font-medium text-sm uppercase tracking-wider">Luxury Barbershop</span>
              </div>

              {/* Main Title */}
              <div className="space-y-6">
                <h1 className="text-6xl md:text-7xl lg:text-7xl font-display font-bold text-slate leading-none tracking-tight">
                  GENTLEMAN'S
                  <span className="block bg-gradient-to-r from-gold via-gold-light to-gold bg-clip-text text-transparent">
                    CUT
                  </span>
                </h1>
                <div className="flex items-center gap-4">
                  <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gold to-transparent"></div>
                  <span className="text-gold font-serif italic text-xl">Since 1952</span>
                  <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gold to-transparent"></div>
                </div>
              </div>

              {/* Subtitle */}
              <div className="space-y-6">
                <p className="text-2xl md:text-3xl font-serif text-ivory/90 italic leading-relaxed">
                  "L'Art du Barbier de Luxe"
                </p>
                <p className="text-lg text-ivory/70 leading-relaxed max-w-2xl font-light">
                  Une expérience exclusive où tradition séculaire et raffinement moderne se rencontrent pour créer
                  l'excellence absolue. Réservé à une clientèle d'exception.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-6 pt-8">
                <Button
                  asChild
                  size="lg"
                  className="bg-gradient-to-r from-gold to-gold-dark hover:from-gold-dark hover:to-gold text-charcoal font-serif font-bold text-lg px-10 py-4 rounded-none border border-gold/50 shadow-xl hover:shadow-gold/30 transition-all duration-300 group"
                >
                  <Link href="#reservation" className="flex items-center gap-3">
                    Réservation Exclusive
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-2 border-gold text-gold hover:bg-gold/10 font-serif font-bold text-lg px-10 py-4 rounded-none transition-all duration-300 bg-transparent backdrop-blur-sm"
                >
                  <Link href="#heritage">Notre Héritage</Link>
                </Button>
              </div>

              {/* Luxury Stats */}
              <div className="grid grid-cols-3 gap-8 pt-16 border-t border-gold/20">
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Award className="h-6 w-6 text-gold mr-2" />
                    <span className="text-4xl font-display font-bold text-gold">70+</span>
                  </div>
                  <p className="text-ivory/60 font-serif text-sm uppercase tracking-wider">Années d'Excellence</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Star className="h-6 w-6 text-gold mr-2" />
                    <span className="text-4xl font-display font-bold text-gold">VIP</span>
                  </div>
                  <p className="text-ivory/60 font-serif text-sm uppercase tracking-wider">Clientèle Exclusive</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Crown className="h-6 w-6 text-gold mr-2" />
                    <span className="text-4xl font-display font-bold text-gold">100%</span>
                  </div>
                  <p className="text-ivory/60 font-serif text-sm uppercase tracking-wider">Satisfaction Garantie</p>
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative">
              <div className="relative aspect-[4/5] overflow-hidden rounded-lg border-4 border-gold/30 shadow-2xl">
                <Image
                  src="/placeholder.svg?width=600&height=750"
                  alt="Intérieur luxueux du salon avec finitions dorées"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/50 to-transparent"></div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-gold to-gold-dark rounded-full flex items-center justify-center border-4 border-ivory shadow-xl">
                <div className="text-center">
                  <div className="text-charcoal font-display font-bold text-sm">EST.</div>
                  <div className="text-charcoal font-display font-bold text-lg">1952</div>
                </div>
              </div>

              <div className="absolute -bottom-8 -left-8 bg-gradient-to-br from-charcoal to-charcoal-light p-8 rounded-lg border border-gold/30 backdrop-blur-sm shadow-xl">
                <div className="text-center">
                  <div className="text-gold font-display font-bold text-2xl mb-2">★★★★★</div>
                  <div className="text-ivory font-serif text-sm">Excellence Reconnue</div>
                </div>
              </div>

              {/* Decorative Frame */}
              <div className="absolute -inset-4 border border-gold/20 rounded-lg -z-10"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
