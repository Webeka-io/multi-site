import type React from "react"
import type { Metadata } from "next"
import { Space_Grotesk, JetBrains_Mono, Inter } from "next/font/google"
import "@/app/secteur/barber/[slug]/model7/globals.css"

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "GENTLEMAN'S CUT // BARBERSHOP 2024",
  description: "Barbershop néo-brutaliste. Design radical, coupes précises, attitude moderne.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" className="!scroll-smooth">
      <body
        className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} ${inter.variable} bg-white text-black font-display antialiased`}
      >
        {children}
      </body>
    </html>
  )
}
