"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/app/secteur/barber/[slug]/model7/components/ui/sheet"
import { Menu, Crown, Sparkles } from "lucide-react"

const navItems = [
  { name: "Accueil", href: "#home" },
  { name: "Prestige", href: "#prestige" },
  { name: "Services", href: "#services" },
  { name: "Maîtres", href: "#masters" },
  { name: "Témoignages", href: "#testimonials" },
  { name: "Contact", href: "#contact" },
]

export default function DecoHeader() {
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        isScrolled ? "bg-black/95 backdrop-blur-md shadow-2xl border-b border-gold-400/30" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo Art Déco */}
          <Link href="#home" className="flex items-center gap-4 group">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-gold-400 to-gold-600 rounded-sm transform rotate-45 flex items-center justify-center group-hover:rotate-[50deg] transition-transform duration-500">
                <Crown className="h-6 w-6 text-black rotate-[-45deg]" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-burgundy-500 rounded-full"></div>
            </div>
            <div className="text-left">
              <h1 className="text-2xl font-serif text-gold-400 leading-none tracking-wider">GENTLEMAN'S</h1>
              <p className="text-sm font-mono text-cream-300 leading-none tracking-[0.3em] uppercase">CUT</p>
            </div>
          </Link>

          {/* Navigation Desktop */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <Link
                key={item.name}
                href={item.href}
                className="relative text-cream-200 hover:text-gold-400 font-serif transition-all duration-300 group"
              >
                {item.name}
                <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-gradient-to-r from-gold-400 to-burgundy-500 transition-all duration-500 group-hover:w-full"></span>
                <div className="absolute -top-1 -right-1 w-1 h-1 bg-gold-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
            ))}
          </nav>

          {/* CTA & Mobile Menu */}
          <div className="flex items-center gap-4">
            <Button
              asChild
              className="hidden lg:inline-flex bg-gradient-to-r from-gold-400 to-gold-600 hover:from-gold-500 hover:to-gold-700 text-black font-serif font-semibold px-8 py-3 rounded-sm relative overflow-hidden group"
            >
              <Link href="#booking" className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 group-hover:rotate-180 transition-transform duration-500" />
                Réserver
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              </Link>
            </Button>

            {/* Mobile Menu */}
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon" className="text-cream-200 hover:text-gold-400">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-black border-l-gold-400/30 text-cream-200 w-80">
                <div className="flex flex-col h-full pt-8">
                  <div className="flex items-center gap-4 mb-12">
                    <div className="w-10 h-10 bg-gradient-to-br from-gold-400 to-gold-600 rounded-sm transform rotate-45 flex items-center justify-center">
                      <Crown className="h-5 w-5 text-black rotate-[-45deg]" />
                    </div>
                    <div>
                      <h2 className="text-xl font-serif text-gold-400">GENTLEMAN'S</h2>
                      <p className="text-cream-300 text-sm tracking-widest">CUT</p>
                    </div>
                  </div>
                  <div className="flex flex-col space-y-8">
                    {navItems.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="text-cream-200 hover:text-gold-400 font-serif text-lg transition-colors relative group"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.name}
                        <div className="absolute -left-4 top-1/2 w-2 h-2 bg-gold-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      </Link>
                    ))}
                  </div>
                  <div className="mt-auto pb-8">
                    <Button
                      asChild
                      className="w-full bg-gradient-to-r from-gold-400 to-gold-600 hover:from-gold-500 hover:to-gold-700 text-black font-serif font-semibold py-4 rounded-sm"
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
