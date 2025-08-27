"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/app/secteur/barber/[slug]/model5/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/app/secteur/barber/[slug]/model5/components/ui/sheet"
import { Menu, Crown, Phone } from "lucide-react"

const navItems = [
  { name: "Accueil", href: "#home" },
  { name: "Héritage", href: "#heritage" },
  { name: "Témoignages", href: "#testimonials" },
  { name: "Galerie", href: "#showcase" },
]

export default function LuxuryHeader() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? "bg-charcoal/95 backdrop-blur-xl border-b border-gold/20" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="#home" className="flex items-center gap-4 group">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-gold to-gold-dark rounded-full flex items-center justify-center border-2 border-gold group-hover:shadow-gold/50 group-hover:shadow-lg transition-all duration-300">
                <Crown className="h-6 w-6 text-charcoal" />
              </div>
              <div className="absolute -inset-1 bg-gradient-to-br from-gold to-gold-dark rounded-full opacity-0 group-hover:opacity-20 blur transition-opacity duration-300"></div>
            </div>
            <div className="text-left">
              <h1 className="text-2xl font-display font-bold text-slate leading-none tracking-wide">GENTLEMAN'S</h1>
              <p className="text-lg font-display font-light text-gold leading-none tracking-widest">CUT</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-ivory/80 hover:text-gold font-serif font-medium transition-all duration-300 relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-gold to-gold-dark transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </nav>

          {/* CTA & Contact */}
          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-2 text-ivory/60">
              <Phone className="h-4 w-4" />
              <span className="font-serif text-sm">+33 1 42 86 75 30</span>
            </div>
            <Button
              asChild
              className="hidden lg:inline-flex bg-gradient-to-r from-gold to-gold-dark hover:from-gold-dark hover:to-gold text-charcoal font-serif font-bold px-8 py-3 rounded-none border border-gold/50 shadow-lg hover:shadow-gold/30 transition-all duration-300"
            >
              <Link href="#reservation">Réservation Privée</Link>
            </Button>

            {/* Mobile Menu */}
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button
                  variant="outline"
                  size="icon"
                  className="bg-transparent border-gold/50 hover:bg-gold/10 text-ivory"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-charcoal border-l-gold/20 text-ivory w-80">
                <div className="flex flex-col h-full pt-8">
                  <div className="flex items-center gap-3 mb-12">
                    <div className="w-10 h-10 bg-gradient-to-br from-gold to-gold-dark rounded-full flex items-center justify-center">
                      <Crown className="h-5 w-5 text-charcoal" />
                    </div>
                    <div>
                      <h2 className="text-xl font-display font-bold text-ivory">GENTLEMAN'S</h2>
                      <p className="text-gold font-display text-sm tracking-widest">CUT</p>
                    </div>
                  </div>
                  <div className="flex flex-col space-y-6">
                    {navItems.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="text-ivory/80 hover:text-gold font-serif font-medium text-lg transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                  <div className="mt-auto pb-8">
                    <Button
                      asChild
                      className="w-full bg-gradient-to-r from-gold to-gold-dark text-charcoal font-serif font-bold py-3 rounded-none"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Link href="#reservation">Réservation Privée</Link>
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
