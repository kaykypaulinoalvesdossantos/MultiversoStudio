"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Star,
  Grid3X3,
  List,
  Filter,
  SortAsc,
  TrendingUp,
  MessageCircle,
  ChevronDown,
  Heart,
  Share2,
  Eye,
  Coffee,
  Package,
  Gift,
  Rocket,
  Palette,
  Truck,
} from "lucide-react"
import { useParams } from "next/navigation"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

// Configurações por categoria
const categoryConfigs = {
  canecas: {
    name: "Canecas",
    icon: <Coffee className="w-8 h-8" />,
    color: "from-amber-500 to-orange-500",
    bgColor: "bg-amber-500",
    description: "Canecas personalizadas de todos os criadores",
    heroImage: "/placeholder.svg?height=400&width=1200",
    subcategories: [
      { name: "ceramica", label: "Cerâmica", description: "Canecas tradicionais de cerâmica" },
      { name: "vidro", label: "Vidro", description: "Canecas transparentes de vidro" },
      { name: "chopp", label: "Chopp", description: "Canecas estilo chopp para cerveja" },
      { name: "jateada", label: "Jateada", description: "Canecas com acabamento jateado" },
      { name: "lisa", label: "Lisa", description: "Canecas lisas para personalização" },
      { name: "termica", label: "Térmica", description: "Canecas que mantêm a temperatura" },
    ],
  },
  vestuario: {
    name: "Vestuário",
    icon: <Package className="w-8 h-8" />,
    color: "from-blue-500 to-purple-500",
    bgColor: "bg-blue-500",
    description: "Camisetas, moletons e mais",
    heroImage: "/placeholder.svg?height=400&width=1200",
    subcategories: [
      { name: "camisetas", label: "Camisetas", description: "Camisetas básicas e estampadas" },
      { name: "polo", label: "Polo", description: "Camisetas polo elegantes" },
      { name: "tradicional", label: "Tradicional", description: "Camisetas de corte tradicional" },
      { name: "streetwear", label: "StreetWear", description: "Estilo urbano e moderno" },
      { name: "babylook", label: "BabyLook", description: "Camisetas femininas" },
      { name: "premium", label: "Premium", description: "Linha premium de alta qualidade" },
      { name: "moletons", label: "Moletons", description: "Moletons e casacos" },
      { name: "regatas", label: "Regatas", description: "Camisetas sem manga" },
      { name: "bones", label: "Bonés", description: "Bonés e chapéus" },
    ],
  },
  "kits-promocionais": {
    name: "Kits Promocionais",
    icon: <Gift className="w-8 h-8" />,
    color: "from-red-500 to-pink-500",
    bgColor: "bg-red-500",
    description: "Combos promocionais",
    heroImage: "/placeholder.svg?height=400&width=1200",
    subcategories: [
      { name: "cafe", label: "Kit Café", description: "Caneca + Camiseta temática" },
      { name: "gamer", label: "Kit Gamer", description: "Produtos para gamers" },
      { name: "completo", label: "Kit Completo", description: "Vários produtos em combo" },
      { name: "presente", label: "Kit Presente", description: "Ideal para presentear" },
    ],
  },
  lancamentos: {
    name: "Lançamentos",
    icon: <Rocket className="w-8 h-8" />,
    color: "from-yellow-500 to-red-500",
    bgColor: "bg-yellow-500",
    description: "Novidades da semana",
    heroImage: "/placeholder.svg?height=400&width=1200",
    subcategories: [
      { name: "semana", label: "Esta Semana", description: "Lançamentos desta semana" },
      { name: "mes", label: "Este Mês", description: "Novidades do mês" },
      { name: "pre-venda", label: "Pré-Venda", description: "Produtos em pré-venda" },
      { name: "exclusivos", label: "Exclusivos", description: "Produtos exclusivos" },
    ],
  },
  personalizaveis: {
    name: "Personalizáveis",
    icon: <Palette className="w-8 h-8" />,
    color: "from-purple-500 to-indigo-500",
    bgColor: "bg-purple-500",
    description: "Produtos para personalizar",
    heroImage: "/placeholder.svg?height=400&width=1200",
    subcategories: [
      { name: "camisetas", label: "Camisetas", description: "Camisetas para personalizar" },
      { name: "canecas", label: "Canecas", description: "Canecas para personalizar" },
      { name: "adesivos", label: "Adesivos", description: "Adesivos personalizados" },
      { name: "chaveiros", label: "Chaveiros", description: "Chaveiros únicos" },
    ],
  },
}

