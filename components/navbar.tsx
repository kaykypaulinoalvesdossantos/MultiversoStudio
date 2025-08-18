"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, Plus, Minus, X, ChevronDown, Menu, Loader2, AlertCircle, RefreshCw } from "lucide-react"
// import { useCategories } from "@/contexts/categories-context"

interface NavbarProps {
  searchQuery?: string
  setSearchQuery?: (query: string) => void
}

// Interface unificada para categorias
interface UnifiedCategory {
  name: string
  href?: string
  id?: string
  children?: any[]
  subcategories?: any[]
}

export default function Navbar({ searchQuery = "", setSearchQuery }: NavbarProps) {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: "Camiseta Cafézini", price: 79.9, quantity: 2, image: "/placeholder.svg?height=80&width=80" },
    { id: 2, name: "Caneca Premium", price: 45.9, quantity: 1, image: "/placeholder.svg?height=80&width=80" },
  ])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Usar o hook de categorias monitoradas com fallback
  // let categoriasData: any = {
  //   categorias: [],
  //   isLoading: false,
  //   error: null,
  //   hasCategories: false,
  //   refreshCategorias: () => {},
  //   getCategoriasPrincipais: () => []
  // }

  // try {
  //   categoriasData = useCategories()
  // } catch (err) {
  //   // Fallback se o provider não estiver disponível
  //   console.warn('CategoriesProvider não encontrado, usando categorias padrão')
  // }

  // const { 
  //   categorias, 
  //   isLoading, 
  //   error, 
  //   hasCategories, 
  //   refreshCategorias,
  //   getCategoriasPrincipais 
  // } = categoriasData

  // Categoria fixa "Personalizáveis"
  // const categoriaPersonalizaveis = {
  //   name: "Personalizáveis",
  //   href: "/personalizar",
  //   subcategories: [],
  // }

  // Combinar categorias da API com a categoria fixa
  // const categoriasPrincipais = getCategoriasPrincipais()
  // const allCategories: UnifiedCategory[] = [...categoriasPrincipais, categoriaPersonalizaveis]

  // CATEGORIAS REAIS DO PROJETO - BASEADAS NO categoryConfigs
  const allCategories: UnifiedCategory[] = [
    {
      name: "Canecas",
      href: "/categoria/canecas",
      subcategories: [
        { name: "Cerâmica", href: "/categoria/canecas/ceramica", description: "Canecas tradicionais de cerâmica" },
        { name: "Vidro", href: "/categoria/canecas/vidro", description: "Canecas transparentes de vidro" },
        { name: "Chopp", href: "/categoria/canecas/chopp", description: "Canecas estilo chopp para cerveja" },
        { name: "Jateada", href: "/categoria/canecas/jateada", description: "Canecas com acabamento jateado" },
        { name: "Lisa", href: "/categoria/canecas/lisa", description: "Canecas lisas para personalização" },
        { name: "Térmica", href: "/categoria/canecas/termica", description: "Canecas que mantêm a temperatura" }
      ]
    },
    {
      name: "Vestuário",
      href: "/categoria/vestuario",
      subcategories: [
        { name: "Camisetas", href: "/categoria/vestuario/camisetas", description: "Camisetas básicas e estampadas" },
        { name: "Polo", href: "/categoria/vestuario/polo", description: "Camisetas polo elegantes" },
        { name: "Tradicional", href: "/categoria/vestuario/tradicional", description: "Camisetas de corte tradicional" },
        { name: "StreetWear", href: "/categoria/vestuario/streetwear", description: "Estilo urbano e moderno" },
        { name: "BabyLook", href: "/categoria/vestuario/babylook", description: "Camisetas femininas" },
        { name: "Premium", href: "/categoria/vestuario/premium", description: "Linha premium de alta qualidade" },
        { name: "Moletons", href: "/categoria/vestuario/moletons", description: "Moletons e casacos" },
        { name: "Regatas", href: "/categoria/vestuario/regatas", description: "Camisetas sem manga" },
        { name: "Bonés", href: "/categoria/vestuario/bones", description: "Bonés e chapéus" }
      ]
    },
    {
      name: "Kits Promocionais",
      href: "/categoria/kits-promocionais",
      subcategories: [
        { name: "Kit Café", href: "/categoria/kits-promocionais/cafe", description: "Caneca + Camiseta temática" },
        { name: "Kit Gamer", href: "/categoria/kits-promocionais/gamer", description: "Produtos para gamers" },
        { name: "Kit Completo", href: "/categoria/kits-promocionais/completo", description: "Vários produtos em combo" },
        { name: "Kit Presente", href: "/categoria/kits-promocionais/presente", description: "Ideal para presentear" }
      ]
    },
    {
      name: "Lançamentos",
      href: "/categoria/lancamentos",
      subcategories: [
        { name: "Esta Semana", href: "/categoria/lancamentos/semana", description: "Lançamentos desta semana" },
        { name: "Este Mês", href: "/categoria/lancamentos/mes", description: "Novidades do mês" },
        { name: "Pré-Venda", href: "/categoria/lancamentos/pre-venda", description: "Produtos em pré-venda" },
        { name: "Exclusivos", href: "/categoria/lancamentos/exclusivos", description: "Produtos exclusivos" }
      ]
    },
    {
      name: "Personalizáveis",
      href: "/categoria/personalizaveis",
      subcategories: [
        { name: "Camisetas", href: "/categoria/personalizaveis/camisetas", description: "Camisetas para personalizar" },
        { name: "Canecas", href: "/categoria/personalizaveis/canecas", description: "Canecas para personalizar" },
        { name: "Adesivos", href: "/categoria/personalizaveis/adesivos", description: "Adesivos personalizados" },
        { name: "Chaveiros", href: "/categoria/personalizaveis/chaveiros", description: "Chaveiros únicos" }
      ]
    }
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
        <div className="w-full px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2 md:space-x-3 flex-shrink-0">
              <Image
                src="/logo-luneta.webp"
                alt="Multiverso Studio"
                width={70}
                height={50}
                className="object-contain w-12 h-8 md:w-[70px] md:h-[50px]"
              />
              <div className="text-center">
                <h1 className="text-lg md:text-xl font-bold">MULTIVERSO</h1>
                <p className="text-xs text-gray-400">STUDIO</p>
              </div>
            </Link>

            {/* Search - Desktop Only */}
            <div className="hidden md:block flex-1 max-w-2xl mx-8">
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
            <div className="flex items-center space-x-2 md:space-x-4 lg:space-x-6 flex-shrink-0">
              {/* Trocas - Desktop Only */}
              <Link href="/trocas" className="hidden md:block">
                <Button variant="ghost" className="text-white hover:text-black hover:bg-white text-sm transition-colors group">
                  <Image
                    src="/icons/trocas icon.svg"
                    alt="Troca"
                    width={28}
                    height={28}
                    className="w-7 h-7 mr-2 brightness-0 invert group-hover:brightness-0 group-hover:invert-0 transition-all"
                  />
                  Troca
                </Button>
              </Link>

              {/* Carrinho */}
              <Button
                variant="ghost"
                size="icon"
                className="relative text-white hover:text-black hover:bg-white transition-colors group"
                onClick={() => setIsCartOpen(true)}
              >
                <Image
                  src="/icons/mochila icon.svg"
                  alt="Carrinho"
                  width={32}
                  height={32}
                  className="w-6 h-6 md:w-8 md:h-8 brightness-0 invert group-hover:brightness-0 group-hover:invert-0 transition-all"
                />
                {cartItemsCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 md:-top-2 md:-right-2 w-4 h-4 md:w-5 md:h-5 rounded-full p-0 flex items-center justify-center text-xs bg-orange-500 text-white">
                    {cartItemsCount}
                  </Badge>
                )}
              </Button>
              
              {/* Login - Desktop Only */}
              <Link href="/login" className="hidden md:block">
                <Button variant="ghost" className="text-white hover:text-black hover:bg-white text-sm transition-colors group">
                  <Image
                    src="/icons/login icon.svg"
                    alt="Login"
                    width={28}
                    height={28}
                    className="w-7 h-7 mr-2 brightness-0 invert group-hover:brightness-0 group-hover:invert-0 transition-all"
                  />
                  Login
                </Button>
              </Link>

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden text-white hover:text-black hover:bg-white transition-colors"
              >
                <Menu className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Mobile Search - Só aparece quando o menu estiver aberto */}
          {isMobileMenuOpen && (
            <div className="md:hidden mt-4 mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Buscar produtos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery && setSearchQuery(e.target.value)}
                  className="pl-10 bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-white focus:ring-white w-full"
                />
              </div>
            </div>
          )}

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden border-t border-gray-800 pt-4 pb-4">
              <div className="space-y-1">
                {/* Título do Menu */}
                <div className="px-3 py-2 mb-3">
                  <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wide">Menu</h3>
                </div>
                
                {/* Categorias */}
                <div className="space-y-1">
                  {allCategories.map((category) => {
                    // Verificar se é uma categoria da API ou a categoria fixa
                    const isApiCategory = 'id' in category && 'children' in category
                    const href = isApiCategory ? `/categoria/${category.id}` : category.href
                    
                    return (
                      <Link
                        key={category.name}
                        href={href || '#'}
                        className="flex items-center px-3 py-3 text-white hover:text-gray-300 hover:bg-gray-800 rounded-lg transition-colors w-full"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <span className="text-base font-medium truncate">{category.name}</span>
                      </Link>
                    )
                  })}
                </div>
                
                {/* Separador */}
                <div className="border-t border-gray-700 my-3"></div>
                
                {/* Ações do Usuário */}
                <div className="space-y-1">
                  {/* Trocas */}
                  <Link
                    href="/trocas"
                    className="flex items-center px-3 py-3 text-white hover:text-gray-300 hover:bg-gray-800 rounded-lg transition-colors w-full"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Image
                      src="/icons/trocas icon.svg"
                      alt="Troca"
                      width={20}
                      height={20}
                      className="w-5 h-5 mr-3 brightness-0 invert flex-shrink-0"
                    />
                    <span className="text-base font-medium">Trocas</span>
                  </Link>
                  
                  {/* Login */}
                  <Link
                    href="/login"
                    className="flex items-center px-3 py-3 text-white hover:text-gray-300 hover:bg-gray-800 rounded-lg transition-colors w-full"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Image
                      src="/icons/login icon.svg"
                      alt="Login"
                      width={20}
                      height={20}
                      className="w-5 h-5 mr-3 brightness-0 invert flex-shrink-0"
                    />
                    <span className="text-base font-medium">Login</span>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Category Navigation */}
        <div className="border-t border-gray-800 hidden md:block">
          <div className="container mx-auto px-4">
            {/* Indicador de status das categorias - COMENTADO PARA TESTE ESTÁTICO */}
            {/* {isLoading && (
              <div className="flex items-center justify-center py-2 text-xs text-gray-400">
                <Loader2 className="w-3 h-3 animate-spin mr-2" />
                Atualizando categorias...
              </div>
            )} */}
            
            {/* {error && (
              <div className="flex items-center justify-center py-2 text-xs text-red-400">
                <AlertCircle className="w-3 h-3 mr-2" />
                Erro ao carregar categorias
                <button
                  onClick={refreshCategorias}
                  className="ml-2 text-blue-400 hover:text-blue-300 transition-colors"
                >
                  <RefreshCw className="w-3 h-3" />
                </button>
              </div>
            )} */}

            <div className="flex items-center justify-center space-x-4 md:space-x-8 py-3 overflow-x-auto">
              {allCategories.map((category) => {
                // Verificar se é uma categoria da API ou a categoria fixa
                const isApiCategory = 'id' in category && 'children' in category
                const subcategories = isApiCategory ? category.children : category.subcategories
                const href = isApiCategory ? `/categoria/${category.id}` : category.href
                
                return subcategories && subcategories.length > 0 ? (
                  <DropdownMenu key={category.name}>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        className="text-white hover:text-black hover:bg-white transition-colors font-medium text-sm flex items-center space-x-2 group whitespace-nowrap"
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
                        {subcategories.map((sub: any) => (
                          <DropdownMenuItem key={sub.name || sub.id} asChild className="p-0">
                            <Link
                              href={sub.href || `/categoria/${category.id}/${sub.id}`}
                              className="flex flex-col space-y-1 p-3 rounded-md hover:bg-gray-50 transition-colors"
                            >
                              <span className="font-semibold text-gray-900">{sub.name}</span>
                              <span className="text-xs text-gray-500">
                                {sub.description || `${sub.productCount || 0} produtos`}
                              </span>
                            </Link>
                          </DropdownMenuItem>
                        ))}
                      </div>
                      <div className="mt-4 pt-3 border-t border-gray-100">
                        <Link href={href || '#'} className="text-sm text-gray-600 hover:text-gray-900 font-medium">
                          Ver todos em {category.name} →
                        </Link>
                      </div>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Link key={category.name} href={href || '#'}>
                    <Button
                      variant="ghost"
                      className="text-white hover:text-black hover:bg-white transition-colors font-medium text-sm whitespace-nowrap"
                    >
                      {category.name}
                    </Button>
                  </Link>
                )
              })}
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
                    <Image
                      src="/icons/mochila icon.svg"
                      alt="Carrinho vazio"
                      width={64}
                      height={64}
                      className="w-16 h-16 mx-auto mb-4 brightness-0 opacity-40"
                    />
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
