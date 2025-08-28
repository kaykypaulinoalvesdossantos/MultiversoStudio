// Service para produtos em alta (latest products)
import { crmService } from './crm-service';

// Tipos específicos para produtos em alta
export interface LatestProduct {
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
  };
  variants: ProductVariant[];
  salesCount: number;
  isTrending: boolean;
}

export interface ProductVariant {
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
}

export interface LatestProductsResponse {
  products: LatestProduct[];
  total: number;
  activeCount: number;
  inactiveCount: number;
}

export interface ProductSelectionState {
  selectedVariant?: ProductVariant;
  selectedColor?: string;
  selectedSize?: string;
  quantity: number;
}

class LatestProductsService {
  private baseURL: string;

  constructor() {
    this.baseURL = process.env.CRM_API_URL || '';
    
    if (!this.baseURL) {
      console.warn('CRM_API_URL não configurada no arquivo .env');
    }
  }

  // Buscar produtos em alta
  async getLatestProducts(limit: number = 10): Promise<LatestProductsResponse> {
    try {
      const response = await fetch(`${this.baseURL}/api/products/latest/latest-products?limit=${limit}`);
      
      if (!response.ok) {
        throw new Error(`Erro na API: ${response.status} ${response.statusText}`);
      }

      const data: LatestProductsResponse = await response.json();
      return data;
    } catch (error) {
      console.error('Erro ao buscar produtos em alta:', error);
      throw error;
    }
  }

  // Analisar complexidade do produto para determinar fluxo de compra
  analyzeProductComplexity(product: LatestProduct): {
    hasVariants: boolean;
    variantCount: number;
    hasColors: boolean;
    hasSizes: boolean;
    complexity: 'simple' | 'variant' | 'complex';
  } {
    const hasVariants = product.variants && product.variants.length > 0;
    const variantCount = hasVariants ? product.variants.length : 0;
    
    let hasColors = false;
    let hasSizes = false;
    
    if (hasVariants) {
      hasColors = product.variants.some(v => v.colors && v.colors.length > 0);
      hasSizes = product.variants.some(v => v.hasSizes && v.sizes && v.sizes.length > 0);
    }

    let complexity: 'simple' | 'variant' | 'complex' = 'simple';
    
    if (hasVariants) {
      if (variantCount <= 2 && !hasColors && !hasSizes) {
        complexity = 'variant';
      } else {
        complexity = 'complex';
      }
    }

    return {
      hasVariants,
      variantCount,
      hasColors,
      hasSizes,
      complexity
    };
  }

  // Determinar se deve abrir modal ou fazer seleção direta
  shouldOpenModal(product: LatestProduct): boolean {
    const complexity = this.analyzeProductComplexity(product);
    return complexity.complexity === 'complex';
  }

  // Preparar dados para o modal quick-buy
  prepareProductForModal(product: LatestProduct) {
    return {
      id: product.id,
      name: product.name,
      image: product.mainImage || '/placeholder.svg',
      price: parseFloat(product.price),
      originalPrice: undefined, // Pode ser ajustado se necessário
      store: product.store.name,
      badge: product.isTrending ? 'EM ALTA' : undefined,
      discount: undefined, // Pode ser calculado se necessário
      freeShipping: false, // Pode ser verificado se necessário
      variants: product.variants,
      category: product.category.name
    };
  }

  // Adicionar produto ao carrinho baseado na complexidade
  async addProductToCart(
    product: LatestProduct, 
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
    product: LatestProduct,
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
export const latestProductsService = new LatestProductsService();

// Exportar também a classe para uso direto se necessário
export default LatestProductsService;
