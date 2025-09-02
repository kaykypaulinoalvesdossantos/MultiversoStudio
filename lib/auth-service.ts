import { customerProfileService } from './customer-profile-service'

// ✅ SERVICE DE AUTENTICAÇÃO PARA CLIENTES - ATUALIZADO PARA JWT
export interface CustomerData {
  name: string
  email: string
  password: string
  phone: string
  cpf: string
  zipCode: string
  street: string
  number: string
  neighborhood: string
  city: string
  state: string
  complement?: string
}

export interface LoginData {
  email: string
  password: string
}

export interface AuthResponse {
  success: boolean
  message: string
  access_token?: string
  customer?: any
  stats?: any
  error?: string
}

export class AuthService {
  // private baseUrl = 'https://api.multiversoestudiocrm.com.br/api/public'
  private baseUrl = 'https://api.multiversoestudiocrm.com.br/api/public'

  // ✅ REGISTRAR NOVO CLIENTE - ATUALIZADO PARA JWT + PERFIL
  async registerCustomer(customerData: CustomerData): Promise<AuthResponse> {
    try {
      console.log('🔄 Registrando cliente:', customerData)
      
      const response = await fetch(`${this.baseUrl}/customers/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(customerData)
      })

      const data = await response.json()
      console.log('📡 Resposta do registro:', data)

      if (!response.ok) {
        throw new Error(data.message || `Erro ${response.status}: ${response.statusText}`)
      }

      // ✅ SALVAR TOKEN JWT NO LOCALSTORAGE - NOVO FORMATO
      if (data.access_token) {
        localStorage.setItem('customerToken', data.access_token)
        localStorage.setItem('customer', JSON.stringify(data.customer))
        console.log('🔑 Token JWT salvo:', data.access_token)
        
        // ✅ CARREGAR PERFIL COMPLETO APÓS REGISTRO
        try {
          console.log('🔄 Carregando perfil completo após registro...')
          const profileResponse = await customerProfileService.getCustomerProfile()
          if (profileResponse.success && profileResponse.customer) {
            console.log('✅ Perfil completo carregado após registro')
          }
        } catch (profileError) {
          console.log('⚠️ Erro ao carregar perfil após registro (não crítico):', profileError)
        }
      }

      return {
        success: true,
        message: 'Cliente registrado com sucesso!',
        access_token: data.access_token,
        customer: data.customer,
        stats: data.stats
      }

    } catch (error) {
      console.error('❌ Erro ao registrar cliente:', error)
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Erro ao registrar cliente',
        error: error instanceof Error ? error.message : 'Erro desconhecido'
      }
    }
  }

  // ✅ FAZER LOGIN DO CLIENTE - ATUALIZADO PARA JWT + PERFIL
  async loginCustomer(loginData: LoginData): Promise<AuthResponse> {
    try {
      console.log('🔄 Fazendo login:', loginData.email)
      
      const response = await fetch(`${this.baseUrl}/customers/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)
      })

      const data = await response.json()
      console.log('📡 Resposta do login:', data)

      if (!response.ok) {
        throw new Error(data.message || `Erro ${response.status}: ${response.statusText}`)
      }

      // ✅ SALVAR TOKEN JWT NO LOCALSTORAGE - NOVO FORMATO
      if (data.access_token) {
        localStorage.setItem('customerToken', data.access_token)
        localStorage.setItem('customer', JSON.stringify(data.customer))
        console.log('🔑 Token JWT salvo:', data.access_token)
        
        // ✅ CARREGAR PERFIL COMPLETO APÓS LOGIN
        try {
          console.log('🔄 Carregando perfil completo após login...')
          const profileResponse = await customerProfileService.getCustomerProfile()
          if (profileResponse.success && profileResponse.customer) {
            console.log('✅ Perfil completo carregado após login')
          }
        } catch (profileError) {
          console.log('⚠️ Erro ao carregar perfil após login (não crítico):', profileError)
        }
      }

