"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/app/secteur/barber/[slug]/model6/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/app/secteur/barber/[slug]/model6/components/ui/sheet"
import { Menu, Scissors } from "lucide-react"

const navItems = [
  { name: "HOME", href: "#home" },
  { name: "MANIFESTO", href: "#manifesto" },
  { name: "SERVICES", href: "#services" },
  { name: "PROCESS", href: "#process" },
  { name: "TEAM", href: "#team" },
  { name: "GALLERY", href: "#gallery" },
]

export default function BrutalistHeader() {
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
        isScrolled ? "bg-white border-b-4 border-black shadow-brutal" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="#home" className="flex items-center gap-4 group">
            <div className="relative">
              <div className="w-12 h-12 bg-black border-4 border-black flex items-center justify-center group-hover:bg-red-500 transition-all duration-200 transform group-hover:rotate-12">
                <Scissors className="h-6 w-6 text-white rotate-45" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-12 h-12 bg-red-500 border-4 border-black -z-10"></div>
            </div>
            <div className="text-left">
              <h1 className="text-2xl font-display font-black text-black leading-none tracking-tight">GENTLEMAN'S</h1>
              <p className="text-lg font-mono font-bold text-red-500 leading-none tracking-wider">CUT</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-black hover:text-red-500 font-display font-bold text-sm uppercase tracking-wider transition-colors relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-1 bg-red-500 transition-all duration-200 group-hover:w-full"></span>
              </Link>
            ))}
          </nav>

          {/* CTA & Mobile Menu */}
          <div className="flex items-center gap-4">
            <Button
              asChild
              className=" rounded-none hidden lg:inline-flex bg-red-500 hover:bg-black text-white font-display font-black px-8 py-3 border-4 border-black shadow-brutal hover:shadow-none transition-all duration-200 transform hover:translate-x-1 hover:translate-y-1"
            >
              <Link href="#booking">BOOK NOW</Link>
            </Button>

            {/* Mobile Menu */}
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button
                  variant="outline"
                  size="icon"
                  className="bg-white border-4 border-black hover:bg-red-500 hover:text-white shadow-brutal"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-white border-l-4 border-black text-black w-80">
                <div className="flex flex-col h-full pt-8">
                  <div className="flex items-center gap-3 mb-12">
                    <div className="w-10 h-10 bg-black border-4 border-black flex items-center justify-center">
                      <Scissors className="h-5 w-5 text-white rotate-45" />
                    </div>
                    <div>
                      <h2 className="text-xl font-display font-black text-black">GENTLEMAN'S</h2>
                      <p className="text-red-500 font-mono font-bold text-sm">CUT</p>
                    </div>
                  </div>
                  <div className="flex flex-col space-y-6">
                    {navItems.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="text-black hover:text-red-500 font-display font-bold text-lg uppercase tracking-wider transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                  <div className="mt-auto pb-8">
                    <Button
                      asChild
                      className="w-full bg-red-500 hover:bg-black text-white font-display font-black py-4 border-4 border-black shadow-brutal"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Link href="#booking">BOOK NOW</Link>
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
