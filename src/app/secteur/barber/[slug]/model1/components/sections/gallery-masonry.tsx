"use client"

import { useState } from "react"
import { X } from "lucide-react"

const galleryImages = [
  { src: "/barber-5 (1).webp",  alt: "Coupe moderne avec dégradé parfait", tall: true,  w: 400, h: 600 },
  { src: "/barber-6 (1).webp",  alt: "Intérieur vintage du salon",         tall: false, w: 400, h: 400 },
  { src: "/barber-7 (1).webp",  alt: "Rasage traditionnel en action",      tall: false, w: 400, h: 500 },
  { src: "/barber-8 (1).webp",  alt: "Sculpture de barbe artistique",      tall: true,  w: 400, h: 700 },
  { src: "/barber-9 (1).webp",  alt: "Outils de barbier vintage",          tall: false, w: 400, h: 400 },
  { src: "/barber-10 (1).webp", alt: "Coupe pompadour classique",          tall: true,  w: 400, h: 600 },
  { src: "/barber-4 (1).webp",  alt: "Ambiance chaleureuse du salon",      tall: false, w: 400, h: 400 },
  { src: "/barber-1 (1).webp",  alt: "Finition à la cire",                  tall: false, w: 400, h: 500 },
]

export default function GalleryMasonry() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  return (
    <section id="gallery" className=" bg-black">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-display font-black text-white mb-6">
            NOTRE
            <span className="block bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">
              GALERIE
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-red-700 mx-auto mb-8"></div>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto font-serif">
            Un aperçu de notre savoir-faire et de notre univers
          </p>
        </div>

        <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
          {galleryImages.map((image, index) => (
            <div
              key={image.src}
              className="break-inside-avoid relative group cursor-pointer overflow-hidden rounded-lg"
              onClick={() => setSelectedImage(index)}
            >
              {/* Utilise <img> pour SVG : plus rapide qu'Image pour ce format */}
              <img
                src={image.src}
                alt={image.alt}
                width={image.w}
                height={image.h}
                loading={index < 2 ? "eager" : "lazy"}
                decoding="async"
                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110"
                style={{ aspectRatio: `${image.w} / ${image.h}` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-sm font-medium">{image.alt}</p>
              </div>
            </div>
          ))}
        </div>

        {selectedImage !== null && (
          <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 text-white hover:text-red-500 transition-colors z-10"
            >
              <X className="h-8 w-8" />
            </button>
            <div className="relative max-w-4xl max-h-full">
              {/* Pour la modale, on garde le SVG en vectoriel */}
              <img
                src={galleryImages[selectedImage].src}
                alt={galleryImages[selectedImage].alt}
                width={800}
                height={600}
                loading="eager"
                decoding="async"
                className="max-w-full max-h-full object-contain"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
