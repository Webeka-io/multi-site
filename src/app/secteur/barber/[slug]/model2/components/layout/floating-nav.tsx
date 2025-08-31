"use client"
import type { Business } from "@/lib/parseSlug"
type Props = { business?: Business }


import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/app/secteur/barber/[slug]/model2/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/app/secteur/barber/[slug]/model2/components/ui/sheet"
import { Menu, Scissors } from "lucide-react"

const navItems = [
  { name: "Accueil", href: "#home" },
  { name: "Philosophie", href: "#philosophy" },
  { name: "Services", href: "#services" },
  { name: "Témoignages", href: "#testimonials" },
  { name: "Galerie", href: "#gallery" },
]

export default function FloatingNav({ business }: Props) {
  const entreprise = business?.entreprise
  const ville = business?.ville
  const secteur = business?.secteur

  const [isVisible, setIsVisible] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 100)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      {/* Desktop Floating Navigation */}
      <nav
        className={`fixed top-4 md:left-1/2 left-[45%] transform -translate-x-1/2 z-50 transition-all duration-700 ease-out ${
          isVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"
        }`}
      >
        <div className=" mt-2 w-70 md:w-full bg-white/90 backdrop-blur-xl border border-stone-200 rounded-full md:px-4 md:py-6 px-2 py-2 shadow-xl shadow-stone-900/10">
          <div className="flex items-center gap-8">
            <Link
              href="#home"
              className="flex items-center gap-2 text-lg font-serif font-semibold text-stone-900 hover:text-amber-600 transition-colors"
            >
              <Scissors className="h-10 w-10 text-amber-600" />
              <span className="text-md ml-4 text-center">{entreprise}</span>
            </Link>
            <div className="hidden lg:flex items-center gap-6">
              {navItems.slice(1).map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-sm text-stone-600 hover:text-amber-600 transition-colors font-medium"
                >
                  {item.name}
                </Link>
              ))}
            </div>
            <Button
              asChild
              className="hidden lg:inline-flex bg-amber-600 hover:bg-amber-700 text-white font-medium px-6 py-2 rounded-full"
            >
              <Link href="#reservation">Réserver</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="lg:hidden fixed top-6 right-6 z-50">
        <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="bg-white/90 backdrop-blur-xl border-stone-200 hover:bg-white rounded-full shadow-lg"
            >
              <Menu className="h-5 w-5 text-stone-900 " />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="bg-white border-l-stone-200 w-80">
            <div className="flex flex-col h-full pt-16">
              <Link
                href="#home"
                className="flex items-center gap-3 text-2xl font-serif font-semibold text-stone-900 mb-12"
                onClick={() => setIsMenuOpen(false)}
              >
                <Scissors className="h-6 w-6 text-amber-600" />
                {entreprise}
              </Link>
              <div className="flex flex-col space-y-8">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-lg text-stone-600 hover:text-amber-600 transition-colors font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              <div className="mt-auto pb-8">
                <Button
                  asChild
                  className="w-full bg-amber-600 hover:bg-amber-700 text-white font-medium py-3 rounded-full"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Link href="#reservation">Prendre Rendez-vous</Link>
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </>
  )
}
