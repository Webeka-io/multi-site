"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Scissors, MapPin, Phone, Mail, Instagram, Facebook, Twitter } from "lucide-react"

export default function FooterModern() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="#home" className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <Scissors className="h-4 w-4 text-gray-900" />
              </div>
              <span className="text-xl font-semibold">Gentleman's Cut</span>
            </Link>
            <p className="text-gray-400 mb-6 leading-relaxed">
              L'excellence du barbier moderne dans un cadre contemporain et raffiné.
            </p>
            <div className="flex gap-4">
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                <Twitter className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Coupe Classique
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Coupe & Barbe
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Coloration
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Service Premium
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>15 rue de la Paix, 75001 Paris</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>01 42 86 75 30</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>contact@gentlemanscut.fr</span>
              </li>
            </ul>
          </div>

          {/* Horaires */}
          <div>
            <h3 className="font-semibold mb-4">Horaires</h3>
            <ul className="space-y-2 text-gray-400">
              <li className="flex justify-between">
                <span>Mar - Ven</span>
                <span>9h - 19h</span>
              </li>
              <li className="flex justify-between">
                <span>Samedi</span>
                <span>9h - 18h</span>
              </li>
              <li className="flex justify-between">
                <span>Dim - Lun</span>
                <span className="text-red-400">Fermé</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">© 2024 Gentleman's Cut. Tous droits réservés.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
              Mentions légales
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
              Politique de confidentialité
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
