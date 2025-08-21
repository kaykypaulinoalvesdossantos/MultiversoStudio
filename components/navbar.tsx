"use client"

import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import { usePathname } from "next/navigation"
import CartModal from "./cart-modal"

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
  const pathname = usePathname()

  // Detecta se está na página principal
  const isHomePage = pathname === "/"

  useEffect(() => {
    const handleScroll = () => {
      // Só aplica o efeito de scroll na página principal
      if (isHomePage) {
        setIsScrolled(window.scrollY > 200)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [isHomePage])

  const toggleCategory = (categoryName: string) => {
    setExpandedCategories(prev => 
      prev.includes(categoryName) 
        ? prev.filter(cat => cat !== categoryName)
        : [...prev, categoryName]
    )
  }

  // Categorias com subcategorias
  const categoriesWithSubs: Record<string, CategoryItem> = {
    "ÚLTIMA VIAGEM": { 
      name: "ÚLTIMA VIAGEM",
      href: "/categoria/lancamentos", 
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
    "PARCEIROS": { name: "PARCEIROS", href: "/para-criadores", hasSubs: false },
    "PERSONALIZÁVEIS": { name: "PERSONALIZÁVEIS", href: "/personalizar", hasSubs: false },
    "KITS": { 
      name: "KITS",
      href: "/categoria/kits-promocionais", 
      hasSubs: true,
      subcategories: ["Kit Café", "Kit Gamer", "Kit Completo", "Kit Presente"]
    }
  }

  const navigationItems: CategoryItem[] = [
    { name: "ÚLTIMA VIAGEM", href: "/categoria/lancamentos", hasSubs: false },
    { name: "CANECAS", href: "/categoria/canecas", hasSubs: true, subcategories: ["Cerâmica", "Vidro", "Chopp", "Jateada", "Lisa", "Térmica"] },
    { name: "VESTUÁRIO", href: "/categoria/vestuario", hasSubs: true, subcategories: ["Camisetas", "Polo", "Tradicional", "StreetWear", "BabyLook", "Premium", "Moletons", "Regatas", "Bonés"] },
    { name: "PARCEIROS", href: "/para-criadores", hasSubs: false },
    { name: "PERSONALIZÁVEIS", href: "/personalizar", hasSubs: false },
    { name: "KITS", href: "/categoria/kits-promocionais", hasSubs: true, subcategories: ["Kit Café", "Kit Gamer", "Kit Completo", "Kit Presente"] }
  ]

  const mobileMenuItems: CategoryItem[] = [
    { name: "ÚLTIMA VIAGEM", href: "/categoria/lancamentos", hasSubs: false },
    { name: "CANECAS", href: "/categoria/canecas", hasSubs: true, subcategories: ["Cerâmica", "Vidro", "Chopp", "Jateada", "Lisa", "Térmica"] },
    { name: "VESTUÁRIO", href: "/categoria/vestuario", hasSubs: true, subcategories: ["Camisetas", "Polo", "Tradicional", "StreetWear", "BabyLook", "Premium", "Moletons", "Regatas", "Bonés"] },
    { name: "PARCEIROS", href: "/para-criadores", hasSubs: false },
    { name: "PERSONALIZÁVEIS", href: "/personalizar", hasSubs: false },
    { name: "KITS", href: "/categoria/kits-promocionais", hasSubs: true, subcategories: ["Kit Café", "Kit Gamer", "Kit Completo", "Kit Presente"] },
    { name: "TROCAS", href: "/trocas", hasSubs: false },
    { name: "SOBRE NÓS", href: "/sobre", hasSubs: false }
  ]

  const IconWithTooltip = ({
    iconSrc,
    tooltip,
    href,
    width = 20,
    height = 20,
    isDarkBackground = false,
    onClick,
    noAnimation = false,
  }: {
    iconSrc: string
    tooltip: string
    href: string
    width?: number
    height?: number
    isDarkBackground?: boolean
    onClick?: () => void
    noAnimation?: boolean
  }) => {
    const [isHovered, setIsHovered] = useState(false)
    const [displayText, setDisplayText] = useState("")

    useEffect(() => {
      if (isHovered) {
        if (noAnimation) {
          setDisplayText(tooltip)
        } else {
          let currentIndex = 0
          const typingInterval = setInterval(() => {
            if (currentIndex <= tooltip.length) {
              setDisplayText(tooltip.slice(0, currentIndex))
              currentIndex++
            } else {
              clearInterval(typingInterval)
            }
          }, 50) // 50ms delay between each character

          return () => clearInterval(typingInterval)
        }
      } else {
        setDisplayText("")
      }
    }, [isHovered, tooltip, noAnimation])

    return (
      <div
        className="flex items-center"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {onClick ? (
          <button onClick={onClick} className="flex items-center">
            <svg
              width={width}
              height={height}
              className={`cursor-pointer transition-opacity hover:opacity-70 ${isDarkBackground ? 'text-white' : 'text-black'}`}
              viewBox="0 0 100 100"
              style={{ 
                filter: isDarkBackground ? 'brightness(0) invert(1)' : 'none'
              }}
            >
              <image href={iconSrc} width="100" height="100" />
            </svg>
            <span
              className={`ml-2 text-sm font-medium transition-all duration-200 whitespace-nowrap cursor-pointer ${
                isHovered ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"
              } ${                isDarkBackground ? "text-white" : "text-black"
              }`}
              style={{ minWidth: isHovered ? "auto" : "0", overflow: "hidden" }}
            >
              {displayText}
            </span>
          </button>
        ) : (
          <a href={href} className="flex items-center">
            <svg
              width={width}
              height={height}
              className={`cursor-pointer transition-opacity hover:opacity-70 ${isDarkBackground ? 'text-white' : 'text-black'}`}
              viewBox="0 0 100 100"
              style={{ 
                filter: isDarkBackground ? 'brightness(0) invert(1)' : 'none'
              }}
            >
              <image href={iconSrc} width="100" height="100" />
            </svg>
            <span
              className={`ml-2 text-sm font-medium transition-all duration-200 whitespace-nowrap cursor-pointer ${
                isHovered ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"
              } ${
                isDarkBackground ? "text-white" : "text-black"
              }`}
              style={{ minWidth: isHovered ? "auto" : "0", overflow: "hidden" }}
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
        ? "bg-white/10 backdrop-blur-md shadow-lg border-b border-white/10"
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
        ? "/icons/LOGO PRETO PRA BRANCO.svg" 
        : "/icons/LOGO BRANCO PRA PRETO.svg"
    } else {
      return "/icons/LOGO PRETO PRA BRANCO.svg"
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

  return (
    <>
      {/* Desktop Navbar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 hidden lg:block ${getNavbarStyle()}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center">
              <a href="/" className="flex items-center hover:opacity-80 transition-opacity">
                <img 
                  src={getLogoSource()} 
                  alt="Multiverso Estudio" 
                  width={120} 
                  height={120} 
                  className="mr-4 object-contain transition-all duration-300" 
                />
              </a>
            </div>

            {/* Navigation Links */}
            <div className="hidden lg:flex items-center space-x-8">
              {navigationItems.map((item) => (
                <div key={item.name} className="relative group">
                  <a
                    href={item.href}
                    className={`group/link relative text-sm font-medium transition-all duration-200 cursor-pointer ${getTextColor()}`}
                  >
                    <span className={`font-medium transition-all duration-200 ${
                      isHomePage 
                        ? (isScrolled || isHovered ? "group-hover/link:font-black" : "group-hover/link:font-bold")
                        : "group-hover/link:font-black"
                    }`}>
                      {item.name}
                    </span>
                    <span className={`absolute bottom-0 left-0 right-0 h-0.5 transform scale-x-0 group-hover/link:scale-x-100 transition-transform duration-300 origin-left ${getUnderlineColor()}`}></span>
                  </a>
                  
                  {/* Dropdown das subcategorias */}
                  {item.hasSubs && (
                    <div className={`absolute top-full left-0 w-56 border shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 ${getDropdownStyle()}`}>
                      <div className="py-3">
                        {item.subcategories?.map((subcat, index) => (
                          <a
                            key={subcat}
                            href={`${item.href}/${subcat.toLowerCase().replace(/\s+/g, '-')}`}
                            className={`group/item relative block px-6 py-3 text-sm transition-all duration-200 ${getDropdownTextColor()}`}
                            style={{ animationDelay: `${index * 50}ms` }}
                          >
                            <span className={`font-normal transition-all duration-200 ${getDropdownHoverColor()}`}>
                              {subcat}
                            </span>
                            <span className={`absolute bottom-0 left-6 right-6 h-0.5 transform scale-x-0 group-hover/item:scale-x-100 transition-transform duration-300 origin-left ${getDropdownUnderlineColor()}`}></span>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
              </div>
              ))}
            </div>

            <div className="flex items-center space-x-4">
              <IconWithTooltip iconSrc="/icons/pesquisa icon.svg" tooltip="Pesquisar" href="/pesquisa" isDarkBackground={getIconDarkBackground()} />
              <IconWithTooltip iconSrc="/icons/dúvidas icon.svg" tooltip="Central de Ajuda" href="/duvidas" noAnimation={true} isDarkBackground={getIconDarkBackground()} />
              <IconWithTooltip iconSrc="/icons/mochila icon.svg" tooltip="Mochila" href="#" onClick={() => setIsCartOpen(true)} isDarkBackground={getIconDarkBackground()} />
              <IconWithTooltip iconSrc="/icons/login icon.svg" tooltip="Login/Cadastro" href="/login" isDarkBackground={getIconDarkBackground()} />
            </div>
          </div>
        </div>
      </nav>

      {/* Tablet/Laptop Navbar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 hidden md:block lg:hidden ${
          isScrolled ? "bg-black" : "bg-black"
        }`}
      >
        <div className="px-6">
          <div className="flex items-center justify-between h-20">
            {/* Hamburger Menu */}
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-white">
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            <div className="flex items-center absolute left-1/2 transform -translate-x-1/2">
              {isScrolled && (
                <div className="flex items-center animate-fade-in">
                  <a href="/" className="flex items-center hover:opacity-80 transition-opacity">
                    <img src="/icons/TIPOGRAFIA PARA PRETO.svg" alt="Multiverso Estudio" width={120} height={120} className="mr-2 object-contain" />
                  </a>
                </div>
              )}
              {!isScrolled && (
                <div className="flex items-center">
                  <a href="/" className="flex items-center hover:opacity-80 transition-opacity">
                    <img src="/icons/LUNETA PARA PRETO.svg" alt="Multiverso Estudio" width={120} height={120} className="mr-2 object-contain" />
                  </a>
                </div>
              )}
            </div>

            <div className="flex items-center space-x-3">
              <IconWithTooltip iconSrc="/icons/pesquisa icon.svg" tooltip="Pesquisar" href="/pesquisa" isDarkBackground={true} />
              <IconWithTooltip iconSrc="/icons/dúvidas icon.svg" tooltip="Central de Ajuda" href="/duvidas" isDarkBackground={true} noAnimation={true} />
              <IconWithTooltip iconSrc="/icons/mochila icon.svg" tooltip="Mochila" href="#" onClick={() => setIsCartOpen(true)} isDarkBackground={true} />
              <IconWithTooltip iconSrc="/icons/login icon.svg" tooltip="Login/Cadastro" href="/login" isDarkBackground={true} />
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

            <div className="flex items-center absolute left-1/2 transform -translate-x-1/2">
              {isHomePage ? (
                // Página principal: logo adaptativo
                <>
                  {isScrolled && (
                    <div className="flex items-center animate-fade-in">
                      <a href="/" className="flex items-center hover:opacity-80 transition-opacity">
                        <img src="/icons/TIPOGRAFIA PARA PRETO.svg" alt="Multiverso Estudio" width={80} height={80} className="mr-2 object-contain" />
                      </a>
                    </div>
                  )}
                  {!isScrolled && (
                    <div className="flex items-center">
                      <a href="/" className="flex items-center hover:opacity-80 transition-opacity">
                        <img src="/icons/LUNETA PARA PRETO.svg" alt="Multiverso Estudio" width={80} height={80} className="mr-2 object-contain" />
                      </a>
                    </div>
                  )}
                </>
              ) : (
                // Outras páginas: sempre logo preto
                <div className="flex items-center">
                  <a href="/" className="flex items-center hover:opacity-80 transition-opacity">
                    <img src="/icons/TIPOGRAFIA PARA PRETO.svg" alt="Multiverso Estudio" width={80} height={80} className="mr-2 object-contain" />
                  </a>
                </div>
              )}
          </div>

            <div className="flex items-center space-x-2">
              <IconWithTooltip
                iconSrc="/icons/pesquisa icon.svg"
                tooltip="Pesquisar"
                href="/pesquisa"
                width={16}
                height={16}
                isDarkBackground={isHomePage}
              />
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
              />
              <IconWithTooltip 
                iconSrc="/icons/login icon.svg" 
                tooltip="Login/Cadastro" 
                href="/login" 
                width={16} 
                height={16} 
                isDarkBackground={isHomePage}
              />
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
          {isMobileMenuOpen && (
        <div className={`fixed inset-0 z-40 md:hidden animate-in fade-in duration-300 ${isHomePage ? "bg-black" : "bg-white"}`}>
          <div className="pt-16 px-4 animate-in slide-in-from-top-4 duration-300 delay-100">
            {/* Action Buttons */}
            <div className="mb-8 space-y-3 animate-in slide-in-from-left-4 duration-300 delay-100">
              <button className={`w-full py-3 border text-center rounded transition-all duration-200 ${
                isHomePage 
                  ? "border-white text-white hover:bg-white hover:text-black" 
                  : "border-black text-black hover:bg-black hover:text-white"
              }`}>
                JÁ SOU EXPLORADOR
              </button>
              <button className={`w-full py-3 border text-center rounded transition-all duration-200 ${
                isHomePage 
                  ? "border-white text-white hover:bg-white hover:text-black" 
                  : "border-black text-black hover:bg-black hover:text-white"
              }`}>CRIAR CONTA</button>
            </div>

            {/* Navigation Items */}
            <div className="space-y-4">
              {mobileMenuItems.map((item, index) => (
                                  <div key={item.name}>
                    <div 
                      className={`flex items-center justify-between py-2 border-b animate-in slide-in-from-left-4 duration-300 ${
                        isHomePage ? "border-gray-800" : "border-gray-300"
                      }`}
                      style={{ animationDelay: `${(index + 2) * 100}ms` }}
                    >
                      <a href={item.href} className={`group/link relative text-lg transition-all duration-200 ${
                        isHomePage ? "text-white" : "text-black"
                      }`}>
                        <span className="font-medium group-hover/link:font-black transition-all duration-200">
                          {item.name}
                        </span>
                        <span className={`absolute bottom-0 left-0 right-0 h-0.5 transform scale-x-0 group-hover/link:scale-x-100 transition-transform duration-300 origin-left ${
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
                        <div className="ml-4 mt-2 space-y-2 animate-in slide-in-from-left-4 duration-300">
                          {categoriesWithSubs[item.name as keyof typeof categoriesWithSubs]?.subcategories?.map((subcat, subIndex) => (
                            <div 
                              key={subcat}
                              className="py-1 animate-in slide-in-from-left-4 duration-300"
                              style={{ animationDelay: `${(index + 2) * 100 + (subIndex + 1) * 50}ms` }}
                            >
                              <a 
                                href={`${item.href}/${subcat.toLowerCase().replace(/\s+/g, '-')}`}
                                className={`group/subcat relative text-sm hover:text-white transition-all duration-200 block flex items-center justify-between ${
                                  isHomePage ? "text-gray-300" : "text-gray-600"
                                }`}
                              >
                                <div className="relative">
                                  <span className="font-normal group-hover/subcat:font-black transition-all duration-200">
                                    {subcat}
                                  </span>
                                  <span className={`absolute bottom-0 left-0 right-0 h-0.5 transform scale-x-0 group-hover/subcat:scale-x-100 transition-transform duration-300 origin-left ${
                                    isHomePage ? "bg-white" : "bg-black"
                                  }`}></span>
                                </div>
                                <img 
                                  src={isHomePage ? "/icons/SETA PARA BRANCO icon.svg" : "/icons/SETA PARA PRETO icon.svg"} 
                                  alt="Seta" 
                                  width={20} 
                                  height={20} 
                                  className="opacity-60 group-hover/subcat:opacity-100 transition-opacity duration-200" 
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
        <div className={`fixed inset-0 z-40 hidden md:block lg:hidden animate-in fade-in duration-300 ${isHomePage ? "bg-black/50" : "bg-white/50"}`}>
          <div className="flex justify-start h-full">
            <div className={`w-1/2 h-full pt-16 px-6 animate-in slide-in-from-left-4 duration-300 ${
              isHomePage ? "bg-black/90 backdrop-blur-sm" : "bg-white/90 backdrop-blur-sm"
            }`}>
              <div className="space-y-6">
                {mobileMenuItems.map((item, index) => (
                  <div key={item.name}>
                    <div 
                      className={`flex items-center justify-between py-3 border-b animate-in slide-in-from-left-4 duration-300 ${
                        isHomePage ? "border-gray-800" : "border-gray-300"
                      }`}
                      style={{ animationDelay: `${(index + 1) * 100}ms` }}
                    >
                      <a href={item.href} className={`group/link relative text-xl transition-all duration-200 ${
                        isHomePage ? "text-white" : "text-black"
                      }`}>
                        <span className="font-medium group-hover/link:font-black transition-all duration-200">
                          {item.name}
                        </span>
                        <span className={`absolute bottom-0 left-0 right-0 h-0.5 transform scale-x-0 group-hover/link:scale-x-100 transition-transform duration-300 origin-left ${
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
                      <div className="ml-4 mt-2 space-y-2 animate-in slide-in-from-left-4 duration-300">
                        {item.subcategories?.map((subcat, subIndex) => (
                          <div 
                            key={subcat}
                            className="py-1 animate-in slide-in-from-left-4 duration-300"
                            style={{ animationDelay: `${(index + 1) * 100 + (subIndex + 1) * 50}ms` }}
                          >
                            <a 
                              href={`${item.href}/${subcat.toLowerCase().replace(/\s+/g, '-')}`}
                              className={`group/subcat relative text-sm hover:text-white transition-all duration-200 block flex items-center justify-between ${
                                isHomePage ? "text-gray-300" : "text-gray-600"
                              }`}
                            >
                              <div className="relative">
                                <span className="font-normal group-hover/subcat:font-black transition-all duration-200">
                                  {subcat}
                                </span>
                                <span className={`absolute bottom-0 left-0 right-0 h-0.5 transform scale-x-0 group-hover/subcat:scale-x-100 transition-transform duration-300 origin-left ${
                                  isHomePage ? "bg-white" : "bg-black"
                                }`}></span>
                              </div>
                              <img 
                                src={isHomePage ? "/icons/SETA PARA BRANCO icon.svg" : "/icons/SETA PARA PRETO icon.svg"} 
                                alt="Seta" 
                                width={20} 
                                height={20} 
                                className="opacity-60 group-hover/subcat:opacity-100 transition-opacity duration-200" 
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
