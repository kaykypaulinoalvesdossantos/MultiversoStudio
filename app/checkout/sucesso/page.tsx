"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Navbar } from "@/components/navbar"
import Footer from "@/components/footer"
import { 
  CheckCircle, 
  ShoppingBag, 
  CreditCard, 
  ArrowRight,
  ExternalLink
} from "lucide-react"

export default function CheckoutSuccessPage() {
  const router = useRouter()

  useEffect(() => {
    // Limpar carrinho ao entrar na página
    if (typeof window !== 'undefined') {
      localStorage.removeItem('multiverso-cart')
    }
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          {/* Ícone de Sucesso */}
          <div className="mb-8">
            <CheckCircle className="w-24 h-24 text-green-500 mx-auto" />
          </div>

          {/* Título */}
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Pedido Realizado com Sucesso! 🎉
          </h1>
          
          <p className="text-xl text-gray-600 mb-8">
            Seu pedido foi criado e está aguardando pagamento.
          </p>

          {/* Card de Informações */}
          <Card className="mb-8 text-left">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Próximos Passos
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h3 className="font-semibold text-blue-800 mb-2">
                  💳 Pagamento via PIX
                </h3>
                <p className="text-sm text-blue-700 mb-3">
                  Uma nova aba foi aberta com o link de pagamento do Stripe. 
                  Complete o pagamento para finalizar seu pedido.
                </p>
                <div className="flex items-center gap-2 text-xs text-blue-600">
                  <ExternalLink className="w-4 h-4" />
                  <span>Se a aba não abriu, verifique o bloqueador de pop-ups</span>
                </div>
              </div>

              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <h3 className="font-semibold text-green-800 mb-2">
                  ✅ O que acontece agora?
                </h3>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• Complete o pagamento na aba do Stripe</li>
                  <li>• Receba confirmação por e-mail</li>
                  <li>• Seu pedido será processado automaticamente</li>
                  <li>• Acompanhe o status na sua conta</li>
                </ul>
              </div>

              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <h3 className="font-semibold text-yellow-800 mb-2">
                  ⚠️ Importante
                </h3>
                <p className="text-sm text-yellow-700">
                  Seu pedido só será confirmado após a confirmação do pagamento. 
                  Em caso de dúvidas, entre em contato conosco.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Botões de Ação */}
          <div className="space-y-4">
            <Button 
              onClick={() => window.open('/perfil', '_blank')}
              className="w-full h-12 text-lg font-semibold"
            >
              <ShoppingBag className="w-5 h-5 mr-2" />
              Acompanhar Meus Pedidos
            </Button>
            
            <Button 
              variant="outline"
              onClick={() => router.push('/')}
              className="w-full h-12 text-lg"
            >
              <ArrowRight className="w-5 h-5 mr-2" />
              Continuar Comprando
            </Button>
          </div>

          {/* Informações Adicionais */}
          <div className="mt-8 p-4 bg-gray-100 rounded-lg">
            <p className="text-sm text-gray-600">
              <strong>Precisa de ajuda?</strong> Entre em contato conosco através do WhatsApp 
              ou e-mail para suporte.
            </p>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  )
}
