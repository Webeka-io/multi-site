"use client"

import { useState, useEffect } from "react"

const skills = [
  { name: "COUPES MODERNES", level: 95 },
  { name: "BARBE DESIGN", level: 90 },
  { name: "RASAGE TRADITIONNEL", level: 88 },
  { name: "COLORATION", level: 85 },
  { name: "STYLING", level: 92 },
]

export default function SkillsSection() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 },
    )

    const section = document.getElementById("skills")
    if (section) observer.observe(section)

    return () => observer.disconnect()
  }, [])

  return (
    <section id="skills" className="py-6 bg-zinc-800 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-orange-500/5 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 border border-zinc-700 rotate-45 -translate-x-32 translate-y-32"></div>

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-px bg-orange-500"></div>
                <span className="text-orange-500 font-bold uppercase tracking-wider text-sm">Expertise</span>
              </div>
              <h2 className="text-6xl md:text-7xl font-display font-black text-white leading-tight">
                NOS
                <span className="block text-orange-500">SKILLS</span>
              </h2>
            </div>
            <p className="text-xl text-zinc-400 leading-relaxed">
              Des années d'expérience et de perfectionnement pour maîtriser chaque technique à la perfection.
            </p>
          </div>

          <div className="space-y-8">
            {skills.map((skill, index) => (
              <div key={skill.name} className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-white font-bold text-lg">{skill.name}</span>
                  <span className="text-orange-500 font-bold">{skill.level}%</span>
                </div>
                <div className="w-full bg-zinc-700 h-3 rounded-none overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-orange-500 to-orange-600 transition-all duration-2000 ease-out"
                    style={{
                      width: isVisible ? `${skill.level}%` : "0%",
                      transitionDelay: `${index * 200}ms`,
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
