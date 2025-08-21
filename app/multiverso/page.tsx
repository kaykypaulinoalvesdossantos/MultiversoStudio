"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Navbar } from "@/components/navbar"
import {
  Star,
  Users,
  Grid3X3,
  List,
  Filter,
  SortAsc,
  TrendingUp,
  Crown,
  MessageCircle,
  ChevronDown,
  Heart,
  Share2,
  Eye,
  Sparkles,
  Zap,
  ArrowRight,
  Package,
  Coffee,
  Gamepad2,
  Music,
  Gift,
  Rocket,
} from "lucide-react"

export default function MultiversoStorePage() {
  const [viewMode, setViewMode] = useState("grid")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("multiverso-original")
  const [selectedFilter, setSelectedFilter] = useState({
    color: "todas",
    size: "todos",
    price: "todos",
    brand: "todas",
    type: "todos",
  })

  // Produtos de lançamento
  const launchProducts = [
    {
      id: 1,
      name: "Camiseta Multiverso Estudio - Edição Especial 2024",
      price: 89.9,
      originalPrice: 119.9,
      image: "/placeholder.svg?height=400&width=400",
      store: "Multiverso Estudio",
      rating: 4.9,
      reviews: 567,
      sales: 2345,
      badge: "🚀 Lançamento",
      badgeColor: "bg-red-500",
      discount: 25,
      freeShipping: true,
      isNew: true,
    },
    {
      id: 2,
      name: "Kit Multiverso Premium - Camiseta + Caneca + Adesivos",
      price: 149.9,
      originalPrice: 199.9,
      image: "/placeholder.svg?height=400&width=400",
      store: "Multiverso Estudio",
      rating: 4.8,
      reviews: 234,
      sales: 1234,
      badge: "💎 Premium",
      badgeColor: "bg-purple-600",
      discount: 25,
      freeShipping: true,
      isNew: true,
    },
    {
      id: 3,
      name: "Caneca Multiverso - Lojas dentro de Lojas",
      price: 49.9,
      originalPrice: 69.9,
      image: "/placeholder.svg?height=400&width=400",
      store: "Multiverso Estudio",
      rating: 4.7,
      reviews: 156,
      sales: 856,
      badge: "⭐ Exclusivo",
      badgeColor: "bg-amber-600",
      discount: 29,
      freeShipping: true,
      isNew: true,
    },
  ]

  // Categorias melhoradas
  const categories = [
    {
      name: "canecas",
      label: "Canecas",
      icon: <Coffee className="w-8 h-8" />,
      count: 234,
      color: "from-amber-500 to-orange-500",
      description: "Canecas personalizadas de todos os criadores",
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      name: "vestuario",
      label: "Vestuário",
      icon: <Package className="w-8 h-8" />,
      count: 456,
      color: "from-blue-500 to-purple-500",
      description: "Camisetas, moletons e mais",
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      name: "gaming",
      label: "Gaming",
      icon: <Gamepad2 className="w-8 h-8" />,
      count: 189,
      color: "from-purple-500 to-pink-500",
      description: "Produtos para gamers",
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      name: "musica",
      label: "Música",
      icon: <Music className="w-8 h-8" />,
      count: 167,
      color: "from-green-500 to-teal-500",
      description: "Para os amantes da música",
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      name: "kits",
      label: "Kits",
      icon: <Gift className="w-8 h-8" />,
      count: 89,
      color: "from-red-500 to-pink-500",
      description: "Combos promocionais",
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      name: "lancamentos",
      label: "Lançamentos",
      icon: <Rocket className="w-8 h-8" />,
      count: 67,
      color: "from-yellow-500 to-red-500",
      description: "Novidades da semana",
      image: "/placeholder.svg?height=300&width=400",
    },
  ]

  // Filtros avançados
  const filters = {
    colors: ["Todas", "Preto", "Branco", "Azul", "Vermelho", "Verde", "Amarelo", "Rosa", "Roxo"],
    sizes: ["Todos", "PP", "P", "M", "G", "GG", "XG"],
    prices: ["Todos", "Até R$ 50", "R$ 50 - R$ 100", "R$ 100 - R$ 200", "Acima de R$ 200"],
    brands: ["Todas", "Sacocheio.tv", "Canal do Gamer", "Cinemagrath", "Música Indie", "Multiverso"],
    types: ["Todos", "Lançamentos", "Mais Vendidos", "Promoções", "Edição Limitada"],
  }

  // Produtos da Multiverso (próprios + de todas as lojas)
  const products = [
    // Produtos próprios da Multiverso
    {
      id: 4,
      name: "Camiseta Multiverso Estudio - Logo Oficial",
      price: 69.9,
      originalPrice: 89.9,
      image: "/placeholder.svg?height=400&width=400",
      store: "Multiverso Estudio",
      storeSlug: "multiverso",
      storeColor: "#6B46C1",
      rating: 4.9,
      reviews: 567,
      sales: 2345,
      badge: "🌟 Original",
      badgeColor: "bg-purple-600",
      category: "camisetas",
      isMultiversoOriginal: true,
      colors: ["Preto", "Branco", "Roxo"],
      sizes: ["P", "M", "G", "GG"],
      type: "original",
    },
    {
      id: 5,
      name: "Caneca Multiverso - Lojas dentro de Lojas",
      price: 39.9,
      originalPrice: 49.9,
      image: "/placeholder.svg?height=400&width=400",
      store: "Multiverso Estudio",
      storeSlug: "multiverso",
      storeColor: "#6B46C1",
      rating: 4.8,
      reviews: 234,
      sales: 1234,
      badge: "🌟 Original",
      badgeColor: "bg-purple-600",
      category: "canecas",
      isMultiversoOriginal: true,
      colors: ["Branco", "Preto"],
      sizes: ["Único"],
      type: "original",
    },
    // Produtos de outras lojas
    {
      id: 6,
      name: "Camiseta Cafézini Garganttinni - Edição Limitada",
      price: 79.9,
      originalPrice: 99.9,
      image: "/placeholder.svg?height=400&width=400",
      store: "Sacocheio.tv",
      storeSlug: "sacocheio",
      storeColor: "#8B4513",
      rating: 4.8,
      reviews: 234,
      sales: 1234,
      badge: "🔥 Lançamento",
      badgeColor: "bg-red-500",
      category: "camisetas",
      isMultiversoOriginal: false,
      colors: ["Preto", "Branco", "Marrom"],
      sizes: ["P", "M", "G", "GG"],
      type: "lancamento",
    },
    {
      id: 7,
      name: "Kit Gamer Pro - Camiseta + Caneca RGB",
      price: 139.9,
      originalPrice: 179.9,
      image: "/placeholder.svg?height=400&width=400",
      store: "Canal do Gamer",
      storeSlug: "gamerpro",
      storeColor: "#6B46C1",
      rating: 4.8,
      reviews: 123,
      sales: 567,
      badge: "🎮 Gamer Choice",
      badgeColor: "bg-purple-600",
      category: "kits",
      isMultiversoOriginal: false,
      colors: ["Preto", "Azul"],
      sizes: ["P", "M", "G"],
      type: "mais-vendidos",
    },
    {
      id: 8,
      name: "Caneca Noir Cinemagrath - Edição Terror",
      price: 55.9,
      originalPrice: 69.9,
      image: "/placeholder.svg?height=400&width=400",
      store: "Cinemagrath",
      storeSlug: "cinemagrath",
      storeColor: "#8B0000",
      rating: 4.9,
      reviews: 156,
      sales: 856,
      badge: "🎬 Cult Classic",
      badgeColor: "bg-red-800",
      category: "canecas",
      isMultiversoOriginal: false,
      colors: ["Preto", "Vermelho"],
      sizes: ["Único"],
      type: "edicao-limitada",
    },
    {
      id: 9,
      name: "Moletom Indie Vibes - Algodão Orgânico",
      price: 159.9,
      image: "/placeholder.svg?height=400&width=400",
      store: "Música Indie",
      storeSlug: "indievibes",
      storeColor: "#059669",
      rating: 4.7,
      reviews: 89,
      sales: 432,
      badge: "🎵 Indie Vibes",
      badgeColor: "bg-green-600",
      category: "moletons",
      isMultiversoOriginal: false,
      colors: ["Verde", "Preto", "Branco"],
      sizes: ["P", "M", "G", "GG", "XG"],
      type: "sustentavel",
    },
  ]

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory =
      selectedCategory === "todos" ||
      product.category === selectedCategory ||
      (selectedCategory === "multiverso-original" && product.isMultiversoOriginal)
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section Melhorado */}
      <section className="relative overflow-hidden pt-20">
        <div className="h-96 relative">
          {/* Background com gradiente animado */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600" />
          <div className="absolute inset-0 bg-black/20" />

          {/* Elementos flutuantes animados */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full animate-float" />
            <div
              className="absolute top-32 right-20 w-16 h-16 bg-white/10 rounded-full animate-float"
              style={{ animationDelay: "1s" }}
            />
            <div
              className="absolute bottom-20 left-1/3 w-12 h-12 bg-white/10 rounded-full animate-float"
              style={{ animationDelay: "0.5s" }}
            />
            <div
              className="absolute top-20 right-1/3 w-24 h-24 bg-white/5 rounded-full animate-float"
              style={{ animationDelay: "1.5s" }}
            />
          </div>

          <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl">
                <div className="glass-effect rounded-2xl p-8 max-w-3xl">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-4 rounded-full animate-pulse-glow">
                      <Sparkles className="w-12 h-12 text-white" />
                    </div>
                    <Badge className="bg-purple-500 text-white text-lg px-4 py-2 animate-pulse">
                      <Crown className="w-5 h-5 mr-2" />
                      Loja Oficial
                    </Badge>
                  </div>

                  <h1 className="text-6xl font-black mb-4 text-white drop-shadow-lg gradient-text">
                    Multiverso Estudio
                  </h1>

                  <p className="text-2xl font-bold mb-2 text-purple-200">LOJAS DENTRO DE LOJAS</p>

                  <p className="text-xl mb-8 max-w-3xl text-white/90 leading-relaxed">
                    A plataforma oficial que conecta criadores e fãs. Produtos exclusivos da Multiverso + o melhor de
                    todas as lojas parceiras em um só lugar.
                  </p>

                  <div className="flex items-center space-x-8 text-lg text-white">
                    <span className="flex items-center glass-effect px-4 py-2 rounded-lg">
                      <Users className="w-6 h-6 mr-2" />
                      5.2M+ usuários
                    </span>
                    <span className="flex items-center glass-effect px-4 py-2 rounded-lg">
                      <Star className="w-6 h-6 mr-2 fill-yellow-400 text-yellow-400" />
                      4.9 avaliação
                    </span>
                    <span className="flex items-center glass-effect px-4 py-2 rounded-lg">
                      <TrendingUp className="w-6 h-6 mr-2" />
                      1.2K+ produtos
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Produtos de Lançamento */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-red-500 to-orange-500 p-3 rounded-full animate-pulse-glow">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-4xl font-bold">Lançamentos Exclusivos</h2>
                <p className="text-xl text-gray-600">Os produtos mais recentes da Multiverso Estudio</p>
              </div>
            </div>
            <Button variant="outline" className="text-lg px-8 py-3 bg-transparent hover-lift">
              Ver Todos
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {launchProducts.map((product) => (
              <Link key={product.id} href={`/produto/${product.id}`}>
                <Card className="overflow-hidden hover:shadow-2xl transition-all duration-500 group cursor-pointer h-full hover-lift">
                  <div className="relative aspect-[2300/3066] overflow-hidden">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />

                    <div className="absolute top-4 left-4 flex flex-col space-y-2">
                      <Badge className={`${product.badgeColor} text-white animate-pulse font-bold`}>
                        {product.badge}
                      </Badge>
                      {product.originalPrice && (
                        <Badge className="bg-green-500 text-white font-bold">{product.discount}% OFF</Badge>
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

                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <Badge variant="outline" className="text-xs font-semibold text-purple-600 border-purple-600">
                        {product.store}
                      </Badge>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{product.rating}</span>
                        <span className="text-xs text-gray-500">({product.reviews})</span>
                      </div>
                    </div>

                    <h3 className="font-bold text-lg mb-3 line-clamp-2 group-hover:text-gray-600 transition-colors">
                      {product.name}
                    </h3>

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
                      <div className="flex items-center space-x-3 text-sm text-gray-500">
                        <span className="flex items-center">
                          <TrendingUp className="w-4 h-4 mr-1" />
                          {product.sales} vendidos
                        </span>
                      </div>
                      <Button
                        size="sm"
                        className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-semibold"
                      >
                        Comprar
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Categorias Melhoradas */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Explore por Categoria</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Descubra produtos únicos organizados por categoria
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category) => (
              <Link key={category.name} href={`/categoria/${category.name}`}>
                <Card className="category-card overflow-hidden cursor-pointer h-full group">
                  <div className="relative h-48 overflow-hidden">
                    <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-90`} />
                    <Image
                      src={category.image || "/placeholder.svg"}
                      alt={category.label}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-black/20" />

                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center text-white">
                        <div className="bg-white/20 p-4 rounded-full mb-4 mx-auto w-fit">{category.icon}</div>
                        <h3 className="text-2xl font-bold mb-2">{category.label}</h3>
                        <p className="text-white/90 mb-4">{category.description}</p>
                        <Badge className="bg-white/20 text-white">{category.count} produtos</Badge>
                      </div>
                    </div>
                  </div>

                  <CardContent className="p-6 bg-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-bold text-lg text-gray-900">{category.label}</h4>
                        <p className="text-sm text-gray-600">{category.count} produtos disponíveis</p>
                      </div>
                      <Button
                        size="sm"
                        className={`bg-gradient-to-r ${category.color} hover:opacity-90 text-white font-semibold`}
                      >
                        Explorar
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Produtos Principais com Filtros Laterais */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex gap-8">
            {/* Sidebar de Filtros */}
            <div className="w-80 space-y-6">
              <Card className="shadow-lg hover-lift">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4 flex items-center text-gray-900">
                    <Filter className="w-5 h-5 mr-2 text-purple-600" />
                    Filtros
                  </h3>

                  {/* Categorias */}
                  <div className="mb-6">
                    <h4 className="font-semibold mb-3 text-gray-900">Categorias</h4>
                    <div className="space-y-2">
                      {[
                        { name: "multiverso-original", label: "Multiverso Original", count: 45 },
                        { name: "todos", label: "Todos os Produtos", count: 1247 },
                        { name: "camisetas", label: "Camisetas", count: 456 },
                        { name: "canecas", label: "Canecas", count: 234 },
                        { name: "moletons", label: "Moletons", count: 189 },
                        { name: "acessorios", label: "Acessórios", count: 167 },
                        { name: "kits", label: "Kits", count: 89 },
                      ].map((category) => (
                        <button
                          key={category.name}
                          onClick={() => setSelectedCategory(category.name)}
                          className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${
                            selectedCategory === category.name
                              ? "bg-purple-100 text-purple-700 font-semibold shadow-md"
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
                  </div>

                  {/* Filtros adicionais */}
                  {Object.entries(filters).map(([filterKey, filterValues]) => (
                    <div key={filterKey} className="mb-6">
                      <h4 className="font-semibold mb-3 text-gray-900 capitalize">
                        {filterKey === "colors"
                          ? "Cores"
                          : filterKey === "sizes"
                            ? "Tamanhos"
                            : filterKey === "prices"
                              ? "Preços"
                              : filterKey === "brands"
                                ? "Lojas"
                                : filterKey === "types"
                                  ? "Tipos"
                                  : filterKey}
                      </h4>
                      <div
                        className={`grid gap-2 ${filterKey === "colors" || filterKey === "sizes" ? "grid-cols-3" : "grid-cols-1"}`}
                      >
                        {filterValues.map((value) => (
                          <button
                            key={value}
                            className={`p-2 text-sm rounded-lg border transition-all duration-200 ${
                              selectedFilter[filterKey as keyof typeof selectedFilter] === value.toLowerCase()
                                ? "border-purple-500 bg-purple-50 text-purple-700 font-semibold"
                                : "border-gray-200 hover:border-gray-300 text-gray-700 hover:bg-gray-50"
                            }`}
                            onClick={() =>
                              setSelectedFilter((prev) => ({
                                ...prev,
                                [filterKey]: value.toLowerCase(),
                              }))
                            }
                          >
                            {value}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Área de Produtos */}
            <div className="flex-1">
              {/* Controles superiores */}
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">
                    {selectedCategory === "todos"
                      ? "Todos os Produtos"
                      : selectedCategory === "multiverso-original"
                        ? "Produtos Multiverso Original"
                        : `Categoria: ${selectedCategory}`}
                  </h2>
                  <p className="text-gray-600">{filteredProducts.length} produtos encontrados</p>
                </div>

                <div className="flex items-center space-x-4">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="bg-white hover-lift">
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
                      <DropdownMenuItem>Lançamentos</DropdownMenuItem>
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

              {/* Grid de Produtos */}
              <div
                className={`grid gap-6 ${
                  viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
                }`}
              >
                {filteredProducts.map((product) => (
                  <Link key={product.id} href={`/produto/${product.id}`}>
                    <Card className="overflow-hidden hover:shadow-2xl transition-all duration-500 group cursor-pointer h-full hover-lift">
                      <div className="relative">
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          width={400}
                          height={400}
                          className={`w-full object-cover group-hover:scale-110 transition-transform duration-500 ${
                            viewMode === "grid" ? "h-64" : "h-48"
                          }`}
                        />

                        <div className="absolute top-4 left-4 flex flex-col space-y-2">
                          <Badge className={`${product.badgeColor} text-white font-bold`}>{product.badge}</Badge>
                          {product.originalPrice && (
                            <Badge className="bg-green-500 text-white font-bold">
                              {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                            </Badge>
                          )}
                          {product.isMultiversoOriginal && (
                            <Badge className="bg-purple-600 text-white font-bold">
                              <Sparkles className="w-3 h-3 mr-1" />
                              Original
                            </Badge>
                          )}
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
                          <div className="flex items-center justify-between mb-3">
                            <Badge
                              variant="outline"
                              className="text-xs font-semibold"
                              style={{ borderColor: product.storeColor, color: product.storeColor }}
                            >
                              {product.store}
                            </Badge>
                            <div className="flex items-center space-x-1">
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              <span className="text-sm font-medium">{product.rating}</span>
                              <span className="text-xs text-gray-500">({product.reviews})</span>
                            </div>
                          </div>

                          <h3 className="font-bold text-lg mb-3 line-clamp-2 group-hover:text-gray-600 transition-colors">
                            {product.name}
                          </h3>

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
                            <div className="flex items-center space-x-3 text-sm text-gray-500">
                              <span className="flex items-center">
                                <TrendingUp className="w-4 h-4 mr-1" />
                                {product.sales} vendidos
                              </span>
                            </div>
                            <Button
                              size="sm"
                              className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-semibold"
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
            </div>
          </div>
        </div>
      </section>

      {/* WhatsApp Float */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button className="w-16 h-16 rounded-full bg-green-500 hover:bg-green-600 shadow-2xl hover:scale-110 transition-all animate-pulse-glow">
          <MessageCircle className="w-8 h-8 text-white" />
        </Button>
      </div>
    </div>
  )
}
