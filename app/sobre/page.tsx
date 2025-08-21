"use client"

import { Navbar } from "@/components/navbar"
import Footer from "@/components/footer"
import Link from "next/link"

export default function SobrePage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main id="quem-somos" className="pt-24">
        {/* HERO */}
        <section className="max-w-6xl mx-auto px-6 lg:px-8 pt-16 pb-8">
          <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-black">
            QUEM SOMOS
          </h1>
          <div className="mt-4 h-[2px] w-24 bg-black"></div>
        </section>

        {/* CONTEÚDO */}
        <section className="max-w-6xl mx-auto px-6 lg:px-8 pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* TEXTO PRINCIPAL */}
            <div className="lg:col-span-8 space-y-6">
              <p className="text-base md:text-lg leading-7 md:leading-8 text-gray-700">
                O Multiverso Estúdio nasce da necessidade de criar não apenas um espaço, mas um
                movimento: um ponto de convergência onde artistas materializam, através de sua visão,
                ideias vindas de outros universos — os clientes.
              </p>

              <div className="border-l-4 border-black pl-5">
                <p className="text-base md:text-lg leading-7 md:leading-8 text-black">
                  Acreditamos em uma simbiose benéfica, onde cada criação é fruto da fusão entre a
                  identidade do artista e o imaginário do cliente. Dessa troca nascem peças únicas,
                  carregadas de experiências, decisões, anseios, esperança e de uma visão singular.
                </p>
              </div>

              <p className="text-base md:text-lg leading-7 md:leading-8 text-gray-700">
                Somos exploradores criativos em constante expansão, transformando ideias em realidades
                e conduzindo cada projeto como parte de uma
                <span className="font-semibold text-black">jornada exploratória simbiótica</span>.
              </p>
            </div>

            {/* LATERAL */}
            <aside className="lg:col-span-4">
              <div className="sticky top-6 space-y-4">
                <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-lg">
                  <h2 className="uppercase text-sm font-bold tracking-wider text-black">ESSÊNCIA</h2>
                  <p className="mt-3 text-sm leading-6 text-gray-700">
                    Convergimos visões. Unimos artista e cliente. Criamos peças que carregam história,
                    intenção e futuro — sempre com propósito e precisão.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-lg">
                    <span className="block text-[11px] uppercase tracking-wider text-gray-500">PILARES</span>
                    <ul className="mt-2 space-y-1 text-sm text-gray-700">
                      <li>Co-criação</li>
                      <li>Precisão estética</li>
                      <li>Funcionalidade</li>
                    </ul>
                  </div>
                  <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-lg">
                    <span className="block text-[11px] uppercase tracking-wider text-gray-500">MÉTODO</span>
                    <ul className="mt-2 space-y-1 text-sm text-gray-700">
                      <li>Escuta ativa</li>
                      <li>Prototipagem ágil</li>
                      <li>Entrega sob medida</li>
                    </ul>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
