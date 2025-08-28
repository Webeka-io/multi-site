"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/app/(project)/templates/widgets/opening-hour/components/ui/badge"
import { Button } from "@/app/(project)/templates/widgets/opening-hour/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/app/(project)/templates/widgets/opening-hour/components/ui/popover"
import { Separator } from "@/app/(project)/templates/widgets/opening-hour/components/ui/separator"
import { Clock, Store, Navigation, Smartphone, ChevronDown } from "lucide-react"

interface OpeningHours {
  day: string
  hours: string
  isToday?: boolean
  isClosed?: boolean
}

interface StoreInfo {
  name: string
  address: string
  phone: string
  hours: OpeningHours[]
}

export function OpeningHoursNavbar() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [isOpen, setIsOpen] = useState(false)
  const [popoverOpen, setPopoverOpen] = useState(false)

  const storeInfo: StoreInfo = {
    name: "Épicerie du Quartier",
    address: "123 Rue de la Paix, 75001 Paris",
    phone: "01 23 45 67 89",
    hours: [
      { day: "Lundi", hours: "8h00 - 20h00" },
      { day: "Mardi", hours: "8h00 - 20h00" },
      { day: "Mercredi", hours: "8h00 - 20h00" },
      { day: "Jeudi", hours: "8h00 - 20h00" },
      { day: "Vendredi", hours: "8h00 - 20h00" },
      { day: "Samedi", hours: "8h00 - 19h00" },
      { day: "Dimanche", hours: "9h00 - 13h00" },
    ],
  }

  const checkIfOpen = () => {
    const now = new Date()
    const currentDay = now.getDay()
    const currentHour = now.getHours()
    const currentMinute = now.getMinutes()
    const currentTimeInMinutes = currentHour * 60 + currentMinute

    const dayMapping = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"]
    const todayName = dayMapping[currentDay]

    const todayHours = storeInfo.hours.find((h) => h.day === todayName)

    if (!todayHours || todayHours.isClosed) {
      return false
    }

    const hoursMatch = todayHours.hours.match(/(\d+)h(\d+)\s*-\s*(\d+)h(\d+)/)
    if (!hoursMatch) return false

    const openHour = Number.parseInt(hoursMatch[1])
    const openMinute = Number.parseInt(hoursMatch[2])
    const closeHour = Number.parseInt(hoursMatch[3])
    const closeMinute = Number.parseInt(hoursMatch[4])

    const openTimeInMinutes = openHour * 60 + openMinute
    const closeTimeInMinutes = closeHour * 60 + closeMinute

    return currentTimeInMinutes >= openTimeInMinutes && currentTimeInMinutes < closeTimeInMinutes
  }

  const getHoursWithToday = () => {
    const now = new Date()
    const currentDay = now.getDay()
    const dayMapping = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"]
    const todayName = dayMapping[currentDay]

    return storeInfo.hours.map((hour) => ({
      ...hour,
      isToday: hour.day === todayName,
    }))
  }

  const getTodayHours = () => {
    const hoursWithToday = getHoursWithToday()
    return hoursWithToday.find((h) => h.isToday)
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
      setIsOpen(checkIfOpen())
    }, 60000)

    setIsOpen(checkIfOpen())

    return () => clearInterval(timer)
  }, [])

  const formatCurrentTime = () => {
    return currentTime.toLocaleTimeString("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const todayHours = getTodayHours()

  return (
    <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className="group relative h-auto px-2 sm:px-3 py-2 hover:bg-muted/30 transition-all duration-200 border-0"
        >
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Status indicator */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              <div
                className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all duration-300 ${
                  isOpen
                    ? "bg-emerald-500 shadow-sm shadow-emerald-500/30"
                    : "bg-slate-400 shadow-sm shadow-slate-400/30"
                }`}
              />
              <Store className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-muted-foreground/80 group-hover:text-foreground transition-colors" />
            </div>

            {/* Store info */}
            <div className="flex flex-col items-start min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="text-xs sm:text-sm font-medium text-foreground/90 truncate">
                  {isOpen ? "Ouvert" : "Fermé"}
                </span>
                <Badge
                  variant="outline"
                  className={`text-[10px] sm:text-xs px-1.5 sm:px-2 py-0 border-0 font-medium transition-colors ${
                    isOpen
                      ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400"
                      : "bg-slate-50 text-slate-600 dark:bg-slate-900/50 dark:text-slate-400"
                  }`}
                >
                  <span className="hidden sm:inline">{todayHours?.hours || "Voir horaires"}</span>
                  <span className="sm:hidden">{todayHours ? todayHours.hours.split(" - ")[0] : "•••"}</span>
                </Badge>
              </div>
              <span className="hidden xs:block text-[10px] sm:text-xs text-muted-foreground/70 font-mono">
                {formatCurrentTime()}
              </span>
            </div>

            <ChevronDown
              className={`h-3 w-3 text-muted-foreground/60 transition-all duration-200 ${
                popoverOpen ? "rotate-180 text-muted-foreground" : ""
              }`}
            />
          </div>
        </Button>
      </PopoverTrigger>

      <PopoverContent
        className="w-72 sm:w-80 p-0 bg-background/98 backdrop-blur-md border border-border/50 shadow-lg"
        align="end"
        sideOffset={8}
      >
        <div className="p-3 sm:p-4 space-y-3 sm:space-y-4">
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center gap-2">
              <Store className="h-4 w-4 sm:h-5 sm:w-5 text-foreground/80" />
              <h3 className="font-semibold text-base sm:text-lg text-foreground/90">{storeInfo.name}</h3>
            </div>

            <div
              className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium border transition-colors ${
                isOpen
                  ? "bg-emerald-50 text-emerald-700 border-emerald-200/50 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-800/30"
                  : "bg-slate-50 text-slate-600 border-slate-200/50 dark:bg-slate-900/30 dark:text-slate-400 dark:border-slate-700/30"
              }`}
            >
              <div className={`w-1.5 h-1.5 rounded-full ${isOpen ? "bg-emerald-500" : "bg-slate-400"}`} />
              {isOpen ? "Ouvert maintenant" : "Fermé"}
            </div>
          </div>

          <Separator className="bg-border/50" />

          {/* Today's hours highlighted */}
          {todayHours && (
            <div className="bg-muted/30 rounded-lg p-3 border border-border/30">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Clock className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-foreground/70" />
                  <span className="font-medium text-sm text-foreground/90">Aujourd'hui</span>
                </div>
                <span className="font-mono text-xs sm:text-sm font-semibold text-foreground/80">
                  {todayHours.hours}
                </span>
              </div>
            </div>
          )}

          {/* All hours */}
          <div className="space-y-2 max-h-44 sm:max-h-48 overflow-y-auto">
            <h4 className="text-xs font-medium text-muted-foreground/80 uppercase tracking-wide">Tous les horaires</h4>
            {getHoursWithToday().map((schedule, index) => (
              <div
                key={index}
                className={`flex justify-between items-center py-2 px-2.5 sm:px-3 rounded-md transition-colors ${
                  schedule.isToday ? "bg-muted/40 text-foreground/90" : "hover:bg-muted/20 text-foreground/80"
                }`}
              >
                <span className={`text-xs sm:text-sm ${schedule.isToday ? "font-medium" : ""}`}>{schedule.day}</span>
                <span
                  className={`text-xs sm:text-sm font-mono ${
                    schedule.isClosed
                      ? "text-destructive/80"
                      : schedule.isToday
                        ? "font-semibold text-foreground/90"
                        : "text-muted-foreground/70"
                  }`}
                >
                  {schedule.isClosed ? "Fermé" : schedule.hours}
                </span>
              </div>
            ))}
          </div>

          <Separator className="bg-border/50" />

          {/* Quick actions */}
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              size="sm"
              className="h-auto p-2.5 sm:p-3 hover:bg-blue-50/50 hover:border-blue-200/50 dark:hover:bg-blue-950/20 bg-transparent border-border/50 transition-colors"
              asChild
            >
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(storeInfo.address)}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Navigation className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1.5 sm:mr-2 text-blue-500/80" />
                <div className="text-left">
                  <div className="text-xs font-medium text-foreground/80">Itinéraire</div>
                </div>
              </a>
            </Button>

            <Button
              variant="outline"
              size="sm"
              className="h-auto p-2.5 sm:p-3 hover:bg-green-50/50 hover:border-green-200/50 dark:hover:bg-green-950/20 bg-transparent border-border/50 transition-colors"
              asChild
            >
              <a href={`tel:${storeInfo.phone}`}>
                <Smartphone className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1.5 sm:mr-2 text-green-500/80" />
                <div className="text-left">
                  <div className="text-xs font-medium text-foreground/80">Appeler</div>
                </div>
              </a>
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
