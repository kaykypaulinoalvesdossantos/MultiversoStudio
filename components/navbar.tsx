"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, ShoppingCart, User, RotateCcw, Plus, Minus, X, ChevronDown, Menu } from "lucide-react"

interface NavbarProps {
  searchQuery?: string
  setSearchQuery?: (query: string) => void
}

export default function Navbar({ searchQuery = "", setSearchQuery }: NavbarProps) {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: "Camiseta Cafézini", price: 79.9, quantity: 2, image: "/placeholder.svg?height=80&width=80" },
    { id: 2, name: "Caneca Premium", price: 45.9, quantity: 1, image: "/placeholder.svg?height=80&width=80" },
  ])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const categories = [
    {
      name: "Canecas",
      href: "/categoria/canecas",
      subcategories: [
        { name: "Cerâmica", href: "/categoria/canecas/ceramica", description: "Canecas tradicionais de cerâmica" },
        { name: "Vidro", href: "/categoria/canecas/vidro", description: "Canecas transparentes de vidro" },
        { name: "Térmica", href: "/categoria/canecas/termica", description: "Canecas que mantêm a temperatura" },
        {
          name: "Personalizada",
          href: "/categoria/canecas/personalizada",
          description: "Canecas com design personalizado",
        },
      ],
    },
    {
      name: "Vestuário",
      href: "/categoria/vestuario",
      subcategories: [
        { name: "Camisetas", href: "/categoria/vestuario/camisetas", description: "Camisetas básicas e estampadas" },
        { name: "Moletons", href: "/categoria/vestuario/moletons", description: "Moletons e casacos confortáveis" },
        { name: "Bonés", href: "/categoria/vestuario/bones", description: "Bonés e chapéus estilosos" },
        { name: "Premium", href: "/categoria/vestuario/premium", description: "Linha premium de alta qualidade" },
      ],
    },
    {
      name: "Kits Promocionais",
      href: "/categoria/kits",
      subcategories: [
        { name: "Kit Café", href: "/categoria/kits/cafe", description: "Caneca + Camiseta temática" },
        { name: "Kit Gamer", href: "/categoria/kits/gamer", description: "Produtos para gamers" },
        { name: "Kit Escritório", href: "/categoria/kits/escritorio", description: "Produtos para o trabalho" },
        { name: "Kit Presente", href: "/categoria/kits/presente", description: "Kits ideais para presentear" },
      ],
    },
    {
      name: "Lançamentos",
      href: "/categoria/lancamentos",
      subcategories: [
        { name: "Novidades", href: "/categoria/lancamentos/novidades", description: "Últimos lançamentos da semana" },
        { name: "Pré-venda", href: "/categoria/lancamentos/pre-venda", description: "Produtos em pré-venda" },
        {
          name: "Edição Limitada",
          href: "/categoria/lancamentos/edicao-limitada",
          description: "Produtos de edição limitada",
        },
        {
          name: "Exclusivos",
          href: "/categoria/lancamentos/exclusivos",
          description: "Produtos exclusivos da plataforma",
        },
      ],
    },
    {
      name: "Personalizáveis",
      href: "/personalizar",
      subcategories: [],
    },
  ]

  const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  const cartItemsCount = cartItems.reduce((total, item) => total + item.quantity, 0)

  const updateCartQuantity = (id: number, newQuantity: number) => {
    if (newQuantity === 0) {
      setCartItems(cartItems.filter((item) => item.id !== id))
    } else {
      setCartItems(cartItems.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
    }
  }

  const removeFromCart = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id))
  }

  return (
    <>
      {/* Main Header */}
      <header className="bg-black text-white sticky top-0 z-50 shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3">
              <Image
                src="/logo-luneta.webp"
                alt="Multiverso Studio"
                width={50}
                height={35}
                className="object-contain brightness-0 invert"
              />
              <div className="text-center">
                <h1 className="text-xl font-bold">MULTIVERSO</h1>
                <p className="text-xs text-gray-400">STUDIO</p>
              </div>
            </Link>

            {/* Search */}
            <div className="flex-1 max-w-2xl mx-8 hidden md:block">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Buscar por criadores, produtos, temas, etc..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery && setSearchQuery(e.target.value)}
                  className="pl-10 bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-white focus:ring-white"
                />
              </div>
            </div>

            {/* User Actions */}
            <div className="flex items-center space-x-4 md:space-x-6">
              <Link href="/trocas" className="hidden md:block">
                <Button variant="ghost" className="text-white hover:text-gray-300 text-sm">
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Troca
                </Button>
              </Link>

              <Button
                variant="ghost"
                size="icon"
                className="relative text-white hover:text-gray-300"
                onClick={() => setIsCartOpen(true)}
              >
                <ShoppingCart className="w-5 h-5" />
                {cartItemsCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 w-5 h-5 rounded-full p-0 flex items-center justify-center text-xs bg-orange-500 text-white">
                    {cartItemsCount}
                  </Badge>
                )}
              </Button>
              
              <Link href="/login">
                <Button variant="ghost" className="text-white hover:text-gray-300 text-sm">
                  <User className="w-4 h-4 mr-2" />
                  <span className="hidden md:inline">Login</span>
                </Button>
              </Link>

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden text-white hover:text-gray-300"
              >
                <Menu className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Mobile Search */}
          <div className="mt-4 md:hidden">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Buscar produtos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery && setSearchQuery(e.target.value)}
                className="pl-10 bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-white focus:ring-white"
              />
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-gray-800 pt-4">
              <div className="space-y-2">
                {categories.map((category) => (
                  <Link
                    key={category.name}
                    href={category.href}
                    className="block px-3 py-2 text-white hover:text-gray-300 hover:bg-gray-800 rounded-md"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span className="text-sm">{category.name}</span>
                  </Link>
                ))}
                <div className="border-t border-gray-800 pt-2 mt-2">
                  <Link
                    href="/trocas"
                    className="block px-3 py-2 text-white hover:text-gray-300 hover:bg-gray-800 rounded-md"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Trocas
                  </Link>
                  <Link
                    href="/login"
                    className="block px-3 py-2 text-white hover:text-gray-300 hover:bg-gray-800 rounded-md"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Category Navigation */}
        <div className="border-t border-gray-800 hidden md:block">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center space-x-4 md:space-x-8 py-3 overflow-x-auto">
              {categories.map((category) => (
                category.subcategories.length > 0 ? (
                  <DropdownMenu key={category.name}>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        className="text-white hover:text-gray-300 transition-colors font-medium text-sm flex items-center space-x-2 group whitespace-nowrap"
                      >
                        <span>{category.name}</span>
                        <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-80 bg-white shadow-2xl border-0 rounded-lg p-4 mt-2">
                      <div className="mb-3">
                        <h3 className="text-lg font-bold text-gray-900 mb-3">{category.name}</h3>
                      </div>
                      <div className="grid grid-cols-1 gap-2">
                        {category.subcategories.map((sub) => (
                          <DropdownMenuItem key={sub.name} asChild className="p-0">
                            <Link
                              href={sub.href}
                              className="flex flex-col space-y-1 p-3 rounded-md hover:bg-gray-50 transition-colors"
                            >
                              <span className="font-semibold text-gray-900">{sub.name}</span>
                              <span className="text-xs text-gray-500">{sub.description}</span>
                            </Link>
                          </DropdownMenuItem>
                        ))}
                      </div>
                      <div className="mt-4 pt-3 border-t border-gray-100">
                        <Link href={category.href} className="text-sm text-gray-600 hover:text-gray-900 font-medium">
                          Ver todos em {category.name} →
                        </Link>
                      </div>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Link key={category.name} href={category.href}>
                    <Button
                      variant="ghost"
                      className="text-white hover:text-gray-300 transition-colors font-medium text-sm whitespace-nowrap"
                    >
                      {category.name}
                    </Button>
                  </Link>
                )
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Cart Sidebar */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setIsCartOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl">
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-6 border-b">
                <h2 className="text-2xl font-bold">Seu Carrinho</h2>
                <Button size="icon" variant="ghost" onClick={() => setIsCartOpen(false)}>
                  <X className="w-6 h-6" />
                </Button>
              </div>

              <div className="flex-1 overflow-y-auto p-6">
                {cartItems.length === 0 ? (
                  <div className="text-center py-8">
                    <ShoppingCart className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                    <p className="text-gray-600">Seu carrinho está vazio</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          width={80}
                          height={80}
                          className="rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold">{item.name}</h3>
                          <p className="text-green-600 font-bold">R$ {item.price.toFixed(2)}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button
                            size="icon"
                            variant="outline"
                            onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <Button
                            size="icon"
                            variant="outline"
                            onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {cartItems.length > 0 && (
                <div className="border-t p-6">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-semibold">Total:</span>
                    <span className="text-2xl font-bold text-green-600">R$ {cartTotal.toFixed(2)}</span>
                  </div>
                  <Button className="w-full bg-black hover:bg-gray-800 h-12 text-lg">Finalizar Compra</Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
