import type React from "react"
import type { Metadata } from "next"
import { Roboto, Bebas_Neue } from "next/font/google"
import "@/app/secteur/barber/[slug]/model3/globals.css"

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
  variable: "--font-roboto",
})

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-bebas",
})

export const metadata: Metadata = {
  title: "GENTLEMAN'S CUT - Urban Barbershop",
  description: "Barbershop moderne au cœur de la ville. Style urbain, techniques de pointe, ambiance authentique.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
  
      <section className={`${roboto.variable} ${bebasNeue.variable} bg-zinc-900 text-zinc-100 font-sans`}>{children}</section>
    
  )
}
