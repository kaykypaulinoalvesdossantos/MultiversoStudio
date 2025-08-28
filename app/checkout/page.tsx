"use client"

export const dynamic = 'force-dynamic'

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { useCart } from "@/contexts/cart-context"
import { useCustomerAuth } from "@/hooks/use-customer-auth"
import { freightService, orderService } from "@/lib"
import type { FreightOption } from "@/lib/freight-service"
import type { OrderData } from "@/lib/order-service"
import { Navbar } from "@/components/navbar"
import Footer from "@/components/footer"
import { 
  Truck, 
  MapPin, 
  User, 
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowLeft,
  Shield,
  Lock,
  AlertCircle
} from "lucide-react"

interface CustomerAddress {
  id: string
  type: string
  street: string
  number: string
  neighborhood: string
  city: string
  state: string
  zipCode: string
  complement?: string
  country: string
}

interface CheckoutForm {
  firstName: string
  lastName: string
  email: string
  phone: string
  cpf: string
  street: string
  number: string
  complement: string
  neighborhood: string
  city: string
  state: string
  zipCode: string
  acceptTerms: boolean
  acceptMarketing: boolean
}

export default function CheckoutPage() {
  const router = useRouter()
  const { items, updateQuantity, removeFromCart, getTotalPrice, getTotalItems, clearCart } = useCart()
  const { isLoggedIn, customer, isLoading } = useCustomerAuth()
  
  const [form, setForm] = useState<CheckoutForm>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    cpf: "",
    street: "",
    number: "",
    complement: "",
    neighborhood: "",
    city: "",
    state: "",
    zipCode: "",
    acceptTerms: false,
    acceptMarketing: false
  })
  
  const [isProcessing, setIsProcessing] = useState(false)
  const [shippingMethod, setShippingMethod] = useState<string>("")
  const [showRegisterPrompt, setShowRegisterPrompt] = useState(false)
  const [freightOptions, setFreightOptions] = useState<FreightOption[]>([])
  const [isCalculatingFreight, setIsCalculatingFreight] = useState(false)
  const [selectedFreight, setSelectedFreight] = useState<FreightOption | null>(null)
  
  const brazilianStates = [
    "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", 
    "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", 
    "RS", "RO", "RR", "SC", "SP", "SE", "TO"
  ]
  
  // Função para buscar endereço por CEP
  const searchAddressByCEP = async (cep: string) => {
    if (!cep || cep.replace(/\D/g, '').length !== 8) return;
    
    try {
      // Buscar endereço via API de CEP
      const response = await fetch(`https://viacep.com.br/ws/${cep.replace(/\D/g, '')}/json/`);
      const data = await response.json();
      
      if (!data.erro) {
        setForm(prev => ({
          ...prev,
          street: data.logradouro || "",
          neighborhood: data.bairro || "",
          city: data.localidade || "",
          state: data.uf || ""
        }));
        
        // Calcular frete automaticamente após preencher endereço
        calculateFreight(cep);
      }
    } catch (error) {
      console.error('Erro ao buscar endereço por CEP:', error);
    }
  };

  // Função para calcular frete quando o CEP for informado
  const calculateFreight = async (cep: string) => {
    if (!cep || cep.replace(/\D/g, '').length !== 8) return;
    
    setIsCalculatingFreight(true);
    try {
      const result = await freightService.calculateFreight(items, cep);
      if (result.success && result.freightOptions && result.freightOptions.length > 0) {
        // Filtrar APENAS opções válidas (com preço e prazo válidos)
        const validOptions = result.freightOptions.filter(option => {
          // Verificar se a opção existe
          if (!option) return false;
          
          // Verificar se o preço é um número válido e maior que 0
          const price = option.custom_price || option.price;
          if (typeof price !== 'number' || isNaN(price) || price < 0) return false;
          
          // Verificar se o prazo é um número válido e maior que 0
          const deliveryTime = option.delivery_time || option.custom_delivery_time;
          if (typeof deliveryTime !== 'number' || isNaN(deliveryTime) || deliveryTime <= 0) return false;
          
          // Verificar se o nome existe
          if (!option.name || typeof option.name !== 'string') return false;
          
          // Verificar se a empresa existe
          if (!option.company || !option.company.name) return false;
          
          return true;
        });
        
        console.log('Opções válidas encontradas:', validOptions.length);
        console.log('Opções filtradas:', validOptions);
        
        if (validOptions.length > 0) {
          // Selecionar automaticamente o frete mais rápido (menor prazo de entrega)
          const fastestFreight = validOptions.reduce((fastest, current) => {
            const currentTime = current.delivery_time || current.custom_delivery_time;
            const fastestTime = fastest.delivery_time || fastest.custom_delivery_time;
            return (currentTime < fastestTime) ? current : fastest;
          });
          
          console.log('Frete mais rápido selecionado:', fastestFreight);
          
          setFreightOptions([fastestFreight]); // Mostrar apenas o mais rápido
          setSelectedFreight(fastestFreight);
          setShippingMethod(fastestFreight.id.toString());
        } else {
          console.error('Nenhuma opção de frete válida encontrada após filtro');
          setFreightOptions([]);
          setSelectedFreight(null);
        }
      } else {
        console.error('Erro na resposta da API de frete:', result);
        setFreightOptions([]);
        setSelectedFreight(null);
      }
    } catch (error) {
      console.error('Erro ao calcular frete:', error);
      setFreightOptions([]);
      setSelectedFreight(null);
    } finally {
      setIsCalculatingFreight(false);
    }
  };

  // Calcular frete quando o CEP mudar
  useEffect(() => {
    if (form.zipCode && form.zipCode.replace(/\D/g, '').length === 8) {
      // Se não tiver endereço preenchido, buscar por CEP
      if (!form.street) {
        searchAddressByCEP(form.zipCode);
      } else {
        // Se já tiver endereço, apenas calcular frete
        calculateFreight(form.zipCode);
      }
    }
  }, [form.zipCode]);

  const getShippingPrice = () => {
    if (!selectedFreight) return 0;
    
    // Usar a função de validação do FreightService
    return freightService.getValidPrice(selectedFreight);
  }

  const getTotal = () => {
    const subtotal = getTotalPrice();
    const shipping = getShippingPrice();
    
    // Validar se os valores são números válidos
    if (typeof subtotal !== 'number' || isNaN(subtotal) || typeof shipping !== 'number' || isNaN(shipping)) {
      console.error('Valores inválidos para cálculo do total:', { subtotal, shipping });
      return 0;
    }
    
    return subtotal + shipping;
  }
  
  // Carregar dados pessoais quando usuário estiver logado
  useEffect(() => {
    if (isLoggedIn && customer) {
      // Preencher dados pessoais automaticamente
      setForm(prev => ({
        ...prev,
        firstName: customer.name?.split(' ')[0] || "",
        lastName: customer.name?.split(' ').slice(1).join(' ') || "",
        email: customer.email || "",
        phone: customer.phone || "",
        cpf: customer.cpf || ""
      }))
      setShowRegisterPrompt(false)
    } else if (!isLoggedIn && !isLoading) {
      // Se não estiver logado e não estiver carregando, mostrar prompt de registro
      setShowRegisterPrompt(true)
    }
  }, [isLoggedIn, customer, isLoading])

  // Carregar endereço completo do usuário quando estiver logado
  useEffect(() => {
    const loadCustomerAddress = async () => {
      if (isLoggedIn && customer) {
        try {
          console.log('Carregando endereço para usuário:', customer.email);
          
          // Buscar perfil completo do usuário para pegar endereços
          const profile = await fetch('/api/public/customers/profile', {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('customerToken')}`,
              'Content-Type': 'application/json'
            }
          }).then(res => res.json());

          console.log('Profile carregado:', profile);

          if (profile.success && profile.customer.addresses && profile.customer.addresses.length > 0) {
            // Pegar o endereço padrão ou o primeiro disponível
            const defaultAddress = profile.customer.addresses.find((addr: CustomerAddress) => addr.type === 'SHIPPING') || profile.customer.addresses[0];
            
            console.log('Endereço encontrado:', defaultAddress);
            
            if (defaultAddress) {
              setForm(prev => ({
                ...prev,
                street: defaultAddress.street || "",
                number: defaultAddress.number || "",
                complement: defaultAddress.complement || "",
                neighborhood: defaultAddress.neighborhood || "",
                city: defaultAddress.city || "",
                state: defaultAddress.state || "",
                zipCode: defaultAddress.zipCode || ""
              }));

              // Calcular frete automaticamente com o CEP carregado
              if (defaultAddress.zipCode) {
                console.log('Calculando frete para CEP:', defaultAddress.zipCode);
                calculateFreight(defaultAddress.zipCode);
              }
            }
          } else {
            console.log('Nenhum endereço encontrado no perfil');
          }
        } catch (error) {
          console.error('Erro ao carregar endereço:', error);
        }
      }
    };

    if (isLoggedIn && customer) {
      loadCustomerAddress();
    }
  }, [isLoggedIn, customer]);
  
  useEffect(() => {
    if (items.length === 0 && typeof window !== 'undefined') {
      router.push('/')
    }
  }, [items, router])
  
  const updateForm = (field: keyof CheckoutForm, value: any) => {
    setForm(prev => ({ ...prev, [field]: value }))
  }
  
  const validateForm = () => {
    const requiredFields = [
      'firstName', 'lastName', 'email', 'phone', 'cpf',
      'street', 'number', 'neighborhood', 'city', 'state', 'zipCode'
    ]
    
    for (const field of requiredFields) {
      if (!form[field as keyof CheckoutForm]) {
        return false
      }
    }
    
    if (!form.acceptTerms) return false
    
    // Validar se o frete foi selecionado e é válido
    if (!selectedFreight) {
      console.error('Nenhum frete selecionado');
      return false
    }
    
    // Usar a função de validação do FreightService
    if (!freightService.isValidFreightOption(selectedFreight)) {
      console.error('Opção de frete inválida na validação:', selectedFreight);
      return false
    }
    
    return true
  }
  
  const handleCheckout = async () => {
    if (!validateForm()) {
      if (!selectedFreight) {
        alert("Por favor, informe o CEP e aguarde o cálculo do frete para continuar.")
        return
      }
      alert("Por favor, preencha todos os campos obrigatórios e aceite os termos.")
      return
    }
    
    setIsProcessing(true)
    
    try {
      // Debug: Verificar estrutura dos itens
      console.log('🔍 DEBUG - Estrutura dos itens do carrinho:');
      items.forEach((item, index) => {
        console.log(`Item ${index + 1}:`, {
          id: item.id,
          productId: item.productId,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          type: item.type,
          color: item.color,
          size: item.size
        });
      });

      // 1. Preparar dados do pedido
      const orderData: OrderData = {
        customerToken: localStorage.getItem('customerToken') || '',
        shippingAddress: {
          street: form.street,
          number: form.number,
          complement: form.complement,
          neighborhood: form.neighborhood,
          city: form.city,
          state: form.state,
          zipCode: form.zipCode,
          country: 'Brasil'
        },
        items: items.map(item => ({
          productId: item.productId, // Usar productId em vez de id
          quantity: item.quantity,
          price: item.price,
          total: item.price * item.quantity
        })),
        subtotal: getTotalPrice(),
        shipping: getShippingPrice(),
        total: getTotal(),
        selectedFreightOption: selectedFreight?.name || '',
        freightPrice: getShippingPrice(),
        deliveryDays: selectedFreight ? freightService.getValidDeliveryTime(selectedFreight) : 0,
        paymentMethod: 'pix', // Método padrão para PIX
        notes: `Pedido realizado em ${new Date().toLocaleDateString('pt-BR')}`
      };

      console.log('Dados do pedido:', orderData);
      console.log('Itens do carrinho:', items);
      console.log('Estrutura dos itens:', items.map(item => ({
        productId: item.productId,
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity
      })));

      // 2. Processar pagamento
      const paymentResult = await orderService.processPayment(orderData);

      if (paymentResult.success && paymentResult.paymentLink) {
        // 3. Sucesso! Abrir link de pagamento em nova aba
        console.log('✅ Pedido criado com sucesso! Redirecionando para pagamento...');
        
        // Limpar carrinho
        clearCart();
        
        // Abrir link de pagamento em nova aba
        orderService.openPaymentLink(paymentResult.paymentLink);
        
        // Redirecionar para página de sucesso
        router.push('/checkout/sucesso');
        
      } else {
        // 4. Erro no processamento
        console.error('❌ Erro ao processar pagamento:', paymentResult.error);
        alert('Erro ao processar pagamento: ' + paymentResult.error);
      }
      
    } catch (error) {
      console.error('Erro no checkout:', error);
      
      // Tratar erros específicos
      const errorInfo = orderService.handleOrderError(error);
      
      if (errorInfo.shouldRedirect && errorInfo.redirectUrl) {
        alert(errorInfo.message);
        router.push(errorInfo.redirectUrl);
      } else {
        alert(errorInfo.message || 'Erro ao processar o pedido. Tente novamente.');
      }
      
    } finally {
      setIsProcessing(false)
    }
  }
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price)
  }
  
  const formatCPF = (value: string) => {
    const v = value.replace(/\D/g, '')
    return v.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
  }
  
  const formatPhone = (value: string) => {
    const v = value.replace(/\D/g, '')
    return v.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
  }
  
  const formatCEP = (value: string) => {
    const v = value.replace(/\D/g, '')
    return v.replace(/(\d{5})(\d{3})/, '$1-$2')
  }
  
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <ShoppingBag className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Carrinho vazio</h2>
            <p className="text-gray-600 mb-6">Adicione produtos ao seu carrinho para continuar</p>
            <Button onClick={() => router.push('/')}>
              Continuar comprando
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  // Mostrar loading enquanto verifica autenticação
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
            <p className="text-gray-600">Carregando...</p>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  // Mostrar prompt de registro se não estiver logado
  if (showRegisterPrompt) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center py-20">
          <div className="max-w-md mx-auto text-center">
            <AlertCircle className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Faça login para continuar</h2>
            <p className="text-gray-600 mb-6">
              Para finalizar sua compra, você precisa estar logado em sua conta.
            </p>
            <div className="space-y-3">
              <Button 
                onClick={() => router.push('/login')}
                className="w-full"
              >
                Fazer Login
              </Button>
              <Button 
                variant="outline"
                onClick={() => router.push('/login?tab=register')}
                className="w-full"
              >
                Criar Conta
              </Button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button 
            variant="ghost" 
            onClick={() => router.push('/')}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar às compras
          </Button>
          
          <h1 className="text-3xl font-bold text-gray-900">Finalizar Compra</h1>
          <p className="text-gray-600 mt-2">
            {getTotalItems()} {getTotalItems() === 1 ? 'produto' : 'produtos'} no carrinho
          </p>
          
          {isLoggedIn && customer && (
            <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-sm text-green-800">
                <span className="font-medium">Bem-vindo(a), {customer.name?.split(' ')[0]}!</span> 
                {form.street ? (
                  <>
                    Seus dados pessoais e endereço foram preenchidos automaticamente.

                  </>
                ) : (
                  <>
                    Seus dados pessoais foram preenchidos automaticamente.
                    <span className="block mt-1 text-yellow-700">
                      ⚠️ Preencha o CEP para buscar seu endereço e calcular o frete.
                    </span>
                  </>
                )}
              </p>
            </div>
          )}
          
          {!isLoggedIn && (
            <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-none">
              <div className="flex items-center justify-between">
                <p className="text-sm text-blue-800">
                  <span className="font-medium">Faça login</span> para preencher automaticamente seus dados pessoais e endereço.
                </p>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => router.push('/login')}
                >
                  Entrar
                </Button>
              </div>
            </div>
          )}
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 rounded-none">
          {/* Formulário de Checkout */}
          <div className="lg:col-span-2 space-y-6">
            {/* Dados Pessoais */}
            <Card className="rounded-none">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Dados Pessoais

                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {isLoggedIn ? (
                  // Mostrar dados como texto para usuários logados
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm font-medium text-gray-600">Nome</Label>
                        <p className="text-lg font-semibold text-gray-900">{form.firstName} {form.lastName}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-600">E-mail</Label>
                        <p className="text-lg font-semibold text-gray-900">{form.email}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm font-medium text-gray-600">Telefone</Label>
                        <p className="text-lg font-semibold text-gray-900">{form.phone}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-600">CPF</Label>
                        <p className="text-lg font-semibold text-gray-900">{form.cpf}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  // Formulário de registro para usuários não logados
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">Nome *</Label>
                        <Input
                          id="firstName"
                          value={form.firstName}
                          onChange={(e) => updateForm('firstName', e.target.value)}
                          placeholder="Seu nome"
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Sobrenome *</Label>
                        <Input
                          id="lastName"
                          value={form.lastName}
                          onChange={(e) => updateForm('lastName', e.target.value)}
                          placeholder="Seu sobrenome"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="email">E-mail *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={form.email}
                          onChange={(e) => updateForm('email', e.target.value)}
                          placeholder="seu@email.com"
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Telefone *</Label>
                        <Input
                          id="phone"
                          value={form.phone}
                          onChange={(e) => updateForm('phone', formatPhone(e.target.value))}
                          placeholder="(11) 99999-9999"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="cpf">CPF *</Label>
                      <Input
                        id="cpf"
                        value={form.cpf}
                        onChange={(e) => updateForm('cpf', formatCPF(e.target.value))}
                        placeholder="000.000.000-00"
                        maxLength={14}
                      />
                    </div>
                    
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-none">
                      <p className="text-sm text-blue-800">
                        <span className="font-medium">💡 Dica:</span> Ao finalizar a compra, uma conta será criada automaticamente com estes dados para facilitar suas próximas compras.
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
            
            {/* Endereço de Entrega */}
            <Card className="rounded-none">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Endereço de Entrega

                  {isLoggedIn && !form.street && (
                    <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                      Endereço Necessário
                    </span>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {isLoggedIn && form.street ? (
                  // Mostrar endereço como texto para usuários logados com endereço
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="md:col-span-2">
                        <Label className="text-sm font-medium text-gray-600">Rua</Label>
                        <p className="text-lg font-semibold text-gray-900">{form.street}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-600">Número</Label>
                        <p className="text-lg font-semibold text-gray-900">{form.number}</p>
                      </div>
                    </div>
                    
                    {form.complement && (
                      <div>
                        <Label className="text-sm font-medium text-gray-600">Complemento</Label>
                        <p className="text-lg font-semibold text-gray-900">{form.complement}</p>
                      </div>
                    )}
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm font-medium text-gray-600">Bairro</Label>
                        <p className="text-lg font-semibold text-gray-900">{form.neighborhood}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-600">Cidade</Label>
                        <p className="text-lg font-semibold text-gray-900">{form.city}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm font-medium text-gray-600">Estado</Label>
                        <p className="text-lg font-semibold text-gray-900">{form.state}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-600">CEP</Label>
                        <p className="text-lg font-semibold text-gray-900">{form.zipCode}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  // Formulário de endereço para usuários não logados ou sem endereço
                  <div className="space-y-4">
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-none">
                      <p className="text-sm text-blue-800">
                        <span className="font-medium">💡 Dica:</span> 
                        {isLoggedIn 
                          ? 'Preencha o CEP para buscar automaticamente seu endereço e calcular o frete.'
                          : 'Preencha o CEP para buscar automaticamente seu endereço e calcular o frete.'
                        }
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="zipCode">CEP *</Label>
                        <Input
                          id="zipCode"
                          value={form.zipCode}
                          onChange={(e) => updateForm('zipCode', formatCEP(e.target.value))}
                          placeholder="00000-000"
                          maxLength={9}
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          Digite o CEP para preencher automaticamente o endereço
                        </p>
                      </div>
                      <div>
                        <Label htmlFor="number">Número *</Label>
                        <Input
                          id="number"
                          value={form.number}
                          onChange={(e) => updateForm('number', e.target.value)}
                          placeholder="123"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="street">Rua *</Label>
                        <Input
                          id="street"
                          value={form.street}
                          onChange={(e) => updateForm('street', e.target.value)}
                          placeholder="Nome da rua"
                          readOnly={true}
                          className="bg-gray-100 cursor-not-allowed"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          Preenchido automaticamente pelo CEP
                        </p>
                      </div>
                      <div>
                        <Label htmlFor="neighborhood">Bairro *</Label>
                        <Input
                          id="neighborhood"
                          value={form.neighborhood}
                          onChange={(e) => updateForm('neighborhood', e.target.value)}
                          placeholder="Nome do bairro"
                          readOnly={true}
                          className="bg-gray-100 cursor-not-allowed"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          Preenchido automaticamente pelo CEP
                        </p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="city">Cidade *</Label>
                        <Input
                          id="city"
                          value={form.city}
                          onChange={(e) => updateForm('city', e.target.value)}
                          placeholder="Nome da cidade"
                          readOnly={true}
                          className="bg-gray-100 cursor-not-allowed"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          Preenchido automaticamente pelo CEP
                        </p>
                      </div>
                      <div>
                        <Label htmlFor="state">Estado *</Label>
                        <Input
                          id="state"
                          value={form.state}
                          placeholder="Estado"
                          readOnly={true}
                          className="bg-gray-100 cursor-not-allowed"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          Preenchido automaticamente pelo CEP
                        </p>
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="complement">Complemento</Label>
                      <Input
                        id="complement"
                        value={form.complement}
                        onChange={(e) => updateForm('complement', e.target.value)}
                        placeholder="Apartamento, bloco, etc."
                      />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
            
            {/* Método de Envio */}
            <Card className="rounded-none">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="w-5 h-5" />
                  Método de Envio
                </CardTitle>
              </CardHeader>
              <CardContent>
                {!form.zipCode || form.zipCode.replace(/\D/g, '').length < 8 ? (
                  <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-none">
                    <p className="text-sm text-yellow-800">
                      {isLoggedIn ? (
                        <>
                          {form.street ? 'Carregando seu endereço...' : 'Digite o CEP para buscar seu endereço e calcular as opções de frete disponíveis.'}
                        </>
                      ) : (
                        'Digite o CEP para buscar seu endereço e calcular as opções de frete disponíveis.'
                      )}
                    </p>
                  </div>
                ) : isCalculatingFreight ? (
                  <div className="p-4 flex items-center justify-center">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-black mr-3"></div>
                    <span className="text-sm text-gray-600">Calculando frete...</span>
                  </div>
                ) : freightOptions.length > 0 ? (
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-4 h-4 rounded-full border-2 border-green-500 bg-green-500" />
                        <div>
                          <p className="font-medium text-green-800">
                            Seu frete: {freightOptions[0].name}
                          </p>
                          <p className="text-sm text-green-600">
                            Vai chegar em {freightService.formatDeliveryTime(freightService.getValidDeliveryTime(freightOptions[0]))}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-green-800 text-lg">
                          {freightService.formatFreightPrice(freightService.getValidPrice(freightOptions[0]))}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-none">
                    <p className="text-sm text-red-800">
                      Nenhuma opção de frete disponível para este CEP.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
            
            {/* Termos e Condições */}
            <Card className="rounded-none">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="acceptTerms"
                      checked={form.acceptTerms}
                      onCheckedChange={(checked) => updateForm('acceptTerms', checked)}
                    />
                    <Label htmlFor="acceptTerms" className="text-sm">
                      Li e aceito os <a href="/termos-de-uso" className="text-black underline">Termos de Uso</a> e{' '}
                      <a href="/politica-privacidade" className="text-black underline">Política de Privacidade</a> *
                    </Label>
                  </div>
                  
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="acceptMarketing"
                      checked={form.acceptMarketing}
                      onCheckedChange={(checked) => updateForm('acceptMarketing', checked)}
                    />
                    <Label htmlFor="acceptMarketing" className="text-sm">
                      Aceito receber ofertas e novidades por e-mail
                    </Label>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Resumo do Pedido */}
          <div className="space-y-6">
            <Card className="rounded-none">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5" />
                  Resumo do Pedido
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center gap-3">
                      <div className="w-16 h-16 bg-gray-100 rounded-none flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover rounded-none"
                        />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm truncate">{item.name}</h4>
                        <p className="text-xs text-gray-600">
                          {item.type} • {item.color} • {item.size}
                        </p>
                        <p className="text-sm font-medium">
                          {formatPrice(item.price)}
                        </p>
                      </div>
                      
                      <div className="flex items-center gap-2 ">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          className="rounded-none"
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        
                        <span className="w-8 text-center text-sm">{item.quantity}</span>
                        
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="rounded-none"
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                        
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                
                <Separator className="my-4" />
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal ({getTotalItems()} {getTotalItems() === 1 ? 'item' : 'itens'})</span>
                    <span>{formatPrice(getTotalPrice())}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span>
                      Frete {selectedFreight ? `(${selectedFreight.name})` : ''}
                    </span>
                    <span>
                      {getShippingPrice() === 0 ? 'Grátis' : formatPrice(getShippingPrice())}
                    </span>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>{formatPrice(getTotal())}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Botão de Finalizar Compra */}
            <Button
              onClick={handleCheckout}
              disabled={isProcessing || !validateForm() || !selectedFreight}
              className="w-full h-12 text-lg font-semibold rounded-none"
            >
              {isProcessing ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Processando...
                </div>
              ) : !selectedFreight ? (
                <div className="flex items-center gap-2">
                  <Truck className="w-5 h-5" />
                  Calcule o frete primeiro
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Lock className="w-5 h-5" />
                  Finalizar Compra
                </div>
              )}
            </Button>
            
            {/* Segurança */}
            <div className="text-center text-sm text-gray-600">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Shield className="w-4 h-4" />
                <span>Compra 100% segura</span>
              </div>
              <p>Seus dados estão protegidos com criptografia SSL</p>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  )
}
