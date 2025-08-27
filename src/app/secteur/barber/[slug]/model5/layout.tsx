import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display, Cormorant_Garamond, Inter } from "next/font/google"
import "@/app/secteur/barber/[slug]/model5/globals.css"

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
})

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "Gentleman's Cut - Luxury Barbershop",
  description: "L'art du barbier de luxe. Excellence, raffinement et prestige depuis 1952.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    
      <section
        className={`${playfair.variable} ${cormorant.variable} ${inter.variable} bg-ivory text-charcoal font-serif antialiased`}
      >
        {children}
      </section>
   
  )
}
