"use client"

import { useState, useEffect } from "react"
import { X, ZoomIn } from "lucide-react"
import type { Business } from "@/lib/parseSlug"
type Props = { business?: Business }

const galleryImages = [
  { src: "/barber-5 (1).webp",  alt: "Salon élégant avec lumière naturelle", w: 600, h: 400 },
  { src: "/barber-6 (1).webp",  alt: "Coupe de cheveux moderne et précise",  w: 400, h: 600 },
  { src: "/barber-7 (1).webp",  alt: "Rasage traditionnel à l'ancienne",     w: 600, h: 600 },
  { src: "/barber-8 (1).webp",  alt: "Détail des outils de barbier",          w: 400, h: 400 },
  { src: "/barber-9 (1).webp",  alt: "Ambiance feutrée du salon",             w: 600, h: 400 },
  { src: "/barber-10 (1).webp", alt: "Sculpture de barbe artistique",         w: 400, h: 600 },
]

export default function GalleryGrid({ business }: Props) {
  const entreprise = business?.entreprise
  const ville = business?.ville ?? "notre maison"
  const secteur = business?.secteur

  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  // (Optionnel) Fermeture avec Échap
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setSelectedImage(null)
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  return (
    <section id="gallery" className="py-32 bg-white">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="text-center mb-20">
          <p className="text-amber-600 font-medium tracking-wider uppercase text-sm mb-4">Galerie</p>
          <h2 className="text-5xl md:text-6xl font-serif font-light text-stone-900 leading-tight mb-6">
            Notre
            <span className="block font-normal italic">Univers</span>
          </h2>
          <div className="w-16 h-px bg-amber-600 mx-auto mb-8"></div>
          <p className="text-xl text-stone-600 max-w-3xl mx-auto leading-relaxed">
            Découvrez l&apos;atmosphère unique de {entreprise ? `notre maison à ${ville}` : `notre maison à ${ville}`}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {galleryImages.map((image, index) => (
            <button
              key={image.src}
              type="button"
              className="relative aspect-square overflow-hidden rounded-lg group cursor-pointer"
              onClick={() => setSelectedImage(index)}
              aria-label={`Agrandir l'image : ${image.alt}`}
            >
              {/* <img> pour SVG = plus rapide que next/image (pas d'optimisation inutile) */}
              <img
                src={image.src}
                alt={image.alt}
                width={image.w}
                height={image.h}
                loading={index < 2 ? "eager" : "lazy"}
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                style={{ aspectRatio: `${image.w} / ${image.h}` }}
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <ZoomIn className="h-8 w-8 text-white" />
              </div>
            </button>
          ))}
        </div>

        {selectedImage !== null && (
          <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 text-white hover:text-amber-600 transition-colors z-10"
              aria-label="Fermer l’aperçu"
            >
              <X className="h-8 w-8" />
            </button>
            <div className="relative max-w-5xl max-h-full">
              <img
                src={galleryImages[selectedImage].src}
                alt={galleryImages[selectedImage].alt}
                width={1000}
                height={700}
                loading="eager"
                decoding="async"
                className="max-w-full max-h-full object-contain rounded-lg"
                style={{ aspectRatio: "1000 / 700" }}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
