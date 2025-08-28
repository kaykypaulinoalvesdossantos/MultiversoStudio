"use client"

export const dynamic = 'force-dynamic'

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"
import Footer from "@/components/footer"
import QuickBuyModal from "@/components/quick-buy-modal"
import ProductCard from "@/components/lojas/pagina-principal/product-card"
import { useParams } from "next/navigation"
import { Coffee, Package, Gift, Rocket, Palette } from "lucide-react"

// Configurações por categoria
const categoryConfigs = {
  canecas: {
    name: "Canecas",
    icon: <Coffee className="w-8 h-8" />,
    description: "Canecas personalizadas de todos os criadores",
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
    description: "Camisetas, moletons e mais",
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
    description: "Combos promocionais",
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
    description: "Novidades da semana",
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
    description: "Produtos que você personaliza",
    subcategories: [
      { name: "estampas", label: "Estampas", description: "Produtos com estampas personalizadas" },
      { name: "monogramas", label: "Monogramas", description: "Iniciais e monogramas" },
      { name: "fotos", label: "Fotos", description: "Sua foto no produto" },
      { name: "textos", label: "Textos", description: "Frases e textos personalizados" },
    ],
  },
}

interface Product {
  id: string
  title: string
  brand: string
  price: number
  originalPrice: number
  image: string
  badges: string[]
  rating: number
  reviews: number
  savings?: string
  cashback?: string
}

interface ProductType {
  id: string
  name: string
  price: number
  originalPrice?: number
}

interface ProductColor {
  name: string
  value: string
  image: string
}

