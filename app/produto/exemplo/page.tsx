"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Navbar } from "@/components/navbar"
import Footer from "@/components/footer"

export default function ExemploProdutoPage() {
  const produtos = [
    {
      id: "multiverso-100",
      name: "CAMISETA MULTIVERSO DE 100% — LOGO OFICIAL",
      price: "R$ 79,90",
      originalPrice: "R$ 99,90",
      badge: "LIMITADA",
      description: "Malha premium 100% algodão, modelagens Regular / Oversized / Babylook / Infantil. Estampa oficial do Multiverso de 100% - Edição Limitada.",
      color: "from-purple-600 to-blue-600",
      link: "/produto/multiverso-100"
    },
    {
      id: "multiverso-estudio",
      name: "CAMISETA MULTIVERSO ESTÚDIO — LOGO OFICIAL",
      price: "R$ 69,90",
      originalPrice: "R$ 89,90",
      badge: "EXCLUSIVO",
      description: "Malha premium, modelagens Regular / Oversized / Babylook / Infantil. Estampa oficial do Multiverso Estúdio.",
      color: "from-green-400 to-green-500",
      link: "/produto/multiverso-estudio"
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="pt-24">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-black uppercase tracking-tight text-black mb-4">
              EXEMPLOS DE PRODUTOS
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Veja como a página de produto se adapta automaticamente para diferentes produtos
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {produtos.map((produto) => (
              <Card key={produto.id} className="overflow-hidden">
                <CardHeader className={`bg-gradient-to-r ${produto.color} text-white`}>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl font-black uppercase">
                      {produto.badge}
                    </CardTitle>
                    <div className="text-right">
                      <div className="text-2xl font-black">{produto.price}</div>
                      <div className="text-sm line-through opacity-80">{produto.originalPrice}</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-black mb-3">
                    {produto.name}
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {produto.description}
                  </p>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      Frete grátis
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                      5-10 dias úteis de produção
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                      7 dias para troca/devolução
                    </div>
                  </div>

                  <div className="mt-6">
                    <Link href={produto.link}>
                      <Button 
                        className={`w-full bg-gradient-to-r ${produto.color} hover:opacity-90 text-white font-black uppercase tracking-wider`}
                      >
                        VER PRODUTO
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <div className="bg-white border border-gray-200 rounded-lg p-6 max-w-2xl mx-auto">
              <h3 className="text-lg font-bold text-black mb-3">Como Funciona</h3>
              <p className="text-gray-600 mb-4">
                A página de produto detecta automaticamente o ID do produto e aplica:
              </p>
              <ul className="text-left text-sm text-gray-600 space-y-2">
                <li>• <strong>Nome e descrição</strong> específicos do produto</li>
                <li>• <strong>Preços</strong> corretos (normal e original)</li>
                <li>• <strong>Badge</strong> apropriado (LIMITADA, EXCLUSIVO)</li>
                <li>• <strong>Imagens</strong> específicas do produto</li>
                <li>• <strong>Estilo do botão</strong> personalizado</li>
                <li>• <strong>Breadcrumb</strong> correto</li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
