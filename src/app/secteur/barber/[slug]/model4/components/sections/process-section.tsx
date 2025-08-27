import { Calendar, Scissors, CheckCircle } from "lucide-react"

const steps = [
  {
    icon: <Calendar className="h-8 w-8" />,
    title: "Réservation",
    description: "Réservez votre créneau en ligne en quelques clics",
  },
  {
    icon: <Scissors className="h-8 w-8" />,
    title: "Service",
    description: "Profitez de votre service dans notre salon moderne",
  },
  {
    icon: <CheckCircle className="h-8 w-8" />,
    title: "Résultat",
    description: "Repartez avec un look parfait et une satisfaction garantie",
  },
]

export default function ProcessSection() {
  return (
    <section id="process" className="py-24 bg-gray-50">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
              Comment ça
              <span className="font-medium"> fonctionne</span>
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              Un processus simple et efficace pour une expérience optimale
            </p>
          </div>

          <div className="relative">
            {/* Connection Line */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 -translate-y-1/2"></div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {steps.map((step, index) => (
                <div key={step.title} className="relative">
                  <div className="bg-white rounded-2xl p-8 text-center shadow-sm border border-gray-100 relative z-10">
                    <div className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-6">
                      <div className="text-white">{step.icon}</div>
                    </div>
                    <div className="absolute -top-3 -right-3 w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center text-white text-sm font-medium">
                      {index + 1}
                    </div>
                    <h3 className="text-xl font-medium text-gray-900 mb-3">{step.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
