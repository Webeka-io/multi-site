"use client"

import { useState, useEffect } from "react"
import { Clock } from "lucide-react"
import { Button } from "@/app/(project)/templates/widgets/opening-hour/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/app/(project)/templates/widgets/opening-hour/components/ui/tooltip"

const OPENING_HOURS = {
  lundi: { open: "09:00", close: "18:00" },
  mardi: { open: "09:00", close: "18:00" },
  mercredi: { open: "09:00", close: "18:00" },
  jeudi: { open: "09:00", close: "19:00" },
  vendredi: { open: "09:00", close: "19:00" },
  samedi: { open: "09:00", close: "17:00" },
  dimanche: null,
}

export function OpeningHoursNavbarCompact() {
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

    if (!currentHours) return { isOpen: false, message: "Fermé", nextOpen: "Lundi 09:00" }

    const currentTimeStr = now.toTimeString().slice(0, 5)
    const isCurrentlyOpen = currentTimeStr >= currentHours.open && currentTimeStr <= currentHours.close

    return {
      isOpen: isCurrentlyOpen,
      message: isCurrentlyOpen ? "Ouvert" : "Fermé",
      nextOpen: isCurrentlyOpen ? `Ferme à ${currentHours.close}` : `Ouvre à ${currentHours.open}`,
    }
  }

  const status = getCurrentStatus()

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="sm" className="gap-2 px-3">
            <div className={`w-2 h-2 rounded-full ${status.isOpen ? "bg-green-500" : "bg-red-500"} animate-pulse`} />
            <Clock className="h-4 w-4" />
            <span className="text-sm font-medium hidden sm:inline">{status.message}</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom" className="max-w-xs">
          <div className="space-y-2">
            <div className="font-medium">Actuellement {status.message.toLowerCase()}</div>
            <div className="text-sm text-muted-foreground">{status.nextOpen}</div>
            <div className="text-xs space-y-1 pt-2 border-t">
              <div>📍 123 Rue du Commerce</div>
              <div>📞 01 23 45 67 89</div>
            </div>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
