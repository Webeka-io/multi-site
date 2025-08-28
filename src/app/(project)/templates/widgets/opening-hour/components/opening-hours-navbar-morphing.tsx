"use client"

import { useState, useEffect } from "react"
import { Clock, MapPin, Phone, ChevronDown } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/app/(project)/templates/widgets/opening-hour/components/ui/popover"
import { Button } from "@/app/(project)/templates/widgets/opening-hour/components/ui/button"

const openingHours = {
  lundi: { open: "09:00", close: "18:00" },
  mardi: { open: "09:00", close: "18:00" },
  mercredi: { open: "09:00", close: "18:00" },
  jeudi: { open: "09:00", close: "19:00" },
  vendredi: { open: "09:00", close: "19:00" },
  samedi: { open: "09:00", close: "17:00" },
  dimanche: { closed: true },
}

export function OpeningHoursNavbarMorphing() {
  const [isOpen, setIsOpen] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [morphState, setMorphState] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const morphTimer = setInterval(() => {
      setMorphState((prev) => (prev + 1) % 3)
    }, 2000)
    return () => clearInterval(morphTimer)
  }, [])

  const getCurrentStatus = () => {
    const now = new Date()
    const dayNames = ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"]
    const currentDay = dayNames[now.getDay()]
    const currentHour = now.getHours()
    const currentMinute = now.getMinutes()
    const currentTimeInMinutes = currentHour * 60 + currentMinute

    const todayHours = openingHours[currentDay as keyof typeof openingHours]

    if (todayHours.closed) {
      return { isOpen: false, message: "Fermé aujourd'hui" }
    }

    const [openHour, openMinute] = todayHours.open.split(":").map(Number)
    const [closeHour, closeMinute] = todayHours.close.split(":").map(Number)
    const openTimeInMinutes = openHour * 60 + openMinute
    const closeTimeInMinutes = closeHour * 60 + closeMinute

    if (currentTimeInMinutes >= openTimeInMinutes && currentTimeInMinutes < closeTimeInMinutes) {
      return { isOpen: true, message: `Ouvert jusqu'à ${todayHours.close}` }
    } else {
      return { isOpen: false, message: "Fermé" }
    }
  }

  const status = getCurrentStatus()

  const getMorphShape = () => {
    const shapes = [
      "polygon(50% 0%, 0% 100%, 100% 100%)", // Triangle
      "polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)", // Trapèze
      "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)", // Losange
    ]
    return shapes[morphState]
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className="relative h-12 px-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 hover:from-purple-500/20 hover:to-pink-500/20 border border-purple-200/50 dark:border-purple-800/50 rounded-2xl transition-all duration-500 overflow-hidden group"
        >
          <div
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              status.isOpen
                ? "bg-gradient-to-r from-green-400/20 to-emerald-400/20"
                : "bg-gradient-to-r from-red-400/20 to-orange-400/20"
            }`}
            style={{ clipPath: getMorphShape() }}
          />

          <div className="relative flex items-center gap-2 z-10">
            <div
              className={`w-3 h-3 rounded-full transition-all duration-500 ${
                status.isOpen
                  ? "bg-green-500 shadow-lg shadow-green-500/50 animate-pulse"
                  : "bg-red-500 shadow-lg shadow-red-500/50"
              }`}
            />
            <Clock className="w-4 h-4 text-gray-700 dark:text-gray-300 group-hover:rotate-12 transition-transform duration-300" />
            <span className="text-sm font-medium text-gray-800 dark:text-gray-200 hidden sm:inline">
              {status.isOpen ? "Ouvert" : "Fermé"}
            </span>
            <ChevronDown
              className={`w-3 h-3 text-gray-600 dark:text-gray-400 transition-transform duration-300 ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-80 p-0 bg-gradient-to-br from-white/90 to-gray-50/90 dark:from-gray-900/90 dark:to-gray-800/90 backdrop-blur-xl border border-purple-200/50 dark:border-purple-800/50 rounded-3xl shadow-2xl"
        align="end"
      >
        <div className="p-6 space-y-4">
          <div className="text-center relative">
            <div
              className={`absolute inset-0 rounded-full transition-all duration-1000 ${
                status.isOpen
                  ? "bg-gradient-to-r from-green-400/10 to-emerald-400/10"
                  : "bg-gradient-to-r from-red-400/10 to-orange-400/10"
              }`}
              style={{ clipPath: getMorphShape() }}
            />
            <div
              className={`relative inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium border transition-all duration-500 ${
                status.isOpen
                  ? "text-green-700 dark:text-green-300 border-green-200 dark:border-green-800 bg-green-50/50 dark:bg-green-900/20"
                  : "text-red-700 dark:text-red-300 border-red-200 dark:border-red-800 bg-red-50/50 dark:bg-red-900/20"
              }`}
            >
              <div
                className={`w-2 h-2 rounded-full transition-all duration-500 ${
                  status.isOpen ? "bg-green-500 animate-pulse" : "bg-red-500"
                }`}
              />
              {status.message}
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold text-gray-800 dark:text-gray-200 text-center">Horaires d'ouverture</h3>
            <div className="space-y-2">
              {Object.entries(openingHours).map(([day, hours], index) => (
                <div
                  key={day}
                  className="flex justify-between items-center text-sm p-3 rounded-xl bg-white/50 dark:bg-gray-800/50 border border-gray-200/50 dark:border-gray-700/50 hover:bg-white/70 dark:hover:bg-gray-800/70 transition-all duration-300"
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animation: isOpen ? "slideInUp 0.5s ease-out forwards" : "none",
                  }}
                >
                  <span className="capitalize font-medium text-gray-700 dark:text-gray-300">{day}</span>
                  <span className="text-gray-600 dark:text-gray-400">
                    {hours.closed ? "Fermé" : `${hours.open} - ${hours.close}`}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-gray-200/50 dark:border-gray-700/50 space-y-3">
            <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400 p-3 rounded-xl bg-white/30 dark:bg-gray-800/30 hover:bg-white/50 dark:hover:bg-gray-800/50 transition-all duration-300">
              <MapPin className="w-4 h-4" />
              <span>123 Rue du Commerce, 75001 Paris</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400 p-3 rounded-xl bg-white/30 dark:bg-gray-800/30 hover:bg-white/50 dark:hover:bg-gray-800/50 transition-all duration-300">
              <Phone className="w-4 h-4" />
              <span>01 23 45 67 89</span>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
