// ✅ EXEMPLOS DE USO DO ORDER SERVICE

import { orderService } from '../order-service'
import type { OrderData } from '../order-service'

/**
 * Exemplo 1: Finalizar pedido básico
 */
export async function exemploFinalizarPedidoBasico() {
  const orderData: OrderData = {
    customerToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    shippingAddress: {
      street: "Rua das Flores",
      number: "123",
      complement: "Apto 45",
      neighborhood: "Centro",
      city: "São Paulo",
      state: "SP",
      zipCode: "01234-567"
    },
    items: [
      {
        productId: "uuid-produto-1",
        quantity: 2,
        price: 50.00,
        total: 100.00
      }
    ],
    subtotal: 100.00,
    shipping: 15.00,
    total: 115.00,
    selectedFreightOption: "PAC",
    freightPrice: 15.00,
    deliveryDays: 5,
    paymentMethod: "pix",
    notes: "Entregar após às 18h"
  };

  try {
    const result = await orderService.processPayment(orderData);
    
    if (result.success && result.paymentLink) {
      console.log('✅ Pagamento processado com sucesso!');
      orderService.openPaymentLink(result.paymentLink);
    } else {
      console.error('❌ Erro:', result.error);
    }
  } catch (error) {
    console.error('Erro ao finalizar pedido:', error);
  }
}

/**
 * Exemplo 2: Validação de dados antes do envio
 */
export function exemploValidarDados() {
  const orderData: OrderData = {
    customerToken: "",
    shippingAddress: {
      street: "",
      number: "",
      neighborhood: "",
      city: "",
      state: "",
      zipCode: ""
    },
    items: [],
    subtotal: 0,
    shipping: 0,
    total: 0,
    selectedFreightOption: "",
    freightPrice: 0,
    deliveryDays: 0,
    paymentMethod: ""
  };

  const validation = orderService.validateOrderData(orderData);
  
  if (!validation.isValid) {
    console.log('❌ Dados inválidos:', validation.errors);
    return false;
  }
  
  console.log('✅ Dados válidos!');
  return true;
}

/**
 * Exemplo 3: Tratamento de erros específicos
 */
export function exemploTratarErros() {
  const error = {
    status: 401,
    message: 'Usuário não autenticado'
  };

  const errorInfo = orderService.handleOrderError(error);
  
  if (errorInfo.shouldRedirect) {
    console.log('🔄 Redirecionando para:', errorInfo.redirectUrl);
    // window.location.href = errorInfo.redirectUrl;
  } else {
    console.log('❌ Erro:', errorInfo.message);
  }
}

/**
 * Exemplo 4: Fluxo completo de checkout
 */
export async function exemploFluxoCompletoCheckout() {
  console.log('🚀 Iniciando fluxo de checkout...');
  
  // 1. Validar dados
  const orderData: OrderData = {
    customerToken: "token-do-usuario",
    shippingAddress: {
      street: "Rua Exemplo",
      number: "123",
      neighborhood: "Bairro",
      city: "Cidade",
      state: "SP",
      zipCode: "01234-567"
    },
    items: [
      {
        productId: "produto-1",
        quantity: 1,
        price: 100.00,
        total: 100.00
      }
    ],
    subtotal: 100.00,
    shipping: 15.00,
    total: 115.00,
    selectedFreightOption: "PAC",
    freightPrice: 15.00,
    deliveryDays: 5,
    paymentMethod: "pix"
  };

  // 2. Processar pagamento
  const result = await orderService.processPayment(orderData);
  
  if (result.success && result.paymentLink) {
    console.log('✅ Pedido criado! Abrindo link de pagamento...');
    orderService.openPaymentLink(result.paymentLink);
    return true;
  } else {
    console.error('❌ Falha no processamento:', result.error);
    return false;
  }
}

/**
 * Exemplo 5: Uso em componente React
 */
export function exemploUsoReact() {
  return {
    // Função para finalizar pedido
    finalizarPedido: async (orderData: OrderData) => {
      try {
        const result = await orderService.processPayment(orderData);
        
        if (result.success && result.paymentLink) {
          // Sucesso - abrir pagamento
          orderService.openPaymentLink(result.paymentLink);
          return { success: true, message: 'Pedido criado com sucesso!' };
        } else {
          // Erro no processamento
          return { success: false, message: result.error || 'Erro desconhecido' };
        }
      } catch (error) {
        // Tratar erro específico
        const errorInfo = orderService.handleOrderError(error);
        return { 
          success: false, 
          message: errorInfo.message,
          shouldRedirect: errorInfo.shouldRedirect,
          redirectUrl: errorInfo.redirectUrl
        };
      }
    }
  };
}
