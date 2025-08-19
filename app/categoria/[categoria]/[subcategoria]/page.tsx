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
  Grid3X3,
  List,
  SortAsc,
  TrendingUp,
  MessageCircle,
  ChevronDown,
  Heart,
  Share2,
  Eye,
  Package,
  ArrowLeft,
  Truck,
} from "lucide-react"
import { useParams } from "next/navigation"

export default function SubcategoryPage() {
  const params = useParams()
  const categoria = params.categoria as string
  const subcategoria = params.subcategoria as string
  const [viewMode, setViewMode] = useState("grid")
  const [searchQuery, setSearchQuery] = useState("")

  // Produtos da subcategoria
  const products = [
    {
      id: 1,
      name: `${subcategoria} Multiverso Studio - Edição Especial`,
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
      freeShipping: true,
    },
    {
      id: 2,
      name: `${subcategoria} Sacocheio.tv - Cafézini`,
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
      freeShipping: true,
    },
    {
      id: 3,
      name: `${subcategoria} Canal do Gamer - RGB Edition`,
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
      freeShipping: true,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Navbar */}
      <Navbar />

      {/* Breadcrumb */}
      <section className="py-4 bg-white border-b pt-20">
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-gray-900">
              Início
            </Link>
            <span>/</span>
            <Link href={`/categoria/${categoria}`} className="hover:text-gray-900 capitalize">
              {categoria}
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-semibold capitalize">{subcategoria}</span>
          </div>
        </div>
      </section>

      {/* Header da Subcategoria */}
      <section className="py-12 bg-gradient-to-r from-blue-500 to-purple-500">
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-4 mb-6">
            <Link href={`/categoria/${categoria}`}>
              <Button variant="outline" className="bg-white/20 text-white border-white/30 hover:bg-white/30">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar para {categoria}
              </Button>
            </Link>
          </div>

          <div className="text-white">
            <h1 className="text-4xl font-bold mb-4 capitalize">{subcategoria}</h1>
            <p className="text-xl text-white/90 mb-6">
              Produtos especializados em {subcategoria} de todos os criadores da plataforma
            </p>

            <div className="flex items-center space-x-8 text-lg">
              <span className="flex items-center bg-white/20 px-4 py-2 rounded-lg">
                <Package className="w-5 h-5 mr-2" />
                {products.length} produtos
              </span>
              <span className="flex items-center bg-white/20 px-4 py-2 rounded-lg">
                <Star className="w-5 h-5 mr-2 fill-yellow-400 text-yellow-400" />
                4.8 avaliação
              </span>
              <span className="flex items-center bg-white/20 px-4 py-2 rounded-lg">
                <Truck className="w-5 h-5 mr-2" />
                Frete grátis
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Produtos */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {/* Controles superiores */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 capitalize">{subcategoria}</h2>
              <p className="text-gray-600">{products.length} produtos encontrados</p>
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

          {/* Grid de Produtos */}
          <div
            className={`grid gap-6 ${
              viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" : "grid-cols-1"
            }`}
          >
            {products.map((product) => (
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
                          className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold"
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
      </section>

      {/* WhatsApp Float */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button className="w-16 h-16 rounded-full bg-green-500 hover:bg-green-600 shadow-2xl hover:scale-110 transition-all">
          <MessageCircle className="w-8 h-8 text-white" />
        </Button>
      </div>
    </div>
  )
}
