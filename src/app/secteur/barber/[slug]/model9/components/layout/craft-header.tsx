"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/app/secteur/barber/[slug]/model9/components/ui/sheet"
import { Menu, Scissors, CheckCircle, XCircle } from "lucide-react"

const navItems = [
  { name: "Accueil", href: "#home" },
  { name: "Savoir-Faire", href: "#services" },
  { name: "Témoignages", href: "#testimonials" },  
]

// Détermine si le salon est ouvert
function getShopStatus() {
  const now = new Date()
  const day = now.getDay() // 0 = Dimanche, 1 = Lundi, etc.
  const hour = now.getHours()
  const minute = now.getMinutes()
  const currentTime = hour * 60 + minute

  // Fermé dimanche (0) et lundi (1)
  if (day === 0 || day === 1) {
    return { isOpen: false, nextOpen: "Mardi 9h00" as const }
  }

  // Mardi à Vendredi: 9h-19h
  if (day >= 2 && day <= 5) {
    if (currentTime >= 540 && currentTime < 1140) {
      // 9h00 à 19h00
      return { isOpen: true as const, closesAt: "19h00" as const }
    }
    return { isOpen: false as const, nextOpen: currentTime < 540 ? "Aujourd'hui 9h00" : "Demain 9h00" }
  }

  // Samedi: 8h-18h
  if (day === 6) {
    if (currentTime >= 480 && currentTime < 1080) {
      // 8h00 à 18h00
      return { isOpen: true as const, closesAt: "18h00" as const }
    }
    return { isOpen: false as const, nextOpen: currentTime < 480 ? "Aujourd'hui 8h00" : "Mardi 9h00" }
  }

  return { isOpen: false as const, nextOpen: "Mardi 9h00" }
}

export default function CraftHeader() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [shopStatus, setShopStatus] = useState(getShopStatus())

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    // Mettre à jour le statut toutes les minutes
    const interval = setInterval(() => setShopStatus(getShopStatus()), 60_000)
    return () => clearInterval(interval)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? "bg-amber-50/95 backdrop-blur-sm shadow-lg border-b-2 border-amber-200" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="#home" className="flex items-center gap-4 group">
            <div className="relative">
              <div className="w-14 h-14 bg-gradient-to-br from-amber-600 to-amber-800 rounded-lg flex items-center justify-center border-2 border-amber-300 group-hover:from-amber-700 group-hover:to-amber-900 transition-all duration-300 shadow-lg">
                <Scissors className="h-7 w-7 text-amber-100 rotate-45" aria-hidden="true" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full border border-amber-200" />
            </div>
            <div className="text-left">
              <h1 className="text-2xl font-bold text-amber-900 leading-none tracking-tight">Gentleman's</h1>
              <p className="text-lg font-semibold text-amber-700 leading-none">CRAFT</p>
            </div>
          </Link>

          {/* Badge statut (desktop) */}
          <div className="hidden md:flex items-center gap-4">
            <div
              className={`flex items-center gap-2 px-4 py-2 rounded-full border-2 ${
                shopStatus.isOpen
                  ? "bg-green-100 border-green-300 text-green-800"
                  : "bg-red-100 border-red-300 text-red-800"
              }`}
            >
              {shopStatus.isOpen ? (
                <>
                  <CheckCircle className="h-4 w-4" aria-hidden="true" />
                  <span className="font-semibold text-sm">OUVERT</span>
                  <span className="text-xs">jusqu&apos;à {shopStatus.closesAt}</span>
                </>
              ) : (
                <>
                  <XCircle className="h-4 w-4" aria-hidden="true" />
                  <span className="font-semibold text-sm">FERMÉ</span>
                  <span className="text-xs">Ouvre {shopStatus.nextOpen}</span>
                </>
              )}
            </div>
          </div>

          {/* Navigation desktop */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-amber-800 hover:text-amber-600 font-semibold transition-colors"
              >
                {item.name}
              </Link>
            ))}
            <Button asChild className="bg-amber-600 hover:bg-amber-700 text-white font-semibold">
              <Link href="#booking">Prendre Rendez-vous</Link>
            </Button>
          </nav>

          {/* Bouton menu mobile */}
          <div className="lg:hidden">
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" className="border-amber-300">
                  <Menu className="h-5 w-5" aria-hidden="true" />
                  <span className="sr-only">Ouvrir le menu</span>
                </Button>
              </SheetTrigger>

              <SheetContent side="right" className="bg-amber-50 border-l-amber-200 text-amber-900 w-80">
                <div className="flex flex-col h-full pt-8">
                  {/* Statut (mobile) */}
                  <div
                    className={`flex items-center gap-2 px-4 py-3 rounded-lg border-2 mb-8 ${
                      shopStatus.isOpen
                        ? "bg-green-100 border-green-300 text-green-800"
                        : "bg-red-100 border-red-300 text-red-800"
                    }`}
                  >
                    {shopStatus.isOpen ? (
                      <>
                        <CheckCircle className="h-5 w-5" aria-hidden="true" />
                        <div>
                          <div className="font-bold">OUVERT</div>
                          <div className="text-xs">jusqu&apos;à {shopStatus.closesAt}</div>
                        </div>
                      </>
                    ) : (
                      <>
                        <XCircle className="h-5 w-5" aria-hidden="true" />
                        <div>
                          <div className="font-bold">FERMÉ</div>
                          <div className="text-xs">Ouvre {shopStatus.nextOpen}</div>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Liens */}
                  <div className="flex flex-col space-y-6">
                    {navItems.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="text-amber-800 hover:text-amber-600 font-semibold text-lg transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>

                  {/* CTA */}
                  <div className="mt-auto pb-8">
                    <Button
                      asChild
                      className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 rounded-lg"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Link href="#booking">Prendre Rendez-vous</Link>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
