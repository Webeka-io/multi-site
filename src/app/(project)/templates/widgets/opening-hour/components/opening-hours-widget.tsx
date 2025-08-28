"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/app/(project)/templates/widgets/opening-hour/components/ui/card"
import { Badge } from "@/app/(project)/templates/widgets/opening-hour/components/ui/badge"
import { Button } from "@/app/(project)/templates/widgets/opening-hour/components/ui/button"
import { Separator } from "@/app/(project)/templates/widgets/opening-hour/components/ui/separator"
import { Clock, Store, Calendar, ChevronDown, Navigation, Smartphone } from "lucide-react"

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

export function OpeningHoursWidget() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [isOpen, setIsOpen] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [hoveredDay, setHoveredDay] = useState<string | null>(null)

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
    const currentDay = now.getDay() // 0 = Dimanche, 1 = Lundi, etc.
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

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="relative mb-4">
        <div
          className={`absolute -top-2 left-1/2 transform -translate-x-1/2 z-10 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-500 ${
            isOpen
              ? "bg-gradient-to-r from-emerald-400 to-emerald-600 text-white shadow-lg shadow-emerald-500/30 animate-pulse"
              : "bg-gradient-to-r from-red-400 to-red-600 text-white shadow-lg shadow-red-500/30"
          }`}
        >
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${isOpen ? "bg-white animate-ping" : "bg-white/80"}`} />
            {isOpen ? "OUVERT MAINTENANT" : "FERMÉ"}
          </div>
        </div>
      </div>

      <Card className="bg-gradient-to-br from-background via-background to-muted/20 backdrop-blur-xl border-0 shadow-2xl shadow-black/10 hover:shadow-3xl transition-all duration-500 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 pointer-events-none" />

        <CardHeader className="relative text-center pb-8 pt-12">
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full animate-pulse" />
              <div className="relative p-4 rounded-full bg-gradient-to-br from-primary/10 to-secondary/10 backdrop-blur-sm border border-white/20">
                <Store className="h-8 w-8 text-primary" />
              </div>
            </div>
          </div>

          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent mb-4">
            {storeInfo.name}
          </CardTitle>

          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-muted/50 backdrop-blur-sm border border-white/10">
              <Clock className="h-4 w-4 text-primary animate-pulse" />
              <span className="text-sm font-mono font-semibold">{formatCurrentTime()}</span>
            </div>
          </div>

          <Button
            variant="ghost"
            size="lg"
            onClick={() => setIsExpanded(!isExpanded)}
            className="group relative overflow-hidden bg-gradient-to-r from-muted/30 to-muted/10 hover:from-muted/50 hover:to-muted/20 border border-white/10 backdrop-blur-sm transition-all duration-300 hover:scale-105"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <Calendar className="h-4 w-4 mr-2 relative z-10" />
            <span className="relative z-10 font-medium">
              {isExpanded ? "Masquer les horaires" : "Voir tous les horaires"}
            </span>
            <ChevronDown
              className={`h-4 w-4 ml-2 relative z-10 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
            />
          </Button>
        </CardHeader>

        <CardContent className="relative space-y-8 pb-8">
          <div
            className={`transition-all duration-500 ease-out overflow-hidden ${
              isExpanded ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="space-y-4">
              <h3 className="font-bold text-lg bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                Horaires d'ouverture
              </h3>

              <div className="grid gap-2">
                {getHoursWithToday().map((schedule, index) => (
                  <div
                    key={index}
                    onMouseEnter={() => setHoveredDay(schedule.day)}
                    onMouseLeave={() => setHoveredDay(null)}
                    className={`group relative overflow-hidden rounded-xl p-4 transition-all duration-300 cursor-default ${
                      schedule.isToday
                        ? "bg-gradient-to-r from-primary/15 to-secondary/10 border-2 border-primary/30 shadow-lg shadow-primary/10"
                        : "bg-gradient-to-r from-muted/30 to-muted/10 hover:from-muted/50 hover:to-muted/20 border border-white/10"
                    } ${hoveredDay === schedule.day ? "scale-[1.02] shadow-xl" : ""}`}
                  >
                    {schedule.isToday && (
                      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 animate-pulse" />
                    )}

                    <div className="relative flex justify-between items-center">
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-1 h-10 rounded-full transition-all duration-300 ${
                            schedule.isToday ? "bg-gradient-to-b from-primary to-secondary shadow-lg" : "bg-muted"
                          }`}
                        />
                        <div>
                          <span
                            className={`font-semibold text-base ${
                              schedule.isToday ? "text-primary" : "text-foreground"
                            }`}
                          >
                            {schedule.day}
                          </span>
                          {schedule.isToday && (
                            <Badge className="ml-3 bg-gradient-to-r from-primary to-secondary text-white border-0 shadow-lg">
                              Aujourd'hui
                            </Badge>
                          )}
                        </div>
                      </div>
                      <span
                        className={`font-mono font-bold text-sm ${
                          schedule.isClosed
                            ? "text-destructive"
                            : schedule.isToday
                              ? "text-primary"
                              : "text-muted-foreground"
                        }`}
                      >
                        {schedule.isClosed ? "Fermé" : schedule.hours}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <Separator className="bg-gradient-to-r from-transparent via-border to-transparent" />

          <div className="space-y-4">
            <h3 className="font-bold text-lg bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent uppercase tracking-wide">
              Contact & Localisation
            </h3>

            <div className="grid gap-3">
              <Button
                variant="ghost"
                size="lg"
                className="group relative overflow-hidden h-auto p-4 bg-gradient-to-r from-muted/30 to-muted/10 hover:from-muted/50 hover:to-muted/20 border border-white/10 backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
                asChild
              >
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(storeInfo.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <Navigation className="h-5 w-5 mr-4 text-blue-500 flex-shrink-0 relative z-10 group-hover:scale-110 transition-transform duration-300" />
                  <div className="flex-1 text-left relative z-10">
                    <div className="font-medium text-foreground">Itinéraire</div>
                    <div className="text-sm text-muted-foreground">{storeInfo.address}</div>
                  </div>
                  <ChevronDown className="h-4 w-4 -rotate-90 text-muted-foreground relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
                </a>
              </Button>

              <Button
                variant="ghost"
                size="lg"
                className="group relative overflow-hidden h-auto p-4 bg-gradient-to-r from-muted/30 to-muted/10 hover:from-muted/50 hover:to-muted/20 border border-white/10 backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
                asChild
              >
                <a href={`tel:${storeInfo.phone}`}>
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <Smartphone className="h-5 w-5 mr-4 text-green-500 flex-shrink-0 relative z-10 group-hover:scale-110 transition-transform duration-300" />
                  <div className="flex-1 text-left relative z-10">
                    <div className="font-medium text-foreground">Appeler</div>
                    <div className="text-sm text-muted-foreground font-mono">{storeInfo.phone}</div>
                  </div>
                  <ChevronDown className="h-4 w-4 -rotate-90 text-muted-foreground relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
                </a>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
