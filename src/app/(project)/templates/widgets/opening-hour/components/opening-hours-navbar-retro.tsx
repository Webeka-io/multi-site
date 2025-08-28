"use client"

import { useState, useEffect } from "react"
import { Clock, MapPin, Phone } from "lucide-react"
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

export function OpeningHoursNavbarRetro() {
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
          className="relative bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-300 hover:from-amber-100 hover:to-orange-100 transition-all duration-300 shadow-lg hover:shadow-xl font-mono text-amber-900"
        >
          <div className="flex items-center gap-2">
            <div className="relative">
              <Clock className="h-4 w-4" />
              <div
                className={`absolute -top-1 -right-1 w-2 h-2 rounded-full ${status.isOpen ? "bg-green-500" : "bg-red-500"} animate-pulse`}
              />
            </div>
            <span className="hidden sm:inline font-bold tracking-wide">{status.isOpen ? "OUVERT" : "FERMÉ"}</span>
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0 bg-gradient-to-br from-amber-50 to-orange-100 border-2 border-amber-300 shadow-2xl">
        <div className="p-6 space-y-4 font-mono">
          <div className="text-center border-b-2 border-amber-300 pb-4">
            <h3 className="font-bold text-lg text-amber-900 tracking-wider">HORAIRES D'OUVERTURE</h3>
            <div
              className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-bold mt-2 ${
                status.isOpen
                  ? "bg-green-500 text-white shadow-lg shadow-green-500/30"
                  : "bg-red-500 text-white shadow-lg shadow-red-500/30"
              }`}
            >
              <div className={`w-2 h-2 rounded-full ${status.isOpen ? "bg-green-200" : "bg-red-200"} animate-pulse`} />
              {status.message}
            </div>
          </div>

          <div className="space-y-2">
            {Object.entries(openingHours).map(([day, hours]) => (
              <div
                key={day}
                className="flex justify-between items-center py-1 px-2 rounded bg-white/50 border border-amber-200"
              >
                <span className="font-bold text-amber-900 capitalize tracking-wide">{day}</span>
                <span className="text-amber-800 font-mono">
                  {hours.open ? `${hours.open} - ${hours.close}` : "FERMÉ"}
                </span>
              </div>
            ))}
          </div>

          <div className="border-t-2 border-amber-300 pt-4 space-y-2">
            <div className="flex items-center gap-2 text-amber-900">
              <MapPin className="h-4 w-4" />
              <span className="text-sm font-bold">123 Rue du Commerce, 75001 Paris</span>
            </div>
            <div className="flex items-center gap-2 text-amber-900">
              <Phone className="h-4 w-4" />
              <span className="text-sm font-bold">01 23 45 67 89</span>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
