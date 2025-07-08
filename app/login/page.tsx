"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import {
  Eye,
  EyeOff,
  ArrowLeft,
  Mail,
  Lock,
  User,
  Phone,
  Calendar,
  Star,
  TrendingUp,
  Truck,
  Shield,
  Heart,
  ShoppingCart,
  Facebook,
  CircleUser,
} from "lucide-react"

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [isForgotPassword, setIsForgotPassword] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const featuredProducts = [
    {
      id: 1,
      name: "Camiseta Cafézini Garganttinni",
      price: 79.9,
      originalPrice: 99.9,
      image: "/placeholder.svg?height=300&width=300",
      store: "Sacocheio.tv",
      rating: 4.8,
      badge: "🔥 Lançamento",
    },
    {
      id: 2,
      name: "Kit Gamer Pro RGB",
      price: 139.9,
      originalPrice: 179.9,
      image: "/placeholder.svg?height=300&width=300",
      store: "Canal do Gamer",
      rating: 4.9,
      badge: "🎮 Gaming",
    },
    {
      id: 3,
      name: "Caneca Noir Terror",
      price: 55.9,
      originalPrice: 69.9,
      image: "/placeholder.svg?height=300&width=300",
      store: "Cinemagrath",
      rating: 4.7,
      badge: "🎬 Cinema",
    },
  ]

  const benefits = [
    {
      icon: Truck,
      title: "Frete Grátis",
      description: "Acima de R$ 300",
    },
    {
      icon: Shield,
      title: "Compra Segura",
      description: "100% protegida",
    },
    {
      icon: TrendingUp,
      title: "Produtos Únicos",
      description: "De criadores exclusivos",
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-black text-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3">
              <Image
                src="/logo-luneta.webp"
                alt="Multiverso Studio"
                width={40}
                height={30}
                className="object-contain brightness-0 invert"
              />
              <div>
                <h1 className="text-xl font-bold">MULTIVERSO STUDIO</h1>
                <p className="text-xs text-gray-400">Lojas dentro de lojas</p>
              </div>
            </Link>
            <Link href="/">
              <Button variant="ghost" className="text-white hover:text-gray-300">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar à Loja
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Side - Promoções e Produtos */}
          <div className="space-y-8 lg:order-1 order-2">
            {/* Welcome Message */}
            <div className="text-center lg:text-left">
              <h2 className="text-4xl font-bold text-black mb-4">
                {isLogin ? "Bem-vindo de volta!" : "Junte-se a nós!"}
              </h2>
              <p className="text-xl text-gray-600">
                {isLogin
                  ? "Acesse sua conta e continue explorando produtos únicos de seus criadores favoritos"
                  : "Crie sua conta e descubra um universo de produtos exclusivos"}
              </p>
            </div>

            {/* Benefits */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {benefits.map((benefit, index) => {
                const IconComponent = benefit.icon
                return (
                  <Card key={index} className="text-center hover:shadow-lg transition-shadow border border-gray-200">
                    <CardContent className="p-6">
                      <div className="bg-gray-100 p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                        <IconComponent className="w-8 h-8 text-gray-600" />
                      </div>
                      <h3 className="font-bold text-black mb-2">{benefit.title}</h3>
                      <p className="text-sm text-gray-600">{benefit.description}</p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            {/* Featured Products */}
            <div>
              <h3 className="text-2xl font-bold text-black mb-6">Produtos em Destaque</h3>
              <div className="space-y-4">
                {featuredProducts.map((product) => (
                  <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow border border-gray-200">
                    <CardContent className="p-0">
                      <div className="flex items-center space-x-4 p-4">
                        <div className="relative w-20 h-20 flex-shrink-0">
                          <Image
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            fill
                            className="object-cover rounded-lg"
                          />
                          <Badge className="absolute -top-2 -right-2 text-xs bg-red-500 text-white">
                            {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                          </Badge>
                        </div>
                        <div className="flex-1">
                          <Badge variant="outline" className="text-xs mb-2">
                            {product.badge}
                          </Badge>
                          <h4 className="font-semibold text-black mb-1 line-clamp-1">{product.name}</h4>
                          <p className="text-sm text-gray-600 mb-2">{product.store}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <span className="text-lg font-bold text-green-600">R$ {product.price.toFixed(2)}</span>
                              <span className="text-sm text-gray-500 line-through">
                                R$ {product.originalPrice.toFixed(2)}
                              </span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              <span className="text-sm font-medium">{product.rating}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col space-y-2">
                          <Button size="icon" variant="outline" className="w-8 h-8 bg-transparent">
                            <Heart className="w-4 h-4" />
                          </Button>
                          <Button size="icon" variant="outline" className="w-8 h-8 bg-transparent">
                            <ShoppingCart className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Promotional Banner */}
            <Card className="bg-gradient-to-r from-purple-600 to-blue-600 text-white overflow-hidden">
              <CardContent className="p-8">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Oferta Especial!</h3>
                    <p className="text-purple-100 mb-4">Ganhe 20% de desconto na primeira compra ao criar sua conta</p>
                    <Badge className="bg-amber-500 text-black">Código: BEMVINDO20</Badge>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold">20%</div>
                    <div className="text-sm text-purple-200">de desconto</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Side - Login/Register Form */}
          <div className="lg:sticky lg:top-8 lg:order-2 order-1">
            <Card className="shadow-2xl border border-gray-200">
              <CardContent className="p-8">
                {/* Form Header */}
                <div className="text-center mb-8">
                  <h3 className="text-3xl font-bold text-black mb-2">
                    {isForgotPassword ? "Recuperar Senha" : isLogin ? "Entrar" : "Criar Conta"}
                  </h3>
                  <p className="text-gray-600">
                    {isForgotPassword
                      ? "Digite seu e-mail para receber as instruções"
                      : isLogin
                        ? "Entre na sua conta para continuar"
                        : "Preencha os dados para criar sua conta"}
                  </p>
                </div>

                {/* Forgot Password Form */}
                {isForgotPassword ? (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">E-mail</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <Input type="email" placeholder="seu@email.com" className="pl-10 h-12" />
                      </div>
                    </div>

                    <Button className="w-full h-12 bg-black hover:bg-gray-800 text-lg">
                      Enviar Instruções
                    </Button>

                    <div className="text-center">
                      <Button
                        variant="ghost"
                        onClick={() => setIsForgotPassword(false)}
                        className="text-black hover:text-gray-700"
                      >
                        Voltar ao login
                      </Button>
                    </div>
                  </div>
                ) : (
                  /* Login/Register Form */
                  <div className="space-y-6">
                    {/* Name field (only for register) */}
                    {!isLogin && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Nome Completo</label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                          <Input type="text" placeholder="Seu nome completo" className="pl-10 h-12" />
                        </div>
                      </div>
                    )}

                    {/* Phone field (only for register) */}
                    {!isLogin && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Telefone</label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                          <Input type="tel" placeholder="(11) 99999-9999" className="pl-10 h-12" />
                        </div>
                      </div>
                    )}

                    {/* Email field */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">E-mail</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <Input type="email" placeholder="seu@email.com" className="pl-10 h-12" />
                      </div>
                    </div>

                    {/* Password field */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Senha</label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          className="pl-10 pr-10 h-12"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-2 top-1/2 transform -translate-y-1/2"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </Button>
                      </div>
                    </div>

                    {/* Confirm Password field (only for register) */}
                    {!isLogin && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Confirmar Senha</label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                          <Input
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="••••••••"
                            className="pl-10 pr-10 h-12"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-2 top-1/2 transform -translate-y-1/2"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          >
                            {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </Button>
                        </div>
                      </div>
                    )}

                    {/* Birth Date field (only for register) */}
                    {!isLogin && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Data de Nascimento</label>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                          <Input type="date" className="pl-10 h-12" />
                        </div>
                      </div>
                    )}

                    {/* Remember me / Terms (conditional) */}
                    <div className="flex items-center justify-between">
                      {isLogin ? (
                        <label className="flex items-center space-x-2">
                          <input type="checkbox" className="rounded border-gray-300" />
                          <span className="text-sm text-gray-600">Lembrar de mim</span>
                        </label>
                      ) : (
                        <label className="flex items-start space-x-2">
                          <input type="checkbox" className="rounded border-gray-300 mt-1" />
                          <span className="text-sm text-gray-600">
                            Aceito os{" "}
                            <Link href="/termos" className="text-black hover:underline">
                              Termos de Uso
                            </Link>{" "}
                            e{" "}
                            <Link href="/privacidade" className="text-black hover:underline">
                              Política de Privacidade
                            </Link>
                          </span>
                        </label>
                      )}

                      {isLogin && (
                        <Button
                          variant="ghost"
                          onClick={() => setIsForgotPassword(true)}
                          className="text-black hover:text-gray-700 p-0"
                        >
                          Esqueci minha senha
                        </Button>
                      )}
                    </div>

                    {/* Submit Button */}
                    <Button className="w-full h-12 bg-black hover:bg-gray-800 text-lg">
                      {isLogin ? "Entrar" : "Criar Conta"}
                    </Button>

                    {/* Divider */}
                    <div className="relative">
                      <Separator />
                      <span className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-4 text-sm text-gray-500">
                        ou
                      </span>
                    </div>

                    {/* Social Login */}
                    <div className="space-y-3">
                      <Button variant="outline" className="w-full h-12 bg-transparent flex items-center justify-center gap-3">
                        <CircleUser className="w-5 h-5 text-blue-500" />
                        Continuar com Google
                      </Button>
                      <Button variant="outline" className="w-full h-12 bg-transparent flex items-center justify-center gap-3">
                        <Facebook className="w-5 h-5 text-blue-700" />
                        Continuar com Facebook
                      </Button>
                    </div>

                    {/* Switch between Login/Register */}
                    <div className="text-center">
                      <p className="text-gray-600">
                        {isLogin ? "Não tem uma conta?" : "Já tem uma conta?"}{" "}
                        <Button
                          variant="ghost"
                          onClick={() => setIsLogin(!isLogin)}
                          className="text-black hover:text-gray-700 p-0 font-semibold"
                        >
                          {isLogin ? "Criar conta" : "Fazer login"}
                        </Button>
                      </p>
                    </div>
                  </div>
                )}

                {/* Benefits for new users */}
                {!isLogin && !isForgotPassword && (
                  <div className="mt-8 p-6 bg-gray-50 rounded-lg">
                    <h4 className="font-bold text-black mb-3">Vantagens de ter uma conta:</h4>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-black rounded-full" />
                        <span>Acompanhe seus pedidos em tempo real</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-black rounded-full" />
                        <span>Histórico completo de compras</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-black rounded-full" />
                        <span>Ofertas exclusivas e antecipadas</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-black rounded-full" />
                        <span>Checkout mais rápido</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-black rounded-full" />
                        <span>Lista de desejos personalizada</span>
                      </li>
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
