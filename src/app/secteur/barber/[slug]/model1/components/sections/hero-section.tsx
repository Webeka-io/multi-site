"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Button } from "@/app/components/ui/button"
import { ChevronDown } from "lucide-react"
import type { Business } from "@/lib/parseSlug"


type Props = { business?: Business }

export default function HeroSection({ business }: Props) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => setMousePosition({ x: e.clientX, y: e.clientY })
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  // Déstructuration sécurisée
  const entreprise = business?.entreprise
  const ville = business?.ville
  const secteur = business?.secteur
  const entrepriseUpper = entreprise ? entreprise.toUpperCase() : undefined
  const secteurUpper = secteur ? secteur.toUpperCase() : undefined

  const [namePrefix, nameLast] = (() => {
  if (!entrepriseUpper) return ["", ""];
  const parts = entrepriseUpper.trim().split(/\s+/); // sépare sur espaces
  const last = parts.pop() ?? "";
  return [parts.join(" "), last];
})();

  
  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/barber-3 (1).webp"
          alt="Salon de barbier moderne avec fauteuils en cuir"
          fill
          className="hidden md:block object-cover"
          priority
        />
         <Image
          src="/barbertel-3 (1).webp"
          alt="Salon de barbier moderne avec fauteuils en cuir"
          fill
          className="block md:hidden object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-red-900/40"></div>
      </div>

      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(239, 68, 68, 0.3) 0%, transparent 50%)`,
        }}
      />

      <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
        <div className="space-y-8">
          <div className="overflow-hidden">
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-display font-black text-white leading-none tracking-tighter animate-slide-up">
              {namePrefix && <span>{namePrefix}&nbsp;</span>} <br />
              {nameLast && <span className="text-6xl md:text-8xl lg:text-9xl font-display font-black bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">{nameLast}</span>}
            </h1>

          </div> 
         

          {/* Affichage entreprise seule */}
          {entreprise && (
            <div className="overflow-hidden">
              <p className="text-xl md:text-2xl text-gray-200 font-serif italic max-w-2xl mx-auto animate-fade-in-delay">
                Bienvenue chez <span className="font-bold">{entreprise}</span>
              </p>
            </div>
          )}

          {/* Affichage ville seule */}
          {ville && (
            <div className="overflow-hidden">
              <p className="text-lg md:text-xl text-gray-300 font-serif italic max-w-2xl mx-auto animate-fade-in-delay">
                "Votre Barbier de Quartier à {ville}"
              </p>
            </div>
          )}

          {/* Affichage secteur seul */}
          {secteur && (
            <div className="overflow-hidden">
              <p className="text-lg md:text-xl text-gray-100 max-w-3xl mx-auto animate-fade-in-delay-2">
                L'art traditionnel du barbier rencontre l'élégance moderne. Coupes précises, barbes sculptées, style intemporel.
              </p>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8 animate-fade-in-delay-3">
            <Button
              onClick={() => document.getElementById("booking-modal")?.click()}
              size="lg"
              className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold text-lg px-12 py-6 rounded-none border-2 border-red-500 hover:border-red-400 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-red-500/25"
            >
             PRENDRE RENDEZ-VOUS
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-2 border-white text-white hover:bg-white hover:text-black font-bold text-lg px-12 py-6 rounded-none transition-all duration-300 bg-transparent"
            >
              <a href="#services">DÉCOUVRIR NOS SERVICES</a>
            </Button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDown className="h-8 w-8 text-white/60" />
      </div>
    </section>
  )
}
