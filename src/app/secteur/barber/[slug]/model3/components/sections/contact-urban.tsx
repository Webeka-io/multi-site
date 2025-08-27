import { MapPin, Phone, Mail, Clock, Instagram, Facebook, Twitter } from "lucide-react"
import type { Business } from "@/lib/parseSlug"
type Props = { business?: Business }

export default function ContactUrban({ business }: Props) {
  const entreprise = business?.entreprise
  const ville = business?.ville
  const secteur = business?.secteur
  return (
    <section id="contact" className="py-32 bg-zinc-800 border-t-4 border-orange-500">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="text-center mb-20">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-12 h-px bg-orange-500"></div>
            <span className="text-orange-500 font-bold uppercase tracking-wider text-sm">Contact</span>
            <div className="w-12 h-px bg-orange-500"></div>
          </div>
          <h2 className="text-6xl md:text-7xl font-display font-black text-white leading-tight mb-6">
            NOUS
            <span className="block text-orange-500">TROUVER</span>
          </h2>
          <p className="text-xl text-zinc-400 max-w-3xl mx-auto">Venez découvrir notre univers au cœur de la ville</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="space-y-12">
            <div className="flex items-start gap-6">
              <div className="bg-orange-500 p-4 rounded-none flex-shrink-0">
                <MapPin className="h-8 w-8 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-display font-bold text-white mb-2">ADRESSE</h3>
                <p className="text-zinc-400 text-lg leading-relaxed">
                  42 Rue de la République
                  <br />
                  {ville}, France
                </p>
              </div>
            </div>

            <div className="flex items-start gap-6">
              <div className="bg-orange-500 p-4 rounded-none flex-shrink-0">
                <Phone className="h-8 w-8 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-display font-bold text-white mb-2">TÉLÉPHONE</h3>
                <a href="tel:+33472567890" className="text-zinc-400 hover:text-orange-500 text-lg transition-colors">
                  04 72 56 78 90
                </a>
              </div>
            </div>

            <div className="flex items-start gap-6">
              <div className="bg-orange-500 p-4 rounded-none flex-shrink-0">
                <Mail className="h-8 w-8 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-display font-bold text-white mb-2">EMAIL</h3>
                <a
                  href="mailto:contact@gentlemanscut.fr"
                  className="text-zinc-400 hover:text-orange-500 text-lg transition-colors"
                >
                  contact@{entreprise}.fr
                </a>
              </div>
            </div>

            <div className="flex items-start gap-6">
              <div className="bg-orange-500 p-4 rounded-none flex-shrink-0">
                <Clock className="h-8 w-8 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-display font-bold text-white mb-2">HORAIRES</h3>
                <div className="text-zinc-400 text-lg space-y-1">
                  <p>Mardi - Vendredi : 10h00 - 20h00</p>
                  <p>Samedi : 9h00 - 19h00</p>
                  <p className="text-orange-500">Dimanche - Lundi : Fermé</p>
                </div>
              </div>
            </div>

            <div className="pt-8">
              <h3 className="text-2xl font-display font-bold text-white mb-6">SUIVEZ-NOUS</h3>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="bg-zinc-900 hover:bg-orange-500 p-4 rounded-none transition-colors border-2 border-zinc-700 hover:border-orange-500"
                >
                  <Instagram className="h-6 w-6 text-white" />
                </a>
                <a
                  href="#"
                  className="bg-zinc-900 hover:bg-orange-500 p-4 rounded-none transition-colors border-2 border-zinc-700 hover:border-orange-500"
                >
                  <Facebook className="h-6 w-6 text-white" />
                </a>
                <a
                  href="#"
                  className="bg-zinc-900 hover:bg-orange-500 p-4 rounded-none transition-colors border-2 border-zinc-700 hover:border-orange-500"
                >
                  <Twitter className="h-6 w-6 text-white" />
                </a>
              </div>
            </div>
          </div>

          <div className="h-96 lg:h-full rounded-none overflow-hidden border-4 border-zinc-700">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2782.6271524621757!2d4.826106315674388!3d45.76837007928746!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47f4ea516ae88797%3A0x408ab2ae4bb21f0!2s42%20Rue%20de%20la%20R%C3%A9publique%2C%2069002%20Lyon!5e0!3m2!1sfr!2sfr!4v1620301234567!5m2!1sfr!2sfr"
              width="100%"
              height="100%"
              style={{ border: 0, filter: "grayscale(100%) contrast(120%)" }}
              allowFullScreen={false}
              loading="lazy"
              title="Localisation Gentleman's Cut"
            ></iframe>
          </div>
        </div>

        <div className="mt-20 pt-12 border-t border-zinc-700 text-center">
          <p className="text-zinc-500">
            &copy; {new Date().getFullYear()} {entreprise}. Tous droits réservés. | Urban Barbershop - {ville}
          </p>
        </div>
      </div>
    </section>
  )
}
