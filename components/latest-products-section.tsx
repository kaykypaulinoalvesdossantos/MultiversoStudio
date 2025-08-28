"use client"

import { useState, useEffect } from "react"
import ProductCard from "@/components/lojas/pagina-principal/product-card"

export default function LatestProductsSection() {
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentProductIndex, setCurrentProductIndex] = useState(0)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        setError(null)
        
        console.log('🔄 Iniciando busca de produtos em alta da sua API...')
        
        // ✅ CHAMA SUA API REAL
        const response = await fetch('https://api.multiversoestudiocrm.com.br/api/products/latest/latest-products?limit=8')
        
        if (!response.ok) {
          throw new Error(`Erro ${response.status}: ${response.statusText}`)
        }

        const data = await response.json()
        console.log('📡 Resposta da sua API:', data)
        
        if (!data.products || !Array.isArray(data.products)) {
          throw new Error('Formato de resposta inválido da API')
        }

        console.log('✅ Produtos recebidos da sua API:', data.products.length)
        setProducts(data.products)
        
      } catch (err) {
        console.error('❌ Erro ao buscar produtos da sua API:', err)
        setError(err instanceof Error ? err.message : 'Erro ao carregar produtos')
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  // ✅ Funções para as setas da page principal usarem
  const nextProducts = () => {
    const maxIndex = Math.max(0, products.length - 4)
    if (currentProductIndex < maxIndex) {
      setCurrentProductIndex(prev => prev + 1)
    }
  }

  const prevProducts = () => {
    if (currentProductIndex > 0) {
      setCurrentProductIndex(prev => prev - 1)
    }
  }

  // ✅ Expor as funções para a page principal usar
  useEffect(() => {
    // Verificar se window existe (não está disponível durante SSR)
    if (typeof window !== 'undefined') {
      // @ts-ignore
      window.latestProductsNavigation = {
        nextProducts,
        prevProducts,
        currentProductIndex,
        setCurrentProductIndex,
        products
      }
    }
  }, [currentProductIndex, products])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Carregando produtos em alta...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <div className="text-center">
          <p className="text-red-600 text-lg mb-4">Erro: {error}</p>
          <button 
            onClick={() => {
              if (typeof window !== 'undefined') {
                window.location.reload()
              }
            }} 
            className="bg-black hover:bg-gray-800 text-white px-6 py-2 rounded"
          >
            Tentar novamente
          </button>
        </div>
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500 text-lg">Nenhum produto em alta encontrado.</p>
      </div>
    )
  }

  return (
    <>
      {/* Desktop Carousel - Estático com Navegação */}
      <div className="hidden md:block relative overflow-hidden">
        <div 
          className="flex gap-12 transition-transform duration-500 ease-in-out"
          style={{ 
            transform: `translateX(-${currentProductIndex * 328}px)`,
            width: `${products.length * 328}px`
          }}
        >
          {products.map((product) => (
            <div key={product.id} className="flex-shrink-0" style={{ width: '280px' }}>
              <ProductCard 
                product={{
                  id: product.id,
                  name: product.name,
                  price: parseFloat(product.price) || 0,
                  image: product.mainImage || product.image || '/placeholder.jpg',
                  store: product.store?.name || 'Loja',
                  rating: 4.9,
                  reviews: 100,
                  sold: product.salesCount || 0
                }}
                types={product.variants && product.variants.length > 0 ? product.variants.map((v: any) => ({
                  id: v.id,
                  name: v.name,
                  price: 0,
                  originalPrice: 0
                })) : undefined}
                colors={product.variants && product.variants.length > 0 && product.variants[0].colors ? 
                  product.variants[0].colors.map((color: string) => ({
                    name: color,
                    value: color.toLowerCase(),
                    image: product.mainImage || '/placeholder.jpg'
                  })) : undefined
                }
                sizes={product.variants && product.variants.length > 0 && product.variants[0].sizes ? 
                  product.variants[0].sizes : undefined
                }
              />
            </div>
          ))}
        </div>
        
        {/* Indicadores de Página - Estilo Netflix */}
        <div className="flex justify-center mt-6 space-x-2">
          {Array.from({ length: Math.max(1, products.length - 3) }, (_, index) => (
            <button
              key={index}
              onClick={() => setCurrentProductIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                currentProductIndex === index 
                  ? 'bg-black scale-125' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Mobile Carousel */}
      <div className="md:hidden">
        <div className="relative">
          <div 
            className="flex gap-4 overflow-hidden cursor-grab active:cursor-grabbing select-none"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {products.slice(currentProductIndex, currentProductIndex + 2).map((product) => (
              <div key={product.id} className="flex-shrink-0 w-[calc(50%-8px)]">
                <ProductCard 
                  product={{
                    id: product.id,
                    name: product.name,
                    price: parseFloat(product.price) || 0,
                    image: product.mainImage || product.image || '/placeholder.jpg',
                    store: product.store?.name || 'Loja',
                    rating: 4.9,
                    reviews: 100,
                    sold: product.salesCount || 0
                  }}
                                     types={product.variants && product.variants.length > 0 ? product.variants.map((v: any) => ({
                     id: v.id,
                     name: v.name,
                     price: 0,
                     originalPrice: 0
                   })) : undefined}
                   colors={product.variants && product.variants.length > 0 && product.variants[0].colors ? 
                     product.variants[0].colors.map((color: string) => ({
                       name: color,
                       value: color.toLowerCase(),
                       image: product.mainImage || '/placeholder.jpg'
                     })) : undefined
                   }
                   sizes={product.variants && product.variants.length > 0 && product.variants[0].sizes ? 
                     product.variants[0].sizes : undefined
                   }
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
