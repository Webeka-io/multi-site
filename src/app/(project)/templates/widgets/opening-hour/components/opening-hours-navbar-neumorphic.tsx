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
  dimanche: { closed: true },
}

export function OpeningHoursNavbarNeumorphic() {
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

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className="relative h-12 px-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 border-0 shadow-[inset_2px_2px_5px_rgba(0,0,0,0.1),inset_-2px_-2px_5px_rgba(255,255,255,0.7)] dark:shadow-[inset_2px_2px_5px_rgba(0,0,0,0.3),inset_-2px_-2px_5px_rgba(255,255,255,0.1)] hover:shadow-[inset_1px_1px_3px_rgba(0,0,0,0.15),inset_-1px_-1px_3px_rgba(255,255,255,0.8)] dark:hover:shadow-[inset_1px_1px_3px_rgba(0,0,0,0.4),inset_-1px_-1px_3px_rgba(255,255,255,0.15)] transition-all duration-300 rounded-xl"
        >
          <div className="flex items-center gap-2">
            <div
              className={`w-2 h-2 rounded-full shadow-inner ${
                status.isOpen
                  ? "bg-green-500 shadow-[inset_1px_1px_2px_rgba(0,0,0,0.2)]"
                  : "bg-red-500 shadow-[inset_1px_1px_2px_rgba(0,0,0,0.2)]"
              }`}
            />
            <Clock className="w-4 h-4 text-gray-600 dark:text-gray-400" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 hidden sm:inline">
              {status.isOpen ? "Ouvert" : "Fermé"}
            </span>
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-80 p-0 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 border-0 shadow-[8px_8px_16px_rgba(0,0,0,0.15),-8px_-8px_16px_rgba(255,255,255,0.7)] dark:shadow-[8px_8px_16px_rgba(0,0,0,0.3),-8px_-8px_16px_rgba(255,255,255,0.1)] rounded-2xl"
        align="end"
      >
        <div className="p-6 space-y-4">
          <div className="text-center">
            <div
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium shadow-[inset_2px_2px_4px_rgba(0,0,0,0.1),inset_-2px_-2px_4px_rgba(255,255,255,0.7)] dark:shadow-[inset_2px_2px_4px_rgba(0,0,0,0.3),inset_-2px_-2px_4px_rgba(255,255,255,0.1)] ${
                status.isOpen ? "text-green-700 dark:text-green-300" : "text-red-700 dark:text-red-300"
              }`}
            >
              <div className={`w-2 h-2 rounded-full ${status.isOpen ? "bg-green-500" : "bg-red-500"}`} />
              {status.message}
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold text-gray-800 dark:text-gray-200 text-center">Horaires d'ouverture</h3>
            <div className="space-y-2">
              {Object.entries(openingHours).map(([day, hours]) => (
                <div
                  key={day}
                  className="flex justify-between items-center text-sm p-2 rounded-lg shadow-[inset_1px_1px_2px_rgba(0,0,0,0.05),inset_-1px_-1px_2px_rgba(255,255,255,0.5)] dark:shadow-[inset_1px_1px_2px_rgba(0,0,0,0.2),inset_-1px_-1px_2px_rgba(255,255,255,0.05)]"
                >
                  <span className="capitalize font-medium text-gray-700 dark:text-gray-300">{day}</span>
                  <span className="text-gray-600 dark:text-gray-400">
                    {hours.closed ? "Fermé" : `${hours.open} - ${hours.close}`}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-gray-200 dark:border-gray-700 space-y-3">
            <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400 p-2 rounded-lg shadow-[inset_1px_1px_2px_rgba(0,0,0,0.05),inset_-1px_-1px_2px_rgba(255,255,255,0.5)] dark:shadow-[inset_1px_1px_2px_rgba(0,0,0,0.2),inset_-1px_-1px_2px_rgba(255,255,255,0.05)]">
              <MapPin className="w-4 h-4" />
              <span>123 Rue du Commerce, 75001 Paris</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400 p-2 rounded-lg shadow-[inset_1px_1px_2px_rgba(0,0,0,0.05),inset_-1px_-1px_2px_rgba(255,255,255,0.5)] dark:shadow-[inset_1px_1px_2px_rgba(0,0,0,0.2),inset_-1px_-1px_2px_rgba(255,255,255,0.05)]">
              <Phone className="w-4 h-4" />
              <span>01 23 45 67 89</span>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
