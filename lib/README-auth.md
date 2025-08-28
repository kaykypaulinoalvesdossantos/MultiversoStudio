# 🔐 Auth Service - Autenticação de Clientes com JWT

## 📋 Visão Geral

O `AuthService` é um service completo para gerenciar autenticação de clientes na plataforma Multiverso E-commerce. Ele oferece funcionalidades de registro, login, recuperação de senha e gerenciamento de sessão com **tokens JWT**.

## 🚀 Funcionalidades

### ✅ Registro de Cliente
- Validação completa de dados
- Integração com API `POST /api/public/customers/register`
- **Geração automática de token JWT**
- Armazenamento automático de token e dados do cliente

### ✅ Login de Cliente
- Validação de credenciais
- Integração com API `POST /api/public/customers/login`
- **Geração automática de token JWT**
- Gerenciamento automático de sessão

### ✅ Recuperação de Senha
- Validação de e-mail
- Integração com API `POST /api/public/customers/forgot-password`

### ✅ **NOVO: Requisições Autenticadas**
- Função `authenticatedRequest()` para APIs protegidas
- Headers automáticos com `Authorization: Bearer {token}`
- Exemplo: `finalizeOrder()` para finalizar pedidos

### ✅ Validações
- **E-mail**: Formato válido
- **CPF**: Validação brasileira com dígitos verificadores
- **Telefone**: Formato brasileiro (10-11 dígitos)
- **CEP**: Formato brasileiro (8 dígitos)
- **Senha**: Mínimo 6 caracteres

### ✅ Gerenciamento de Sessão JWT
- Verificação de status de login
- Obtenção de dados do cliente atual
- **Gerenciamento de token JWT** (`customerToken`)
- Logout seguro

## 📡 Endpoints da API

| Método | Endpoint | Descrição |
|--------|----------|------------|
| `POST` | `/api/public/customers/register` | Registrar novo cliente |
| `POST` | `/api/public/customers/login` | Login de cliente |
| `POST` | `/api/public/customers/forgot-password` | Recuperar senha |

## 🔐 Estrutura do Token JWT

```json
{
  "sub": "customer_123",        // ID do customer
  "email": "joao@email.com",    // Email do customer
  "role": "CUSTOMER",           // Role específico para customers
  "customerId": "customer_123", // ID do customer (duplicado para compatibilidade)
  "storeId": "store_123"        // ID da loja (se aplicável)
}
```

## 📝 Estrutura de Resposta Atualizada

```typescript
interface AuthResponse {
  success: boolean
  message: string
  access_token?: string        // ✅ NOVO: Token JWT
  customer?: any
  stats?: any                  // ✅ NOVO: Estatísticas do cliente
  error?: string
}
```

## 🛠️ Como Usar

### 1. Importar o Service

```typescript
import { authService, CustomerData, LoginData } from '@/lib/auth-service'
```

### 2. Registrar Cliente

```typescript
const customerData: CustomerData = {
  name: "João Silva",
  email: "joao@email.com",
  password: "123456",
  phone: "+55 11 99999-9999",
  cpf: "123.456.789-00",
  zipCode: "01234-567",
  street: "Rua das Flores",
  number: "123",
  neighborhood: "Centro",
  city: "São Paulo",
  state: "SP",
  complement: "Apto 45"
}

const response = await authService.registerCustomer(customerData)

if (response.success) {
  console.log('Cliente registrado:', response.customer)
  console.log('Token JWT:', response.access_token)  // ✅ NOVO
  console.log('Stats:', response.stats)             // ✅ NOVO
} else {
  console.error('Erro:', response.message)
}
```

### 3. Fazer Login

```typescript
const loginData: LoginData = {
  email: "joao@email.com",
  password: "123456"
}

const response = await authService.loginCustomer(loginData)

if (response.success) {
  console.log('Login realizado:', response.customer)
  console.log('Token JWT:', response.access_token)  // ✅ NOVO
  console.log('Stats:', response.stats)             // ✅ NOVO
} else {
  console.error('Erro:', response.message)
}
```

### 4. **NOVO: Requisições Autenticadas**

