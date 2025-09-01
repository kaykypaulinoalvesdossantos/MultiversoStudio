"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { useCustomerAuth } from "@/hooks/use-customer-auth"
import { useCart } from "@/contexts/cart-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import {
  User,
  ShoppingCart,
  Heart,
  Package,
  CreditCard,
  Wallet,
  Receipt,
  Key,
  Gift,
  Ticket,
  Star,
  MapPin,
  Bell,
  Shield,
  HelpCircle,
  LogOut,
  Edit,
  Plus,
  Trash2,
  Eye,
  EyeOff,
  Calendar,
  Menu,
  X,
  Minus
} from "lucide-react"

export default function PerfilPage() {
  const router = useRouter()
  const { customer, logout, isLoading } = useCustomerAuth()
  const cartContext = useCart()
  const cartItems = cartContext?.cartItems || []
  const removeFromCart = cartContext?.removeFromCart || (() => {})
  const updateQuantity = cartContext?.updateQuantity || (() => {})
  const getTotalPrice = cartContext?.getTotalPrice || (() => 0)
  const [activeSection, setActiveSection] = useState("mochila")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Estados para formulários
  const [profileData, setProfileData] = useState({
    name: customer?.name || "",
    email: customer?.email || "",
    phone: customer?.phone || "",
    cpf: customer?.cpf || ""
  })

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  })

  const [addressData, setAddressData] = useState({
    street: "",
    number: "",
    neighborhood: "",
    city: "",
    state: "",
    zipCode: "",
    complement: ""
  })

  // Função para fazer logout
  const handleLogout = () => {
    logout()
    router.push("/")
  }

  // Função para fechar menu mobile
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  // Função para renderizar conteúdo baseado na seção ativa
  const renderContent = () => {
    switch (activeSection) {
      case "mochila":
        return (
          <div className="space-y-4 lg:space-y-6">
            <Card className="border-gray-200 rounded-none">
              <CardContent className="p-4 lg:p-6 rounded-none">
                <h3 className="text-lg font-semibold mb-4">Meu Carrinho</h3>
                
                {!cartItems || cartItems.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <ShoppingCart className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                    <p className="text-lg font-medium mb-2">Seu carrinho está vazio</p>
                    <p className="text-sm">Adicione produtos para começar a comprar</p>
                    <Button 
                      onClick={() => router.push("/")}
                      className="mt-4 bg-black hover:bg-gray-800 rounded-none"
                    >
                      Continuar Comprando
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cartItems && cartItems.map((item) => (
                      <div key={item.id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-none">
                        <div className="w-16 h-16 bg-gray-100 flex items-center justify-center flex-shrink-0 rounded-none">
                          <Package className="w-8 h-8 text-gray-400" />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-gray-900 truncate">{item.name}</h4>
                          <p className="text-sm text-gray-500">Quantidade: {item.quantity}</p>
                          <p className="text-lg font-semibold text-green-600">
                            R$ {(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                            className="border-gray-300 rounded-none"
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                          
                          <span className="w-8 text-center">{item.quantity}</span>
                          
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="border-gray-300 rounded-none"
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                          
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => removeFromCart(item.id)}
                            className="border-red-300 text-red-600 hover:bg-red-50 rounded-none"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                    
                    <Separator />
                    
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-lg font-semibold">Total:</p>
                        <p className="text-2xl font-bold text-green-600">
                          R$ {(getTotalPrice ? getTotalPrice() : 0).toFixed(2)}
                        </p>
                      </div>
                      
                      <Button 
                        className="bg-black hover:bg-gray-800 rounded-none px-8"
                        onClick={() => router.push("/checkout")}
                      >
                        Finalizar Compra
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )

      case "favoritos":
        return (
          <div className="space-y-4 lg:space-y-6">
            <Card className="border-gray-200 rounded-none">
              <CardContent className="p-4 lg:p-6 rounded-none">
                <h3 className="text-lg font-semibold mb-4">Meus Produtos Favoritos</h3>
                <div className="text-center py-8 text-gray-500">
                  <Heart className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                  <p className="text-lg font-medium mb-2">Nenhum produto favoritado</p>
                  <p className="text-sm">Adicione produtos aos favoritos para vê-los aqui</p>
                  <Button 
                    onClick={() => router.push("/")}
                    className="mt-4 bg-black hover:bg-gray-800 rounded-none"
                  >
                    Explorar Produtos
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )

      case "pedidos":
        return (
          <div className="text-center py-8 lg:py-12">
            <div className="w-24 h-24 lg:w-32 lg:h-32 mx-auto mb-4 lg:mb-6 bg-gray-100 flex items-center justify-center rounded-none">
              <ShoppingCart className="w-12 h-12 lg:w-16 lg:h-16 text-gray-400" />
            </div>
            <h3 className="text-lg lg:text-xl font-semibold text-gray-700 mb-2">Nenhum pedido encontrado no momento</h3>
            <p className="text-sm lg:text-base text-gray-500 px-4">Quando você fizer suas primeiras compras, elas aparecerão aqui.</p>
          </div>
        )

      case "beneficios":
        return (
          <div className="space-y-4 lg:space-y-6">
            <Card className="border-gray-200 rounded-none">
              <CardContent className="p-4 lg:p-6 rounded-none">
                <h3 className="text-lg font-semibold mb-4">Cashback</h3>
                <div className="bg-gray-50 p-4 rounded-none mb-4">
                  <p className="text-2xl font-bold text-green-600">R$ 0,00</p>
                  <p className="text-gray-600">Cashback disponível para resgate</p>
                </div>
                <Button className="w-full bg-black hover:bg-gray-800 rounded-none">
                  Resgatar Cashback
                </Button>
              </CardContent>
            </Card>

            <Card className="border-gray-200 rounded-none">
              <CardContent className="p-4 lg:p-6 rounded-none">
                <h3 className="text-lg font-semibold mb-4">Meus Cupons</h3>
                <div className="text-center py-6 lg:py-8 text-gray-500">
                  <Ticket className="w-10 h-10 lg:w-12 lg:h-12 mx-auto mb-3 text-gray-300" />
                  <p>Nenhum cupom disponível no momento</p>
                </div>
                <Button variant="outline" className="w-full border-gray-300 rounded-none">
                  Ver Cupons Disponíveis
                </Button>
              </CardContent>
            </Card>

            <Card className="border-gray-200 rounded-none">
              <CardContent className="p-4 lg:p-6 rounded-none">
                <h3 className="text-lg font-semibold mb-4">Programa de Fidelidade</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Pontos Atuais</span>
                    <span className="text-2xl font-bold text-blue-600">0 pts</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-none h-2">
                    <div className="bg-blue-600 h-2 rounded-none" style={{ width: '0%' }}></div>
                  </div>
                  <p className="text-sm text-gray-600">0 pontos para o próximo nível</p>
                  <Button variant="outline" className="w-full border-gray-300 rounded-none">
                    Ver Benefícios
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )

      case "configuracoes":
        return (
          <div className="space-y-4 lg:space-y-6">


            <Card className="border-gray-200 rounded-none">
              <CardContent className="p-4 lg:p-6 rounded-none">
                <h3 className="text-lg font-semibold mb-4">Notificações</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">E-mails promocionais</span>
                    <Button variant="outline" size="sm" className="border-gray-300 rounded-none">
                      Ativado
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Notificações de pedidos</span>
                    <Button variant="outline" size="sm" className="border-gray-300 rounded-none">
                      Ativado
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Ofertas especiais</span>
                    <Button variant="outline" size="sm" className="border-gray-300 rounded-none">
                      Desativado
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-gray-200 rounded-none">
              <CardContent className="p-4 lg:p-6 rounded-none">
                <h3 className="text-lg font-semibold mb-4">Segurança e Senha</h3>
                <div className="space-y-4">
                  <Button variant="outline" className="w-full border-gray-300 rounded-none">
                    <Shield className="w-4 h-4 mr-2" />
                    Alterar Senha
                  </Button>
                  <Button variant="outline" className="w-full border-gray-300 rounded-none">
                    <Shield className="w-4 h-4 mr-2" />
                    Autenticação em Duas Etapas
                  </Button>

                </div>
              </CardContent>
            </Card>

            <Card className="border-gray-200 rounded-none">
              <CardContent className="p-4 lg:p-6 rounded-none">
                <h3 className="text-lg font-semibold mb-4">Ajuda e Suporte</h3>
                <div className="space-y-3">
                  <Button 
                    variant="outline" 
                    className="w-full border-gray-300 rounded-none"
                    onClick={() => router.push("/duvidas")}
                  >
                    <HelpCircle className="w-4 h-4 mr-2" />
                    Central de Ajuda
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full border-gray-300 rounded-none"
                    onClick={() => router.push("/duvidas")}
                  >
                    <HelpCircle className="w-4 h-4 mr-2" />
                    Fale Conosco
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full border-gray-300 rounded-none"
                    onClick={() => router.push("/duvidas")}
                  >
                    <HelpCircle className="w-4 h-4 mr-2" />
                    FAQ
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )

      case "dados":
        return (
          <div className="space-y-4 lg:space-y-6">
            <Card className="border-gray-200 rounded-none">
              <CardContent className="p-4 lg:p-6 rounded-none">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
                  <h3 className="text-lg font-semibold">Meus Dados</h3>
                  <Button variant="outline" className="border-gray-300 w-full sm:w-auto rounded-none">
                    <Edit className="w-4 h-4 mr-2" />
                    Editar
                  </Button>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nome Completo</label>
                    <Input 
                      value={profileData.name}
                      onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                      className="border-gray-300 rounded-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">E-mail</label>
                    <Input 
                      value={profileData.email}
                      onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                      className="border-gray-300 rounded-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Telefone</label>
                    <Input 
                      value={profileData.phone}
                      onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                      className="border-gray-300 rounded-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">CPF</label>
                    <Input 
                      value={profileData.cpf}
                      onChange={(e) => setProfileData(prev => ({ ...prev, cpf: e.target.value }))}
                      className="border-gray-300 rounded-none"
                    />
                  </div>
                </div>
                <div className="mt-6">
                  <Button className="w-full bg-black hover:bg-gray-800 rounded-none">
                    Salvar Alterações
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )

      case "enderecos":
        return (
          <div className="space-y-4 lg:space-y-6">
            <Card className="border-gray-200 rounded-none">
              <CardContent className="p-4 lg:p-6 rounded-none">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
                  <h3 className="text-lg font-semibold">Meus Endereços</h3>
                  <Button variant="outline" className="border-gray-300 w-full sm:w-auto rounded-none">
                    <Plus className="w-4 h-4 mr-2" />
                    Adicionar Endereço
                  </Button>
                </div>
                <div className="text-center py-6 lg:py-8 text-gray-500">
                  <MapPin className="w-10 h-10 lg:w-12 lg:h-12 mx-auto mb-3 text-gray-300" />
                  <p>Nenhum endereço cadastrado</p>
                </div>
              </CardContent>
            </Card>
          </div>
        )

      default:
        return null
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="container mx-auto px-4 py-12 pt-32">
          <div className="text-center">
            <p>Carregando...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!customer) {
    router.push("/login")
    return null
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="container mx-auto px-4 py-8 lg:py-12 pt-24">
        {/* Header Mobile com Botão de Menu */}
        <div className="lg:hidden flex items-center justify-between mb-8 ">
          <div>
            <h1 className="text-2xl font-bold text-black">
              {activeSection === "mochila" && "Minha Mochila"}
              {activeSection === "favoritos" && "Meus Favoritos"}
              {activeSection === "pedidos" && "Meus pedidos"}
              {activeSection === "beneficios" && "Benefícios"}
              {activeSection === "configuracoes" && "Configurações"}
              {activeSection === "dados" && "Meus dados"}
              {activeSection === "enderecos" && "Meus endereços"}
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              {activeSection === "mochila" && "Gerencie seu carrinho de compras"}
              {activeSection === "favoritos" && "Seus produtos favoritados"}
              {activeSection === "pedidos" && "Acompanhe todos os seus pedidos e compras"}
              {activeSection === "beneficios" && "Aproveite seus benefícios e vantagens"}
              {activeSection === "configuracoes" && "Configure sua conta e preferências"}
              {activeSection === "dados" && "Atualize suas informações pessoais"}
              {activeSection === "enderecos" && "Gerencie seus endereços de entrega"}
            </p>
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="border-gray-300 rounded-none"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 pt-14">
          {/* Menu Lateral - Mobile Overlay */}
          {isMobileMenuOpen && (
            <div className="lg:hidden fixed left-0 top-32 right-0 bottom-0 bg-black bg-opacity-50 z-30" onClick={closeMobileMenu} />
          )}
          
          {/* Menu Lateral Esquerdo */}
          <div className={`lg:w-80 flex-shrink-0 ${
            isMobileMenuOpen 
              ? 'fixed left-0 top-32 h-full w-80 bg-white z-40 transform translate-x-0 transition-transform duration-300 ease-in-out shadow-2xl' 
              : 'fixed left-0 top-32 h-full w-80 bg-white z-40 transform -translate-x-full transition-transform duration-300 ease-in-out lg:relative lg:transform-none lg:shadow-none lg:top-0'
          }`}>
            <Card className="border-gray-200 h-full lg:sticky lg:top-12 rounded-none">
              <CardContent className="p-4 lg:p-6 h-full rounded-none">
                {/* Header Mobile */}
                <div className="lg:hidden flex items-center justify-between mb-4 pb-3 border-b border-gray-200">
                  <h2 className="text-lg font-semibold">Menu</h2>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={closeMobileMenu}
                    className="p-1"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>

                {/* Informações do Usuário */}
                <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-gray-200">
                  <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gray-100 flex items-center justify-center rounded-none">
                    <User className="w-5 h-5 lg:w-6 lg:h-6 text-gray-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-black text-sm lg:text-base truncate">Bem vindo, {customer.name}</p>
                    <p className="text-xs lg:text-sm text-gray-600 truncate">{customer.email}</p>
                  </div>
                </div>

                {/* Menu de Navegação */}
                <nav className="space-y-1 lg:space-y-2">
                  <button
                    onClick={() => {
                      setActiveSection("mochila")
                      closeMobileMenu()
                    }}
                    className={`w-full flex items-center space-x-3 px-3 py-2 lg:py-3 text-left transition-colors text-sm lg:text-base ${
                      activeSection === "mochila" 
                        ? "bg-black text-white" 
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <ShoppingCart className="w-4 h-4 lg:w-5 lg:h-5" />
                    <span>Minha Mochila</span>
                  </button>

                  <button
                    onClick={() => {
                      setActiveSection("favoritos")
                      closeMobileMenu()
                    }}
                    className={`w-full flex items-center space-x-3 px-3 py-2 lg:py-3 text-left transition-colors text-sm lg:text-base ${
                      activeSection === "favoritos" 
                        ? "bg-black text-white" 
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <Heart className="w-4 h-4 lg:w-5 lg:h-5" />
                    <span>Meus Favoritos</span>
                  </button>

                  <button
                    onClick={() => {
                      setActiveSection("pedidos")
                      closeMobileMenu()
                    }}
                    className={`w-full flex items-center space-x-3 px-3 py-2 lg:py-3 text-left transition-colors text-sm lg:text-base ${
                      activeSection === "pedidos" 
                        ? "bg-black text-white" 
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <Package className="w-4 h-4 lg:w-5 lg:h-5" />
                    <span>Meus pedidos</span>
                  </button>

                  <button
                    onClick={() => {
                      setActiveSection("beneficios")
                      closeMobileMenu()
                    }}
                    className={`w-full flex items-center space-x-3 px-3 py-2 lg:py-3 text-left transition-colors text-sm lg:text-base ${
                      activeSection === "beneficios" 
                        ? "bg-black text-white" 
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <Gift className="w-4 h-4 lg:w-5 lg:h-5" />
                    <span>Benefícios</span>
                  </button>

                  <button
                    onClick={() => {
                      setActiveSection("dados")
                      closeMobileMenu()
                    }}
                    className={`w-full flex items-center space-x-3 px-3 py-2 lg:py-3 text-left transition-colors text-sm lg:text-base ${
                      activeSection === "dados" 
                        ? "bg-black text-white" 
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <User className="w-4 h-4 lg:w-5 lg:h-5" />
                    <span>Meus dados</span>
                  </button>

                  <button
                    onClick={() => {
                      setActiveSection("enderecos")
                      closeMobileMenu()
                    }}
                    className={`w-full flex items-center space-x-3 px-3 py-2 lg:py-3 text-left transition-colors text-sm lg:text-base ${
                      activeSection === "enderecos" 
                        ? "bg-black text-white" 
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <MapPin className="w-4 h-4 lg:w-5 lg:h-5" />
                    <span>Meus endereços</span>
                  </button>

                  <button
                    onClick={() => {
                      setActiveSection("configuracoes")
                      closeMobileMenu()
                    }}
                    className={`w-full flex items-center space-x-3 px-3 py-2 lg:py-3 text-left transition-colors text-sm lg:text-base ${
                      activeSection === "configuracoes" 
                        ? "bg-black text-white" 
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <Shield className="w-4 h-4 lg:w-5 lg:h-5" />
                    <span>Configurações</span>
                  </button>

                  <Separator className="my-3 lg:my-4" />

                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center space-x-3 px-3 py-2 lg:py-3 text-left text-red-600 hover:bg-red-50 transition-colors text-sm lg:text-base"
                  >
                    <LogOut className="w-4 h-4 lg:w-5 lg:h-5" />
                    <span>Sair</span>
                  </button>
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Conteúdo Principal */}
          <div className="flex-1">
            {/* Header Desktop */}
            <div className="hidden lg:block mb-8">
              <h1 className="text-3xl font-bold text-black">
                {activeSection === "mochila" && "Minha Mochila"}
                {activeSection === "favoritos" && "Meus Favoritos"}
                {activeSection === "pedidos" && "Meus pedidos"}
                {activeSection === "beneficios" && "Benefícios"}
                {activeSection === "configuracoes" && "Configurações"}
                {activeSection === "dados" && "Meus dados"}
                {activeSection === "enderecos" && "Meus endereços"}
              </h1>
              <p className="text-gray-600 mt-2">
                {activeSection === "mochila" && "Gerencie seu carrinho de compras"}
                {activeSection === "favoritos" && "Seus produtos favoritados"}
                {activeSection === "pedidos" && "Acompanhe todos os seus pedidos e compras"}
                {activeSection === "beneficios" && "Aproveite seus benefícios e vantagens"}
                {activeSection === "configuracoes" && "Configure sua conta e preferências"}
                {activeSection === "dados" && "Atualize suas informações pessoais"}
                {activeSection === "enderecos" && "Gerencie seus endereços de entrega"}
              </p>
            </div>

            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  )
}
