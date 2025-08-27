import { Check, Users, Award, Clock } from "lucide-react"

export default function AboutMinimal() {
  return (
    <section id="about" className="py-24 bg-gray-50">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
              Notre
              <span className="font-medium"> Philosophie</span>
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
              Nous croyons en la simplicité et l'excellence. Chaque détail compte pour créer une expérience
              exceptionnelle.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">Approche Personnalisée</h3>
              <p className="text-gray-600">Chaque client est unique. Nous adaptons nos services à vos besoins.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">Qualité Premium</h3>
              <p className="text-gray-600">Nous utilisons uniquement les meilleurs produits et techniques.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">Efficacité</h3>
              <p className="text-gray-600">Respect de votre temps avec un service rapide et professionnel.</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-gray-100">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-3xl font-light text-gray-900 mb-6">
                  Pourquoi nous
                  <span className="font-medium"> choisir ?</span>
                </h3>
                <div className="space-y-4">
                  {[
                    "Équipe de barbiers expérimentés",
                    "Environnement moderne et hygiénique",
                    "Produits de qualité professionnelle",
                    "Réservation en ligne simplifiée",
                    "Satisfaction client garantie",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-gray-900 rounded-full flex items-center justify-center flex-shrink-0">
                        <Check className="h-3 w-3 text-white" />
                      </div>
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-gray-50 rounded-xl p-8 text-center">
                <div className="text-4xl font-light text-gray-900 mb-2">4.9/5</div>
                <div className="text-gray-600 mb-4">Note moyenne</div>
                <div className="text-sm text-gray-500">Basée sur 200+ avis clients</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