```typescript
// ✅ Função genérica para APIs protegidas
const profileData = await authService.authenticatedRequest('/api/customers/profile')

// ✅ Exemplo específico: Finalizar pedido
const orderResult = await authService.finalizeOrder({
  items: [
    { productId: "123", quantity: 2, price: 29.90 }
  ],
  shippingAddress: { /* ... */ },
  paymentMethod: "credit_card"
})
```

### 5. Verificar Status

```typescript
// Verificar se está logado
const isLoggedIn = authService.isLoggedIn()

// Obter dados do cliente atual
const currentCustomer = authService.getCurrentCustomer()

// Obter token JWT de autenticação
const token = authService.getAuthToken()
```

### 6. Fazer Logout

```typescript
authService.logout()
```

## 🔍 Validações Disponíveis

```typescript
// Validar e-mail
const isValidEmail = authService.validateEmail("joao@email.com")

// Validar CPF
const isValidCPF = authService.validateCPF("123.456.789-00")

// Validar telefone
const isValidPhone = authService.validatePhone("+55 11 99999-9999")

// Validar CEP
const isValidZipCode = authService.validateZipCode("01234-567")

// Validar senha
const isValidPassword = authService.validatePassword("123456")
```

## 📱 Integração com Componentes

### Login/Registro

```typescript
// No componente de login
const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault()
  
  const response = await authService.loginCustomer(loginData)
  
  if (response.success) {
    // ✅ Token JWT já salvo automaticamente
    // Redirecionar para home
    window.location.href = "/"
  } else {
    // Mostrar erro
    setError(response.message)
  }
}
```

### Verificação de Autenticação

```typescript
// No componente que precisa de autenticação
useEffect(() => {
  if (!authService.isLoggedIn()) {
    // Redirecionar para login
    router.push('/login')
  }
}, [])
```

### **NOVO: Requisições Autenticadas**

```typescript
// No componente de checkout
const handleCheckout = async () => {
  try {
    const result = await authService.finalizeOrder(orderData)
    console.log('Pedido finalizado:', result)
    // Redirecionar para confirmação
  } catch (error) {
    console.error('Erro ao finalizar pedido:', error)
  }
}
```

## 🔒 Segurança JWT

- **Tokens JWT**: Armazenados como `customerToken` no localStorage
- **Validade**: Token válido por 7 dias
- **Headers**: `Authorization: Bearer {token}` automático
- **Validações**: Validação completa de dados antes do envio
- **Tratamento de Erros**: Tratamento robusto de erros da API
- **Sessão**: Gerenciamento automático de sessão do usuário

## 🧪 Testes

Use o arquivo `lib/examples/auth-usage.ts` para testar todas as funcionalidades:

```typescript
import { exampleCompleteFlow } from '@/lib/examples/auth-usage'

// Executar fluxo completo de teste com JWT
exampleCompleteFlow()
```

## 🚨 Tratamento de Erros

O service trata automaticamente:
- Erros de rede
- Erros de validação da API
- Erros de formato de resposta
- Timeouts de requisição
- **Tokens JWT inválidos/expirados**

## 🔧 Configuração

O service está configurado para usar:
- **Base URL**: `http://https://api.multiversoestudiocrm.com.br/api/public`
- **Headers**: `Content-Type: application/json`
- **Método**: `POST` para todas as operações
- **Autenticação**: `Authorization: Bearer {token}` para APIs protegidas

## 📚 Exemplos Completos

Veja `lib/examples/auth-usage.ts` para exemplos completos de uso de todas as funcionalidades, incluindo:
- ✅ Registro e login com JWT
- ✅ Requisições autenticadas
- ✅ Finalização de pedidos
- ✅ Fluxo completo de autenticação

## 🔄 Migração do Sistema Anterior

Se você estava usando o sistema anterior:

```typescript
// ❌ ANTES (sistema antigo)
localStorage.getItem('authToken')
localStorage.getItem('customerData')

// ✅ AGORA (sistema JWT)
localStorage.getItem('customerToken')  // Novo nome
localStorage.getItem('customer')       // Novo nome
```

O service faz essa migração automaticamente!
