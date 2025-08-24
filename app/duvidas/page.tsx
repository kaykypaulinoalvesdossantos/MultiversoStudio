"use client"

import { Navbar } from "@/components/navbar"
import Footer from "@/components/footer"

export default function DuvidasPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main className="bg-white text-black pt-20">
        {/* HEADER */}
        <section className="bg-white text-black px-6 lg:px-8 pt-16 pb-12 max-w-5xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight">
            Central de Ajuda — Multiverso Estúdio
          </h1>
          <div className="mt-4 h-[2px] w-24 bg-gray-800"></div>
          <p className="mt-6 text-base leading-7 text-gray-700 max-w-3xl">
            Bem-vindo à Central de Ajuda do Multiverso Estúdio.  
            Aqui você encontra respostas para as principais dúvidas sobre pedidos, prazos, entregas, trocas, medidas e cuidados com as peças.
          </p>
        </section>

        {/* MENU DE TÓPICOS */}
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-10">
            {/* DESKTOP: sidebar fixa */}
            <aside className="hidden lg:block col-span-3 sticky top-6 self-start">
              <nav aria-label="Navegação da Central de Ajuda" className="border border-gray-200 rounded-xl p-4">
                <h2 className="text-xs font-semibold uppercase text-gray-600 mb-3">Tópicos</h2>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li><a href="#pedidos" className="block rounded-lg px-3 py-2 hover:bg-gray-100 hover:text-black">Pedidos e Entregas</a></li>
                  <li><a href="#trocas" className="block rounded-lg px-3 py-2 hover:bg-gray-100 hover:text-black">Trocas e Devoluções</a></li>
                  <li><a href="#pagamentos" className="block rounded-lg px-3 py-2 hover:bg-gray-100 hover:text-black">Pagamentos e Cancelamentos</a></li>
                  <li><a href="#produtos" className="block rounded-lg px-3 py-2 hover:bg-gray-100 hover:text-black">Produtos, Tamanhos e Medidas</a></li>
                  <li><a href="#cuidados" className="block rounded-lg px-3 py-2 hover:bg-gray-100 hover:text-black">Cuidados com as Peças</a></li>
                  <li><a href="#atendimento" className="block rounded-lg px-3 py-2 hover:bg-gray-100 hover:text-black">Atendimento e Contato</a></li>
                </ul>
              </nav>
            </aside>

            {/* MOBILE: chips horizontais */}
            <nav aria-label="Navegação da Central de Ajuda" className="lg:hidden -mx-6 px-6 mb-8">
              <div className="flex gap-2 overflow-x-auto no-scrollbar py-2">
                <a href="#pedidos" className="whitespace-nowrap text-sm bg-gray-100 text-gray-800 hover:bg-gray-200 rounded-full px-4 py-2">Pedidos</a>
                <a href="#trocas" className="whitespace-nowrap text-sm bg-gray-100 text-gray-800 hover:bg-gray-200 rounded-full px-4 py-2">Trocas</a>
                <a href="#pagamentos" className="whitespace-nowrap text-sm bg-gray-100 text-gray-800 hover:bg-gray-200 rounded-full px-4 py-2">Pagamentos</a>
                <a href="#produtos" className="whitespace-nowrap text-sm bg-gray-100 text-gray-800 hover:bg-gray-200 rounded-full px-4 py-2">Produtos</a>
                <a href="#cuidados" className="whitespace-nowrap text-sm bg-gray-100 text-gray-800 hover:bg-gray-200 rounded-full px-4 py-2">Cuidados</a>
                <a href="#atendimento" className="whitespace-nowrap text-sm bg-gray-100 text-gray-800 hover:bg-gray-200 rounded-full px-4 py-2">Atendimento</a>
              </div>
            </nav>

            {/* CONTEÚDO */}
            <div className="lg:col-span-9">
              {/* PEDIDOS E ENTREGAS */}
              <section id="pedidos">
                <header className="mb-8">
                  <h2 className="text-xl md:text-2xl font-bold uppercase">Pedidos e Entregas</h2>
                  <div className="mt-3 h-[2px] w-16 bg-gray-800"></div>
                </header>

                <div className="space-y-8 text-base leading-7 text-gray-700">
                  {/* Prazo de produção */}
                  <article>
                    <h3 className="font-semibold text-gray-900">Qual é o prazo de produção dos produtos?</h3>
                    <p className="mt-2">
                      Todos os nossos produtos são feitos sob demanda, especialmente para cada cliente.
                      O prazo de produção é de <strong>5 a 10 dias úteis</strong> após a confirmação do pagamento.
                      Esse tempo garante qualidade no processo de criação, personalização e acabamento.
                    </p>
                  </article>

                  {/* Prazo de entrega */}
                  <article>
                    <h3 className="font-semibold text-gray-900">Qual é o prazo de entrega?</h3>
                    <p className="mt-2">
                      O prazo de entrega depende da transportadora e da região do cliente. Esse prazo começa a contar
                      <em>após o envio do pedido</em> (ou seja, depois dos 5 a 10 dias úteis de produção). Você pode
                      calcular o prazo estimado na página do produto, inserindo seu CEP no campo
                      <span className="text-gray-900">"Calcular Frete"</span>.
                    </p>
                  </article>

                  {/* Envio e rastreio */}
                  <article>
                    <h3 className="font-semibold text-gray-900">Como funciona o envio?</h3>
                    <p className="mt-2">
                      Após a finalização da produção, o pedido é postado e o cliente recebe um
                      <strong>código de rastreamento</strong> para acompanhar a entrega. O rastreio
                      estará disponível em até <strong>48 horas</strong> após a postagem.
                    </p>
                  </article>

                  {/* Ausência no endereço */}
                  <article>
                    <h3 className="font-semibold text-gray-900">E se não houver ninguém no endereço para receber?</h3>
                    <p className="mt-2">
                      As transportadoras realizam até <strong>3 tentativas</strong> de entrega. Caso não haja sucesso,
                      o pedido retorna ao nosso estúdio. Nesse caso, entraremos em contato para confirmar o endereço e
                      será necessário pagar um <strong>novo frete</strong> para reenvio.
                    </p>
                  </article>

                  {/* Endereço incorreto */}
                  <article>
                    <h3 className="font-semibold text-gray-900">E se o endereço estiver incorreto?</h3>
                    <p className="mt-2">
                      É responsabilidade do cliente preencher corretamente os dados no momento da compra.
                      Caso o pedido retorne por erro no endereço informado, será necessário pagar um
                      <strong>novo frete</strong> para reenvio.
                    </p>
                  </article>

                  {/* Atraso */}
                  <article className="border-l-4 border-gray-300 pl-4">
                    <h3 className="font-semibold text-gray-900">O que acontece se meu pedido atrasar?</h3>
                    <p className="mt-2">
                      Se o pedido ultrapassar o prazo de produção (5 a 10 dias úteis) ou o prazo de entrega indicado
                      pela transportadora, entre em contato conosco pelo e-mail
                      <a href="mailto:contato@multiversoestudio.com.br" className="underline underline-offset-2 text-gray-900">
                        contato@multiversoestudio.com.br
                      </a>
                      para verificarmos a situação.
                    </p>
                  </article>
                </div>

                {/* Link para próximo tópico */}
                <div className="mt-12">
                  <a href="#trocas" className="inline-block text-sm text-gray-700 underline underline-offset-2">
                    Ir para &rarr; Trocas e Devoluções
                  </a>
                </div>
              </section>

              {/* TROCAS E DEVOLUÇÕES */}
              <section id="trocas" className="mt-16">
                <header className="mb-8">
                  <h2 className="text-xl md:text-2xl font-bold uppercase">Trocas e Devoluções</h2>
                  <div className="mt-3 h-[2px] w-16 bg-gray-800"></div>
                </header>

                <div className="space-y-8 text-base leading-7 text-gray-700">
                  {/* Prazo */}
                  <article>
                    <h3 className="font-semibold text-gray-900">Qual é o prazo para solicitar troca ou devolução?</h3>
                    <p className="mt-2">
                      Você tem até <strong>7 dias corridos</strong> após o recebimento do produto para solicitar troca ou devolução,
                      conforme previsto no Código de Defesa do Consumidor (art. 49).
                    </p>
                  </article>

                  {/* Como solicitar */}
                  <article>
                    <h3 className="font-semibold text-gray-900">Como faço para solicitar?</h3>
                    <p className="mt-2">Envie um e-mail para 
                      <a href="mailto:contato@multiversoestudio.com.br" className="underline underline-offset-2 text-gray-900">
                        contato@multiversoestudio.com.br
                      </a> informando:</p>
                    <ul className="mt-2 list-disc pl-6 space-y-1">
                      <li>Número do pedido;</li>
                      <li>Produto a ser devolvido ou trocado;</li>
                      <li>Fotos da peça e da etiqueta (TAG).</li>
                    </ul>
                  </article>

                  {/* Condições */}
                  <article>
                    <h3 className="font-semibold text-gray-900">Quais condições o produto deve atender?</h3>
                    <ul className="mt-2 list-disc pl-6 space-y-1">
                      <li>Estar sem uso, com etiqueta e em condições adequadas para revenda;</li>
                      <li>Preferencialmente devolvido na embalagem original;</li>
                      <li>
                        Produtos personalizados (feitos sob medida ou com arte exclusiva) não se enquadram no direito
                        de arrependimento. Nestes casos, a devolução só será aceita em caso de <strong>defeito de fabricação</strong>.
                      </li>
                    </ul>
                  </article>

                  {/* Custos */}
                  <article>
                    <h3 className="font-semibold text-gray-900">Quem paga o frete da troca ou devolução?</h3>
                    <p className="mt-2"><strong>Arrependimento (até 7 dias):</strong> reembolso integral, incluindo produto + frete de envio + frete de devolução.</p>
                    <p className="mt-2"><strong>Trocas por conveniência</strong> (tamanho, cor, preferência):</p>
                    <ul className="mt-2 list-disc pl-6 space-y-1">
                      <li>A primeira troca é gratuita;</li>
                      <li>A partir da segunda, taxa fixa de <strong>R$ 9,99</strong>.</li>
                    </ul>
                  </article>

                  {/* Reembolso */}
                  <article>
                    <h3 className="font-semibold text-gray-900">Qual é o prazo para reembolso?</h3>
                    <p className="mt-2">
                      O reembolso será processado em até <strong>10 dias úteis</strong> após o recebimento e conferência do produto em nosso estúdio.
                    </p>
                  </article>

                  {/* Cupom */}
                  <article>
                    <h3 className="font-semibold text-gray-900">Posso escolher cupom em vez de reembolso?</h3>
                    <p className="mt-2">
                      Sim. Você pode solicitar um <strong>cupom</strong> no valor do produto, válido para nova compra no site.
                      O cupom não é cumulativo com outros cupons promocionais.
                    </p>
                  </article>

                  {/* Defeito */}
                  <article className="border-l-4 border-gray-300 pl-4">
                    <h3 className="font-semibold text-gray-900">E se o produto tiver defeito?</h3>
                    <p className="mt-2">
                      Produtos com defeito de fabricação são cobertos pela garantia e podem ser trocados ou devolvidos
                      independentemente do prazo de 7 dias. Entre em contato conosco para análise do caso.
                    </p>
                  </article>
                </div>

                {/* Link para próximo tópico */}
                <div className="mt-12">
                  <a href="#pagamentos" className="inline-block text-sm text-gray-700 underline underline-offset-2">
                    Ir para &rarr; Pagamentos e Cancelamentos
                  </a>
                </div>
              </section>

              {/* PAGAMENTOS E CANCELAMENTOS */}
              <section id="pagamentos" className="mt-16">
                <header className="mb-8">
                  <h2 className="text-xl md:text-2xl font-bold uppercase">Pagamentos e Cancelamentos</h2>
                  <div className="mt-3 h-[2px] w-16 bg-gray-800"></div>
                </header>

                <div className="space-y-8 text-base leading-7 text-gray-700">
                  {/* Formas de pagamento */}
                  <article>
                    <h3 className="font-semibold text-gray-900">Quais são as formas de pagamento aceitas?</h3>
                    <ul className="mt-2 list-disc pl-6 space-y-1">
                      <li>Cartões de crédito (com parcelamento disponível);</li>
                      <li>Boleto bancário;</li>
                      <li>PIX (à vista);</li>
                      <li>PayPal.</li>
                    </ul>
                  </article>

                  {/* Parcelamento */}
                  <article>
                    <h3 className="font-semibold text-gray-900">Posso parcelar minhas compras?</h3>
                    <p className="mt-2">
                      Sim. Compras no cartão de crédito podem ser parceladas de acordo com as opções disponíveis
                      no checkout. Eventuais juros ou taxas serão exibidos no momento da finalização.
                    </p>
                  </article>

                  {/* Boleto vencido */}
                  <article>
                    <h3 className="font-semibold text-gray-900">Meu boleto venceu. E agora?</h3>
                    <p className="mt-2">
                      Caso o boleto não seja pago até a data de vencimento, o pedido é automaticamente cancelado.
                      Para efetivar a compra, será necessário gerar um novo pedido.
                    </p>
                  </article>

                  {/* Confirmação */}
                  <article>
                    <h3 className="font-semibold text-gray-900">O que acontece após o pagamento?</h3>
                    <ul className="mt-2 list-disc pl-6 space-y-1">
                      <li>Cartão ou PIX → confirmação em até algumas horas;</li>
                      <li>Boleto → até 2 dias úteis para compensação;</li>
                      <li>Após a confirmação → entra no prazo de produção de 5 a 10 dias úteis.</li>
                    </ul>
                  </article>

                  {/* Alteração ou cancelamento */}
                  <article>
                    <h3 className="font-semibold text-gray-900">Posso alterar ou cancelar meu pedido?</h3>
                    <p className="mt-2">
                      Sim, desde que o pedido ainda não tenha sido produzido ou enviado.  
                      Entre em contato imediatamente pelo e-mail
                      <a href="mailto:contato@multiversoestudio.com.br" className="underline underline-offset-2 text-gray-900">
                        contato@multiversoestudio.com.br
                      </a> informando o número do pedido.
                    </p>
                    <p className="mt-2">
                      Caso o pedido já esteja em produção, não será possível alterá-lo ou cancelá-lo.
                    </p>
                  </article>

                  {/* Reembolso */}
                  <article>
                    <h3 className="font-semibold text-gray-900">Como funciona o reembolso em caso de cancelamento?</h3>
                    <p className="mt-2">
                      O reembolso será processado em até <strong>10 dias úteis</strong> após a confirmação do cancelamento,
                      e será feito pelo mesmo método de pagamento utilizado (cartão, boleto, PIX ou PayPal).
                    </p>
                  </article>
                </div>

                {/* Link para próximo tópico */}
                <div className="mt-12">
                  <a href="#produtos" className="inline-block text-sm text-gray-700 underline underline-offset-2">
                    Ir para &rarr; Produtos, Tamanhos e Medidas
                  </a>
                </div>
              </section>

              {/* PRODUTOS, TAMANHOS E MEDIDAS */}
              <section id="produtos" className="mt-16">
                <header className="mb-8">
                  <h2 className="text-xl md:text-2xl font-bold uppercase">Produtos, Tamanhos e Medidas</h2>
                  <div className="mt-3 h-[2px] w-16 bg-gray-800"></div>
                </header>

                <div className="space-y-8 text-base leading-7 text-gray-700">
                  {/* Perguntas gerais */}
                  <article>
                    <h3 className="font-semibold text-gray-900">Como escolher o tamanho ideal?</h3>
                    <p className="mt-2">
                      Cada produto possui uma tabela de medidas específica na página do item.  
                      Compare com uma peça que você já tenha para garantir o caimento correto.
                    </p>
                  </article>

                  <article>
                    <h3 className="font-semibold text-gray-900">As peças podem variar de tamanho?</h3>
                    <p className="mt-2">
                      Sim. Por serem produzidas sob demanda, pode haver variação de <strong>2 a 4 cm</strong> antes ou após a lavagem,
                      considerada normal na confecção têxtil.
                    </p>
                  </article>

                  <article>
                    <h3 className="font-semibold text-gray-900">As peças encolhem após a lavagem?</h3>
                    <p className="mt-2">
                      Pode ocorrer encolhimento natural de até <strong>2%</strong>, principalmente em peças de algodão.
                    </p>
                  </article>

                  <article>
                    <h3 className="font-semibold text-gray-900">Vocês têm loja física?</h3>
                    <p className="mt-2">
                      Atualmente funcionamos exclusivamente online, atendendo todo o Brasil e focando em produções sob demanda.
                    </p>
                  </article>

                  {/* Tabelas */}
                  <div className="space-y-12">
                    {/* Moletom Gola Careca */}
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Tabela de Medidas – Moletom Gola Careca</h4>
                      <div className="overflow-x-auto">
                        <table className="w-full border border-gray-300 text-sm text-gray-700">
                          <thead className="bg-gray-100 text-gray-900">
                            <tr>
                              <th className="border border-gray-300 p-2">Tamanho</th>
                              <th className="border border-gray-300 p-2">Comprimento</th>
                              <th className="border border-gray-300 p-2">Largura</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr><td className="p-2 border">P</td><td className="p-2 border">68 cm</td><td className="p-2 border">57 cm</td></tr>
                            <tr><td className="p-2 border">M</td><td className="p-2 border">70 cm</td><td className="p-2 border">59 cm</td></tr>
                            <tr><td className="p-2 border">G</td><td className="p-2 border">72 cm</td><td className="p-2 border">61 cm</td></tr>
                            <tr><td className="p-2 border">GG</td><td className="p-2 border">74 cm</td><td className="p-2 border">63 cm</td></tr>
                            <tr><td className="p-2 border">EXG</td><td className="p-2 border">76 cm</td><td className="p-2 border">66 cm</td></tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Regular */}
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Tabela de Medidas – Regular</h4>
                      <div className="overflow-x-auto">
                        <table className="w-full border border-gray-300 text-sm text-gray-700">
                          <thead className="bg-gray-100 text-gray-900">
                            <tr>
                              <th className="border border-gray-300 p-2">Tamanho</th>
                              <th className="border border-gray-300 p-2">Comprimento</th>
                              <th className="border border-gray-300 p-2">Largura</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr><td className="p-2 border">P</td><td className="p-2 border">72 cm</td><td className="p-2 border">52 cm</td></tr>
                            <tr><td className="p-2 border">M</td><td className="p-2 border">74 cm</td><td className="p-2 border">54 cm</td></tr>
                            <tr><td className="p-2 border">G</td><td className="p-2 border">76 cm</td><td className="p-2 border">56 cm</td></tr>
                            <tr><td className="p-2 border">GG</td><td className="p-2 border">78 cm</td><td className="p-2 border">58 cm</td></tr>
                            <tr><td className="p-2 border">EXG</td><td className="p-2 border">82 cm</td><td className="p-2 border">62 cm</td></tr>
                            <tr><td className="p-2 border">52</td><td className="p-2 border">82 cm</td><td className="p-2 border">69 cm</td></tr>
                            <tr><td className="p-2 border">54</td><td className="p-2 border">84 cm</td><td className="p-2 border">71 cm</td></tr>
                            <tr><td className="p-2 border">56</td><td className="p-2 border">86 cm</td><td className="p-2 border">73 cm</td></tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Baby Look */}
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Tabela de Medidas – Baby Look</h4>
                      <div className="overflow-x-auto">
                        <table className="w-full border border-gray-300 text-sm text-gray-700">
                          <thead className="bg-gray-100 text-gray-900">
                            <tr>
                              <th className="border border-gray-300 p-2">Tamanho</th>
                              <th className="border border-gray-300 p-2">Comprimento</th>
                              <th className="border border-gray-300 p-2">Largura</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr><td className="p-2 border">P</td><td className="p-2 border">59 cm</td><td className="p-2 border">45 cm</td></tr>
                            <tr><td className="p-2 border">M</td><td className="p-2 border">62 cm</td><td className="p-2 border">47 cm</td></tr>
                            <tr><td className="p-2 border">G</td><td className="p-2 border">64 cm</td><td className="p-2 border">51 cm</td></tr>
                            <tr><td className="p-2 border">GG</td><td className="p-2 border">67 cm</td><td className="p-2 border">55 cm</td></tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Oversized */}
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Tabela de Medidas – Oversized</h4>
                      <div className="overflow-x-auto">
                        <table className="w-full border border-gray-300 text-sm text-gray-700">
                          <thead className="bg-gray-100 text-gray-900">
                            <tr>
                              <th className="border border-gray-300 p-2">Tamanho</th>
                              <th className="border border-gray-300 p-2">Comprimento</th>
                              <th className="border border-gray-300 p-2">Largura</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr><td className="p-2 border">P</td><td className="p-2 border">72 cm</td><td className="p-2 border">56 cm</td></tr>
                            <tr><td className="p-2 border">M</td><td className="p-2 border">74 cm</td><td className="p-2 border">58 cm</td></tr>
                            <tr><td className="p-2 border">G</td><td className="p-2 border">76 cm</td><td className="p-2 border">59 cm</td></tr>
                            <tr><td className="p-2 border">GG</td><td className="p-2 border">77 cm</td><td className="p-2 border">60 cm</td></tr>
                            <tr><td className="p-2 border">EXG</td><td className="p-2 border">83 cm</td><td className="p-2 border">63 cm</td></tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Infantil */}
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Tabela de Medidas – Regular Infantil</h4>
                      <div className="overflow-x-auto">
                        <table className="w-full border border-gray-300 text-sm text-gray-700">
                          <thead className="bg-gray-100 text-gray-900">
                            <tr>
                              <th className="border border-gray-300 p-2">Tamanho</th>
                              <th className="border border-gray-300 p-2">Comprimento</th>
                              <th className="border border-gray-300 p-2">Largura</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr><td className="p-2 border">2</td><td className="p-2 border">35 cm</td><td className="p-2 border">27 cm</td></tr>
                            <tr><td className="p-2 border">4</td><td className="p-2 border">39 cm</td><td className="p-2 border">29 cm</td></tr>
                            <tr><td className="p-2 border">6</td><td className="p-2 border">43 cm</td><td className="p-2 border">32 cm</td></tr>
                            <tr><td className="p-2 border">8</td><td className="p-2 border">48 cm</td><td className="p-2 border">36 cm</td></tr>
                            <tr><td className="p-2 border">10</td><td className="p-2 border">51 cm</td><td className="p-2 border">38 cm</td></tr>
                            <tr><td className="p-2 border">12</td><td className="p-2 border">53 cm</td><td className="p-2 border">40 cm</td></tr>
                            <tr><td className="p-2 border">14</td><td className="p-2 border">59 cm</td><td className="p-2 border">44 cm</td></tr>
                            <tr><td className="p-2 border">16</td><td className="p-2 border">63 cm</td><td className="p-2 border">48 cm</td></tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Link para próximo tópico */}
                <div className="mt-12">
                  <a href="#cuidados" className="inline-block text-sm text-gray-700 underline underline-offset-2">
                    Ir para &rarr; Cuidados com as Peças
                  </a>
                </div>
              </section>

              {/* CUIDADOS COM AS PEÇAS */}
              <section id="cuidados" className="mt-16">
                <header className="mb-8">
                  <h2 className="text-xl md:text-2xl font-bold uppercase">Cuidados com as Peças</h2>
                  <div className="mt-3 h-[2px] w-16 bg-gray-800"></div>
                </header>

                <div className="space-y-10 text-base leading-7 text-gray-700">
                  {/* Lavagem */}
                  <article>
                    <h3 className="font-semibold text-gray-900 mb-2">Lavagem</h3>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Lavar preferencialmente à mão ou em ciclo delicado, sempre do avesso.</li>
                      <li>Usar sabão neutro e água fria.</li>
                      <li>Evitar o uso de água sanitária ou produtos agressivos.</li>
                      <li>Não deixar de molho por longos períodos.</li>
                      <li>Na máquina, limitar a lavagem a no máximo 50 minutos.</li>
                    </ul>
                  </article>

                  {/* Secagem */}
                  <article>
                    <h3 className="font-semibold text-gray-900 mb-2">Secagem</h3>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Secar naturalmente à sombra.</li>
                      <li>Evitar máquina de secar.</li>
                      <li>Não expor diretamente ao sol para preservar as cores.</li>
                    </ul>
                  </article>

                  {/* Passadoria */}
                  <article>
                    <h3 className="font-semibold text-gray-900 mb-2">Passadoria</h3>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Passar sempre do avesso para proteger o design.</li>
                      <li>Usar ferro em temperatura branda (até 110ºC).</li>
                      <li>Evitar vapor diretamente sobre estampas.</li>
                    </ul>
                  </article>

                  {/* Cuidados adicionais */}
                  <article>
                    <h3 className="font-semibold text-gray-900 mb-2">Cuidados Adicionais</h3>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Não realizar lavagem a seco.</li>
                      <li>Em peças com golas e ribanas, evitar esfregar diretamente essas áreas.</li>
                      <li>Camisetas ringer e peças estampadas: sempre lavar separadas, do avesso e sem deixar de molho.</li>
                    </ul>
                  </article>

                  <p className="mt-6 text-gray-800">
                    ✅ Seguindo essas orientações, suas peças terão vida útil prolongada e manterão a estética original por muito mais tempo.
                  </p>
                </div>

                {/* Link para próximo tópico */}
                <div className="mt-12">
                  <a href="#atendimento" className="inline-block text-sm text-gray-700 underline underline-offset-2">
                    Ir para &rarr; Atendimento e Contato
                  </a>
                </div>
              </section>

              {/* ATENDIMENTO E CONTATO */}
              <section id="atendimento" className="mt-16">
                <header className="mb-8">
                  <h2 className="text-xl md:text-2xl font-bold uppercase">Atendimento e Contato</h2>
                  <div className="mt-3 h-[2px] w-16 bg-gray-800"></div>
                </header>

                <div className="space-y-8 text-base leading-7 text-gray-700">
                  {/* Introdução */}
                  <p>
                    Estamos aqui para ajudar em todas as etapas da sua jornada com o Multiverso Estúdio — 
                    do clique até a entrega.
                  </p>

                  {/* Canais */}
                  <article>
                    <h3 className="font-semibold text-gray-900 mb-2">Canais de Atendimento</h3>
                    <ul className="space-y-2">
                      <li>Email: 
                        <a href="mailto:contato@multiversoestudio.com.br" className="underline underline-offset-2 text-gray-900">
                          contato@multiversoestudio.com.br
                        </a>
                      </li>
                      <li>Instagram: 
                        <a href="https://instagram.com/multiversoestudio" target="_blank" className="underline underline-offset-2 text-gray-900">
                          @multiversoestudio
                        </a>
                      </li>
                      <li>WhatsApp: disponível no botão de contato do site</li>
                    </ul>
                  </article>

                  {/* Horários */}
                  <article>
                    <h3 className="font-semibold text-gray-900 mb-2">Horário de Atendimento</h3>
                    <p>Segunda a sexta-feira, das 9h às 18h (exceto feriados).</p>
                  </article>

                  {/* Prazos */}
                  <article>
                    <h3 className="font-semibold text-gray-900 mb-2">Prazos de Resposta</h3>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>E-mails: até 2 dias úteis</li>
                      <li>WhatsApp: geralmente no mesmo dia útil</li>
                    </ul>
                  </article>

                  {/* Observações */}
                  <article>
                    <h3 className="font-semibold text-gray-900 mb-2">Observações Importantes</h3>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Não realizamos suporte via mensagens privadas no Instagram.</li>
                      <li>Sempre utilize os canais oficiais para segurança e agilidade.</li>
                      <li>Tenha o número do pedido em mãos ao entrar em contato.</li>
                    </ul>
                  </article>

                  {/* Encerramento */}
                  <p className="mt-8 text-gray-800">
                    Caso ainda reste alguma dúvida ou situação específica, entre em contato.  
                    Estamos prontos para te atender e garantir que sua experiência seja parte de uma 
                    <strong>jornada exploratória simbiótica</strong>.
                  </p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
