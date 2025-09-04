// ✅ SERVICE DE PERFIL DO CUSTOMER
export interface CustomerProfile {
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

export interface CustomerAddress {
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

export interface CustomerOrder {
  id: string
  orderNumber: string
  status: string
  total: number
  items: OrderItem[]
  createdAt: string
  updatedAt: string
}

export interface OrderItem {
  id: string
  productId: string
  productName: string
  quantity: number
  price: number
  image?: string
}

export interface CustomerStats {
  totalOrders: number
  totalSpent: number
  favoriteCategories: string[]
  lastOrderDate?: string
}

export interface ProfileResponse {
  success: boolean
  message: string
  customer?: CustomerProfile
  error?: string
}

export class CustomerProfileService {
  private baseUrl = 'https://api.multiversoestudiocrm.com.br/api/public'

  // ✅ OBTER PERFIL COMPLETO DO CUSTOMER
  async getCustomerProfile(): Promise<ProfileResponse> {
    try {
      console.log('🔄 Buscando perfil do customer...')
      
      // ✅ VERIFICAR SE ESTÁ LOGADO
      const token = localStorage.getItem('customerToken')
      if (!token) {
        throw new Error('Token de autenticação não encontrado')
      }

      const response = await fetch(`${this.baseUrl}/customers/profile`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })

      // ✅ VERIFICAR SE A RESPOSTA É JSON VÁLIDO
      const contentType = response.headers.get('content-type')
      if (!contentType || !contentType.includes('application/json')) {
        console.error('❌ API retornou HTML em vez de JSON:', contentType)
        throw new Error('API retornou resposta inválida (HTML em vez de JSON)')
      }

      const data = await response.json()
      console.log('📡 Resposta do perfil:', data)

      if (!response.ok) {
        // ✅ TRATAR SESSÃO EXPIRADA
        if (response.status === 401 || response.status === 403) {
          console.log('❌ Sessão expirada, fazendo logout...')
          localStorage.removeItem('customerToken')
          localStorage.removeItem('customer')
          throw new Error('Sessão expirada')
        }
        throw new Error(data.message || `Erro ${response.status}: ${response.statusText}`)
      }

      // ✅ ATUALIZAR DADOS DO CUSTOMER NO LOCALSTORAGE
      if (data.customer) {
        localStorage.setItem('customer', JSON.stringify(data.customer))
        console.log('✅ Perfil atualizado no localStorage')
      }

      return {
        success: true,
        message: 'Perfil carregado com sucesso!',
        customer: data.customer
      }

    } catch (error) {
      console.error('❌ Erro ao buscar perfil:', error)
      
      // ✅ SE SESSÃO EXPIRADA, REDIRECIONAR PARA LOGIN
      if (error instanceof Error && error.message.includes('Sessão expirada')) {
        if (typeof window !== 'undefined') {
          window.location.href = '/login'
        }
      }
      
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Erro ao carregar perfil',
        error: error instanceof Error ? error.message : 'Erro desconhecido'
      }
    }
  }

