import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useEffect } from "react"

export default function Footer() {
  // JavaScript para o accordion funcionar (mobile)
  useEffect(() => {
    const onResize = () => {
      const isMobile = window.matchMedia('(max-width: 767px)').matches;
      const groups = document.querySelectorAll('details[name="mv-accordion"]') as NodeListOf<HTMLDetailsElement>;
      groups.forEach(d => {
        const handler = (d as any)._mvHandler || (()=>{});
        d.removeEventListener('toggle', handler);
        if (isMobile) {
          (d as any)._mvHandler = function (this: HTMLDetailsElement) {
            if (this.open) groups.forEach(o => { if (o !== this) o.open = false; });
          };
          d.addEventListener('toggle', (d as any)._mvHandler);
        }
      });
    };
    
    onResize();
    window.addEventListener('resize', onResize);
    
    return () => window.removeEventListener('resize', onResize);
  }, []);
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
            {/* MULTIVERSO ESTÚDIO */}
            <section>
              <h3 className="uppercase text-lg font-bold mb-3">MULTIVERSO ESTÚDIO</h3>
              <p className="text-sm leading-6 text-gray-300">
                Personalizados, arte e design feitos sob medida.<br />
                Cada loja é um universo próprio.<br />
                Cada explorador tem sua jornada.<br />
                Ajudamos a enxergar e atravessar este portal.
              </p>

              <div className="mt-4">
                <h4 className="uppercase text-sm font-semibold mb-2">contato</h4>
                <div className="flex items-center gap-4">
                  <a className="text-sm underline underline-offset-2" href="mailto:contato@multiversoestudio.com.br">Fale conosco</a>

                  {/* Instagram único */}
                  <a aria-label="Instagram Multiverso Estúdio" href="https://instagram.com/multiversoestudio" target="_blank" className="ml-auto inline-flex items-center gap-2">
                    {/* ícone instagram */}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm5 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm6-1.5a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5Z"/>
                    </svg>
                    <span className="text-sm">Instagram</span>
                  </a>
                </div>
              </div>
            </section>

            {/* DÚVIDAS */}
            <details className="group border-t border-white/10 pt-4" name="mv-accordion">
              <summary className="flex items-center justify-between cursor-pointer select-none">
                <span className="uppercase text-sm font-semibold">dúvidas</span>
                <span className="transition group-open:rotate-45 text-xl leading-none">+</span>
              </summary>
              <ul className="mt-3 space-y-2 text-sm text-gray-300">
                <li><a href="/sobre">Sobre nós</a></li>
                <li><a href="/politica-privacidade">Política de Privacidade</a></li>
                <li><a href="/termos-de-uso">Termos de Uso</a></li>
                <li><a href="/trocas-devolucoes">Trocas e Devoluções</a></li>
                <li><a href="#">Minha conta</a></li>
                <li><a href="#">Minhas compras</a></li>
                <li><a href="#">Meu carrinho</a></li>ha 
                <li><a href="#">Meus produtos favoritos</a></li>
                <li><a href="#">Acompanhar meus pedidos</a></li>
                <li><a href="#">Central de ajuda / FAQ</a></li>
                <li><a href="#">Entregas</a></li>
                <li><a href="#">Personalização</a></li>
              </ul>
            </details>

            {/* PARCEIROS */}
            <details className="group border-t border-white/10 pt-4" name="mv-accordion">
              <summary className="flex items-center justify-between cursor-pointer select-none">
                <span className="uppercase text-sm font-semibold">para criadores</span>
                <span className="transition group-open:rotate-45 text-xl leading-none">+</span>
              </summary>
              <ul className="mt-3 space-y-2 text-sm text-gray-300">
                <li><a href="#">Como funciona</a></li>
                <li><a href="#">Abrir loja</a></li>
                <li><a href="#">Recursos</a></li>
                <li><a href="#">Seja um parceiro!</a></li>
                <li><a href="#">Crie sua loja personalizada</a></li>
              </ul>
              <a href="#" className="mt-4 block bg-orange-500 text-black text-center font-bold py-2 rounded-lg">
                Começar agora
              </a>
            </details>

            {/* Bandeiras (sempre visíveis) */}
            <div className="border-t border-white/10 pt-4 mt-2">
              <div className="flex gap-3 overflow-x-auto items-center py-1">
                {/* VISA */}
                <Image
                  src="/footer/pagamento/icons8-visa.svg"
                  alt="Visa"
                  width={75}
                  height={28}
                  className="h-7 w-auto filter brightness-0 invert"
                />
                {/* MASTERCARD */}
                <Image
                  src="/footer/pagamento/icons8-mastercard.svg"
                  alt="Mastercard"
                  width={75}
                  height={28}
                  className="h-7 w-auto filter brightness-0 invert"
                />
                {/* ELO */}
                <Image
                  src="/footer/pagamento/elo-2-svgrepo-com.svg"
                  alt="Elo"
                  width={75}
                  height={28}
                  className="h-7 w-auto filter brightness-0 invert"
                />
                {/* AMEX */}
                <Image
                  src="/footer/pagamento/icons8-american-express.svg"
                  alt="American Express"
                  width={75}
                  height={28}
                  className="h-7 w-auto filter brightness-0 invert"
                />
                {/* HIPERCARD */}
                <Image
                  src="/footer/pagamento/hipercard-1-svgrepo-com.svg"
                  alt="Hipercard"
                  width={75}
                  height={28}
                  className="h-7 w-auto filter brightness-0 invert"
                />
                {/* PAYPAL */}
                <Image
                  src="/footer/pagamento/icons8-paypal.svg"
                  alt="PayPal"
                  width={75}
                  height={28}
                  className="h-7 w-auto filter brightness-0 invert"
                />
              </div>
            </div>

            <p className="border-t border-white/10 pt-4 mt-4 text-[11px] text-gray-400 text-center">
              © 2025 Multiverso Estúdio. Uma jornada explorativa simbiótica — Todos os direitos reservados.
            </p>
          </div>

          {/* DESKTOP: grid aberto */}
          <div className="hidden md:block max-w-7xl mx-auto py-12 px-6">
            <div className="grid grid-cols-12 gap-8">
              <div className="col-span-6">
                <h3 className="uppercase text-lg font-bold mb-4">MULTIVERSO ESTÚDIO</h3>
                <p className="text-sm leading-6 text-gray-300">
                  Personalizados, arte e design feitos sob medida.<br />
                  Cada loja é um universo próprio.<br />
                  Cada explorador tem sua jornada.<br />
                  Ajudamos a enxergar e atravessar este portal.
                </p>
                <div className="mt-6">
                  <h4 className="uppercase text-sm font-semibold mb-2">contato</h4>
                  <div className="flex items-center gap-4">
                    <a className="text-sm underline underline-offset-2" href="mailto:contato@multiversoestudio.com.br">Fale conosco</a>
                    <a href="https://instagram.com/multiversoestudio" target="_blank" className="ml-4 inline-flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm5 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm6-1.5a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5Z"/>
                      </svg>
                      <span className="text-sm">Instagram</span>
                    </a>
                  </div>
                </div>
              </div>

              <div className="col-span-3">
                <h4 className="uppercase text-sm font-semibold mb-4">dúvidas</h4>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li><a href="/sobre">Sobre nós</a></li>
                  <li><a href="/politica-privacidade">Política de Privacidade</a></li>
                  <li><a href="/termos-de-uso">Termos de Uso</a></li>
                  <li><a href="/trocas-devolucoes">Trocas e Devoluções</a></li>
                  <li><a href="#">Minha conta</a></li>
                  <li><a href="#">Minhas compras</a></li>
                  <li><a href="#">Meu carrinho</a></li>
                  <li><a href="#">Meus produtos favoritos</a></li>
                  <li><a href="#">Acompanhar meus pedidos</a></li>
                  <li><a href="#">Central de ajuda / FAQ</a></li>
                  <li><a href="#">Entregas</a></li>
                  <li><a href="#">Personalização</a></li>
                </ul>
              </div>

              <div className="col-span-3">
                <h4 className="uppercase text-sm font-semibold mb-4">para criadores</h4>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li><a href="#">Como funciona</a></li>
                  <li><a href="#">Abrir loja</a></li>
                  <li><a href="#">Recursos</a></li>
                  <li><a href="#">Seja um parceiro!</a></li>
                  <li><a href="#">Crie sua loja personalizada</a></li>
                </ul>
                <a href="#" className="mt-4 inline-block bg-orange-500 text-black font-bold py-2 px-4 rounded-lg">
                  Começar agora
                </a>
              </div>
            </div>

            {/* Bandeiras (sempre visíveis) */}
            <div className="mt-8 flex items-center gap-4 flex-wrap">
              {/* VISA */}
              <Image
                src="/footer/pagamento/icons8-visa.svg"
                alt="Visa"
                width={150}
                height={56}
                className="h-14 w-auto filter brightness-0 invert"
              />
              {/* MASTERCARD */}
              <Image
                src="/footer/pagamento/icons8-mastercard.svg"
                alt="Mastercard"
                width={150}
                height={56}
                className="h-14 w-auto filter brightness-0 invert"
              />
              {/* ELO */}
              <Image
                src="/footer/pagamento/elo-2-svgrepo-com.svg"
                alt="Elo"
                width={150}
                height={56}
                className="h-14 w-auto filter brightness-0 invert"
              />
              {/* AMEX */}
              <Image
                src="/footer/pagamento/icons8-american-express.svg"
                alt="American Express"
                width={150}
                height={56}
                className="h-14 w-auto filter brightness-0 invert"
              />
              {/* HIPERCARD */}
              <Image
                src="/footer/pagamento/hipercard-1-svgrepo-com.svg"
                alt="Hipercard"
                width={150}
                height={56}
                className="h-14 w-auto filter brightness-0 invert"
              />
              {/* PAYPAL */}
              <Image
                src="/footer/pagamento/icons8-paypal.svg"
                alt="PayPal"
                width={150}
                height={56}
                className="h-14 w-auto filter brightness-0 invert"
              />
            </div>

            <p className="mt-6 text-xs text-gray-400 text-center">
              © 2025 Multiverso Estúdio. Uma jornada explorativa simbiótica — Todos os direitos reservados.
            </p>
          </div>


        </div>
      </footer>
    </>
  )
}
