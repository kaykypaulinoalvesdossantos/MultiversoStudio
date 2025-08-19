import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
// import { CategoriesProvider } from "@/contexts/categories-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Multiverso Studio - Lojas dentro de lojas",
  description:
    "A plataforma que conecta criadores e fãs através de produtos únicos e exclusivos. Cada loja é um universo próprio.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        {/* <CategoriesProvider> */}
          {children}
        {/* </CategoriesProvider> */}
      </body>
    </html>
  )
}
