import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
// import { CategoriesProvider } from "@/contexts/categories-context"
import { CartProvider } from "@/contexts/cart-context"

export const metadata: Metadata = {
  title: "Multiverso Estudio - Lojas dentro de lojas",
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
      <body className="font-gotham">
        {/* <CategoriesProvider> */}
        <CartProvider>
          {children}
        </CartProvider>
        {/* </CategoriesProvider> */}
      </body>
    </html>
  )
}
