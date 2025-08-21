"use client"

import { Navbar } from "@/components/navbar"
import Footer from "@/components/footer"
import Link from "next/link"

export default function TrocasDevolucoesPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main id="trocas-devolucoes" className="pt-24">
        {/* HERO */}
        <section className="max-w-4xl mx-auto px-6 lg:px-8 pt-16 pb-8">
          <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-black">
            TERMOS DE TROCAS E DEVOLUÇÕES — MULTIVERSO ESTÚDIO
          </h1>
          <div className="mt-4 h-[2px] w-24 bg-black"></div>
          <p className="mt-4 text-base leading-7 text-gray-700">
            No Multiverso Estúdio sabemos que, às vezes, as dimensões do universo não se alinham.  
            Por isso, criamos regras claras e transparentes para que sua experiência seja justa, segura  
            e em conformidade com o Código de Defesa do Consumidor (CDC).
          </p>
          <p className="mt-2 text-sm text-gray-500">
            Ao prosseguir, você declara que leu e aceita estes termos:
          </p>
        </section>

        {/* CONTEÚDO */}
        <section className="max-w-4xl mx-auto px-6 lg:px-8 pb-20 space-y-10">
          {/* PRAZO */}
          <section className="bg-white border border-gray-200 rounded-2xl p-6 shadow-lg">
            <h2 className="uppercase text-sm font-bold tracking-wider text-black mb-4">1. PRAZO</h2>
            <ul className="mt-3 list-disc list-inside space-y-2 text-base leading-7 text-gray-700">
              <li>Você pode solicitar troca ou devolução em até 7 dias corridos após o recebimento do produto.</li>
              <li>O prazo conta a partir da data confirmada pela transportadora.</li>
            </ul>
          </section>

          {/* CONDIÇÕES */}
          <section className="bg-white border border-gray-200 rounded-2xl p-6 shadow-lg">
            <h2 className="uppercase text-sm font-bold tracking-wider text-black mb-4">2. CONDIÇÕES DO PRODUTO</h2>
            <ul className="mt-3 list-disc list-inside space-y-2 text-base leading-7 text-gray-700">
              <li>O produto deve estar sem uso, com etiqueta e em condições adequadas para revenda.</li>
              <li>Sempre que possível, pedimos que seja devolvido preferencialmente na embalagem original.</li>
              <li>Produtos personalizados (criados especialmente para você) não se enquadram no direito de arrependimento.
                  Nestes casos, a devolução só é aceita em caso de defeito de fabricação.</li>
            </ul>
          </section>

          {/* CUSTOS */}
          <section className="bg-white border border-gray-200 rounded-2xl p-6 shadow-lg">
            <h2 className="uppercase text-sm font-bold tracking-wider text-black mb-4">3. CUSTOS E REEMBOLSO</h2>
            <div className="mt-3 space-y-3 text-base leading-7 text-gray-700">
              <p><span className="font-semibold text-black">Arrependimento (até 7 dias):</span> O reembolso será integral, incluindo valor do produto,
                 frete de envio e frete de devolução.</p>
              <p><span className="font-semibold text-black">Troca por conveniência (tamanho, cor, preferência):</span></p>
              <ul className="list-disc list-inside space-y-1 ml-5">
                <li>A primeira troca é gratuita;</li>
                <li>A partir da segunda troca, será cobrada uma taxa fixa de R$ 9,99.</li>
              </ul>
              <p>O reembolso será feito pelo mesmo método de pagamento em até 10 dias úteis após a chegada e conferência do produto.</p>
              <p>Você pode optar por receber um cupom no valor do produto para utilizar em nova compra (não cumulativo com outros cupons).</p>
            </div>
          </section>

          {/* PROCEDIMENTO */}
          <section className="bg-white border border-gray-200 rounded-2xl p-6 shadow-lg">
            <h2 className="uppercase text-sm font-bold tracking-wider text-black mb-4">4. PROCEDIMENTO</h2>
            <ol className="mt-3 list-decimal list-inside space-y-2 text-base leading-7 text-gray-700">
              <li>Preencher o formulário de troca/devolução.</li>
              <li>Enviar as fotos solicitadas do produto e da etiqueta.</li>
              <li>Aguardar retorno com o código de postagem para envio.</li>
              <li>Após análise, confirmaremos a aprovação e seguiremos com a troca ou reembolso.</li>
            </ol>
          </section>

          {/* OBSERVAÇÕES LEGAIS */}
          <section className="bg-white border border-gray-200 rounded-2xl p-6 shadow-lg">
            <h2 className="uppercase text-sm font-bold tracking-wider text-black mb-4">5. OBSERVAÇÕES LEGAIS</h2>
            <ul className="mt-3 list-disc list-inside space-y-2 text-base leading-7 text-gray-700">
              <li>O Multiverso Estúdio segue integralmente o Código de Defesa do Consumidor (Lei nº 8.078/1990) e o Decreto nº 7.962/2013 (E-commerce).</li>
              <li>Solicitações fora das condições descritas poderão ser recusadas.</li>
            </ul>
          </section>

        </section>
      </main>

      <Footer />
    </div>
  )
}
