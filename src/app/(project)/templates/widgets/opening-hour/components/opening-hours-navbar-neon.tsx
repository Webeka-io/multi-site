"use client"

import { useState, useEffect } from "react"
import { Clock, Zap } from "lucide-react"
import { Button } from "@/app/(project)/templates/widgets/opening-hour/components/ui/button"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/app/(project)/templates/widgets/opening-hour/components/ui/hover-card"

const openingHours = {
  lundi: { open: "09:00", close: "18:00" },
  mardi: { open: "09:00", close: "18:00" },
  mercredi: { open: "09:00", close: "18:00" },
  jeudi: { open: "09:00", close: "23:00" },
  vendredi: { open: "09:00", close: "19:00" },
  samedi: { open: "09:00", close: "17:00" },
  dimanche: { open: null, close: null },
}

const daysOrder = ["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi", "dimanche"]

export function OpeningHoursNavbarNeon() {
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
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button
          variant="ghost"
          className={`relative h-10 px-4 bg-black border-2 transition-all duration-300 rounded-lg overflow-hidden group ${
            currentlyOpen
              ? "border-green-400 shadow-green-400/25 hover:shadow-green-400/40"
              : "border-red-400 shadow-red-400/25 hover:shadow-red-400/40"
          } shadow-lg hover:shadow-xl`}
        >
          <div
            className={`absolute inset-0 bg-gradient-to-r opacity-10 group-hover:opacity-20 transition-opacity ${
              currentlyOpen ? "from-green-400 to-blue-400" : "from-red-400 to-pink-400"
            }`}
          />

          <div className="relative flex items-center gap-2">
            <div className="relative">
              {currentlyOpen ? <Zap className="h-4 w-4 text-green-400" /> : <Clock className="h-4 w-4 text-red-400" />}
              <div
                className={`absolute inset-0 ${
                  currentlyOpen ? "text-green-400" : "text-red-400"
                } animate-ping opacity-75`}
              >
                {currentlyOpen ? <Zap className="h-4 w-4" /> : <Clock className="h-4 w-4" />}
              </div>
            </div>

            <span className={`text-sm font-bold tracking-wide ${currentlyOpen ? "text-green-400" : "text-red-400"}`}>
              {currentlyOpen ? "OUVERT" : "FERMÉ"}
            </span>
          </div>
        </Button>
      </HoverCardTrigger>
      <HoverCardContent
        align="end"
        className="w-72 p-0 bg-black border-2 border-gray-800 shadow-2xl rounded-xl overflow-hidden"
      >
        <div className="p-5 space-y-4">
          <div className="text-center">
            <div
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold border-2 ${
                currentlyOpen
                  ? "bg-green-400/10 text-green-400 border-green-400/50"
                  : "bg-red-400/10 text-red-400 border-red-400/50"
              }`}
            >
              <div className={`w-2 h-2 rounded-full ${currentlyOpen ? "bg-green-400" : "bg-red-400"} animate-pulse`} />
              {currentlyOpen ? "ACTUELLEMENT OUVERT" : "ACTUELLEMENT FERMÉ"}
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-bold text-center text-white tracking-wide">HORAIRES</h4>
            <div className="space-y-1">
              {daysOrder.map((day) => {
                const hours = openingHours[day as keyof typeof openingHours]
                const isToday = day === getCurrentDay()

                return (
                  <div
                    key={day}
                    className={`flex justify-between items-center py-2 px-3 rounded-lg border transition-all duration-200 ${
                      isToday
                        ? "bg-green-400/10 border-green-400/50 shadow-green-400/25"
                        : "bg-gray-900/50 border-gray-700/50 hover:border-gray-600/50"
                    } shadow-sm`}
                  >
                    <span
                      className={`text-sm uppercase font-semibold tracking-wide ${
                        isToday ? "text-green-400" : "text-gray-300"
                      }`}
                    >
                      {day}
                    </span>
                    <span className={`text-sm font-mono ${isToday ? "text-green-400 font-bold" : "text-gray-400"}`}>
                      {hours.open && hours.close ? `${hours.open} - ${hours.close}` : "FERMÉ"}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}
