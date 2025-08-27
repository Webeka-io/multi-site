"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/app/secteur/barber/[slug]/model4/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/app/secteur/barber/[slug]/model4/components/ui/sheet"
import { Menu, Scissors } from "lucide-react"
import type { Business } from "@/lib/parseSlug"
type Props = { business?: Business }

const navItems = [
  { name: "Accueil", href: "#home" },
  { name: "À propos", href: "#about" },
  { name: "Services", href: "#services" },
  { name: "Avis", href: "#testimonials" },
  { name: "Galerie", href: "#gallery" },
]

export default function MinimalHeader({ business }: Props) {
  const entreprise = business?.entreprise
  const ville = business?.ville
  const secteur = business?.secteur
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
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
            <div className="w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center group-hover:bg-gray-800 transition-colors">
              <Scissors className="h-4 w-4 text-white rotate-45" />
            </div>
            <span className="text-xl font-medium text-gray-900">{entreprise}</span>
          </Link>

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
              className="hidden lg:inline-flex bg-gray-900 hover:bg-gray-800 text-white font-medium px-6 py-2 rounded-full"
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
                  <div className="flex items-center gap-3 mb-12">
                    <div className="w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center">
                      <Scissors className="h-4 w-4 text-white rotate-45" />
                    </div>
                    <span className="text-xl font-medium">{entreprise}</span>
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
                      className="w-full bg-gray-900 hover:bg-gray-800 text-white font-medium py-3 rounded-full"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Link href="#booking">Réserver</Link>
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
