"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/secteur/barber/[slug]/model6/components/ui/card"
import { Button } from "@/app/secteur/barber/[slug]/model6/components/ui/button"
import { Input } from "@/app/secteur/barber/[slug]/model6/components/ui/input"
import { Label } from "@/app/secteur/barber/[slug]/model6/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/secteur/barber/[slug]/model6/components/ui/select"
import { Calendar } from "@/app/secteur/barber/[slug]/model6/components/ui/calendar"
import { CheckCircle } from "lucide-react"

export default function BookingSection() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [isBooked, setIsBooked] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsBooked(true)
  }

  return (
    <section id="booking" className="py-20 md:py-32 bg-gray-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white">Réservez Votre Place</h2>
          <p className="mt-4 text-lg text-gray-400">Simple, rapide et garanti.</p>
        </div>
        <Card className="max-w-4xl mx-auto bg-gray-800 border-gray-700 text-white">
          <CardHeader>
            <CardTitle className="text-3xl font-serif">Prendre Rendez-vous</CardTitle>
            <CardDescription className="text-gray-400">
              Choisissez votre service et le moment qui vous convient.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isBooked ? (
              <div className="text-center py-12 flex flex-col items-center gap-4">
                <CheckCircle className="h-16 w-16 text-green-500" />
                <h3 className="text-2xl font-bold text-white">Confirmation</h3>
                <p className="text-gray-300">
                  Votre rendez-vous a été confirmé ! Vous recevrez bientôt un SMS de rappel.
                </p>
                <Button
                  onClick={() => setIsBooked(false)}
                  className="mt-4 bg-amber-500 hover:bg-amber-600 text-gray-900"
                >
                  Nouvelle Réservation
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="name" className="text-gray-300">
                      Nom Complet
                    </Label>
                    <Input
                      id="name"
                      placeholder="ex: Jean Dupont"
                      required
                      className="bg-gray-700 border-gray-600 text-white focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="text-gray-300">
                      Téléphone
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="06 12 34 56 78"
                      required
                      className="bg-gray-700 border-gray-600 text-white focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <Label htmlFor="service" className="text-gray-300">
                      Service
                    </Label>
                    <Select required>
                      <SelectTrigger
                        id="service"
                        className="bg-gray-700 border-gray-600 text-white focus:border-amber-500"
                      >
                        <SelectValue placeholder="Choisissez un service" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700 text-white">
                        <SelectItem value="haircut">Coupe de Cheveux (35€)</SelectItem>
                        <SelectItem value="beard">Taille de Barbe (25€)</SelectItem>
                        <SelectItem value="shave">Rasage Serviette Chaude (40€)</SelectItem>
                        <SelectItem value="full">Forfait Complet (70€)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="time" className="text-gray-300">
                      Heure
                    </Label>
                    <Select required>
                      <SelectTrigger
                        id="time"
                        className="bg-gray-700 border-gray-600 text-white focus:border-amber-500"
                      >
                        <SelectValue placeholder="Choisissez une heure" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700 text-white">
                        <SelectItem value="10:00">10:00</SelectItem>
                        <SelectItem value="11:00">11:00</SelectItem>
                        <SelectItem value="14:00">14:00</SelectItem>
                        <SelectItem value="15:00">15:00</SelectItem>
                        <SelectItem value="16:00">16:00</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  <Label className="text-gray-300 mb-2">Date</Label>
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border border-gray-600 bg-gray-700/50 p-2"
                    disabled={(day) => day < new Date() || day.getDay() === 0 || day.getDay() === 1}
                  />
                </div>
                <div className="md:col-span-2">
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-amber-500 hover:bg-amber-600 text-gray-900 font-bold text-lg"
                  >
                    Confirmer la Réservation
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
