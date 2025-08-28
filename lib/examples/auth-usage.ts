// ✅ EXEMPLO DE USO DO AUTH SERVICE - ATUALIZADO PARA JWT
import { authService, CustomerData, LoginData } from '../auth-service'

// ✅ EXEMPLO DE REGISTRO DE CLIENTE
export async function exampleRegister() {
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

  console.log('🔄 Registrando cliente...')
  const response = await authService.registerCustomer(customerData)
  
  if (response.success) {
    console.log('✅ Cliente registrado:', response.customer)
    console.log('🔑 Token JWT:', response.access_token)
    console.log('📊 Stats:', response.stats)
  } else {
    console.error('❌ Erro no registro:', response.message)
  }
  
  return response
}

// ✅ EXEMPLO DE LOGIN
export async function exampleLogin() {
  const loginData: LoginData = {
    email: "joao@email.com",
    password: "123456"
  }

  console.log('🔄 Fazendo login...')
  const response = await authService.loginCustomer(loginData)
  
  if (response.success) {
    console.log('✅ Login realizado:', response.customer)
    console.log('🔑 Token JWT:', response.access_token)
    console.log('📊 Stats:', response.stats)
  } else {
    console.error('❌ Erro no login:', response.message)
  }
  
  return response
}

// ✅ EXEMPLO DE RECUPERAÇÃO DE SENHA
export async function exampleForgotPassword() {
  const email = "joao@email.com"

  console.log('🔄 Recuperando senha...')
  const response = await authService.forgotPassword(email)
  
  if (response.success) {
    console.log('✅ Instruções enviadas para:', email)
  } else {
    console.error('❌ Erro na recuperação:', response.message)
  }
  
  return response
}

// ✅ EXEMPLO DE REQUISIÇÃO AUTENTICADA - NOVA FUNCIONALIDADE
export async function exampleAuthenticatedRequest() {
  try {
    console.log('🔄 Fazendo requisição autenticada...')
    
    // Exemplo: buscar dados do perfil
    const profileData = await authService.authenticatedRequest('/api/customers/profile')
    console.log('✅ Dados do perfil:', profileData)
    
    return profileData
  } catch (error) {
    console.error('❌ Erro na requisição autenticada:', error)
    return null
  }
}

// ✅ EXEMPLO DE FINALIZAR PEDIDO - NOVA FUNCIONALIDADE
export async function exampleFinalizeOrder() {
  try {
    console.log('🔄 Finalizando pedido...')
    
    const orderData = {
      items: [
        { productId: "123", quantity: 2, price: 29.90 },
        { productId: "456", quantity: 1, price: 59.90 }
      ],
      shippingAddress: {
        street: "Rua das Flores",
        number: "123",
        neighborhood: "Centro",
        city: "São Paulo",
        state: "SP",
        zipCode: "01234-567"
      },
      paymentMethod: "credit_card"
    }
    
    const result = await authService.finalizeOrder(orderData)
    console.log('✅ Pedido finalizado:', result)
    
    return result
  } catch (error) {
    console.error('❌ Erro ao finalizar pedido:', error)
    return null
  }
}

// ✅ EXEMPLO DE VERIFICAÇÕES
export function exampleValidations() {
  console.log('🔍 Validando dados...')
  
  const email = "joao@email.com"
  const cpf = "123.456.789-00"
  const phone = "+55 11 99999-9999"
  const zipCode = "01234-567"
  const password = "123456"
  
  console.log('📧 E-mail válido:', authService.validateEmail(email))
  console.log('🆔 CPF válido:', authService.validateCPF(cpf))
  console.log('📱 Telefone válido:', authService.validatePhone(phone))
  console.log('📍 CEP válido:', authService.validateZipCode(zipCode))
  console.log('🔒 Senha válida:', authService.validatePassword(password))
}

// ✅ EXEMPLO DE VERIFICAÇÃO DE STATUS
export function exampleStatus() {
  console.log('🔍 Verificando status...')
  
  const isLoggedIn = authService.isLoggedIn()
  const currentCustomer = authService.getCurrentCustomer()
  const token = authService.getAuthToken()
  
  console.log('👤 Está logado:', isLoggedIn)
  console.log('👤 Cliente atual:', currentCustomer)
  console.log('🔑 Token JWT:', token)
  
  if (isLoggedIn) {
    console.log('✅ Usuário autenticado')
  } else {
    console.log('❌ Usuário não autenticado')
  }
}

// ✅ EXEMPLO DE LOGOUT
export function exampleLogout() {
  console.log('🔄 Fazendo logout...')
  authService.logout()
  console.log('✅ Logout realizado')
  
  // Verificar se foi deslogado
  const isLoggedIn = authService.isLoggedIn()
  console.log('👤 Ainda logado:', isLoggedIn)
}

// ✅ EXEMPLO COMPLETO DE FLUXO - ATUALIZADO PARA JWT
export async function exampleCompleteFlow() {
  console.log('🚀 INICIANDO FLUXO COMPLETO DE AUTENTICAÇÃO JWT')
  console.log('=' .repeat(60))
  
  // 1. Verificar status inicial
  console.log('\n1️⃣ Status inicial:')
  exampleStatus()
  
  // 2. Registrar cliente
  console.log('\n2️⃣ Registrando cliente:')
  const registerResponse = await exampleRegister()
  
  if (registerResponse.success) {
    // 3. Verificar status após registro
    console.log('\n3️⃣ Status após registro:')
    exampleStatus()
    
    // 4. Testar requisição autenticada
    console.log('\n4️⃣ Testando requisição autenticada:')
    await exampleAuthenticatedRequest()
    
    // 5. Fazer logout
    console.log('\n5️⃣ Fazendo logout:')
    exampleLogout()
    
    // 6. Verificar status após logout
    console.log('\n6️⃣ Status após logout:')
    exampleStatus()
    
    // 7. Fazer login
    console.log('\n7️⃣ Fazendo login:')
    const loginResponse = await exampleLogin()
    
    if (loginResponse.success) {
      // 8. Verificar status após login
      console.log('\n8️⃣ Status após login:')
      exampleStatus()
      
      // 9. Testar requisição autenticada novamente
      console.log('\n9️⃣ Testando requisição autenticada após login:')
      await exampleAuthenticatedRequest()
      
      // 10. Testar finalização de pedido
      console.log('\n🔟 Testando finalização de pedido:')
      await exampleFinalizeOrder()
      
      // 11. Fazer logout final
      console.log('\n1️⃣1️⃣ Logout final:')
      exampleLogout()
    }
  }
  
  console.log('\n🏁 FLUXO COMPLETO JWT FINALIZADO')
  console.log('=' .repeat(60))
}
