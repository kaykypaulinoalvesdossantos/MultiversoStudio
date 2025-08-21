"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Store,
  Palette,
  Package,
  TrendingUp,
  Users,
  DollarSign,
  Zap,
  Shield,
  Headphones,
  CheckCircle,
  Star,
  ArrowRight,
  MessageCircle,
  Play,
  Rocket,
  Globe,
  BarChart3,
  Calculator,
  Sparkles,
} from "lucide-react"
import { Navbar } from "@/components/navbar"
import Footer from "@/components/footer"

export default function ParaCriadoresPage() {
  const [selectedPlan, setSelectedPlan] = useState("com-investimento")

  const benefits = [
    {
      icon: Store,
      title: "Loja Personalizada",
      description: "Design único que representa sua marca e personalidade",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      icon: Package,
      title: "Produção Completa",
      description: "Cuidamos de toda a produção, estoque e logística",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      icon: TrendingUp,
      title: "Marketing Integrado",
      description: "Ferramentas para promover seus produtos e aumentar vendas",
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      icon: DollarSign,
      title: "Comissões Atrativas",
      description: "Ganhe até 30% de comissão em cada venda",
      color: "text-amber-600",
      bgColor: "bg-amber-50",
    },
  ]

  const howItWorks = [
    {
      step: "01",
      title: "Cadastre-se",
      description: "Preencha o formulário com suas informações e conte sobre seu canal/marca",
      icon: Users,
    },
    {
      step: "02",
      title: "Design da Loja",
      description: "Nossa equipe cria um design único baseado na sua identidade visual",
      icon: Palette,
    },
    {
      step: "03",
      title: "Produtos",
      description: "Escolha os produtos e designs que quer vender na sua loja",
      icon: Package,
    },
    {
      step: "04",
      title: "Lançamento",
      description: "Sua loja vai ao ar e você começa a vender para sua audiência",
      icon: Rocket,
    },
  ]

  const testimonials = [
    {
      name: "Sacocheio",
      channel: "Sacocheio.tv",
      avatar: "/placeholder.svg?height=80&width=80",
      followers: "1.8M",
      sales: "50K+",
      quote:
        "A Multiverso Estudio transformou minha relação com meus fãs. Agora posso oferecer produtos únicos que realmente representam meu conteúdo!",
      rating: 5,
    },
    {
      name: "GamerPro",
      channel: "Canal do Gamer",
      avatar: "/placeholder.svg?height=80&width=80",
      followers: "2.3M",
      sales: "75K+",
      quote:
        "Incrível como eles conseguiram capturar a essência do meu canal no design da loja. A qualidade dos produtos é excepcional!",
      rating: 5,
    },
    {
      name: "IndieVibes",
      channel: "Música Indie",
      avatar: "/placeholder.svg?height=80&width=80",
      followers: "950K",
      sales: "30K+",
      quote:
        "Finalmente encontrei uma plataforma que entende criadores de conteúdo. O suporte é incrível e as vendas superaram minhas expectativas!",
      rating: 5,
    },
  ]

  const features = [
    {
      icon: Palette,
      title: "Design Personalizado",
      description: "Cada loja é única, criada especialmente para sua marca",
    },
    {
      icon: Package,
      title: "Produção sob Demanda",
      description: "Produtos feitos apenas quando vendidos, sem estoque parado",
    },
    {
      icon: Shield,
      title: "Qualidade Garantida",
      description: "Materiais premium e controle de qualidade rigoroso",
    },
    {
      icon: Zap,
      title: "Entrega Rápida",
      description: "Produção e envio em até 5 dias úteis",
    },
    {
      icon: BarChart3,
      title: "Dashboard Completo",
      description: "Acompanhe vendas, comissões e performance em tempo real",
    },
    {
      icon: Headphones,
      title: "Suporte Dedicado",
      description: "Equipe especializada para ajudar criadores",
    },
  ]

  // Últimos lançamentos
  const latestReleases = [
    {
      id: 1,
      name: "Camiseta Cafézini Garganttinni",
      creator: "Sacocheio",
      price: 79.9,
      image: "/placeholder.svg?height=200&width=200",
      badge: "Novo",
      badgeColor: "bg-green-500",
    },
    {
      id: 2,
      name: "Kit Gamer RGB",
      creator: "Canal do Gamer",
      price: 139.9,
      image: "/placeholder.svg?height=200&width=200",
      badge: "Trending",
      badgeColor: "bg-blue-500",
    },
    {
      id: 3,
      name: "Caneca Filosofia",
      creator: "Monark",
      price: 49.9,
      image: "/placeholder.svg?height=200&width=200",
      badge: "Lançamento",
      badgeColor: "bg-purple-500",
    },
  ]

  // Cálculos de comissão
  const productPrices = [70, 120, 170, 250, 275, 300]
  const averagePrice = productPrices.reduce((a, b) => a + b, 0) / productPrices.length
  const averageSalesPerMonth = [100, 300, 500, 1000]

  const calculateEarnings = (sales: number, commission: number) => {
    return (averagePrice * sales * commission) / 100
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="py-12 md:py-20 pt-24 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <div>
              <Badge className="bg-amber-500 text-black mb-6 text-base md:text-lg px-4 py-2">
                <Star className="w-5 h-5 mr-2" />
                Plataforma #1 para Criadores
              </Badge>
              <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
                Transforme sua
                <span className="block text-transparent bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text">
                  Audiência em Vendas
                </span>
              </h1>
              <p className="text-lg md:text-xl text-gray-200 mb-8 leading-relaxed">
                Crie sua loja personalizada, venda produtos únicos e monetize seu conteúdo de forma profissional. Nós
                cuidamos de tudo: design, produção, estoque e entrega.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Button
                  size="lg"
                  className="bg-amber-600 hover:bg-amber-700 text-black font-bold px-6 md:px-8 py-3 md:py-4 text-base md:text-lg"
                >
                  <Rocket className="w-5 h-5 md:w-6 md:h-6 mr-2" />
                  Criar Minha Loja
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-purple-900 px-6 md:px-8 py-3 md:py-4 text-base md:text-lg bg-transparent"
                >
                  <Play className="w-5 h-5 md:w-6 md:h-6 mr-2" />
                  Ver Como Funciona
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-r from-amber-400 to-orange-500 p-1 rounded-2xl">
                <Image
                  src="/placeholder.svg?height=600&width=800"
                  alt="Dashboard do Criador"
                  width={800}
                  height={600}
                  className="rounded-xl object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white p-4 md:p-6 rounded-xl shadow-2xl">
                <div className="flex items-center space-x-4">
                  <div className="bg-green-100 p-3 rounded-full">
                    <DollarSign className="w-6 h-6 md:w-8 md:h-8 text-green-600" />
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Comissão Mensal</p>
                    <p className="text-xl md:text-2xl font-bold text-gray-900">R$ 15.847</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Por que escolher a Multiverso Estudio?</h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Oferecemos tudo que você precisa para criar uma loja de sucesso e focar no que faz de melhor: criar
              conteúdo
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon
              return (
                <Card key={index} className="text-center hover:shadow-xl transition-shadow duration-300">
                  <CardContent className="p-6 md:p-8">
                    <div
                      className={`${benefit.bgColor} p-4 rounded-full w-16 h-16 md:w-20 md:h-20 mx-auto mb-6 flex items-center justify-center`}
                    >
                      <IconComponent className={`w-8 h-8 md:w-10 md:h-10 ${benefit.color}`} />
                    </div>
                    <h3 className="text-lg md:text-xl font-bold mb-3">{benefit.title}</h3>
                    <p className="text-gray-600">{benefit.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-12 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Como Funciona</h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              Em apenas 4 passos simples, sua loja estará no ar e você começará a vender
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {howItWorks.map((step, index) => {
              const IconComponent = step.icon
              return (
                <div key={index} className="text-center relative">
                  <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4 md:p-6 rounded-full w-20 h-20 md:w-24 md:h-24 mx-auto mb-6 flex items-center justify-center">
                    <IconComponent className="w-8 h-8 md:w-12 md:h-12" />
                  </div>
                  <div className="absolute -top-2 -right-2 bg-amber-500 text-black font-bold text-sm px-3 py-1 rounded-full">
                    {step.step}
                  </div>
                  <h3 className="text-lg md:text-xl font-bold mb-3">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                  {index < howItWorks.length - 1 && (
                    <div className="hidden lg:block absolute top-12 -right-4 text-gray-300">
                      <ArrowRight className="w-8 h-8" />
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Recursos Exclusivos</h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              Tudo que você precisa para ter uma loja profissional e de sucesso
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon
              return (
                <Card key={index} className="hover:shadow-xl transition-all duration-300 group">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="bg-purple-100 p-3 rounded-lg group-hover:bg-purple-200 transition-colors">
                        <IconComponent className="w-6 h-6 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                        <p className="text-gray-600">{feature.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">O que nossos criadores dizem</h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              Histórias reais de criadores que transformaram suas audiências em negócios prósperos
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6 md:gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-6 md:p-8">
                  <div className="flex items-center space-x-4 mb-6">
                    <Image
                      src={testimonial.avatar || "/placeholder.svg"}
                      alt={testimonial.name}
                      width={60}
                      height={60}
                      className="rounded-full"
                    />
                    <div>
                      <h3 className="font-bold text-lg">{testimonial.name}</h3>
                      <p className="text-gray-600">{testimonial.channel}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                        <span>{testimonial.followers} seguidores</span>
                        <span>{testimonial.sales} vendas</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>

                  <p className="text-gray-700 italic">"{testimonial.quote}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-12 md:py-20 bg-gradient-to-r from-purple-900 to-blue-900 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Comissões Transparentes</h2>
            <p className="text-lg md:text-xl text-purple-100 max-w-2xl mx-auto">
              Escolha o modelo que melhor se adapta ao seu perfil. Você só paga quando vende!
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <Tabs value={selectedPlan} onValueChange={setSelectedPlan} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8 bg-white/10">
                <TabsTrigger
                  value="com-investimento"
                  className="text-white data-[state=active]:bg-white data-[state=active]:text-purple-900"
                >
                  Com Meu Investimento
                </TabsTrigger>
                <TabsTrigger
                  value="sem-investimento"
                  className="text-white data-[state=active]:bg-white data-[state=active]:text-purple-900"
                >
                  Sem Investimento
                </TabsTrigger>
              </TabsList>

              <TabsContent value="com-investimento">
                <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                  <CardContent className="p-8 md:p-12">
                    <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
                      <div>
                        <h3 className="text-2xl md:text-3xl font-bold mb-6 text-white">Com Seu Investimento</h3>
                        <div className="space-y-4 md:space-y-6 text-white">
                          <div className="flex items-center space-x-4">
                            <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0" />
                            <span className="text-base md:text-lg">Até 30% de comissão do lucro bruto das vendas</span>
                          </div>
                          <div className="flex items-center space-x-4">
                            <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0" />
                            <span className="text-base md:text-lg">Sem taxa de setup ou mensalidade</span>
                          </div>
                          <div className="flex items-center space-x-4">
                            <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0" />
                            <span className="text-base md:text-lg">Pagamentos semanais</span>
                          </div>
                          <div className="flex items-center space-x-4">
                            <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0" />
                            <span className="text-base md:text-lg">Dashboard completo de vendas</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="bg-gradient-to-r from-amber-400 to-orange-500 p-6 md:p-8 rounded-2xl text-black">
                          <div className="flex items-center justify-center space-x-2 mb-4">
                            <Calculator className="w-6 h-6" />
                            <h4 className="text-xl md:text-2xl font-bold">Exemplo de Ganhos (30%)</h4>
                          </div>
                          <div className="space-y-3">
                            {averageSalesPerMonth.map((sales) => (
                              <div key={sales} className="flex justify-between">
                                <span>{sales} vendas/mês</span>
                                <span className="font-bold">
                                  R$ {calculateEarnings(sales, 30).toLocaleString("pt-BR")}
                                </span>
                              </div>
                            ))}
                          </div>
                          <div className="mt-4 pt-3 border-t border-black/20">
                            <p className="text-sm">*Baseado no preço médio de R$ {averagePrice.toFixed(0)}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="sem-investimento">
                <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                  <CardContent className="p-8 md:p-12">
                    <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
                      <div>
                        <h3 className="text-2xl md:text-3xl font-bold mb-6 text-white">Sem Investimento</h3>
                        <div className="space-y-4 md:space-y-6 text-white">
                          <div className="flex items-center space-x-4">
                            <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0" />
                            <span className="text-base md:text-lg">Até 20% de comissão do lucro bruto das vendas</span>
                          </div>
                          <div className="flex items-center space-x-4">
                            <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0" />
                            <span className="text-base md:text-lg">Painel administrativo completo</span>
                          </div>
                          <div className="flex items-center space-x-4">
                            <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0" />
                            <span className="text-base md:text-lg">Acompanhamento de vendas em tempo real</span>
                          </div>
                          <div className="flex items-center space-x-4">
                            <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0" />
                            <span className="text-base md:text-lg">Foque apenas no marketing e divulgação</span>
                          </div>
                        </div>
                        <div className="mt-6 p-4 bg-amber-500/20 rounded-lg">
                          <p className="text-sm text-amber-200">
                            <strong>Observação:</strong> Uma parte do lucro será destinada a cobrir o investimento
                            inicial em produção e estoque.
                          </p>
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="bg-gradient-to-r from-blue-400 to-purple-500 p-6 md:p-8 rounded-2xl text-white">
                          <div className="flex items-center justify-center space-x-2 mb-4">
                            <Calculator className="w-6 h-6" />
                            <h4 className="text-xl md:text-2xl font-bold">Exemplo de Ganhos (20%)</h4>
                          </div>
                          <div className="space-y-3">
                            {averageSalesPerMonth.map((sales) => (
                              <div key={sales} className="flex justify-between">
                                <span>{sales} vendas/mês</span>
                                <span className="font-bold">
                                  R$ {calculateEarnings(sales, 20).toLocaleString("pt-BR")}
                                </span>
                              </div>
                            ))}
                          </div>
                          <div className="mt-4 pt-3 border-t border-white/20">
                            <p className="text-sm">*Baseado no preço médio de R$ {averagePrice.toFixed(0)}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-12 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Pronto para começar?</h2>
              <p className="text-lg md:text-xl text-gray-600">
                Preencha o formulário abaixo e nossa equipe entrará em contato em até 24 horas
              </p>
            </div>

            <Card className="shadow-2xl">
              <CardContent className="p-8 md:p-12">
                <form className="space-y-6 md:space-y-8">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Nome Completo *</label>
                      <Input placeholder="Seu nome completo" className="h-12" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">E-mail *</label>
                      <Input placeholder="seu@email.com" type="email" className="h-12" />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Canal/Marca *</label>
                      <Input placeholder="Nome do seu canal ou marca" className="h-12" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Seguidores *</label>
                      <Input placeholder="Número aproximado de seguidores" className="h-12" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Plataformas *</label>
                    <Input placeholder="YouTube, Instagram, TikTok, etc." className="h-12" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Conte sobre seu conteúdo *</label>
                    <Textarea
                      placeholder="Descreva o tipo de conteúdo que você cria, seu público-alvo e suas ideias para produtos..."
                      className="min-h-32"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Produtos de interesse</label>
                    <Textarea
                      placeholder="Que tipos de produtos você gostaria de vender? (camisetas, canecas, acessórios, etc.)"
                      className="min-h-24"
                    />
                  </div>

                  <div className="text-center">
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 px-8 md:px-12 py-3 md:py-4 text-base md:text-lg"
                    >
                      <Rocket className="w-5 h-5 md:w-6 md:h-6 mr-2" />
                      Enviar Proposta
                    </Button>
                    <p className="text-sm text-gray-500 mt-4">Responderemos em até 24 horas úteis</p>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-12 md:py-20 bg-gradient-to-r from-amber-600 to-orange-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Transforme sua paixão em negócio</h2>
          <p className="text-lg md:text-xl text-amber-100 mb-8 max-w-2xl mx-auto">
            Junte-se a centenas de criadores que já estão monetizando seu conteúdo de forma profissional
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Button
              size="lg"
              className="bg-black text-white hover:bg-gray-800 px-6 md:px-8 py-3 md:py-4 text-base md:text-lg"
            >
              <MessageCircle className="w-5 h-5 md:w-6 md:h-6 mr-2" />
              Falar com Especialista
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-orange-600 px-6 md:px-8 py-3 md:py-4 text-base md:text-lg bg-transparent"
            >
              <Globe className="w-5 h-5 md:w-6 md:h-6 mr-2" />
              Ver Lojas Exemplo
            </Button>
          </div>
        </div>
      </section>

      <Footer />

      {/* WhatsApp Float */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-green-500 hover:bg-green-600 shadow-2xl hover:scale-110 transition-all">
          <MessageCircle className="w-6 h-6 md:w-8 md:h-8 text-white" />
        </Button>
      </div>
    </div>
  )
}
