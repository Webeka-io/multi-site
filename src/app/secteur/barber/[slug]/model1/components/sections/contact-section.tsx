import { MapPin, Phone, Mail, Clock, Instagram, Facebook, Twitter } from "lucide-react"
import type { Business } from "@/lib/parseSlug"
type Props = { business?: Business }

export default function ContactSection({ business }: Props) {
  const entreprise = business?.entreprise
  const ville = business?.ville
  const secteur = business?.secteur
  return (
    <section id="contact" className="py-32 bg-gradient-to-b from-black to-gray-900">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-display font-black text-white mb-6">
            NOUS
            <span className="block bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">
              TROUVER
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-red-700 mx-auto mb-8"></div>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto font-serif">
            Venez découvrir notre univers au cœur de Paris
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="space-y-12">
            <div className="flex items-start gap-6">
              <div className="bg-red-500 p-4 rounded-lg flex-shrink-0">
                <MapPin className="h-8 w-8 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-display font-bold text-white mb-2">ADRESSE</h3>
                <p className="text-gray-400 font-serif text-lg leading-relaxed">
                  123 Rue du Faubourg Saint-Honoré
                  <br />
                  75008 {ville}, France
                </p>
              </div>
            </div>

            <div className="flex items-start gap-6">
              <div className="bg-red-500 p-4 rounded-lg flex-shrink-0">
                <Phone className="h-8 w-8 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-display font-bold text-white mb-2">TÉLÉPHONE</h3>
                <a
                  href="tel:+33142567890"
                  className="text-gray-400 hover:text-red-500 font-serif text-lg transition-colors"
                >
                  01 42 56 78 90
                </a>
              </div>
            </div>

            <div className="flex items-start gap-6">
              <div className="bg-red-500 p-4 rounded-lg flex-shrink-0">
                <Mail className="h-8 w-8 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-display font-bold text-white mb-2">EMAIL</h3>
                <a
                  href="mailto:contact@gentlemanscut.fr"
                  className="text-gray-400 hover:text-red-500 font-serif text-lg transition-colors"
                >
                  contact@{entreprise}.fr
                </a>
              </div>
            </div>

            <div className="flex items-start gap-6">
              <div className="bg-red-500 p-4 rounded-lg flex-shrink-0">
                <Clock className="h-8 w-8 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-display font-bold text-white mb-2">HORAIRES</h3>
                <div className="text-gray-400 font-serif text-lg space-y-1">
                  <p>Mardi - Vendredi : 9h00 - 20h00</p>
                  <p>Samedi : 9h00 - 19h00</p>
                  <p>Dimanche - Lundi : Fermé</p>
                </div>
              </div>
            </div>

            <div className="pt-8">
              <h3 className="text-2xl font-display font-bold text-white mb-6">SUIVEZ-NOUS</h3>
              <div className="flex gap-4">
                <a href="#" className="bg-gray-800 hover:bg-red-500 p-4 rounded-lg transition-colors">
                  <Instagram className="h-6 w-6 text-white" />
                </a>
                <a href="#" className="bg-gray-800 hover:bg-red-500 p-4 rounded-lg transition-colors">
                  <Facebook className="h-6 w-6 text-white" />
                </a>
                <a href="#" className="bg-gray-800 hover:bg-red-500 p-4 rounded-lg transition-colors">
                  <Twitter className="h-6 w-6 text-white" />
                </a>
              </div>
            </div>
          </div>

          <div className="h-96 lg:h-full rounded-lg overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.2086393809814!2d2.3159543156743896!3d48.87063597928746!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66fec70fb1d8d%3A0x40b82c3688c9460!2s123%20Rue%20du%20Faubourg%20Saint-Honor%C3%A9%2C%2075008%20Paris!5e0!3m2!1sfr!2sfr!4v1620301234567!5m2!1sfr!2sfr"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              title="Localisation Gentleman's Cut"
              className="grayscale hover:grayscale-0 transition-all duration-500"
            ></iframe>
          </div>
        </div>

        <div className="mt-20 pt-12 border-t border-gray-800 text-center">
          <p className="text-gray-500 font-serif">
            &copy; {new Date().getFullYear()} {entreprise}. Tous droits réservés. | Conçu avec passion pour l'art du
            barbier.
          </p>
        </div>
      </div>
    </section>
  )
}
