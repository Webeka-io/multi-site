"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/app/secteur/barber/[slug]/model10/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/secteur/barber/[slug]/model10/components/ui/select"
import { Calendar } from "@/app/secteur/barber/[slug]/model10/components/ui/calendar"
import { Textarea } from "@/app/secteur/barber/[slug]/model10/components/ui/textarea"
import { CheckCircle, CalendarIcon, Heart } from "lucide-react"

export default function BookingNordic() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [isBooked, setIsBooked] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsBooked(true)
  }

  return (
    <section id="booking" className="py-24 bg-white">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 bg-sage-100 text-sage-700 px-4 py-2 rounded-full text-sm font-light mb-6">
              <Heart className="h-4 w-4" />
              Réservation
            </div>
            <h2 className="text-4xl md:text-5xl font-light text-stone-800 mb-6">
              Réservez votre
              <span className="block font-normal text-sage-600">moment</span>
            </h2>
            <div className="w-16 h-0.5 bg-sage-400 mx-auto mb-8"></div>
            <p className="text-xl text-stone-600 leading-relaxed font-light">
              Prenez rendez-vous pour votre moment de bien-être
            </p>
          </div>

          <Card className="border-0 shadow-lg rounded-3xl bg-gradient-to-b from-sage-50 to-cream-50">
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-3xl font-light text-stone-800">Prendre rendez-vous</CardTitle>
              <p className="text-stone-600 mt-2 font-light">Nous vous contacterons pour confirmer</p>
            </CardHeader>
            <CardContent className="p-8">
              {isBooked ? (
                <div className="text-center py-16 space-y-6">
                  <div className="w-16 h-16 bg-sage-100 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle className="h-8 w-8 text-sage-600" />
                  </div>
                  <h3 className="text-3xl font-light text-stone-800">Demande envoyée</h3>
                  <p className="text-stone-600 max-w-md mx-auto leading-relaxed font-light">
                    Votre demande a été transmise avec succès. Nous vous contacterons rapidement pour confirmer votre
                    rendez-vous.
                  </p>
                  <Button
                    onClick={() => setIsBooked(false)}
                    className="bg-sage-500 hover:bg-sage-600 text-white font-light px-8 py-3 rounded-full mt-8"
                  >
                    Nouvelle demande
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                  <div className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="firstName" className="text-stone-700 font-light mb-2 block">
                          Prénom *
                        </Label>
                        <Input
                          id="firstName"
                          placeholder="Jean"
                          required
                          className="border-sage-200 focus:border-sage-400 focus:ring-sage-400/20 rounded-2xl h-12 font-light"
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName" className="text-stone-700 font-light mb-2 block">
                          Nom *
                        </Label>
                        <Input
                          id="lastName"
                          placeholder="Dupont"
                          required
                          className="border-sage-200 focus:border-sage-400 focus:ring-sage-400/20 rounded-2xl h-12 font-light"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="phone" className="text-stone-700 font-light mb-2 block">
                        Téléphone *
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="06 12 34 56 78"
                        required
                        className="border-sage-200 focus:border-sage-400 focus:ring-sage-400/20 rounded-2xl h-12 font-light"
                      />
                    </div>

                    <div>
                      <Label htmlFor="email" className="text-stone-700 font-light mb-2 block">
                        Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="jean.dupont@email.com"
                        className="border-sage-200 focus:border-sage-400 focus:ring-sage-400/20 rounded-2xl h-12 font-light"
                      />
                    </div>

                    <div>
                      <Label htmlFor="service" className="text-stone-700 font-light mb-2 block">
                        Service souhaité *
                      </Label>
                      <Select required>
                        <SelectTrigger className="border-sage-200 focus:border-sage-400 focus:ring-sage-400/20 rounded-2xl h-12 font-light">
                          <SelectValue placeholder="Choisissez votre service" />
                        </SelectTrigger>
                        <SelectContent className="bg-white border-sage-200 rounded-2xl font-light">
                          <SelectItem value="signature">Coupe Signature (42€)</SelectItem>
                          <SelectItem value="beard">Soin de la Barbe (32€)</SelectItem>
                          <SelectItem value="shave">Rasage Traditionnel (38€)</SelectItem>
                          <SelectItem value="complete">Expérience Complète (68€)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="notes" className="text-stone-700 font-light mb-2 block">
                        Message (optionnel)
                      </Label>
                      <Textarea
                        id="notes"
                        placeholder="Vos souhaits particuliers..."
                        className="border-sage-200 focus:border-sage-400 focus:ring-sage-400/20 rounded-2xl min-h-[100px] font-light"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col items-center space-y-8">
                    <div className="text-center">
                      <Label className="text-stone-700 font-light mb-4 flex items-center justify-center gap-2">
                        <CalendarIcon className="h-4 w-4 text-sage-600" />
                        Date souhaitée
                      </Label>
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        className="rounded-2xl border border-sage-200 bg-white p-4"
                        disabled={(day) => day < new Date() || day.getDay() === 0}
                      />
                      <p className="text-stone-500 text-sm mt-4 font-light">Fermé le dimanche</p>
                    </div>

                    <div className="w-full space-y-6 bg-white p-6 rounded-2xl border border-sage-100">
                      <h4 className="font-medium text-stone-800 text-center">Informations pratiques</h4>
                      <div className="space-y-3 text-sm text-stone-600 font-light">
                        <div className="flex items-center justify-between">
                          <span>Lundi - Vendredi</span>
                          <span>9h - 19h</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Samedi</span>
                          <span>9h - 18h</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Dimanche</span>
                          <span className="text-sage-500">Fermé</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-2 pt-8">
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full bg-sage-500 hover:bg-sage-600 text-white font-light text-lg py-4 rounded-full"
                    >
                      Envoyer la demande
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