export default function CategoryPage() {
  const router = useRouter()
  const params = useParams()
  const categoria = params.categoria as string
  const categoryConfig = categoryConfigs[categoria as keyof typeof categoryConfigs]
  
  const [selectedSubcategory, setSelectedSubcategory] = useState("todos")
  const [selectedStore, setSelectedStore] = useState<string | null>(null)
  const [selectedRating, setSelectedRating] = useState<number | null>(null)
  const [isQuickBuyOpen, setIsQuickBuyOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  if (!categoryConfig) {
    return <div>Categoria não encontrada</div>
  }

  const stores = ["Multiverso Estúdio", "Sacocheio.tv", "Canal do Gamer", "Cinemagrath", "Música Indie"]
  const ratings = [4, 3]

  // Dados para o novo componente ProductCard
  const productTypes: ProductType[] = [
    { id: "overside", name: "Overside", price: 89.9, originalPrice: 119.9 },
    { id: "basica", name: "Básica", price: 79.9, originalPrice: 99.9 }
  ]

  const productColors: ProductColor[] = [
    { name: "Preto", value: "black", image: "/imgs/produtos/prod-01-2300x3066.png" },
    { name: "Branco", value: "white", image: "/imgs/produtos/prod-02-2300x3066.png" },
    { name: "Azul", value: "blue", image: "/imgs/produtos/prod-03-2300x3066.png" }
  ]

  const sizes = ["PP", "P", "M", "G", "GG", "XG"]

  const handleQuickBuyProduct = (productId: string, type: string, color: string, size: string) => {
    console.log(`Produto ${productId} adicionado: ${type} - ${color} - ${size}`)
    
    // Por enquanto, vamos abrir o modal de quick buy
    const product = products.find(p => p.id === productId)
    if (product) {
      setSelectedProduct(product)
      setIsQuickBuyOpen(true)
    }
  }

  const products: Product[] = [
    {
      id: "1",
      title: `${categoryConfig.name} Multiverso Estudio - Original`,
      brand: "Multiverso Estudio",
      price: 89.9,
      originalPrice: 119.9,
      image: "/placeholder.svg?height=400&width=400",
      badges: ["Original", "25% OFF", "Frete grátis"],
      rating: 4.9,
      reviews: 567,
      savings: "Economize R$ 30,00",
    },
    {
      id: "2",
      title: `${categoryConfig.name} Sacocheio.tv - Humor Ácido`,
      brand: "Sacocheio.tv",
      price: 79.9,
      originalPrice: 99.9,
      image: "/placeholder.svg?height=400&width=400",
      badges: ["Lançamento", "20% OFF", "Frete grátis"],
      rating: 4.8,
      reviews: 234,
      savings: "Economize R$ 20,00",
    },
    {
      id: "3",
      title: `${categoryConfig.name} Canal do Gamer - RGB Edition`,
      brand: "Canal do Gamer",
      price: 139.9,
      originalPrice: 179.9,
      image: "/placeholder.svg?height=400&width=400",
      badges: ["RGB Edition", "22% OFF", "Frete grátis"],
      rating: 4.8,
      reviews: 123,
      savings: "Economize R$ 40,00",
    },
    {
      id: "4",
      title: `${categoryConfig.name} Cinemagrath - Cult Classic`,
      brand: "Cinemagrath",
      price: 99.9,
      originalPrice: 129.9,
      image: "/placeholder.svg?height=400&width=400",
      badges: ["Cult Classic", "23% OFF", "Frete grátis"],
      rating: 4.9,
      reviews: 156,
      savings: "Economize R$ 30,00",
    },
    {
      id: "5",
      title: `${categoryConfig.name} Música Indie - Organic`,
      brand: "Música Indie",
      price: 159.9,
      originalPrice: 199.9,
      image: "/placeholder.svg?height=400&width=400",
      badges: ["Indie Vibes", "20% OFF", "Frete grátis"],
      rating: 4.7,
      reviews: 89,
      savings: "Economize R$ 40,00",
    },
    {
      id: "6",
      title: `${categoryConfig.name} Multiverso Estudio - Premium Line`,
      brand: "Multiverso Estudio",
      price: 99.9,
      originalPrice: 129.9,
      image: "/placeholder.svg?height=400&width=400",
      badges: ["Premium", "23% OFF", "Frete grátis"],
      rating: 4.8,
      reviews: 345,
      savings: "Economize R$ 30,00",
    },
    {
      id: "7",
      title: `${categoryConfig.name} Arte Urbana - Street Style`,
      brand: "Arte Urbana",
      price: 84.9,
      originalPrice: 104.9,
      image: "/placeholder.svg?height=400&width=400",
      badges: ["Street Style", "19% OFF"],
      rating: 4.7,
      reviews: 234,
      savings: "Economize R$ 20,00",
    },
    {
      id: "8",
      title: `${categoryConfig.name} Vintage Collection - Retro`,
      brand: "Vintage Collection",
      price: 74.9,
      originalPrice: 94.9,
      image: "/placeholder.svg?height=400&width=400",
      badges: ["Retro", "21% OFF", "Frete grátis"],
      rating: 4.6,
      reviews: 167,
      savings: "Economize R$ 20,00",
    }
  ]

  const filteredProducts = products.filter(product => {
    if (selectedSubcategory !== "todos" && !product.badges.some(badge => 
      badge.toLowerCase().includes(selectedSubcategory.toLowerCase())
    )) return false
    
    if (selectedStore && product.brand !== selectedStore) return false
    
    if (selectedRating && product.rating < selectedRating) return false
    
    return true
  })

  return (
    <main className="bg-white text-black font-gotham min-h-screen">
      <Navbar />

      {/* HERO */}
      <section className="relative pt-20">
        <div className="bg-[linear-gradient(120deg,#111,#7a4a00,#b35b00)] text-white">
          <div className="max-w-6xl mx-auto px-6 py-12 md:py-16">
            <h1 className="uppercase font-black text-3xl md:text-5xl tracking-wide font-gotham-black">
              {categoryConfig.name}
            </h1>
            <p className="text-base md:text-lg text-white/90 mt-3 font-gotham-book">
                    {categoryConfig.description}. Produtos de todos os criadores da plataforma.
                  </p>
            <div className="mt-6 flex flex-wrap gap-3 text-sm">
              <span className="inline-flex items-center gap-2 px-3 py-2 bg-white/10 backdrop-blur-sm border border-white/20 font-gotham-bold">
                      {products.length}+ produtos
                    </span>
              <span className="inline-flex items-center gap-2 px-3 py-2 bg-white/10 backdrop-blur-sm border border-white/20 font-gotham-bold">
                4.8 ★ média
                    </span>
              <span className="inline-flex items-center gap-2 px-3 py-2 bg-white/10 backdrop-blur-sm border border-white/20 font-gotham-bold">
                      Frete grátis
                    </span>
            </div>
          </div>
        </div>

      {/* Subcategorias */}
        <div className="max-w-6xl mx-auto px-6 -mt-6">
          <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
            <button
              onClick={() => setSelectedSubcategory("todos")}
              className={`chip-mobile transition-all duration-200 ${
                selectedSubcategory === "todos" ? "active" : ""
              }`}
            >
              Todos ({products.length})
            </button>
            {categoryConfig.subcategories.map((sub) => (
              <button
                key={sub.name}
                onClick={() => setSelectedSubcategory(sub.name)}
                className={`chip-mobile transition-all duration-200 ${
                  selectedSubcategory === sub.name ? "active" : ""
                }`}
              >
                {sub.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* CONTEÚDO */}
      <section className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-12 gap-8">
        
        {/* SIDEBAR (desktop) */}
        <aside className="hidden md:block md:col-span-3">
          <div className="border border-gray-200 p-6 bg-white shadow-sm">
            <h3 className="uppercase text-sm font-semibold mb-6 font-gotham-bold tracking-wider">FILTROS</h3>
            
            {/* Lojas */}
            <details className="group border-t border-gray-100 pt-4 open">
              <summary className="flex items-center justify-between cursor-pointer select-none mb-4">
                <span className="uppercase text-xs font-semibold text-gray-700 font-gotham-bold">LOJAS</span>
                <span className="text-lg leading-none transition group-open:rotate-45 font-gotham-black">+</span>
              </summary>
              <div className="grid gap-2">
                {stores.map((store) => (
                      <button
                    key={store}
                    onClick={() => setSelectedStore(selectedStore === store ? null : store)}
                    className={`chip-mobile text-left transition-all duration-200 ${
                      selectedStore === store ? "active" : ""
                    }`}
                  >
                    {store}
                        </button>
                      ))}
                    </div>
            </details>

            {/* Avaliação */}
            <details className="group border-t border-gray-100 pt-4">
              <summary className="flex items-center justify-between cursor-pointer select-none mb-4">
                <span className="uppercase text-xs font-semibold text-gray-700 font-gotham-bold">AVALIAÇÃO</span>
                <span className="text-lg leading-none transition group-open:rotate-45 font-gotham-black">+</span>
              </summary>
              <div className="grid gap-2">
                {ratings.map((rating) => (
                        <button
                          key={rating}
                    onClick={() => setSelectedRating(selectedRating === rating ? null : rating)}
                    className={`chip-mobile text-left transition-all duration-200 ${
                      selectedRating === rating ? "active" : ""
                    }`}
                  >
                    {rating}★ e acima
                  </button>
                ))}
              </div>
            </details>
            </div>
        </aside>

        {/* GRID DE PRODUTOS */}
        <section className="md:col-span-9">
          <div className="grid sm:grid-cols-2 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={{
                  id: product.id,
                  name: product.title,
                  price: product.price,
                  originalPrice: product.originalPrice,
                  image: product.image,
                  badge: product.badges[0],
                  store: product.brand,
                  rating: product.rating,
                  reviews: product.reviews,
                  sold: Math.floor(Math.random() * 1000) + 100
                }}
                types={productTypes}
                colors={productColors}
                sizes={sizes}
                onQuickBuy={handleQuickBuyProduct}
              />
            ))}
          </div>
        </section>
      </section>

      {/* Modal de Compra Rápida */}
      {selectedProduct && (
        <QuickBuyModal
          isOpen={isQuickBuyOpen}
          onClose={() => setIsQuickBuyOpen(false)}
          product={{
            id: selectedProduct.id,
            name: selectedProduct.title,
            image: selectedProduct.image,
            price: selectedProduct.price,
            originalPrice: selectedProduct.originalPrice,
            store: selectedProduct.brand,
            badge: selectedProduct.badges[0],
            freeShipping: selectedProduct.badges.includes("Frete grátis")
          }}
        />
      )}

      <Footer />

      {/* Estilos CSS */}
      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        
        .chip-mobile {
          border: 1px solid #e5e7eb;
          background: #fff;
          padding: 0.5rem 1rem;
          font-size: 13px;
          font-weight: 700;
          color: #374151;
          text-align: center;
          transition: all 0.2s ease;
          min-height: 40px;
          cursor: pointer;
          white-space: nowrap;
        }
        
        .chip-mobile.active {
          background: #000;
          color: #fff;
          border-color: #000;
          transform: scale(1.02);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }
        
        .chip-mobile:hover:not(.active) {
          border-color: #d1d5db;
          transform: translateY(-1px);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </main>
  )
}