"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Button } from "@/app/secteur/barber/[slug]/model3/components/ui/button"
import Link from "next/link"
import { Play, ArrowRight } from "lucide-react"

import type { Business } from "@/lib/parseSlug"
type Props = { business?: Business }

export default function HeroUrban({ business }: Props) {
  const entreprise = business?.entreprise
  const ville = business?.ville
  const secteur = business?.secteur
  const entrepriseUpper = entreprise ? entreprise.toUpperCase() : undefined
  const villeUpper = ville ? ville.toUpperCase() : undefined

  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const [entPrefix, entLast] = (() => {
  const s = (entreprise ?? "").trim()
  if (!s) return ["", ""]
  const parts = s.split(/\s+/)
  const last = parts.pop() ?? ""
  return [parts.join(" "), last]
})()

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/barber-12 (1).webp"
          alt="Barbershop urbain moderne avec néons"
          fill
          className="object-cover ml-20"
          style={{ transform: `translateY(${scrollY * 0.5}px)` }}
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-900 to-zinc-900/80 "></div>
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent"></div>
      </div>

      {/* Geometric Elements */}
      <div className="absolute top-20 right-20 w-32 h-32 border-2 border-orange-500/30 rotate-45 animate-pulse"></div>
      <div className="absolute bottom-40 right-40 w-16 h-16 bg-orange-500/20 rotate-12"></div>
      <div className="absolute top-1/2 right-10 w-2 h-32 bg-gradient-to-b from-orange-500 to-transparent"></div>

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl">
          <div className="space-y-8">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-px bg-orange-500"></div>
              <span className="text-orange-500 font-bold uppercase tracking-wider text-sm ">Urban Barbershop</span>
            </div>

            

            <div className="space-y-4">
              <h1 className="text-7xl md:text-9xl lg:text-[10rem] font-display font-black text-white leading-none tracking-tight animate-slide-up-delay">
                {entPrefix && <span>{entPrefix}&nbsp;</span>} <br />
                {entLast && <span className="text-orange-500">{entLast}</span>}
              
              </h1>

            </div>
            

            <div className="max-w-2xl space-y-6">
              <p className="text-2xl md:text-3xl text-zinc-300 font-light">VOTRE BARBIER DE QUARTIER À {villeUpper}</p>
              <p className="text-lg text-zinc-400 leading-relaxed">
                Style urbain authentique • Techniques de pointe • Ambiance unique
                <br />
                Là où la tradition rencontre l'innovation moderne.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 pt-8">
              <Button
                asChild
                size="lg"
                className="bg-orange-500 hover:bg-orange-600 text-white font-bold text-lg px-8 py-4 rounded-none border-2 border-orange-500 hover:border-orange-400 transition-all duration-300 transform hover:scale-105 group"
              >
                <Link href="#booking" className="flex items-center gap-2">
                  RÉSERVER MAINTENANT
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-2 border-zinc-600 text-zinc-300 hover:bg-zinc-800 hover:text-white font-bold text-lg px-8 py-4 rounded-none transition-all duration-300 bg-transparent group"
              >
                <Link href="#work" className="flex items-center gap-2">
                  <Play className="h-5 w-5 group-hover:scale-110 transition-transform" />
                  VOIR NOS RÉALISATIONS
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-8 pt-16 border-t border-zinc-700">
              <div className="text-center">
                <div className="text-4xl font-display font-black text-orange-500 mb-2">10+</div>
                <div className="text-zinc-400 uppercase tracking-wider text-sm">Années d'expérience</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-display font-black text-orange-500 mb-2">3K+</div>
                <div className="text-zinc-400 uppercase tracking-wider text-sm">Clients satisfaits</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-display font-black text-orange-500 mb-2">24/7</div>
                <div className="text-zinc-400 uppercase tracking-wider text-sm">Réservation en ligne</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
