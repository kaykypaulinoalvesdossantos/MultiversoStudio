# 👤 Customer Profile Service - Sistema Completo de Perfil

## 📋 Visão Geral

O `CustomerProfileService` é um service completo para gerenciar o perfil de clientes na plataforma Multiverso E-commerce. Ele oferece funcionalidades de perfil, endereços, histórico de pedidos e estatísticas, integrado com o sistema de autenticação JWT.

## 🚀 Funcionalidades

### ✅ Perfil do Customer
- **Carregamento automático** após login/registro
- **Atualização de dados** pessoais
- **Gerenciamento de endereços** (adicionar, editar, padrão)
- **Histórico de pedidos** completo
- **Estatísticas** de compras e preferências

### ✅ Integração Automática
- **Login/Registro** → Carrega perfil automaticamente
- **Token JWT** → Validação automática de sessão
- **Sessão expirada** → Logout automático + redirecionamento
- **LocalStorage** → Sincronização automática de dados

### ✅ Endpoints da API

| Método | Endpoint | Descrição |
|--------|----------|------------|
| `GET` | `/api/public/customers/profile` | ✅ Obter perfil completo |
| `PUT` | `/api/public/customers/profile` | ✅ Atualizar perfil |
| `POST` | `/api/public/customers/addresses` | ✅ Adicionar endereço |
| `GET` | `/api/public/customers/orders` | ✅ Histórico de pedidos |

## 🛠️ Como Usar

### 1. Importar o Service

```typescript
import { customerProfileService } from '@/lib/customer-profile-service'
```

### 2. Obter Perfil Completo

```typescript
// ✅ Carregar perfil completo (com validação de token)
const response = await customerProfileService.getCustomerProfile()

if (response.success) {
  console.log('✅ Perfil carregado:', response.customer)
  console.log('📍 Endereços:', response.customer.addresses)
  console.log('📦 Pedidos recentes:', response.customer.recentOrders)
  console.log('📊 Estatísticas:', response.customer.stats)
} else {
  console.error('❌ Erro:', response.message)
}
```

### 3. Atualizar Perfil

```typescript
// ✅ Atualizar dados pessoais
const updateData = {
  name: "João Silva Atualizado",
  phone: "+55 11 88888-8888"
}

const response = await customerProfileService.updateCustomerProfile(updateData)

if (response.success) {
  console.log('✅ Perfil atualizado:', response.customer)
} else {
  console.error('❌ Erro:', response.message)
}
```

### 4. Gerenciar Endereços

```typescript
// ✅ Adicionar novo endereço
const newAddress = {
  street: "Nova Rua",
  number: "456",
  neighborhood: "Novo Bairro",
  city: "Nova Cidade",
  state: "NS",
  zipCode: "12345-678",
  complement: "Apto 12",
  isDefault: false,
  label: "Trabalho"
}

const response = await customerProfileService.addAddress(newAddress)

if (response.success) {
  console.log('✅ Endereço adicionado')
}

// ✅ Obter endereço padrão
const defaultAddress = customerProfileService.getDefaultAddress()
console.log('📍 Endereço padrão:', defaultAddress)
```

### 5. Histórico de Pedidos

```typescript
// ✅ Obter histórico completo
const response = await customerProfileService.getOrderHistory()

if (response.success) {
  console.log('📦 Histórico:', response.customer.recentOrders)
}

// ✅ Obter pedidos recentes (do localStorage)
const recentOrders = customerProfileService.getRecentOrders()
console.log('📦 Pedidos recentes:', recentOrders)
```

### 6. Estatísticas do Customer

```typescript
// ✅ Obter estatísticas
const stats = customerProfileService.getCustomerStats()

if (stats) {
  console.log('📊 Total de pedidos:', stats.totalOrders)
  console.log('💰 Total gasto:', stats.totalSpent)
  console.log('❤️ Categorias favoritas:', stats.favoriteCategories)
  console.log('📅 Último pedido:', stats.lastOrderDate)
}
```

## 🔐 Hook Personalizado

### ✅ `useCustomerAuth` - Gerenciamento Completo

```typescript
import { useCustomerAuth } from '@/hooks/use-customer-auth'

function MyComponent() {
  const {
    isLoggedIn,
    isLoading,
    customer,
    login,
    register,
    logout,
    refreshProfile,
    updateProfile,
    addAddress,
    getDefaultAddress,
    getOrderHistory,
    getRecentOrders,
    getCustomerStats
  } = useCustomerAuth()

  // ✅ Estados automáticos
  if (isLoading) return <div>Carregando...</div>
  
  if (!isLoggedIn) {
    return <button onClick={() => login('email', 'password')}>Entrar</button>
  }

  return (
    <div>
      <h1>Olá, {customer?.name}!</h1>
      <button onClick={logout}>Sair</button>
      <button onClick={refreshProfile}>Atualizar Perfil</button>
    </div>
  )
}
```

## 📱 Componentes Prontos

### ✅ `CustomerProfileButton` - Botão de Perfil

