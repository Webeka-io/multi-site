"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Scissors, Clock, MapPin, Phone } from "lucide-react"

const navItems = [
  { name: "Accueil", href: "#home" },
  { name: "Services", href: "#services" },
  { name: "À propos", href: "#about" },
  { name: "Équipe", href: "#team" },
  { name: "Galerie", href: "#gallery" },
  { name: "Contact", href: "#contact" },
]

export default function Header1() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const checkOpenStatus = () => {
      const now = new Date()
      const currentHour = now.getHours()
      const currentDay = now.getDay()

      // Ouvert du mardi au samedi de 9h à 19h
      const isWeekday = currentDay >= 2 && currentDay <= 6
      const isOpenHour = currentHour >= 9 && currentHour < 19

      setIsOpen(isWeekday && isOpenHour)
    }

    checkOpenStatus()
    const interval = setInterval(checkOpenStatus, 60000) // Vérifier chaque minute

    return () => clearInterval(interval)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="#home" className="flex items-center gap-3 group">
            <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center group-hover:bg-gray-800 transition-colors">
              <Scissors className="h-4 w-4 text-white" />
            </div>
            <span className="text-xl font-semibold text-gray-900">Gentleman &apos; s Cut</span>
          </Link>

          {/* Status & Info */}
          

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-600 hover:text-gray-900 font-medium transition-colors relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gray-900 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </nav>

          {/* CTA & Mobile Menu */}
          <div className="flex items-center gap-4">
            <Button
              asChild
              className="hidden lg:inline-flex bg-gray-900 hover:bg-gray-800 text-white font-medium px-6 py-2 rounded-lg"
            >
              <Link href="#booking">Réserver</Link>
            </Button>

            {/* Mobile Menu */}
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon" className="text-gray-600 hover:text-gray-900">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-white border-l-gray-100 text-gray-900 w-80">
                <div className="flex flex-col h-full pt-8">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center">
                      <Scissors className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-xl font-semibold">Gentleman &apos; s Cut</span>
                  </div>

                  {/* Status Mobile */}
                  <div className="mb-8 p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <div className={`w-2 h-2 rounded-full ${isOpen ? "bg-green-500" : "bg-red-500"}`}></div>
                      <span className={`text-sm font-medium ${isOpen ? "text-green-600" : "text-red-600"}`}>
                        {isOpen ? "Ouvert maintenant" : "Fermé"}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600 space-y-1">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>Mar - Sam: 9h - 19h</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        <span>01 42 86 75 30</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span>15 rue de la Paix, Paris</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col space-y-6">
                    {navItems.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="text-gray-600 hover:text-gray-900 font-medium text-lg transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                  <div className="mt-auto pb-8">
                    <Button
                      asChild
                      className="w-full bg-gray-900 hover:bg-gray-800 text-white font-medium py-3 rounded-lg"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Link href="#booking">Réserver un rendez-vous</Link>
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
