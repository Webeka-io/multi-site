import Image from "next/image"

const galleryImages = [
  { src: "/placeholder.svg?width=400&height=400", alt: "Coupe de cheveux homme moderne avec dégradé" },
  { src: "/placeholder.svg?width=400&height=400", alt: "Intérieur du salon de barbier" },
  { src: "/placeholder.svg?width=400&height=400", alt: "Barbier taillant une barbe avec précision" },
  { src: "/placeholder.svg?width=400&height=400", alt: "Coupe de cheveux classique Pompadour" },
  { src: "/placeholder.svg?width=400&height=400", alt: "Préparation pour un rasage à la serviette chaude" },
  { src: "/placeholder.svg?width=400&height=400", alt: "Outils de barbier sur un poste de travail" },
  { src: "/placeholder.svg?width=400&height=400", alt: "Client satisfait après sa coupe" },
  { src: "/placeholder.svg?width=400&height=400", alt: "L'équipe de barbiers" },
]

export default function GallerySection() {
  return (
    <section id="gallery" className="py-20 md:py-32 bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white">Notre Galerie</h2>
          <p className="mt-4 text-lg text-gray-400">Un aperçu de notre art et de notre ambiance.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {galleryImages.map((image, index) => (
            <div key={index} className="relative aspect-square overflow-hidden rounded-lg group">
              <Image
                src={image.src || "/placeholder.svg"}
                alt={image.alt}
                fill
                className="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-500 cursor-pointer"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
