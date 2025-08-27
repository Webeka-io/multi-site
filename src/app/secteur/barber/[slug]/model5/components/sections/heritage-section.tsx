import Image from "next/image"
import { Crown, Award, Users, Gem } from "lucide-react"

export default function HeritageSection() {
  return (
    <section id="heritage" className="py-32 bg-gradient-to-b from-ivory to-ivory-dark relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gold rounded-full -translate-x-48 -translate-y-48"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-charcoal rounded-full translate-x-40 translate-y-40"></div>
      </div>

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-gold/20 to-gold-dark/20 text-gold px-6 py-3 rounded-full border border-gold/30 mb-8">
              <Crown className="h-5 w-5" />
              <span className="font-serif font-medium text-sm uppercase tracking-wider">Notre Héritage</span>
            </div>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-charcoal leading-tight mb-8">
              Trois Générations
              <span className="block bg-gradient-to-r from-gold via-gold-light to-gold bg-clip-text text-transparent">
                d'Excellence
              </span>
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-gold to-gold-dark mx-auto mb-8"></div>
            <p className="text-xl text-charcoal/70 max-w-4xl mx-auto leading-relaxed font-light">
              Depuis 1952, la famille Dubois perpétue l'art du barbier de luxe avec une passion inégalée pour
              l'excellence et le raffinement. Une tradition transmise de maître à apprenti.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-20">
            <div className="relative">
              <div className="aspect-[4/3] relative overflow-hidden rounded-lg border-4 border-gold/30 shadow-2xl">
                <Image
                  src="/placeholder.svg?width=600&height=450"
                  alt="Portrait du fondateur Marcel Dubois en 1952"
                  fill
                  className="object-cover sepia-[0.3] contrast-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/30 to-transparent"></div>
              </div>
              <div className="absolute -bottom-8 -right-8 bg-gradient-to-br from-gold to-gold-dark p-8 rounded-lg border-4 border-ivory shadow-xl">
                <div className="text-center">
                  <div className="text-charcoal font-display font-bold text-3xl">1952</div>
                  <div className="text-charcoal font-serif text-sm uppercase tracking-wider">Fondation</div>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="space-y-6">
                <h3 className="text-4xl font-display font-bold text-charcoal mb-6">L'Héritage Marcel Dubois</h3>
                <p className="text-lg text-charcoal/70 leading-relaxed font-light">
                  En 1952, Marcel Dubois, ancien barbier de la haute société parisienne, ouvre les portes du premier
                  "Gentleman's Cut" dans le prestigieux 8ème arrondissement. Sa vision : créer un sanctuaire de
                  l'élégance masculine où chaque détail respire le luxe et la tradition.
                </p>
                <p className="text-lg text-charcoal/70 leading-relaxed font-light">
                  Aujourd'hui, Antoine Dubois, troisième génération, perpétue cette excellence avec la même passion,
                  alliant savoir-faire ancestral et innovations contemporaines pour une clientèle d'exception.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-ivory to-ivory-dark p-8 rounded-lg border border-gold/20 shadow-lg">
                  <Users className="h-10 w-10 text-gold mb-4" />
                  <h4 className="font-display font-bold text-charcoal text-xl mb-2">3 Générations</h4>
                  <p className="text-charcoal/60 text-sm font-light">De maîtrise artisanale</p>
                </div>
                <div className="bg-gradient-to-br from-ivory to-ivory-dark p-8 rounded-lg border border-gold/20 shadow-lg">
                  <Gem className="h-10 w-10 text-gold mb-4" />
                  <h4 className="font-display font-bold text-charcoal text-xl mb-2">Savoir-Faire Unique</h4>
                  <p className="text-charcoal/60 text-sm font-light">Techniques exclusives</p>
                </div>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-gold to-gold-dark"></div>

            <div className="space-y-20">
              {[
                {
                  year: "1952",
                  title: "Fondation",
                  desc: "Marcel Dubois ouvre le premier salon de luxe",
                  icon: <Crown className="h-6 w-6" />,
                },
                {
                  year: "1975",
                  title: "Expansion",
                  desc: "Pierre Dubois modernise et agrandit le salon",
                  icon: <Award className="h-6 w-6" />,
                },
                {
                  year: "1998",
                  title: "Reconnaissance",
                  desc: "Prix du meilleur barbershop de luxe de Paris",
                  icon: <Gem className="h-6 w-6" />,
                },
                {
                  year: "2015",
                  title: "Nouvelle Ère",
                  desc: "Antoine apporte sa vision contemporaine",
                  icon: <Users className="h-6 w-6" />,
                },
                {
                  year: "2024",
                  title: "Excellence Continue",
                  desc: "Innovation et tradition en parfaite harmonie",
                  icon: <Crown className="h-6 w-6" />,
                },
              ].map((item, index) => (
                <div
                  key={item.year}
                  className={`flex items-center gap-12 ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}
                >
                  <div className={`flex-1 ${index % 2 === 0 ? "text-right" : "text-left"}`}>
                    <div className="bg-gradient-to-br from-ivory to-ivory-dark p-8 rounded-lg border border-gold/20 shadow-lg inline-block">
                      <h4 className="text-2xl font-display font-bold text-charcoal mb-3">{item.title}</h4>
                      <p className="text-charcoal/70 font-light leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                  <div className="w-20 h-20 bg-gradient-to-br from-gold to-gold-dark rounded-full flex items-center justify-center border-4 border-ivory shadow-xl z-10">
                    <div className="text-charcoal">{item.icon}</div>
                  </div>
                  <div className="flex-1">
                    <div className={`${index % 2 === 0 ? "text-left" : "text-right"}`}>
                      <span className="text-4xl font-display font-bold text-gold">{item.year}</span>
                    </div>
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
