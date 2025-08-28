"use client"

import { useState, useEffect } from "react"
import { Clock, ChevronDown } from "lucide-react"
import { Button } from "@/app/(project)/templates/widgets/opening-hour/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/app/(project)/templates/widgets/opening-hour/components/ui/dropdown-menu"

const OPENING_HOURS = {
  lundi: { open: "09:00", close: "18:00" },
  mardi: { open: "09:00", close: "18:00" },
  mercredi: { open: "09:00", close: "18:00" },
  jeudi: { open: "09:00", close: "19:00" },
  vendredi: { open: "09:00", close: "19:00" },
  samedi: { open: "09:00", close: "17:00" },
  dimanche: null, // Fermé
}

export function OpeningHoursNavbarMinimal() {
  const [isOpen, setIsOpen] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000)
    return () => clearInterval(timer)
  }, [])

  const getCurrentStatus = () => {
    const now = currentTime
    const dayNames = ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"]
    const currentDay = dayNames[now.getDay()]
    const currentHours = OPENING_HOURS[currentDay as keyof typeof OPENING_HOURS]

    if (!currentHours) return { isOpen: false, message: "Fermé" }

    const currentTimeStr = now.toTimeString().slice(0, 5)
    const isCurrentlyOpen = currentTimeStr >= currentHours.open && currentTimeStr <= currentHours.close

    return {
      isOpen: isCurrentlyOpen,
      message: isCurrentlyOpen ? "Ouvert" : "Fermé",
    }
  }

  const status = getCurrentStatus()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2 text-sm">
          <Clock className="h-4 w-4" />
          <span className={`font-medium ${status.isOpen ? "text-green-600" : "text-red-600"}`}>{status.message}</span>
          <ChevronDown className="h-3 w-3" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64 p-4">
        <div className="space-y-3">
          <div className="text-center">
            <div
              className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${
                status.isOpen
                  ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                  : "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
              }`}
            >
              <div className={`w-2 h-2 rounded-full ${status.isOpen ? "bg-green-500" : "bg-red-500"}`} />
              {status.message}
            </div>
          </div>

          <div className="space-y-1 text-sm">
            {Object.entries(OPENING_HOURS).map(([day, hours]) => (
              <div key={day} className="flex justify-between">
                <span className="capitalize text-muted-foreground">{day}</span>
                <span className="font-mono">{hours ? `${hours.open} - ${hours.close}` : "Fermé"}</span>
              </div>
            ))}
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
