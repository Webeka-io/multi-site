import type React from "react"
import type { Metadata } from "next"
import { Inter, Poppins } from "next/font/google"
import "@/app/secteur/barber/[slug]/model4/globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
})

export const metadata: Metadata = {
  title: "Gentleman's Cut - Barbershop Moderne",
  description: "Barbershop moderne et minimaliste. Simplicité, qualité, excellence.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
   
      <section className={`${inter.variable} ${poppins.variable} bg-white text-gray-900 font-sans antialiased`}>
        {children}
      </section>
  
  )
}
