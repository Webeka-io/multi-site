import Link from "next/link"
import { Scissors, Instagram, Facebook, Twitter, MapPin, Phone, Mail } from "lucide-react"

import type { Business } from "@/lib/parseSlug"
type Props = { business?: Business }

export default function FooterMinimal({ business }: Props) {
  const entreprise = business?.entreprise
  const ville = business?.ville
  const secteur = business?.secteur
  return (
    <footer className="bg-stone-900 text-stone-300">
      <div className="container mx-auto px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          <div className="lg:col-span-2 space-y-6">
            <Link href="#home" className="flex items-center gap-3 text-2xl font-serif font-semibold text-white">
              <Scissors className="h-6 w-6 text-amber-600" />
              {entreprise}
            </Link>
            <p className="text-stone-400 leading-relaxed max-w-md">
              Maison de barbier à {ville} dédiée à l'excellence et au raffinement. L'art traditionnel du barbier
              sublimé par l'élégance contemporaine.
            </p>
            <div className="flex space-x-4">
              <Link
                href="#"
                className="w-10 h-10 bg-stone-800 hover:bg-amber-600 rounded-full flex items-center justify-center transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="w-10 h-10 bg-stone-800 hover:bg-amber-600 rounded-full flex items-center justify-center transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="w-10 h-10 bg-stone-800 hover:bg-amber-600 rounded-full flex items-center justify-center transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-lg font-medium text-white">Contact</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p>123 Rue de Rivoli</p>
                  <p>{ville}, France</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-amber-600 flex-shrink-0" />
                <a href="tel:+33142567890" className="hover:text-amber-600 transition-colors">
                  01 42 56 78 90
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-amber-600 flex-shrink-0" />
                <a href="mailto:contact@gentlemanscut.fr" className="hover:text-amber-600 transition-colors">
                  contact@{entreprise}.fr
                </a>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-lg font-medium text-white">Horaires</h3>
            <div className="space-y-2 text-stone-400">
              <p>Mardi - Vendredi</p>
              <p className="text-white">9h00 - 20h00</p>
              <p>Samedi</p>
              <p className="text-white">9h00 - 19h00</p>
              <p>Dimanche - Lundi</p>
              <p className="text-amber-600">Fermé</p>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-stone-800 text-center">
          <p className="text-stone-500">
            &copy; {new Date().getFullYear()} {entreprise}. Tous droits réservés. | Créé avec passion pour l'art du
            barbier.
          </p>
        </div>
      </div>
    </footer>
  )
}
