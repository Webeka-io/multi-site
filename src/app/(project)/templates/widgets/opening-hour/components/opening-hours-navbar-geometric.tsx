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
  dimanche: { open: null, close: null },
}

export function OpeningHoursNavbarGeometric() {
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
          className="relative bg-white border-2 border-slate-200 hover:border-slate-300 transition-all duration-300 group overflow-hidden"
          style={{
            clipPath: "polygon(0 0, calc(100% - 12px) 0, 100% 50%, calc(100% - 12px) 100%, 0 100%)",
          }}
        >
          <div className="flex items-center gap-3 px-2">
            <div className="relative">
              <div
                className="w-8 h-8 bg-slate-100 flex items-center justify-center"
                style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }}
              >
                <Clock className="h-4 w-4 text-slate-600" />
              </div>
              <div
                className={`absolute -top-1 -right-1 w-3 h-3 ${status.isOpen ? "bg-emerald-500" : "bg-red-500"}`}
                style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }}
              />
            </div>
            <div className="flex flex-col items-start">
              <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Status</span>
              <span className={`text-sm font-bold ${status.isOpen ? "text-emerald-600" : "text-red-600"}`}>
                {status.isOpen ? "OUVERT" : "FERMÉ"}
              </span>
            </div>
            <ChevronDown className="h-3 w-3 text-slate-400 group-hover:text-slate-600 transition-colors" />
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0 bg-white border-2 border-slate-200 shadow-2xl overflow-hidden">
        <div className="relative">
          <div
            className={`h-2 ${status.isOpen ? "bg-gradient-to-r from-emerald-400 to-emerald-600" : "bg-gradient-to-r from-red-400 to-red-600"}`}
            style={{ clipPath: "polygon(0 0, 100% 0, 95% 100%, 0% 100%)" }}
          />

          <div className="p-6 space-y-6">
            <div className="text-center">
              <h3 className="font-bold text-xl text-slate-800 uppercase tracking-wider">Horaires</h3>
              <div
                className={`inline-flex items-center gap-2 px-4 py-2 mt-3 text-white font-bold text-sm ${
                  status.isOpen ? "bg-emerald-500" : "bg-red-500"
                }`}
                style={{ clipPath: "polygon(0 0, calc(100% - 8px) 0, 100% 50%, calc(100% - 8px) 100%, 0 100%)" }}
              >
                <div className={`w-2 h-2 bg-white/80`} style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }} />
                {status.message}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-2">
              {Object.entries(openingHours).map(([day, hours], index) => (
                <div
                  key={day}
                  className="flex justify-between items-center p-3 bg-slate-50 border-l-4 border-slate-300"
                  style={{
                    clipPath:
                      index % 2 === 0
                        ? "polygon(0 0, calc(100% - 8px) 0, 100% 100%, 0 100%)"
                        : "polygon(8px 0, 100% 0, 100% 100%, 0 100%)",
                  }}
                >
                  <span className="font-semibold text-slate-700 capitalize tracking-wide">{day}</span>
                  <span className="text-slate-600 font-mono font-medium">
                    {hours.open ? `${hours.open} - ${hours.close}` : "Fermé"}
                  </span>
                </div>
              ))}
            </div>

            <div className="space-y-3 pt-4 border-t-2 border-slate-200">
              <div
                className="flex items-center gap-3 p-2 bg-slate-50"
                style={{ clipPath: "polygon(0 0, calc(100% - 6px) 0, 100% 100%, 0 100%)" }}
              >
                <div
                  className="w-6 h-6 bg-slate-200 flex items-center justify-center"
                  style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }}
                >
                  <MapPin className="h-3 w-3 text-slate-600" />
                </div>
                <span className="text-sm text-slate-700 font-medium">123 Rue du Commerce, 75001 Paris</span>
              </div>
              <div
                className="flex items-center gap-3 p-2 bg-slate-50"
                style={{ clipPath: "polygon(6px 0, 100% 0, 100% 100%, 0 100%)" }}
              >
                <div
                  className="w-6 h-6 bg-slate-200 flex items-center justify-center"
                  style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }}
                >
                  <Phone className="h-3 w-3 text-slate-600" />
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
