"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/app/secteur/barber/[slug]/model3/components/ui/card"
import { Button } from "@/app/secteur/barber/[slug]/model3/components/ui/button"
import { Input } from "@/app/secteur/barber/[slug]/model3/components/ui/input"
import { Label } from "@/app/secteur/barber/[slug]/model3/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/secteur/barber/[slug]/model3/components/ui/select"
import { Calendar } from "@/app/secteur/barber/[slug]/model3/components/ui/calendar"
import { CheckCircle, CalendarIcon, Clock } from "lucide-react"

export default function BookingInline() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [isBooked, setIsBooked] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsBooked(true)
  }

  return (
    <section id="booking" className="py-6 bg-zinc-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5">
        <div className="absolute top-20 left-20 w-64 h-64 border border-orange-500 rotate-45"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-orange-500/20 rotate-12"></div>
      </div>

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-12 h-px bg-orange-500"></div>
            <span className="text-orange-500 font-bold uppercase tracking-wider text-sm">Réservation</span>
            <div className="w-12 h-px bg-orange-500"></div>
          </div>
          <h2 className="text-6xl md:text-7xl font-display font-black text-white leading-tight mb-6">
            BOOK
            <span className="block text-orange-500">YOUR SLOT</span>
          </h2>
          <p className="text-xl text-zinc-400 max-w-3xl mx-auto">
            Réservez votre créneau en quelques clics. Simple, rapide, efficace.
          </p>
        </div>

        <Card className="max-w-5xl mx-auto bg-zinc-800 border-2 border-zinc-700 text-white">
          <CardHeader className="text-center pb-8 border-b border-zinc-700">
            <CardTitle className="text-3xl font-display font-bold text-white">RÉSERVATION EN LIGNE</CardTitle>
            <p className="text-zinc-400 mt-2">Choisissez votre service et votre créneau préféré</p>
          </CardHeader>
          <CardContent className="p-8">
            {isBooked ? (
              <div className="text-center py-16 space-y-6">
                <div className="relative inline-block">
                  <CheckCircle className="h-24 w-24 text-green-500 mx-auto" />
                  <div className="absolute -inset-4 bg-green-500/20 blur-xl rounded-full"></div>
                </div>
                <h3 className="text-3xl font-display font-bold text-white">RÉSERVATION CONFIRMÉE !</h3>
                <p className="text-zinc-400 max-w-md mx-auto leading-relaxed">
                  Votre slot est réservé ! Vous recevrez un SMS de confirmation avec tous les détails.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
                  <Button
                    onClick={() => setIsBooked(false)}
                    className="bg-transparent border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white font-bold px-8 py-3"
                  >
                    NOUVELLE RÉSERVATION
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label
                        htmlFor="name"
                        className="text-zinc-300 font-bold text-sm uppercase tracking-wider mb-3 block"
                      >
                        Nom *
                      </Label>
                      <Input
                        id="name"
                        placeholder="Votre nom"
                        required
                        className="bg-zinc-900 border-2 border-zinc-700 focus:border-orange-500 text-white placeholder-zinc-500 h-12 rounded-none"
                      />
                    </div>
                    <div>
                      <Label
                        htmlFor="phone"
                        className="text-zinc-300 font-bold text-sm uppercase tracking-wider mb-3 block"
                      >
                        Téléphone *
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="06 12 34 56 78"
                        required
                        className="bg-zinc-900 border-2 border-zinc-700 focus:border-orange-500 text-white placeholder-zinc-500 h-12 rounded-none"
                      />
                    </div>
                  </div>

                  <div>
                    <Label
                      htmlFor="service"
                      className="text-zinc-300 font-bold text-sm uppercase tracking-wider mb-3 block"
                    >
                      Service *
                    </Label>
                    <Select required>
                      <SelectTrigger className="bg-zinc-900 border-2 border-zinc-700 focus:border-orange-500 text-white h-12 rounded-none">
                        <SelectValue placeholder="Choisissez votre service" />
                      </SelectTrigger>
                      <SelectContent className="bg-zinc-900 border-2 border-zinc-700 text-white rounded-none">
                        <SelectItem value="moderne">Coupe Moderne (35€)</SelectItem>
                        <SelectItem value="barbe">Barbe Design (28€)</SelectItem>
                        <SelectItem value="rasage">Rasage Premium (32€)</SelectItem>
                        <SelectItem value="complet">Pack Complet (65€)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label
                      htmlFor="time"
                      className="text-zinc-300 font-bold text-sm uppercase tracking-wider mb-3 block"
                    >
                      Créneau *
                    </Label>
                    <Select required>
                      <SelectTrigger className="bg-zinc-900 border-2 border-zinc-700 focus:border-orange-500 text-white h-12 rounded-none">
                        <SelectValue placeholder="Choisissez l'heure" />
                      </SelectTrigger>
                      <SelectContent className="bg-zinc-900 border-2 border-zinc-700 text-white rounded-none">
                        <SelectItem value="10:00">10:00</SelectItem>
                        <SelectItem value="11:30">11:30</SelectItem>
                        <SelectItem value="14:00">14:00</SelectItem>
                        <SelectItem value="15:30">15:30</SelectItem>
                        <SelectItem value="17:00">17:00</SelectItem>
                        <SelectItem value="18:30">18:30</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="bg-zinc-900 p-6 border-l-4 border-orange-500">
                    <h4 className="font-bold text-white mb-4 flex items-center gap-2">
                      <Clock className="h-5 w-5 text-orange-500" />
                      INFOS PRATIQUES
                    </h4>
                    <div className="space-y-2 text-sm text-zinc-400">
                      <p>• Mardi - Vendredi : 10h - 20h</p>
                      <p>• Samedi : 9h - 19h</p>
                      <p>• Dimanche - Lundi : Fermé</p>
                      <p>• Confirmation par SMS sous 2h</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-center space-y-8">
                  <div className="text-center">
                    <Label className="text-zinc-300 font-bold text-sm uppercase tracking-wider mb-4 flex items-center justify-center gap-2">
                      <CalendarIcon className="h-5 w-5 text-orange-500" />
                      Choisir la date
                    </Label>
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      className="rounded-none border-2 border-zinc-700 bg-zinc-900 p-4"
                      disabled={(day) => day < new Date() || day.getDay() === 0 || day.getDay() === 1}
                    />
                    <p className="text-zinc-500 text-sm mt-4">Fermé les dimanches et lundis</p>
                  </div>
                </div>

                <div className="lg:col-span-2 pt-8 border-t border-zinc-700">
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white font-display font-bold text-xl py-6 rounded-none border-2 border-orange-500 hover:border-orange-400 transition-all duration-300 transform hover:scale-105"
                  >
                    CONFIRMER LA RÉSERVATION
                  </Button>
                </div>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
