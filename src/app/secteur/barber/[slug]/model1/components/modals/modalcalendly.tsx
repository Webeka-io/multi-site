"use client"

import { useState } from "react"
import { InlineWidget } from "react-calendly"
import { Button } from "@/app/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/app/components/ui/dialog"

export function BookingCalendlyInline() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        className="bg-gradient-to-r from-red-600 to-red-700 text-white font-bold px-8 py-3 rounded-none border-2 border-red-500"
      >
        RÉSERVER
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-4xl w-[95vw] p-0 border-red-500">
          <DialogHeader className="px-6 pt-6">
            <DialogTitle className="text-xl font-bold">Choisir un créneau</DialogTitle>
          </DialogHeader>
          <div className="px-2 pb-6">
            {/* Tu peux styler le CONTENEUR (hauteur, padding, bg, etc.) */}
            <div className="rounded-md overflow-hidden bg-black/5" style={{ height: 680 }}>
              <InlineWidget
                url="https://calendly.com/webeka-contact/30min"
                styles={{ height: "100%", width: "100%" }} // style du conteneur iframe
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
