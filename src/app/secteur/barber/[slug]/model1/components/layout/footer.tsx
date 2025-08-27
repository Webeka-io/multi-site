import Link from "next/link"
import { Scissors, Instagram, Facebook, Twitter } from "lucide-react"


export default function Footer() {
  return (
    <footer id="contact" className="bg-gray-950 border-t border-gray-800 pt-16 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-1">
            <Link href="#home" className="flex items-center gap-2 text-2xl font-serif font-bold text-white mb-4">
              <Scissors className="h-6 w-6 text-amber-400" />
              Gentleman's Cut
            </Link>
            <p className="text-gray-400">
              L'art du barbier traditionnel avec une touche de modernité. Votre style, notre passion.
            </p>
            <div className="flex space-x-4 mt-6">
              <Link href="#" className="text-gray-400 hover:text-amber-400">
                <Instagram />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-amber-400">
                <Facebook />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-amber-400">
                <Twitter />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Contact & Horaires</h3>
              <ul className="space-y-2 text-gray-400">
                <li>123 Rue du Style, 75001 Paris</li>
                <li>
                  <a href="tel:+33123456789" className="hover:text-amber-400">
                    01 23 45 67 89
                  </a>
                </li>
                <li>
                  <a href="mailto:contact@gentlemanscut.fr" className="hover:text-amber-400">
                    contact@gentlemanscut.fr
                  </a>
                </li>
                <li className="pt-2">
                  <p>Mardi - Vendredi: 9h - 19h</p>
                  <p>Samedi: 9h - 18h</p>
                  <p>Dimanche & Lundi: Fermé</p>
                </li>
              </ul>
            </div>
            <div className="h-64 md:h-full rounded-lg overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.991625693759!2d2.349014415674388!3d48.85837007928746!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e1f06e2b70f%3A0x40b82c3688c9460!2sParis!5e0!3m2!1sfr!2sfr!4v1620301234567!5m2!1sfr!2sfr"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                title="Emplacement du salon"
              ></iframe>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Gentleman's Cut. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  )
}
