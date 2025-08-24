"use client"

import { Navbar } from "@/components/navbar"
import Footer from "@/components/footer"

export default function EntregasPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main className="bg-white text-black pt-20">
        {/* HEADER */}
        <section className="bg-white text-black px-6 lg:px-8 pt-16 pb-12 max-w-5xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight">
            Entregas — Multiverso Estúdio
          </h1>
          <div className="mt-4 h-[2px] w-24 bg-gray-800"></div>
          <p className="mt-6 text-base leading-7 text-gray-700 max-w-3xl">
            Informações sobre prazos de entrega, transportadoras e rastreamento dos seus pedidos.
          </p>
        </section>

        {/* CONTEÚDO */}
        <div className="max-w-4xl mx-auto px-6 lg:px-8 pb-16">
          <div className="space-y-12">
            {/* PRAZOS */}
            <section>
              <h2 className="text-2xl font-bold uppercase mb-6">Prazos de Entrega</h2>
              <div className="space-y-6">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-lg mb-3">Produção + Entrega</h3>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="font-medium text-gray-900">Produção:</p>
                      <p className="text-gray-700">5 a 10 dias úteis</p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Entrega:</p>
                      <p className="text-gray-700">1 a 15 dias úteis</p>
                    </div>
                  </div>
                  <p className="text-gray-600 mt-3 text-sm">
                    <strong>Total estimado:</strong> 6 a 25 dias úteis após confirmação do pagamento
                  </p>
                </div>
              </div>
            </section>

            {/* TRANSPORTADORAS */}
            <section>
              <h2 className="text-2xl font-bold uppercase mb-6">Transportadoras</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="font-semibold text-lg mb-3">Correios</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>• PAC: 5 a 15 dias úteis</li>
                    <li>• SEDEX: 1 a 3 dias úteis</li>
                    <li>• Cobertura nacional</li>
                  </ul>
                </div>
                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="font-semibold text-lg mb-3">Transportadoras Privadas</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>• Entrega expressa</li>
                    <li>• Rastreamento em tempo real</li>
                    <li>• Cobertura regional</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* RASTREAMENTO */}
            <section>
              <h2 className="text-2xl font-bold uppercase mb-6">Rastreamento</h2>
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="font-semibold text-lg mb-3">Como acompanhar seu pedido</h3>
                <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
                  <li>Após a produção, você receberá um código de rastreamento por email</li>
                  <li>O rastreamento estará disponível em até 48 horas após a postagem</li>
                  <li>Use o código no site da transportadora ou em nossa área de pedidos</li>
                  <li>Receba atualizações sobre o status da entrega</li>
                </ol>
              </div>
            </section>

            {/* INFORMAÇÕES IMPORTANTES */}
            <section>
              <h2 className="text-2xl font-bold uppercase mb-6">Informações Importantes</h2>
              <div className="space-y-4">
                <div className="border-l-4 border-orange-500 pl-4">
                  <h3 className="font-semibold text-gray-900">Endereço de Entrega</h3>
                  <p className="text-gray-700 text-sm mt-1">
                    Verifique se o endereço está correto no momento da compra. Pedidos retornados por erro no endereço terão custo de reenvio.
                  </p>
                </div>
                <div className="border-l-4 border-blue-500 pl-4">
                  <h3 className="font-semibold text-gray-900">Ausência no Endereço</h3>
                  <p className="text-gray-700 text-sm mt-1">
                    As transportadoras realizam até 3 tentativas de entrega. Caso não haja sucesso, o pedido retorna ao nosso estúdio.
                  </p>
                </div>
                <div className="border-l-4 border-green-500 pl-4">
                  <h3 className="font-semibold text-gray-900">Frete Grátis</h3>
                  <p className="text-gray-700 text-sm mt-1">
                    Consulte as condições de frete grátis na página do produto ou durante o checkout.
                  </p>
                </div>
              </div>
            </section>

            {/* CALCULAR FRETE */}
            <section>
              <h2 className="text-2xl font-bold uppercase mb-6">Calcular Frete</h2>
              <div className="bg-gray-50 p-6 rounded-lg text-center">
                <p className="text-gray-700 mb-4">
                  Para calcular o frete e prazo de entrega específico para sua região, 
                  use o campo "Calcular Frete" na página do produto.
                </p>
                <a 
                  href="/duvidas#pedidos" 
                  className="inline-block bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Ver Central de Ajuda
                </a>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
