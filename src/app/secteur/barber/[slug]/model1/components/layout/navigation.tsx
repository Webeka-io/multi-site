"use client"

import { useState, useEffect, MouseEvent } from "react"
import Link from "next/link"
import { Button } from "@/app/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/app/components/ui/sheet"
import { Menu, X, Scissors } from "lucide-react"
import type { Business } from "@/lib/parseSlug"

declare global {
  interface Window {
    Calendly?: any
  }
}

const navItems = [
  { name: "Accueil", href: "#home" },
  { name: "À Propos", href: "#about" },
  { name: "Services", href: "#services" },
  { name: "Expérience", href: "#experience" },
  { name: "Avis", href: "#testimonials" },
  { name: "Galerie", href: "#gallery" },
  { name: "Contact", href: "#contact" },
]

type Props = { business?: Business }

export default function Navigation({ business }: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [calendlyReady, setCalendlyReady] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Charge le CSS + JS de Calendly une seule fois côté client
  useEffect(() => {
    // CSS
    if (!document.getElementById("calendly-widget-css")) {
      const link = document.createElement("link")
      link.id = "calendly-widget-css"
      link.rel = "stylesheet"
      link.href = "https://assets.calendly.com/assets/external/widget.css"
      document.head.appendChild(link)
    }
    // JS
    if (!document.getElementById("calendly-widget-js")) {
      const s = document.createElement("script")
      s.id = "calendly-widget-js"
      s.src = "https://assets.calendly.com/assets/external/widget.js"
      s.async = true
      s.onload = () => setCalendlyReady(true)
      document.body.appendChild(s)
    } else {
      setCalendlyReady(true)
    }
  }, [])

  const openCalendly = (e?: MouseEvent) => {
    e?.preventDefault()
    const url = "https://calendly.com/webeka-contact/30min"

    if (window.Calendly) {
      window.Calendly.initPopupWidget({ url })
      return
    }
    // Fallback si le script n'est pas encore prêt
    window.open(url, "_blank", "noopener,noreferrer")
  }

  // (Optionnel) Badge flottant auto :
  // useEffect(() => {
  //   if (calendlyReady && window.Calendly) {
  //     window.Calendly.initBadgeWidget({
  //       url: "https://calendly.com/webeka-contact/30min",
  //       text: "Prendre RDV",
  //       color: "#0069ff",
  //       textColor: "#ffffff",
  //       branding: true
  //     })
  //   }
  // }, [calendlyReady])

  const entreprise = business?.entreprise
  const ville = business?.ville
  const secteur = business?.secteur
  const brand = entreprise ?? "GENTLEMAN'S CUT"
  const entrepriseUpper = entreprise ? entreprise.toUpperCase() : undefined

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-black/90 backdrop-blur-xl border-b border-red-900/30" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link
            href="#home"
            className="flex items-center gap-3 text-2xl font-bold font-display tracking-wider text-white hover:text-red-500 transition-colors"
            aria-label={entreprise ? `Accueil — ${entreprise}` : "Accueil"}
          >
            <div className="relative">
              <Scissors className="h-8 w-8 text-red-500 rotate-45" />
              <div className="absolute -inset-1 bg-red-500/20 blur-sm rounded-full"></div>
            </div>
            {brand}
          </Link>

          {/* Liens desktop */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-gray-300 hover:text-red-500 transition-all duration-300 relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-500 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            {/* Bouton desktop -> ouvre le popup Calendly */}
            <Button
              onClick={openCalendly}
              className="hidden lg:inline-flex bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold px-8 py-3 rounded-none border-2 border-red-500 hover:border-red-400 transition-all duration-300 transform hover:scale-105"
              aria-label="Réserver un créneau"
            >
              RÉSERVER
            </Button>

            {/* Menu mobile */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon" className="text-white hover:text-red-500" aria-label="Ouvrir le menu">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full bg-black border-l-red-900/30 text-white p-0">
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between p-6 border-b border-red-900/30">
                    <Link
                      href="#home"
                      className="flex items-center gap-2 text-xl font-bold font-display text-white"
                      onClick={() => setIsOpen(false)}
                    >
                      <Scissors className="h-6 w-6 text-red-500 rotate-45" />
                      {brand}
                    </Link>
                    
                  </div>

                  {(ville || secteur) && (
                    <div className="px-6 pt-4 text-sm text-gray-400">
                      {ville ? <>Basé à <span className="text-gray-200">{ville}</span></> : null}
                      {ville && secteur ? " — " : null}
                      {secteur ? <><span className="text-gray-200">{secteur}</span></> : null}
                    </div>
                  )}

                  <div className="flex-1 flex flex-col justify-center space-y-8 px-6">
                    {navItems.map((item, index) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="text-2xl font-medium text-gray-300 hover:text-red-500 transition-all duration-300 transform hover:translate-x-2"
                        onClick={() => setIsOpen(false)}
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        {item.name}
                      </Link>
                    ))}

                    {/* Bouton mobile -> popup Calendly */}
                    <Button
                      onClick={(e) => {
                        setIsOpen(false)
                        openCalendly(e)
                      }}
                      className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-4 rounded-none border-2 border-red-500 text-lg mt-8"
                      aria-label="Réserver un créneau"
                    >
                      {entrepriseUpper ? `RÉSERVER CHEZ ${entrepriseUpper}` : "RÉSERVER MAINTENANT"}
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}
