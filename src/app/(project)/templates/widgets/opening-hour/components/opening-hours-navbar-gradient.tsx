"use client"

import { useState, useEffect } from "react"
import { Clock, MapPin, Phone, Sparkles } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/app/(project)/templates/widgets/opening-hour/components/ui/popover"
import { Button } from "@/app/(project)/templates/widgets/opening-hour/components/ui/button"

const openingHours = {
  lundi: { open: "09:00", close: "18:00" },
  mardi: { open: "09:00", close: "18:00" },
  mercredi: { open: "09:00", close: "18:00" },
  jeudi: { open: "09:00", close: "19:00" },
  vendredi: { open: "09:00", close: "19:00" },
  samedi: { open: "09:00", close: "17:00" },
  dimanche: { open: null, close: null },
}

export function OpeningHoursNavbarGradient() {
  const [isOpen, setIsOpen] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000)
    return () => clearInterval(timer)
  }, [])

  const getCurrentStatus = () => {
    const now = new Date()
    const dayNames = ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"]
    const currentDay = dayNames[now.getDay()]
    const currentHours = openingHours[currentDay as keyof typeof openingHours]

    if (!currentHours.open) return { isOpen: false, message: "Fermé aujourd'hui" }

    const currentTime = now.getHours() * 60 + now.getMinutes()
    const [openHour, openMin] = currentHours.open.split(":").map(Number)
    const [closeHour, closeMin] = currentHours.close.split(":").map(Number)
    const openTime = openHour * 60 + openMin
    const closeTime = closeHour * 60 + closeMin

    if (currentTime >= openTime && currentTime < closeTime) {
      return { isOpen: true, message: `Ouvert jusqu'à ${currentHours.close}` }
    }

    return { isOpen: false, message: `Fermé - Ouvre à ${currentHours.open}` }
  }

  const status = getCurrentStatus()

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={`relative overflow-hidden border-0 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-500 group ${
            status.isOpen
              ? "bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-600 hover:via-teal-600 hover:to-cyan-600"
              : "bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 hover:from-rose-600 hover:via-pink-600 hover:to-purple-600"
          }`}
        >
          <div className="flex items-center gap-2 relative z-10">
            <div className="relative">
              <Clock className="h-4 w-4" />
              <Sparkles className="absolute -top-1 -right-1 h-2 w-2 animate-pulse" />
            </div>
            <span className="hidden sm:inline font-bold">{status.isOpen ? "OUVERT" : "FERMÉ"}</span>
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0 bg-gradient-to-br from-slate-50 to-slate-100 border-0 shadow-2xl overflow-hidden">
        <div className="relative">
          <div
            className={`h-1 bg-gradient-to-r ${
              status.isOpen ? "from-emerald-400 via-teal-400 to-cyan-400" : "from-rose-400 via-pink-400 to-purple-400"
            }`}
          />

          <div className="p-6 space-y-6">
            <div className="text-center">
              <h3 className="font-bold text-xl bg-gradient-to-r from-slate-700 to-slate-900 bg-clip-text text-transparent">
                Horaires d'Ouverture
              </h3>
              <div
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-white font-bold text-sm mt-3 shadow-lg ${
                  status.isOpen
                    ? "bg-gradient-to-r from-emerald-500 to-teal-500"
                    : "bg-gradient-to-r from-rose-500 to-pink-500"
                }`}
              >
                <div className="w-2 h-2 bg-white/80 rounded-full animate-pulse" />
                {status.message}
              </div>
            </div>

            <div className="space-y-2">
              {Object.entries(openingHours).map(([day, hours], index) => (
                <div
                  key={day}
                  className={`flex justify-between items-center p-3 rounded-lg transition-all duration-300 hover:shadow-md ${
                    index % 2 === 0
                      ? "bg-gradient-to-r from-white to-slate-50"
                      : "bg-gradient-to-r from-slate-50 to-white"
                  }`}
                >
                  <span className="font-semibold bg-gradient-to-r from-slate-600 to-slate-800 bg-clip-text text-transparent capitalize">
                    {day}
                  </span>
                  <span className="text-slate-600 font-mono font-medium">
                    {hours.open ? `${hours.open} - ${hours.close}` : "Fermé"}
                  </span>
                </div>
              ))}
            </div>

            <div className="space-y-3 pt-4 border-t border-slate-200">
              <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-white to-slate-50 rounded-lg">
                <div className="w-8 h-8 bg-gradient-to-r from-slate-200 to-slate-300 rounded-full flex items-center justify-center">
                  <MapPin className="h-4 w-4 text-slate-600" />
                </div>
                <span className="text-sm text-slate-700 font-medium">123 Rue du Commerce, 75001 Paris</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-slate-50 to-white rounded-lg">
                <div className="w-8 h-8 bg-gradient-to-r from-slate-200 to-slate-300 rounded-full flex items-center justify-center">
                  <Phone className="h-4 w-4 text-slate-600" />
                </div>
                <span className="text-sm text-slate-700 font-medium">01 23 45 67 89</span>
              </div>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
