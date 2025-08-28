"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import Marquee from "react-fast-marquee"
import { useCart } from "@/contexts/cart-context"
import QuickBuyModal from "@/components/quick-buy-modal"

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

interface ProductCardProps {
  // Produto da nova API de produtos em alta
  latestProduct?: {
    id: string
    storeId: string
    name: string
    description: string
    price: string
    stock: number
    unlimited: boolean
    status: string
    mainImage: string
    mainImageId: string | null
    images: string[]
    imageIds: string[]
    categoryId: string
    category: {
      id: string
      name: string
      description: string
      image: string
      imageId: string
      isActive: boolean
      parentId: string | null
      level: number
      path: string
      createdAt: string
      updatedAt: string
    }
    store: {
      id: string
      name: string
      subdomain: string
    }
    variants: Array<{
      id: string
      productId: string
      name: string
      type: string
      description: string | null
      colors: string[]
      sizes: string[]
      hasSizes: boolean
      priceAdjustment: number | null
      stock: number | null
      isActive: boolean
      sortOrder: number
      createdAt: string
      updatedAt: string
    }>
    salesCount: number
    isTrending: boolean
  }
  
  // Produto tradicional (mantido para compatibilidade)
  product?: {
    id: string
    name: string
    price: number
    originalPrice?: number
    image: string
    badge?: string
    discount?: string
    freeShipping?: boolean
    store: string
    rating: number
    reviews: number
    sold: number
  }
  
  types?: ProductType[]
  colors?: ProductColor[]
  sizes?: string[]
  onQuickBuy?: (productId: string, type: string, color: string, size: string) => void
}

export default function ProductCard({ 
  latestProduct, 
  product, 
  types, 
  colors, 
  sizes, 
  onQuickBuy 
}: ProductCardProps) {
  // Se for um produto da nova API, usar lógica de produtos em alta
  if (latestProduct) {
    return <LatestProductCard product={latestProduct} onQuickBuy={onQuickBuy} />;
  }
  
  // Se for um produto tradicional, verificar se tem variações
  if (product) {
    const hasVariations = (types && types.length > 0) || (colors && colors.length > 0) || (sizes && sizes.length > 0);
    
    if (hasVariations) {
      // Produto COM variações - usar TraditionalProductCard
      return <TraditionalProductCard 
        product={product} 
        types={types || []} 
        colors={colors || []} 
        sizes={sizes || []} 
        onQuickBuy={onQuickBuy} 
      />;
    } else {
      // Produto SEM variações - usar SimpleProductCard
      return <SimpleProductCard product={product} />;
    }
  }
  
  // Fallback se nenhum produto for fornecido
  return <div>Produto não encontrado</div>;
}

