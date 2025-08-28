"use client"

import { useState, useEffect } from "react"
import { Clock, MapPin, Phone } from "lucide-react"
import { Badge } from "@/app/(project)/templates/widgets/opening-hour/components/ui/badge"
import { Button } from "@/app/(project)/templates/widgets/opening-hour/components/ui/button"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/app/(project)/templates/widgets/opening-hour/components/ui/hover-card"

const OPENING_HOURS = {
  lundi: { open: "09:00", close: "18:00" },
  mardi: { open: "09:00", close: "18:00" },
  mercredi: { open: "09:00", close: "18:00" },
  jeudi: { open: "09:00", close: "19:00" },
  vendredi: { open: "09:00", close: "19:00" },
  samedi: { open: "09:00", close: "17:00" },
  dimanche: null,
}

export function OpeningHoursNavbarBadge() {
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
    <HoverCard>
      <HoverCardTrigger asChild>
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <Badge
            variant={status.isOpen ? "default" : "secondary"}
            className={`${
              status.isOpen ? "bg-green-500 hover:bg-green-600 text-white" : "bg-gray-500 hover:bg-gray-600 text-white"
            } cursor-pointer transition-colors`}
          >
            {status.message}
          </Badge>
        </div>
      </HoverCardTrigger>
      <HoverCardContent className="w-80" align="end">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${status.isOpen ? "bg-green-500" : "bg-red-500"} animate-pulse`} />
            <span className="font-semibold">Actuellement {status.message.toLowerCase()}</span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-sm">
            {Object.entries(OPENING_HOURS).map(([day, hours]) => (
              <div key={day} className="flex justify-between py-1">
                <span className="capitalize text-muted-foreground">{day.slice(0, 3)}</span>
                <span className="font-mono text-xs">{hours ? `${hours.open}-${hours.close}` : "Fermé"}</span>
              </div>
            ))}
          </div>

          <div className="flex gap-2 pt-2 border-t">
            <Button size="sm" variant="outline" className="flex-1 gap-1 bg-transparent">
              <MapPin className="h-3 w-3" />
              Plan
            </Button>
            <Button size="sm" variant="outline" className="flex-1 gap-1 bg-transparent">
              <Phone className="h-3 w-3" />
              Appeler
            </Button>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}
