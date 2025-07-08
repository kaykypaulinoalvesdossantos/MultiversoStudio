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

      {/* Store Header */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        <Image
          src={store.coverImage || "/placeholder.svg"}
          alt={`${store.name} cover`}
          fill
          className="object-cover"
          priority
        />
        <div className={`absolute inset-0 bg-gradient-to-t ${store.color} opacity-60`} />

        {/* Back Button */}
        <div className="absolute top-4 left-4">
          <Button variant="ghost" className="text-white hover:bg-white/20" onClick={() => window.history.back()}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
        </div>

        <div className="absolute bottom-6 left-6 right-6 text-white">
          <div className="flex flex-col md:flex-row items-start md:items-end space-y-4 md:space-y-0 md:space-x-6">
            <Image
              src={store.avatar || "/placeholder.svg"}
              alt={store.creator}
              width={80}
              height={80}
              className="rounded-full border-4 border-white md:w-[120px] md:h-[120px]"
            />
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <h1 className="text-2xl md:text-4xl font-bold">{store.name}</h1>
                {store.verified && (
                  <Badge className="bg-white text-black">
                    <Crown className="w-3 h-3 mr-1" />
                    Verificado
                  </Badge>
                )}
              </div>
              <p className="text-white/90 mb-4 text-base md:text-lg max-w-2xl">{store.description}</p>
              <div className="flex flex-wrap items-center gap-4 text-sm">
                <span className="flex items-center">
                  <Users className="w-4 h-4 mr-1" />
                  {store.followers} seguidores
                </span>
                <span className="flex items-center">
                  <Star className="w-4 h-4 mr-1 fill-yellow-400 text-yellow-400" />
                  {store.rating} ({store.reviews} avaliações)
                </span>
                <span className="flex items-center">
                  <ShoppingCart className="w-4 h-4 mr-1" />
                  {store.sales} vendas
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Store Info */}
      <div className="bg-gray-50 py-6">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold">{store.products}</p>
              <p className="text-gray-600">Produtos</p>
            </div>
            <div>
              <p className="text-2xl font-bold">{store.followers}</p>
              <p className="text-gray-600">Seguidores</p>
            </div>
            <div>
              <p className="text-2xl font-bold">{store.rating}</p>
              <p className="text-gray-600">Avaliação</p>
            </div>
            <div>
              <p className="text-2xl font-bold">{store.founded}</p>
              <p className="text-gray-600">Fundada em</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-4 flex items-center">
                  <Filter className="w-5 h-5 mr-2" />
                  Categorias
                </h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.name}
                      onClick={() => setSelectedCategory(category.name)}
                      className={`w-full text-left p-3 rounded-lg transition-colors ${
                        selectedCategory === category.name
                          ? "bg-amber-100 text-amber-800 font-semibold"
                          : "hover:bg-gray-50 text-gray-700"
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span>{category.label}</span>
                        <Badge variant="outline" className="text-xs">
                          {category.count}
                        </Badge>
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Products */}
          <div className="lg:col-span-3">
            {/* Controls */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 space-y-4 md:space-y-0">
              <div>
                <h2 className="text-2xl font-bold">
                  {selectedCategory === "todos"
                    ? "Todos os Produtos"
                    : categories.find((c) => c.name === selectedCategory)?.label}
                </h2>
                <p className="text-gray-600">{filteredProducts.length} produtos encontrados</p>
              </div>

              <div className="flex items-center space-x-4">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="bg-white">
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

                <div className="flex border rounded-md bg-white">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="icon"
                    onClick={() => setViewMode("grid")}
                    className="rounded-r-none"
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="icon"
                    onClick={() => setViewMode("list")}
                    className="rounded-l-none"
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div
              className={`grid gap-6 ${
                viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
              }`}
            >
              {filteredProducts.map((product) => (
                <Link key={product.id} href={`/produto/${product.id}`}>
                  <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 group cursor-pointer h-full">
                    <div className="relative">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        width={400}
                        height={400}
                        className={`w-full object-cover group-hover:scale-105 transition-transform duration-300 ${
                          viewMode === "grid" ? "h-64" : "h-48"
                        }`}
                      />

                      <div className="absolute top-4 left-4 flex flex-col space-y-2">
                        <Badge className={`${product.badgeColor} text-white font-bold`}>{product.badge}</Badge>
                        {product.discount && (
                          <Badge className="bg-green-500 text-white font-bold">{product.discount}</Badge>
                        )}
                        {product.freeShipping && <Badge className="bg-blue-500 text-white">Frete Grátis</Badge>}
                      </div>

                      <div className="absolute top-4 right-4 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button size="icon" className="bg-white/90 text-gray-800 hover:bg-white">
                          <Heart className="w-4 h-4" />
                        </Button>
                        <Button size="icon" className="bg-white/90 text-gray-800 hover:bg-white">
                          <Share2 className="w-4 h-4" />
                        </Button>
                        <Button size="icon" className="bg-white/90 text-gray-800 hover:bg-white">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    <CardContent className={`p-6 ${viewMode === "list" ? "flex items-center space-x-6" : ""}`}>
                      <div className={viewMode === "list" ? "flex-1" : ""}>
                        <h3 className="font-bold text-lg mb-3 line-clamp-2 group-hover:text-amber-600 transition-colors">
                          {product.name}
                        </h3>

                        <div className="flex items-center space-x-1 mb-3">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">{product.rating}</span>
                          <span className="text-xs text-gray-500">({product.reviews})</span>
                        </div>

                        <div className="bg-green-50 p-3 rounded-lg mb-4">
                          <div className="flex items-center space-x-2">
                            <span className="text-2xl font-bold text-green-600">R$ {product.price.toFixed(2)}</span>
                            {product.originalPrice && (
                              <span className="text-lg text-gray-500 line-through">
                                R$ {product.originalPrice.toFixed(2)}
                              </span>
                            )}
                          </div>
                          {product.originalPrice && (
                            <p className="text-sm text-green-600 font-semibold">
                              Economize R$ {(product.originalPrice - product.price).toFixed(2)}
                            </p>
                          )}
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500">{product.sales} vendidos</span>
                          <Button size="sm" className="bg-amber-500 hover:bg-amber-600 text-white font-semibold">
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
              <div className="text-center py-12">
                <ShoppingCart className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Nenhum produto encontrado</h3>
                <p className="text-gray-600">Tente ajustar os filtros ou buscar por outros termos</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />

      {/* WhatsApp Float */}
      <div className="fixed bottom-6 right-6 z-40">
        <Button className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-green-500 hover:bg-green-600 shadow-lg hover:scale-105 transition-all">
          <MessageCircle className="w-6 h-6 md:w-8 md:h-8 text-white" />
        </Button>
      </div>
    </div>
  )
}
