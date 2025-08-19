"use client"

import { use, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Star,
  Users,
  ShoppingCart,
  Crown,
  ArrowLeft,
  Grid3X3,
  List,
  SortAsc,
  ChevronDown,
  Heart,
  Share2,
  Eye,
  MessageCircle,
  Filter,
} from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function CreatorStorePage({ params }: { params: Promise<{ creator: string }> }) {
  const { creator } = use(params)
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("relevance")
  const [viewMode, setViewMode] = useState("grid")
  const [selectedCategory, setSelectedCategory] = useState("todos")

  // Mock store data - in real app, fetch based on creator
  const store = {
    id: 1,
    name: "Sacocheio.tv",
    creator: "Sacocheio",
    slug: creator,
    color: "from-amber-600 to-orange-600",
    avatar: "/placeholder.svg?height=120&width=120",
    coverImage: "/banner-cafezini.webp",
    products: 89,
    followers: "1.8M",
    sales: "50K+",
    description:
      "Café, humor e muito sarcasmo! A loja oficial do Sacocheio com produtos únicos que combinam café e comédia.",
    specialty: "Comédia & Café",
    verified: true,
    rating: 4.9,
    reviews: 1234,
    founded: "2020",
    location: "São Paulo, SP",
  }

  const products = [
    {
      id: 1,
      name: "Camiseta Cafézini Garganttinni - Edição Limitada",
      price: 79.9,
      originalPrice: 99.9,
      image: "/placeholder.svg?height=400&width=400",
      rating: 4.8,
      reviews: 234,
      sales: 856,
      badge: "Lançamento",
      badgeColor: "bg-amber-500",
      discount: "20% OFF",
      freeShipping: true,
      category: "camisetas",
    },
    {
      id: 2,
      name: "Caneca Cafézini Premium - Cerâmica",
      price: 45.9,
      originalPrice: 55.9,
      image: "/placeholder.svg?height=400&width=400",
      rating: 4.9,
      reviews: 156,
      sales: 567,
      badge: "Best Seller",
      badgeColor: "bg-green-500",
      discount: "18% OFF",
      freeShipping: true,
      category: "canecas",
    },
    {
      id: 3,
      name: "Kit Cafézini Completo - Camiseta + Caneca",
      price: 119.9,
      originalPrice: 149.9,
      image: "/placeholder.svg?height=400&width=400",
      rating: 4.8,
      reviews: 123,
      sales: 567,
      badge: "Kit",
      badgeColor: "bg-blue-500",
      discount: "20% OFF",
      freeShipping: true,
      category: "kits",
    },
    {
      id: 4,
      name: "Moletom Cafézini - Algodão Premium",
      price: 159.9,
      image: "/placeholder.svg?height=400&width=400",
      rating: 4.7,
      reviews: 89,
      sales: 432,
      badge: "Novo",
      badgeColor: "bg-purple-500",
      freeShipping: true,
      category: "moletons",
    },
    {
      id: 5,
      name: "Caneca Térmica Cafézini - 500ml",
      price: 69.9,
      originalPrice: 89.9,
      image: "/placeholder.svg?height=400&width=400",
      rating: 4.6,
      reviews: 78,
      sales: 234,
      badge: "Térmica",
      badgeColor: "bg-blue-600",
      discount: "22% OFF",
      freeShipping: true,
      category: "canecas",
    },
    {
      id: 6,
      name: "Poster Cafézini - Arte Exclusiva",
      price: 29.9,
      image: "/placeholder.svg?height=400&width=400",
      rating: 4.5,
      reviews: 45,
      sales: 123,
      badge: "Arte",
      badgeColor: "bg-pink-500",
      freeShipping: false,
      category: "acessorios",
    },
  ]

  const categories = [
    { name: "todos", label: "Todos", count: 89 },
    { name: "camisetas", label: "Camisetas", count: 34 },
    { name: "canecas", label: "Canecas", count: 28 },
    { name: "kits", label: "Kits", count: 12 },
    { name: "moletons", label: "Moletons", count: 8 },
    { name: "acessorios", label: "Acessórios", count: 7 },
  ]

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "todos" || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-white">
      <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      {/* Store Header - RESPONSIVO */}
      <div className="relative h-64 sm:h-52 md:h-60 lg:h-68 xl:h-80 overflow-hidden">
        <Image
          src={store.coverImage || "/placeholder.svg"}
          alt={`${store.name} cover`}
          fill
          className="object-cover"
          priority
        />
        <div className={`absolute inset-0 bg-gradient-to-t ${store.color} opacity-60`} />

        {/* Back Button - RESPONSIVO */}
        <div className="absolute top-4 sm:top-6 md:top-8 left-3 sm:left-4 md:left-6 z-20 hidden sm:block">
          <Button 
            variant="ghost" 
            size="sm"
            className="text-white hover:bg-white/20 text-xs sm:text-sm px-3 sm:px-4 py-2 sm:py-3 bg-black/40 backdrop-blur-sm border border-white/20 shadow-lg" 
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
            Voltar
          </Button>
        </div>

        {/* Back Button Mobile - RESPONSIVO */}
        <div className="absolute top-4 left-4 z-20 sm:hidden">
          <Button 
            variant="ghost" 
            size="sm"
            className="text-white hover:bg-white/20 text-xs px-2 py-1 bg-black/60 backdrop-blur-sm rounded-full w-10 h-10 p-0 shadow-lg border border-white/20" 
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </div>

        {/* Store Info - RESPONSIVO */}
        <div className="absolute bottom-2 sm:bottom-3 md:bottom-4 lg:bottom-6 left-2 sm:left-3 md:left-4 lg:left-6 right-2 sm:right-3 md:right-4 lg:right-6 text-white z-10">
          <div className="flex flex-col space-y-3 sm:space-y-2 md:space-y-3">
            {/* Avatar e Nome - RESPONSIVO */}
            <div className="flex flex-col space-y-3 sm:space-y-2 md:space-y-3">
              <div className="flex items-start space-x-3 sm:space-x-4">
                <Image
                  src={store.avatar || "/placeholder.svg"}
                  alt={store.creator}
                  width={60}
                  height={60}
                  className="rounded-full border-2 sm:border-3 md:border-4 border-white w-16 h-16 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 xl:w-28 xl:h-28 flex-shrink-0 mt-1"
                />
                
                {/* Store Details - RESPONSIVO */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col space-y-2 sm:space-y-1 md:space-y-2">
                    <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-1 sm:space-x-2">
                      <h1 className="text-xl sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold leading-tight break-words pr-12 sm:pr-0">
                        {store.name}
                      </h1>
                      {store.verified && (
                        <Badge className="bg-white text-black text-xs px-2 py-1 w-fit flex-shrink-0">
                          <Crown className="w-3 h-3 mr-1" />
                          Verificado
                        </Badge>
                      )}
                    </div>
                    
                    <p className="text-white/90 mb-3 sm:mb-2 md:mb-2 text-sm sm:text-sm md:text-base lg:text-lg max-w-full leading-tight break-words pr-12 sm:pr-0">
                      {store.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Stats - RESPONSIVO */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-1 md:gap-2 lg:gap-3 text-sm sm:text-xs md:text-sm">
              <span className="flex items-center bg-white/10 backdrop-blur-sm px-3 py-2 sm:px-2 sm:py-1 rounded-lg flex-shrink-0 max-w-full">
                <Users className="w-5 h-5 sm:w-4 sm:h-4 md:w-5 md:h-5 mr-2 sm:mr-1 md:mr-2 flex-shrink-0" />
                <span className="truncate">{store.followers} seguidores</span>
              </span>
              <span className="flex items-center bg-white/10 backdrop-blur-sm px-3 py-2 sm:px-2 sm:py-1 rounded-lg flex-shrink-0 max-w-full">
                <Star className="w-5 h-5 sm:w-4 sm:h-4 md:w-5 md:h-5 fill-yellow-400 text-yellow-400 mr-2 sm:mr-1 md:mr-2 flex-shrink-0" />
                <span className="truncate">{store.rating} ({store.reviews})</span>
              </span>
              <span className="flex items-center bg-white/10 backdrop-blur-sm px-3 py-2 sm:px-2 sm:py-1 rounded-lg flex-shrink-0 max-w-full">
                <ShoppingCart className="w-5 h-5 sm:w-4 sm:h-4 md:w-5 md:h-5 mr-2 sm:mr-1 md:mr-2 flex-shrink-0" />
                <span className="truncate">{store.sales} vendas</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Store Info Stats - RESPONSIVO */}
      <div className="bg-gray-50 py-4 sm:py-6 lg:py-8">
        <div className="container mx-auto px-2 sm:px-3 md:px-4 lg:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 md:gap-4 lg:gap-6 text-center">
            <div className="bg-white p-2 sm:p-3 md:p-4 rounded-lg shadow-sm min-w-0">
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-gray-900 mb-1 truncate">
                {store.products}
              </p>
              <p className="text-xs sm:text-sm text-gray-600 truncate">Produtos</p>
            </div>
            <div className="bg-white p-2 sm:p-3 md:p-4 rounded-lg shadow-sm min-w-0">
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-gray-900 mb-1 truncate">
                {store.followers}
              </p>
              <p className="text-xs sm:text-sm text-gray-600 truncate">Seguidores</p>
            </div>
            <div className="bg-white p-2 sm:p-3 md:p-4 rounded-lg shadow-sm min-w-0">
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-gray-900 mb-1 truncate">
                {store.rating}
              </p>
              <p className="text-xs sm:text-sm text-gray-600 truncate">Avaliação</p>
            </div>
            <div className="bg-white p-2 sm:p-3 md:p-4 rounded-lg shadow-sm min-w-0">
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-gray-900 mb-1 truncate">
                {store.founded}
              </p>
              <p className="text-xs sm:text-sm text-gray-600 truncate">Fundada em</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-2 sm:px-3 md:px-4 lg:px-6 py-6 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {/* Sidebar - RESPONSIVO */}
          <div className="lg:col-span-1 order-2 lg:order-1">
            <Card className="sticky top-4">
              <CardContent className="p-3 sm:p-4 md:p-5">
                <h3 className="font-bold text-base sm:text-lg md:text-xl mb-3 sm:mb-4 md:mb-5 flex items-center text-gray-900">
                  <Filter className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-amber-600" />
                  Categorias
                </h3>
                <div className="space-y-2 sm:space-y-3">
                  {categories.map((category) => (
                    <button
                      key={category.name}
                      onClick={() => setSelectedCategory(category.name)}
                      className={`w-full text-left p-2 sm:p-3 md:p-4 rounded-lg transition-all duration-200 text-sm sm:text-base font-medium ${
                        selectedCategory === category.name
                          ? "bg-amber-100 text-amber-800 border-2 border-amber-200 shadow-sm"
                          : "hover:bg-gray-50 text-gray-700 hover:border-2 hover:border-gray-200"
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span className="capitalize">{category.label}</span>
                        <Badge variant="outline" className="text-xs bg-white">
                          {category.count}
                        </Badge>
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Products - RESPONSIVO */}
          <div className="lg:col-span-3 order-1 lg:order-2">
            {/* Controls - RESPONSIVO */}
            <div className="flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:justify-between sm:items-center mb-4 sm:mb-6 lg:mb-8">
              <div className="text-center sm:text-left">
                <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-900">
                  {selectedCategory === "todos"
                    ? "Todos os Produtos"
                    : categories.find((c) => c.name === selectedCategory)?.label}
                </h2>
                <p className="text-sm sm:text-base text-gray-600 mt-1">
                  {filteredProducts.length} produtos encontrados
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2 md:space-x-3 lg:space-x-4">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="bg-white text-xs sm:text-sm w-full sm:w-auto px-4 py-2"
                    >
                      <SortAsc className="w-4 h-4 mr-2" />
                      Ordenar
                      <ChevronDown className="w-4 h-4 ml-2" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>Mais Relevantes</DropdownMenuItem>
                    <DropdownMenuItem>Menor Preço</DropdownMenuItem>
                    <DropdownMenuItem>Maior Preço</DropdownMenuItem>
                    <DropdownMenuItem>Mais Vendidos</DropdownMenuItem>
                    <DropdownMenuItem>Melhor Avaliados</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <div className="flex border rounded-lg bg-white overflow-hidden">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className="rounded-r-none px-3 py-2 border-r"
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className="rounded-l-none px-3 py-2"
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Products Grid - RESPONSIVO */}
            <div
              className={`grid gap-3 sm:gap-4 md:gap-6 lg:gap-8 ${
                viewMode === "grid" 
                  ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3" 
                  : "grid-cols-1"
              }`}
            >
              {filteredProducts.map((product) => (
                <Link key={product.id} href={`/produto/${product.id}`}>
                  <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 group cursor-pointer h-full bg-white min-w-0">
                    <div className="relative">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        width={400}
                        height={400}
                        className={`w-full object-cover group-hover:scale-105 transition-transform duration-300 ${
                          viewMode === "grid" 
                            ? "h-40 sm:h-44 md:h-48 lg:h-56" 
                            : "h-28 sm:h-32 md:h-36 lg:h-40"
                        }`}
                      />

                      {/* Badges - RESPONSIVO */}
                      <div className="absolute top-2 sm:top-3 md:top-4 left-2 sm:left-3 md:left-4 flex flex-col space-y-1 sm:space-y-2">
                        <Badge className={`${product.badgeColor} text-white font-bold text-xs px-2 py-1`}>
                          {product.badge}
                        </Badge>
                        {product.discount && (
                          <Badge className="bg-green-500 text-white font-bold text-xs px-2 py-1">
                            {product.discount}
                          </Badge>
                        )}
                        {product.freeShipping && (
                          <Badge className="bg-blue-500 text-white text-xs px-2 py-1">
                            Frete Grátis
                          </Badge>
                        )}
                      </div>

                      {/* Action Buttons - RESPONSIVO */}
                      <div className="absolute top-2 sm:top-3 md:top-4 right-2 sm:right-3 md:right-4 flex flex-col space-y-1 sm:space-y-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button size="sm" className="bg-white/90 text-gray-800 hover:bg-white w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 shadow-lg">
                          <Heart className="w-3 h-3 sm:w-4 sm:h-4" />
                        </Button>
                        <Button size="sm" className="bg-white/90 text-gray-800 hover:bg-white w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 shadow-lg">
                          <Share2 className="w-3 h-3 sm:w-4 sm:h-4" />
                        </Button>
                        <Button size="sm" className="bg-white/90 text-gray-800 hover:bg-white w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 shadow-lg">
                          <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
                        </Button>
                      </div>
                    </div>

                    <CardContent className={`p-2 sm:p-3 md:p-4 lg:p-5 ${viewMode === "list" ? "flex items-center space-x-2 sm:space-x-3 md:space-x-4" : ""}`}>
                      <div className={viewMode === "list" ? "flex-1" : ""}>
                        <h3 className="font-bold text-sm sm:text-base md:text-lg mb-2 sm:mb-3 line-clamp-2 group-hover:text-amber-600 transition-colors leading-tight break-words">
                          {product.name}
                        </h3>

                        {/* Rating - RESPONSIVO */}
                        <div className="flex items-center space-x-1 mb-2 sm:mb-3">
                          <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-yellow-400 text-yellow-400 flex-shrink-0" />
                          <span className="text-xs sm:text-sm font-medium truncate">{product.rating}</span>
                          <span className="text-xs text-gray-500 truncate">({product.reviews})</span>
                        </div>

                        {/* Price - RESPONSIVO */}
                        <div className="bg-green-50 p-2 sm:p-3 rounded-lg mb-2 sm:mb-3">
                          <div className="flex flex-col space-y-1">
                            <span className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-green-600 truncate">
                              R$ {product.price.toFixed(2)}
                            </span>
                            {product.originalPrice && (
                              <span className="text-xs sm:text-sm md:text-base text-gray-500 line-through truncate">
                                R$ {product.originalPrice.toFixed(2)}
                              </span>
                            )}
                          </div>
                          {product.originalPrice && (
                            <p className="text-xs sm:text-sm text-green-600 font-semibold truncate">
                              Economize R$ {(product.originalPrice - product.price).toFixed(2)}
                            </p>
                          )}
                        </div>

                        {/* Actions - RESPONSIVO */}
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                          <span className="text-xs sm:text-sm text-gray-500 text-center sm:text-left">
                            {product.sales} vendidos
                          </span>
                          <Button 
                            size="sm" 
                            className="bg-amber-500 hover:bg-amber-600 text-white font-semibold text-xs sm:text-sm px-3 py-2 w-full sm:w-auto"
                          >
                            Comprar
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-8 sm:py-12">
                <ShoppingCart className="w-12 h-12 sm:w-16 sm:h-16 mx-auto text-gray-400 mb-3 sm:mb-4" />
                <h3 className="text-lg sm:text-xl font-semibold mb-2">Nenhum produto encontrado</h3>
                <p className="text-sm sm:text-base text-gray-600">Tente ajustar os filtros ou buscar por outros termos</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />

      {/* WhatsApp Float - RESPONSIVO */}
      <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-50">
        <Button className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-green-500 hover:bg-green-600 shadow-xl hover:shadow-2xl hover:scale-110 transition-all duration-300">
          <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
        </Button>
      </div>
    </div>
  )
}
