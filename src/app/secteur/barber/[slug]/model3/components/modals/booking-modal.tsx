"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/app/secteur/barber/[slug]/model3/components/ui/dialog"
import { Button } from "@/app/secteur/barber/[slug]/model3/components/ui/button"
import { Input } from "@/app/secteur/barber/[slug]/model3/components/ui/input"
import { Label } from "@/app/secteur/barber/[slug]/model3/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/secteur/barber/[slug]/model3/components/ui/select"
import { Calendar } from "@/app/secteur/barber/[slug]/model3/components/ui/calendar"
import { CheckCircle, CalendarIcon } from "lucide-react"

export default function BookingModal() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [isBooked, setIsBooked] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsBooked(true)
  }

  const resetForm = () => {
    setIsBooked(false)
    setDate(new Date())
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button id="booking-modal" className="hidden">
          Open Booking Modal
        </button>
      </DialogTrigger>
      <DialogContent className="bg-black border-2 border-red-500 text-white max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-3xl font-display font-black text-center mb-2">
            RÉSERVER VOTRE
            <span className="block bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">
              RENDEZ-VOUS
            </span>
          </DialogTitle>
          <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-red-700 mx-auto"></div>
        </DialogHeader>

        {isBooked ? (
          <div className="text-center py-16 space-y-6">
            <div className="relative">
              <CheckCircle className="h-24 w-24 text-green-500 mx-auto" />
              <div className="absolute -inset-4 bg-green-500/20 blur-xl rounded-full"></div>
            </div>
            <h3 className="text-3xl font-display font-bold text-white">CONFIRMATION</h3>
            <p className="text-gray-300 font-serif text-lg max-w-md mx-auto leading-relaxed">
              Votre rendez-vous a été confirmé avec succès ! Vous recevrez un SMS de rappel 24h avant.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
              <Button
                onClick={resetForm}
                className="bg-transparent border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white font-bold px-8 py-3 rounded-none"
              >
                NOUVELLE RÉSERVATION
              </Button>
              <Button
                onClick={() => setIsOpen(false)}
                className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold px-8 py-3 rounded-none"
              >
                FERMER
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-8 py-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <Label htmlFor="name" className="text-gray-300 font-display font-bold text-lg mb-2 block">
                    NOM COMPLET *
                  </Label>
                  <Input
                    id="name"
                    placeholder="Jean Dupont"
                    required
                    className="bg-gray-900 border-2 border-gray-700 focus:border-red-500 text-white placeholder-gray-500 h-12 rounded-none font-serif"
                  />
                </div>

                <div>
                  <Label htmlFor="phone" className="text-gray-300 font-display font-bold text-lg mb-2 block">
                    TÉLÉPHONE *
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="06 12 34 56 78"
                    required
                    className="bg-gray-900 border-2 border-gray-700 focus:border-red-500 text-white placeholder-gray-500 h-12 rounded-none font-serif"
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="text-gray-300 font-display font-bold text-lg mb-2 block">
                    EMAIL
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="jean.dupont@email.com"
                    className="bg-gray-900 border-2 border-gray-700 focus:border-red-500 text-white placeholder-gray-500 h-12 rounded-none font-serif"
                  />
                </div>

                <div>
                  <Label htmlFor="service" className="text-gray-300 font-display font-bold text-lg mb-2 block">
                    SERVICE *
                  </Label>
                  <Select required>
                    <SelectTrigger className="bg-gray-900 border-2 border-gray-700 focus:border-red-500 text-white h-12 rounded-none font-serif">
                      <SelectValue placeholder="Choisissez votre service" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-2 border-gray-700 text-white rounded-none">
                      <SelectItem value="signature" className="font-serif">
                        Coupe Signature (45€)
                      </SelectItem>
                      <SelectItem value="beard" className="font-serif">
                        Sculpture de Barbe (35€)
                      </SelectItem>
                      <SelectItem value="shave" className="font-serif">
                        Rasage Traditionnel (50€)
                      </SelectItem>
                      <SelectItem value="complete" className="font-serif">
                        Expérience Complète (85€)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="time" className="text-gray-300 font-display font-bold text-lg mb-2 block">
                    HEURE *
                  </Label>
                  <Select required>
                    <SelectTrigger className="bg-gray-900 border-2 border-gray-700 focus:border-red-500 text-white h-12 rounded-none font-serif">
                      <SelectValue placeholder="Choisissez l'heure" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-2 border-gray-700 text-white rounded-none">
                      <SelectItem value="09:00" className="font-serif">
                        09:00
                      </SelectItem>
                      <SelectItem value="10:30" className="font-serif">
                        10:30
                      </SelectItem>
                      <SelectItem value="12:00" className="font-serif">
                        12:00
                      </SelectItem>
                      <SelectItem value="14:00" className="font-serif">
                        14:00
                      </SelectItem>
                      <SelectItem value="15:30" className="font-serif">
                        15:30
                      </SelectItem>
                      <SelectItem value="17:00" className="font-serif">
                        17:00
                      </SelectItem>
                      <SelectItem value="18:30" className="font-serif">
                        18:30
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex flex-col items-center">
                <Label className="text-gray-300 font-display font-bold text-lg mb-4 flex items-center gap-2">
                  <CalendarIcon className="h-5 w-5" />
                  CHOISIR LA DATE *
                </Label>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-none border-2 border-gray-700 bg-gray-900 p-4"
                  disabled={(day) => day < new Date() || day.getDay() === 0 || day.getDay() === 1}
                />
                <p className="text-gray-500 text-sm mt-4 text-center font-serif">Fermé les dimanches et lundis</p>
              </div>
            </div>

            <div className="pt-8 border-t border-gray-800">
              <Button
                type="submit"
                size="lg"
                className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-display font-bold text-xl py-6 rounded-none border-2 border-red-500 hover:border-red-400 transition-all duration-300 transform hover:scale-105"
              >
                CONFIRMER LA RÉSERVATION
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
