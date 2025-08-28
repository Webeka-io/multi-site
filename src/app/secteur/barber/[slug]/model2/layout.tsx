import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display, Inter } from "next/font/google"
import "@/app/secteur/barber/[slug]/model2/globals.css"
import WhatsAppButton from "./whatsapp/WhatsAppButton"

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "Gentleman's Cut - Maison de Barbier Parisienne",
  description: "L'art du barbier réinventé. Expérience premium, savoir-faire d'exception, élégance parisienne.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
  
      <section
        className={`${playfairDisplay.variable} ${inter.variable} bg-stone-50 text-stone-900 font-sans antialiased`}
      ><WhatsAppButton phoneE164="+33784204626"/>
        {children}
      </section>
   
  )
}
