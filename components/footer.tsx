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
          {/* MOBILE: accordion */}
          <div className="md:hidden space-y-4 mb-8">
            {/* Missão */}
            <section>
              <h3 className="text-lg font-bold mb-3">Multiverso Estúdio</h3>
              <p className="text-sm leading-6 text-gray-300 mb-4">
                Personalizados, arte e design feitos sob medida.<br />
                Cada loja é um universo próprio.<br />
                Cada explorador tem sua jornada.<br />
                Ajudamos a enxergar e atravessar este portal.
              </p>
              <div className="flex items-center gap-4">
                <a className="text-sm underline underline-offset-2" href="mailto:contato@multiversoestudio.com.br">
                  contato@multiversoestudio.com.br
                </a>
                <div className="ml-auto flex gap-4">
                  <a href="https://instagram.com/multiversoestudio" target="_blank">IG</a>
                  <a href="https://www.youtube.com/@multiversoestudio" target="_blank">YT</a>
                  <a href="#" target="_blank">PT</a>
                </div>
              </div>
            </section>

            {/* DUVIDAS */}
            <details className="group border-t border-white/10 pt-4">
              <summary className="flex items-center justify-between cursor-pointer select-none">
                <span className="text-sm font-semibold">Dúvidas</span>
                <span className="transition group-open:rotate-45 text-xl leading-none">+</span>
              </summary>
              <ul className="mt-3 space-y-2 text-sm text-gray-300">
                <li><a href="#">Minha conta</a></li>
                <li><a href="#">Minhas compras</a></li>
                <li><a href="#">Meu carrinho</a></li>
                <li><a href="#">Meus produtos favoritos</a></li>
                <li><a href="#">Acompanhar meus pedidos</a></li>
                <li><a href="#">Política de privacidade</a></li>
                <li><a href="#">Termos de uso</a></li>
                <li><a href="#">Central de ajuda / FAQ</a></li>
                <li><a href="#">Trocas e devoluções</a></li>
                <li><a href="#">Entregas</a></li>
                <li><a href="#">Personalização</a></li>
              </ul>
            </details>

            {/* SOBRE */}
            <details className="group border-t border-white/10 pt-4">
              <summary className="flex items-center justify-between cursor-pointer select-none">
                <span className="text-sm font-semibold">Sobre</span>
                <span className="transition group-open:rotate-45 text-xl leading-none">+</span>
              </summary>
              <ul className="mt-3 space-y-2 text-sm text-gray-300">
                <li><a href="#">O Multiverso</a></li>
              </ul>
            </details>

            {/* PARCEIROS */}
            <details className="group border-t border-white/10 pt-4">
              <summary className="flex items-center justify-between cursor-pointer select-none">
                <span className="text-sm font-semibold">Para Parceiros</span>
                <span className="transition group-open:rotate-45 text-xl leading-none">+</span>
              </summary>
              <ul className="mt-3 space-y-2 text-sm text-gray-300">
                <li><a href="#">Como Funciona</a></li>
                <li><a href="#">Abrir Loja</a></li>
                <li><a href="#">Recursos</a></li>
                <li><a href="#">Seja um parceiro!</a></li>
                <li><a href="#">Crie sua loja personalizada</a></li>
              </ul>
              <a href="#" className="mt-4 block bg-orange-500 text-black text-center font-bold py-2 rounded-lg">
                Começar Agora
              </a>
            </details>

            {/* CERTIFICADOS */}
            <details className="group border-t border-white/10 pt-4">
              <summary className="flex items-center justify-between cursor-pointer select-none">
                <span className="text-sm font-semibold">Certificados</span>
                <span className="transition group-open:rotate-45 text-xl leading-none">+</span>
              </summary>
              <div className="mt-3 flex gap-4 overflow-x-auto py-1">
                <div className="h-10 w-20 bg-gray-700 rounded flex items-center justify-center text-xs">Loja Protegida</div>
                <div className="h-10 w-20 bg-gray-700 rounded flex items-center justify-center text-xs">ABVTEX</div>
                <div className="h-10 w-20 bg-gray-700 rounded flex items-center justify-center text-xs">Eu Reciclo</div>
                <div className="h-10 w-20 bg-gray-700 rounded flex items-center justify-center text-xs">Google Safe</div>
                <div className="h-10 w-20 bg-gray-700 rounded flex items-center justify-center text-xs">RA1000</div>
                <div className="h-10 w-20 bg-gray-700 rounded flex items-center justify-center text-xs">Tech T-Shirt</div>
              </div>
            </details>

            {/* PAGAMENTOS */}
            <details className="group border-t border-white/10 pt-4">
              <summary className="flex items-center justify-between cursor-pointer select-none">
                <span className="text-sm font-semibold">Formas de Pagamento</span>
                <span className="transition group-open:rotate-45 text-xl leading-none">+</span>
              </summary>
              <div className="mt-3 flex gap-4 overflow-x-auto py-1">
                <div className="h-6 w-12 bg-gray-700 rounded flex items-center justify-center text-xs">Visa</div>
                <div className="h-6 w-12 bg-gray-700 rounded flex items-center justify-center text-xs">MC</div>
                <div className="h-6 w-12 bg-gray-700 rounded flex items-center justify-center text-xs">Elo</div>
                <div className="h-6 w-12 bg-gray-700 rounded flex items-center justify-center text-xs">Amex</div>
                <div className="h-6 w-12 bg-gray-700 rounded flex items-center justify-center text-xs">HC</div>
                <div className="h-6 w-12 bg-gray-700 rounded flex items-center justify-center text-xs">PP</div>
              </div>
            </details>
          </div>

          {/* DESKTOP: grid aberto */}
          <div className="hidden md:block">
            <div className="grid grid-cols-12 gap-8">
              <div className="col-span-5">
                <div className="flex items-center space-x-3 mb-6">
                  <Image
                    src="/logo-luneta.webp"
                    alt="Multiverso Estudio"
                    width={50}
                    height={35}
                    className="object-contain brightness-0 invert"
                  />
                  <div>
                    <h3 className="text-2xl font-bold">Multiverso Estúdio</h3>
                    <p className="text-sm text-gray-400">Lojas dentro de lojas</p>
                  </div>
                </div>
                <p className="text-sm leading-6 text-gray-300 mb-6">
                  Personalizados, arte e design feitos sob medida.<br />
                  Cada loja é um universo próprio.<br />
                  Cada explorador tem sua jornada.<br />
                  Ajudamos a enxergar e atravessar este portal.
                </p>
                <div className="flex items-center gap-4">
                  <a className="text-sm underline underline-offset-2" href="mailto:contato@multiversoestudio.com.br">
                    Fale conosco
                  </a>
                  <div className="ml-4 flex gap-4">
                    <a href="https://instagram.com/multiversoestudio" target="_blank">Instagram</a>
                    <a href="https://www.youtube.com/@multiversoestudio" target="_blank">YouTube</a>
                    <a href="#" target="_blank">Pinterest</a>
                  </div>
                </div>
              </div>

              <div className="col-span-2">
                <h4 className="text-sm font-semibold mb-4">Dúvidas</h4>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li><a href="#">Minha conta</a></li>
                  <li><a href="#">Minhas compras</a></li>
                  <li><a href="#">Meu carrinho</a></li>
                  <li><a href="#">Meus produtos favoritos</a></li>
                  <li><a href="#">Acompanhar meus pedidos</a></li>
                  <li><a href="#">Política de privacidade</a></li>
                  <li><a href="#">Termos de uso</a></li>
                  <li><a href="#">Central de ajuda / FAQ</a></li>
                  <li><a href="#">Trocas e devoluções</a></li>
                  <li><a href="#">Entregas</a></li>
                  <li><a href="#">Personalização</a></li>
                </ul>
              </div>

              <div className="col-span-2">
                <h4 className="text-sm font-semibold mb-4">Sobre</h4>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li><a href="#">O Multiverso</a></li>
                </ul>
              </div>

              <div className="col-span-3">
                <h4 className="text-sm font-semibold mb-4">Para Criadores</h4>
                <ul className="space-y-2 text-sm text-gray-300 mb-6">
                  <li><a href="#">Como Funciona</a></li>
                  <li><a href="#">Abrir Loja</a></li>
                  <li><a href="#">Recursos</a></li>
                  <li><a href="#">Seja um parceiro!</a></li>
                  <li><a href="#">Crie sua loja personalizada</a></li>
                </ul>
                <a href="#" className="inline-block bg-orange-500 text-black font-bold py-2 px-4 rounded-lg">
                  Começar Agora
                </a>
              </div>
            </div>

            <div className="mt-10 grid grid-cols-6 gap-6 items-center">
              <div className="h-10 bg-gray-700 rounded flex items-center justify-center text-xs">Loja Protegida</div>
              <div className="h-10 bg-gray-700 rounded flex items-center justify-center text-xs">ABVTEX</div>
              <div className="h-10 bg-gray-700 rounded flex items-center justify-center text-xs">Eu Reciclo</div>
              <div className="h-10 bg-gray-700 rounded flex items-center justify-center text-xs">Google Safe</div>
              <div className="h-10 bg-gray-700 rounded flex items-center justify-center text-xs">RA1000</div>
              <div className="h-10 bg-gray-700 rounded flex items-center justify-center text-xs">Tech T-Shirt</div>
            </div>

            <div className="mt-6 flex items-center gap-4">
              <div className="h-6 w-12 bg-gray-700 rounded flex items-center justify-center text-xs">Visa</div>
              <div className="h-6 w-12 bg-gray-700 rounded flex items-center justify-center text-xs">MC</div>
              <div className="h-6 w-12 bg-gray-700 rounded flex items-center justify-center text-xs">Elo</div>
              <div className="h-6 w-12 bg-gray-700 rounded flex items-center justify-center text-xs">Amex</div>
              <div className="h-6 w-12 bg-gray-700 rounded flex items-center justify-center text-xs">HC</div>
              <div className="h-6 w-12 bg-gray-700 rounded flex items-center justify-center text-xs">PP</div>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-12 pt-8 border-t border-gray-800 text-center">
            <p className="text-gray-400">© 2025 Multiverso Estúdio. Uma jornada explorativa simbiótica — Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </>
  )
}
