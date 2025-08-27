import { ArrowRight, Zap, Target, CheckCircle } from "lucide-react"

const steps = [
  {
    number: "01",
    icon: <Zap className="h-12 w-12" />,
    title: "BOOK",
    description: "Réservation instantanée via notre système ultra-rapide",
    color: "red",
  },
  {
    number: "02",
    icon: <Target className="h-12 w-12" />,
    title: "TRANSFORM",
    description: "Transformation radicale par nos experts",
    color: "black",
  },
  {
    number: "03",
    icon: <CheckCircle className="h-12 w-12" />,
    title: "DOMINATE",
    description: "Sortez avec un look qui impose le respect",
    color: "red",
  },
]

export default function ProcessSection() {
  return (
    <section id="process" className="py-32 bg-gray-100">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-3 bg-red-500 text-white px-6 py-3 border-4 border-black shadow-brutal mb-8">
              <Target className="h-5 w-5" />
              <span className="font-mono font-bold text-sm uppercase tracking-wider">PROCESS</span>
            </div>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-display font-black text-black leading-tight mb-8">
              COMMENT ÇA
              <span className="block text-red-500">FONCTIONNE</span>
            </h2>
            <div className="w-32 h-2 bg-red-500 mx-auto mb-8"></div>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto font-mono">
              Trois étapes. Zéro compromis. Résultat garanti.
            </p>
          </div>

          <div className="relative">
            {/* Connection Lines */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-2 bg-black -translate-y-1/2 z-0"></div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
              {steps.map((step, index) => (
                <div key={step.number} className="relative">
                  <div className="bg-white border-4 border-black p-8 text-center shadow-brutal hover:shadow-none transition-all duration-200 transform hover:translate-x-2 hover:translate-y-2 group">
                    {/* Step Number */}
                    <div
                      className={`absolute -top-4 -right-4 w-12 h-12 ${
                        step.color === "red" ? "bg-red-500" : "bg-black"
                      } border-4 border-black flex items-center justify-center shadow-brutal`}
                    >
                      <span className="text-white font-display font-black text-lg">{step.number}</span>
                    </div>

                    {/* Icon */}
                    <div
                      className={`w-20 h-20 ${
                        step.color === "red" ? "bg-red-500" : "bg-black"
                      } border-4 border-black flex items-center justify-center mx-auto mb-6 group-hover:rotate-12 transition-transform duration-200`}
                    >
                      <div className="text-white">{step.icon}</div>
                    </div>

                    {/* Content */}
                    <h3 className="text-3xl font-display font-black text-black mb-4">{step.title}</h3>
                    <p className="text-gray-700 font-mono leading-relaxed">{step.description}</p>

                    {/* Arrow for desktop */}
                    {index < steps.length - 1 && (
                      <div className="hidden md:block absolute -right-8 top-1/2 -translate-y-1/2 z-20">
                        
                      </div>
                    )}
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
