"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/app/secteur/barber/[slug]/model3/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/app/secteur/barber/[slug]/model3/components/ui/sheet"
import { Menu, Scissors, Home, User, Briefcase, Star, Camera, Calendar, Phone } from "lucide-react"
import type { Business } from "@/lib/parseSlug"

const navItems = [
  { name: "Accueil", href: "#home", icon: <Home className="h-5 w-5" /> },
  { name: "À Propos", href: "#about", icon: <User className="h-5 w-5" /> },
  { name: "Services", href: "#services", icon: <Briefcase className="h-5 w-5" /> },
  { name: "Reviews", href: "#reviews", icon: <Star className="h-5 w-5" /> },
  { name: "Work", href: "#work", icon: <Camera className="h-5 w-5" /> },
  { name: "Booking", href: "#booking", icon: <Calendar className="h-5 w-5" /> },
  { name: "Contact", href: "#contact", icon: <Phone className="h-5 w-5" /> },
]

type Props = { business?: Business }

export default function SideNavigation({ business }: Props) {
  const [isOpen, setIsOpen] = useState(false)

    // Déstructuration sécurisée
  const entreprise = business?.entreprise
  const ville = business?.ville
  const secteur = business?.secteur
  const entrepriseUpper = entreprise ? entreprise.toUpperCase() : undefined
  const secteurUpper = secteur ? secteur.toUpperCase() : undefined

  return (
    <>
      {/* Desktop Side Navigation */}
      <nav className="hidden lg:flex fixed right-0 top-0 h-full w-20 bg-zinc-800 border-r border-zinc-700 flex-col items-center py-8 z-40">
        <Link href="#home" className="mb-12 p-3 bg-orange-500 rounded-lg hover:bg-orange-600 transition-colors group">
          <Scissors className="h-6 w-6 text-white group-hover:rotate-45 transition-transform duration-300" />
        </Link>
        <div className="flex flex-col gap-4">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="p-3 text-zinc-400 hover:text-orange-500 hover:bg-zinc-700 rounded-lg transition-all duration-300 group relative"
              title={item.name}
            >
              {item.icon}
              <span className="absolute right-full ml-4 px-2 py-1 bg-zinc-800 text-zinc-100 text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
                {item.name}
              </span>
            </Link>
          ))}
        </div>
      </nav>

      {/* Mobile Navigation */}
      <div className="lg:hidden fixed top-6 right-6 z-50">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="bg-zinc-800 border-zinc-700 hover:bg-zinc-700 text-zinc-100"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="bg-zinc-800 border-r-zinc-700 text-zinc-100 w-80">
            <div className="flex flex-col h-full pt-8">
              <div className="flex items-center gap-3 mb-12">
                <div className="p-3 bg-orange-500 rounded-lg">
                  <Scissors className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-display font-bold text-white">{entreprise}</h2>
                  
                </div>
              </div>
              <div className="flex flex-col space-y-4">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="flex items-center gap-4 p-4 text-zinc-300 hover:text-orange-500 hover:bg-zinc-700 rounded-lg transition-all duration-300"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.icon}
                    <span className="font-medium">{item.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  )
}
