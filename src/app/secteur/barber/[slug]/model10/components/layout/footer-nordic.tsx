import Link from "next/link"
import { Scissors, Instagram, Facebook, Twitter, MapPin, Phone, Mail, Heart } from "lucide-react"

export default function FooterNordic() {
  return (
    <footer className="bg-white border-t border-sage-100">
      <div className="container mx-auto px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Logo & Description */}
          <div className="lg:col-span-2 space-y-6">
            <Link href="#home" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-sage-500 rounded-full flex items-center justify-center">
                <Scissors className="h-5 w-5 text-white rotate-45" />
              </div>
              <div>
                <h2 className="text-xl font-light text-stone-800">Gentleman's</h2>
                <p className="text-sage-600 text-sm tracking-wide">CUT</p>
              </div>
            </Link>
            <p className="text-stone-600 leading-relaxed max-w-md font-light">
              Votre salon de bien-être masculin à Paris. Nous cultivons une approche douce et respectueuse de la beauté
              masculine dans un cadre apaisant et naturel.
            </p>
            <div className="flex space-x-4">
              <Link
                href="#"
                className="w-10 h-10 bg-sage-100 hover:bg-sage-200 rounded-full flex items-center justify-center transition-colors"
              >
                <Instagram className="h-4 w-4 text-sage-600" />
              </Link>
              <Link
                href="#"
                className="w-10 h-10 bg-sage-100 hover:bg-sage-200 rounded-full flex items-center justify-center transition-colors"
              >
                <Facebook className="h-4 w-4 text-sage-600" />
              </Link>
              <Link
                href="#"
                className="w-10 h-10 bg-sage-100 hover:bg-sage-200 rounded-full flex items-center justify-center transition-colors"
              >
                <Twitter className="h-4 w-4 text-sage-600" />
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-stone-800">Contact</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-sage-600 flex-shrink-0 mt-1" />
                <div className="text-stone-600 text-sm font-light">
                  <p>25 Rue de la Sérénité</p>
                  <p>75011 Paris, France</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-sage-600 flex-shrink-0" />
                <a
                  href="tel:+33145678901"
                  className="text-stone-600 hover:text-sage-600 transition-colors text-sm font-light"
                >
                  01 45 67 89 01
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-sage-600 flex-shrink-0" />
                <a
                  href="mailto:bonjour@gentlemanscut.fr"
                  className="text-stone-600 hover:text-sage-600 transition-colors text-sm font-light"
                >
                  bonjour@gentlemanscut.fr
                </a>
              </div>
            </div>
          </div>

          {/* Hours */}
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-stone-800">Horaires</h3>
            <div className="space-y-2 text-sm text-stone-600 font-light">
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
                <span className="text-sage-500">Fermé</span>
              </div>
            </div>
            <div className="bg-sage-50 p-4 rounded-2xl">
              <div className="flex items-center gap-2 mb-2">
                <Heart className="h-4 w-4 text-sage-600" />
                <span className="font-medium text-stone-800 text-sm">Rendez-vous conseillé</span>
              </div>
              <p className="text-stone-600 text-xs font-light">Pour garantir votre moment de détente</p>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-sage-100 text-center">
          <p className="text-stone-500 text-sm font-light">
            &copy; {new Date().getFullYear()} Gentleman's Cut. Tous droits réservés. | Salon de bien-être masculin -
            Paris
          </p>
        </div>
      </div>
    </footer>
  )
}
