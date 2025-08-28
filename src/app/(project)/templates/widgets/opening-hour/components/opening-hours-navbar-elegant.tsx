"use client"

import { useState, useEffect } from "react"
import { Clock, MapPin, Phone, ChevronRight } from "lucide-react"
import { Button } from "@/app/(project)/templates/widgets/opening-hour/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/app/(project)/templates/widgets/opening-hour/components/ui/popover"

const openingHours = {
  lundi: { open: "09:00", close: "18:00" },
  mardi: { open: "09:00", close: "18:00" },
  mercredi: { open: "09:00", close: "18:00" },
  jeudi: { open: "09:00", close: "19:00" },
  vendredi: { open: "09:00", close: "19:00" },
  samedi: { open: "09:00", close: "17:00" },
  dimanche: { open: null, close: null },
}

const daysOrder = ["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi", "dimanche"]

export function OpeningHoursNavbarElegant() {
  const [isOpen, setIsOpen] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000)
    return () => clearInterval(timer)
  }, [])

  const getCurrentDay = () => {
    const days = ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"]
    return days[currentTime.getDay()]
  }

  const isCurrentlyOpen = () => {
    const currentDay = getCurrentDay()
    const todayHours = openingHours[currentDay as keyof typeof openingHours]

    if (!todayHours.open || !todayHours.close) return false

    const now = currentTime.getHours() * 60 + currentTime.getMinutes()
    const [openHour, openMin] = todayHours.open.split(":").map(Number)
    const [closeHour, closeMin] = todayHours.close.split(":").map(Number)
    const openTime = openHour * 60 + openMin
    const closeTime = closeHour * 60 + closeMin

    return now >= openTime && now <= closeTime
  }

  const currentlyOpen = isCurrentlyOpen()

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className="h-10 px-4 bg-gradient-to-r from-slate-50 to-slate-100 hover:from-slate-100 hover:to-slate-200 border border-slate-200/60 transition-all duration-300 rounded-xl shadow-sm hover:shadow-md group"
        >
          <div className="flex items-center gap-3">
            <div className="relative">
              <Clock className="h-4 w-4 text-slate-600 group-hover:text-slate-700 transition-colors" />
              <div
                className={`absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-white ${
                  currentlyOpen ? "bg-emerald-500" : "bg-amber-500"
                } shadow-sm`}
              />
            </div>
            <div className="flex flex-col items-start">
              <span className="text-xs text-slate-500 leading-none">Magasin</span>
              <span
                className={`text-sm font-medium leading-none ${currentlyOpen ? "text-emerald-700" : "text-amber-700"}`}
              >
                {currentlyOpen ? "Ouvert" : "Fermé"}
              </span>
            </div>
            <ChevronRight
              className={`h-3 w-3 text-slate-400 transition-transform duration-200 ${isOpen ? "rotate-90" : ""}`}
            />
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="w-96 p-0 bg-white border border-slate-200/60 shadow-xl rounded-2xl overflow-hidden"
      >
        <div className="p-6 space-y-5">
          <div className="text-center space-y-3">
            <div
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium border ${
                currentlyOpen
                  ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                  : "bg-amber-50 text-amber-700 border-amber-200"
              }`}
            >
              <div className={`w-2 h-2 rounded-full ${currentlyOpen ? "bg-emerald-500" : "bg-amber-500"}`} />
              {currentlyOpen ? "Actuellement ouvert" : "Actuellement fermé"}
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-center text-slate-800">Horaires d'ouverture</h4>
            <div className="space-y-2">
              {daysOrder.map((day) => {
                const hours = openingHours[day as keyof typeof openingHours]
                const isToday = day === getCurrentDay()

                return (
                  <div
                    key={day}
                    className={`flex justify-between items-center py-3 px-4 rounded-xl transition-all duration-200 ${
                      isToday ? "bg-slate-100 border border-slate-200 shadow-sm" : "hover:bg-slate-50"
                    }`}
                  >
                    <span
                      className={`text-sm capitalize ${isToday ? "font-semibold text-slate-800" : "text-slate-600"}`}
                    >
                      {day}
                    </span>
                    <span
                      className={`text-sm font-mono ${isToday ? "font-semibold text-slate-800" : "text-slate-500"}`}
                    >
                      {hours.open && hours.close ? `${hours.open} - ${hours.close}` : "Fermé"}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200 space-y-3">
            <div className="flex items-center gap-3 text-sm text-slate-600 hover:text-slate-800 transition-colors cursor-pointer">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                <MapPin className="h-4 w-4 text-blue-600" />
              </div>
              <span>123 Rue du Commerce, 75001 Paris</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-600 hover:text-slate-800 transition-colors cursor-pointer">
              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                <Phone className="h-4 w-4 text-green-600" />
              </div>
              <span>01 23 45 67 89</span>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
