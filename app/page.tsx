"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Star,
  Truck,
  Shield,
  MessageCircle,
  Zap,
  RotateCcw,
  ArrowRight,
  Crown,
  TrendingUp,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
} from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import QuickBuyModal from "@/components/quick-buy-modal"

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [currentBanner, setCurrentBanner] = useState(0)
  const [quickBuyProduct, setQuickBuyProduct] = useState(null)
  const [currentProductIndex, setCurrentProductIndex] = useState(0)

  // Banners promocionais rotativos
  const banners = [
    {
      id: 1,
      title: "Cafézini Collection",
      subtitle: "Multiverso Estúdio + Sacocheio.tv",
      description: "Unindo café e humor em produtos únicos",
      image: "/banner-cafezini.webp",
      primaryColor: "#F59E0B",
      buttonText: "Ver Coleção",
      badges: ["Lançamento", "Frete Grátis"],
    },
    {
      id: 2,
      title: "Gaming Collection",
      subtitle: "Canal do Gamer x Multiverso",
      description: "Produtos premium para verdadeiros gamers",
      image: "/placeholder.svg?height=600&width=1200",
      primaryColor: "#3B82F6",
      buttonText: "Level Up",
      badges: ["Gaming", "RGB Style"],
    },
  ]

  // Auto-rotate banners
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [banners.length])

  const currentBannerData = banners[currentBanner]

  const trendingProducts = [
    {
      id: 1,
      name: "Camiseta Cafézini Garganttinni - Edição Limitada",
      price: 79.9,
      originalPrice: 99.9,
      image: "/placeholder.svg?height=400&width=400",
      store: "Sacocheio.tv",
      rating: 4.8,
      reviews: 234,
      sales: 856,
      badge: "Lançamento",
      badgeColor: "bg-amber-500",
      discount: "20% OFF",
      freeShipping: true,
    },
    {
      id: 2,
      name: "Caneca Noir Cinemagrath - Edição Terror",
      price: 55.9,
      originalPrice: 69.9,
      image: "/placeholder.svg?height=400&width=400",
      store: "Cinemagrath",
      rating: 4.9,
      reviews: 156,
      sales: 567,
      badge: "Cult Classic",
      badgeColor: "bg-blue-500",
      discount: "20% OFF",
      freeShipping: true,
    },
    {
      id: 3,
      name: "Kit Gamer Pro - Camiseta + Caneca RGB",
      price: 139.9,
      originalPrice: 179.9,
      image: "/placeholder.svg?height=400&width=400",
      store: "Canal do Gamer",
      rating: 4.8,
      reviews: 123,
      sales: 567,
      badge: "Gamer Choice",
      badgeColor: "bg-blue-600",
      discount: "22% OFF",
      freeShipping: true,
    },
    {
      id: 4,
      name: "Moletom Indie Vibes - Algodão Orgânico",
      price: 159.9,
      image: "/placeholder.svg?height=400&width=400",
      store: "Música Indie",
      rating: 4.7,
      reviews: 89,
      sales: 432,
      badge: "Indie Vibes",
      badgeColor: "bg-amber-600",
      freeShipping: true,
    }
  ]

  const multiversoProducts = [
    {
      id: 7,
      name: "Camiseta Multiverso Studio - Logo Oficial",
      price: 69.9,
      originalPrice: 89.9,
      image: "/placeholder.svg?height=400&width=400",
      store: "Multiverso Studio",
      rating: 4.9,
      reviews: 567,
      badge: "Exclusivo",
      badgeColor: "bg-black",
      discount: "22% OFF",
      freeShipping: true,
    },
    {
      id: 8,
      name: "Kit Multiverso Premium - Camiseta + Caneca",
      price: 119.9,
      originalPrice: 159.9,
      image: "/placeholder.svg?height=400&width=400",
      store: "Multiverso Studio",
      rating: 4.9,
      reviews: 567,
      badge: "Premium",
      badgeColor: "bg-gray-800",
      discount: "25% OFF",
      freeShipping: true,
    },
    {
      id: 9,
      name: "Caneca Multiverso - Lojas dentro de Lojas",
      price: 49.9,
      originalPrice: 69.9,
      image: "/placeholder.svg?height=400&width=400",
      store: "Multiverso Studio",
      rating: 4.9,
      reviews: 567,
      badge: "Original",
      badgeColor: "bg-black",
      discount: "29% OFF",
      freeShipping: true,
    },
  ]

  const featuredStores = [
    {
      id: 1,
      name: "Cafézini",
      creator: "Sacocheio",
      slug: "sacocheio",
      avatar: "/placeholder.svg?height=80&width=80",
      products: 45,
      followers: "2.1M",
      coverImage: "/banner-cafezini.webp",
      verified: true,
    },
    {
      id: 2,
      name: "Cinemagrath",
      creator: "Cinemagrath",
      slug: "cinemagrath",
      avatar: "/placeholder.svg?height=80&width=80",
      products: 67,
      followers: "890K",
      coverImage: "/placeholder.svg?height=300&width=600",
      verified: true,
    },
    {
      id: 3,
      name: "Flow Podcast",
      creator: "Igor 3K",
      slug: "flow-podcast",
      avatar: "/placeholder.svg?height=80&width=80",
      products: 156,
      followers: "3.2M",
      coverImage: "/placeholder.svg?height=300&width=600",
      verified: true,
    },
    {
      id: 6,
      name: "Música Indie",
      creator: "Ana Indie",
      slug: "musica-indie",
      avatar: "/placeholder.svg?height=80&width=80",
      products: 78,
      followers: "650K",
      coverImage: "/placeholder.svg?height=300&width=600",
      verified: true,
    },
  ]

  const benefits = [
    {
      icon: Truck,
      title: "Frete Grátis",
      description: "Acima de R$ 99",
    },
    {
      icon: RotateCcw,
      title: "Troca Fácil",
      description: "7 dias para trocar",
    },
    {
      icon: Shield,
      title: "Compra Segura",
      description: "100% protegida",
    },
    {
      icon: Zap,
      title: "Entrega Rápida",
      description: "Até 5 dias úteis",
    },
  ]

  const handleQuickBuy = (product: any) => {
    setQuickBuyProduct(product)
  }

  const nextProducts = () => {
    setCurrentProductIndex((prev) => (prev + 2 >= trendingProducts.length ? 0 : prev + 2))
  }

  const prevProducts = () => {
    setCurrentProductIndex((prev) => (prev - 2 < 0 ? Math.max(0, trendingProducts.length - 2) : prev - 2))
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      {/* Hero Banner */}
      <section className="relative">
        <div className="relative h-[400px] md:h-[600px] overflow-hidden">
          <Image
            src={currentBannerData.image || "/placeholder.svg"}
            alt={currentBannerData.title}
            fill
            className="object-cover transition-all duration-1000"
            priority
          />
          <div className="absolute inset-0 bg-black/30" />

          {/* Navigation Arrows - Hidden on mobile */}
          <Button
            size="icon"
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white border-0 hidden md:flex"
            onClick={() => setCurrentBanner(currentBanner === 0 ? banners.length - 1 : currentBanner - 1)}
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>
          <Button
            size="icon"
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white border-0 hidden md:flex"
            onClick={() => setCurrentBanner((currentBanner + 1) % banners.length)}
          >
            <ChevronRight className="w-6 h-6" />
          </Button>

          {/* Banner Content */}
          <div className="absolute bottom-4 md:bottom-8 left-4 md:left-8 right-4 md:right-8">
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 md:p-8 max-w-lg">
              <div className="flex items-center space-x-2 mb-4">
                {currentBannerData.badges.map((badge, index) => (
                  <Badge
                    key={index}
                    className="text-white text-xs"
                    style={{ backgroundColor: currentBannerData.primaryColor }}
                  >
                    {badge}
                  </Badge>
                ))}
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">{currentBannerData.title}</h2>
              <p className="text-gray-700 mb-6 text-base md:text-lg">{currentBannerData.description}</p>
              <Button
                className="text-white px-6 md:px-8 py-2 md:py-3 text-base md:text-lg"
                style={{ backgroundColor: currentBannerData.primaryColor }}
              >
                {currentBannerData.buttonText}
                <ArrowRight className="w-4 md:w-5 h-4 md:h-5 ml-2" />
              </Button>
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {banners.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentBanner ? "bg-white" : "bg-white/50"
                }`}
                onClick={() => setCurrentBanner(index)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-8 md:py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon
              return (
                <div key={index} className="flex items-center space-x-2 md:space-x-4 text-black">
                  <IconComponent className="w-6 md:w-8 h-6 md:h-8 text-black" />
                  <div>
                    <h3 className="font-bold text-gray-900 text-sm md:text-base">{benefit.title}</h3>
                    <p className="text-xs md:text-sm text-gray-600">{benefit.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8 md:mb-12">
            <div className="flex items-center space-x-4">
              <div className="bg-black p-3 rounded-full">
                <TrendingUp className="w-6 md:w-8 h-6 md:h-8 text-white" />
              </div>
              <div>
                <h2 className="text-2xl md:text-4xl font-bold">Produtos em Alta</h2>
                <p className="text-base md:text-xl text-gray-600">Os mais desejados da semana</p>
              </div>
            </div>
            <Link href="/multiverso" className="hidden md:block">
              <Button variant="outline" className="text-gray-600 border-gray-300 hover:bg-gray-50 bg-transparent">
                Ver Todos
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>

          {/* Desktop Grid */}
          <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {trendingProducts.map((product) => (
              <div key={product.id} className="group cursor-pointer">
                <div className="relative aspect-square overflow-hidden bg-gray-50 mb-4">
                  <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />

                  <div className="absolute top-4 left-4 flex flex-col space-y-2">
                    <Badge
                      className={`${product.badgeColor} text-white text-xs opacity-70 group-hover:opacity-100 transition-opacity`}
                    >
                      {product.badge}
                    </Badge>
                    {product.discount && (
                      <Badge className="bg-green-500 text-white text-xs opacity-70 group-hover:opacity-100 transition-opacity">
                        {product.discount}
                      </Badge>
                    )}
                    {product.freeShipping && (
                      <Badge className="bg-blue-500 text-white text-xs opacity-70 group-hover:opacity-100 transition-opacity">
                        Frete Grátis
                      </Badge>
                    )}
                  </div>

                  {/* Quick Buy Button - Bottom of image, full width */}
                  <div className="absolute bottom-0 left-0 right-0">
                    <Button
                      className="w-full opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 hover:bg-black text-white rounded-none"
                      onClick={() => handleQuickBuy(product)}
                    >
                      Compra Rápida
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-sm text-gray-600">{product.store}</p>
                  <Link href={`/produto/${product.id}`}>
                    <h3 className="font-semibold text-lg line-clamp-2 hover:text-amber-600 transition-colors">
                      {product.name}
                    </h3>
                  </Link>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm text-gray-600">{product.rating}</span>
                    <span className="text-xs text-gray-500">({product.reviews})</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold">R$ {product.price.toFixed(2)}</span>
                    {product.originalPrice && (
                      <span className="text-lg text-gray-500 line-through">R$ {product.originalPrice.toFixed(2)}</span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500">{product.sales} vendidos</p>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Carousel */}
          <div className="md:hidden">
            <div className="relative">
              <div className="flex space-x-4 overflow-hidden">
                {trendingProducts.slice(currentProductIndex, currentProductIndex + 2).map((product) => (
                  <div key={product.id} className="flex-shrink-0 w-[calc(50%-8px)] group cursor-pointer">
                    <div className="relative aspect-square overflow-hidden bg-gray-50 mb-4 rounded-lg">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />

                      <div className="absolute top-2 left-2 flex flex-col space-y-1">
                        <Badge className={`${product.badgeColor} text-white text-xs`}>{product.badge}</Badge>
                        {product.discount && (
                          <Badge className="bg-green-500 text-white text-xs">{product.discount}</Badge>
                        )}
                      </div>

                      <div className="absolute bottom-0 left-0 right-0">
                        <Button
                          className="w-full opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 hover:bg-black text-white rounded-none text-xs py-2"
                          onClick={() => handleQuickBuy(product)}
                        >
                          Comprar
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <p className="text-xs text-gray-600">{product.store}</p>
                      <Link href={`/produto/${product.id}`}>
                        <h3 className="font-semibold text-sm line-clamp-2 hover:text-amber-600 transition-colors">
                          {product.name}
                        </h3>
                      </Link>
                      <div className="flex items-center space-x-1">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs text-gray-600">{product.rating}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <span className="text-lg font-bold">R$ {product.price.toFixed(2)}</span>
                        {product.originalPrice && (
                          <span className="text-sm text-gray-500 line-through">
                            R$ {product.originalPrice.toFixed(2)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Carousel Navigation */}
              <Button
                size="icon"
                className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white shadow-lg hover:bg-gray-50 text-black border"
                onClick={prevProducts}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button
                size="icon"
                className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white shadow-lg hover:bg-gray-50 text-black border"
                onClick={nextProducts}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>

            {/* Mobile View All Button */}
            <div className="mt-6 text-center">
              <Link href="/multiverso">
                <Button variant="outline" className="text-gray-600 border-gray-300 hover:bg-gray-50 bg-transparent">
                  Ver Todos os Produtos
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Multiverso Exclusive Products */}
      <section className="py-12 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8 md:mb-12">
            <div className="flex items-center space-x-4">
              <div className="bg-black p-3 rounded-full">
                <Crown className="w-6 md:w-8 h-6 md:h-8 text-white" />
              </div>
              <div>
                <h2 className="text-2xl md:text-4xl font-bold">Produtos Exclusivos Multiverso</h2>
                <p className="text-base md:text-xl text-gray-600">Criados especialmente pela nossa equipe</p>
              </div>
            </div>
            <Link href="/multiverso" className="hidden md:block">
              <Button variant="outline" className="text-gray-600 border-gray-300 hover:bg-gray-50 bg-transparent">
                Ver Loja Completa
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {multiversoProducts.map((product) => (
              <div key={product.id} className="group cursor-pointer">
                <div className="relative aspect-square overflow-hidden bg-gray-50 mb-4 rounded-lg">
                  <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />

                  <div className="absolute top-4 left-4 flex flex-col space-y-2">
                    <Badge
                      className={`${product.badgeColor} text-white text-xs opacity-70 group-hover:opacity-100 transition-opacity`}
                    >
                      {product.badge}
                    </Badge>
                    {product.discount && (
                      <Badge className="bg-green-500 text-white text-xs opacity-70 group-hover:opacity-100 transition-opacity">
                        {product.discount}
                      </Badge>
                    )}
                    {product.freeShipping && (
                      <Badge className="bg-blue-500 text-white text-xs opacity-70 group-hover:opacity-100 transition-opacity">
                        Frete Grátis
                      </Badge>
                    )}
                  </div>

                  {/* Quick Buy Button - Bottom of image, full width */}
                  <div className="absolute bottom-0 left-0 right-0">
                    <Button
                      className="w-full opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 hover:bg-black text-white rounded-none"
                      onClick={() => handleQuickBuy(product)}
                    >
                      Compra Rápida
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-sm text-gray-600">{product.store}</p>
                  <Link href={`/produto/${product.id}`}>
                    <h3 className="font-semibold text-lg line-clamp-2 hover:text-blue-600 transition-colors">
                      {product.name}
                    </h3>
                  </Link>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm text-gray-600">{product.rating}</span>
                    <span className="text-xs text-gray-500">({product.reviews})</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xl md:text-2xl font-bold">R$ {product.price.toFixed(2)}</span>
                    {product.originalPrice && (
                      <span className="text-base md:text-lg text-gray-500 line-through">
                        R$ {product.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile View All Button */}
          <div className="mt-6 text-center md:hidden">
            <Link href="/multiverso">
              <Button variant="outline" className="text-gray-600 border-gray-300 hover:bg-gray-50 bg-transparent">
                Ver Loja Completa
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Stores - New Card Design */}
      <section className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl md:text-4xl font-bold mb-4">Criadores em Destaque</h2>
            <p className="text-base md:text-xl text-gray-600 max-w-2xl mx-auto">
              Conheça os criadores mais populares da plataforma
            </p>
          </div>

          <div className="flex justify-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 max-w-7xl">
              {featuredStores.map((store) => (
                <div key={store.id} className="group cursor-pointer min-w-[280px] md:min-w-[320px]">
                  <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 border-0 bg-white rounded-lg">
                    {/* Cover Image */}
                    <div className="relative h-40 md:h-48 overflow-hidden rounded-t-lg ">
                      <Image
                        src={store.coverImage || "/placeholder.svg"}
                        alt={`${store.name} cover`}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    </div>

                    <CardContent className="relative px-6 pb-6 pt-0">
                      {/* Avatar */}
                      <div className="flex justify-center -mt-10 mb-4">
                        <div className="relative">
                          <div className="w-20 h-20 bg-white rounded-full p-1 shadow-lg">
                            <Image
                              src={store.avatar || "/placeholder.svg"}
                              alt={store.name}
                              width={72}
                              height={72}
                              className="rounded-full object-cover w-full h-full"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Creator Info */}
                      <div className="text-center">
                        <h3 className="font-bold text-xl text-gray-900 mb-4">{store.name}</h3>

                        {/* Stats */}
                        <div className="flex justify-center gap-8 mb-5 text-sm">
                          <div className="text-center">
                            <div className="font-bold text-gray-900 text-lg">{store.followers}</div>
                            <div className="text-gray-600 text-xs">Seguidores</div>
                          </div>
                          <div className="text-center">
                            <div className="font-bold text-gray-900 text-lg">{store.products}</div>
                            <div className="text-gray-600 text-xs">Produtos</div>
                          </div>
                        </div>

                        {/* Visit Store Button */}
                        <Link href={`/loja/${store.slug}`}>
                          <Button className="w-full bg-black hover:bg-gray-800 text-white text-sm py-3">
                            Visitar Loja
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {/* Quick Buy Modal */}
      {quickBuyProduct && (
        <QuickBuyModal
          product={quickBuyProduct}
          isOpen={!!quickBuyProduct}
          onClose={() => setQuickBuyProduct(null)}
          onAddToCart={(product, options) => {
            console.log("Added to cart:", product, options)
            setQuickBuyProduct(null)
          }}
        />
      )}

      {/* WhatsApp Float */}
      <div className="fixed bottom-6 right-6 z-40">
        <Button className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-green-500 hover:bg-green-600 shadow-lg hover:scale-105 transition-all">
          <MessageCircle className="w-6 h-6 md:w-8 md:h-8 text-white" />
        </Button>
      </div>
    </div>
  )
}