```typescript
import { CustomerProfileButton } from '@/components/customer-profile-button'

// ✅ No navbar - mostra nome quando logado, "Entrar" quando não logado
<CustomerProfileButton />
```

### ✅ `CustomerNameDisplay` - Apenas Nome

```typescript
import { CustomerNameDisplay } from '@/components/customer-profile-button'

// ✅ Mostra apenas "Olá, João!" quando logado
<CustomerNameDisplay />
```

### ✅ `CheckoutDataLoader` - Preenchimento Automático

```typescript
import { CheckoutDataLoader } from '@/components/customer-profile-button'

// ✅ No checkout - preenche dados automaticamente
<CheckoutDataLoader />
```

## 🔄 Fluxo Automático

### ✅ Após Login/Registro:

1. **Token salvo** no localStorage
2. **Dados básicos** salvos
3. **Perfil completo** carregado automaticamente
4. **Dados sincronizados** com localStorage

### ✅ Verificação de Sessão:

1. **Token válido** → Dados carregados
2. **Token expirado** → Logout automático
3. **Redirecionamento** para `/login`

### ✅ Sincronização:

1. **Dados atualizados** → localStorage atualizado
2. **Estado do componente** → Atualizado automaticamente
3. **Consistência** entre service e interface

## 📊 Estrutura de Dados

### ✅ CustomerProfile

```typescript
interface CustomerProfile {
  id: string
  name: string
  email: string
  phone: string
  cpf: string
  addresses: CustomerAddress[]
  recentOrders: CustomerOrder[]
  stats: CustomerStats
  createdAt: string
  updatedAt: string
}
```

### ✅ CustomerAddress

```typescript
interface CustomerAddress {
  id: string
  street: string
  number: string
  neighborhood: string
  city: string
  state: string
  zipCode: string
  complement?: string
  isDefault: boolean
  label?: string
}
```

### ✅ CustomerStats

```typescript
interface CustomerStats {
  totalOrders: number
  totalSpent: number
  favoriteCategories: string[]
  lastOrderDate?: string
}
```

## 🧪 Exemplos de Uso

### ✅ Checkout com Dados Salvos

```typescript
// ✅ No checkout, carregar dados automaticamente
const { isLoggedIn, customer, getDefaultAddress } = useCustomerAuth()

useEffect(() => {
  if (isLoggedIn && customer) {
    const defaultAddress = getDefaultAddress()
    
    if (defaultAddress) {
      // ✅ Preencher formulário de entrega
      fillShippingForm(defaultAddress)
    }
    
    // ✅ Preencher dados de faturamento
    fillBillingForm(customer)
  }
}, [isLoggedIn, customer])
```

### ✅ Página de Perfil

```typescript
// ✅ Carregar perfil completo quando customer acessar "Minha Conta"
const { customer, refreshProfile } = useCustomerAuth()

useEffect(() => {
  refreshProfile()
}, [])

if (customer) {
  return (
    <div>
      <h1>{customer.name}</h1>
      <p>{customer.email}</p>
      <p>{customer.phone}</p>
      
      {/* ✅ Endereços */}
      <div>
        <h2>Meus Endereços</h2>
        {customer.addresses.map(address => (
          <div key={address.id}>
            {address.street}, {address.number} - {address.neighborhood}
            {address.isDefault && <span> (Padrão)</span>}
          </div>
        ))}
      </div>
      
      {/* ✅ Pedidos recentes */}
      <div>
        <h2>Pedidos Recentes</h2>
        {customer.recentOrders.map(order => (
          <div key={order.id}>
            #{order.orderNumber} - R$ {order.total} - {order.status}
          </div>
        ))}
      </div>
      
      {/* ✅ Estatísticas */}
      <div>
        <h2>Minhas Estatísticas</h2>
        <p>Total de pedidos: {customer.stats.totalOrders}</p>
        <p>Total gasto: R$ {customer.stats.totalSpent}</p>
      </div>
    </div>
  )
}
```

## 🔒 Segurança

- **Validação de token** em todas as requisições
- **Tratamento de sessão expirada** automático
- **Logout seguro** com limpeza de dados
- **Redirecionamento automático** para login

## 🚨 Tratamento de Erros

O service trata automaticamente:
- **Tokens inválidos/expirados**
- **Erros de rede**
- **Dados corrompidos** no localStorage
- **Sessões expiradas**

## 🔧 Configuração

O service está configurado para usar:
- **Base URL**: `http://https://api.multiversoestudiocrm.com.br/api/public`
- **Headers**: `Authorization: Bearer {token}`
- **Método**: `GET`, `PUT`, `POST` conforme necessário
- **Autenticação**: JWT automática

## 📚 Arquivos Relacionados

- `lib/customer-profile-service.ts` - Service principal
- `hooks/use-customer-auth.ts` - Hook personalizado
- `components/customer-profile-button.tsx` - Componentes prontos
- `lib/auth-service.ts` - Integração com autenticação

**Agora você tem um sistema completo de perfil de customer integrado com JWT!** 🎉


