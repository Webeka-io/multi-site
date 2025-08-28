"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/app/(project)/templates/widgets/opening-hour/components/ui/badge"
import { Button } from "@/app/(project)/templates/widgets/opening-hour/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/app/(project)/templates/widgets/opening-hour/components/ui/popover"
import { Separator } from "@/app/(project)/templates/widgets/opening-hour/components/ui/separator"
import { Clock, MapPin, Phone, ChevronRight, Dot } from "lucide-react"

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

export function OpeningHoursNavbarAlt() {
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

  const getNextOpenDay = () => {
    const hoursWithToday = getHoursWithToday()
    const todayIndex = hoursWithToday.findIndex((h) => h.isToday)

    for (let i = 1; i <= 7; i++) {
      const nextIndex = (todayIndex + i) % 7
      const nextDay = hoursWithToday[nextIndex]
      if (!nextDay.isClosed) {
        return nextDay
      }
    }
    return null
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
      setIsOpen(checkIfOpen())
    }, 60000)

    setIsOpen(checkIfOpen())

    return () => clearInterval(timer)
  }, [])

  const todayHours = getTodayHours()
  const nextOpenDay = getNextOpenDay()

  return (
    <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className="group h-auto px-3 py-2 hover:bg-accent/50 transition-all duration-300 rounded-lg border border-transparent hover:border-border/30"
        >
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="relative">
                <Dot
                  className={`h-6 w-6 transition-all duration-500 ${
                    isOpen ? "text-green-500 animate-pulse" : "text-red-500"
                  }`}
                />
                <div
                  className={`absolute inset-0 rounded-full transition-all duration-500 ${
                    isOpen ? "bg-green-500/10 animate-ping" : "bg-red-500/10"
                  }`}
                />
              </div>

              <div className="text-left">
                <div
                  className={`text-sm font-semibold transition-colors ${
                    isOpen ? "text-green-700 dark:text-green-400" : "text-red-700 dark:text-red-400"
                  }`}
                >
                  {isOpen ? "Ouvert" : "Fermé"}
                </div>
                <div className="text-xs text-muted-foreground font-mono">
                  {todayHours?.hours || (nextOpenDay ? `Ouvre ${nextOpenDay.day}` : "Voir horaires")}
                </div>
              </div>
            </div>

            <ChevronRight className="h-4 w-4 text-muted-foreground/60 group-hover:text-muted-foreground transition-all duration-200 group-hover:translate-x-0.5" />
          </div>
        </Button>
      </PopoverTrigger>

      <PopoverContent
        className="w-80 p-0 bg-card/95 backdrop-blur-xl border shadow-xl rounded-xl"
        align="end"
        sideOffset={12}
      >
        <div className="p-6 space-y-5">
          {/* Header with store name and current status */}
          <div className="text-center space-y-3">
            <h3 className="text-lg font-bold text-foreground">{storeInfo.name}</h3>

            <div
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                isOpen
                  ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 shadow-green-500/20 shadow-lg"
                  : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 shadow-red-500/20 shadow-lg"
              }`}
            >
              <div className={`w-2 h-2 rounded-full ${isOpen ? "bg-green-500" : "bg-red-500"}`} />
              {isOpen ? "Ouvert maintenant" : "Fermé"}
              {!isOpen && nextOpenDay && <span className="text-xs opacity-75">• Ouvre {nextOpenDay.day}</span>}
            </div>
          </div>

          <Separator />

          {/* Today's hours in focus */}
          {todayHours && (
            <div className="bg-accent/30 rounded-lg p-4 border border-accent/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary" />
                  <span className="font-semibold text-foreground">Aujourd'hui</span>
                </div>
                <Badge variant="outline" className="font-mono font-semibold">
                  {todayHours.hours}
                </Badge>
              </div>
            </div>
          )}

          {/* Compact hours grid */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-muted-foreground">Horaires de la semaine</h4>
            <div className="grid gap-2">
              {getHoursWithToday().map((schedule, index) => (
                <div
                  key={index}
                  className={`flex justify-between items-center py-2 px-3 rounded-md transition-all duration-200 ${
                    schedule.isToday ? "bg-primary/10 border border-primary/20" : "hover:bg-accent/50"
                  }`}
                >
                  <span className={`text-sm ${schedule.isToday ? "font-semibold text-primary" : "text-foreground/80"}`}>
                    {schedule.day}
                  </span>
                  <span
                    className={`text-sm font-mono ${
                      schedule.isClosed
                        ? "text-destructive"
                        : schedule.isToday
                          ? "font-bold text-primary"
                          : "text-muted-foreground"
                    }`}
                  >
                    {schedule.isClosed ? "Fermé" : schedule.hours}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Contact actions */}
          <div className="space-y-2">
            <Button
              variant="outline"
              className="w-full justify-start h-auto p-3 hover:bg-blue-50 hover:border-blue-200 dark:hover:bg-blue-950/20 bg-transparent"
              asChild
            >
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(storeInfo.address)}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MapPin className="h-4 w-4 mr-3 text-blue-500" />
                <div className="text-left">
                  <div className="font-medium text-sm">Voir sur la carte</div>
                  <div className="text-xs text-muted-foreground">{storeInfo.address}</div>
                </div>
              </a>
            </Button>

            <Button
              variant="outline"
              className="w-full justify-start h-auto p-3 hover:bg-green-50 hover:border-green-200 dark:hover:bg-green-950/20 bg-transparent"
              asChild
            >
              <a href={`tel:${storeInfo.phone}`}>
                <Phone className="h-4 w-4 mr-3 text-green-500" />
                <div className="text-left">
                  <div className="font-medium text-sm">Appeler le magasin</div>
                  <div className="text-xs text-muted-foreground font-mono">{storeInfo.phone}</div>
                </div>
              </a>
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
