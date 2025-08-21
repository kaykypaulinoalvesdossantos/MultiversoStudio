"use client"

import { Navbar } from "@/components/navbar"
import Footer from "@/components/footer"
import Link from "next/link"

export default function PoliticaPrivacidadePage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main id="politica-privacidade" className="pt-24">
        {/* HERO */}
        <section className="max-w-6xl mx-auto px-6 lg:px-8 pt-16 pb-8">
          <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-black">
            POLÍTICA DE PRIVACIDADE E SEGURANÇA DE DADOS
          </h1>
          <div className="mt-4 h-[2px] w-24 bg-black"></div>
          <p className="mt-3 text-sm text-gray-600">
            Multiverso Estúdio — Uma Jornada Exploratória Simbiótica
          </p>
          <p className="text-sm text-gray-500">Atualizado em 20 de agosto de 2025</p>
        </section>

        {/* SUMÁRIO */}
        <section className="max-w-6xl mx-auto px-6 lg:px-8 pb-6">
          <nav className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-8">
              <ul className="space-y-1 text-sm text-gray-600">
                <li>
                  <a href="#sec-1" className="underline underline-offset-2 hover:no-underline hover:text-black transition-colors">
                    1. Coleta e Uso de Dados
                  </a>
                </li>
                <li>
                  <a href="#sec-2" className="underline underline-offset-2 hover:no-underline hover:text-black transition-colors">
                    2. Privacidade e Segurança
                  </a>
                </li>
                <li>
                  <a href="#sec-3" className="underline underline-offset-2 hover:no-underline hover:text-black transition-colors">
                    3. Cookies
                  </a>
                </li>
                <li>
                  <a href="#sec-4" className="underline underline-offset-2 hover:no-underline hover:text-black transition-colors">
                    4. Direitos do Titular
                  </a>
                </li>
                <li>
                  <a href="#sec-5" className="underline underline-offset-2 hover:no-underline hover:text-black transition-colors">
                    5. Atualizações
                  </a>
                </li>
              </ul>
            </div>
          </nav>
        </section>

        {/* CONTEÚDO */}
        <section className="max-w-6xl mx-auto px-6 lg:px-8 pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-8 space-y-8">
              {/* INTRO */}
              <p className="text-base md:text-lg leading-7 md:leading-8 text-gray-700">
                O Multiverso Estúdio valoriza a privacidade e a segurança dos dados de seus clientes, parceiros e visitantes.
                Esta Política de Privacidade tem como objetivo esclarecer como coletamos, utilizamos, armazenamos e protegemos
                suas informações pessoais, em conformidade com a legislação brasileira vigente, incluindo a Lei Geral de Proteção
                de Dados (Lei nº 13.709/2018 – LGPD) e o Marco Civil da Internet (Lei nº 12.965/2014).
              </p>

              {/* 1. COLETA E USO */}
              <section id="sec-1" className="bg-white border border-gray-200 rounded-2xl p-6 shadow-lg">
                <h2 className="uppercase text-sm font-bold tracking-wider text-black mb-4">1. COLETA E USO DE DADOS</h2>
                <div className="space-y-4 text-base leading-7 text-gray-700">
                  <p>Os dados pessoais fornecidos voluntariamente são utilizados para:</p>
                  <ul className="space-y-2">
                    <li className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-black flex-shrink-0"></span>
                      <span>Processar pedidos de compra e personalização de produtos;</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-black flex-shrink-0"></span>
                      <span>Realizar entregas e eventuais trocas/devoluções;</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-black flex-shrink-0"></span>
                      <span>Emitir documentos fiscais e cumprir obrigações legais;</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-black flex-shrink-0"></span>
                      <span>Melhorar a experiência no site e oferecer atendimento personalizado;</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-black flex-shrink-0"></span>
                      <span>Enviar informações sobre produtos, promoções e novidades, sempre que houver consentimento do cliente.</span>
                    </li>
                  </ul>

                  <p className="mt-3">
                    Os dados coletados podem incluir: nome completo, CPF, telefone, endereço, e-mail e dados de pagamento
                    (processados de forma segura por parceiros autorizados).
                  </p>
                </div>
              </section>

              {/* 2. PRIVACIDADE E SEGURANÇA */}
              <section id="sec-2" className="bg-white border border-gray-200 rounded-2xl p-6 shadow-lg">
                <h2 className="uppercase text-sm font-bold tracking-wider text-black mb-4">2. PRIVACIDADE E SEGURANÇA</h2>
                <div className="space-y-4 text-base leading-7 text-gray-700">
                  <p>O Multiverso Estúdio não solicita senhas ou dados bancários por telefone, WhatsApp ou e-mail.</p>
                  <p>Suas informações não são vendidas ou compartilhadas com terceiros, exceto quando necessário para:</p>
                  <ul className="space-y-2">
                    <li className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-black flex-shrink-0"></span>
                      <span>Processamento de pagamentos;</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-black flex-shrink-0"></span>
                      <span>Entrega de produtos;</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-black flex-shrink-0"></span>
                      <span>Cumprimento de exigências legais ou regulatórias.</span>
                    </li>
                  </ul>
                  <p className="mt-3">
                    Adotamos medidas técnicas e administrativas para proteger seus dados contra acessos não autorizados,
                    perdas ou alterações indevidas.
                  </p>
                </div>
              </section>

              {/* 3. COOKIES */}
              <section id="sec-3" className="bg-white border border-gray-200 rounded-2xl p-6 shadow-lg">
                <h2 className="uppercase text-sm font-bold tracking-wider text-black mb-4">3. COOKIES</h2>
                <div className="space-y-4 text-base leading-7 text-gray-700">
                  <p>Utilizamos cookies e tecnologias semelhantes para:</p>
                  <ul className="space-y-2">
                    <li className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-black flex-shrink-0"></span>
                      <span>Melhorar a navegação e personalizar sua experiência;</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-black flex-shrink-0"></span>
                      <span>Analisar estatísticas de acesso e comportamento no site;</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-black flex-shrink-0"></span>
                      <span>Exibir conteúdos e anúncios relevantes.</span>
                    </li>
                  </ul>
                  <p className="mt-3">
                    O usuário pode gerenciar ou desativar os cookies diretamente nas configurações de seu navegador.
                  </p>
                </div>
              </section>

              {/* 4. DIREITOS DO TITULAR */}
              <section id="sec-4" className="bg-white border border-gray-200 rounded-2xl p-6 shadow-lg">
                <h2 className="uppercase text-sm font-bold tracking-wider text-black mb-4">4. DIREITOS DO TITULAR</h2>
                <div className="space-y-4 text-base leading-7 text-gray-700">
                  <p>Conforme a LGPD, você tem direito a:</p>
                  <ul className="space-y-2">
                    <li className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-black flex-shrink-0"></span>
                      <span>Confirmar a existência de tratamento de seus dados;</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-black flex-shrink-0"></span>
                      <span>Solicitar acesso, correção ou exclusão de informações pessoais;</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-black flex-shrink-0"></span>
                      <span>Revogar consentimento previamente concedido;</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-black flex-shrink-0"></span>
                      <span>Solicitar a portabilidade dos dados a outro fornecedor, quando aplicável.</span>
                    </li>
                  </ul>
                  <p className="mt-3">
                    Para exercer seus direitos, entre em contato pelo e-mail:
                    <a href="mailto:contato@multiversoestudio.com.br" className="underline underline-offset-2 text-black hover:text-gray-700 transition-colors">
                      {" "}contato@multiversoestudio.com.br
                    </a>.
                  </p>
                </div>
              </section>

              {/* 5. ATUALIZAÇÕES */}
              <section id="sec-5" className="bg-white border border-gray-200 rounded-2xl p-6 shadow-lg">
                <h2 className="uppercase text-sm font-bold tracking-wider text-black mb-4">5. ATUALIZAÇÕES</h2>
                <div className="text-base leading-7 text-gray-700">
                  <p>
                    Esta Política poderá ser atualizada periodicamente para refletir melhorias em nossos processos,
                    alterações legais ou novas práticas adotadas. As mudanças passam a valer imediatamente após sua publicação nesta página.
                  </p>
                </div>
              </section>

              {/* ASSINATURA / FECHO */}
              <div className="mt-6 border-l-4 border-black pl-5">
                <p className="text-base leading-7 text-black font-semibold">
                  Multiverso Estúdio — Uma jornada exploratória simbiótica
                </p>
              </div>

            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
