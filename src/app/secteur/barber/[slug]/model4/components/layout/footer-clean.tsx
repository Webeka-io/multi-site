import Link from "next/link"
import { Scissors, Instagram, Facebook, Twitter, MapPin, Phone, Mail } from "lucide-react"
import type { Business } from "@/lib/parseSlug"
type Props = { business?: Business }

export default function FooterClean({ business }: Props) {
  const entreprise = business?.entreprise
  const ville = business?.ville
  const secteur = business?.secteur
  return (
    <footer className="bg-gray-50 border-t border-gray-100">
      <div className="container mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Logo & Description */}
          <div className="lg:col-span-2 space-y-6">
            <Link href="#home" className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center">
                <Scissors className="h-4 w-4 text-white rotate-45" />
              </div>
              <span className="text-xl font-medium text-gray-900">{entreprise}</span>
            </Link>
            <p className="text-gray-600 leading-relaxed max-w-md">
              Barbershop moderne offrant des services de qualité dans un environnement épuré et professionnel.
            </p>
            <div className="flex space-x-4">
              <Link
                href="#"
                className="w-10 h-10 bg-gray-200 hover:bg-gray-900 rounded-full flex items-center justify-center transition-colors group"
              >
                <Instagram className="h-4 w-4 text-gray-600 group-hover:text-white" />
              </Link>
              <Link
                href="#"
                className="w-10 h-10 bg-gray-200 hover:bg-gray-900 rounded-full flex items-center justify-center transition-colors group"
              >
                <Facebook className="h-4 w-4 text-gray-600 group-hover:text-white" />
              </Link>
              <Link
                href="#"
                className="w-10 h-10 bg-gray-200 hover:bg-gray-900 rounded-full flex items-center justify-center transition-colors group"
              >
                <Twitter className="h-4 w-4 text-gray-600 group-hover:text-white" />
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900">Contact</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-gray-600 flex-shrink-0 mt-1" />
                <div className="text-gray-600 text-sm">
                  <p>123 Rue de la Paix</p>
                  <p>{entreprise}, France</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-gray-600 flex-shrink-0" />
                <a href="tel:+33123456789" className="text-gray-600 hover:text-gray-900 transition-colors text-sm">
                  01 23 45 67 89
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-gray-600 flex-shrink-0" />
                <a
                  href="mailto:contact@gentlemanscut.fr"
                  className="text-gray-600 hover:text-gray-900 transition-colors text-sm"
                >
                  contact@{entreprise}.fr
                </a>
              </div>
            </div>
          </div>

          {/* Hours */}
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900">Horaires</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>Lun - Ven</span>
                <span>9h - 19h</span>
              </div>
              <div className="flex justify-between">
                <span>Samedi</span>
                <span>9h - 18h</span>
              </div>
              <div className="flex justify-between">
                <span>Dimanche</span>
                <span className="text-gray-400">Fermé</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200 text-center">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} {entreprise}. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  )
}
