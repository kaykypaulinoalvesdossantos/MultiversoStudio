"use client"

import { Navbar } from "@/components/navbar"
import Footer from "@/components/footer"
import Link from "next/link"

export default function TermosDeUsoPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main id="termos-de-uso" className="pt-20">
        {/* HERO */}
        <section className="max-w-6xl mx-auto px-6 lg:px-8 pt-16 pb-8">
          <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-black">
            TERMOS DE USO – MULTIVERSO ESTÚDIO
          </h1>
          <div className="mt-4 h-[2px] w-24 bg-black"></div>
          <p className="mt-3 text-sm text-gray-500">Atualizado em 20 de agosto de 2025</p>
        </section>

        {/* SUMÁRIO */}
        <section className="max-w-6xl mx-auto px-6 lg:px-8 pb-6">
          <nav className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-8">
              <ul className="space-y-1 text-sm text-gray-600">
                <li>
                  <a href="#sec-0" className="underline underline-offset-2 hover:no-underline hover:text-black transition-colors">
                    Introdução
                  </a>
                </li>
                <li>
                  <a href="#sec-1" className="underline underline-offset-2 hover:no-underline hover:text-black transition-colors">
                    1. Aceitação dos Termos
                  </a>
                </li>
                <li>
                  <a href="#sec-2" className="underline underline-offset-2 hover:no-underline hover:text-black transition-colors">
                    2. Uso Autorizado
                  </a>
                </li>
                <li>
                  <a href="#sec-3" className="underline underline-offset-2 hover:no-underline hover:text-black transition-colors">
                    3. Produtos e Serviços
                  </a>
                </li>
                <li>
                  <a href="#sec-4" className="underline underline-offset-2 hover:no-underline hover:text-black transition-colors">
                    4. Pagamentos e Segurança
                  </a>
                </li>
                <li>
                  <a href="#sec-5" className="underline underline-offset-2 hover:no-underline hover:text-black transition-colors">
                    5. Isenção de Responsabilidade
                  </a>
                </li>
                <li>
                  <a href="#sec-6" className="underline underline-offset-2 hover:no-underline hover:text-black transition-colors">
                    6. Propriedade Intelectual
                  </a>
                </li>
                <li>
                  <a href="#sec-7" className="underline underline-offset-2 hover:no-underline hover:text-black transition-colors">
                    7. Links Externos
                  </a>
                </li>
                <li>
                  <a href="#sec-8" className="underline underline-offset-2 hover:no-underline hover:text-black transition-colors">
                    8. Alterações nos Termos
                  </a>
                </li>
                <li>
                  <a href="#sec-9" className="underline underline-offset-2 hover:no-underline hover:text-black transition-colors">
                    9. Lei Aplicável e Foro
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
              <section id="sec-0" className="bg-white border border-gray-200 rounded-2xl p-6 shadow-lg">
                <p className="text-base md:text-lg leading-7 md:leading-8 text-gray-700">
                  O presente Termo de Uso ("Termos") regulamenta as condições gerais de utilização do site
                  <span className="text-black font-semibold">{" "}www.multiversoestudio.com.br</span> e demais canais digitais operados pelo Multiverso Estúdio,
                  em conformidade com a legislação brasileira, incluindo, mas não se limitando, ao Código de Defesa do Consumidor
                  (Lei nº 8.078/1990) e ao Marco Civil da Internet (Lei nº 12.965/2014).
                </p>
              </section>

              {/* 1. ACEITAÇÃO DOS TERMOS */}
              <section id="sec-1" className="bg-white border border-gray-200 rounded-2xl p-6 shadow-lg">
                <h2 className="uppercase text-sm font-bold tracking-wider text-black mb-4">1. ACEITAÇÃO DOS TERMOS</h2>
                <div className="text-base leading-7 text-gray-700">
                  <p>
                    Ao acessar e utilizar o site do Multiverso Estúdio, o usuário declara ter lido, compreendido e aceitado estes
                    Termos de Uso. Caso não concorde com qualquer condição, deve interromper imediatamente o uso do site.
                  </p>
                </div>
              </section>

              {/* 2. USO AUTORIZADO */}
              <section id="sec-2" className="bg-white border border-gray-200 rounded-2xl p-6 shadow-lg">
                <h2 className="uppercase text-sm font-bold tracking-wider text-black mb-4">2. USO AUTORIZADO</h2>
                <div className="space-y-4 text-base leading-7 text-gray-700">
                  <p>
                    É concedida ao usuário uma licença limitada, não exclusiva e intransferível para acessar e utilizar os materiais
                    disponibilizados no site exclusivamente para fins pessoais e não comerciais.
                  </p>
                  <p className="text-black font-semibold">Não é permitido:</p>
                  <ul className="space-y-2">
                    <li className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-black flex-shrink-0"></span>
                      <span>Modificar ou copiar os materiais;</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-black flex-shrink-0"></span>
                      <span>Utilizar os conteúdos para fins comerciais ou de exibição pública sem autorização;</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-black flex-shrink-0"></span>
                      <span>Descompilar, aplicar engenharia reversa ou explorar tecnicamente o site;</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-black flex-shrink-0"></span>
                      <span>Remover marcas, direitos autorais ou avisos de propriedade;</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-black flex-shrink-0"></span>
                      <span>Reproduzir ou redistribuir conteúdos sem autorização formal do Multiverso Estúdio.</span>
                    </li>
                  </ul>
                </div>
              </section>

              {/* 3. PRODUTOS E SERVIÇOS */}
              <section id="sec-3" className="bg-white border border-gray-200 rounded-2xl p-6 shadow-lg">
                <h2 className="uppercase text-sm font-bold tracking-wider text-black mb-4">3. PRODUTOS E SERVIÇOS</h2>
                <div className="space-y-4 text-base leading-7 text-gray-700">
                  <p>
                    O site disponibiliza informações, preços e descrições dos produtos personalizados oferecidos pelo Multiverso Estúdio.
                  </p>
                  <p>
                    O usuário é responsável por conferir as informações antes de concluir a compra.
                  </p>
                  <p>
                    Os prazos de produção, entrega e políticas de troca ou devolução estão descritos na
                    <span className="text-black font-semibold">{" "}Política de Troca e Devolução</span> e na
                    <span className="text-black font-semibold">{" "}Política de Privacidade</span>.
                  </p>
                </div>
              </section>

              {/* 4. PAGAMENTOS E SEGURANÇA */}
              <section id="sec-4" className="bg-white border border-gray-200 rounded-2xl p-6 shadow-lg">
                <h2 className="uppercase text-sm font-bold tracking-wider text-black mb-4">4. PAGAMENTOS E SEGURANÇA</h2>
                <div className="space-y-4 text-base leading-7 text-gray-700">
                  <p>
                    Os pagamentos podem ser realizados via Pix, cartão de crédito, boleto ou outras formas disponibilizadas no site.
                  </p>
                  <p>
                    O Multiverso Estúdio não solicita senhas ou dados bancários por telefone, e-mail ou WhatsApp.
                  </p>
                  <p>
                    Todas as transações financeiras são processadas em ambiente seguro por intermediadores de pagamento autorizados.
                  </p>
                </div>
              </section>

              {/* 5. ISENÇÃO DE RESPONSABILIDADE */}
              <section id="sec-5" className="bg-white border border-gray-200 rounded-2xl p-6 shadow-lg">
                <h2 className="uppercase text-sm font-bold tracking-wider text-black mb-4">5. ISENÇÃO DE RESPONSABILIDADE</h2>
                <div className="text-base leading-7 text-gray-700">
                  <p>
                    Os materiais e informações do site são fornecidos "no estado em que se encontram", sem garantias de exatidão,
                    atualização ou ausência de erros. O Multiverso Estúdio não se responsabiliza por danos indiretos ou prejuízos
                    decorrentes do uso inadequado do site ou dos produtos.
                  </p>
                </div>
              </section>

              {/* 6. PROPRIEDADE INTELECTUAL */}
              <section id="sec-6" className="bg-white border border-gray-200 rounded-2xl p-6 shadow-lg">
                <h2 className="uppercase text-sm font-bold tracking-wider text-black mb-4">6. PROPRIEDADE INTELECTUAL</h2>
                <div className="text-base leading-7 text-gray-700">
                  <p>
                    Todos os elementos do site – textos, imagens, artes, logotipos, marcas, layout e demais conteúdos – são de
                    propriedade exclusiva do Multiverso Estúdio, sendo vedada a reprodução ou uso não autorizado, sob pena de
                    responsabilização civil e criminal conforme a legislação brasileira de direitos autorais e propriedade intelectual.
                  </p>
                </div>
              </section>

              {/* 7. LINKS EXTERNOS */}
              <section id="sec-7" className="bg-white border border-gray-200 rounded-2xl p-6 shadow-lg">
                <h2 className="uppercase text-sm font-bold tracking-wider text-black mb-4">7. LINKS EXTERNOS</h2>
                <div className="text-base leading-7 text-gray-700">
                  <p>
                    O site pode conter links para páginas de terceiros. O Multiverso Estúdio não possui controle sobre esses conteúdos
                    e não se responsabiliza por informações, práticas ou serviços externos. O acesso é por conta e risco do usuário.
                  </p>
                </div>
              </section>

              {/* 8. ALTERAÇÕES NOS TERMOS */}
              <section id="sec-8" className="bg-white border border-gray-200 rounded-2xl p-6 shadow-lg">
                <h2 className="uppercase text-sm font-bold tracking-wider text-black mb-4">8. ALTERAÇÕES NOS TERMOS</h2>
                <div className="text-base leading-7 text-gray-700">
                  <p>
                    O Multiverso Estúdio poderá atualizar estes Termos periodicamente, sendo recomendada a verificação regular pelo
                    usuário. A continuidade do uso do site após eventuais alterações implica aceitação integral da nova versão.
                  </p>
                </div>
              </section>

              {/* 9. LEI APLICÁVEL E FORO */}
              <section id="sec-9" className="bg-white border border-gray-200 rounded-2xl p-6 shadow-lg">
                <h2 className="uppercase text-sm font-bold tracking-wider text-black mb-4">9. LEI APLICÁVEL E FORO</h2>
                <div className="text-base leading-7 text-gray-700">
                  <p>
                    Estes Termos são regidos pelas leis da República Federativa do Brasil. Para dirimir eventuais conflitos relacionados
                    à interpretação ou execução destes Termos, fica eleito o foro da comarca de São Paulo/SP, com renúncia a qualquer
                    outro, por mais privilegiado que seja.
                  </p>
                </div>
              </section>

              {/* CONTATO */}
              <section className="bg-white border border-gray-200 rounded-2xl p-6 shadow-lg">
                <div className="text-base leading-7 text-gray-700">
                  <p>📩 Dúvidas? Entre em contato:
                    <a href="mailto:contato@multiversoestudio.com.br" className="underline underline-offset-2 text-black hover:text-gray-700 transition-colors">
                      {" "}contato@multiversoestudio.com.br
                    </a>
                  </p>
                </div>
              </section>

              {/* FECHO */}
              <div className="mt-6 border-l-4 border-black pl-5">
                <p className="text-base leading-7 text-black font-semibold">
                  ✨ Multiverso Estúdio – Uma jornada exploratória simbiótica
                </p>
              </div>

              {/* VOLTAR AO TOPO */}
              <div className="mt-6">
                <a href="#termos-de-uso" className="text-sm text-gray-600 underline underline-offset-2 hover:no-underline hover:text-black transition-colors">
                  Voltar ao topo
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