      return {
        success: true,
        message: 'Login realizado com sucesso!',
        access_token: data.access_token,
        customer: data.customer,
        stats: data.stats
      }

    } catch (error) {
      console.error('❌ Erro ao fazer login:', error)
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Erro ao fazer login',
        error: error instanceof Error ? error.message : 'Erro desconhecido'
      }
    }
  }

  // ✅ RECUPERAR SENHA
  async forgotPassword(email: string): Promise<AuthResponse> {
    try {
      console.log('🔄 Recuperando senha para:', email)
      
      const response = await fetch(`${this.baseUrl}/customers/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      })

      const data = await response.json()
      console.log('📡 Resposta da recuperação:', data)

      if (!response.ok) {
        throw new Error(data.message || `Erro ${response.status}: ${response.statusText}`)
      }

      return {
        success: true,
        message: 'Instruções enviadas para seu e-mail!',
        customer: data.customer
      }

    } catch (error) {
      console.error('❌ Erro ao recuperar senha:', error)
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Erro ao recuperar senha',
        error: error instanceof Error ? error.message : 'Erro desconhecido'
      }
    }
  }

  // ✅ VERIFICAR SE ESTÁ LOGADO - ATUALIZADO PARA JWT
  isLoggedIn(): boolean {
    if (typeof window === 'undefined') return false
    const token = localStorage.getItem('customerToken')
    return !!token
  }

  // ✅ OBTER DADOS DO CLIENTE LOGADO - ATUALIZADO PARA JWT
  getCurrentCustomer(): any | null {
    if (typeof window === 'undefined') return null
    const customerData = localStorage.getItem('customer')
    return customerData ? JSON.parse(customerData) : null
  }

  // ✅ OBTER TOKEN DE AUTENTICAÇÃO - ATUALIZADO PARA JWT
  getAuthToken(): string | null {
    if (typeof window === 'undefined') return null
    return localStorage.getItem('customerToken')
  }

  // ✅ FAZER LOGOUT - ATUALIZADO PARA JWT
  logout(): void {
    if (typeof window === 'undefined') return
    localStorage.removeItem('customerToken')
    localStorage.removeItem('customer')
    console.log('✅ Logout realizado com sucesso')
  }

  // ✅ FUNÇÃO PARA REQUISIÇÕES AUTENTICADAS - NOVA FUNCIONALIDADE
  async authenticatedRequest(url: string, options: RequestInit = {}): Promise<any> {
    const token = this.getAuthToken()
    
    if (!token) {
      throw new Error('Token de autenticação não encontrado')
    }

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      ...options.headers
    }

    const response = await fetch(url, {
      ...options,
      headers
    })

    if (!response.ok) {
      throw new Error(`Erro ${response.status}: ${response.statusText}`)
    }

    return response.json()
  }

  // ✅ EXEMPLO: FINALIZAR PEDIDO - NOVA FUNCIONALIDADE
  async finalizeOrder(orderData: any): Promise<any> {
    return await this.authenticatedRequest('/api/orders', {
      method: 'POST',
      body: JSON.stringify(orderData)
    })
  }

  // ✅ VALIDAR CPF (formato brasileiro)
  validateCPF(cpf: string): boolean {
    // Remove caracteres não numéricos
    const cleanCPF = cpf.replace(/\D/g, '')
    
    // Verifica se tem 11 dígitos
    if (cleanCPF.length !== 11) return false
    
    // Verifica se todos os dígitos são iguais
    if (/^(\d)\1+$/.test(cleanCPF)) return false
    
    // Validação dos dígitos verificadores
    let sum = 0
    for (let i = 0; i < 9; i++) {
      sum += parseInt(cleanCPF.charAt(i)) * (10 - i)
    }
    let remainder = 11 - (sum % 11)
    if (remainder === 10 || remainder === 11) remainder = 0
    if (remainder !== parseInt(cleanCPF.charAt(9))) return false
    
    sum = 0
    for (let i = 0; i < 10; i++) {
      sum += parseInt(cleanCPF.charAt(i)) * (11 - i)
    }
    remainder = 11 - (sum % 11)
    if (remainder === 10 || remainder === 11) remainder = 0
    if (remainder !== parseInt(cleanCPF.charAt(10))) return false
    
    return true
  }

  // ✅ VALIDAR TELEFONE (formato brasileiro)
  validatePhone(phone: string): boolean {
    const cleanPhone = phone.replace(/\D/g, '')
    return cleanPhone.length >= 10 && cleanPhone.length <= 11
  }

  // ✅ VALIDAR CEP (formato brasileiro)
  validateZipCode(zipCode: string): boolean {
    const cleanZipCode = zipCode.replace(/\D/g, '')
    return cleanZipCode.length === 8
  }

  // ✅ VALIDAR E-MAIL
  validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  // ✅ VALIDAR SENHA (mínimo 6 caracteres)
  validatePassword(password: string): boolean {
    return password.length >= 6
  }
}

// ✅ INSTÂNCIA GLOBAL DO SERVICE
export const authService = new AuthService()
