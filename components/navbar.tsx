"use client"

import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 200)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

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
  }: {
    iconSrc: string
    tooltip: string
    href: string
    width?: number
    height?: number
    isDarkBackground?: boolean
    onClick?: () => void
  }) => {
    const [isHovered, setIsHovered] = useState(false)
    const [displayText, setDisplayText] = useState("")

    useEffect(() => {
      if (isHovered) {
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
      } else {
        setDisplayText("")
      }
    }, [isHovered, tooltip])

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
              className={`cursor-pointer transition-opacity hover:opacity-70 ${isDarkBackground ? 'text-white' : 'text-gray-700'}`}
              viewBox="0 0 100 100"
              style={{ 
                filter: isDarkBackground ? 'brightness(0) invert(1)' : 'none'
              }}
            >
              <image href={iconSrc} width="100" height="100" />
            </svg>
            <span
              className={`ml-2 text-sm font-medium transition-all duration-200 whitespace-nowrap cursor-pointer hover:text-orange-500 ${
                isHovered ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"
              } ${
                isDarkBackground ? "text-white" : "text-gray-700"
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
              className={`cursor-pointer transition-opacity hover:opacity-70 ${isDarkBackground ? 'text-white' : 'text-gray-700'}`}
              viewBox="0 0 100 100"
              style={{ 
                filter: isDarkBackground ? 'brightness(0) invert(1)' : 'none'
              }}
            >
              <image href={iconSrc} width="100" height="100" />
            </svg>
            <span
              className={`ml-2 text-sm font-medium transition-all duration-200 whitespace-nowrap cursor-pointer hover:text-orange-500 ${
                isHovered ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"
              } ${
                isDarkBackground ? "text-white" : "text-gray-700"
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

  return (
    <>
      {/* Desktop Navbar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 hidden lg:block ${
          isHovered
            ? "bg-white shadow-lg border-b border-gray-200"
            : isScrolled
              ? "bg-white/10 backdrop-blur-md shadow-lg border-b border-white/10"
              : "bg-white border-b border-gray-200"
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center">
              <a href="/" className="flex items-center hover:opacity-80 transition-opacity">
                <img src="/logo-luneta.webp" alt="Multiverso Studio" width={60} height={60} className="mr-4 object-contain" />
                <span className={`text-3xl font-bold transition-colors text-black`}>MULTIVERSO</span>
              </a>
            </div>

            {/* Navigation Links */}
            <div className="hidden lg:flex items-center space-x-8">
              {navigationItems.map((item) => (
                <div key={item.name} className="relative group">
                  <a
                    href={item.href}
                    className={`text-sm font-medium transition-colors hover:text-orange-500 text-gray-700 cursor-pointer`}
                  >
                    {item.name}
                  </a>
                  
                  {/* Dropdown das subcategorias */}
                  {item.hasSubs && (
                    <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top scale-95 group-hover:scale-100 z-50">
                      <div className="py-2">
                        {item.subcategories?.map((subcat, index) => (
                          <a
                            key={subcat}
                            href={`${item.href}/${subcat.toLowerCase().replace(/\s+/g, '-')}`}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors duration-200"
                            style={{ animationDelay: `${index * 50}ms` }}
                          >
                            {subcat}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="flex items-center space-x-4">
              <IconWithTooltip iconSrc="/icons/rastreio icon.svg" tooltip="Rastreio" href="/rastreio" />
              <IconWithTooltip iconSrc="/icons/dúvidas icon.svg" tooltip="Dúvidas" href="/duvidas" />
              <IconWithTooltip iconSrc="/icons/trocas icon.svg" tooltip="Trocas" href="/trocas" />
              <IconWithTooltip iconSrc="/icons/mochila icon.svg" tooltip="Carrinho" href="#" onClick={() => setIsCartOpen(true)} />
              <IconWithTooltip iconSrc="/icons/login icon.svg" tooltip="Login" href="/login" />
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
                  <a href="/" className="text-lg font-bold text-white hover:opacity-80 transition-opacity">MULTIVERSO</a>
                </div>
              )}
              {!isScrolled && (
                <div className="flex items-center">
                  <a href="/" className="flex items-center hover:opacity-80 transition-opacity">
                    <img src="/logo-luneta.webp" alt="Multiverso Studio" width={80} height={80} className="mr-2" />
                  </a>
                </div>
              )}
            </div>

            <div className="flex items-center space-x-3">
              <IconWithTooltip iconSrc="/icons/trocas icon.svg" tooltip="Trocas" href="/trocas" isDarkBackground={true} />
              <IconWithTooltip iconSrc="/icons/mochila icon.svg" tooltip="Carrinho" href="#" onClick={() => setIsCartOpen(true)} isDarkBackground={true} />
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black md:hidden">
        <div className="px-4">
          <div className="flex items-center justify-between h-16">
            {/* Hamburger Menu */}
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-white">
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <div className="flex items-center absolute left-1/2 transform -translate-x-1/2">
              {isScrolled && (
                <div className="flex items-center animate-fade-in">
                  <a href="/" className="text-sm font-bold text-white hover:opacity-80 transition-opacity">MULTIVERSO</a>
                </div>
              )}
              {!isScrolled && (
                <div className="flex items-center">
                  <a href="/" className="flex items-center hover:opacity-80 transition-opacity">
                    <img src="/logo-luneta.webp" alt="Multiverso Studio" width={80} height={80} className="mr-2" />
                  </a>
                </div>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <IconWithTooltip
                iconSrc="/icons/rastreio icon.svg"
                tooltip="Rastreio"
                href="/rastreio"
                width={16}
                height={16}
                isDarkBackground={true}
              />
              <IconWithTooltip
                iconSrc="/icons/trocas icon.svg"
                tooltip="Trocas"
                href="/trocas"
                width={16}
                height={16}
                isDarkBackground={true}
              />
                            <IconWithTooltip
                iconSrc="/icons/mochila icon.svg"
                tooltip="Carrinho"
                href="#"
                onClick={() => setIsCartOpen(true)}
                width={16}
                height={16}
                isDarkBackground={true}
              />
              <IconWithTooltip iconSrc="/icons/login icon.svg" tooltip="Login" href="/login" width={16} height={16} isDarkBackground={true} />
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black md:hidden animate-in fade-in duration-300">
          <div className="pt-16 px-4 animate-in slide-in-from-top-4 duration-300 delay-100">
            {/* Action Buttons */}
            <div className="mb-8 space-y-3 animate-in slide-in-from-left-4 duration-300 delay-100">
              <button className="w-full py-3 border border-white text-white text-center rounded hover:bg-white hover:text-black transition-all duration-200">
                JÁ SOU EXPLORADOR
              </button>
              <button className="w-full py-3 border border-white text-white text-center rounded hover:bg-white hover:text-black transition-all duration-200">CRIAR CONTA</button>
            </div>

            {/* Navigation Items */}
            <div className="space-y-4">
              {mobileMenuItems.map((item, index) => (
                <div key={item.name}>
                  <div 
                    className="flex items-center justify-between py-2 border-b border-gray-800 animate-in slide-in-from-left-4 duration-300"
                    style={{ animationDelay: `${(index + 2) * 100}ms` }}
                  >
                    <a href={item.href} className="text-white text-lg hover:text-orange-400 transition-colors duration-200">
                      {item.name}
                    </a>
                    {item.hasSubs && (
                      <button 
                        onClick={() => toggleCategory(item.name)}
                        className="text-white text-xl hover:text-orange-400 transition-colors duration-200"
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
                            className="text-gray-300 text-sm hover:text-orange-400 transition-colors duration-200 block"
                          >
                            {subcat}
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
        <div className="fixed inset-0 z-40 bg-black/50 hidden md:block lg:hidden animate-in fade-in duration-300">
          <div className="flex justify-start h-full">
            <div className="w-1/2 bg-black/90 backdrop-blur-sm h-full pt-16 px-6 animate-in slide-in-from-left-4 duration-300">
              <div className="space-y-6">
                {mobileMenuItems.map((item, index) => (
                  <div key={item.name}>
                    <div 
                      className="flex items-center justify-between py-3 border-b border-gray-800 animate-in slide-in-from-left-4 duration-300"
                      style={{ animationDelay: `${(index + 1) * 100}ms` }}
                    >
                      <a href={item.href} className="text-white text-xl hover:text-orange-400 transition-colors duration-200">
                        {item.name}
                      </a>
                      {item.hasSubs && (
                        <button 
                          onClick={() => toggleCategory(item.name)}
                          className="text-white text-2xl hover:text-orange-400 transition-colors duration-200"
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
                              className="text-gray-300 text-sm hover:text-orange-400 transition-colors duration-200 block"
                            >
                              {subcat}
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
