import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Leaf, Heart } from "lucide-react"

export default function HeroNordic() {
  return (
    <section id="home" className="min-h-screen flex items-center bg-gradient-to-br from-cream-50 to-sage-50">
      <div className="container mx-auto px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-sage-100 text-sage-700 px-4 py-2 rounded-full text-sm font-light">
              <Leaf className="h-4 w-4" />
              Barbier Artisanal
            </div>

            {/* Main Title */}
            <div className="space-y-6">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-light text-stone-800 leading-tight">
                Gentleman's
                <span className="block font-normal text-sage-600">Cut</span>
              </h1>
              <p className="text-xl md:text-2xl text-stone-600 font-light leading-relaxed">
                L'art du bien-être masculin
              </p>
            </div>

            {/* Description */}
            <p className="text-lg text-stone-500 leading-relaxed max-w-xl font-light">
              Dans notre salon aux lignes épurées, nous cultivons une approche douce et respectueuse de la beauté
              masculine. Chaque geste est pensé pour votre confort et votre sérénité.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Button
                asChild
                size="lg"
                className="bg-sage-500 hover:bg-sage-600 text-white font-light px-8 py-4 rounded-full group"
              >
                <Link href="#booking" className="flex items-center gap-2">
                  Prendre rendez-vous
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-sage-300 text-sage-700 hover:bg-sage-50 font-light px-8 py-4 rounded-full bg-transparent"
              >
                <Link href="#philosophy">Notre philosophie</Link>
              </Button>
            </div>

            {/* Values */}
            <div className="grid grid-cols-3 gap-8 pt-12 border-t border-sage-100">
              <div className="text-center">
                <div className="w-12 h-12 bg-sage-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Heart className="h-6 w-6 text-sage-600" />
                </div>
                <div className="text-2xl font-light text-stone-800 mb-1">Bien-être</div>
                <div className="text-stone-500 text-sm font-light">Votre confort avant tout</div>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-sage-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Leaf className="h-6 w-6 text-sage-600" />
                </div>
                <div className="text-2xl font-light text-stone-800 mb-1">Naturel</div>
                <div className="text-stone-500 text-sm font-light">Produits respectueux</div>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-sage-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <ArrowRight className="h-6 w-6 text-sage-600" />
                </div>
                <div className="text-2xl font-light text-stone-800 mb-1">Simplicité</div>
                <div className="text-stone-500 text-sm font-light">Expérience fluide</div>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="aspect-[4/5] relative overflow-hidden rounded-3xl bg-sage-100 shadow-lg">
              <Image
                src="/placeholder.svg?width=600&height=750"
                alt="Salon moderne aux tons naturels"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-sage-900/10 to-transparent"></div>
            </div>

            {/* Floating Card */}
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-lg border border-sage-100">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-sage-500 rounded-full flex items-center justify-center">
                  <Heart className="h-6 w-6 text-white" />
                </div>
                <div>
                  <div className="font-medium text-stone-800">Satisfaction</div>
                  <div className="text-sm text-stone-500">100% garantie</div>
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-sage-200 rounded-full opacity-50"></div>
            <div className="absolute top-1/3 -left-8 w-16 h-16 bg-cream-200 rounded-full opacity-60"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
