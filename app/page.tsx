"use client"

export const dynamic = 'force-dynamic'

import { useState, useEffect, useCallback } from "react"
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
import ProductCard from "@/components/lojas/pagina-principal/product-card"
import Marquee from "react-fast-marquee"

import LatestProductsSection from "@/components/latest-products-section"

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [currentBanner, setCurrentBanner] = useState(0)
  const [quickBuyProduct, setQuickBuyProduct] = useState<any>(null)
  const [currentProductIndex, setCurrentProductIndex] = useState(0)
  const [currentMultiversoIndex, setCurrentMultiversoIndex] = useState(0)
  const [currentSecondaryBanner, setCurrentSecondaryBanner] = useState(0)
  const [currentExplorerIndex, setCurrentExplorerIndex] = useState(0)
  const [selectedExplorerPost, setSelectedExplorerPost] = useState<any>(null)
  const [isExplorerDragging, setIsExplorerDragging] = useState(false)
  const [explorerStartX, setExplorerStartX] = useState(0)
  const [explorerScrollLeft, setExplorerScrollLeft] = useState(0)
  const [isTrendingDragging, setIsTrendingDragging] = useState(false)
  const [trendingStartX, setTrendingStartX] = useState(0)
  const [trendingScrollLeft, setTrendingScrollLeft] = useState(0)
  const [isMultiversoDragging, setIsMultiversoDragging] = useState(false)
  const [multiversoStartX, setMultiversoStartX] = useState(0)
  const [multiversoScrollLeft, setMultiversoScrollLeft] = useState(0)



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

  // ✅ REMOVIDO: Dados hardcoded de trendingProducts (agora vem da API)

  // Dados para o QuickBuyProductCard
  const productTypes = [
    { id: "1", name: "Padrão", price: 0, originalPrice: 0 },
    { id: "2", name: "Especial", price: 0, originalPrice: 0 }
  ]

  const productColors = [
    { name: "Preto", value: "black", image: "/placeholder.svg?height=400&width=400" },
    { name: "Branco", value: "white", image: "/placeholder.svg?height=400&width=400" },
    { name: "Azul", value: "blue", image: "/placeholder.svg?height=400&width=400" },
    { name: "Vermelho", value: "red", image: "/placeholder.svg?height=400&width=400" }
  ]

  const productSizes = ["P", "M", "G", "GG", "G1", "G2"]

  // ✅ REMOVER PRODUTOS MOCADOS E USAR API REAL
  const [multiversoProducts, setMultiversoProducts] = useState<any[]>([])
  const [multiversoLoading, setMultiversoLoading] = useState(true)

  // ✅ BUSCAR PRODUTOS EXCLUSIVOS MULTIVERSO DA API
  useEffect(() => {
    const fetchMultiversoProducts = async () => {
      try {
        setMultiversoLoading(true)
        console.log('🔄 Buscando produtos exclusivos Multiverso...')
        
        const response = await fetch('http://https://api.multiversoestudiocrm.com.br/api/public/products/main-store')
        
        if (!response.ok) {
          throw new Error(`Erro ${response.status}: ${response.statusText}`)
        }

        const data = await response.json()
        console.log('📡 Resposta API Multiverso:', data)
        
        if (!data.products || !Array.isArray(data.products)) {
          throw new Error('Formato de resposta inválido da API Multiverso')
        }

        // ✅ MAPEAR PRODUTOS PARA O FORMATO CORRETO
        const mappedProducts = data.products.map((product: any) => {
          const variants = product.variants || []
          const hasVariants = variants.length > 0
          
          let types: Array<{id: string, name: string, price: number, originalPrice?: number}> = []
          let colors: Array<{name: string, value: string, image: string}> = []
          let sizes: string[] = []
          
          if (hasVariants) {
            variants.forEach((variant: any) => {
              if (variant.name && variant.type) {
                types.push({
                  id: variant.id,
                  name: variant.name,
                  price: parseFloat(product.price) || 0,
                  originalPrice: 0
                })
              }
              if (variant.colors && Array.isArray(variant.colors)) {
                variant.colors.forEach((color: string) => {
                  colors.push({
                    name: color,
                    value: color.toLowerCase(),
                    image: product.mainImage || "/placeholder.jpg"
                  })
                })
              }
              if (variant.sizes && Array.isArray(variant.sizes)) {
                sizes = [...sizes, ...variant.sizes]
              }
            })
          }
          
          // Remover duplicatas
          types = types.filter((type, index, self) => 
            index === self.findIndex(t => t.name === type.name)
          )
          colors = colors.filter((color, index, self) => 
            index === self.findIndex(c => c.name === color.name)
          )
          sizes = [...new Set(sizes)]
          
          return {
            id: product.id,
            name: product.name,
            price: parseFloat(product.price) || 0,
            originalPrice: 0,
            image: product.mainImage || "/placeholder.jpg",
            store: product.store?.name || "Multiverso Estúdios",
            rating: 5,
            reviews: 0,
            sales: 0,
            badge: "Multiverso Original",
      badgeColor: "bg-black",
            discount: "",
            freeShipping: false,
            // Dados para o ProductCard
            types: types.length > 0 ? types : undefined,
            colors: colors.length > 0 ? colors : undefined,
            sizes: sizes.length > 0 ? sizes : undefined
          }
        })
        
        console.log('✅ Produtos Multiverso mapeados:', mappedProducts)
        setMultiversoProducts(mappedProducts)
        
      } catch (err) {
        console.error('❌ Erro ao buscar produtos Multiverso:', err)
        // Fallback para produtos vazios em caso de erro
        setMultiversoProducts([])
      } finally {
        setMultiversoLoading(false)
      }
    }

    fetchMultiversoProducts()
  }, [])

  const featuredStores = [
    {
      id: 1,
      name: "Saco Cheio",
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
      name: "Sara Lee Jones",
      creator: "Sara Lee Jones",
      slug: "sara-lee-jones",
      avatar: "/placeholder.svg?height=80&width=80",
      products: 119,
      followers: "156K",
      coverImage: "/placeholder.svg?height=300&width=600",
      verified: true,
    },
    {
      id: 3,
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
      id: 4,
      name: "Flow Podcast",
      creator: "Igor 3K",
      slug: "flow-podcast",
      avatar: "/placeholder.svg?height=80&width=80",
      products: 156,
      followers: "3.2M",
      coverImage: "/placeholder.svg?height=300&width=600",
      verified: true,
    },
  ]



  // Auto-rotate multiverso products carousel
  useEffect(() => {
    const interval = setInterval(() => {
      if (isMultiversoDragging) return // Pausa quando está arrastando
      
      const carousel = document.querySelector('.multiverso-carousel')
      if (carousel) {
        const cardWidth = 320 // Largura do card + gap
        const currentScroll = carousel.scrollLeft
        
        // Avança continuamente
        carousel.scrollBy({ left: cardWidth, behavior: 'smooth' })
        
        // Se chegou ao final da primeira cópia, volta ao início suavemente
        if (currentScroll >= (multiversoProducts.length * cardWidth)) {
          setTimeout(() => {
            carousel.scrollTo({ left: 0, behavior: 'auto' })
          }, 500) // Pequeno delay para transição suave
        }
      }
    }, 3500) // Muda a cada 3.5 segundos (diferente do trending para não sincronizar)
    
    return () => clearInterval(interval)
  }, [multiversoProducts.length, isMultiversoDragging])

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

  const handleQuickBuyProduct = (productId: string, type: string, color: string, size: string) => {
    // Aqui você pode implementar a lógica de adicionar ao carrinho
    console.log(`Produto ${productId} adicionado: ${type} - ${color} - ${size}`)
    // Por enquanto, abre o modal
    // const product = trendingProducts.find(p => p.id.toString() === productId)
    // if (product) {
    //   setQuickBuyProduct(product)
    // }
  }

  const nextProducts = () => {
    if (typeof window !== 'undefined' && (window as any).latestProductsNavigation) {
      (window as any).latestProductsNavigation.nextProducts()
    }
  }

  const prevProducts = () => {
    if (typeof window !== 'undefined' && (window as any).latestProductsNavigation) {
      (window as any).latestProductsNavigation.prevProducts()
    }
  }

  // ✅ FUNÇÕES DE NAVEGAÇÃO COM VERIFICAÇÃO DE CLIENTE
  const handleNextMultiverso = useCallback(() => {
    if (typeof window !== 'undefined' && (window as any).latestProductsNavigation) {
      (window as any).latestProductsNavigation.nextProducts()
    }
  }, [])

  const handlePrevMultiverso = useCallback(() => {
    if (typeof window !== 'undefined' && (window as any).latestProductsNavigation) {
      (window as any).latestProductsNavigation.prevProducts()
    }
  }, [])

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

  // Funções para drag do mouse no carrossel dos produtos em alta
  const handleTrendingMouseDown = (e: React.MouseEvent) => {
    setIsTrendingDragging(true)
    setTrendingStartX(e.pageX - (e.currentTarget as HTMLElement).offsetLeft)
    setTrendingScrollLeft((e.currentTarget as HTMLElement).scrollLeft)
  }

  const handleTrendingMouseMove = (e: React.MouseEvent) => {
    if (!isTrendingDragging) return
    e.preventDefault()
    const x = e.pageX - (e.currentTarget as HTMLElement).offsetLeft
    const walk = (x - trendingStartX) * 2
    ;(e.currentTarget as HTMLElement).scrollLeft = trendingScrollLeft - walk
  }

  const handleTrendingMouseUp = () => {
    setIsTrendingDragging(false)
  }

  const handleTrendingTouchStart = (e: React.TouchEvent) => {
    setIsTrendingDragging(true)
    setTrendingStartX(e.touches[0].pageX - (e.currentTarget as HTMLElement).offsetLeft)
    setExplorerScrollLeft((e.currentTarget as HTMLElement).scrollLeft)
  }

  const handleTrendingTouchMove = (e: React.TouchEvent) => {
    if (!isTrendingDragging) return
    const x = e.touches[0].pageX - (e.currentTarget as HTMLElement).offsetLeft
    const walk = (x - trendingStartX) * 2
    ;(e.currentTarget as HTMLElement).scrollLeft = trendingScrollLeft - walk
  }

  const handleTrendingTouchEnd = () => {
    setIsTrendingDragging(false)
  }

  // Funções para drag do mouse no carrossel dos produtos exclusivos
  const handleMultiversoMouseDown = (e: React.MouseEvent) => {
    setIsMultiversoDragging(true)
    setMultiversoStartX(e.pageX - (e.currentTarget as HTMLElement).offsetLeft)
    setMultiversoScrollLeft((e.currentTarget as HTMLElement).scrollLeft)
  }

  const handleMultiversoMouseMove = (e: React.MouseEvent) => {
    if (!isMultiversoDragging) return
    e.preventDefault()
    const x = e.pageX - (e.currentTarget as HTMLElement).offsetLeft
    const walk = (x - multiversoStartX) * 2
    ;(e.currentTarget as HTMLElement).scrollLeft = multiversoScrollLeft - walk
  }

  const handleMultiversoMouseUp = () => {
    setIsMultiversoDragging(false)
  }

  const handleMultiversoTouchStart = (e: React.TouchEvent) => {
    setIsMultiversoDragging(true)
    setMultiversoStartX(e.touches[0].pageX - (e.currentTarget as HTMLElement).offsetLeft)
    setMultiversoScrollLeft((e.currentTarget as HTMLElement).scrollLeft)
  }

  const handleMultiversoTouchMove = (e: React.TouchEvent) => {
    if (!isMultiversoDragging) return
    const x = e.touches[0].pageX - (e.currentTarget as HTMLElement).offsetLeft
    const walk = (x - multiversoStartX) * 2
    ;(e.currentTarget as HTMLElement).scrollLeft = multiversoScrollLeft - walk
  }

  const handleMultiversoTouchEnd = () => {
    setIsMultiversoDragging(false)
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
          {/* Banner Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-end pb-32 text-white z-10">
            <button
              className="px-12 py-5 text-xl font-bold rounded-xl transition-all duration-300 hover:scale-110 hover:shadow-2xl shadow-lg"
              style={{ backgroundColor: currentBannerData.primaryColor }}
            >
              {currentBannerData.buttonText}
            </button>
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
          <span className="mx-8"> BRINDES A PARTIR DE R$300,00</span>
        </Marquee>
      </section>

      {/* Products Grid */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
            
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
                  className={`w-8 h-8 border-black rounded-none ${
                    typeof window !== 'undefined' && (window as any).latestProductsNavigation?.currentProductIndex === 0
                      ? 'text-gray-400 border-gray-400 cursor-not-allowed' 
                      : 'text-black hover:bg-black hover:text-white'
                  }`}
                  onClick={prevProducts}
                  disabled={typeof window !== 'undefined' && (window as any).latestProductsNavigation?.currentProductIndex === 0}
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button
                  size="icon"
                  variant="outline"
                  className={`w-8 h-8 border-black rounded-none ${
                    typeof window !== 'undefined' && (window as any).latestProductsNavigation?.currentProductIndex >= Math.max(0, ((window as any).latestProductsNavigation?.products?.length || 0) - 4)
                      ? 'text-gray-400 border-gray-400 cursor-not-allowed' 
                      : 'text-black hover:bg-black hover:text-white'
                  }`}
                  onClick={nextProducts}
                  disabled={typeof window !== 'undefined' && (window as any).latestProductsNavigation?.currentProductIndex >= Math.max(0, ((window as any).latestProductsNavigation?.products?.length || 0) - 4)}
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>

          {/* ✅ PRODUTOS EM ALTA DA API */}
          <LatestProductsSection />

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
              {/* Background Image */}
              <Image
                src={banner.image}
                alt={banner.title}
                fill
                className="object-cover"
                priority={index === 0}
              />
              
              {/* Content */}
              <div className="relative z-10 flex flex-col items-center justify-center h-full text-white px-8">
                <Button
                  className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-black hover:bg-gray-800 text-white font-bold px-12 py-4 text-xl rounded-none shadow-lg border-2 border-white hover:scale-105 transition-all duration-300 hover:shadow-white/20"
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
      <section className="py-12 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
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
                className={`w-8 h-8 border-black rounded-none ${
                  currentMultiversoIndex === 0 
                    ? 'text-gray-400 border-gray-400 cursor-not-allowed' 
                    : 'text-black hover:bg-black hover:text-white'
                }`}
                onClick={handlePrevMultiverso}
                disabled={currentMultiversoIndex === 0}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button
                size="icon"
                variant="outline"
                                  className={`w-8 h-8 border-black rounded-none ${
                    currentMultiversoIndex >= Math.max(0, multiversoProducts.length - 4)
                      ? 'text-gray-400 border-gray-400 cursor-not-allowed' 
                      : 'text-black hover:bg-black hover:text-white'
                  }`}
                onClick={handleNextMultiverso}
                                  disabled={currentMultiversoIndex >= Math.max(0, multiversoProducts.length - 4)}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Desktop Carousel - Estático com Navegação */}
          <div className="hidden md:block relative overflow-hidden">
            {multiversoLoading ? (
              <div className="flex items-center justify-center py-20">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
                  <p className="text-gray-600 text-lg">Carregando produtos exclusivos...</p>
                </div>
              </div>
            ) : multiversoProducts.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-gray-500 text-lg">Nenhum produto exclusivo encontrado.</p>
              </div>
            ) : (
              <>
            <div 
              className="flex gap-12 transition-transform duration-500 ease-in-out"
              style={{ 
                transform: `translateX(-${currentMultiversoIndex * 328}px)`,
                width: `${multiversoProducts.length * 328}px`
              }}
            >
              {multiversoProducts.map((product) => (
                <div key={product.id} className="flex-shrink-0" style={{ width: '280px' }}>
                  <ProductCard
                    product={{
                      ...product,
                      id: product.id.toString(),
                          sold: product.sales || 0
                        }}
                        types={product.types}
                        colors={product.colors}
                        sizes={product.sizes}
                    onQuickBuy={handleQuickBuyProduct}
                  />
                </div>
              ))}
            </div>
            
            {/* Indicadores de Página - Estilo Netflix */}
            <div className="flex justify-center mt-6 space-x-2">
              {Array.from({ length: Math.max(1, multiversoProducts.length - 3) }, (_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentMultiversoIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    currentMultiversoIndex === index 
                      ? 'bg-black scale-125' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
              </>
            )}
          </div>



          {/* Mobile Carousel */}
          <div className="md:hidden">
            {multiversoLoading ? (
              <div className="flex items-center justify-center py-20">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
                  <p className="text-gray-600 text-lg">Carregando produtos exclusivos...</p>
                </div>
              </div>
            ) : multiversoProducts.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-gray-500 text-lg">Nenhum produto exclusivo encontrado.</p>
              </div>
            ) : (
              <div className="relative">
            <div 
              className="flex gap-4 overflow-x-auto pb-4 cursor-grab active:cursor-grabbing select-none" 
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              onMouseDown={handleMultiversoMouseDown}
              onMouseMove={handleMultiversoMouseMove}
              onMouseUp={handleMultiversoMouseUp}
              onMouseLeave={handleMultiversoMouseUp}
              onTouchStart={handleMultiversoTouchStart}
              onTouchMove={handleMultiversoTouchMove}
              onTouchEnd={handleMultiversoTouchEnd}
            >
              {multiversoProducts.slice(currentMultiversoIndex, currentMultiversoIndex + 2).map((product) => (
                    <div key={product.id} className="flex-shrink-0" style={{ width: '280px' }}>
                      <ProductCard
                        product={{
                          ...product,
                          id: product.id.toString(),
                          sold: product.sales || 0
                        }}
                        types={product.types}
                        colors={product.colors}
                        sizes={product.sizes}
                        onQuickBuy={handleQuickBuyProduct}
                      />
                      </div>
                  ))}
                    </div>
                  </div>
            )}
          </div>

        </div>
      </section>

      {/* Featured Stores */}
      <section className="py-20 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">MULTIVERSO DOS PARCEIROS</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              EXPLORE OUTRAS JORNADAS
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
                            <div className="text-gray-600 text-xs">SEGUIDORES</div>
                          </div>
                          <div className="text-center">
                            <div className="font-bold text-gray-900 text-lg">{store.products}</div>
                            <div className="text-gray-600 text-xs">PRODUTOS</div>
                          </div>
                        </div>

                        {/* Visit Store Button */}
                        <Link href={
                          store.slug === "sacocheio" ? "/saco-cheio" : 
                          store.slug === "sara-lee-jones" ? "/sara-lee-jones" : 
                          `/loja/${store.slug}`
                        }>
                          <Button className="w-full bg-black hover:bg-gray-800 text-white text-sm py-3 rounded-none">
                            VISITAR LOJA
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
              DESCOBRA COMO NOSSOS EXPLORADORES ESTÃO ESPALHANDO O MULTIVERSO PELO MUNDO. MARQUE{" "}
              <span className="font-semibold text-black">@MULTIVERSOESTUDIO</span> E FAÇA PARTE DESTA JORNADA.
            </p>
          </div>

          {/* Carrossel Instagram com Marquee Infinito */}
          <div className="relative mb-12">
            {/* Container do Marquee */}
            <div className="overflow-hidden">
              <Marquee
                speed={30}
                gradient={false}
                className="py-4"
                pauseOnHover={false}
              >
                <div className="flex gap-8 px-12">
              {/* Primeira cópia dos posts */}
              {explorerPosts.map((post) => (
                <div key={`first-${post.id}`} className="flex-none w-80 group cursor-pointer" onClick={() => setSelectedExplorerPost(post)}>
                  <div className="relative overflow-hidden bg-white shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 w-80">
                    <div className="aspect-[2300/3066] relative overflow-hidden">
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
              
              {/* Segunda cópia dos posts para continuidade perfeita */}
              {explorerPosts.map((post) => (
                <div key={`second-${post.id}`} className="flex-none w-80 group cursor-pointer" onClick={() => setSelectedExplorerPost(post)}>
                  <div className="relative overflow-hidden bg-white shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 w-80">
                    <div className="aspect-[2300/3066] relative overflow-hidden">
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
              </Marquee>
            </div>


          </div>

          {/* Call to Action */}
          <div className="text-center">
            <div className="relative inline-block p-12 bg-black/5 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl shadow-black/10 overflow-hidden">
              {/* Elementos decorativos de fundo */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-transparent to-white/5"></div>
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
              <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
              
              {/* Conteúdo principal */}
              <div className="relative z-10">
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 bg-black/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg border border-white/20">
                    <span className="text-2xl">🚀</span>
                  </div>
                </div>
                
                <h3 className="text-3xl md:text-4xl font-bold text-black mb-4">
                  SEJA O PRÓXIMO EXPLORADOR
                </h3>
                
                <p className="text-gray-700 mb-8 max-w-lg text-lg leading-relaxed">
                  COMPARTILHE SUA AVENTURA COM NOSSOS PRODUTOS E MARQUE
                  <span className="font-bold text-black">
                    {" "}@MULTIVERSOESTUDIO
                  </span>
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <Link href="/multiverso" className="group relative px-10 py-4 bg-black text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 overflow-hidden border border-white/20 inline-block">
                    <span className="relative z-10">EXPLORAR PRODUTOS</span>
                    <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </Link>
                  
                  <Link href="/multiverso" className="px-8 py-4 border-2 border-black/20 text-black font-semibold rounded-xl hover:bg-black hover:text-white transition-all duration-300 hover:border-black inline-block">
                    VER LOJAS
                  </Link>
                </div>
                
              </div>
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
              <div className="aspect-[2300/3066] relative">
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