// Componente para produtos da nova API
function LatestProductCard({ 
  product, 
  onQuickBuy 
}: { 
  product: NonNullable<ProductCardProps['latestProduct']>;
  onQuickBuy?: ProductCardProps['onQuickBuy'];
}) {
  const [selectedVariant, setSelectedVariant] = useState<typeof product.variants[0] | null>(null);
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const [showQuickBuyModal, setShowQuickBuyModal] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const { addToCart } = useCart();

  // Analisar complexidade do produto
  const hasVariants = product.variants && product.variants.length > 0;
  const variantCount = hasVariants ? product.variants.length : 0;
  
  let complexity: 'simple' | 'variant' | 'complex' = 'simple';
  
  // Lógica mais robusta para determinar complexidade
  if (hasVariants) {
    if (variantCount <= 2) {
      complexity = 'variant';
    } else {
      complexity = 'complex';
    }
  }

  // Forçar complexidade para produtos com mais de 2 variações
  if (variantCount > 2) {
    complexity = 'complex';
  }

  // Verificação adicional para garantir que produtos com 3+ variações sejam complexos
  if (product.variants && product.variants.length >= 3) {
    complexity = 'complex';
  }

  // Log detalhado para debug
  console.log('=== DEBUG COMPLEXIDADE ===');
  console.log('Produto:', product.name);
  console.log('hasVariants:', hasVariants);
  console.log('variantCount:', variantCount);
  console.log('Variantes:', product.variants);
  console.log('Estrutura completa das variantes:', JSON.stringify(product.variants, null, 2));
  console.log('Complexidade final:', complexity);
  console.log('Deve abrir modal?', complexity === 'complex');
  console.log('Tipo de produto:', variantCount === 1 ? 'Simples (1 variante)' : variantCount === 2 ? 'Médio (2 variantes)' : variantCount >= 3 ? 'Complexo (3+ variantes)' : 'Sem variantes');
  console.log('========================');



  const shouldOpenModal = complexity === 'complex';

  // Opções disponíveis baseadas na variação selecionada
  const availableColors = selectedVariant?.colors || [];
  const availableSizes = selectedVariant?.sizes || [];

  // Determinar se pode adicionar ao carrinho
  const canAddToCart = () => {
    if (complexity === 'simple') return true;
    if (complexity === 'variant') {
      return selectedVariant && 
             (availableColors.length === 0 || selectedColor) &&
             (availableSizes.length === 0 || selectedSize);
    }
    return false;
  };

  // Processar seleção de variação
  const handleVariantSelect = (variant: typeof product.variants[0]) => {
    setSelectedVariant(variant);
    setSelectedColor("");
    setSelectedSize("");
  };

  // Processar seleção de cor
  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
  };

  // Processar seleção de tamanho
  const handleSizeSelect = (size: string) => {
    setSelectedSize(size);
  };

  // Adicionar ao carrinho
  const handleAddToCart = async () => {
    if (!canAddToCart()) return;

    setIsProcessing(true);

    try {
      // Adicionar ao carrinho via context
      addToCart({
        productId: product.id,
        name: product.name,
        price: parseFloat(product.price),
        image: product.mainImage || '/placeholder.svg',
        type: selectedVariant?.name || 'Padrão',
        color: selectedColor || 'Padrão',
        size: selectedSize || 'Padrão',
        quantity,
        store: product.store.name
      });

      // Mostrar confirmação
      setShowConfirmation(true);
      setTimeout(() => setShowConfirmation(false), 2000);
    } catch (error) {
      console.error('Erro ao adicionar produto:', error);
      alert('Erro ao adicionar produto ao carrinho');
    } finally {
      setIsProcessing(false);
    }
  };

  // Abrir modal quick-buy
  const handleQuickBuy = () => {
    console.log('Abrindo modal para produto complexo:', product.name);
    console.log('Estado do modal antes:', showQuickBuyModal);
    
    if (onQuickBuy) {
      onQuickBuy(product.id, selectedVariant?.name || '', selectedColor, selectedSize || '');
    } else {
      console.log('Definindo showQuickBuyModal como true');
      setShowQuickBuyModal(true);
    }
  };

  // Fechar modal
  const handleCloseModal = () => {
    setShowQuickBuyModal(false);
  };

  // Preparar dados para o modal
  const modalProduct = {
    id: product.id,
    name: product.name,
    image: product.mainImage || '/placeholder.svg',
    price: parseFloat(product.price),
    originalPrice: undefined,
    store: product.store.name,
    badge: product.isTrending ? 'EM ALTA' : undefined,
    discount: undefined,
    freeShipping: false
  };

  return (
    <>
      <div className="relative group bg-white border border-gray-200 hover:border-gray-300 transition-all duration-300 hover:shadow-lg">
        {/* Badge de produto em alta */}
        {product.isTrending && (
          <div className="absolute top-2 left-2 z-10">
            <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
              EM ALTA
            </span>
          </div>
        )}

        {/* Imagem do produto */}
        <div className="relative aspect-[4/5] bg-gray-50 overflow-hidden">
          <Image
            src={product.mainImage || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Informações do produto */}
        <div className="p-4 space-y-3">
          {/* Nome e categoria */}
          <div>
            <h3 className="font-semibold text-gray-900 text-sm line-clamp-2 mb-1">
              {product.name}
            </h3>
            <p className="text-xs text-gray-500 capitalize">
              {product.category.name}
            </p>
          </div>

          {/* Preço */}
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-gray-900">
              R$ {parseFloat(product.price).toFixed(2).replace(".", ",")}
            </span>
            {product.salesCount > 0 && (
              <span className="text-xs text-gray-500">
                {product.salesCount} vendidos
              </span>
            )}
          </div>

          {/* Variações (se houver ≤2) */}
          {(() => {
            console.log('Verificando se deve renderizar variações inline:', complexity === 'variant');
            return null;
          })()}
          {complexity === 'variant' && (
            <div className="space-y-2">
              {/* Seleção de variação */}
              <div>
                <label className="text-xs font-medium text-gray-700 block mb-1">
                  Variação:
                </label>
                <div className="flex gap-1">
                  {product.variants.map((variant) => (
                    <button
                      key={variant.id}
                      onClick={() => handleVariantSelect(variant)}
                      className={`px-2 py-1 text-xs border rounded transition-colors ${
                        selectedVariant?.id === variant.id
                          ? "border-black bg-black text-white"
                          : "border-gray-300 text-gray-700 hover:border-gray-400"
                      }`}
                    >
                      {variant.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Seleção de cor (se disponível) */}
              {availableColors.length > 0 && (
                <div>
                  <label className="text-xs font-medium text-gray-700 block mb-1">
                    Cor:
                  </label>
                  <div className="flex gap-1">
                    {availableColors.map((color) => (
                      <button
                        key={color}
                        onClick={() => handleColorSelect(color)}
                        className={`px-2 py-1 text-xs border rounded transition-colors ${
                          selectedColor === color
                            ? "border-black bg-black text-white"
                            : "border-gray-300 text-gray-700 hover:border-gray-400"
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Seleção de tamanho (se disponível) */}
              {availableSizes.length > 0 && (
                <div>
                  <label className="text-xs font-medium text-gray-700 block mb-1">
                    Tamanho:
                  </label>
                  <div className="flex gap-1">
                    {availableSizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => handleSizeSelect(size)}
                        className={`px-2 py-1 text-xs border rounded transition-colors ${
                          selectedSize === size
                            ? "border-black bg-black text-white"
                            : "border-gray-300 text-gray-700 hover:border-gray-400"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Botão de adicionar ao carrinho */}
              {canAddToCart() && (
                <div className="flex gap-2">
                  <div className="flex items-center border border-gray-300 rounded">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                      disabled={quantity <= 1}
                    >
                      -
                    </button>
                    <span className="px-3 py-1 text-sm font-medium min-w-[2rem] text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(Math.min(10, quantity + 1))}
                      className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                      disabled={quantity >= 10}
                    >
                      +
                    </button>
                  </div>
                  
                  <Button
                    onClick={handleAddToCart}
                    disabled={!canAddToCart() || isProcessing}
                    className="flex-1 bg-black hover:bg-gray-800 text-white text-sm font-medium py-2 disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    {isProcessing ? "..." : "COMPRAR"}
                  </Button>
                </div>
              )}
            </div>
          )}

          {/* Botão de configurar para produtos complexos */}
          {(() => {
            console.log('Verificando se deve renderizar botão CONFIGURAR:', complexity === 'complex');
            return null;
          })()}
          {complexity === 'complex' && (
            <div className="space-y-3">
              <Button
                onClick={handleQuickBuy}
                className="w-full bg-black hover:bg-gray-800 text-white text-sm font-medium py-2"
              >
                CONFIGURAR
              </Button>
              <p className="text-xs text-gray-500 text-center">
                Produto com {variantCount} variações - Configure no modal
              </p>
            </div>
          )}

          {/* Botão de teste para produtos com 1-2 variantes (temporário) */}
          {complexity === 'variant' && (
            <div className="space-y-3">
              <Button
                onClick={() => {
                  console.log('Testando modal para produto com', variantCount, 'variantes');
                  setShowQuickBuyModal(true);
                }}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2"
              >
                TESTAR MODAL ({variantCount} variantes)
              </Button>
              <p className="text-xs text-gray-500 text-center">
                Produto com {variantCount} variantes - Clique para testar modal
              </p>
            </div>
          )}

          {/* Botão de comprar para produtos simples */}
          {complexity === 'simple' && (
            <div className="flex gap-2">
              <div className="flex items-center border border-gray-300 rounded">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <span className="px-3 py-1 text-sm font-medium min-w-[2rem] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(Math.min(10, quantity + 1))}
                  className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                  disabled={quantity >= 10}
                >
                  +
                </button>
              </div>
              
              <Button
                onClick={handleAddToCart}
                disabled={isProcessing}
                className="flex-1 bg-black hover:bg-gray-800 text-white text-sm font-medium py-2 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                {isProcessing ? "..." : "COMPRAR"}
              </Button>
            </div>
          )}

          {/* Confirmação de adição */}
          {showConfirmation && (
            <div className="absolute inset-0 bg-green-500/90 flex items-center justify-center rounded">
              <div className="bg-white p-3 rounded shadow-lg text-center">
                <div className="text-green-600 text-2xl mb-2">✓</div>
                <div className="text-sm font-medium text-gray-900">
                  Produto adicionado ao carrinho!
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal Quick Buy para produtos complexos */}
      {console.log('Renderizando modal, showQuickBuyModal:', showQuickBuyModal)}
      <QuickBuyModal
        isOpen={showQuickBuyModal}
        onClose={handleCloseModal}
        product={modalProduct}
      />
    </>
  );
}

// Componente para produtos simples (sem variações)
function SimpleProductCard({ product }: { product: NonNullable<ProductCardProps['product']> }) {
  const [quantity, setQuantity] = useState(1);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const { addToCart } = useCart();

  const handleAddToCart = async () => {
    setIsProcessing(true);

    try {
      addToCart({
        productId: product.id,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.image,
        type: 'Padrão',
        color: 'Padrão',
        size: 'Padrão',
        quantity,
        store: product.store
      });

      setShowConfirmation(true);
      setTimeout(() => setShowConfirmation(false), 2000);
    } catch (error) {
      console.error('Erro ao adicionar produto:', error);
      alert('Erro ao adicionar produto ao carrinho');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="group cursor-pointer flex-shrink-0 w-full max-w-[280px] mx-auto">
      {/* Confirmação de produto adicionado */}
      {showConfirmation && (
        <div className="absolute top-0 left-0 right-0 z-50 bg-green-500 text-white text-center py-2 font-bold text-sm animate-pulse">
          ✓ PRODUTO ADICIONADO AO CARRINHO!
        </div>
      )}

      <div className="relative aspect-[2300/3066] overflow-hidden bg-gray-50 mb-1">
        <Image
          src={product.image || "/placeholder.svg?height=400&width=300"}
          alt={product.name}
          fill
          className="object-cover"
        />

        {/* Badges */}
        <div className="absolute top-2 left-2 md:top-4 md:left-4 flex flex-col space-y-0.5">
          {product.badge && (
            <div className="text-xs font-bold uppercase text-black hover:text-gray-600 transition-all duration-200 cursor-pointer bg-white/90 px-2 py-1 md:bg-transparent md:px-0 md:py-0">
              {product.badge}
            </div>
          )}
          {product.discount && (
            <div className="text-xs font-bold uppercase text-black hover:text-gray-600 transition-all duration-200 cursor-pointer bg-white/90 px-2 py-1 md:bg-transparent md:px-0 md:py-0">
              {product.discount}
            </div>
          )}
          {product.freeShipping && (
            <div className="text-xs font-bold uppercase text-black hover:text-gray-600 transition-all duration-200 cursor-pointer bg-white/90 px-2 py-1 md:bg-transparent md:px-0 md:py-0">
              FRETE GRÁTIS
            </div>
          )}
        </div>

        {/* Botão COMPRAR - Sempre visível para produtos simples */}
        <div className="absolute bottom-0 left-0 right-0 overflow-hidden">
          <Button
            className="w-full transition-opacity bg-black hover:bg-black text-white rounded-none font-bold uppercase opacity-100"
            onClick={handleAddToCart}
            disabled={isProcessing}
          >
            {/* Marquee para estado inicial - igual ao TraditionalProductCard */}
            <Marquee
              speed={50}
              gradient={false}
              className="text-white font-bold"
            >
              {["COMPRAR", "COMPRAR", "COMPRAR", "COMPRAR"].map((text, index) => (
                <span key={index} className="mx-2">
                  {text}
                </span>
              ))}
            </Marquee>
          </Button>
        </div>
      </div>

      <div className="space-y-1 px-1 md:px-0">
        {/* Store Name */}
        <p className="text-xs text-gray-600 uppercase font-bold font-gotham-bold">{product.store}</p>
        
        {/* Product Name */}
        <Link href={`/produto/${product.id}`}>
          <h3 className="font-bold text-xs md:text-sm leading-tight uppercase text-black font-gotham-bold" style={{ 
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}>
            {product.name}
          </h3>
        </Link>
        
        {/* Rating */}
        <div className="flex items-center space-x-1">
          <span className="text-xs text-gray-600">★ {product.rating}</span>
          <span className="text-xs text-gray-500">({product.reviews})</span>
        </div>
        
        {/* Pricing */}
        <div className="flex items-center space-x-2">
          <span className="text-sm md:text-lg font-bold text-black font-gotham-black">R$ {product.price.toFixed(2).replace(".", ",")}</span>
          {product.originalPrice && (
            <span className="text-xs md:text-sm text-gray-500 line-through font-gotham-medium">
              R$ {product.originalPrice.toFixed(2).replace(".", ",")}
            </span>
          )}
        </div>
        
        {/* Payment Terms */}
        <div className="text-xs text-green-600 font-semibold font-gotham-bold">3X SEM JUROS</div>
        
        {/* Sales Count */}
        <div className="text-xs text-gray-500 font-medium font-gotham-medium">{product.sold} VENDIDOS</div>
      </div>
    </div>
  );
}

// Componente para produtos tradicionais (com variações)
function TraditionalProductCard({ 
  product, 
  types, 
  colors, 
  sizes, 
  onQuickBuy 
}: { 
  product: NonNullable<ProductCardProps['product']>;
  types: ProductType[];
  colors: ProductColor[];
  sizes: string[];
  onQuickBuy?: ProductCardProps['onQuickBuy'];
}) {
  const [step, setStep] = useState<"initial" | "type" | "color" | "size">("initial")
  const [selectedType, setSelectedType] = useState<ProductType | null>(null)
  const [selectedColor, setSelectedColor] = useState<ProductColor | null>(null)
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [isHoveringBuy, setIsHoveringBuy] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const { addToCart } = useCart()

  // Compra rápida sempre disponível para produtos com variações
  const hasQuickBuy = true

  const getCurrentImage = () => {
    if (selectedColor) {
      return selectedColor.image
    }
    return product.image
  }

  const handleTypeSelect = (type: ProductType) => {
    setSelectedType(type)
    setStep("color")
  }

  const handleColorSelect = (color: ProductColor) => {
    setSelectedColor(color)
    setStep("size")
  }

  const handleSizeSelect = (size: string) => {
    setSelectedSize(size)

    // Adicionar ao carrinho via contexto
    if (selectedType && selectedColor) {
      addToCart({
        productId: product.id,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.image,
        type: selectedType.name,
        color: selectedColor.name,
        size,
        quantity: 1,
        store: product.store
      })

      // Mostrar confirmação
      setShowConfirmation(true)
    }

    // Reset do estado após um delay para mostrar confirmação
    setTimeout(() => {
      setSelectedType(null)
      setSelectedColor(null)
      setSelectedSize(null)
      setStep("initial")
      setIsHoveringBuy(false)
      setShowConfirmation(false)
    }, 2000)
  }

  const handleMouseLeave = () => {
    // Sempre reseta para o estado inicial quando sair do hover
    setIsHoveringBuy(false)
    setStep("initial")
    setSelectedType(null)
    setSelectedColor(null)
    setSelectedSize(null)
  }

  const handleBuyHover = () => {
    if (hasQuickBuy) {
      setIsHoveringBuy(true)
      setStep("type")
    }
  }

  const handleBuyLeave = () => {
    if (step === "initial") {
      setIsHoveringBuy(false)
    }
  }

  const handleBuyClick = () => {
    if (hasQuickBuy) {
      setIsHoveringBuy(true)
      setStep("type")
    }
  }

  return (
    <div
      className="group cursor-pointer flex-shrink-0 w-full max-w-[280px] mx-auto"
      onMouseLeave={handleMouseLeave}
    >
      {/* Confirmação de produto adicionado */}
      {showConfirmation && (
        <div className="absolute top-0 left-0 right-0 z-50 bg-green-500 text-white text-center py-2 font-bold text-sm animate-pulse">
          ✓ PRODUTO ADICIONADO AO CARRINHO!
        </div>
      )}

      <div className="relative aspect-[2300/3066] overflow-hidden bg-gray-50 mb-1">
        <Image
          src={getCurrentImage() || "/placeholder.svg?height=400&width=300"}
          alt={product.name}
          fill
          className="object-cover"
        />

        {/* Badges */}
        <div className="absolute top-2 left-2 md:top-4 md:left-4 flex flex-col space-y-0.5">
          {product.badge && (
            <div className="text-xs font-bold uppercase text-black hover:text-gray-600 transition-all duration-200 cursor-pointer bg-white/90 px-2 py-1 md:bg-transparent md:px-0 md:py-0">
              {product.badge}
            </div>
          )}
          {product.discount && (
            <div className="text-xs font-bold uppercase text-black hover:text-gray-600 transition-all duration-200 cursor-pointer bg-white/90 px-2 py-1 md:bg-transparent md:px-0 md:py-0">
              {product.discount}
            </div>
          )}
          {product.freeShipping && (
            <div className="text-xs font-bold uppercase text-black hover:text-gray-600 transition-all duration-200 cursor-pointer bg-white/90 px-2 py-1 md:bg-transparent md:px-0 md:py-0">
              FRETE GRÁTIS
            </div>
          )}
        </div>

        {/* Color Swatches */}
        <div className="absolute top-2 right-2 md:top-4 md:right-4 flex flex-col space-y-0.5">
          {colors.slice(0, 3).map((color) => (
            <div
              key={color.value}
              className={`w-4 h-4 border-2 cursor-pointer transition-all ${
                selectedColor?.value === color.value ? "border-gray-800 ring-2 ring-gray-400 ring-offset-1" : "border-white"
              } ${
                color.value === "black"
                  ? "bg-black"
                  : color.value === "white"
                    ? "bg-white"
                    : color.value === "blue"
                      ? "bg-blue-500"
                      : color.value === "red"
                        ? "bg-red-500"
                        : "bg-gray-400"
              }`}
              onClick={() => handleColorSelect(color)}
            />
          ))}
          <div className="w-4 h-4 bg-gray-400 border border-white text-black text-xs font-bold flex items-center justify-center cursor-pointer">
            +
          </div>
        </div>

        {/* Quick Buy Button - Bottom of image, full width */}
        <div className="absolute bottom-0 left-0 right-0 overflow-hidden">
          {/* Botão só aparece quando não está configurando o produto */}
          {!isHoveringBuy && (
            <Button
              className="w-full transition-opacity bg-black hover:bg-black text-white rounded-none font-bold uppercase opacity-100"
              onMouseEnter={handleBuyHover}
              onMouseLeave={handleBuyLeave}
              onClick={handleBuyClick}
            >
              {/* Marquee para estado inicial */}
              <Marquee
                speed={50}
                gradient={false}
                className="text-white font-bold"
              >
                {["COMPRAR", "COMPRAR", "COMPRAR", "COMPRAR"].map((text, index) => (
                  <span key={index} className="mx-2">
                    {text}
                  </span>
                ))}
              </Marquee>
            </Button>
          )}

          {/* Quick Buy Flow - Só aparece se hasQuickBuy = true */}
          {hasQuickBuy && isHoveringBuy && step === "type" && (
            <div className="opacity-100 transition-opacity flex bg-black">
              {types.map((type) => (
                <button
                  key={type.id}
                  onClick={() => handleTypeSelect(type)}
                  className="flex-1 bg-black hover:bg-gray-800 text-white font-bold uppercase py-2 md:py-3 text-xs md:text-sm transition-colors"
                >
                  {type.name}
                </button>
              ))}
            </div>
          )}

          {hasQuickBuy && isHoveringBuy && step === "color" && (
            <div className="opacity-100 transition-opacity bg-black">
              <div className="text-white text-xs font-bold uppercase mb-1 text-center py-1">{selectedType?.name}</div>
              <div className="grid grid-cols-2 md:flex md:flex-nowrap gap-0">
                {colors.map((color) => (
                  <button
                    key={color.value}
                    onClick={() => handleColorSelect(color)}
                    className="bg-black hover:bg-gray-800 text-white font-bold uppercase py-1.5 md:py-2 text-xs transition-colors border-r border-gray-600 last:border-r-0 md:flex-1"
                  >
                    {color.name}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setStep("type")}
                className="bg-gray-800 hover:bg-gray-700 text-white font-bold uppercase py-1.5 md:py-2 text-xs transition-colors px-2 border-t border-gray-600"
              >
                ← Voltar
              </button>
            </div>
          )}

          {hasQuickBuy && isHoveringBuy && step === "size" && (
            <div className="opacity-100 transition-opacity bg-black">
              <div className="text-white text-xs font-bold uppercase mb-1 text-center py-1">
                {selectedType?.name} - {selectedColor?.name}
              </div>
              <div className="grid grid-cols-3 md:flex gap-0">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => handleSizeSelect(size)}
                    className="bg-black hover:bg-gray-800 text-white font-bold uppercase py-1.5 md:py-2 text-xs transition-colors border-r border-gray-600 last:border-r-0 md:flex-1"
                  >
                    {size}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setStep("color")}
                className="bg-gray-800 hover:bg-gray-700 text-white font-bold uppercase py-1.5 md:py-2 text-xs transition-colors px-2 border-t border-gray-600"
              >
                ← Voltar
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-1 px-1 md:px-0">
        {/* Store Name */}
        <p className="text-xs text-gray-600 uppercase font-bold font-gotham-bold">{product.store}</p>
        
        {/* Product Name */}
        <Link href={`/produto/${product.id}`}>
          <h3 className="font-bold text-xs md:text-sm leading-tight uppercase text-black font-gotham-bold" style={{ 
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}>
            {product.name}
          </h3>
        </Link>
        
        {/* Rating */}
        <div className="flex items-center space-x-1">
          <span className="text-xs text-gray-600">★ {product.rating}</span>
          <span className="text-xs text-gray-500">({product.reviews})</span>
        </div>
        
        {/* Pricing */}
        <div className="flex items-center space-x-2">
          <span className="text-sm md:text-lg font-bold text-black font-gotham-black">R$ {product.price.toFixed(2).replace(".", ",")}</span>
          {product.originalPrice && (
            <span className="text-xs md:text-sm text-gray-500 line-through font-gotham-medium">
              R$ {product.originalPrice.toFixed(2).replace(".", ",")}
            </span>
          )}
        </div>
        
        {/* Payment Terms */}
        <div className="text-xs text-green-600 font-semibold font-gotham-bold">3X SEM JUROS</div>
        
        {/* Sales Count */}
        <div className="text-xs text-gray-500 font-medium font-gotham-medium">{product.sold} VENDIDOS</div>
      </div>
    </div>
  )
}