  // ✅ ATUALIZAR PERFIL DO CUSTOMER
  async updateCustomerProfile(profileData: Partial<CustomerProfile>): Promise<ProfileResponse> {
    try {
      console.log('🔄 Atualizando perfil do customer...')
      
      const token = localStorage.getItem('customerToken')
      if (!token) {
        throw new Error('Token de autenticação não encontrado')
      }

      const response = await fetch(`${this.baseUrl}/customers/profile`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(profileData)
      })

      const data = await response.json()
      console.log('📡 Resposta da atualização:', data)

      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          console.log('❌ Sessão expirada, fazendo logout...')
          localStorage.removeItem('customerToken')
          localStorage.removeItem('customer')
          throw new Error('Sessão expirada')
        }
        throw new Error(data.message || `Erro ${response.status}: ${response.statusText}`)
      }

      // ✅ ATUALIZAR DADOS NO LOCALSTORAGE
      if (data.customer) {
        localStorage.setItem('customer', JSON.stringify(data.customer))
        console.log('✅ Perfil atualizado no localStorage')
      }

      return {
        success: true,
        message: 'Perfil atualizado com sucesso!',
        customer: data.customer
      }

    } catch (error) {
      console.error('❌ Erro ao atualizar perfil:', error)
      
      if (error instanceof Error && error.message.includes('Sessão expirada')) {
        if (typeof window !== 'undefined') {
          window.location.href = '/login'
        }
      }
      
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Erro ao atualizar perfil',
        error: error instanceof Error ? error.message : 'Erro desconhecido'
      }
    }
  }

  // ✅ ADICIONAR NOVO ENDEREÇO
  async addAddress(addressData: Omit<CustomerAddress, 'id'>): Promise<ProfileResponse> {
    try {
      console.log('🔄 Adicionando novo endereço...')
      
      const token = localStorage.getItem('customerToken')
      if (!token) {
        throw new Error('Token de autenticação não encontrado')
      }

      const response = await fetch(`${this.baseUrl}/customers/addresses`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(addressData)
      })

      const data = await response.json()
      console.log('📡 Resposta da adição de endereço:', data)

      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          localStorage.removeItem('customerToken')
          localStorage.removeItem('customer')
          throw new Error('Sessão expirada')
        }
        throw new Error(data.message || `Erro ${response.status}: ${response.statusText}`)
      }

      // ✅ ATUALIZAR PERFIL NO LOCALSTORAGE
      if (data.customer) {
        localStorage.setItem('customer', JSON.stringify(data.customer))
      }

      return {
        success: true,
        message: 'Endereço adicionado com sucesso!',
        customer: data.customer
      }

    } catch (error) {
      console.error('❌ Erro ao adicionar endereço:', error)
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Erro ao adicionar endereço',
        error: error instanceof Error ? error.message : 'Erro desconhecido'
      }
    }
  }

  // ✅ OBTER HISTÓRICO DE PEDIDOS
  async getOrderHistory(): Promise<ProfileResponse> {
    try {
      console.log('🔄 Buscando histórico de pedidos...')
      
      const token = localStorage.getItem('customerToken')
      if (!token) {
        throw new Error('Token de autenticação não encontrado')
      }

      const response = await fetch(`${this.baseUrl}/customers/orders`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })

      const data = await response.json()
      console.log('📡 Resposta do histórico:', data)

      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          localStorage.removeItem('customerToken')
          localStorage.removeItem('customer')
          throw new Error('Sessão expirada')
        }
        throw new Error(data.message || `Erro ${response.status}: ${response.statusText}`)
      }

      return {
        success: true,
        message: 'Histórico carregado com sucesso!',
        customer: data.customer
      }

    } catch (error) {
      console.error('❌ Erro ao buscar histórico:', error)
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Erro ao carregar histórico',
        error: error instanceof Error ? error.message : 'Erro desconhecido'
      }
    }
  }

  // ✅ VERIFICAR SE CUSTOMER ESTÁ LOGADO
  isCustomerLoggedIn(): boolean {
    if (typeof window === 'undefined') return false
    const token = localStorage.getItem('customerToken')
    return !!token
  }

  // ✅ OBTER DADOS DO CUSTOMER ATUAL
  getCurrentCustomer(): CustomerProfile | null {
    if (typeof window === 'undefined') return null
    const customerData = localStorage.getItem('customer')
    return customerData ? JSON.parse(customerData) : null
  }

  // ✅ OBTER ENDEREÇO PADRÃO
  getDefaultAddress(): CustomerAddress | null {
    const customer = this.getCurrentCustomer()
    if (!customer || !customer.addresses) return null
    
    return customer.addresses.find(addr => addr.isDefault) || customer.addresses[0] || null
  }

  // ✅ OBTER ESTATÍSTICAS DO CUSTOMER
  getCustomerStats(): CustomerStats | null {
    const customer = this.getCurrentCustomer()
    return customer?.stats || null
  }

  // ✅ OBTER PEDIDOS RECENTES
  getRecentOrders(): CustomerOrder[] {
    const customer = this.getCurrentCustomer()
    return customer?.recentOrders || []
  }

  // ✅ FAZER LOGOUT (COMPATIBILIDADE COM AUTH SERVICE)
  logout(): void {
    if (typeof window === 'undefined') return
    localStorage.removeItem('customerToken')
    localStorage.removeItem('customer')
    console.log('✅ Logout realizado com sucesso')
  }
}

// ✅ INSTÂNCIA GLOBAL DO SERVICE
export const customerProfileService = new CustomerProfileService()


