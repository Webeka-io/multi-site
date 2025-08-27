"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"

const galleryImages = [
  { src: "/barber-5 (1).webp",  alt: "Salon moderne et épuré",     w: 400, h: 400 },
  { src: "/barber-6 (1).webp",  alt: "Coupe en cours",             w: 400, h: 500 },
  { src: "/barber-7 (1).webp",  alt: "Espace d'attente",           w: 400, h: 400 },
  { src: "/barber-8 (1).webp",  alt: "Détail du salon",            w: 400, h: 600 },
  { src: "/barber-9 (1).webp",  alt: "Produits professionnels",    w: 400, h: 400 },
  { src: "/barber-10 (1).webp", alt: "Équipe au travail",          w: 400, h: 500 },
]

export default function GalleryMinimal() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  // (Optionnel) fermer la modale avec Échap
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setSelectedImage(null)
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  return (
    <section id="gallery" className="py-24 bg-gray-50">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
              Notre <span className="font-medium">Salon</span>
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              Découvrez notre environnement moderne et professionnel
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {galleryImages.map((image, index) => (
              <button
                key={image.src}
                type="button"
                className="relative aspect-square overflow-hidden rounded-xl bg-gray-100 group cursor-pointer"
                onClick={() => setSelectedImage(index)}
                aria-label={`Agrandir : ${image.alt}`}
              >
                {/* <img> pour SVG : plus rapide que next/image */}
                <img
                  src={image.src}
                  alt={image.alt}
                  width={image.w}
                  height={image.h}
                  loading={index < 2 ? "eager" : "lazy"}
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  style={{ aspectRatio: `${image.w} / ${image.h}` }}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
              </button>
            ))}
          </div>

          {selectedImage !== null && (
            <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-6 right-6 text-white hover:text-gray-300 transition-colors z-10"
                aria-label="Fermer l’aperçu"
              >
                <X className="h-8 w-8" />
              </button>
              <div className="relative max-w-4xl max-h-full">
                <img
                  src={galleryImages[selectedImage].src}
                  alt={galleryImages[selectedImage].alt}
                  width={800}
                  height={600}
                  loading="eager"
                  decoding="async"
                  className="max-w-full max-h-full object-contain rounded-xl"
                  style={{ aspectRatio: "800 / 600" }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
