// ✅ SERVICE PARA CRIAÇÃO E FINALIZAÇÃO DE PEDIDOS
export interface ShippingAddress {
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
  country?: string;
}

export interface OrderItem {
  productId: string;
  quantity: number;
  price: number;
  total: number;
}

export interface OrderData {
  customerToken: string;
  shippingAddress: ShippingAddress;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  discount?: number;
  total: number;
  selectedFreightOption: string;
  freightPrice: number;
  deliveryDays: number;
  paymentMethod: string;
  notes?: string;
  couponCode?: string;
}

export interface OrderItemResponse {
  id: string;
  productId: string;
  quantity: number;
  price: number;
  total: number;
  product: {
    id: string;
    name: string;
    price: number;
  };
}

export interface OrderResponse {
  success: boolean;
  message: string;
  order: {
    id: string;
    customerId: string;
    storeId: string;
    status: "PENDING";
    subtotal: number;
    shipping: number;
    discount: number;
    total: number;
    deliveryDays: number;
    paymentMethod: string;
    notes: string;
    createdAt: string;
    blingOrderId?: string;
    items: OrderItemResponse[];
    shippingAddress: {
      street: string;
      city: string;
      state: string;
      zipCode: string;
    };
  };
  payment: {
    link: string;
    sessionId: string;
    status: "READY" | "FAILED";
    message: string;
  };
}

class OrderService {
  private baseUrl = 'http://localhost:5010/api/public/orders';

  /**
   * Cria um novo pedido no sistema
   */
  async createOrder(orderData: OrderData): Promise<OrderResponse> {
    try {
      // Log dos dados sendo enviados para debug
      console.log('🚀 Enviando dados para API:', {
        url: `${this.baseUrl}/create`,
        customerToken: orderData.customerToken ? '✅ Presente' : '❌ Ausente',
        itemsCount: orderData.items?.length || 0,
        items: orderData.items?.map(item => ({
          productId: item.productId,
          quantity: item.quantity,
          price: item.price,
          total: item.total
        })),
        shippingAddress: orderData.shippingAddress,
        totals: {
          subtotal: orderData.subtotal,
          shipping: orderData.shipping,
          total: orderData.total
        }
      });

      const response = await fetch(`${this.baseUrl}/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('❌ Erro da API:', {
          status: response.status,
          statusText: response.statusText,
          errorData
        });
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const result: OrderResponse = await response.json();
      console.log('✅ Resposta da API:', result);
      return result;

    } catch (error) {
      console.error('❌ Erro ao criar pedido:', error);
      throw error;
    }
  }

  /**
   * Valida os dados do pedido antes de enviar
   */
  validateOrderData(data: OrderData): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    console.log('🔍 Validando dados do pedido:', data);

    // Validar token
    if (!data.customerToken) {
      errors.push('Usuário não autenticado');
    }

    // Validar endereço
    if (!data.shippingAddress.street || !data.shippingAddress.number) {
      errors.push('Endereço incompleto');
    }

    // Validar produtos
    if (!data.items || data.items.length === 0) {
      errors.push('Carrinho vazio');
    } else {
      // Validar cada item individualmente
      data.items.forEach((item, index) => {
        if (!item.productId || item.productId.trim() === '') {
          errors.push(`Item ${index + 1}: ID do produto inválido`);
        } else if (!item.productId.includes('-')) {
          // Verificar se parece ser um UUID válido (contém hífens)
          console.warn(`⚠️ Item ${index + 1}: productId pode não ser um UUID válido:`, item.productId);
        }
        if (!item.quantity || item.quantity <= 0) {
          errors.push(`Item ${index + 1}: Quantidade inválida`);
        }
        if (!item.price || item.price <= 0) {
          errors.push(`Item ${index + 1}: Preço inválido`);
        }
        if (!item.total || item.total <= 0) {
          errors.push(`Item ${index + 1}: Total inválido`);
        }
      });
    }

    // Validar valores
    const calculatedTotal = data.subtotal + data.shipping - (data.discount || 0);
    if (Math.abs(data.total - calculatedTotal) > 0.01) {
      errors.push(`Valores incorretos: subtotal(${data.subtotal}) + frete(${data.shipping}) = ${calculatedTotal}, mas total é ${data.total}`);
    }

    // Validar frete
    if (!data.selectedFreightOption || data.freightPrice <= 0) {
      errors.push('Frete não selecionado');
    }

    // Validar método de pagamento
    if (!data.paymentMethod) {
      errors.push('Método de pagamento não selecionado');
    }

    if (errors.length > 0) {
      console.error('❌ Erros de validação:', errors);
    } else {
      console.log('✅ Dados validados com sucesso');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  /**
   * Processa o pagamento redirecionando para o Stripe
   */
  async processPayment(orderData: OrderData): Promise<{ success: boolean; paymentLink?: string; error?: string }> {
    try {
      // 1. Validar dados
      const validation = this.validateOrderData(orderData);
      if (!validation.isValid) {
        return {
          success: false,
          error: validation.errors.join(', ')
        };
      }

      // 2. Criar pedido
      const orderResult = await this.createOrder(orderData);

      if (!orderResult.success) {
        return {
          success: false,
          error: orderResult.message
        };
      }

      // 3. Verificar link de pagamento
      if (orderResult.payment.link && orderResult.payment.status === 'READY') {
        return {
          success: true,
          paymentLink: orderResult.payment.link
        };
      } else {
        return {
          success: false,
          error: 'Erro ao gerar link de pagamento: ' + orderResult.payment.message
        };
      }

    } catch (error) {
      console.error('Erro ao processar pagamento:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Erro desconhecido'
      };
    }
  }

  /**
   * Abre o link de pagamento em nova aba
   */
  openPaymentLink(paymentLink: string): void {
    if (typeof window !== 'undefined') {
      window.open(paymentLink, '_blank');
    }
  }

  /**
   * Trata erros específicos da API
   */
  handleOrderError(error: any): { shouldRedirect: boolean; redirectUrl?: string; message: string } {
    if (error.status === 401 || error.message?.includes('não autenticado')) {
      return {
        shouldRedirect: true,
        redirectUrl: '/login',
        message: 'Sessão expirada. Faça login novamente.'
      };
    } else if (error.status === 400 || error.message?.includes('Dados inválidos')) {
      return {
        shouldRedirect: false,
        message: 'Dados inválidos: ' + error.message
      };
    } else if (error.status === 500 || error.message?.includes('Erro interno')) {
      return {
        shouldRedirect: false,
        message: 'Erro interno. Tente novamente.'
      };
    } else {
      return {
        shouldRedirect: false,
        message: error.message || 'Erro desconhecido'
      };
    }
  }
}

export const orderService = new OrderService();
