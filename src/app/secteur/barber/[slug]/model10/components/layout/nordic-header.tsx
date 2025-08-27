"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/app/secteur/barber/[slug]/model10/components/ui/sheet"
import { Menu, Scissors } from "lucide-react"

const navItems = [
  { name: "Accueil", href: "#home" },
  { name: "Philosophie", href: "#philosophy" },
  { name: "Services", href: "#services" },
  { name: "Équipe", href: "#team" },
  { name: "Témoignages", href: "#testimonials" },
  { name: "Contact", href: "#contact" },
]

export default function NordicHeader() {
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? "bg-white/95 backdrop-blur-sm shadow-sm border-b border-sage-100" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 lg:px-8 mt-2.5">
        <div className="flex items-center justify-between h-18">
          {/* Logo */}
          <Link href="#home" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-sage-500 rounded-full flex items-center justify-center group-hover:bg-sage-600 transition-colors">
              <Scissors className="h-5 w-5 text-white rotate-45" />
            </div>
            <div className="text-left">
              <h1 className="text-xl font-light text-stone-800 leading-none">Gentleman's</h1>
              <p className="text-sm font-medium text-sage-600 leading-none tracking-wide">CUT</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-stone-600 hover:text-sage-600 font-light transition-colors relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-sage-500 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </nav>

          {/* CTA & Mobile Menu */}
          <div className="flex items-center gap-4">
            <Button
              asChild
              className="hidden lg:inline-flex bg-sage-500 hover:bg-sage-600 text-white font-light px-6 py-2 rounded-full"
            >
              <Link href="#booking">Réserver</Link>
            </Button>

            {/* Mobile Menu */}
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon" className="text-stone-600 hover:text-sage-600">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-white border-l-sage-100 text-stone-800 w-80">
                <div className="flex flex-col h-full pt-8">
                  <div className="flex items-center gap-3 mb-12">
                    <div className="w-8 h-8 bg-sage-500 rounded-full flex items-center justify-center">
                      <Scissors className="h-4 w-4 text-white rotate-45" />
                    </div>
                    <div>
                      <h2 className="text-lg font-light text-stone-800">Gentleman's</h2>
                      <p className="text-sage-600 text-sm tracking-wide">CUT</p>
                    </div>
                  </div>
                  <div className="flex flex-col space-y-6">
                    {navItems.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="text-stone-600 hover:text-sage-600 font-light text-lg transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                  <div className="mt-auto pb-8">
                    <Button
                      asChild
                      className="w-full bg-sage-500 hover:bg-sage-600 text-white font-light py-3 rounded-full"
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
