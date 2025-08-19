"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  ArrowLeft,
  ArrowRight,
  Upload,
  Palette,
  Type,
  ImageIcon,
  Shirt,
  Coffee,
  Package,
  Check,
  Calculator,
  User,
  Minus,
  Plus,
  MessageCircle,
} from "lucide-react"
import { Navbar } from "@/components/navbar"
import Footer from "@/components/footer"

export default function PersonalizarPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    // Etapa 1: Produto
    productType: "",
    quantity: 1,
    sizes: [],
    colors: [],

    // Etapa 2: Design
    designType: "",
    logoFile: null,
    designDescription: "",
    designColors: "",
    style: "",

    // Etapa 3: Detalhes
    productName: "",
    specialInstructions: "",
    deadline: "",
    budget: "",

    // Etapa 4: Informações Pessoais
    name: "",
    email: "",
    phone: "",
    company: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
  })

  const [estimatedPrice, setEstimatedPrice] = useState(0)

  const steps = [
    { number: 1, title: "Produto", icon: Package },
    { number: 2, title: "Design", icon: Palette },
    { number: 3, title: "Detalhes", icon: Type },
    { number: 4, title: "Informações", icon: User },
  ]

  const productTypes = [
    {
      id: "camiseta",
      name: "Camiseta",
      icon: Shirt,
      basePrice: 45,
      image: "/placeholder.svg?height=200&width=200",
      description: "Camiseta 100% algodão, várias cores disponíveis",
    },
    {
      id: "caneca",
      name: "Caneca",
      icon: Coffee,
      basePrice: 35,
      image: "/placeholder.svg?height=200&width=200",
      description: "Caneca de cerâmica branca, 325ml",
    },
    {
      id: "kit",
      name: "Kit Personalizado",
      icon: Package,
      basePrice: 75,
      image: "/placeholder.svg?height=200&width=200",
      description: "Kit com camiseta + caneca personalizada",
    },
  ]

  const designTypes = [
    {
      id: "logo",
      name: "Logo/Marca",
      icon: ImageIcon,
      description: "Aplicação de logo ou marca existente",
      price: 0,
    },
    {
      id: "ilustracao",
      name: "Ilustração Custom",
      icon: Palette,
      description: "Criação de ilustração personalizada",
      price: 50,
    },
    {
      id: "tipografia",
      name: "Tipografia",
      icon: Type,
      description: "Design baseado em texto e tipografia",
      price: 25,
    },
  ]

  const availableSizes = ["PP", "P", "M", "G", "GG", "XG"]
  const availableColors = ["Branco", "Preto", "Cinza", "Azul", "Vermelho", "Verde"]

  const calculatePrice = () => {
    let price = 0
    const selectedProduct = productTypes.find((p) => p.id === formData.productType)
    const selectedDesign = designTypes.find((d) => d.id === formData.designType)

    if (selectedProduct) {
      price += selectedProduct.basePrice * formData.quantity
    }

    if (selectedDesign) {
      price += selectedDesign.price
    }

    // Adicional por tamanhos extras
    if (formData.sizes.includes("XG")) {
      price += 5 * formData.quantity
    }

    setEstimatedPrice(price)
  }

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
      calculatePrice()
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = () => {
    console.log("Formulário enviado:", formData)
    // Aqui você enviaria os dados para o backend
    alert("Solicitação de personalização enviada com sucesso! Entraremos em contato em breve.")
  }

  const updateFormData = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Progress Steps */}
      <div className="bg-gray-50 py-6 md:py-8 pt-20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center space-x-4 md:space-x-8">
            {steps.map((step, index) => {
              const IconComponent = step.icon
              return (
                <div key={step.number} className="flex items-center gap-2 justify-center">
                  <div
                    className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center border-2 transition-colors ${
                      currentStep >= step.number
                        ? "bg-amber-500 border-amber-500 text-white"
                        : "bg-white border-gray-300 text-gray-400"
                    }`}
                  >
                    {currentStep > step.number ? (
                      <Check className="w-5 h-5 md:w-6 md:h-6" />
                    ) : (
                      <IconComponent className="w-5 h-5 md:w-6 md:h-6" />
                    )}
                  </div>
                  <div className="text-center ml-2 md:ml-0 md:mt-2">
                    <p
                      className={`font-semibold text-sm md:text-base ${currentStep >= step.number ? "text-amber-600" : "text-gray-400"}`}
                    >
                      {step.title}
                    </p>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`w-8 md:w-16 h-0.5 mx-2 md:mx-4 ${currentStep > step.number ? "bg-amber-500" : "bg-gray-300"}`}
                    />
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          {/* Etapa 1: Seleção de Produto */}
          {currentStep === 1 && (
            <div className="space-y-6 md:space-y-8">
              <div className="text-center">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Escolha seu Produto</h2>
                <p className="text-gray-600">Selecione o tipo de produto que deseja personalizar</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                {productTypes.map((product) => {
                  const IconComponent = product.icon
                  return (
                    <Card
                      key={product.id}
                      className={`cursor-pointer transition-all hover:shadow-lg ${
                        formData.productType === product.id ? "ring-2 ring-amber-500 bg-amber-50" : ""
                      }`}
                      onClick={() => updateFormData("productType", product.id)}
                    >
                      <CardContent className="p-4 md:p-6 text-center">
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          width={150}
                          height={150}
                          className="mx-auto mb-4 rounded-lg md:w-[200px] md:h-[200px]"
                        />
                        <IconComponent className="w-10 h-10 md:w-12 md:h-12 mx-auto mb-4 text-amber-600" />
                        <h3 className="text-lg md:text-xl font-bold mb-2">{product.name}</h3>
                        <p className="text-gray-600 mb-4 text-sm md:text-base">{product.description}</p>
                        <p className="text-xl md:text-2xl font-bold text-amber-600">
                          A partir de R$ {product.basePrice.toFixed(2)}
                        </p>
                        {formData.productType === product.id && (
                          <Badge className="mt-2 bg-amber-500 text-white">Selecionado</Badge>
                        )}
                      </CardContent>
                    </Card>
                  )
                })}
              </div>

              {formData.productType && (
                <div className="space-y-6">
                  <div>
                    <Label className="text-lg font-semibold mb-4 block">Quantidade</Label>
                    <div className="flex items-center space-x-4">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => updateFormData("quantity", Math.max(1, formData.quantity - 1))}
                        disabled={formData.quantity <= 1}
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      <span className="text-xl font-semibold w-12 text-center">{formData.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => updateFormData("quantity", formData.quantity + 1)}
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {(formData.productType === "camiseta" || formData.productType === "kit") && (
                    <div>
                      <Label className="text-lg font-semibold mb-4 block">Tamanhos Desejados</Label>
                      <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                        {availableSizes.map((size) => (
                          <div key={size} className="flex items-center space-x-2">
                            <Checkbox
                              id={size}
                              checked={formData.sizes.includes(size)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  updateFormData("sizes", [...formData.sizes, size])
                                } else {
                                  updateFormData(
                                    "sizes",
                                    formData.sizes.filter((s) => s !== size),
                                  )
                                }
                              }}
                            />
                            <Label htmlFor={size} className="cursor-pointer">
                              {size}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div>
                    <Label className="text-lg font-semibold mb-4 block">Cores Desejadas</Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {availableColors.map((color) => (
                        <div key={color} className="flex items-center space-x-2">
                          <Checkbox
                            id={color}
                            checked={formData.colors.includes(color)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                updateFormData("colors", [...formData.colors, color])
                              } else {
                                updateFormData(
                                  "colors",
                                  formData.colors.filter((c) => c !== color),
                                )
                              }
                            }}
                          />
                          <Label htmlFor={color} className="cursor-pointer">
                            {color}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Etapa 2: Design */}
          {currentStep === 2 && (
            <div className="space-y-6 md:space-y-8">
              <div className="text-center">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Tipo de Design</h2>
                <p className="text-gray-600">Como você gostaria de personalizar seu produto?</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                {designTypes.map((design) => {
                  const IconComponent = design.icon
                  return (
                    <Card
                      key={design.id}
                      className={`cursor-pointer transition-all hover:shadow-lg ${
                        formData.designType === design.id ? "ring-2 ring-blue-500 bg-blue-50" : ""
                      }`}
                      onClick={() => updateFormData("designType", design.id)}
                    >
                      <CardContent className="p-4 md:p-6 text-center">
                        <IconComponent className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-4 text-blue-600" />
                        <h3 className="text-lg md:text-xl font-bold mb-2">{design.name}</h3>
                        <p className="text-gray-600 mb-4 text-sm md:text-base">{design.description}</p>
                        <p className="text-lg font-bold text-blue-600">
                          {design.price === 0 ? "Incluído" : `+ R$ ${design.price.toFixed(2)}`}
                        </p>
                        {formData.designType === design.id && (
                          <Badge className="mt-2 bg-blue-500 text-white">Selecionado</Badge>
                        )}
                      </CardContent>
                    </Card>
                  )
                })}
              </div>

              {formData.designType && (
                <div className="space-y-6">
                  {formData.designType === "logo" && (
                    <div>
                      <Label className="text-lg font-semibold mb-4 block">Upload do Logo/Arquivo</Label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 md:p-8 text-center hover:border-blue-500 transition-colors">
                        <Upload className="w-10 h-10 md:w-12 md:h-12 mx-auto mb-4 text-gray-400" />
                        <p className="text-gray-600 mb-2">Clique para fazer upload ou arraste o arquivo aqui</p>
                        <p className="text-sm text-gray-500">PNG, JPG, SVG até 10MB</p>
                        <Input type="file" className="hidden" accept=".png,.jpg,.jpeg,.svg" />
                      </div>
                    </div>
                  )}

                  <div>
                    <Label htmlFor="designDescription" className="text-lg font-semibold mb-4 block">
                      Descrição do Design
                    </Label>
                    <Textarea
                      id="designDescription"
                      placeholder="Descreva detalhadamente como você gostaria que fosse o design..."
                      value={formData.designDescription}
                      onChange={(e) => updateFormData("designDescription", e.target.value)}
                      rows={4}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="designColors" className="text-lg font-semibold mb-4 block">
                        Cores Preferidas
                      </Label>
                      <Input
                        id="designColors"
                        placeholder="Ex: Azul, branco, dourado..."
                        value={formData.designColors}
                        onChange={(e) => updateFormData("designColors", e.target.value)}
                      />
                    </div>

                    <div>
                      <Label htmlFor="style" className="text-lg font-semibold mb-4 block">
                        Estilo
                      </Label>
                      <Select value={formData.style} onValueChange={(value) => updateFormData("style", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o estilo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="moderno">Moderno</SelectItem>
                          <SelectItem value="classico">Clássico</SelectItem>
                          <SelectItem value="minimalista">Minimalista</SelectItem>
                          <SelectItem value="vintage">Vintage</SelectItem>
                          <SelectItem value="divertido">Divertido</SelectItem>
                          <SelectItem value="elegante">Elegante</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Etapa 3: Detalhes do Projeto */}
          {currentStep === 3 && (
            <div className="space-y-6 md:space-y-8">
              <div className="text-center">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Detalhes do Projeto</h2>
                <p className="text-gray-600">Informações adicionais sobre sua personalização</p>
              </div>

              <div className="space-y-6">
                <div>
                  <Label htmlFor="productName" className="text-lg font-semibold mb-4 block">
                    Nome do Produto/Projeto
                  </Label>
                  <Input
                    id="productName"
                    placeholder="Ex: Camiseta da Minha Empresa"
                    value={formData.productName}
                    onChange={(e) => updateFormData("productName", e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="specialInstructions" className="text-lg font-semibold mb-4 block">
                    Instruções Especiais
                  </Label>
                  <Textarea
                    id="specialInstructions"
                    placeholder="Alguma instrução especial, referências, ou detalhes importantes..."
                    value={formData.specialInstructions}
                    onChange={(e) => updateFormData("specialInstructions", e.target.value)}
                    rows={4}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="deadline" className="text-lg font-semibold mb-4 block">
                      Prazo Desejado
                    </Label>
                    <Select value={formData.deadline} onValueChange={(value) => updateFormData("deadline", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o prazo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="7-dias">7 dias</SelectItem>
                        <SelectItem value="15-dias">15 dias</SelectItem>
                        <SelectItem value="30-dias">30 dias</SelectItem>
                        <SelectItem value="flexivel">Flexível</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="budget" className="text-lg font-semibold mb-4 block">
                      Orçamento Máximo
                    </Label>
                    <Select value={formData.budget} onValueChange={(value) => updateFormData("budget", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o orçamento" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ate-200">Até R$ 200</SelectItem>
                        <SelectItem value="200-500">R$ 200 - R$ 500</SelectItem>
                        <SelectItem value="500-1000">R$ 500 - R$ 1.000</SelectItem>
                        <SelectItem value="acima-1000">Acima de R$ 1.000</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Estimativa de Preço */}
                <Card className="bg-amber-50 border-amber-200">
                  <CardContent className="p-4 md:p-6">
                    <div className="flex items-center space-x-4">
                      <Calculator className="w-6 h-6 md:w-8 md:h-8 text-amber-600" />
                      <div className="flex-1">
                        <h3 className="text-lg md:text-xl font-bold text-amber-800">Estimativa de Preço</h3>
                        <p className="text-amber-700">Baseado nas suas seleções</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl md:text-3xl font-bold text-amber-600">R$ {estimatedPrice.toFixed(2)}</p>
                        <p className="text-sm text-amber-700">*Valor aproximado</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* Etapa 4: Informações Pessoais */}
          {currentStep === 4 && (
            <div className="space-y-6 md:space-y-8">
              <div className="text-center">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Suas Informações</h2>
                <p className="text-gray-600">Para finalizarmos sua solicitação de personalização</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="name" className="text-lg font-semibold mb-2 block">
                    Nome Completo *
                  </Label>
                  <Input
                    id="name"
                    placeholder="Seu nome completo"
                    value={formData.name}
                    onChange={(e) => updateFormData("name", e.target.value)}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="text-lg font-semibold mb-2 block">
                    E-mail *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={formData.email}
                    onChange={(e) => updateFormData("email", e.target.value)}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="phone" className="text-lg font-semibold mb-2 block">
                    Telefone *
                  </Label>
                  <Input
                    id="phone"
                    placeholder="(11) 99999-9999"
                    value={formData.phone}
                    onChange={(e) => updateFormData("phone", e.target.value)}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="company" className="text-lg font-semibold mb-2 block">
                    Empresa (opcional)
                  </Label>
                  <Input
                    id="company"
                    placeholder="Nome da empresa"
                    value={formData.company}
                    onChange={(e) => updateFormData("company", e.target.value)}
                  />
                </div>

                <div className="md:col-span-2">
                  <Label htmlFor="address" className="text-lg font-semibold mb-2 block">
                    Endereço *
                  </Label>
                  <Input
                    id="address"
                    placeholder="Rua, número, complemento"
                    value={formData.address}
                    onChange={(e) => updateFormData("address", e.target.value)}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="city" className="text-lg font-semibold mb-2 block">
                    Cidade *
                  </Label>
                  <Input
                    id="city"
                    placeholder="Sua cidade"
                    value={formData.city}
                    onChange={(e) => updateFormData("city", e.target.value)}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="state" className="text-lg font-semibold mb-2 block">
                    Estado *
                  </Label>
                  <Input
                    id="state"
                    placeholder="SP"
                    value={formData.state}
                    onChange={(e) => updateFormData("state", e.target.value)}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="zipCode" className="text-lg font-semibold mb-2 block">
                    CEP *
                  </Label>
                  <Input
                    id="zipCode"
                    placeholder="00000-000"
                    value={formData.zipCode}
                    onChange={(e) => updateFormData("zipCode", e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Resumo Final */}
              <Card className="bg-gray-50">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Package className="w-6 h-6" />
                    <span>Resumo da Personalização</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="font-semibold">Produto:</p>
                      <p className="text-gray-600">
                        {productTypes.find((p) => p.id === formData.productType)?.name} (Qtd: {formData.quantity})
                      </p>
                    </div>
                    <div>
                      <p className="font-semibold">Design:</p>
                      <p className="text-gray-600">{designTypes.find((d) => d.id === formData.designType)?.name}</p>
                    </div>
                    <div>
                      <p className="font-semibold">Prazo:</p>
                      <p className="text-gray-600">{formData.deadline || "Não especificado"}</p>
                    </div>
                    <div>
                      <p className="font-semibold">Estimativa:</p>
                      <p className="text-2xl font-bold text-amber-600">R$ {estimatedPrice.toFixed(2)}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center pt-8">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className="flex items-center space-x-2 bg-transparent"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Anterior</span>
            </Button>

            {currentStep < 4 ? (
              <Button
                onClick={handleNext}
                disabled={(currentStep === 1 && !formData.productType) || (currentStep === 2 && !formData.designType)}
                className="flex items-center space-x-2 bg-amber-500 hover:bg-amber-600"
              >
                <span>Próximo</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={!formData.name || !formData.email || !formData.phone}
                className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-600"
              >
                <span>Enviar Solicitação</span>
                <Check className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      </div>

      <Footer />

      {/* WhatsApp Float */}
      <div className="fixed bottom-6 right-6 z-40">
        <Button className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-green-500 hover:bg-green-600 shadow-lg hover:scale-105 transition-all">
          <MessageCircle className="w-6 h-6 md:w-8 md:h-8 text-white" />
        </Button>
      </div>
    </div>
  )
}
