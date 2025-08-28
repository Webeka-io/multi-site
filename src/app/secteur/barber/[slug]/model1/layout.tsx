import type React from "react"
import type { Metadata } from "next"
import { Oswald, Lora } from "next/font/google"
import "@/app/secteur/barber/[slug]/model1/style.css"
import WhatsAppButton from "@/app/secteur/barber/[slug]/model1/whatsapp/WhatsAppButton"

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
})

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
})

export const metadata: Metadata = {
  title: "Gentleman's Cut - L'Art du Barbier Moderne",
  description:
    "Salon de barbier premium à Paris. Coupes, barbes, rasages traditionnels dans une ambiance contemporaine.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
      <section className={`${oswald.variable} ${lora.variable} min-h-screen bg-black text-white font-sans overflow-x-hidden`}>
        <WhatsAppButton phoneE164="+33753343997"/>
        {children} 
      </section>
  )
}
