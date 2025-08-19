"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Upload,
  FileText,
  Package,
  MapPin,
  User,
  CreditCard,
  Camera,
  MessageSquare,
  CheckCircle,
  AlertCircle,
  Clock,
  Truck,
  RotateCcw,
  Shield,
  Phone,
  Mail,
  MessageCircle,
} from "lucide-react"
import { Navbar } from "@/components/navbar"
import Footer from "@/components/footer"

export default function TrocasPage() {
  const [step, setStep] = useState(1)
  const [uploadedImages, setUploadedImages] = useState<string[]>([])
  const [uploadedInvoice, setUploadedInvoice] = useState<string | null>(null)

  const steps = [
    { number: 1, title: "Dados do Produto", icon: Package },
    { number: 2, title: "Dados Pessoais", icon: User },
    { number: 3, title: "Fotos e Motivo", icon: Camera },
    { number: 4, title: "Confirmação", icon: CheckCircle },
  ]

  const exchangeReasons = [
    "Tamanho incorreto",
    "Cor diferente do esperado",
    "Defeito de fabricação",
    "Produto danificado no transporte",
    "Não gostei do produto",
    "Produto diferente do anunciado",
    "Outro motivo",
  ]

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files) {
      const newImages = Array.from(files).map((file) => URL.createObjectURL(file))
      setUploadedImages((prev) => [...prev, ...newImages])
    }
  }

  const handleInvoiceUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setUploadedInvoice(URL.createObjectURL(file))
    }
  }

  const removeImage = (index: number) => {
    setUploadedImages((prev) => prev.filter((_, i) => i !== index))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="container mx-auto px-4 py-12 pt-20">
        {/* Page Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <RotateCcw className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Central de Trocas</h1>
          </div>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Solicite a troca do seu produto de forma rápida e fácil. Você tem 7 dias corridos após o recebimento.
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-center space-x-4 mb-8 overflow-x-auto">
            {steps.map((stepItem, index) => {
              const IconComponent = stepItem.icon
              const isActive = step === stepItem.number
              const isCompleted = step > stepItem.number

              return (
                <div key={stepItem.number} className="flex items-center">
                  <div className={`flex items-center space-x-3 ${index > 0 ? "ml-4" : ""}`}>
                    <div
                      className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-colors ${
                        isCompleted
                          ? "bg-green-500 text-white"
                          : isActive
                            ? "bg-blue-600 text-white"
                            : "bg-gray-200 text-gray-500"
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle className="w-5 h-5 md:w-6 md:h-6" />
                      ) : (
                        <IconComponent className="w-5 h-5 md:w-6 md:h-6" />
                      )}
                    </div>
                    <div className="hidden md:block">
                      <h3 className={`font-semibold ${isActive ? "text-blue-600" : "text-gray-600"}`}>
                        {stepItem.title}
                      </h3>
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`w-8 md:w-16 h-1 mx-2 md:mx-4 ${step > stepItem.number ? "bg-green-500" : "bg-gray-200"}`}
                    />
                  )}
                </div>
              )
            })}
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl md:text-2xl">
                {step === 1 && "Dados do Produto"}
                {step === 2 && "Seus Dados Pessoais"}
                {step === 3 && "Fotos e Motivo da Troca"}
                {step === 4 && "Confirmação da Solicitação"}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 md:p-8">
              {/* Step 1: Product Data */}
              {step === 1 && (
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Número do Pedido *</label>
                      <div className="relative">
                        <Package className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <Input placeholder="Ex: MS123456789" className="pl-10 h-12" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Código do Produto *</label>
                      <div className="relative">
                        <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <Input placeholder="Ex: CAF001-M-PRETO" className="pl-10 h-12" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nota Fiscal (PDF ou Imagem) *
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 md:p-8 text-center hover:border-blue-400 transition-colors relative">
                      {uploadedInvoice ? (
                        <div className="flex items-center justify-center space-x-4">
                          <FileText className="w-8 h-8 text-green-600" />
                          <div>
                            <p className="font-semibold text-green-600">Nota fiscal enviada!</p>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setUploadedInvoice(null)}
                              className="text-red-500 hover:text-red-700"
                            >
                              Remover
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <Upload className="w-10 h-10 md:w-12 md:h-12 text-gray-400 mx-auto mb-4" />
                          <p className="text-gray-600 mb-2">Clique para enviar ou arraste o arquivo aqui</p>
                          <p className="text-sm text-gray-500">PDF, JPG, PNG até 10MB</p>
                        </div>
                      )}
                      <input
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={handleInvoiceUpload}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                    </div>
                  </div>

                  <div className="bg-blue-50 p-4 md:p-6 rounded-lg">
                    <div className="flex items-start space-x-3">
                      <AlertCircle className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-blue-900 mb-2">Informações Importantes</h4>
                        <ul className="text-sm text-blue-800 space-y-1">
                          <li>• O número do pedido está no e-mail de confirmação</li>
                          <li>• O código do produto está na etiqueta do item</li>
                          <li>• A nota fiscal é obrigatória para processar a troca</li>
                          <li>• Você tem 7 dias corridos após o recebimento</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Personal Data */}
              {step === 2 && (
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Nome Completo *</label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <Input placeholder="Seu nome completo" className="pl-10 h-12" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">CPF *</label>
                      <div className="relative">
                        <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <Input placeholder="000.000.000-00" className="pl-10 h-12" />
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">E-mail *</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <Input type="email" placeholder="seu@email.com" className="pl-10 h-12" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Telefone *</label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <Input placeholder="(11) 99999-9999" className="pl-10 h-12" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Endereço Completo *</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                      <Textarea
                        placeholder="Rua, número, complemento, bairro, cidade, estado, CEP"
                        className="pl-10 min-h-24"
                      />
                    </div>
                  </div>

                  <div className="bg-green-50 p-4 md:p-6 rounded-lg">
                    <div className="flex items-start space-x-3">
                      <Shield className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-green-900 mb-2">Seus dados estão seguros</h4>
                        <p className="text-sm text-green-800">
                          Utilizamos criptografia de ponta para proteger suas informações pessoais. Seus dados são
                          usados apenas para processar a troca.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Photos and Reason */}
              {step === 3 && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Motivo da Troca *</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {exchangeReasons.map((reason) => (
                        <label
                          key={reason}
                          className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
                        >
                          <input type="radio" name="reason" value={reason} className="text-blue-600" />
                          <span className="text-sm">{reason}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Fotos do Produto *</label>
                    <p className="text-sm text-gray-600 mb-4">
                      Envie pelo menos 2 fotos do produto mostrando o problema (se houver)
                    </p>

                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 md:p-8 text-center hover:border-blue-400 transition-colors relative">
                      <Camera className="w-10 h-10 md:w-12 md:h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600 mb-2">Clique para enviar fotos ou arraste aqui</p>
                      <p className="text-sm text-gray-500">JPG, PNG até 5MB cada (máximo 5 fotos)</p>
                      <input
                        type="file"
                        accept=".jpg,.jpeg,.png"
                        multiple
                        onChange={handleImageUpload}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                    </div>

                    {uploadedImages.length > 0 && (
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
                        {uploadedImages.map((image, index) => (
                          <div key={index} className="relative group">
                            <Image
                              src={image || "/placeholder.svg"}
                              alt={`Produto ${index + 1}`}
                              width={200}
                              height={200}
                              className="w-full h-32 object-cover rounded-lg"
                            />
                            <Button
                              size="icon"
                              variant="destructive"
                              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity w-6 h-6"
                              onClick={() => removeImage(index)}
                            >
                              ×
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Observações Adicionais</label>
                    <div className="relative">
                      <MessageSquare className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                      <Textarea
                        placeholder="Descreva detalhadamente o problema ou motivo da troca..."
                        className="pl-10 min-h-32"
                      />
                    </div>
                  </div>

                  <div className="bg-amber-50 p-4 md:p-6 rounded-lg">
                    <div className="flex items-start space-x-3">
                      <Clock className="w-6 h-6 text-amber-600 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-amber-900 mb-2">Tempo de Processamento</h4>
                        <p className="text-sm text-amber-800">
                          Após o envio da solicitação, analisaremos em até 2 dias úteis. Você receberá um e-mail com as
                          instruções para envio do produto.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Confirmation */}
              {step === 4 && (
                <div className="space-y-6">
                  <div className="text-center">
                    <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Solicitação Enviada!</h3>
                    <p className="text-gray-600 mb-6">
                      Sua solicitação de troca foi recebida e será analisada em até 2 dias úteis.
                    </p>
                  </div>

                  <Card className="bg-green-50 border-green-200">
                    <CardContent className="p-6">
                      <h4 className="font-bold text-green-900 mb-4">Protocolo da Solicitação</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-green-800">Número do Protocolo:</span>
                          <span className="font-bold text-green-900">#TR2024001234</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-green-800">Data da Solicitação:</span>
                          <span className="font-bold text-green-900">{new Date().toLocaleDateString("pt-BR")}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-green-800">Status:</span>
                          <Badge className="bg-yellow-500 text-white">Em Análise</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="grid md:grid-cols-2 gap-6">
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-center space-x-3 mb-4">
                          <Mail className="w-6 h-6 text-blue-600" />
                          <h4 className="font-bold text-gray-900">Próximos Passos</h4>
                        </div>
                        <ul className="space-y-2 text-sm text-gray-700">
                          <li>• Você receberá um e-mail de confirmação</li>
                          <li>• Nossa equipe analisará sua solicitação</li>
                          <li>• Enviaremos as instruções de envio</li>
                          <li>• Após recebimento, processaremos a troca</li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-center space-x-3 mb-4">
                          <Truck className="w-6 h-6 text-purple-600" />
                          <h4 className="font-bold text-gray-900">Informações de Envio</h4>
                        </div>
                        <ul className="space-y-2 text-sm text-gray-700">
                          <li>• Envio gratuito via Correios</li>
                          <li>• Código de postagem será enviado</li>
                          <li>• Embale bem o produto</li>
                          <li>• Prazo de 5-7 dias úteis</li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="text-center space-y-4">
                    <Button className="bg-green-600 hover:bg-green-700 px-8 py-3">Acompanhar Solicitação</Button>
                    <div>
                      <Link href="/">
                        <Button variant="outline" className="bg-transparent">
                          Voltar à Loja
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              {step < 4 && (
                <div className="flex flex-col md:flex-row justify-between pt-8 border-t space-y-4 md:space-y-0">
                  <Button
                    variant="outline"
                    onClick={() => setStep(step - 1)}
                    disabled={step === 1}
                    className="bg-transparent"
                  >
                    Voltar
                  </Button>
                  <Button onClick={() => setStep(step + 1)} className="bg-blue-600 hover:bg-blue-700">
                    {step === 3 ? "Enviar Solicitação" : "Próximo"}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
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
