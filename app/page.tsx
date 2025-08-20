"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

import {
  Star,
  Truck,
  Shield,
  MessageCircle,
  Zap,
  RotateCcw,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
} from "lucide-react"
import { Navbar } from "@/components/navbar"
import Footer from "@/components/footer"
import QuickBuyModal from "@/components/quick-buy-modal"
import Marquee from "react-fast-marquee"

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [currentBanner, setCurrentBanner] = useState(0)
  const [quickBuyProduct, setQuickBuyProduct] = useState(null)
  const [currentProductIndex, setCurrentProductIndex] = useState(0)
  const [currentMultiversoIndex, setCurrentMultiversoIndex] = useState(0)
  const [currentSecondaryBanner, setCurrentSecondaryBanner] = useState(0)
  const [currentExplorerIndex, setCurrentExplorerIndex] = useState(0)
  const [selectedExplorerPost, setSelectedExplorerPost] = useState<any>(null)
  const [isExplorerDragging, setIsExplorerDragging] = useState(false)
  const [explorerStartX, setExplorerStartX] = useState(0)
  const [explorerScrollLeft, setExplorerScrollLeft] = useState(0)

  // Dados para o carrossel secundário
  const secondaryBanners = [
    {
      id: 1,
      title: "COLEÇÃO EXCLUSIVA",
      description: "Produtos únicos e limitados para você",
      image: "/placeholder.svg",
      buttonText: "VER COLECAO",
      primaryColor: "#000000"
    },
    {
      id: 2,
      title: "OFERTAS IMPERDÍVEIS",
      description: "Descontos especiais por tempo limitado",
      image: "/placeholder.svg",
      buttonText: "VER OFERTAS",
      primaryColor: "#dc2626"
    },
    {
      id: 3,
      title: "LANÇAMENTOS",
      description: "Novidades que acabaram de chegar",
      image: "/placeholder.svg",
      buttonText: "VER NOVIDADES",
      primaryColor: "#059669"
    }
  ]

  // Textos para o carrossel dos botões COMPRAR
  const buttonTexts = [
    "COMPRAR", 
    "COMPRAR", 
    "COMPRAR", 
    "COMPRAR", 
    "COMPRAR", 
  ]

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
      badges: ["Lançamento", "FRETE GRÁTIS"],
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

  // Dados dos posts do Instagram dos exploradores
  const explorerPosts = [
    {
      id: "1",
      username: "@explorer_ana",
      image: "/multiverso-tshirt-nature.png",
      caption: "Explorando novos mundos com minha camiseta favorita! 🌟 #multiversoestudio #explorer",
      likes: 127,
      location: "Serra da Mantiqueira",
    },
    {
      id: "2",
      username: "@aventureiro_carlos",
      image: "/placeholder.svg",
      caption: "Café da manhã no topo da montanha ☕️ #multiversoestudio #adventure",
      likes: 89,
      location: "Pico da Neblina",
    },
    {
      id: "3",
      username: "@exploradora_maria",
      image: "/friends-multiverso-merch.png",
      caption: "Squad completo representando! 🚀 #multiversoestudio #squad",
      likes: 203,
      location: "Chapada Diamantina",
    },
    {
      id: "4",
      username: "@nomade_digital",
      image: "/placeholder.svg",
      caption: "Trabalhando de qualquer lugar do universo 💻 #multiversoestudio #nomadlife",
      likes: 156,
      location: "Florianópolis",
    },
    {
      id: "5",
      username: "@fotografa_luna",
      image: "/multiverso-urban-art.png",
      caption: "Arte urbana encontra o multiverso 🎨 #multiversoestudio #streetart",
      likes: 178,
      location: "São Paulo",
    },
    {
      id: "6",
      username: "@surfista_pedro",
      image: "/surfer-multiverso-cap.png",
      caption: "Ondas infinitas, possibilidades infinitas 🌊 #multiversoestudio #surf",
      likes: 134,
      location: "Floripa",
    },
  ]

  // Auto-rotate banners
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [banners.length])

  // Auto-rotate trending products carousel
  useEffect(() => {
    const interval = setInterval(() => {
      const carousel = document.querySelector('.trending-carousel')
      if (carousel) {
        const currentScroll = carousel.scrollLeft
        const maxScroll = carousel.scrollWidth - carousel.clientWidth
        
        if (currentScroll >= maxScroll) {
          // Volta ao início quando chega ao final
          carousel.scrollTo({ left: 0, behavior: 'smooth' })
        } else {
          // Avança para o próximo produto
          carousel.scrollBy({ left: 320, behavior: 'smooth' })
        }
      }
    }, 4000) // Muda a cada 4 segundos
    
    return () => clearInterval(interval)
  }, [])

  // Auto-rotate multiverso products carousel
  useEffect(() => {
    const interval = setInterval(() => {
      const carousel = document.querySelector('.multiverso-carousel')
      if (carousel) {
        const currentScroll = carousel.scrollLeft
        const maxScroll = carousel.scrollWidth - carousel.clientWidth
        
        if (currentScroll >= maxScroll) {
          // Volta ao início quando chega ao final
          carousel.scrollTo({ left: 0, behavior: 'smooth' })
        } else {
          // Avança para o próximo produto
          carousel.scrollBy({ left: 320, behavior: 'smooth' })
        }
      }
    }, 5000) // Muda a cada 5 segundos (diferente do trending para não sincronizar)
    
    return () => clearInterval(interval)
  }, [])

  // Auto-rotate secondary banners carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSecondaryBanner((prev) => (prev + 1) % secondaryBanners.length)
    }, 6000) // Muda a cada 6 segundos (diferente dos outros para não sincronizar)
    
    return () => clearInterval(interval)
  }, [secondaryBanners.length])

  // Auto-rotate explorers carousel
  useEffect(() => {
    const interval = setInterval(() => {
      if (isExplorerDragging) return // Pausa quando está arrastando
      
      const carousel = document.querySelector('.explorers-carousel')
      if (carousel) {
        console.log('Explorers carousel found, scrolling infinitely...')
        const cardWidth = 320 // Largura do card + gap
        const currentScroll = carousel.scrollLeft
        
        // Avança continuamente
        carousel.scrollBy({ left: cardWidth, behavior: 'smooth' })
        
        // Se chegou ao final da primeira cópia, volta ao início suavemente
        if (currentScroll >= (explorerPosts.length * cardWidth)) {
          setTimeout(() => {
            carousel.scrollTo({ left: 0, behavior: 'auto' })
          }, 500) // Pequeno delay para transição suave
        }
      } else {
        console.log('Explorers carousel not found')
      }
    }, 3000) // Muda a cada 3 segundos para ser mais dinâmico
    
    return () => clearInterval(interval)
  }, [isExplorerDragging, explorerPosts.length])

  // Sincronizar índice com scroll atual
  useEffect(() => {
    const carousel = document.querySelector('.explorers-carousel')
    if (carousel) {
      const handleScroll = () => {
        if (!isExplorerDragging) {
          const currentScroll = carousel.scrollLeft
          const cardWidth = 320
          const newIndex = Math.round(currentScroll / cardWidth) % explorerPosts.length
          setCurrentExplorerIndex(newIndex)
        }
      }
      
      carousel.addEventListener('scroll', handleScroll)
      return () => carousel.removeEventListener('scroll', handleScroll)
    }
  }, [isExplorerDragging, explorerPosts.length])

  const currentBannerData = banners[currentBanner]
  const currentSecondaryBannerData = secondaryBanners[currentSecondaryBanner]

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
    },
    {
      id: 5,
      name: "Hoodie Flow Podcast - Edição Especial",
      price: 189.9,
      originalPrice: 229.9,
      image: "/placeholder.svg?height=400&width=400",
      store: "Flow Podcast",
      rating: 4.9,
      reviews: 445,
      sales: 1234,
      badge: "Podcast",
      badgeColor: "bg-purple-600",
      discount: "17% OFF",
      freeShipping: true,
    },
    {
      id: 6,
      name: "Camiseta Multiverso Estudio - Logo Oficial",
      price: 69.9,
      originalPrice: 89.9,
      image: "/placeholder.svg?height=400&width=400",
      store: "Multiverso Estudio",
      rating: 4.9,
      reviews: 567,
      sales: 2345,
      badge: "Exclusivo",
      badgeColor: "bg-black",
      discount: "22% OFF",
      freeShipping: true,
    },
    {
      id: 7,
      name: "Kit Completo Gamer RGB - 5 Peças",
      price: 299.9,
      originalPrice: 399.9,
      image: "/placeholder.svg?height=400&width=400",
      store: "Gaming Pro",
      rating: 4.8,
      reviews: 234,
      sales: 789,
      badge: "Premium",
      badgeColor: "bg-green-600",
      discount: "25% OFF",
      freeShipping: true,
    },
    {
      id: 8,
      name: "Coleção Limitada Cafézini - 3 Peças",
      price: 199.9,
      originalPrice: 299.9,
      image: "/placeholder.svg?height=400&width=400",
      store: "Sacocheio.tv",
      rating: 4.9,
      reviews: 678,
      sales: 1456,
      badge: "Coleção",
      badgeColor: "bg-amber-500",
      discount: "33% OFF",
      freeShipping: true,
    }
  ]

  const multiversoProducts = [
    {
      id: 7,
      name: "Camiseta Multiverso Estudio - Logo Oficial",
      price: 69.9,
      originalPrice: 89.9,
      image: "/placeholder.svg?height=400&width=400",
      store: "Multiverso Estudio",
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
      store: "Multiverso Estudio",
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
      store: "Multiverso Estudio",
      rating: 4.9,
      reviews: 567,
      badge: "Original",
      badgeColor: "bg-black",
      discount: "29% OFF",
      freeShipping: true,
    },
    {
      id: 10,
      name: "Hoodie Multiverso - Edição Limitada",
      price: 159.9,
      originalPrice: 199.9,
      image: "/placeholder.svg?height=400&width=400",
      store: "Multiverso Estudio",
      rating: 4.9,
      reviews: 789,
      sales: 2345,
      badge: "Limitada",
      badgeColor: "bg-red-600",
      discount: "20% OFF",
      freeShipping: true,
    },
    {
      id: 11,
      name: "Kit Multiverso Completo - 4 Peças",
      price: 249.9,
      originalPrice: 349.9,
      image: "/placeholder.svg?height=400&width=400",
      store: "Multiverso Estudio",
      rating: 4.9,
      reviews: 456,
      sales: 1234,
      badge: "Completo",
      badgeColor: "bg-blue-600",
      discount: "29% OFF",
      freeShipping: true,
    },
    {
      id: 12,
      name: "Camiseta Multiverso - Design Exclusivo",
      price: 79.9,
      originalPrice: 99.9,
      image: "/placeholder.svg?height=400&width=400",
      store: "Multiverso Estudio",
      rating: 4.9,
      reviews: 678,
      sales: 3456,
      badge: "Exclusivo",
      badgeColor: "bg-black",
      discount: "20% OFF",
      freeShipping: true,
    }
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
      title: "FRETE GRÁTIS",
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
    const carousel = document.querySelector('.trending-carousel')
    if (carousel) {
      carousel.scrollBy({ left: 320, behavior: 'smooth' })
    }
  }

  const prevProducts = () => {
    const carousel = document.querySelector('.trending-carousel')
    if (carousel) {
      carousel.scrollBy({ left: -320, behavior: 'smooth' })
    }
  }

  const prevMultiverso = () => {
    const carousel = document.querySelector('.multiverso-carousel')
    if (carousel) {
      carousel.scrollBy({ left: -320, behavior: 'smooth' })
    }
  }

  const nextMultiverso = () => {
    const carousel = document.querySelector('.multiverso-carousel')
    if (carousel) {
      carousel.scrollBy({ left: 320, behavior: 'smooth' })
    }
  }

  const scrollToExplorerIndex = (index: number) => {
    const carousel = document.querySelector('.explorers-carousel')
    if (carousel) {
      const cardWidth = 320 // Largura fixa do card + gap
      const scrollPosition = cardWidth * index
      
      carousel.scrollTo({
        left: scrollPosition,
        behavior: 'smooth',
      })
      setCurrentExplorerIndex(index)
      setIsExplorerDragging(false) // Reseta o estado de drag
    }
  }

  // Funções para drag do mouse no carrossel dos exploradores
  const handleExplorerMouseDown = (e: React.MouseEvent) => {
    setIsExplorerDragging(true)
    setExplorerStartX(e.pageX - (e.currentTarget as HTMLElement).offsetLeft)
    setExplorerScrollLeft((e.currentTarget as HTMLElement).scrollLeft)
  }

  const handleExplorerMouseMove = (e: React.MouseEvent) => {
    if (!isExplorerDragging) return
    e.preventDefault()
    const x = e.pageX - (e.currentTarget as HTMLElement).offsetLeft
    const walk = (x - explorerStartX) * 2
    ;(e.currentTarget as HTMLElement).scrollLeft = explorerScrollLeft - walk
  }

  const handleExplorerMouseUp = () => {
    setIsExplorerDragging(false)
  }

  const handleExplorerTouchStart = (e: React.TouchEvent) => {
    setIsExplorerDragging(true)
    setExplorerStartX(e.touches[0].pageX - (e.currentTarget as HTMLElement).offsetLeft)
    setExplorerScrollLeft((e.currentTarget as HTMLElement).scrollLeft)
  }

  const handleExplorerTouchMove = (e: React.TouchEvent) => {
    if (!isExplorerDragging) return
    const x = e.touches[0].pageX - (e.currentTarget as HTMLElement).offsetLeft
    const walk = (x - explorerStartX) * 2
    ;(e.currentTarget as HTMLElement).scrollLeft = explorerScrollLeft - walk
  }

  const handleExplorerTouchEnd = () => {
    setIsExplorerDragging(false)
  }


  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Banner - Full Screen */}
      <section className="relative h-screen z-0">
        <div className="relative w-full h-full overflow-hidden">
          <Image
            src={currentBannerData.image || "/placeholder.svg"}
            alt={currentBannerData.title}
            fill
            className="object-cover transition-all duration-1000"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />

          {/* Banner Content - Centralizado */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white px-4">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
                {currentBannerData.title}
              </h1>
              <p className="text-xl md:text-2xl lg:text-3xl mb-8 max-w-4xl mx-auto leading-relaxed">
                {currentBannerData.description}
              </p>
              <Button
                className="bg-white/95 hover:bg-white text-gray-900 font-bold px-8 md:px-12 py-3 md:py-4 text-lg md:text-xl rounded-full shadow-2xl backdrop-blur-sm border-0 hover:scale-105 transition-all duration-300"
                style={{ backgroundColor: currentBannerData.primaryColor }}
              >
                {currentBannerData.buttonText}
              </Button>
            </div>
          </div>

          {/* Squares Indicator - Canto Direito */}
          <div className="absolute bottom-8 right-8 flex space-x-2">
            {banners.map((_, index) => (
              <button
                key={index}
                className={`w-4 h-4 transition-all duration-300 ${
                  index === currentBanner ? "bg-white" : "bg-white/50"
                }`}
                onClick={() => setCurrentBanner(index)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Banner de Promoções Rodando */}
      <section className="py-6 bg-black border-t border-gray-800">
        <Marquee
          speed={40}
          gradient={false}
          className="text-white text-base"
        >
          <span className="mx-8"> FRETE ÚNICO DE R$9,99 ACIMA DE R$219,00</span>
          <span className="mx-8"> FRETE GRÁTIS ACIMA DE R$499,00</span>
          <span className="mx-8"> 2% DE DESCONTO NO PIX</span>
          <span className="mx-8"> TROCA FÁCIL E GRÁTIS</span>
          <span className="mx-8"> ENVIO PARA TODO O MUNDO</span>
          <span className="mx-8"> BRINDES A PARTIR DE R$401,00</span>
        </Marquee>
      </section>

      {/* Products Grid */}
      <section className="py-20 md:py-32 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8 md:mb-12">
            <div className="flex items-center space-x-4">
              <div className="p-3">
                <Image 
                  src="/icons/logo foguete.svg"
                  alt="Foguete"
                  width={120}
                  height={120}
                  className="w-16 md:w-20 h-16 md:h-20"
                />
              </div>
              <div>
                <h2 className="text-2xl md:text-4xl font-bold uppercase">PRODUTOS EM ALTA</h2>
                <div className="mt-4">
                  <Link href="/multiverso">
                    <Button variant="outline" className="text-black border-black hover:bg-black hover:text-white bg-transparent rounded-none font-bold uppercase px-6 py-2">
                      VER TODOS
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
            {/* Carousel Navigation Arrows */}
            <div className="flex space-x-2">
              <Button
                size="icon"
                variant="outline"
                className="w-8 h-8 border-black text-black hover:bg-black hover:text-white rounded-none"
                onClick={prevProducts}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button
                size="icon"
                variant="outline"
                className="w-8 h-8 border-black text-black hover:bg-black hover:text-white rounded-none"
                onClick={nextProducts}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Desktop Carousel */}
          <div className="hidden md:block relative">
            <div className="flex space-x-3 overflow-hidden trending-carousel" style={{ scrollBehavior: 'smooth' }}>
              {trendingProducts.map((product) => (
                <div key={product.id} className="group cursor-pointer flex-shrink-0 w-80">
                  <div className="relative aspect-square overflow-hidden bg-gray-50 mb-1">
                    <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />

                    <div className="absolute top-4 left-4 flex flex-col space-y-0.5">
                      <div className="text-black text-xs font-bold uppercase px-2 py-1 hover:bg-black hover:text-white transition-all duration-200 cursor-pointer">
                        {product.badge}
                      </div>
                      {product.discount && (
                        <div className="text-black text-xs font-bold uppercase px-2 py-1 hover:bg-black hover:text-white transition-all duration-200 cursor-pointer">
                          {product.discount}
                        </div>
                      )}
                      {product.freeShipping && (
                        <div className="text-black text-xs font-bold uppercase px-2 py-1 hover:bg-black hover:text-white transition-all duration-200 cursor-pointer">
                          FRETE GRÁTIS
                        </div>
                      )}
                    </div>
                    
                    {/* Color Swatches */}
                    <div className="absolute top-4 right-4 flex flex-col space-y-0.5">
                      <div className="w-4 h-4 bg-black border border-white"></div>
                      <div className="w-4 h-4 bg-white border border-gray-300"></div>
                      <div className="w-4 h-4 bg-red-500 border border-white"></div>
                      <div className="w-4 h-4 bg-gray-400 border border-white text-black text-xs font-bold flex items-center justify-center">+</div>
                    </div>

                    {/* Quick Buy Button - Bottom of image, full width */}
                    <div className="absolute bottom-0 left-0 right-0 overflow-hidden">
                      <Button
                        className="w-full opacity-0 group-hover:opacity-100 transition-opacity bg-black hover:bg-black text-white rounded-none"
                        onClick={() => handleQuickBuy(product)}
                      >
                        <Marquee
                          speed={40}
                          gradient={false}
                          className="text-white font-bold"
                          pauseOnHover={false}
                        >
                          {buttonTexts.map((text, index) => (
                            <span key={index} className="mx-2">
                              {text}
                            </span>
                          ))}
                        </Marquee>
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-0">
                    <p className="text-sm text-gray-600 uppercase font-bold">{product.store}</p>
                    <Link href={`/produto/${product.id}`}>
                      <h3 className="font-semibold text-lg line-clamp-2 transition-colors uppercase">
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
                    <p className="text-xs text-gray-500 uppercase font-bold">{product.sales} VENDIDOS</p>
                  </div>
                </div>
              ))}
            </div>
          </div>



          {/* Mobile Carousel */}
          <div className="md:hidden">
            <div className="relative">
              <div className="flex space-x-1 overflow-hidden">
                {trendingProducts.slice(currentProductIndex, currentProductIndex + 2).map((product) => (
                  <div key={product.id} className="flex-shrink-0 w-[calc(50%-8px)] group cursor-pointer">
                    <div className="relative aspect-square overflow-hidden bg-gray-50 mb-4">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />

                      <div className="absolute top-2 left-2 flex flex-col space-y-1">
                        <div className="text-black text-xs font-bold uppercase px-2 py-1 hover:bg-black hover:text-white transition-all duration-200 cursor-pointer">{product.badge}</div>
                        {product.discount && (
                          <div className="text-black text-xs font-bold uppercase px-2 py-1 hover:bg-black hover:text-white transition-all duration-200 cursor-pointer">{product.discount}</div>
                        )}
                      </div>

                      <div className="absolute bottom-0 left-0 right-0 overflow-hidden">
                        <Button
                          className="w-full opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 hover:bg-black text-white rounded-none text-xs py-2"
                          onClick={() => handleQuickBuy(product)}
                        >
                                                  <Marquee
                          speed={50}
                          gradient={false}
                          className="text-white font-bold text-xs"
                          pauseOnHover={false}
                        >
                            {buttonTexts.map((text, index) => (
                              <span key={index} className="mx-1">
                                {text}
                              </span>
                            ))}
                          </Marquee>
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-0">
                      <p className="text-xs text-gray-600">{product.store}</p>
                      <Link href={`/produto/${product.id}`}>
                        <h3 className="font-semibold text-sm line-clamp-2 transition-colors">
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
                  VER TODOS OS PRODUTOS
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Secondary Banner Carousel - 75% Height */}
      <section className="relative w-full h-[75vh] bg-white">
        <div className="relative w-full h-full overflow-hidden">
          {secondaryBanners.map((banner, index) => (
            <div
              key={banner.id}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSecondaryBanner ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <Image
                src={banner.image}
                alt={banner.title}
                fill
                className="object-cover"
                priority={index === 0}
              />
              <div className="absolute inset-0 bg-black/40" />
              
              {/* Banner Content - Centralizado */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white px-4">
                  <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                    {banner.title}
                  </h2>
                  <p className="text-lg md:text-xl lg:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
                    {banner.description}
                  </p>
                </div>
              </div>

              {/* Botão Centralizado na Parte Inferior */}
              <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2">
                <Button
                  className="bg-white/95 hover:bg-white text-gray-900 font-bold px-10 md:px-16 py-4 md:py-5 text-lg md:text-xl rounded-full shadow-2xl backdrop-blur-sm border-0 hover:scale-110 transition-all duration-300 hover:shadow-white/20 hover:shadow-2xl"
                  style={{ backgroundColor: banner.primaryColor }}
                >
                  {banner.buttonText}
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        {/* Banner Navigation Squares - Lado Direito */}
        <div className="absolute right-8 top-1/2 transform -translate-y-1/2 flex flex-col space-y-3">
          {secondaryBanners.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSecondaryBanner(index)}
              className={`w-4 h-4 transition-all duration-300 border-2 border-white ${
                index === currentSecondaryBanner 
                  ? 'bg-white scale-125' 
                  : 'bg-transparent hover:bg-white/30 hover:scale-110'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Multiverso Exclusive Products */}
      <section className="py-20 md:py-32 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8 md:mb-12">
            <div className="flex items-center space-x-4">
              <div className="p-3">
                <Image 
                  src="/icons/logo cogumelo.svg"
                  alt="Cogumelo"
                  width={120}
                  height={120}
                  className="w-16 md:w-20 h-16 md:h-20"
                />
              </div>
              <div>
                <h2 className="text-2xl md:text-4xl font-bold uppercase">PRODUTOS EXCLUSIVOS MULTIVERSO</h2>
                <div className="mt-4">
                  <Link href="/multiverso">
                    <Button variant="outline" className="text-black border-black hover:bg-black hover:text-white bg-transparent rounded-none font-bold uppercase px-6 py-2">
                      VER TODOS
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
            {/* Carousel Navigation Arrows */}
            <div className="flex space-x-2">
              <Button
                size="icon"
                variant="outline"
                className="w-8 h-8 border-black text-black hover:bg-black hover:text-white rounded-none"
                onClick={prevMultiverso}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button
                size="icon"
                variant="outline"
                className="w-8 h-8 border-black text-black hover:bg-black hover:text-white rounded-none"
                onClick={nextMultiverso}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Desktop Carousel */}
          <div className="hidden md:block relative">
            <div className="flex space-x-3 overflow-hidden multiverso-carousel" style={{ scrollBehavior: 'smooth' }}>
              {multiversoProducts.map((product) => (
                <div key={product.id} className="group cursor-pointer flex-shrink-0 w-80">
                  <div className="relative aspect-square overflow-hidden bg-gray-50 mb-1">
                    <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />

                    <div className="absolute top-4 left-4 flex flex-col space-y-0.5">
                      <div
                        className="text-black text-xs font-bold uppercase px-2 py-1 hover:bg-black hover:text-white transition-all duration-200 cursor-pointer"
                      >
                        {product.badge}
                      </div>
                      {product.discount && (
                        <div className="text-black text-xs font-bold uppercase px-2 py-1 hover:bg-black hover:text-white transition-all duration-200 cursor-pointer">
                          {product.discount}
                        </div>
                      )}
                      {product.freeShipping && (
                        <div className="text-black text-xs font-bold uppercase px-2 py-1 hover:bg-black hover:text-white transition-all duration-200 cursor-pointer">
                          FRETE GRÁTIS
                        </div>
                      )}
                    </div>
                    
                    {/* Color Swatches */}
                    <div className="absolute top-4 right-4 flex flex-col space-y-0.5">
                      <div className="w-4 h-4 bg-black border border-white"></div>
                      <div className="w-4 h-4 bg-white border border-gray-300"></div>
                      <div className="w-4 h-4 bg-red-500 border border-white"></div>
                      <div className="w-4 h-4 bg-gray-400 border border-white text-black text-xs font-bold flex items-center justify-center">+</div>
                    </div>

                    {/* Quick Buy Button - Bottom of image, full width */}
                    <div className="absolute bottom-0 left-0 right-0 overflow-hidden">
                      <Button
                        className="w-full opacity-0 group-hover:opacity-100 transition-opacity bg-black hover:bg-black text-white rounded-none"
                        onClick={() => handleQuickBuy(product)}
                      >
                        <Marquee
                          speed={45}
                          gradient={false}
                          className="text-white font-bold"
                          pauseOnHover={false}
                        >
                          {buttonTexts.map((text, index) => (
                            <span key={index} className="mx-2">
                              {text}
                            </span>
                          ))}
                        </Marquee>
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-0">
                    <p className="text-sm text-gray-600 uppercase font-bold">{product.store}</p>
                    <Link href={`/produto/${product.id}`}>
                      <h3 className="font-semibold text-lg line-clamp-2 transition-colors uppercase">
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
          </div>



          {/* Mobile Carousel */}
          <div className="md:hidden">
            <div className="flex space-x-2 overflow-x-auto pb-4" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              {multiversoProducts.slice(currentMultiversoIndex, currentMultiversoIndex + 2).map((product) => (
                <div key={product.id} className="group cursor-pointer min-w-[280px] flex-shrink-0">
                  <div className="relative aspect-square overflow-hidden bg-gray-50 mb-4">
                    <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />

                    <div className="absolute top-4 left-4 flex flex-col space-y-0.5">
                      <div
                        className="text-black text-xs font-bold uppercase px-2 py-1 hover:bg-black hover:text-white transition-all duration-200 cursor-pointer"
                      >
                        {product.badge}
                      </div>
                      {product.discount && (
                        <div className="text-black text-xs font-bold uppercase px-2 py-1 hover:bg-black hover:text-white transition-all duration-200 cursor-pointer">
                          {product.discount}
                        </div>
                      )}
                      {product.freeShipping && (
                        <div className="text-black text-xs font-bold uppercase px-2 py-1 hover:bg-black hover:text-white transition-all duration-200 cursor-pointer">
                          FRETE GRÁTIS
                        </div>
                      )}
                    </div>
                    
                    {/* Color Swatches */}
                    <div className="absolute top-4 right-4 flex flex-col space-y-0.5">
                      <div className="w-4 h-4 bg-black border border-white"></div>
                      <div className="w-4 h-4 bg-white border border-gray-300"></div>
                      <div className="w-4 h-4 bg-red-500 border border-white"></div>
                      <div className="w-4 h-4 bg-gray-400 border border-white text-black text-xs font-bold flex items-center justify-center">+</div>
                    </div>

                    {/* Quick Buy Button - Bottom of image, full width */}
                    <div className="absolute bottom-0 left-0 right-0 overflow-hidden">
                      <Button
                        className="w-full opacity-0 group-hover:opacity-100 transition-opacity bg-black hover:bg-black text-white rounded-none"
                        onClick={() => handleQuickBuy(product)}
                      >
                        <Marquee
                          speed={50}
                          gradient={false}
                          className="text-white font-bold text-xs"
                          pauseOnHover={false}
                        >
                          {buttonTexts.map((text, index) => (
                            <span key={index} className="mx-1">
                              {text}
                            </span>
                          ))}
                        </Marquee>
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-0">
                    <p className="text-sm text-gray-600">{product.store}</p>
                    <Link href={`/produto/${product.id}`}>
                      <h3 className="font-semibold text-lg line-clamp-2 transition-colors uppercase">
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
          </div>

          {/* Mobile View All Button */}
          <div className="mt-6 text-center md:hidden">
            <Link href="/multiverso">
              <Button variant="outline" className="text-black border-black hover:bg-black hover:text-white bg-transparent rounded-none font-bold uppercase">
                VER LOJA COMPLETA
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Stores - New Card Design */}
      <section className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl md:text-4xl font-bold mb-4">Multiverso dos Parceiros</h2>
            <p className="text-base md:text-xl text-gray-600 max-w-2xl mx-auto">
              Conheça os criadores mais populares da plataforma
            </p>
          </div>

          <div className="flex justify-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 max-w-7xl">
              {featuredStores.map((store) => (
                <div key={store.id} className="group cursor-pointer min-w-[280px] md:min-w-[320px]">
                  <div className="overflow-hidden hover:shadow-lg transition-all duration-300 border-0 bg-white rounded-none shadow-sm">
                    {/* Cover Image */}
                    <div className="relative h-40 md:h-48 overflow-hidden">
                      <Image
                        src={store.coverImage || "/placeholder.svg"}
                        alt={`${store.name} cover`}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    </div>

                    <div className="relative px-6 pb-6 pt-0">
                      {/* Avatar */}
                      <div className="flex justify-center -mt-10 mb-4">
                        <div className="relative">
                          <div className="w-20 h-20 bg-white p-1 shadow-lg">
                            <Image
                              src={store.avatar || "/placeholder.svg"}
                              alt={store.name}
                              width={72}
                              height={72}
                              className="object-cover w-full h-full"
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
                          <Button className="w-full bg-black hover:bg-gray-800 text-white text-sm py-3 rounded-none">
                            Visitar Loja
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Universo dos Exploradores */}
      <section className="py-20 bg-white relative overflow-hidden">
        {/* Background liquid glass effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/5 via-transparent to-black/5" />
        <div className="absolute top-20 left-20 w-96 h-96 bg-black/10 blur-3xl" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-black/5 blur-3xl" />

        <div className="container mx-auto px-4 relative z-10">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-black mb-6 tracking-tight">
              UNIVERSO DOS
              <span className="block bg-gradient-to-r from-black to-gray-600 bg-clip-text text-transparent">
                EXPLORADORES
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Descubra como nossos exploradores estão espalhando o multiverso pelo mundo. Marque{" "}
              <span className="font-semibold text-black">@multiversoestudio</span> e faça parte desta jornada.
            </p>
          </div>

          {/* Carousel with navigation */}
          <div className="relative mb-12">
            {/* Carousel Container */}
            <div
              className="explorers-carousel flex gap-8 px-12 scroll-smooth cursor-grab active:cursor-grabbing select-none overflow-hidden"
              style={{ 
                scrollbarWidth: "none", 
                msOverflowStyle: "none",
                scrollBehavior: "smooth"
              }}
              onMouseDown={handleExplorerMouseDown}
              onMouseMove={handleExplorerMouseMove}
              onMouseUp={handleExplorerMouseUp}
              onMouseLeave={handleExplorerMouseUp}
              onTouchStart={handleExplorerTouchStart}
              onTouchMove={handleExplorerTouchMove}
              onTouchEnd={handleExplorerTouchEnd}
            >
              {/* Primeira cópia dos posts */}
              {explorerPosts.map((post) => (
                <div key={`first-${post.id}`} className="flex-none w-80 group cursor-pointer" onClick={() => setSelectedExplorerPost(post)}>
                  <div className="relative overflow-hidden bg-white shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 w-80">
                    <div className="aspect-square relative overflow-hidden">
                      <Image
                        src={post.image || "/placeholder.svg"}
                        alt={`Post by ${post.username}`}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/70 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <div className="text-white text-center p-6 max-w-full">
                          <p className="font-bold text-xl mb-2">{post.username}</p>
                          <p className="text-sm mb-3 line-clamp-3 leading-relaxed">{post.caption}</p>
                          <div className="flex items-center justify-center gap-4 text-sm">
                            <span className="bg-white/20 px-3 py-1">❤️ {post.likes}</span>
                            {post.location && <span className="bg-white/20 px-3 py-1">📍 {post.location}</span>}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 bg-white border-t border-gray-100">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-black">{post.username}</span>
                        <span className="text-sm text-gray-500">❤️ {post.likes}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Segunda cópia dos posts para rolagem infinita */}
              {explorerPosts.map((post) => (
                <div key={`second-${post.id}`} className="flex-none w-80 group cursor-pointer" onClick={() => setSelectedExplorerPost(post)}>
                  <div className="relative overflow-hidden bg-white shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 w-80">
                    <div className="aspect-square relative overflow-hidden">
                      <Image
                        src={post.image || "/placeholder.svg"}
                        alt={`Post by ${post.username}`}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/70 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <div className="text-white text-center p-6 max-w-full">
                          <p className="font-bold text-xl mb-2">{post.username}</p>
                          <p className="text-sm mb-3 line-clamp-3 leading-relaxed">{post.caption}</p>
                          <div className="flex items-center justify-center gap-4 text-sm">
                            <span className="bg-white/20 px-3 py-1">❤️ {post.likes}</span>
                            {post.location && <span className="bg-white/20 px-3 py-1">📍 {post.location}</span>}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 bg-white border-t border-gray-100">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-black">{post.username}</span>
                        <span className="text-sm text-gray-500">❤️ {post.likes}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Navegação com indicadores */}
            <div className="flex justify-center mt-8">
              {/* Carousel Indicators */}
              <div className="flex gap-2">
                {explorerPosts.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => scrollToExplorerIndex(index)}
                    className={`w-3 h-3 transition-all duration-300 ${
                      index === currentExplorerIndex ? "bg-black" : "bg-gray-300 hover:bg-gray-400"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <div className="inline-block p-8 bg-black/5 backdrop-blur-sm border border-black/10">
              <h3 className="text-2xl font-bold text-black mb-4">Seja o próximo explorador</h3>
              <p className="text-gray-600 mb-6 max-w-md">
                Compartilhe sua aventura com nossos produtos e marque
                <span className="font-semibold text-black"> @multiversoestudio</span>
              </p>
              <button className="px-8 py-3 bg-black text-white hover:bg-gray-800 transition-colors duration-300 font-semibold">
                EXPLORAR PRODUTOS
              </button>
            </div>
          </div>
        </div>

        {/* Modal for selected post */}
        {selectedExplorerPost && (
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedExplorerPost(null)}
          >
            <div className="bg-white max-w-2xl w-full max-h-[90vh] overflow-hidden" onClick={(e) => e.stopPropagation()}>
              <div className="aspect-square relative">
                <Image
                  src={selectedExplorerPost.image || "/placeholder.svg"}
                  alt={`Post by ${selectedExplorerPost.username}`}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-xl text-black">{selectedExplorerPost.username}</h3>
                  <button onClick={() => setSelectedExplorerPost(null)} className="text-gray-500 hover:text-black text-2xl">
                    ×
                  </button>
                </div>
                <p className="text-gray-700 mb-4">{selectedExplorerPost.caption}</p>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span>❤️ {selectedExplorerPost.likes} curtidas</span>
                  {selectedExplorerPost.location && <span>📍 {selectedExplorerPost.location}</span>}
                </div>
              </div>
            </div>
          </div>
        )}
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