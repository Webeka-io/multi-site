"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/app/secteur/barber/[slug]/model4/components/ui/card"
import { Button } from "@/app/secteur/barber/[slug]/model4/components/ui/button"
import { Input } from "@/app/secteur/barber/[slug]/model4/components/ui/input"
import { Label } from "@/app/secteur/barber/[slug]/model4/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/secteur/barber/[slug]/model4/components/ui/select"
import { Calendar } from "@/app/secteur/barber/[slug]/model4/components/ui/calendar"
import { CheckCircle, CalendarIcon } from "lucide-react"

export default function BookingSimple() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [isBooked, setIsBooked] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsBooked(true)
  }

  return (
    <section id="booking" className="py-24 bg-white">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
              Réserver un
              <span className="font-medium"> Rendez-vous</span>
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">Choisissez votre service et votre créneau préféré</p>
          </div>

          <Card className="border-gray-100 shadow-sm">
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-2xl font-light text-gray-900">Nouvelle réservation</CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              {isBooked ? (
                <div className="text-center py-16 space-y-6">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-medium text-gray-900">Réservation confirmée !</h3>
                  <p className="text-gray-600 max-w-md mx-auto">
                    Votre rendez-vous a été enregistré. Vous recevrez une confirmation par email.
                  </p>
                  <Button
                    onClick={() => setIsBooked(false)}
                    variant="outline"
                    className="border-gray-300 text-gray-700 hover:bg-gray-50"
                  >
                    Nouvelle réservation
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName" className="text-gray-700 font-medium mb-2 block">
                          Prénom
                        </Label>
                        <Input
                          id="firstName"
                          placeholder="Jean"
                          required
                          className="border-gray-300 focus:border-gray-900 focus:ring-gray-900/10 rounded-lg"
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName" className="text-gray-700 font-medium mb-2 block">
                          Nom
                        </Label>
                        <Input
                          id="lastName"
                          placeholder="Dupont"
                          required
                          className="border-gray-300 focus:border-gray-900 focus:ring-gray-900/10 rounded-lg"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="phone" className="text-gray-700 font-medium mb-2 block">
                        Téléphone
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="06 12 34 56 78"
                        required
                        className="border-gray-300 focus:border-gray-900 focus:ring-gray-900/10 rounded-lg"
                      />
                    </div>

                    <div>
                      <Label htmlFor="service" className="text-gray-700 font-medium mb-2 block">
                        Service
                      </Label>
                      <Select required>
                        <SelectTrigger className="border-gray-300 focus:border-gray-900 focus:ring-gray-900/10 rounded-lg">
                          <SelectValue placeholder="Choisissez un service" />
                        </SelectTrigger>
                        <SelectContent className="bg-white border-gray-200 rounded-lg">
                          <SelectItem value="coupe">Coupe Moderne (35€)</SelectItem>
                          <SelectItem value="barbe">Taille de Barbe (25€)</SelectItem>
                          <SelectItem value="rasage">Rasage Complet (30€)</SelectItem>
                          <SelectItem value="complet">Service Complet (70€)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="time" className="text-gray-700 font-medium mb-2 block">
                        Heure
                      </Label>
                      <Select required>
                        <SelectTrigger className="border-gray-300 focus:border-gray-900 focus:ring-gray-900/10 rounded-lg">
                          <SelectValue placeholder="Choisissez une heure" />
                        </SelectTrigger>
                        <SelectContent className="bg-white border-gray-200 rounded-lg">
                          <SelectItem value="09:00">09:00</SelectItem>
                          <SelectItem value="10:00">10:00</SelectItem>
                          <SelectItem value="11:00">11:00</SelectItem>
                          <SelectItem value="14:00">14:00</SelectItem>
                          <SelectItem value="15:00">15:00</SelectItem>
                          <SelectItem value="16:00">16:00</SelectItem>
                          <SelectItem value="17:00">17:00</SelectItem>
                          <SelectItem value="18:00">18:00</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex flex-col items-center">
                    <Label className="text-gray-700 font-medium mb-4 flex items-center gap-2">
                      <CalendarIcon className="h-4 w-4" />
                      Date
                    </Label>
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      className="rounded-lg border border-gray-300 bg-white"
                      disabled={(day) => day < new Date() || day.getDay() === 0}
                    />
                    <p className="text-sm text-gray-500 mt-4">Fermé le dimanche</p>
                  </div>

                  <div className="lg:col-span-2 pt-6 mx-auto">
                    <Button
                      type="submit"
                      size="lg"
                      className=" bg-gray-900 hover:bg-gray-800 text-white font-medium py-4 rounded-lg"
                    >
                      Confirmer la réservation
                    </Button>
                  </div>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
