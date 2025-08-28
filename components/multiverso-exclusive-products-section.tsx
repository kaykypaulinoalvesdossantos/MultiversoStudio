"use client"

import { useState, useEffect } from "react"
import ProductCard from "@/components/lojas/pagina-principal/product-card"

export default function MultiversoExclusiveProductsSection() {
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentProductIndex, setCurrentProductIndex] = useState(0)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        setError(null)
        
        console.log('🔄 Iniciando busca de produtos exclusivos Multiverso...')
        
        // ✅ CHAMA SUA API REAL - MESMO PADRÃO DOS PRODUTOS EM ALTA
        const response = await fetch('http://https://api.multiversoestudiocrm.com.br/api/public/products/main-store')
        
        if (!response.ok) {
          throw new Error(`Erro ${response.status}: ${response.statusText}`)
        }

        const data = await response.json()
        console.log('📡 Resposta da API Multiverso:', data)
        
        if (!data.products || !Array.isArray(data.products)) {
          throw new Error('Formato de resposta inválido da API Multiverso')
        }

        console.log('✅ Produtos exclusivos recebidos:', data.products.length)
        
        // ✅ MAPEAR OS DADOS PARA O FORMATO CORRETO - MESMO PADRÃO
        const mappedProducts = data.products.map((product: any) => {
          // Extrair variações da estrutura da API
          const variants = product.variants || []
          const hasVariants = variants.length > 0
          
          // Mapear tipos, cores e tamanhos das variações
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
          
          console.log(`📦 Produto ${product.name}:`, {
            hasVariants,
            types,
            colors,
            sizes,
            variants: variants.length
          })
          
          return {
            id: product.id,
            name: product.name,
            description: product.description,
            price: parseFloat(product.price) || 0,
            originalPrice: 0, // Não tem preço original na API
            image: product.mainImage || "/placeholder.jpg",
            badge: "Multiverso Original",
            store: product.store?.name || "Multiverso Estúdios",
            rating: 5, // Valor padrão
            reviews: 0, // Valor padrão
            sold: 0, // Valor padrão
            // ✅ DADOS PARA O PRODUCTCARD
            types: types.length > 0 ? types : undefined,
            colors: colors.length > 0 ? colors : undefined,
            sizes: sizes.length > 0 ? sizes : undefined,
            // Dados originais da API para debug
            _originalProduct: product
          }
        })
        
        console.log('🔄 Produtos mapeados:', mappedProducts)
        console.log('🔄 Estrutura final dos produtos:', JSON.stringify(mappedProducts, null, 2))
        setProducts(mappedProducts)
        
      } catch (err) {
        console.error('❌ Erro ao buscar produtos exclusivos Multiverso:', err)
        setError(err instanceof Error ? err.message : 'Erro ao carregar produtos exclusivos')
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
    // @ts-ignore
    window.multiversoExclusiveNavigation = {
      nextProducts,
      prevProducts,
      currentProductIndex,
      setCurrentProductIndex,
      products
    }
  }, [currentProductIndex, products])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Carregando produtos exclusivos Multiverso...</p>
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
            onClick={() => window.location.reload()} 
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
        <p className="text-gray-500 text-lg">Nenhum produto exclusivo Multiverso encontrado.</p>
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
                product={product}
                types={product.types}
                colors={product.colors}
                sizes={product.sizes}
                onQuickBuy={(productId, type, color, size) => {
                  console.log(`🛒 Produto ${productId} adicionado: ${type} - ${color} - ${size}`)
                }}
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
                  product={product}
                  types={product.types}
                  colors={product.colors}
                  sizes={product.sizes}
                  onQuickBuy={(productId, type, color, size) => {
                    console.log(`🛒 Produto ${productId} adicionado: ${type} - ${color} - ${size}`)
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
