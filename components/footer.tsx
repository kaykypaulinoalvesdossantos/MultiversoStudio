import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Footer() {
  return (
    <>
      {/* 🎨 Imagens SVG Decorativas - SEM BORDA BRANCA */}
      <div className="relative w-full overflow-hidden z-10 -mb-1 -mr-2">
        {/* Desktop */}
        <div className="hidden lg:block w-full relative z-20">
          <img
            src="/footer/desktop new.svg"
            alt="Desktop decorativo"
            className="w-full h-auto object-contain object-center"
          />
        </div>

        {/* Laptop */}
        <div className="hidden md:block lg:hidden w-full relative z-20">
          <img
            src="/footer/laptop new.svg"
            alt="Laptop decorativo"
            className="w-full h-auto object-contain object-center"
          />
        </div>

        {/* Celular */}
        <div className="block md:hidden w-full relative z-20">
          <img
            src="/footer/celular new.svg"
            alt="Celular decorativo"
            className="w-full h-auto object-contain object-center"
          />
        </div>
      </div>

      {/* 📱 Footer com Conteúdo - COR #000D19 - SEM BORDA */}
      <footer className="bg-[#000D19] text-white py-16 relative z-0">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Logo and Description */}
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center space-x-3 mb-6">
                <Image
                  src="/logo-luneta.webp"
                  alt="Multiverso Studio"
                  width={50}
                  height={35}
                  className="object-contain brightness-0 invert"
                />
                <div>
                  <h3 className="text-2xl font-bold">MULTIVERSO STUDIO</h3>
                  <p className="text-sm text-gray-400">Lojas dentro de lojas</p>
                </div>
              </div>
              <p className="text-gray-300 mb-6 max-w-md">
                A plataforma que conecta criadores e fãs através de produtos únicos e exclusivos. Cada loja é um universo
                próprio.
              </p>
            </div>

            {/* Institucional */}
            <div>
              <h4 className="font-bold text-lg mb-4 text-white">Institucional</h4>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <Link href="/sobre" className="hover:text-white transition-colors">
                    Sobre nós
                  </Link>
                </li>
                <li>
                  <Link href="/trocas" className="hover:text-white transition-colors">
                    Central de trocas
                  </Link>
                </li>
                <li>
                  <Link href="/contato" className="hover:text-white transition-colors">
                    Fale conosco
                  </Link>
                </li>
              </ul>
            </div>

            {/* Categories */}
            <div>
              <h4 className="font-bold text-lg mb-4 text-white">Categorias</h4>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <Link href="/categoria/canecas" className="hover:text-white transition-colors">
                    Canecas
                  </Link>
                </li>
                <li>
                  <Link href="/categoria/camisetas" className="hover:text-white transition-colors">
                    Camisetas
                  </Link>
                </li>
                <li>
                  <Link href="/categoria/moletons" className="hover:text-white transition-colors">
                    Moletons
                  </Link>
                </li>
              </ul>
            </div>

            {/* Para Criadores */}
            <div>
              <h4 className="font-bold text-lg mb-4 text-orange-400">Para Criadores</h4>
              <ul className="space-y-2 text-gray-300 mb-6">
                <li>
                  <Link href="/para-criadores" className="hover:text-white transition-colors">
                    Como Funciona
                  </Link>
                </li>
                <li>
                  <Link href="/para-criadores#abrir-loja" className="hover:text-white transition-colors">
                    Abrir Loja
                  </Link>
                </li>
                <li>
                  <Link href="/para-criadores#recursos" className="hover:text-white transition-colors">
                    Recursos
                  </Link>
                </li>
              </ul>

              <div className="bg-orange-500 rounded-lg p-4 text-center">
                <h5 className="font-bold text-white mb-1">Seja um Criador!</h5>
                <p className="text-orange-100 text-sm mb-3">Crie sua loja personalizada</p>
                <Link href="/para-criadores">
                  <Button className="w-full bg-black text-white hover:bg-gray-800 font-semibold">Começar Agora</Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-12 pt-8 border-t border-gray-800 text-center">
            <p className="text-gray-400">© 2024 Multiverso Studio. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </>
  )
}
