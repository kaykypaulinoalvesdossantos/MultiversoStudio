// Service para produtos exclusivos do Multiverso
import { crmService } from './crm-service';

// Tipos específicos para produtos exclusivos do Multiverso
export interface MultiversoExclusiveProduct {
  id: string;
  storeId: string;
  name: string;
  description: string;
  price: string;
  stock: number;
  unlimited: boolean;
  status: string;
  mainImage: string;
  mainImageId: string | null;
  images: string[];
  imageIds: string[];
  categoryId: string;
  category: {
    id: string;
    name: string;
    description: string;
    image: string;
    imageId: string;
    isActive: boolean;
    parentId: string | null;
    level: number;
    path: string;
    createdAt: string;
    updatedAt: string;
  };
  store: {
    id: string;
    name: string;
    subdomain: string;
    cnpj: string;
    commissionPct: number;
    paymentDay: number;
    status: string;
    artistId: string;
    createdAt: string;
    updatedAt: string;
  };
  variants: MultiversoProductVariant[];
  productImages: string[];
  blingData: any;
  formattedPrice: string;
  formattedWeight: string | null;
  formattedPesoBruto: string | null;
  statusText: string;
  tipoText: string;
  hasBlingIntegration: boolean;
  _count: {
    orderItems: number;
  };
  salesCount: number;
  isTrending: boolean;
}

export interface MultiversoProductVariant {
  id: string;
  productId: string;
  name: string;
  type: string;
  description: string | null;
  colors: string[];
  sizes: string[];
  hasSizes: boolean;
  priceAdjustment: number | null;
  stock: number | null;
  isActive: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
  combinations: MultiversoProductCombination[];
}

export interface MultiversoProductCombination {
  id: string;
  variantId: string;
  color: string;
  size: string | null;
  mainImage: string | null;
  images: string[];
  stock: number;
  priceAdjustment: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface MultiversoExclusiveProductsResponse {
  store: {
    id: string;
    name: string;
    subdomain: string;
    status: string;
  };
  products: MultiversoExclusiveProduct[];
  total: number;
  message: string;
}

export interface ProductSelectionState {
  selectedVariant?: MultiversoProductVariant;
  selectedColor?: string;
  selectedSize?: string;
  quantity: number;
}

class MultiversoExclusiveProductsService {
  private baseURL: string;

  constructor() {
    this.baseURL = process.env.CRM_API_URL || 'https://api.multiversoestudiocrm.com.br';
    
    if (!this.baseURL) {
      console.warn('CRM_API_URL não configurada no arquivo .env');
    }
  }

  // Buscar produtos exclusivos do Multiverso
  async getMultiversoExclusiveProducts(): Promise<MultiversoExclusiveProductsResponse> {
    try {
      console.log('🔄 Iniciando busca de produtos exclusivos Multiverso...');
      
      const response = await fetch(`${this.baseURL}/api/public/products/main-store`);
      
      if (!response.ok) {
        throw new Error(`Erro na API: ${response.status} ${response.statusText}`);
      }

      const data: MultiversoExclusiveProductsResponse = await response.json();
      console.log('✅ Produtos exclusivos recebidos:', data.products.length);
      
      return data;
    } catch (error) {
      console.error('❌ Erro ao buscar produtos exclusivos Multiverso:', error);
      throw error;
    }
  }

  // Analisar complexidade do produto para determinar fluxo de compra
  analyzeProductComplexity(product: MultiversoExclusiveProduct): {
    hasVariants: boolean;
    variantCount: number;
    hasColors: boolean;
    hasSizes: boolean;
    totalOptionTypes: number;
    complexity: 'simple' | 'variant' | 'complex';
  } {
    const hasVariants = product.variants && product.variants.length > 0;
    const variantCount = hasVariants ? product.variants.length : 0;
    
    let hasColors = false;
    let hasSizes = false;
    let totalOptionTypes = 0;
    
    if (hasVariants) {
      hasColors = product.variants.some(v => v.colors && v.colors.length > 0);
      hasSizes = product.variants.some(v => v.hasSizes && v.sizes && v.sizes.length > 0);
      
      // Calcular tipos de opções (variante, cores, tamanhos)
      totalOptionTypes = 1; // Sempre conta a variante
      if (hasColors) totalOptionTypes++;
      if (hasSizes) totalOptionTypes++;
    }

    let complexity: 'simple' | 'variant' | 'complex' = 'simple';
    
    if (hasVariants) {
      if (totalOptionTypes <= 2) {
        complexity = 'variant'; // Seleção inline
      } else {
        complexity = 'complex'; // Abrir modal
      }
    }

    console.log(`📦 Complexidade do produto ${product.name}:`, {
      hasVariants,
      variantCount,
      hasColors,
      hasSizes,
      totalOptionTypes,
      complexity
    });

    return {
      hasVariants,
      variantCount,
      hasColors,
      hasSizes,
      totalOptionTypes,
      complexity
    };
  }

  // Determinar se deve abrir modal ou fazer seleção direta
  shouldOpenModal(product: MultiversoExclusiveProduct): boolean {
    const complexity = this.analyzeProductComplexity(product);
    return complexity.complexity === 'complex';
  }

  // Preparar dados para o modal quick-buy
  prepareProductForModal(product: MultiversoExclusiveProduct) {
    return {
      id: product.id,
      name: product.name,
      image: product.mainImage || '/placeholder.svg',
      price: parseFloat(product.price),
      originalPrice: undefined,
      store: product.store.name,
      badge: 'Multiverso Original',
      discount: undefined,
      freeShipping: false,
      variants: product.variants,
      category: product.category.name
    };
  }

