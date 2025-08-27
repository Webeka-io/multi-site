import { Heart, Leaf, Users, Sparkles } from "lucide-react"

export default function PhilosophyNordic() {
  return (
    <section id="philosophy" className="py-24 bg-white">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 bg-sage-100 text-sage-700 px-4 py-2 rounded-full text-sm font-light mb-6">
              <Heart className="h-4 w-4" />
              Notre Philosophie
            </div>
            <h2 className="text-4xl md:text-5xl font-light text-stone-800 mb-6">
              Une approche
              <span className="block font-normal text-sage-600">humaine</span>
            </h2>
            <div className="w-16 h-0.5 bg-sage-400 mx-auto mb-8"></div>
            <p className="text-xl text-stone-600 leading-relaxed max-w-3xl mx-auto font-light">
              Nous croyons que prendre soin de soi doit être un moment de détente et de reconnexion avec soi-même. Notre
              approche privilégie la douceur, l'écoute et le respect de votre rythme.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            <div className="text-center group">
              <div className="w-16 h-16 bg-sage-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-sage-200 transition-colors">
                <Heart className="h-8 w-8 text-sage-600" />
              </div>
              <h3 className="text-xl font-medium text-stone-800 mb-3">Bienveillance</h3>
              <p className="text-stone-600 font-light leading-relaxed">
                Chaque client est accueilli avec attention et respect dans un environnement chaleureux.
              </p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 bg-sage-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-sage-200 transition-colors">
                <Leaf className="h-8 w-8 text-sage-600" />
              </div>
              <h3 className="text-xl font-medium text-stone-800 mb-3">Naturalité</h3>
              <p className="text-stone-600 font-light leading-relaxed">
                Nous privilégions des produits naturels et respectueux de votre peau et de l'environnement.
              </p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 bg-sage-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-sage-200 transition-colors">
                <Users className="h-8 w-8 text-sage-600" />
              </div>
              <h3 className="text-xl font-medium text-stone-800 mb-3">Proximité</h3>
              <p className="text-stone-600 font-light leading-relaxed">
                Nous prenons le temps d'apprendre à vous connaître pour un service personnalisé.
              </p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 bg-sage-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-sage-200 transition-colors">
                <Sparkles className="h-8 w-8 text-sage-600" />
              </div>
              <h3 className="text-xl font-medium text-stone-800 mb-3">Excellence</h3>
              <p className="text-stone-600 font-light leading-relaxed">
                Nous nous perfectionnons constamment pour vous offrir le meilleur de notre savoir-faire.
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-sage-50 to-cream-50 rounded-3xl p-12 text-center">
            <blockquote className="text-2xl md:text-3xl font-light text-stone-700 leading-relaxed mb-8 italic">
              "Prendre soin de soi n'est pas un luxe, c'est une nécessité. Nous sommes là pour vous accompagner dans ce
              moment privilégié."
            </blockquote>
            <div className="flex items-center justify-center gap-4">
              <div className="w-12 h-12 bg-sage-500 rounded-full flex items-center justify-center">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <div className="text-left">
                <div className="font-medium text-stone-800">L'équipe Gentleman's Cut</div>
                <div className="text-stone-500 text-sm font-light">Barbiers passionnés</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
