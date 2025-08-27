"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/app/secteur/barber/[slug]/model5/components/ui/card"
import { Button } from "@/app/secteur/barber/[slug]/model5/components/ui/button"
import { Input } from "@/app/secteur/barber/[slug]/model5/components/ui/input"
import { Label } from "@/app/secteur/barber/[slug]/model5/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/secteur/barber/[slug]/model5/components/ui/select"
import { Calendar } from "@/app/secteur/barber/[slug]/model5/components/ui/calendar"
import { Textarea } from "@/app/secteur/barber/[slug]/model5/components/ui/textarea"
import { CheckCircle, CalendarIcon, Clock, User } from "lucide-react"

export default function ReservationSection() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [isBooked, setIsBooked] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsBooked(true)
  }

  return (
    <section id="reservation" className="py-32 bg-stone-100">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="text-center mb-20">
          <p className="text-amber-600 font-medium tracking-wider uppercase text-sm mb-4">Réservation</p>
          <h2 className="text-5xl md:text-6xl font-serif font-light text-stone-900 leading-tight mb-6">
            Réservez Votre
            <span className="block font-normal italic">Moment d'Exception</span>
          </h2>
          <div className="w-16 h-px bg-amber-600 mx-auto mb-8"></div>
          <p className="text-xl text-stone-600 max-w-3xl mx-auto leading-relaxed">
            Prenez rendez-vous pour une expérience sur mesure
          </p>
        </div>

        <Card className="max-w-5xl mx-auto bg-white border-0 shadow-xl">
          <CardHeader className="text-center pb-8">
            <CardTitle className="text-3xl font-serif font-light text-stone-900">Prendre Rendez-vous</CardTitle>
            <p className="text-stone-600 mt-2">Nous vous contacterons pour confirmer votre réservation</p>
          </CardHeader>
          <CardContent className="p-8">
            {isBooked ? (
              <div className="text-center py-16 space-y-6">
                <div className="relative inline-block">
                  <CheckCircle className="h-20 w-20 text-green-600 mx-auto" />
                  <div className="absolute -inset-2 bg-green-600/10 blur-xl rounded-full"></div>
                </div>
                <h3 className="text-3xl font-serif font-light text-stone-900">Demande Envoyée</h3>
                <p className="text-stone-600 max-w-md mx-auto leading-relaxed">
                  Votre demande de rendez-vous a été transmise avec succès. Nous vous contacterons dans les plus brefs
                  délais pour confirmer votre réservation.
                </p>
                <Button
                  onClick={() => setIsBooked(false)}
                  className="bg-amber-600 hover:bg-amber-700 text-white font-medium px-8 py-3 rounded-full mt-8"
                >
                  Nouvelle Demande
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="firstName" className="text-stone-700 font-medium mb-2 block">
                        Prénom *
                      </Label>
                      <Input
                        id="firstName"
                        placeholder="Jean"
                        required
                        className="border-stone-300 focus:border-amber-600 focus:ring-amber-600/20 rounded-lg h-12"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName" className="text-stone-700 font-medium mb-2 block">
                        Nom *
                      </Label>
                      <Input
                        id="lastName"
                        placeholder="Dupont"
                        required
                        className="border-stone-300 focus:border-amber-600 focus:ring-amber-600/20 rounded-lg h-12"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="phone" className="text-stone-700 font-medium mb-2 block">
                      Téléphone *
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="06 12 34 56 78"
                      required
                      className="border-stone-300 focus:border-amber-600 focus:ring-amber-600/20 rounded-lg h-12"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-stone-700 font-medium mb-2 block">
                      Email *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="jean.dupont@email.com"
                      required
                      className="border-stone-300 focus:border-amber-600 focus:ring-amber-600/20 rounded-lg h-12"
                    />
                  </div>

                  <div>
                    <Label htmlFor="service" className="text-stone-700 font-medium mb-2 block">
                      Service souhaité *
                    </Label>
                    <Select required>
                      <SelectTrigger className="border-stone-300 focus:border-amber-600 focus:ring-amber-600/20 rounded-lg h-12">
                        <SelectValue placeholder="Choisissez votre service" />
                      </SelectTrigger>
                      <SelectContent className="bg-white border-stone-200 rounded-lg">
                        <SelectItem value="signature">Coupe Signature (65€)</SelectItem>
                        <SelectItem value="beard">Sculpture de Barbe (45€)</SelectItem>
                        <SelectItem value="shave">Rasage Traditionnel (55€)</SelectItem>
                        <SelectItem value="royal">Expérience Royale (120€)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="time" className="text-stone-700 font-medium mb-2 block">
                      Créneau préféré
                    </Label>
                    <Select>
                      <SelectTrigger className="border-stone-300 focus:border-amber-600 focus:ring-amber-600/20 rounded-lg h-12">
                        <SelectValue placeholder="Choisissez un créneau" />
                      </SelectTrigger>
                      <SelectContent className="bg-white border-stone-200 rounded-lg">
                        <SelectItem value="morning">Matin (9h-12h)</SelectItem>
                        <SelectItem value="afternoon">Après-midi (14h-17h)</SelectItem>
                        <SelectItem value="evening">Fin de journée (17h-20h)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="notes" className="text-stone-700 font-medium mb-2 block">
                      Notes particulières
                    </Label>
                    <Textarea
                      id="notes"
                      placeholder="Précisions sur vos attentes, allergies, préférences..."
                      className="border-stone-300 focus:border-amber-600 focus:ring-amber-600/20 rounded-lg min-h-[100px]"
                    />
                  </div>
                </div>

                <div className="flex flex-col items-center space-y-8">
                  <div className="text-center">
                    <Label className="text-stone-700 font-medium mb-4 flex items-center justify-center gap-2">
                      <CalendarIcon className="h-5 w-5" />
                      Date souhaitée
                    </Label>
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      className="rounded-lg border border-stone-300 bg-white p-4"
                      disabled={(day) => day < new Date() || day.getDay() === 0 || day.getDay() === 1}
                    />
                    <p className="text-stone-500 text-sm mt-4">Fermé les dimanches et lundis</p>
                  </div>

                  <div className="w-full space-y-6 bg-stone-50 p-6 rounded-lg">
                    <h4 className="font-medium text-stone-900 text-center">Informations pratiques</h4>
                    <div className="space-y-4 text-sm text-stone-600">
                      <div className="flex items-center gap-3">
                        <Clock className="h-4 w-4 text-amber-600 flex-shrink-0" />
                        <span>Mardi-Vendredi: 9h-20h, Samedi: 9h-19h</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <User className="h-4 w-4 text-amber-600 flex-shrink-0" />
                        <span>Confirmation par téléphone sous 24h</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-2 pt-8">
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-amber-600 hover:bg-amber-700 text-white font-medium text-lg py-4 rounded-full"
                  >
                    Envoyer la Demande de Rendez-vous
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
