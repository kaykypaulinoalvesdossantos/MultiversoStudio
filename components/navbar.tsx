"use client"

import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import { usePathname } from "next/navigation"
import CartModal from "./cart-modal"
import { useCart } from "@/contexts/cart-context"
import { CustomerProfileButton } from "./customer-profile-button"

interface CategoryItem {
  name: string
  href: string
  hasSubs: boolean
  subcategories?: string[]
}

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [expandedCategories, setExpandedCategories] = useState<string[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const pathname = usePathname()
  const { getTotalItems, getTotalProducts } = useCart()

  // Detecta se está na página principal
  const isHomePage = pathname === "/"

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (!isMounted) return

    const handleScroll = () => {
      // Só aplica o efeito de scroll na página principal
      if (isHomePage && typeof window !== 'undefined') {
        setIsScrolled(window.scrollY > 10) // Reduzido de 200px para 10px
      }
    }

    if (typeof window !== 'undefined') {
      window.addEventListener("scroll", handleScroll)
      return () => window.removeEventListener("scroll", handleScroll)
    }
  }, [isHomePage, isMounted])

  const toggleCategory = (categoryName: string) => {
    setExpandedCategories(prev => 
      prev.includes(categoryName) 
        ? prev.filter(cat => cat !== categoryName)
        : [...prev, categoryName]
    )
  }

  const handleSearchToggle = () => {
    setIsSearchOpen(!isSearchOpen)
    if (!isSearchOpen) {
      // Abrindo a pesquisa
      setTimeout(() => {
        const searchInput = document.querySelector('input[type="text"]') as HTMLInputElement
        if (searchInput) {
          searchInput.focus()
        }
      }, 100)
    } else {
      // Fechando a pesquisa
      setSearchQuery("")
    }
  }

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      // Implementar busca real aqui
      console.log("🔍 Pesquisando por:", searchQuery)
      
      // Simular busca (substitua por sua API real)
      const searchResults = performSearch(searchQuery)
      
      if (searchResults.length > 0) {
        // Redirecionar para página de resultados ou mostrar modal
        console.log("✅ Resultados encontrados:", searchResults)
        // window.location.href = `/busca?q=${encodeURIComponent(searchQuery)}`
      } else {
        console.log("❌ Nenhum resultado encontrado")
        // Mostrar mensagem de "nenhum resultado"
      }
      
      // Fechar pesquisa após busca
      setIsSearchOpen(false)
      setSearchQuery("")
    }
  }

  const handleSearchClose = () => {
    setIsSearchOpen(false)
    setSearchQuery("")
  }

  // Função de busca simulada (substitua por sua API real)
  const performSearch = (query: string) => {
    const allProducts = [
      "Caneca Multiverso", "Camiseta Gamer", "Kit Café Premium",
      "Boné StreetWear", "Moletom Premium", "Caneca Térmica"
    ]
    
    return allProducts.filter(product => 
      product.toLowerCase().includes(query.toLowerCase())
    )
  }

  // Categorias com subcategorias
  const categoriesWithSubs: Record<string, CategoryItem> = {
    "LANÇAMENTOS": { 
      name: "LANÇAMENTOS",
      href: "/lancamentos", 
      hasSubs: false
    },
    "CANECAS": { 
      name: "CANECAS",
      href: "/categoria/canecas", 
      hasSubs: true,
      subcategories: ["Cerâmica", "Vidro", "Chopp", "Jateada", "Lisa", "Térmica"]
    },
    "VESTUÁRIO": { 
      name: "VESTUÁRIO",
      href: "/categoria/vestuario", 
      hasSubs: true,
      subcategories: ["Camisetas", "Polo", "Tradicional", "StreetWear", "BabyLook", "Premium", "Moletons", "Regatas", "Bonés"]
    },
    "PARCEIROS": { 
      name: "PARCEIROS", 
      href: "/para-criadores", 
      hasSubs: true,
      subcategories: ["Saco Cheio", "Outros Criadores"]
    },
    "PERSONALIZÁVEIS": { name: "PERSONALIZÁVEIS", href: "/personalizar", hasSubs: false },
    "KITS": { 
      name: "KITS",
      href: "/categoria/kits-promocionais", 
      hasSubs: true,
      subcategories: ["Kit Café", "Kit Gamer", "Kit Completo", "Kit Presente"]
    }
  }

  const navigationItems: CategoryItem[] = [
    { name: "LANÇAMENTOS", href: "/lancamentos", hasSubs: false },
    { name: "CANECAS", href: "/categoria/canecas", hasSubs: true, subcategories: ["Cerâmica", "Vidro", "Chopp", "Jateada", "Lisa", "Térmica"] },
    { name: "VESTUÁRIO", href: "/categoria/vestuario", hasSubs: true, subcategories: ["Camisetas", "Polo", "Tradicional", "StreetWear", "BabyLook", "Premium", "Moletons", "Regatas", "Bonés"] },
    { name: "PARCEIROS", href: "/para-criadores", hasSubs: true, subcategories: ["Saco Cheio", "Outros Criadores"] },
    { name: "PERSONALIZÁVEIS", href: "/personalizar", hasSubs: false },
    { name: "KITS", href: "/categoria/kits-promocionais", hasSubs: true, subcategories: ["Kit Café", "Kit Gamer", "Kit Completo", "Kit Presente"] },
  ]

  const mobileMenuItems: CategoryItem[] = [
    { name: "LANÇAMENTOS", href: "/lancamentos", hasSubs: false },
    { name: "CANECAS", href: "/categoria/canecas", hasSubs: true, subcategories: ["Cerâmica", "Vidro", "Chopp", "Jateada", "Lisa", "Térmica"] },
    { name: "VESTUÁRIO", href: "/categoria/vestuario", hasSubs: true, subcategories: ["Camisetas", "Polo", "Tradicional", "StreetWear", "BabyLook", "Premium", "Moletons", "Regatas", "Bonés"] },
    { name: "PARCEIROS", href: "/para-criadores", hasSubs: true, subcategories: ["Saco Cheio", "Outros Criadores"] },
    { name: "PERSONALIZÁVEIS", href: "/personalizar", hasSubs: false },
    { name: "KITS", href: "/categoria/kits-promocionais", hasSubs: true, subcategories: ["Kit Café", "Kit Gamer", "Kit Completo", "Kit Presente"] },
    { name: "TROCAS", href: "/trocas", hasSubs: false },
    { name: "SOBRE NÓS", href: "/sobre", hasSubs: false },

  ]

  const IconWithTooltip = ({
    iconSrc,
    tooltip,
    href,
    width = 28,
    height = 28,
    isDarkBackground = false,
    onClick,
    noAnimation = false,
    showCartCount = false,
  }: {
    iconSrc: string
    tooltip: string
    href: string
    width?: number
    height?: number
    isDarkBackground?: boolean
    onClick?: () => void
    noAnimation?: boolean
    showCartCount?: boolean
  }) => {
    const [isHovered, setIsHovered] = useState(false)
    const [displayText, setDisplayText] = useState("")

    useEffect(() => {
      if (isHovered) {
        // Animação de digitação padronizada para todos os botões
        let currentIndex = 0
        const typingInterval = setInterval(() => {
          if (currentIndex <= tooltip.length) {
            setDisplayText(tooltip.slice(0, currentIndex))
            currentIndex++
          } else {
            clearInterval(typingInterval)
          }
        }, 50) // Velocidade um pouco mais lenta para estabilidade

        return () => clearInterval(typingInterval)
      } else {
        // Saída simples e direta
        setDisplayText("")
      }
    }, [isHovered, tooltip])

    return (
      <div
        className="flex items-center relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {onClick ? (
          <button onClick={onClick} className="flex items-center group">
            <svg
              width={width}
              height={height}
              className={`cursor-pointer transition-all duration-500 ease-out group-hover:scale-110 ${isDarkBackground ? 'text-white' : 'text-black'}`}
              viewBox="0 0 100 100"
              style={{ 
                filter: isDarkBackground ? 'brightness(0) invert(1)' : 'none'
              }}
            >
              <image href={iconSrc} width="100" height="100" />
            </svg>
            
            {/* Contador do carrinho */}
            {showCartCount && getTotalProducts() > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {getTotalProducts() > 99 ? '99+' : getTotalProducts()}
              </span>
            )}
            
            <span
              className={`ml-3 text-sm font-medium transition-all duration-500 ease-out whitespace-nowrap cursor-pointer ${
                isHovered ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
              } ${isDarkBackground ? "text-white" : "text-black"}`}
              style={{ 
                minWidth: isHovered ? "auto" : "0", 
                overflow: "hidden",
                transform: isHovered ? "translateX(0)" : "translateX(-16px)",
                transition: "all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
              }}
            >
              {displayText}
            </span>
          </button>
        ) : (
          <a href={href} className="flex items-center group">
            <svg
              width={width}
              height={height}
              className={`cursor-pointer transition-all duration-500 ease-out group-hover:scale-110 ${isDarkBackground ? 'text-white' : 'text-black'}`}
              viewBox="0 0 100 100"
              style={{ 
                filter: isDarkBackground ? 'brightness(0) invert(1)' : 'none'
              }}
            >
              <image href={iconSrc} width="100" height="100" />
            </svg>
            
            {/* Contador do carrinho */}
            {showCartCount && getTotalProducts() > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {getTotalProducts() > 99 ? '99+' : getTotalProducts()}
              </span>
            )}
            
            <span
              className={`ml-3 text-sm font-medium transition-all duration-500 ease-out whitespace-nowrap cursor-pointer ${
                isHovered ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
              } ${
                isDarkBackground ? "text-white" : "text-black"
              }`}
              style={{ 
                minWidth: isHovered ? "auto" : "0", 
                overflow: "hidden",
                transform: isHovered ? "translateX(0)" : "translateX(-16px)",
                transition: "all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
              }}
            >
              {displayText}
            </span>
          </a>
        )}
      </div>
    )
  }

  // Determina o estilo do navbar baseado na página
  const getNavbarStyle = () => {
    if (isHomePage) {
      // Página principal: transparente quando não scrollado, com efeito de vidro quando scrollado
      return isScrolled || isHovered
        ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-white/20"
        : "bg-transparent border-b border-transparent"
    } else {
      // Outras páginas: sempre branco com texto preto
      return "bg-white border-b border-gray-200 shadow-lg"
    }
  }

  // Determina a cor do texto baseado na página
  const getTextColor = () => {
    if (isHomePage) {
      return isScrolled || isHovered ? "text-black" : "text-white"
    } else {
      return "text-black"
    }
  }

  // Determina a cor do logo baseado na página
  const getLogoSource = () => {
    if (isHomePage) {
      return isScrolled || isHovered 
        ? "/icons/LOGO PRETO PRA BRANCO.svg"  // Logo preta quando navbar branco
        : "/icons/LOGO BRANCO PRA PRETO.svg"  // Logo branca quando navbar transparente
    } else {
      return "/icons/LOGO PRETO PRA BRANCO.svg"  // Logo preta em outras páginas
    }
  }

  // Determina a cor do underline baseado na página
  const getUnderlineColor = () => {
    if (isHomePage) {
      return isScrolled || isHovered ? "bg-black" : "bg-white"
    } else {
      return "bg-black"
    }
  }

  // Determina a cor do dropdown baseado na página
  const getDropdownStyle = () => {
    if (isHomePage) {
      return isScrolled || isHovered 
        ? "bg-white border-gray-200" 
        : "bg-black/90 backdrop-blur-md border-white/20"
    } else {
      return "bg-white border-gray-200"
    }
  }

  // Determina a cor do texto do dropdown baseado na página
  const getDropdownTextColor = () => {
    if (isHomePage) {
      return isScrolled || isHovered
        ? "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
        : "text-white/80 hover:text-white hover:bg-white/10"
    } else {
      return "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
    }
  }

  // Determina a cor do hover do dropdown baseado na página
  const getDropdownHoverColor = () => {
    if (isHomePage) {
      return isScrolled || isHovered 
        ? "group-hover/item:font-black" 
        : "group-hover/item:font-bold"
    } else {
      return "group-hover/item:font-black"
    }
  }

  // Determina a cor do underline do dropdown baseado na página
  const getDropdownUnderlineColor = () => {
    if (isHomePage) {
      return isScrolled || isHovered ? "bg-black" : "bg-white"
    } else {
      return "bg-black"
    }
  }

  // Determina se os ícones devem ser escuros baseado na página
  const getIconDarkBackground = () => {
    if (isHomePage) {
      return !(isScrolled || isHovered)
    } else {
      return false
    }
  }

  // Renderiza o navbar apenas após a montagem para evitar erro de hidratação
  if (!isMounted) {
    return (
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-lg">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center">
              <div className="w-32 h-8 bg-gray-200 animate-pulse rounded"></div>
            </div>
            <div className="hidden lg:flex items-center space-x-8">
              {navigationItems.map((item) => (
                <div key={item.name} className="w-20 h-4 bg-gray-200 animate-pulse rounded"></div>
              ))}
            </div>
            <div className="flex items-center space-x-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-7 h-7 bg-gray-200 animate-pulse rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </nav>
    )
  }

  return (
    <>
      {/* Desktop Navbar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out hidden lg:block ${getNavbarStyle()}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo - sempre à esquerda */}
            <div className="flex items-center flex-shrink-0">
              <a href="/" className="flex items-center hover:opacity-80 transition-opacity">
                <img 
                  src={getLogoSource()} 
                  alt="Multiverso Estudio" 
                  width={120} 
                  height={120} 
                  className="mr-2 object-contain transition-all duration-300" 
                />
              </a>
            </div>

            {/* Centro - Links de navegação OU Campo de pesquisa */}
            <div className="flex-1 flex justify-center">
              {!isSearchOpen ? (
                // Links de navegação
                <div className="flex items-center space-x-8">
                  {navigationItems.map((item) => (
                    <div key={item.name} className="relative group">
                      <a
                        href={item.href}
                        className={`group/link relative text-sm font-medium transition-all duration-300 ease-out cursor-pointer ${getTextColor()}`}
                      >
                        <span className={`font-medium transition-all duration-300 ease-out ${
                          isHomePage 
                            ? (isScrolled || isHovered ? "group-hover/link:font-black" : "group-hover/link:font-bold")
                            : "group-hover/link:font-black"
                        }`}>
                          {item.name}
                        </span>
                        <span className={`absolute bottom-0 left-0 right-0 h-0.5 transform scale-x-0 group-hover/link:scale-x-100 transition-transform duration-200 ease-in-out origin-left pointer-events-none ${getUnderlineColor()}`}></span>
                      </a>
                      
                      {/* Dropdown das subcategorias */}
                      {item.hasSubs && (
                        <div className={`absolute top-full left-0 w-56 border shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-out z-50 ${getDropdownStyle()}`}>
                          <div className="py-3">
                            {item.subcategories?.map((subcat, index) => (
                              <a
                                key={subcat}
                                href={`${item.href}/${subcat.toLowerCase().replace(/\s+/g, '-')}`}
                                className={`group/item relative block px-6 py-3 text-sm transition-all duration-300 ease-out ${getDropdownTextColor()}`}
                                style={{ animationDelay: `${index * 50}ms` }}
                              >
                                <span className={`font-normal transition-all duration-300 ease-out ${getDropdownHoverColor()}`}>
                                  {subcat}
                                </span>
                                <span className={`absolute bottom-0 left-6 right-6 h-0.5 transform scale-x-0 group-hover/item:scale-x-100 transition-transform duration-200 ease-in-out origin-left pointer-events-none ${getDropdownUnderlineColor()}`}></span>
                              </a>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                // Campo de pesquisa
                <div className="w-full max-w-2xl">
                  <form onSubmit={handleSearchSubmit} className="relative w-full">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Digite sua pesquisa..."
                      className={`w-full px-6 py-3 border rounded-none focus:outline-none focus:ring-1 focus:ring-black transition-all duration-300 text-lg ${
                        isHomePage && !isScrolled 
                          ? "bg-white/20 border-white/30 text-white placeholder-white/80 focus:bg-white focus:text-black focus:placeholder-gray-500 focus:border-gray-300" 
                          : "bg-white border-gray-200 text-black placeholder-gray-500 focus:bg-white focus:text-black focus:border-gray-300"
                      }`}
                      autoFocus
                    />
                    <button
                      type="submit"
                      className={`absolute right-16 top-1/2 transform -translate-y-1/2 px-4 py-1.5 font-bold transition-all duration-300 text-sm ${
                        isHomePage && !isScrolled 
                          ? "text-black hover:text-gray-600 hover:bg-gray-100"
                          : "text-black hover:text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      BUSCAR
                    </button>
                    <button
                      type="button"
                      onClick={handleSearchClose}
                      className={`absolute right-4 top-1/2 transform -translate-y-1/2 w-8 h-8 flex items-center justify-center font-bold transition-all duration-300 text-lg text-black hover:text-gray-600 hover:bg-gray-100`}
                    >
                      ✕
                    </button>
                  </form>
                </div>
              )}
            </div>

            {/* Ícones - sempre à direita */}
            <div className="flex items-center space-x-3 flex-shrink-0">
              <IconWithTooltip 
                iconSrc="/icons/pesquisa icon.svg" 
                tooltip="Pesquisar" 
                href="#" 
                onClick={handleSearchToggle}
                isDarkBackground={getIconDarkBackground()} 
              />
              <IconWithTooltip iconSrc="/icons/dúvidas icon.svg" tooltip="Central de Ajuda" href="/duvidas" noAnimation={true} isDarkBackground={getIconDarkBackground()} />
              <IconWithTooltip iconSrc="/icons/mochila icon.svg" tooltip="Mochila" href="#" onClick={() => setIsCartOpen(true)} isDarkBackground={getIconDarkBackground()} showCartCount={true} />
              <CustomerProfileButton isDarkBackground={getIconDarkBackground()} />
            </div>
          </div>
        </div>
      </nav>

      {/* Tablet/Laptop Navbar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out hidden md:block lg:hidden ${
          isHomePage ? (isScrolled ? "bg-white" : "bg-black") : "bg-white"
        }`}
      >
        <div className="px-4">
          <div className="flex items-center justify-between h-20">
            {/* Hamburger Menu */}
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className={isHomePage && !isScrolled ? "text-white" : "text-black"}>
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Centro - Logo OU Logo + Campo de pesquisa */}
            <div className="flex items-center absolute left-1/2 transform -translate-x-1/2">
              {!isSearchOpen ? (
                // Apenas logo
                <>
                  {isHomePage ? (
                    // Página principal: logo adaptativo
                    <>
                      {isScrolled ? (
                        <div className="flex items-center animate-fade-in">
                          <a href="/" className="flex items-center hover:opacity-80 transition-opacity">
                            <img src="/icons/LOGO PRETO PRA BRANCO.svg" alt="Multiverso Estudio" width={120} height={120} className="mr-2 object-contain" />
                          </a>
                        </div>
                      ) : (
                        <div className="flex items-center">
                          <a href="/" className="flex items-center hover:opacity-80 transition-opacity">
                            <img src="/icons/LOGO BRANCO PRA PRANCO.svg" alt="Multiverso Estudio" width={120} height={120} className="mr-2 object-contain" />
                          </a>
                        </div>
                      )}
                    </>
                  ) : (
                    // Outras páginas: sempre logo preta
                    <div className="flex items-center">
                      <a href="/" className="flex items-center hover:opacity-80 transition-opacity">
                        <img src="/icons/LOGO PRETO PRA BRANCO.svg" alt="Multiverso Estudio" width={120} height={120} className="mr-2 object-contain" />
                      </a>
                    </div>
                  )}
                </>
              ) : (
                // Logo + Campo de pesquisa
                <div className="flex items-center space-x-4">
                  {/* Logo pequeno */}
                  <div className="flex items-center">
                    <a href="/" className="flex items-center hover:opacity-80 transition-opacity">
                      <img 
                        src={isHomePage && !isScrolled ? "/icons/LOGO BRANCO PRA PRANCO.svg" : "/icons/LOGO PRETO PRA BRANCO.svg"} 
                        alt="Multiverso Estudio" 
                        width={80} 
                        height={80} 
                        className="mr-2 object-contain" 
                      />
                    </a>
                  </div>

                  {/* Campo de pesquisa */}
                  <div className="w-80">
                    <form onSubmit={handleSearchSubmit} className="relative">
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Digite sua pesquisa..."
                        className={`w-full px-4 py-2 border rounded-none focus:outline-none focus:ring-1 focus:ring-black transition-all duration-300 text-base ${
                          isHomePage && !isScrolled 
                            ? "bg-white/20 border-white/30 text-white placeholder-white/80 focus:bg-white focus:text-black focus:border-gray-300" 
                            : "bg-white border-gray-200 text-black placeholder-gray-500 focus:bg-white focus:text-black focus:border-gray-300"
                        }`}
                        autoFocus
                      />
                      <button
                        type="submit"
                        className={`absolute right-12 top-1/2 transform -translate-y-1/2 px-3 py-1 text-sm font-bold transition-all duration-300 ${
                          isHomePage && !isScrolled 
                            ? "text-white hover:text-black hover:bg-white/20" 
                            : "text-black hover:text-gray-600 hover:bg-gray-100"
                        }`}
                      >
                        BUSCAR
                      </button>
                      <button
                        type="button"
                        onClick={handleSearchClose}
                        className={`absolute right-2 top-1/2 transform -translate-y-1/2 w-6 h-6 flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                          isHomePage && !isScrolled 
                            ? "text-white hover:text-black hover:bg-white/20" 
                            : "text-black hover:text-gray-600 hover:bg-gray-100"
                        }`}
                      >
                        ✕
                      </button>
                    </form>
                  </div>
                </div>
              )}
            </div>

            {/* Ícones - sempre à direita */}
            <div className="flex items-center space-x-2">
              <IconWithTooltip iconSrc="/icons/dúvidas icon.svg" tooltip="Central de Ajuda" href="/duvidas" isDarkBackground={isHomePage && !isScrolled} noAnimation={true} />
              <IconWithTooltip iconSrc="/icons/mochila icon.svg" tooltip="Mochila" href="#" onClick={() => setIsCartOpen(true)} isDarkBackground={isHomePage && !isScrolled} showCartCount={true} />
              <CustomerProfileButton isDarkBackground={isHomePage && !isScrolled} />
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 md:hidden ${isHomePage ? "bg-black" : "bg-white border-b border-gray-200"}`}>
        <div className="px-4">
          <div className="flex items-center justify-between h-16">
            {/* Hamburger Menu */}
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className={isHomePage ? "text-white" : "text-black"}>
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            {/* Centro - Logo OU Logo + Campo de pesquisa */}
            <div className="flex items-center absolute left-1/2 transform -translate-x-1/2">
              {!isSearchOpen ? (
                // Apenas logo
                <>
              {isHomePage ? (
                // Página principal: logo adaptativo
                <>
                      {isScrolled ? (
                    <div className="flex items-center animate-fade-in">
                      <a href="/" className="flex items-center hover:opacity-80 transition-opacity">
                            <img src="/icons/TIPOGRAFIA PARA PRETO.svg" alt="Multiverso Estudio" width={80} height={80} className="mr-2 object-contain"  />
                          </a>
                        </div>
                      ) : (
                        <div className="flex items-center">
                          <a href="/" className="flex items-center hover:opacity-80 transition-opacity">
                            <img src="/icons/LOGO BRANCO PRA PRETO.svg" alt="Multiverso Estudio" width={80} height={80} className="mr-2 object-contain" />
                      </a>
                    </div>
                  )}
                    </>
                  ) : (
                    // Outras páginas: sempre logo preta
                    <div className="flex items-center">
                      <a href="/" className="flex items-center hover:opacity-80 transition-opacity">
                        <img src="/icons/LOGO PRETO PRA BRANCO.svg" alt="Multiverso Estudio" width={80} height={80} className="mr-2 object-contain" />
                      </a>
                    </div>
                  )}
                </>
              ) : (
                // Logo + Campo de pesquisa
                <div className="flex items-center space-x-3">
                  {/* Logo pequeno */}
                <div className="flex items-center">
                  <a href="/" className="flex items-center hover:opacity-80 transition-opacity">
                      <img 
                        src={isHomePage && !isScrolled ? "/icons/LOGO BRANCO PRA PRETO.svg" : "/icons/LOGO PRETO PRA BRANCO.svg"} 
                        alt="Multiverso Estudio" 
                        width={60} 
                        height={60} 
                        className="mr-2 object-contain" 
                      />
                    </a>
                  </div>

                  {/* Campo de pesquisa */}
                  <div className="w-48">
                    <form onSubmit={handleSearchSubmit} className="relative">
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Pesquisar..."
                        className={`w-full px-3 py-2 border rounded-none focus:outline-none focus:ring-1 focus:ring-black transition-all duration-300 text-sm ${
                          isHomePage && !isScrolled 
                            ? "bg-white/20 border-white/30 text-white placeholder-white/80 focus:bg-white focus:text-black focus:border-gray-300" 
                            : "bg-white border-gray-200 text-black placeholder-gray-500 focus:bg-white focus:text-black focus:border-gray-300"
                        }`}
                        autoFocus
                      />
                      <button
                        type="submit"
                        className={`absolute right-8 top-1/2 transform -translate-y-1/2 px-2 py-1 text-xs font-bold transition-all duration-300 ${
                          isHomePage && !isScrolled 
                            ? "text-white hover:text-black hover:bg-white/20" 
                            : "text-black hover:text-gray-600 hover:bg-gray-100"
                        }`}
                      >
                        OK
                      </button>
                      <button
                        type="button"
                        onClick={handleSearchClose}
                        className={`absolute right-1 top-1/2 transform -translate-y-1/2 w-5 h-5 flex items-center justify-center text-xs font-bold transition-all duration-300 text-black hover:text-gray-600 hover:bg-gray-100`}
                      >
                        ✕
                      </button>
                    </form>
                  </div>
                </div>
              )}
          </div>

            {/* Ícones - sempre à direita */}
            <div className="flex items-center space-x-2">
              <IconWithTooltip
                iconSrc="/icons/dúvidas icon.svg"
                tooltip="Central de Ajuda"
                href="/duvidas"
                width={16}
                height={16}
                isDarkBackground={isHomePage}
                noAnimation={true}
              />
              <IconWithTooltip
                iconSrc="/icons/mochila icon.svg"
                tooltip="Mochila"
                href="#"
                onClick={() => setIsCartOpen(true)}
                width={16}
                height={16}
                isDarkBackground={isHomePage}
                showCartCount={true}
              />
              <CustomerProfileButton isDarkBackground={isHomePage} />
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
          {isMobileMenuOpen && (
        <div className={`fixed inset-0 z-40 md:hidden animate-in fade-in duration-500 ease-out ${isHomePage ? "bg-black" : "bg-white"}`}>
          <div className="pt-20 px-4 animate-in slide-in-from-top-4 duration-500 ease-out delay-100">
            {/* Campo de Pesquisa Mobile */}
            <div className="mb-6 animate-in slide-in-from-left-4 duration-500 ease-out delay-50">
              <form onSubmit={handleSearchSubmit} className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Pesquisar produtos..."
                  className={`w-full px-4 py-3 pl-12 text-sm border-2 rounded-none font-gotham-medium focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ${
                    isHomePage 
                      ? "bg-white/10 border-white/30 text-white placeholder-white/60 focus:bg-white focus:text-black focus:placeholder-gray-500 focus:border-black" 
                      : "bg-gray-50 border-gray-300 text-black placeholder-gray-500 focus:bg-white focus:text-black focus:border-black"
                  }`}
                />
                <div className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
                  isHomePage ? "text-white/60" : "text-gray-400"
                }`}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.35-4.35"></path>
                  </svg>
                </div>
                <button 
                  type="submit"
                  className={`absolute right-3 top-1/2 transform -translate-y-1/2 px-3 py-1 text-xs font-bold uppercase transition-all duration-300 ${
                    isHomePage 
                      ? "text-black/80 hover:text-black border border-gray-300 hover:border-black"
                      : "text-black/80 hover:text-black border border-gray-300 hover:border-black"
                  }`}
                >
                  Buscar
                </button>
              </form>
            </div>

            {/* Action Buttons */}
            <div className="mb-8 space-y-3 animate-in slide-in-from-left-4 duration-500 ease-out delay-100 ">
              <button className={`w-full py-3 border text-center  transition-all duration-300 ease-out font-gotham-bold rounded-none ${
                  isHomePage 
                    ? "border-white text-white hover:bg-white hover:text-black" 
                    : "border-black text-black hover:bg-black hover:text-white"
                }`}>
                  JÁ SOU EXPLORADOR
                </button>
              <button className={`w-full py-3 border text-center  transition-all duration-300 ease-out font-gotham-bold rounded-none ${
                  isHomePage 
                  ? "border-white text-white hover:bg-black hover:text-white" 
                    : "border-black text-black hover:bg-black hover:text-white"
                }`}>CRIAR CONTA</button>
            </div>

            {/* Navigation Items */}
            <div className="space-y-4">
              {mobileMenuItems.map((item, index) => (
                                  <div key={item.name}>
                    <div 
                      className={`flex items-center justify-between py-2 border-b animate-in slide-in-from-left-4 duration-500 ease-out ${
                        isHomePage ? "border-gray-800" : "border-gray-300"
                      }`}
                      style={{ animationDelay: `${(index + 2) * 100}ms` }}
                    >
                      <a href={item.href} className={`group/link relative text-lg transition-all duration-300 ease-out ${
                        isHomePage ? "text-white" : "text-black"
                      }`}>
                        <span className="font-medium group-hover/link:font-black transition-all duration-300 ease-out">
                          {item.name}
                        </span>
                      <span className={`absolute bottom-0 left-0 right-0 h-0.5 transform scale-x-0 group-hover/link:scale-x-100 transition-transform duration-200 ease-in-out origin-left pointer-events-none ${
                          isHomePage ? "bg-white" : "bg-black"
                        }`}></span>
                      </a>
                      {item.hasSubs && (
                        <button 
                          onClick={() => toggleCategory(item.name)}
                          className={`text-xl hover:text-white transition-colors duration-200 ${
                            isHomePage ? "text-white" : "text-black"
                          }`}
                        >
                          {expandedCategories.includes(item.name) ? "−" : "+"}
                        </button>
          )}
        </div>

                                                                              {/* Subcategorias expandidas */}
                      {item.hasSubs && expandedCategories.includes(item.name) && (
                        <div className="ml-4 mt-2 space-y-2 animate-in slide-in-from-left-4 duration-500 ease-out">
                          {categoriesWithSubs[item.name as keyof typeof categoriesWithSubs]?.subcategories?.map((subcat, subIndex) => (
                            <div 
                              key={subcat}
                              className="py-1 animate-in slide-in-from-left-4 duration-500 ease-out"
                              style={{ animationDelay: `${(index + 2) * 100 + (subIndex + 1) * 50}ms` }}
                            >
                              <a 
                                href={`${item.href}/${subcat.toLowerCase().replace(/\s+/g, '-')}`}
                                className={`group/subcat relative text-sm hover:text-white transition-all duration-300 ease-out flex items-center justify-between ${
                                  isHomePage ? "text-gray-300" : "text-gray-600"
                                }`}
                              >
                                <div className="relative">
                                  <span className="font-normal group-hover/subcat:font-black transition-all duration-300 ease-out">
                                    {subcat}
                                  </span>
                              <span className={`absolute bottom-0 left-0 right-0 h-0.5 transform scale-x-0 group-hover/subcat:scale-x-100 transition-transform duration-200 ease-in-out origin-left pointer-events-none ${
                                    isHomePage ? "bg-white" : "bg-black"
                                  }`}></span>
                                </div>
                                <img 
                                  src={isHomePage ? "/icons/SETA PARA BRANCO icon.svg" : "/icons/SETA PARA PRETO icon.svg"} 
                                  alt="Seta" 
                                  width={20} 
                                  height={20} 
                                  className="opacity-60 group-hover/subcat:opacity-100 transition-opacity duration-300 ease-out" 
                                />
                              </a>
                            </div>
                        ))}
                      </div>
                      )}
                      </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tablet Menu Overlay */}
      {isMobileMenuOpen && (
        <div className={`fixed inset-0 z-40 hidden md:block lg:hidden animate-in fade-in duration-500 ease-out ${isHomePage ? "bg-black/50" : "bg-white/50"}`}>
          <div className="flex justify-start h-full">
            <div className={`w-1/2 h-full pt-16 px-6 animate-in slide-in-from-left-4 duration-500 ease-out ${
              isHomePage ? "bg-black/90 backdrop-blur-sm" : "bg-white/90 backdrop-blur-sm"
            }`}>
              <div className="space-y-6">
                {/* Campo de Pesquisa Tablet */}
                <div className="animate-in slide-in-from-left-4 duration-500 ease-out delay-50">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Pesquisar produtos..."
                      className={`w-full px-4 py-3 pl-12 text-sm border rounded-none focus:outline-none focus:ring-1 focus:ring-black transition-all duration-300 text-base ${
                        isHomePage 
                          ? "bg-white/20 border-white/30 text-white placeholder-white/60 focus:bg-white focus:text-black focus:placeholder-gray-500 focus:border-gray-300" 
                          : "bg-gray-50 border-gray-300 text-black placeholder-gray-500 focus:bg-white focus:text-black focus:border-gray-300"
                      }`}
                    />
                    <div className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
                      isHomePage ? "text-white/60" : "text-gray-400"
                    }`}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="11" cy="11" r="8"></circle>
                        <path d="m21 21-4.35-4.35"></path>
                      </svg>
                    </div>
                    <button className={`absolute right-3 top-1/2 transform -translate-y-1/2 px-3 py-1 text-xs font-bold uppercase transition-all duration-300 ${
                      isHomePage 
                        ? "text-black/80 hover:text-black border border-gray-300 hover:border-black"
                        : "text-black/80 hover:text-black border border-gray-300 hover:border-black"
                    }`}>
                      Buscar
                    </button>
                  </div>
                </div>

                {mobileMenuItems.map((item, index) => (
                  <div key={item.name}>
                    <div 
                      className={`flex items-center justify-between py-3 border-b animate-in slide-in-from-left-4 duration-500 ease-out ${
                        isHomePage ? "border-gray-800" : "border-gray-300"
                      }`}
                      style={{ animationDelay: `${(index + 1) * 100}ms` }}
                    >
                      <a href={item.href} className={`group/link relative text-xl transition-all duration-300 ease-out ${
                        isHomePage ? "text-white" : "text-black"
                      }`}>
                        <span className="font-medium group-hover/link:font-black transition-all duration-300 ease-out">
                          {item.name}
                        </span>
                        <span className={`absolute bottom-0 left-0 right-0 h-0.5 transform scale-x-0 group-hover/link:scale-x-100 transition-transform duration-300 ease-out origin-left ${
                          isHomePage ? "bg-white" : "bg-black"
                        }`}></span>
                      </a>
                      {item.hasSubs && (
                        <button 
                          onClick={() => toggleCategory(item.name)}
                          className={`text-2xl hover:text-white transition-colors duration-200 ${
                            isHomePage ? "text-white" : "text-black"
                          }`}
                        >
                          {expandedCategories.includes(item.name) ? "−" : "+"}
                        </button>
                      )}
              </div>

                                        {/* Subcategorias expandidas */}
                    {item.hasSubs && expandedCategories.includes(item.name) && (
                      <div className="ml-4 mt-2 space-y-2 animate-in slide-in-from-left-4 duration-500 ease-out">
                        {item.subcategories?.map((subcat, subIndex) => (
                          <div 
                            key={subcat}
                            className="py-1 animate-in slide-in-from-left-4 duration-500 ease-out"
                            style={{ animationDelay: `${(index + 1) * 100 + (subIndex + 1) * 50}ms` }}
                          >
                            <a 
                              href={`${item.href}/${subcat.toLowerCase().replace(/\s+/g, '-')}`}
                              className={`group/subcat relative text-sm hover:text-white transition-all duration-300 ease-out block flex items-center justify-between ${
                                isHomePage ? "text-gray-300" : "text-gray-600"
                              }`}
                            >
                              <div className="relative">
                                <span className="font-normal group-hover/subcat:font-black transition-all duration-300 ease-out">
                                  {subcat}
                                </span>
                                <span className={`absolute bottom-0 left-0 right-0 h-0.5 transform scale-x-0 group-hover/subcat:scale-x-100 transition-transform duration-300 ease-out origin-left pointer-events-none ${
                                  isHomePage ? "bg-white" : "bg-black"
                                }`}></span>
                              </div>
                              <img 
                                src={isHomePage ? "/icons/SETA PARA BRANCO icon.svg" : "/icons/SETA PARA PRETO icon.svg"} 
                                alt="Seta" 
                                width={20} 
                                height={20} 
                                className="opacity-60 group-hover/subcat:opacity-100 transition-opacity duration-300 ease-out" 
                              />
                            </a>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cart Modal */}
      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  )
}