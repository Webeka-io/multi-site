"use client"

import { useState, useEffect } from "react"
import { X, Instagram } from "lucide-react"

const workImages = [
  { src: "/barber-5 (1).webp",  alt: "Coupe fade moderne", category: "COUPES",  w: 400, h: 400 },
  { src: "/barber-6 (1).webp",  alt: "Barbe sculptée",     category: "BARBES",  w: 400, h: 500 },
  { src: "/barber-7 (1).webp",  alt: "Style urbain",       category: "STYLES",  w: 400, h: 400 },
  { src: "/barber-8 (1).webp",  alt: "Coupe dégradée",     category: "COUPES",  w: 400, h: 600 },
  { src: "/barber-9 (1).webp",  alt: "Rasage précis",      category: "RASAGES", w: 400, h: 400 },
  { src: "/barber-10 (1).webp", alt: "Look complet",       category: "STYLES",  w: 400, h: 500 },
  { src: "/barber-5 (1).webp",  alt: "Barbe design",       category: "BARBES",  w: 400, h: 400 },
  { src: "/barber-6 (1).webp",  alt: "Coupe tendance",     category: "COUPES",  w: 400, h: 400 },
]

const categories = ["TOUS", "COUPES", "BARBES", "RASAGES", "STYLES"] as const
type Category = typeof categories[number]

export default function WorkGallery() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const [activeCategory, setActiveCategory] = useState<Category>("TOUS")

  const filteredImages = workImages.filter(
    (image) => activeCategory === "TOUS" || image.category === activeCategory
  )

  // (Optionnel) fermer la modale avec Échap
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setSelectedImage(null)
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  return (
    <section id="work" className="py-6 bg-zinc-800">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="text-center mb-20">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-12 h-px bg-orange-500"></div>
            <span className="text-orange-500 font-bold uppercase tracking-wider text-sm">Portfolio</span>
            <div className="w-12 h-px bg-orange-500"></div>
          </div>
          <h2 className="text-6xl md:text-7xl font-display font-black text-white leading-tight mb-6">
            NOS
            <span className="block text-orange-500">RÉALISATIONS</span>
          </h2>
          <p className="text-xl text-zinc-400 max-w-3xl mx-auto mb-12">
            Découvrez quelques-unes de nos créations les plus récentes
          </p>

          {/* Filtres catégories */}
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-3 font-bold text-sm uppercase tracking-wider transition-all duration-300 ${
                  activeCategory === category
                    ? "bg-orange-500 text-white"
                    : "bg-zinc-900 text-zinc-400 hover:text-orange-500 hover:bg-zinc-700"
                }`}
                aria-pressed={activeCategory === category}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Grille */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredImages.map((image, index) => (
            <button
              key={`${image.src}-${index}`}
              type="button"
              className="relative aspect-square overflow-hidden group cursor-pointer bg-zinc-900"
              onClick={() => setSelectedImage(index)}
              aria-label={`Agrandir : ${image.alt}`}
            >
              {/* <img> pour SVG : plus rapide que next/image pour ce format */}
              <img
                src={image.src}
                alt={image.alt}
                width={image.w}
                height={image.h}
                loading={index < 4 ? "eager" : "lazy"}
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover transition-all duration-500 group-hover:scale-110 filter grayscale group-hover:grayscale-0"
                style={{ aspectRatio: `${image.w} / ${image.h}` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="text-orange-500 text-xs font-bold uppercase tracking-wider mb-1">{image.category}</div>
                <div className="text-white text-sm font-medium">{image.alt}</div>
              </div>
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Instagram className="h-5 w-5 text-white" />
              </div>
            </button>
          ))}
        </div>

        {/* Modale */}
        {selectedImage !== null && (
          <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 text-white hover:text-orange-500 transition-colors z-10"
              aria-label="Fermer l’aperçu"
            >
              <X className="h-8 w-8" />
            </button>
            <div className="relative max-w-4xl max-h-full">
              <img
                src={filteredImages[selectedImage].src}
                alt={filteredImages[selectedImage].alt}
                width={800}
                height={600}
                loading="eager"
                decoding="async"
                className="max-w-full max-h-full object-contain"
                style={{ aspectRatio: "800 / 600" }}
              />
              <div className="absolute bottom-4 left-4 right-4 text-center">
                <div className="text-orange-500 text-sm font-bold uppercase tracking-wider mb-2">
                  {filteredImages[selectedImage].category}
                </div>
                <div className="text-white text-lg font-medium">{filteredImages[selectedImage].alt}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
