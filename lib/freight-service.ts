// ✅ SERVICE PARA CÁLCULO DE FRETE
export interface FreightProduct {
  weight: number      // Peso em gramas
  length: number      // Comprimento em cm
  width: number       // Largura em cm
  height: number      // Altura em cm
  quantity: number    // Quantidade no carrinho
}

export interface FreightCompany {
  id: number
  name: string
  picture: string
}

export interface DeliveryRange {
  min: number
  max: number
}

export interface FreightOption {
  id: number
  name: string
  price: number
  custom_price: number
  discount: number
  currency: string
  delivery_time: number
  custom_delivery_time: number
  delivery_range: DeliveryRange
  custom_delivery_range: DeliveryRange
  company: FreightCompany
}

export interface FreightResponse {
  success: boolean
  message: string
  fromCep: string
  toCep: string
  freightOptions: FreightOption[]
}

export interface FreightRequest {
  toCep: string
  products: FreightProduct[]
}

class FreightService {
  private baseUrl = 'https://api.multiversoestudiocrm.com.br/api/public/freight'

  /**
   * Calcula o frete para os produtos do carrinho
   */
  async calculateFreight(cartItems: any[], customerCep: string): Promise<FreightResponse> {
    try {
      // Mapear produtos do carrinho para o formato esperado pela API
      const products = cartItems.map(item => ({
        weight: item.weight || 500,        // Peso padrão 500g se não informado
        length: item.length || 20,         // Comprimento padrão 20cm se não informado
        width: item.width || 15,           // Largura padrão 15cm se não informado
        height: item.height || 10,         // Altura padrão 10cm se não informado
        quantity: item.quantity            // Quantidade no carrinho
      }));

      const response = await fetch(`${this.baseUrl}/calculate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          toCep: customerCep.replace(/\D/g, ''), // Remove caracteres não numéricos
          products: products
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: FreightResponse = await response.json();
      
      // Validar e limpar os dados retornados pela API
      if (result.success && result.freightOptions) {
        result.freightOptions = result.freightOptions.map(option => {
          // Garantir que o preço seja sempre válido
          let validPrice = 0;
          if (typeof option.custom_price === 'number' && !isNaN(option.custom_price) && option.custom_price > 0) {
            validPrice = option.custom_price;
          } else if (typeof option.price === 'number' && !isNaN(option.price) && option.price > 0) {
            validPrice = option.price;
          } else {
            // Se ambos os preços forem inválidos, usar preço padrão baseado no nome
            validPrice = this.getDefaultPriceByName(option.name);
          }

          // Garantir que o prazo seja sempre válido
          let validDeliveryTime = 1;
          if (typeof option.custom_delivery_time === 'number' && !isNaN(option.custom_delivery_time) && option.custom_delivery_time > 0) {
            validDeliveryTime = option.custom_delivery_time;
          } else if (typeof option.delivery_time === 'number' && !isNaN(option.delivery_time) && option.delivery_time > 0) {
            validDeliveryTime = option.delivery_time;
          } else {
            // Se ambos os prazos forem inválidos, usar prazo padrão baseado no nome
            validDeliveryTime = this.getDefaultDeliveryTimeByName(option.name);
          }

          return {
            ...option,
            price: validPrice,
            custom_price: validPrice,
            delivery_time: validDeliveryTime,
            custom_delivery_time: validDeliveryTime
          };
        });

        // Filtrar apenas opções com preço válido
        result.freightOptions = result.freightOptions.filter(option => 
          option && 
          typeof option.price === 'number' && 
          !isNaN(option.price) && 
          option.price > 0 &&
          typeof option.delivery_time === 'number' && 
          !isNaN(option.delivery_time) && 
          option.delivery_time > 0
        );

        // Se não houver opções válidas após filtro, usar opções padrão
        if (result.freightOptions.length === 0) {
          console.warn('Nenhuma opção de frete válida encontrada, usando opções padrão');
          result.freightOptions = this.getDefaultFreightOptions();
        }
      }
      
      return result;

    } catch (error) {
      console.error('Erro ao calcular frete:', error);
      
      // Retornar frete padrão em caso de erro
      return {
        success: true,
        message: 'Erro ao calcular frete. Usando valores padrão.',
        fromCep: '01234-567',
        toCep: customerCep,
        freightOptions: this.getDefaultFreightOptions()
      };
    }
  }

  /**
   * Formata o tempo de entrega
   */
  formatDeliveryTime(deliveryTime: number): string {
    // Validar se o valor é um número válido
    if (!deliveryTime || isNaN(deliveryTime) || deliveryTime <= 0) {
      console.warn('Prazo de entrega inválido:', deliveryTime);
      return 'Prazo não informado';
    }
    
    if (deliveryTime === 1) {
      return '1 dia útil';
    } else if (deliveryTime <= 5) {
      return `${deliveryTime} dias úteis`;
    } else {
      return `${deliveryTime} dias úteis`;
    }
  }

  /**
   * Formata o preço do frete
   */
  formatFreightPrice(price: number): string {
    // Validar se o valor é um número válido
    if (!price || isNaN(price) || price < 0) {
      console.warn('Preço de frete inválido:', price);
      return 'R$ 0,00';
    }
    
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  }

  /**
   * Verifica se o frete é grátis baseado no valor do pedido
   */
  isFreeShipping(subtotal: number, freightPrice: number, minValue: number = 99.90): boolean {
    // Validar se os valores são números válidos
    if (typeof subtotal !== 'number' || isNaN(subtotal) || typeof freightPrice !== 'number' || isNaN(freightPrice)) {
      console.warn('Valores inválidos para verificação de frete grátis:', { subtotal, freightPrice });
      return false;
    }
    
    return subtotal >= minValue && freightPrice === 0;
  }

  /**
   * Valida se uma opção de frete é válida
   */
  isValidFreightOption(option: FreightOption): boolean {
    if (!option) return false;
    
    const price = option.custom_price || option.price;
    const deliveryTime = option.delivery_time || option.custom_delivery_time;
    
    return !!(
      typeof price === 'number' && 
      !isNaN(price) && 
      price > 0 &&
      typeof deliveryTime === 'number' && 
      !isNaN(deliveryTime) && 
      deliveryTime > 0 &&
      option.name && 
      typeof option.name === 'string'
    );
  }

  /**
   * Obtém o preço válido de uma opção de frete
   */
  getValidPrice(option: FreightOption): number {
    if (!this.isValidFreightOption(option)) {
      console.warn('Opção de frete inválida:', option);
      return this.getDefaultPriceByName(option?.name || '');
    }
    
    const price = option.custom_price || option.price;
    return typeof price === 'number' && !isNaN(price) && price > 0 ? price : this.getDefaultPriceByName(option.name);
  }

  /**
   * Obtém o prazo válido de uma opção de frete
   */
  getValidDeliveryTime(option: FreightOption): number {
    if (!this.isValidFreightOption(option)) {
      console.warn('Opção de frete inválida:', option);
      return this.getDefaultDeliveryTimeByName(option?.name || '');
    }
    
    const deliveryTime = option.delivery_time || option.custom_delivery_time;
    return typeof deliveryTime === 'number' && !isNaN(deliveryTime) && deliveryTime > 0 ? deliveryTime : this.getDefaultDeliveryTimeByName(option.name);
  }

  /**
   * Retorna preço padrão baseado no nome do serviço de frete
   */
  private getDefaultPriceByName(serviceName: string): number {
    const name = serviceName?.toLowerCase() || '';
    
    if (name.includes('sedex') || name.includes('express')) {
      return 29.90;
    } else if (name.includes('pac') || name.includes('econômico')) {
      return 15.90;
    } else if (name.includes('mini') || name.includes('pequeno')) {
      return 12.90;
    } else if (name.includes('package') || name.includes('com')) {
      return 18.90;
    } else {
      return 19.90; // Preço padrão para serviços desconhecidos
    }
  }

  /**
   * Retorna prazo padrão baseado no nome do serviço de frete
   */
  private getDefaultDeliveryTimeByName(serviceName: string): number {
    const name = serviceName?.toLowerCase() || '';
    
    if (name.includes('sedex') || name.includes('express')) {
      return 3;
    } else if (name.includes('pac') || name.includes('econômico')) {
      return 15;
    } else if (name.includes('mini') || name.includes('pequeno')) {
      return 8;
    } else if (name.includes('package') || name.includes('com')) {
      return 12;
    } else {
      return 10; // Prazo padrão para serviços desconhecidos
    }
  }

  /**
   * Retorna opções de frete padrão
   */
  private getDefaultFreightOptions(): FreightOption[] {
    return [
      {
        id: 1,
        name: 'PAC',
        price: 15.90,
        custom_price: 15.90,
        discount: 0,
        currency: 'BRL',
        delivery_time: 15,
        custom_delivery_time: 15,
        delivery_range: { min: 12, max: 18 },
        custom_delivery_range: { min: 12, max: 18 },
        company: {
          id: 1,
          name: 'Correios',
          picture: ''
        }
      },
      {
        id: 2,
        name: 'SEDEX',
        price: 29.90,
        custom_price: 29.90,
        discount: 0,
        currency: 'BRL',
        delivery_time: 3,
        custom_delivery_time: 3,
        delivery_range: { min: 2, max: 4 },
        custom_delivery_range: { min: 2, max: 4 },
        company: {
          id: 1,
          name: 'Correios',
          picture: ''
        }
      }
    ];
  }
}

export const freightService = new FreightService();
