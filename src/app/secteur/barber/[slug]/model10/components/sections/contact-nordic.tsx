import { MapPin, Phone, Mail, Clock, Instagram, Facebook, Twitter, Heart } from "lucide-react"

export default function ContactNordic() {
  return (
    <section id="contact" className="py-24 bg-gradient-to-b from-sage-50 to-cream-50">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 bg-white text-sage-700 px-4 py-2 rounded-full text-sm font-light mb-6 shadow-sm">
              <Heart className="h-4 w-4" />
              Contact
            </div>
            <h2 className="text-4xl md:text-5xl font-light text-stone-800 mb-6">
              Venez nous
              <span className="block font-normal text-sage-600">rencontrer</span>
            </h2>
            <div className="w-16 h-0.5 bg-sage-400 mx-auto mb-8"></div>
            <p className="text-xl text-stone-600 leading-relaxed font-light">
              Notre salon vous accueille dans un cadre chaleureux et apaisant
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="space-y-12">
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-sage-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-6 w-6 text-sage-600" />
                </div>
                <div>
                  <h3 className="text-xl font-medium text-stone-800 mb-2">Adresse</h3>
                  <p className="text-stone-600 font-light leading-relaxed">
                    25 Rue de la Sérénité
                    <br />
                    75011 Paris, France
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-sage-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Phone className="h-6 w-6 text-sage-600" />
                </div>
                <div>
                  <h3 className="text-xl font-medium text-stone-800 mb-2">Téléphone</h3>
                  <a
                    href="tel:+33145678901"
                    className="text-stone-600 hover:text-sage-600 font-light transition-colors"
                  >
                    01 45 67 89 01
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-sage-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Mail className="h-6 w-6 text-sage-600" />
                </div>
                <div>
                  <h3 className="text-xl font-medium text-stone-800 mb-2">Email</h3>
                  <a
                    href="mailto:bonjour@gentlemanscut.fr"
                    className="text-stone-600 hover:text-sage-600 font-light transition-colors"
                  >
                    bonjour@gentlemanscut.fr
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-sage-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Clock className="h-6 w-6 text-sage-600" />
                </div>
                <div>
                  <h3 className="text-xl font-medium text-stone-800 mb-2">Horaires</h3>
                  <div className="text-stone-600 font-light space-y-1">
                    <p>Lundi - Vendredi : 9h00 - 19h00</p>
                    <p>Samedi : 9h00 - 18h00</p>
                    <p className="text-sage-600">Dimanche : Fermé</p>
                  </div>
                </div>
              </div>

              <div className="pt-8">
                <h3 className="text-xl font-medium text-stone-800 mb-6">Suivez-nous</h3>
                <div className="flex gap-4">
                  <a
                    href="#"
                    className="w-12 h-12 bg-sage-100 hover:bg-sage-200 rounded-2xl flex items-center justify-center transition-colors"
                  >
                    <Instagram className="h-5 w-5 text-sage-600" />
                  </a>
                  <a
                    href="#"
                    className="w-12 h-12 bg-sage-100 hover:bg-sage-200 rounded-2xl flex items-center justify-center transition-colors"
                  >
                    <Facebook className="h-5 w-5 text-sage-600" />
                  </a>
                  <a
                    href="#"
                    className="w-12 h-12 bg-sage-100 hover:bg-sage-200 rounded-2xl flex items-center justify-center transition-colors"
                  >
                    <Twitter className="h-5 w-5 text-sage-600" />
                  </a>
                </div>
              </div>
            </div>

            <div className="h-96 lg:h-full rounded-3xl overflow-hidden shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2625.1234567890123!2d2.3456789012345678!3d48.85678901234567!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e1f06e2b70f%3A0x40b82c3688c9460!2s25%20Rue%20de%20la%20S%C3%A9r%C3%A9nit%C3%A9%2C%2075011%20Paris!5e0!3m2!1sfr!2sfr!4v1620301234567!5m2!1sfr!2sfr"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                title="Localisation Gentleman's Cut"
                className="filter saturate-75"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
