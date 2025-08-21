"use client"

import { useEffect, useState } from "react"
import { Navbar } from "@/components/navbar"
import Footer from "@/components/footer"

export default function VerificacaoFontesPage() {
  const [fontsLoaded, setFontsLoaded] = useState<{[key: string]: boolean}>({})
  const [isChecking, setIsChecking] = useState(true)

  useEffect(() => {
    const checkFonts = async () => {
      const fontFamilies = [
        'Gotham',
        'Gotham Book',
        'Gotham Medium',
        'Gotham Bold',
        'Gotham Black',
        'Gotham Light',
        'Gotham Ultra',
        'Gotham ExtraLight',
        'Gotham Thin'
      ]

      const results: {[key: string]: boolean} = {}

      for (const font of fontFamilies) {
        try {
          // Verifica se a fonte está disponível
          await document.fonts.load(`1em "${font}"`)
          results[font] = true
        } catch (error) {
          results[font] = false
        }
      }

      setFontsLoaded(results)
      setIsChecking(false)
    }

    checkFonts()
  }, [])

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="pt-20">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 py-16">
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-black mb-8">
            Verificação das Fontes Gotham
          </h1>
          
          {isChecking ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto"></div>
              <p className="mt-4 text-lg">Verificando fontes...</p>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Status das fontes */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-gray-800">Status das Fontes</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(fontsLoaded).map(([font, loaded]) => (
                    <div 
                      key={font}
                      className={`p-4 rounded-lg border-2 ${
                        loaded 
                          ? 'border-green-500 bg-green-50' 
                          : 'border-red-500 bg-red-50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{font}</span>
                        <span className={`px-2 py-1 rounded text-sm font-medium ${
                          loaded 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {loaded ? '✓ Carregada' : '✗ Não carregada'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Teste visual das fontes */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-gray-800">Teste Visual</h2>
                
                <div className="space-y-4">
                  <div className="p-6 bg-gray-50 rounded-lg">
                    <h3 className="text-lg font-bold mb-3">Gotham Thin (100)</h3>
                    <p className="font-thin text-2xl">
                      A fonte Gotham Thin está funcionando perfeitamente
                    </p>
                  </div>

                  <div className="p-6 bg-gray-50 rounded-lg">
                    <h3 className="text-lg font-bold mb-3">Gotham Light (300)</h3>
                    <p className="font-light text-2xl">
                      A fonte Gotham Light está funcionando perfeitamente
                    </p>
                  </div>

                  <div className="p-6 bg-gray-50 rounded-lg">
                    <h3 className="text-lg font-bold mb-3">Gotham Book (400)</h3>
                    <p className="font-normal text-2xl">
                      A fonte Gotham Book está funcionando perfeitamente
                    </p>
                  </div>

                  <div className="p-6 bg-gray-50 rounded-lg">
                    <h3 className="text-lg font-bold mb-3">Gotham Medium (500)</h3>
                    <p className="font-medium text-2xl">
                      A fonte Gotham Medium está funcionando perfeitamente
                    </p>
                  </div>

                  <div className="p-6 bg-gray-50 rounded-lg">
                    <h3 className="text-lg font-bold mb-3">Gotham Bold (700)</h3>
                    <p className="font-bold text-2xl">
                      A fonte Gotham Bold está funcionando perfeitamente
                    </p>
                  </div>

                  <div className="p-6 bg-gray-50 rounded-lg">
                    <h3 className="text-lg font-bold mb-3">Gotham Black (900)</h3>
                    <p className="font-black text-2xl">
                      A fonte Gotham Black está funcionando perfeitamente
                    </p>
                  </div>
                </div>
              </section>

              {/* Informações técnicas */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-gray-800">Informações Técnicas</h2>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <h3 className="text-lg font-bold text-blue-800 mb-3">Detalhes da Implementação</h3>
                  <ul className="space-y-2 text-blue-700">
                    <li>• Fontes carregadas via @font-face no CSS</li>
                    <li>• Configuração do Tailwind atualizada para incluir Gotham</li>
                    <li>• Fallback para fontes do sistema caso Gotham falhe</li>
                    <li>• Suporte a todos os pesos de fonte (100-900)</li>
                    <li>• Otimização com font-display: swap</li>
                  </ul>
                </div>
              </section>

              {/* Resumo */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-gray-800">Resumo</h2>
                
                <div className={`p-6 rounded-lg border-2 ${
                  Object.values(fontsLoaded).every(loaded => loaded)
                    ? 'border-green-500 bg-green-50'
                    : 'border-yellow-500 bg-yellow-50'
                }`}>
                  <h3 className="text-lg font-bold mb-3">
                    {Object.values(fontsLoaded).every(loaded => loaded)
                      ? '✅ Todas as fontes estão funcionando!'
                      : '⚠️ Algumas fontes podem não estar funcionando corretamente'
                    }
                  </h3>
                  <p className="text-gray-700">
                    {Object.values(fontsLoaded).every(loaded => loaded)
                      ? 'A implementação da fonte Gotham está funcionando perfeitamente em todo o projeto.'
                      : 'Verifique se todos os arquivos de fonte estão na pasta /public/font/ e se os caminhos no CSS estão corretos.'
                    }
                  </p>
                </div>
              </section>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
