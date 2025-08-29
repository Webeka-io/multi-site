"use client"

import { useState, useEffect } from "react"
import { Clock, MapPin, Phone, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

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

export function OpeningHoursNavbarGlass() {
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
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative h-10 px-4 bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all duration-300 rounded-full shadow-lg"
        >
          <div className="flex items-center gap-2">
            <div className="relative">
              <Clock className="h-4 w-4" />
              <div
                className={`absolute -top-1 -right-1 w-2 h-2 rounded-full ${
                  currentlyOpen ? "bg-emerald-400 shadow-emerald-400/50" : "bg-red-400 shadow-red-400/50"
                } shadow-lg animate-pulse`}
              />
            </div>
            <span className="text-sm font-medium  sm:inline">{currentlyOpen ? "Ouvert" : "Fermé"}</span>
            <ChevronDown className={`h-3 w-3 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-80 p-0 bg-white/95 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl overflow-hidden"
      >
        <div className="p-6 space-y-4">
          <div className="text-center space-y-2">
            <div
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${
                currentlyOpen
                  ? "bg-emerald-100/80 text-emerald-700 border border-emerald-200/50"
                  : "bg-red-100/80 text-red-700 border border-red-200/50"
              }`}
            >
              <div
                className={`w-2 h-2 rounded-full ${currentlyOpen ? "bg-emerald-500" : "bg-red-500"} animate-pulse`}
              />
              {currentlyOpen ? "Actuellement ouvert" : "Actuellement fermé"}
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-semibold text-center text-gray-900">Horaires d'ouverture</h4>
            <div className="space-y-1">
              {daysOrder.map((day) => {
                const hours = openingHours[day as keyof typeof openingHours]
                const isToday = day === getCurrentDay()

                return (
                  <div
                    key={day}
                    className={`flex justify-between items-center py-2 px-3 rounded-lg transition-all duration-200 ${
                      isToday ? "bg-blue-50/80 border border-blue-200/50 shadow-sm" : "hover:bg-gray-50/50"
                    }`}
                  >
                    <span className={`text-sm capitalize ${isToday ? "font-semibold text-blue-700" : "text-gray-700"}`}>
                      {day}
                    </span>
                    <span className={`text-sm ${isToday ? "font-semibold text-blue-700" : "text-gray-600"}`}>
                      {hours.open && hours.close ? `${hours.open} - ${hours.close}` : "Fermé"}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="pt-4 border-t border-gray-200/50 space-y-3">
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <MapPin className="h-4 w-4 text-blue-500" />
              <span>123 Rue du Commerce, 75001 Paris</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <Phone className="h-4 w-4 text-green-500" />
              <span>01 23 45 67 89</span>
            </div>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
