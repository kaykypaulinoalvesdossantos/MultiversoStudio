"use client"

import { useEffect } from "react"
import { Navbar } from "@/components/navbar"
import Footer from "@/components/footer"

export default function EntregasPage() {
  useEffect(() => {
    // Scroll para o topo quando a página carregar
    window.scrollTo(0, 0)
  }, [])

  return (
    <main id="pagina-entregas" className="bg-white text-black font-gotham min-h-screen">
      <Navbar />
      
      {/* HERO */}
      <section className="max-w-5xl mx-auto px-6 lg:px-8 pt-24 pb-10">
        <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight font-gotham-black">
          Página de Entregas — Multiverso Estúdio
        </h1>
        <div className="mt-4 h-[2px] w-24 bg-black"></div>
        <p className="mt-6 text-base leading-7 text-gray-700 max-w-3xl font-gotham-book">
          No Multiverso Estúdio cada produto é feito sob demanda, com cuidado e atenção aos detalhes.
          Por isso, temos um fluxo claro de produção + envio, para que você saiba exatamente como funciona sua entrega.
        </p>
      </section>

      {/* CONTEÚDO */}
      <section className="max-w-5xl mx-auto px-6 lg:px-8 pb-20 space-y-14 text-base leading-7 text-gray-700">
        
        {/* PRAZO DE PRODUÇÃO */}
        <section className="bg-white/50 backdrop-blur-sm border border-gray-100 p-8 shadow-lg">
          <header className="mb-6">
            <h2 className="text-xl md:text-2xl font-bold uppercase font-gotham-bold">Prazo de Produção</h2>
            <div className="mt-2 h-[2px] w-16 bg-black"></div>
          </header>
          <ul className="list-disc list-inside space-y-3 font-gotham-book">
            <li>Todos os produtos são personalizados e feitos sob encomenda.</li>
            <li>O prazo de produção é de <span className="font-semibold text-black font-gotham-bold">5 a 10 dias úteis</span> após a confirmação do pagamento.</li>
            <li>Esse tempo garante qualidade em cada etapa: corte, estampa, acabamento e revisão.</li>
          </ul>
        </section>

        {/* PRAZO DE ENTREGA */}
        <section className="bg-white/50 backdrop-blur-sm border border-gray-100 p-8 shadow-lg">
          <header className="mb-6">
            <h2 className="text-xl md:text-2xl font-bold uppercase font-gotham-bold">Prazo de Entrega</h2>
            <div className="mt-2 h-[2px] w-16 bg-black"></div>
          </header>
          <ul className="list-disc list-inside space-y-3 font-gotham-book">
            <li>O prazo de entrega depende da transportadora e da região do cliente.</li>
            <li>Esse prazo começa a contar <em>após a postagem</em> do pedido.</li>
            <li>Você pode calcular o tempo estimado e o valor do frete na página do produto, inserindo seu CEP em <span className="text-black font-gotham-bold">"Calcular Frete"</span>.</li>
          </ul>
        </section>

        {/* RASTREAMENTO */}
        <section className="bg-white/50 backdrop-blur-sm border border-gray-100 p-8 shadow-lg">
          <header className="mb-6">
            <h2 className="text-xl md:text-2xl font-bold uppercase font-gotham-bold">Rastreamento</h2>
            <div className="mt-2 h-[2px] w-16 bg-black"></div>
          </header>
          <ul className="list-disc list-inside space-y-3 font-gotham-book">
            <li>Após a postagem, você receberá um <span className="font-semibold text-black font-gotham-bold">código de rastreamento</span> para acompanhar sua encomenda.</li>
            <li>O rastreio pode levar até <span className="font-semibold text-black font-gotham-bold">48 horas</span> para começar a exibir atualizações no sistema da transportadora.</li>
          </ul>
        </section>

        {/* TENTATIVAS DE ENTREGA */}
        <section className="bg-white/50 backdrop-blur-sm border border-gray-100 p-8 shadow-lg">
          <header className="mb-6">
            <h2 className="text-xl md:text-2xl font-bold uppercase font-gotham-bold">Tentativas de Entrega</h2>
            <div className="mt-2 h-[2px] w-16 bg-black"></div>
          </header>
          <ul className="list-disc list-inside space-y-3 font-gotham-book">
            <li>As transportadoras realizam até <span className="font-semibold text-black font-gotham-bold">3 tentativas</span> de entrega no endereço informado.</li>
            <li>Caso não haja sucesso, o pacote retorna ao Multiverso Estúdio.</li>
            <li>Nesse caso, entraremos em contato para confirmar os dados e será necessário pagar um <span className="font-semibold text-black font-gotham-bold">novo frete</span> para reenvio.</li>
          </ul>
        </section>

        {/* ENDEREÇO INCORRETO */}
        <section className="bg-white/50 backdrop-blur-sm border border-gray-100 p-8 shadow-lg">
          <header className="mb-6">
            <h2 className="text-xl md:text-2xl font-bold uppercase font-gotham-bold">Endereço Incorreto</h2>
            <div className="mt-2 h-[2px] w-16 bg-black"></div>
          </header>
          <ul className="list-disc list-inside space-y-3 font-gotham-book">
            <li>É responsabilidade do cliente preencher corretamente todas as informações de endereço no momento da compra.</li>
            <li>Se o pedido retornar por erro no endereço informado, será necessário pagar um novo frete para reenvio.</li>
          </ul>
        </section>

        {/* ATRASOS */}
        <section className="bg-white/50 backdrop-blur-sm border border-gray-100 p-8 shadow-lg">
          <header className="mb-6">
            <h2 className="text-xl md:text-2xl font-bold uppercase font-gotham-bold">Atrasos</h2>
            <div className="mt-2 h-[2px] w-16 bg-black"></div>
          </header>
          <p className="font-gotham-book">
            Caso seu pedido ultrapasse o prazo de produção (5 a 10 dias úteis) ou o prazo de entrega informado pela transportadora,
            entre em contato pelo e-mail
            <a href="mailto:contato@multiversoestudio.com.br" className="underline underline-offset-2 text-black font-gotham-bold hover:text-gray-700 transition-colors">
              {" "}contato@multiversoestudio.com.br
            </a>
            {" "}para verificarmos a situação.
          </p>
        </section>

        {/* FECHO */}
        <section className="border-l-4 border-black pl-6 bg-black/5 p-6">
          <p className="text-black font-semibold font-gotham-bold text-lg">
            Multiverso Estúdio — Uma Jornada Exploratória Simbiótica
          </p>
        </section>

      </section>

      <Footer />
    </main>
  )
}
