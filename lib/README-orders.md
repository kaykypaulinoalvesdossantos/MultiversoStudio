# 🛒 Sistema de Pedidos - Order Service

## 📋 Visão Geral

O **OrderService** é responsável por gerenciar todo o fluxo de criação e finalização de pedidos, incluindo integração com a API de pedidos e redirecionamento para pagamento via Stripe.

## 🚀 Funcionalidades Principais

### ✅ Criação de Pedidos
- Validação completa dos dados antes do envio
- Integração com API `/api/public/orders/create`
- Tratamento de erros específicos
- Redirecionamento automático para pagamento

### 💳 Processamento de Pagamento
- Geração automática de link do Stripe
- Abertura em nova aba para pagamento
- Validação de status de pagamento
- Tratamento de falhas

### 🛡️ Validações de Segurança
- Verificação de token de usuário
- Validação de endereço completo
- Verificação de produtos no carrinho
- Cálculo correto de valores

## 🔧 Como Usar

### 1. Importar o Serviço

```typescript
import { orderService } from '@/lib'
import type { OrderData } from '@/lib/order-service'
```

### 2. Preparar Dados do Pedido

```typescript
const orderData: OrderData = {
  customerToken: localStorage.getItem('customerToken') || '',
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
}
```

### 3. Processar Pagamento

```typescript
try {
  const result = await orderService.processPayment(orderData);
  
  if (result.success && result.paymentLink) {
    // ✅ Sucesso! Abrir link de pagamento
    orderService.openPaymentLink(result.paymentLink);
  } else {
    // ❌ Erro no processamento
    console.error('Erro:', result.error);
  }
} catch (error) {
  // Tratar erro específico
  const errorInfo = orderService.handleOrderError(error);
  console.error('Erro:', errorInfo.message);
}
```

## 📊 Estrutura de Dados

### OrderData Interface

```typescript
interface OrderData {
  customerToken: string;           // Token JWT do usuário
  shippingAddress: ShippingAddress; // Endereço de entrega
  items: OrderItem[];              // Produtos do carrinho
  subtotal: number;                // Soma dos produtos
  shipping: number;                // Valor do frete
  discount?: number;               // Desconto (opcional)
  total: number;                   // Total final
  selectedFreightOption: string;   // Nome da opção de frete
  freightPrice: number;            // Preço do frete
  deliveryDays: number;            // Dias para entrega
  paymentMethod: string;           // Método de pagamento
  notes?: string;                  // Observações (opcional)
  couponCode?: string;             // Código do cupom (opcional)
}
```

### ShippingAddress Interface

```typescript
interface ShippingAddress {
  street: string;        // Rua
  number: string;        // Número
  complement?: string;   // Complemento (opcional)
  neighborhood: string;  // Bairro
  city: string;          // Cidade
  state: string;         // Estado
  zipCode: string;       // CEP
  country?: string;      // País (opcional, padrão: Brasil)
}
```

### OrderItem Interface

```typescript
interface OrderItem {
  productId: string;     // ID do produto
  quantity: number;      // Quantidade
  price: number;         // Preço unitário
  total: number;         // Total do item
}
```

## 🔄 Fluxo de Funcionamento

### 1. Validação de Dados
```typescript
const validation = orderService.validateOrderData(orderData);
if (!validation.isValid) {
  console.error('Erros:', validation.errors);
  return;
}
```

### 2. Criação do Pedido
```typescript
const orderResult = await orderService.createOrder(orderData);
```

### 3. Processamento do Pagamento
```typescript
const paymentResult = await orderService.processPayment(orderData);
```

### 4. Redirecionamento
```typescript
if (paymentResult.success && paymentResult.paymentLink) {
  orderService.openPaymentLink(paymentResult.paymentLink);
}
```

## 🚨 Tratamento de Erros

### Erros Comuns

| Status | Descrição | Ação |
|--------|-----------|------|
| 401 | Usuário não autenticado | Redirecionar para login |
| 400 | Dados inválidos | Mostrar erro específico |
| 500 | Erro interno | Tentar novamente |

### Exemplo de Tratamento

```typescript
try {
  await orderService.processPayment(orderData);
} catch (error) {
  const errorInfo = orderService.handleOrderError(error);
  
  if (errorInfo.shouldRedirect) {
    router.push(errorInfo.redirectUrl);
  } else {
    alert(errorInfo.message);
  }
}
```

## 📱 Integração com React

### Hook Personalizado

```typescript
import { useState } from 'react';
import { orderService } from '@/lib';

export function useOrderProcessing() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const processOrder = async (orderData: OrderData) => {
    setIsProcessing(true);
    setError(null);
    
    try {
      const result = await orderService.processPayment(orderData);
      
      if (result.success && result.paymentLink) {
        orderService.openPaymentLink(result.paymentLink);
        return { success: true };
      } else {
        setError(result.error || 'Erro desconhecido');
        return { success: false, error: result.error };
      }
    } catch (error) {
      const errorInfo = orderService.handleOrderError(error);
      setError(errorInfo.message);
      return { success: false, error: errorInfo.message };
    } finally {
      setIsProcessing(false);
    }
  };

  return { processOrder, isProcessing, error };
}
```

### Uso no Componente

```typescript
function CheckoutPage() {
  const { processOrder, isProcessing, error } = useOrderProcessing();
  
  const handleCheckout = async () => {
    const result = await processOrder(orderData);
    
    if (result.success) {
      // Redirecionar para sucesso
      router.push('/checkout/sucesso');
    }
  };
  
  return (
    <div>
      {error && <div className="error">{error}</div>}
      <button 
        onClick={handleCheckout} 
        disabled={isProcessing}
      >
        {isProcessing ? 'Processando...' : 'Finalizar Compra'}
      </button>
    </div>
  );
}
```

## 🔗 Endpoints da API

### POST /api/public/orders/create

**Headers:**
```json
{
  "Content-Type": "application/json"
}
```

**Body:**
```json
{
  "customerToken": "jwt-token",
  "shippingAddress": { ... },
  "items": [ ... ],
  "subtotal": 100.00,
  "shipping": 15.00,
  "total": 115.00,
  "selectedFreightOption": "PAC",
  "freightPrice": 15.00,
  "deliveryDays": 5,
  "paymentMethod": "pix"
}
```

**Resposta:**
```json
{
  "success": true,
  "message": "Pedido criado com sucesso",
  "order": { ... },
  "payment": {
    "link": "https://checkout.stripe.com/...",
    "sessionId": "cs_...",
    "status": "READY",
    "message": "Link de pagamento gerado"
  }
}
```

## 🧪 Testes e Exemplos

Veja o arquivo `lib/examples/order-usage.ts` para exemplos completos de uso:

- Finalização básica de pedido
- Validação de dados
- Tratamento de erros
- Fluxo completo de checkout
- Uso em componentes React

## ⚠️ Considerações Importantes

### Segurança
- Sempre validar dados antes do envio
- Verificar token de autenticação
- Não expor informações sensíveis

### Performance
- Usar loading states durante processamento
- Tratar timeouts de API
- Implementar retry logic para falhas

### UX
- Mostrar feedback claro para o usuário
- Explicar próximos passos
- Tratar erros de forma amigável

## 🔄 Atualizações e Manutenção

### Versionamento
- Mantenha compatibilidade com versões anteriores
- Documente mudanças na API
- Teste integrações após atualizações

### Monitoramento
- Log de erros e sucessos
- Métricas de performance
- Alertas para falhas críticas

---

**Desenvolvido para Multiverso Estúdios** 🚀
