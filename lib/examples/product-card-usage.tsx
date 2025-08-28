"use client"

import { useLatestProducts } from '@/hooks/use-latest-products';
import ProductCard from '@/components/lojas/pagina-principal/product-card';

export default function ProductCardUsageExample() {
  const { products, loading, error } = useLatestProducts(10);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando produtos em alta...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <p className="text-red-600 mb-4">Erro ao carregar produtos: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Produtos em Alta
        </h2>
        <p className="text-gray-600">
          {products.length} produtos encontrados - Sistema inteligente de complexidade
        </p>
      </div>

      {/* Grid de produtos usando o ProductCard modificado */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {products.map((product) => (
          <ProductCard 
            key={product.id} 
            latestProduct={product} // Usar a nova prop para produtos da API
          />
        ))}
      </div>

      {/* Exemplo de uso com produtos tradicionais (mantido para compatibilidade) */}
      <div className="mt-12">
        <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Produtos Tradicionais (Compatibilidade)
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {/* Exemplo de produto tradicional */}
          <ProductCard
            product={{
              id: "1",
              name: "Produto Tradicional",
              price: 99.99,
              originalPrice: 129.99,
              image: "/placeholder.svg",
              badge: "NOVO",
              discount: "20% OFF",
              freeShipping: true,
              store: "Loja Exemplo",
              rating: 4.8,
              reviews: 156,
              sold: 89
            }}
            types={[
              { id: "1", name: "Regular", price: 99.99 },
              { id: "2", name: "Premium", price: 129.99 }
            ]}
            colors={[
              { name: "Preto", value: "black", image: "/placeholder.svg" },
              { name: "Branco", value: "white", image: "/placeholder.svg" }
            ]}
            sizes={["P", "M", "G", "GG"]}
          />
        </div>
      </div>
    </div>
  );
}
