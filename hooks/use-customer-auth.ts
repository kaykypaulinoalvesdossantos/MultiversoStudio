// ✅ HOOK PERSONALIZADO PARA AUTENTICAÇÃO E PERFIL DO CUSTOMER
import { useState, useEffect } from 'react'
import { authService, customerProfileService, CustomerProfile } from '@/lib'

export interface UseCustomerAuthReturn {
  // ✅ ESTADOS DE AUTENTICAÇÃO
  isLoggedIn: boolean
  isLoading: boolean
  customer: CustomerProfile | null
  
  // ✅ FUNÇÕES DE AUTENTICAÇÃO
  login: (email: string, password: string) => Promise<boolean>
  register: (customerData: any) => Promise<boolean>
  logout: () => void
  
  // ✅ FUNÇÕES DE PERFIL
  refreshProfile: () => Promise<void>
  updateProfile: (profileData: Partial<CustomerProfile>) => Promise<boolean>
  
  // ✅ FUNÇÕES DE ENDEREÇO
  addAddress: (addressData: any) => Promise<boolean>
  getDefaultAddress: () => any
  
  // ✅ FUNÇÕES DE PEDIDOS
  getOrderHistory: () => Promise<any>
  getRecentOrders: () => any[]
  
  // ✅ FUNÇÕES DE ESTATÍSTICAS
  getCustomerStats: () => any
}

export function useCustomerAuth(): UseCustomerAuthReturn {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [customer, setCustomer] = useState<CustomerProfile | null>(null)

  // ✅ VERIFICAR STATUS DE AUTENTICAÇÃO AO INICIAR
  useEffect(() => {
    const checkAuthStatus = () => {
      const token = localStorage.getItem('customerToken')
      const customerData = localStorage.getItem('customer')
      
      if (token && customerData) {
        setIsLoggedIn(true)
        try {
          const parsedCustomer = JSON.parse(customerData)
          setCustomer(parsedCustomer)
        } catch (error) {
          console.error('Erro ao parsear dados do customer:', error)
          // Se erro ao parsear, limpar dados corrompidos
          localStorage.removeItem('customerToken')
          localStorage.removeItem('customer')
          setIsLoggedIn(false)
          setCustomer(null)
        }
      } else {
        setIsLoggedIn(false)
        setCustomer(null)
      }
      
      setIsLoading(false)
    }

    checkAuthStatus()
  }, [])

  // ✅ FUNÇÃO DE LOGIN
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true)
      
      const response = await authService.loginCustomer({ email, password })
      
      if (response.success) {
        setIsLoggedIn(true)
        
        // ✅ CARREGAR PERFIL COMPLETO APÓS LOGIN
        try {
          const profileResponse = await customerProfileService.getCustomerProfile()
          if (profileResponse.success && profileResponse.customer) {
            setCustomer(profileResponse.customer)
          }
        } catch (profileError) {
          console.log('⚠️ Erro ao carregar perfil após login:', profileError)
        }
        
        return true
      } else {
        console.error('Erro no login:', response.message)
        return false
      }
    } catch (error) {
      console.error('Erro no login:', error)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  // ✅ FUNÇÃO DE REGISTRO
  const register = async (customerData: any): Promise<boolean> => {
    try {
      setIsLoading(true)
      
      const response = await authService.registerCustomer(customerData)
      
      if (response.success) {
        setIsLoggedIn(true)
        
        // ✅ CARREGAR PERFIL COMPLETO APÓS REGISTRO
        try {
          const profileResponse = await customerProfileService.getCustomerProfile()
          if (profileResponse.success && profileResponse.customer) {
            setCustomer(profileResponse.customer)
          }
        } catch (profileError) {
          console.log('⚠️ Erro ao carregar perfil após registro:', profileError)
        }
        
        return true
      } else {
        console.error('Erro no registro:', response.message)
        return false
      }
    } catch (error) {
      console.error('Erro no registro:', error)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  // ✅ FUNÇÃO DE LOGOUT
  const logout = () => {
    authService.logout()
    customerProfileService.logout()
    setIsLoggedIn(false)
    setCustomer(null)
  }

  // ✅ FUNÇÃO DE ATUALIZAR PERFIL
  const refreshProfile = async (): Promise<void> => {
    if (!isLoggedIn) return
    
    try {
      const response = await customerProfileService.getCustomerProfile()
      if (response.success && response.customer) {
        setCustomer(response.customer)
      }
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error)
    }
  }

  // ✅ FUNÇÃO DE EDITAR PERFIL
  const updateProfile = async (profileData: Partial<CustomerProfile>): Promise<boolean> => {
    if (!isLoggedIn) return false
    
    try {
      const response = await customerProfileService.updateCustomerProfile(profileData)
      if (response.success && response.customer) {
        setCustomer(response.customer)
        return true
      }
      return false
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error)
      return false
    }
  }

  // ✅ FUNÇÃO DE ADICIONAR ENDEREÇO
  const addAddress = async (addressData: any): Promise<boolean> => {
    if (!isLoggedIn) return false
    
    try {
      const response = await customerProfileService.addAddress(addressData)
      if (response.success && response.customer) {
        setCustomer(response.customer)
        return true
      }
      return false
    } catch (error) {
      console.error('Erro ao adicionar endereço:', error)
      return false
    }
  }

  // ✅ FUNÇÃO DE OBTER ENDEREÇO PADRÃO
  const getDefaultAddress = () => {
    return customerProfileService.getDefaultAddress()
  }

  // ✅ FUNÇÃO DE OBTER HISTÓRICO DE PEDIDOS
  const getOrderHistory = async () => {
    if (!isLoggedIn) return null
    
    try {
      const response = await customerProfileService.getOrderHistory()
      return response.success ? response.customer : null
    } catch (error) {
      console.error('Erro ao obter histórico:', error)
      return null
    }
  }

  // ✅ FUNÇÃO DE OBTER PEDIDOS RECENTES
  const getRecentOrders = () => {
    return customerProfileService.getRecentOrders()
  }

  // ✅ FUNÇÃO DE OBTER ESTATÍSTICAS
  const getCustomerStats = () => {
    return customerProfileService.getCustomerStats()
  }

  return {
    // ✅ ESTADOS
    isLoggedIn,
    isLoading,
    customer,
    
    // ✅ FUNÇÕES DE AUTENTICAÇÃO
    login,
    register,
    logout,
    
    // ✅ FUNÇÕES DE PERFIL
    refreshProfile,
    updateProfile,
    
    // ✅ FUNÇÕES DE ENDEREÇO
    addAddress,
    getDefaultAddress,
    
    // ✅ FUNÇÕES DE PEDIDOS
    getOrderHistory,
    getRecentOrders,
    
    // ✅ FUNÇÕES DE ESTATÍSTICAS
    getCustomerStats
  }
}


