import { Card, CardContent } from "@/app/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/app/components/ui/carousel"
import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/ui/avatar"
import { Star } from "lucide-react"

const testimonials = [
  {
    name: "Julien L.",
    avatar: "/placeholder.svg?width=64&height=64",
    rating: 5,
    quote:
      "Le meilleur barbier de la ville, sans aucun doute. L'ambiance est géniale et le travail est toujours impeccable. Je ne vais nulle part ailleurs.",
  },
  {
    name: "Alexandre M.",
    avatar: "/placeholder.svg?width=64&height=64",
    rating: 5,
    quote:
      "Un service exceptionnel et une attention aux détails incroyable. La taille de barbe est parfaite à chaque fois. Je recommande vivement !",
  },
  {
    name: "Thomas P.",
    avatar: "/placeholder.svg?width=64&height=64",
    rating: 5,
    quote:
      "Professionnel, amical et très talentueux. Le rasage à la serviette chaude est une expérience à ne pas manquer. Un vrai moment de détente.",
  },
]

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-20 md:py-32 bg-gray-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white">Ce que disent nos clients</h2>
          <p className="mt-4 text-lg text-gray-400">Votre satisfaction est notre plus grande fierté.</p>
        </div>
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-4xl mx-auto"
        >
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/2">
                <div className="p-1">
                  <Card className="bg-gray-800 border-gray-700 text-white h-full flex flex-col">
                    <CardContent className="flex flex-col items-center justify-center text-center p-8 flex-grow">
                      <Avatar className="w-16 h-16 mb-4">
                        <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.name} />
                        <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex gap-1 mb-2">
                        {Array(testimonial.rating)
                          .fill(0)
                          .map((_, i) => (
                            <Star key={i} className="h-5 w-5 text-amber-400 fill-amber-400" />
                          ))}
                      </div>
                      <blockquote className="mt-2 text-gray-300 italic flex-grow">"{testimonial.quote}"</blockquote>
                      <cite className="mt-4 not-italic font-bold text-white">{testimonial.name}</cite>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="text-white bg-gray-800 hover:bg-gray-700 border-gray-600" />
          <CarouselNext className="text-white bg-gray-800 hover:bg-gray-700 border-gray-600" />
        </Carousel>
      </div>
    </section>
  )
}
