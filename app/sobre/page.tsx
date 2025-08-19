"use client"

import { Navbar } from "@/components/navbar"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function SobrePage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main className="pt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Sobre Nós</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Conheça a história e missão do Multiverso Studio
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Nossa Missão</h2>
              <p className="text-gray-600 leading-relaxed">
                O Multiverso Studio é uma plataforma inovadora que conecta criadores e fãs através de produtos únicos e exclusivos. 
                Nossa missão é democratizar o acesso a produtos de qualidade, permitindo que cada criador tenha sua própria loja 
                dentro da nossa plataforma.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Como Funciona</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Criadores podem abrir suas lojas personalizadas, oferecendo produtos exclusivos para seus fãs. 
                Cada loja é um universo próprio, com identidade visual única e produtos selecionados.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Os fãs podem navegar entre diferentes lojas, descobrindo produtos únicos e apoiando seus criadores favoritos.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Nossos Valores</h2>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                  <strong>Inovação:</strong> Sempre buscando novas formas de conectar criadores e fãs
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                  <strong>Qualidade:</strong> Produtos selecionados com rigor para garantir a satisfação
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                  <strong>Comunidade:</strong> Fomentando conexões genuínas entre criadores e fãs
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                  <strong>Sustentabilidade:</strong> Práticas responsáveis em toda nossa operação
                </li>
              </ul>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link href="/para-criadores">
              <Button className="mr-4">Seja um Criador</Button>
            </Link>
            <Link href="/">
              <Button variant="outline">Voltar ao Início</Button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