  // Mapear produto para o formato do ProductCard
  mapProductForCard(product: MultiversoExclusiveProduct) {
    const variants = product.variants || [];
    const hasVariants = variants.length > 0;
    
    // Mapear tipos, cores e tamanhos das variações
    let types: Array<{id: string, name: string, price: number, originalPrice?: number}> = [];
    let colors: Array<{name: string, value: string, image: string}> = [];
    let sizes: string[] = [];
    
    if (hasVariants) {
      variants.forEach((variant) => {
        if (variant.name && variant.type) {
          types.push({
            id: variant.id,
            name: variant.name,
            price: parseFloat(product.price) || 0,
            originalPrice: 0
          });
        }
        if (variant.colors && Array.isArray(variant.colors)) {
          variant.colors.forEach(color => {
            colors.push({
              name: color,
              value: color.toLowerCase(),
              image: product.mainImage || "/placeholder.jpg"
            });
          });
        }
        if (variant.sizes && Array.isArray(variant.sizes)) {
          sizes = [...sizes, ...variant.sizes];
        }
      });
    }
    
    // Remover duplicatas
    types = types.filter((type, index, self) => 
      index === self.findIndex(t => t.name === type.name)
    );
    colors = colors.filter((color, index, self) => 
      index === self.findIndex(c => c.name === color.name)
    );
    sizes = [...new Set(sizes)];
    
    return {
      id: product.id,
      name: product.name,
      description: product.description,
      price: parseFloat(product.price) || 0,
      originalPrice: 0,
      image: product.mainImage || "/placeholder.jpg",
      badge: "Multiverso Original",
      store: product.store?.name || "Multiverso Estúdios",
      rating: 5,
      reviews: 0,
      sold: 0,
      // Dados para o ProductCard
      types: types.length > 0 ? types : undefined,
      colors: colors.length > 0 ? colors : undefined,
      sizes: sizes.length > 0 ? sizes : undefined,
      // Dados originais para debug
      _originalProduct: product
    };
  }

  // Adicionar produto ao carrinho
  async addProductToCart(
    product: MultiversoExclusiveProduct, 
    selection: ProductSelectionState
  ): Promise<boolean> {
    try {
      const cartItem = {
        id: `${Date.now()}-${Math.random()}`,
        productId: product.id,
        name: product.name,
        price: parseFloat(product.price),
        image: product.mainImage || '/placeholder.svg',
        store: product.store.name,
        category: product.category.name,
        variant: selection.selectedVariant?.name || 'Padrão',
        color: selection.selectedColor || 'Padrão',
        size: selection.selectedSize || 'Padrão',
        quantity: selection.quantity,
        addedAt: new Date().toISOString()
      };

      // Buscar carrinho existente
      const existingCart = localStorage.getItem('multiverso-cart');
      let cartItems = existingCart ? JSON.parse(existingCart) : [];

      // Verificar se o item já existe
      const existingItemIndex = cartItems.findIndex((item: any) => 
        item.productId === product.id &&
        item.variant === cartItem.variant &&
        item.color === cartItem.color &&
        item.size === cartItem.size
      );

      if (existingItemIndex >= 0) {
        // Se já existe, aumenta a quantidade
        cartItems[existingItemIndex].quantity += selection.quantity;
      } else {
        // Se não existe, adiciona novo item
        cartItems.push(cartItem);
      }

      // Salvar no localStorage
      localStorage.setItem('multiverso-cart', JSON.stringify(cartItems));
      
      return true;
    } catch (error) {
      console.error('Erro ao adicionar produto ao carrinho:', error);
      return false;
    }
  }

  // Processar seleção de produto baseado na complexidade
  async processProductSelection(
    product: MultiversoExclusiveProduct,
    selection: ProductSelectionState
  ): Promise<{
    success: boolean;
    shouldOpenModal: boolean;
    message: string;
  }> {
    const complexity = this.analyzeProductComplexity(product);
    
    // Se é complexo, deve abrir modal
    if (complexity.complexity === 'complex') {
      return {
        success: false,
        shouldOpenModal: true,
        message: 'Produto com muitas opções - abrindo modal de configuração'
      };
    }

    // Se é simples, adiciona direto ao carrinho
    if (complexity.complexity === 'simple') {
      const success = await this.addProductToCart(product, selection);
      return {
        success,
        shouldOpenModal: false,
        message: success ? 'Produto adicionado ao carrinho!' : 'Erro ao adicionar produto'
      };
    }

    // Se tem variações simples (≤2), processa seleção
    if (complexity.complexity === 'variant') {
      // Validar se todas as opções foram selecionadas
      if (!selection.selectedVariant) {
        return {
          success: false,
          shouldOpenModal: false,
          message: 'Selecione uma variação'
        };
      }

      const success = await this.addProductToCart(product, selection);
      return {
        success,
        shouldOpenModal: false,
        message: success ? 'Produto adicionado ao carrinho!' : 'Erro ao adicionar produto'
      };
    }

    return {
      success: false,
      shouldOpenModal: false,
      message: 'Erro ao processar seleção'
    };
  }
}

// Instância única do service
export const multiversoExclusiveProductsService = new MultiversoExclusiveProductsService();

// Exportar também a classe para uso direto se necessário
export default MultiversoExclusiveProductsService;