export default function CategoryPage() {
  const params = useParams()
  const categoria = params.categoria as string
  const [viewMode, setViewMode] = useState("grid")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSubcategory, setSelectedSubcategory] = useState("todos")
  const [selectedFilter, setSelectedFilter] = useState({
    price: "todos",
    brand: "todas",
    rating: "todas",
  })

  const categoryConfig = categoryConfigs[categoria as keyof typeof categoryConfigs]

  if (!categoryConfig) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-3xl font-bold mb-4">Categoria não encontrada</h1>
          <p className="text-gray-600 mb-8">A categoria que você está procurando não existe.</p>
          <Link href="/">
            <Button>Voltar ao Início</Button>
          </Link>
        </div>
        <Footer />
      </div>
    )
  }

  // Produtos da categoria
  const products = [
    {
      id: 1,
      name: `${categoryConfig.name} Multiverso Studio - Edição Especial`,
      price: 69.9,
      originalPrice: 89.9,
      image: "/placeholder.svg?height=400&width=400",
      store: "Multiverso Studio",
      storeColor: "#6B46C1",
      rating: 4.9,
      reviews: 567,
      sales: 2345,
      badge: "🌟 Original",
      badgeColor: "bg-purple-600",
      subcategory: categoryConfig.subcategories[0]?.name || "geral",
      freeShipping: true,
    },
    {
      id: 2,
      name: `${categoryConfig.name} Sacocheio.tv - Cafézini`,
      price: 79.9,
      originalPrice: 99.9,
      image: "/placeholder.svg?height=400&width=400",
      store: "Sacocheio.tv",
      storeColor: "#8B4513",
      rating: 4.8,
      reviews: 234,
      sales: 1234,
      badge: "🔥 Lançamento",
      badgeColor: "bg-red-500",
      subcategory: categoryConfig.subcategories[1]?.name || "geral",
      freeShipping: true,
    },
    {
      id: 3,
      name: `${categoryConfig.name} Canal do Gamer - RGB Edition`,
      price: 139.9,
      originalPrice: 179.9,
      image: "/placeholder.svg?height=400&width=400",
      store: "Canal do Gamer",
      storeColor: "#6B46C1",
      rating: 4.8,
      reviews: 123,
      sales: 567,
      badge: "🎮 Gamer Choice",
      badgeColor: "bg-purple-600",
      subcategory: categoryConfig.subcategories[2]?.name || "geral",
      freeShipping: true,
    },
    {
      id: 4,
      name: `${categoryConfig.name} Cinemagrath - Noir Edition`,
      price: 55.9,
      originalPrice: 69.9,
      image: "/placeholder.svg?height=400&width=400",
      store: "Cinemagrath",
      storeColor: "#8B0000",
      rating: 4.9,
      reviews: 156,
      sales: 856,
      badge: "🎬 Cult Classic",
      badgeColor: "bg-red-800",
      subcategory: categoryConfig.subcategories[3]?.name || "geral",
      freeShipping: true,
    },
    {
      id: 5,
      name: `${categoryConfig.name} Música Indie - Organic`,
      price: 159.9,
      image: "/placeholder.svg?height=400&width=400",
      store: "Música Indie",
      storeColor: "#059669",
      rating: 4.7,
      reviews: 89,
      sales: 432,
      badge: "🎵 Indie Vibes",
      badgeColor: "bg-green-600",
      subcategory: categoryConfig.subcategories[4]?.name || "geral",
      freeShipping: true,
    },
    {
      id: 6,
      name: `${categoryConfig.name} Multiverso Studio - Premium Line`,
      price: 99.9,
      originalPrice: 129.9,
      image: "/placeholder.svg?height=400&width=400",
      store: "Multiverso Studio",
      storeColor: "#6B46C1",
      rating: 4.8,
      reviews: 345,
      sales: 1567,
      badge: "💎 Premium",
      badgeColor: "bg-purple-600",
      subcategory: categoryConfig.subcategories[5]?.name || "geral",
      freeShipping: true,
    },
  ]

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesSubcategory = selectedSubcategory === "todos" || product.subcategory === selectedSubcategory
    return matchesSearch && matchesSubcategory
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      {/* Hero Section da Categoria */}
      <section className="relative overflow-hidden">
        <div className="h-80 relative">
          <div className={`absolute inset-0 bg-gradient-to-r ${categoryConfig.color}`} />
          <Image
            src={categoryConfig.heroImage || "/placeholder.svg"}
            alt={categoryConfig.name}
            fill
            className="object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-black/20" />

          <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl">
                <div className="glass-effect rounded-2xl p-8 max-w-3xl">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className={`${categoryConfig.bgColor} p-4 rounded-full text-white`}>{categoryConfig.icon}</div>
                    <Badge className={`${categoryConfig.bgColor} text-white text-lg px-4 py-2`}>
                      Categoria Oficial
                    </Badge>
                  </div>

                  <h1 className="text-5xl font-black mb-4 text-white drop-shadow-lg">{categoryConfig.name}</h1>
                  <p className="text-xl mb-8 max-w-3xl text-white/90 leading-relaxed">
                    {categoryConfig.description}. Produtos de todos os criadores da plataforma.
                  </p>

                  <div className="flex items-center space-x-8 text-lg text-white">
                    <span className="flex items-center glass-effect px-4 py-2 rounded-lg">
                      <Package className="w-6 h-6 mr-2" />
                      {products.length}+ produtos
                    </span>
                    <span className="flex items-center glass-effect px-4 py-2 rounded-lg">
                      <Star className="w-6 h-6 mr-2 fill-yellow-400 text-yellow-400" />
                      4.8 avaliação média
                    </span>
                    <span className="flex items-center glass-effect px-4 py-2 rounded-lg">
                      <Truck className="w-6 h-6 mr-2" />
                      Frete grátis
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Subcategorias */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-4 overflow-x-auto pb-4">
            <Button
              variant={selectedSubcategory === "todos" ? "default" : "outline"}
              onClick={() => setSelectedSubcategory("todos")}
              className="whitespace-nowrap"
            >
              Todos
            </Button>
            {categoryConfig.subcategories.map((sub) => (
              <Button
                key={sub.name}
                variant={selectedSubcategory === sub.name ? "default" : "outline"}
                onClick={() => setSelectedSubcategory(sub.name)}
                className="whitespace-nowrap"
              >
                {sub.label}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Produtos com Filtros */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex gap-8">
            {/* Sidebar de Filtros */}
            <div className="w-80 space-y-6 hidden lg:block">
              <Card className="shadow-lg">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4 flex items-center text-gray-900">
                    <Filter className={`w-5 h-5 mr-2 ${categoryConfig.bgColor.replace("bg-", "text-")}`} />
                    Filtros
                  </h3>

                  {/* Subcategorias */}
                  <div className="mb-6">
                    <h4 className="font-semibold mb-3 text-gray-900">Subcategorias</h4>
                    <div className="space-y-2">
                      <button
                        onClick={() => setSelectedSubcategory("todos")}
                        className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${
                          selectedSubcategory === "todos"
                            ? `${categoryConfig.bgColor.replace("bg-", "bg-")}/10 ${categoryConfig.bgColor.replace("bg-", "text-")} font-semibold shadow-md`
                            : "hover:bg-gray-50 text-gray-700"
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <span>Todos os Produtos</span>
                          <Badge variant="outline" className="text-xs">
                            {products.length}
                          </Badge>
                        </div>
                      </button>
                      {categoryConfig.subcategories.map((sub) => (
                        <button
                          key={sub.name}
                          onClick={() => setSelectedSubcategory(sub.name)}
                          className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${
                            selectedSubcategory === sub.name
                              ? `${categoryConfig.bgColor.replace("bg-", "bg-")}/10 ${categoryConfig.bgColor.replace("bg-", "text-")} font-semibold shadow-md`
                              : "hover:bg-gray-50 text-gray-700"
                          }`}
                        >
                          <div className="flex justify-between items-center">
                            <div>
                              <span className="block">{sub.label}</span>
                              <span className="text-xs text-gray-500">{sub.description}</span>
                            </div>
                            <Badge variant="outline" className="text-xs">
                              {Math.floor(Math.random() * 50) + 10}
                            </Badge>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Filtro de Preço */}
                  <div className="mb-6">
                    <h4 className="font-semibold mb-3 text-gray-900">Preço</h4>
                    <div className="space-y-2">
                      {["Todos", "Até R$ 50", "R$ 50 - R$ 100", "R$ 100 - R$ 200", "Acima de R$ 200"].map((price) => (
                        <button
                          key={price}
                          className={`w-full text-left p-2 text-sm rounded transition-colors ${
                            selectedFilter.price === price.toLowerCase()
                              ? `${categoryConfig.bgColor.replace("bg-", "bg-")}/10 ${categoryConfig.bgColor.replace("bg-", "text-")}`
                              : "hover:bg-gray-50 text-gray-700"
                          }`}
                          onClick={() => setSelectedFilter((prev) => ({ ...prev, price: price.toLowerCase() }))}
                        >
                          {price}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Filtro de Loja */}
                  <div className="mb-6">
                    <h4 className="font-semibold mb-3 text-gray-900">Lojas</h4>
                    <div className="space-y-2">
                      {[
                        "Todas",
                        "Multiverso Studio",
                        "Sacocheio.tv",
                        "Canal do Gamer",
                        "Cinemagrath",
                        "Música Indie",
                      ].map((brand) => (
                        <button
                          key={brand}
                          className={`w-full text-left p-2 text-sm rounded transition-colors ${
                            selectedFilter.brand === brand.toLowerCase()
                              ? `${categoryConfig.bgColor.replace("bg-", "bg-")}/10 ${categoryConfig.bgColor.replace("bg-", "text-")}`
                              : "hover:bg-gray-50 text-gray-700"
                          }`}
                          onClick={() => setSelectedFilter((prev) => ({ ...prev, brand: brand.toLowerCase() }))}
                        >
                          {brand}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Filtro de Avaliação */}
                  <div>
                    <h4 className="font-semibold mb-3 text-gray-900">Avaliação</h4>
                    <div className="space-y-2">
                      {["Todas", "5 estrelas", "4+ estrelas", "3+ estrelas"].map((rating) => (
                        <button
                          key={rating}
                          className={`w-full text-left p-2 text-sm rounded transition-colors ${
                            selectedFilter.rating === rating.toLowerCase()
                              ? `${categoryConfig.bgColor.replace("bg-", "bg-")}/10 ${categoryConfig.bgColor.replace("bg-", "text-")}`
                              : "hover:bg-gray-50 text-gray-700"
                          }`}
                          onClick={() => setSelectedFilter((prev) => ({ ...prev, rating: rating.toLowerCase() }))}
                        >
                          {rating}
                        </button>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Área de Produtos */}
            <div className="flex-1">
              {/* Controles superiores */}
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">
                    {selectedSubcategory === "todos"
                      ? `Todos os ${categoryConfig.name}`
                      : categoryConfig.subcategories.find((s) => s.name === selectedSubcategory)?.label}
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
                          {product.freeShipping && (
                            <Badge className="bg-blue-500 text-white">
                              <Truck className="w-3 h-3 mr-1" />
                              Frete Grátis
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
                              className={`bg-gradient-to-r ${categoryConfig.color} hover:opacity-90 text-white font-semibold`}
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

      <Footer />

      {/* WhatsApp Float */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-green-500 hover:bg-green-600 shadow-2xl hover:scale-110 transition-all">
          <MessageCircle className="w-6 h-6 md:w-8 md:h-8 text-white" />
        </Button>
      </div>
    </div>
  )
}
