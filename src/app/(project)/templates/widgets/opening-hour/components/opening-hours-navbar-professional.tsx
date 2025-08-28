"use client"

import { useState, useEffect } from "react"
import { Clock, MapPin, Phone, Building2 } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/app/(project)/templates/widgets/opening-hour/components/ui/popover"
import { Button } from "@/app/(project)/templates/widgets/opening-hour/components/ui/button"
import { Badge } from "@/app/(project)/templates/widgets/opening-hour/components/ui/badge"

const openingHours = {
  lundi: { open: "09:00", close: "18:00" },
  mardi: { open: "09:00", close: "18:00" },
  mercredi: { open: "09:00", close: "18:00" },
  jeudi: { open: "09:00", close: "19:00" },
  vendredi: { open: "09:00", close: "19:00" },
  samedi: { open: "09:00", close: "17:00" },
  dimanche: { closed: true },
}

export function OpeningHoursNavbarProfessional() {
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
          variant="outline"
          className="h-10 px-4 bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200 rounded-lg shadow-sm hover:shadow-md"
        >
          <div className="flex items-center gap-3">
            <Building2 className="w-4 h-4 text-gray-600 dark:text-gray-400" />
            <div className="flex items-center gap-2">
              <Badge
                variant={status.isOpen ? "default" : "secondary"}
                className={`text-xs px-2 py-0.5 ${
                  status.isOpen
                    ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                    : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
                }`}
              >
                {status.isOpen ? "OUVERT" : "FERMÉ"}
              </Badge>
              <span className="text-sm text-gray-700 dark:text-gray-300 hidden md:inline font-medium">Horaires</span>
            </div>
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-96 p-0 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-xl"
        align="end"
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Building2 className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">Commerce de Proximité</h3>
            </div>
            <Badge
              variant={status.isOpen ? "default" : "secondary"}
              className={`${
                status.isOpen
                  ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                  : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
              }`}
            >
              {status.message}
            </Badge>
          </div>

          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-3 flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Horaires d'ouverture
              </h4>
              <div className="grid gap-2">
                {Object.entries(openingHours).map(([day, hours]) => {
                  const isToday = new Date().toLocaleDateString("fr-FR", { weekday: "long" }).toLowerCase() === day
                  return (
                    <div
                      key={day}
                      className={`flex justify-between items-center py-2 px-3 rounded-lg text-sm ${
                        isToday
                          ? "bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800"
                          : "bg-gray-50 dark:bg-gray-800/50"
                      }`}
                    >
                      <span
                        className={`capitalize font-medium ${
                          isToday ? "text-blue-900 dark:text-blue-200" : "text-gray-700 dark:text-gray-300"
                        }`}
                      >
                        {day}
                        {isToday && (
                          <span className="ml-2 text-xs text-blue-600 dark:text-blue-400">(Aujourd'hui)</span>
                        )}
                      </span>
                      <span
                        className={`${
                          isToday ? "text-blue-800 dark:text-blue-300 font-medium" : "text-gray-600 dark:text-gray-400"
                        }`}
                      >
                        {hours.closed ? "Fermé" : `${hours.open} - ${hours.close}`}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200 dark:border-gray-700 space-y-3">
              <div className="flex items-start gap-3 text-sm">
                <MapPin className="w-4 h-4 text-gray-500 dark:text-gray-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-gray-900 dark:text-gray-100 font-medium">Adresse</p>
                  <p className="text-gray-600 dark:text-gray-400">
                    123 Rue du Commerce
                    <br />
                    75001 Paris, France
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-sm">
                <Phone className="w-4 h-4 text-gray-500 dark:text-gray-400 flex-shrink-0" />
                <div>
                  <p className="text-gray-900 dark:text-gray-100 font-medium">Téléphone</p>
                  <p className="text-gray-600 dark:text-gray-400">01 23 45 67 89</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
