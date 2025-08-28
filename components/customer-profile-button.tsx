// ✅ COMPONENTE DE BOTÃO DE PERFIL DO CUSTOMER PARA NAVBAR
"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useCustomerAuth } from '@/hooks/use-customer-auth'

export function CustomerProfileButton({ isDarkBackground = false }: { isDarkBackground?: boolean }) {
  const { isLoggedIn, isLoading, customer, logout } = useCustomerAuth()
  const [showDropdown, setShowDropdown] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [displayText, setDisplayText] = useState("")

  // ✅ ANIMAÇÃO DE DIGITAÇÃO (igual ao IconWithTooltip original)
  useEffect(() => {
    if (isHovered) {
      const textToShow = isLoggedIn && customer 
        ? customer.name.split(' ')[0] 
        : "Entrar"
      
      let currentIndex = 0
      const typingInterval = setInterval(() => {
        if (currentIndex <= textToShow.length) {
          setDisplayText(textToShow.slice(0, currentIndex))
          currentIndex++
        } else {
          clearInterval(typingInterval)
        }
      }, 50)

      return () => clearInterval(typingInterval)
    } else {
      setDisplayText("")
    }
  }, [isHovered, isLoggedIn, customer])

  // ✅ SE ESTÁ CARREGANDO, MOSTRAR SKELETON
  if (isLoading) {
    return (
      <div className="animate-pulse">
        <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
      </div>
    )
  }

  // ✅ SE NÃO ESTÁ LOGADO, MOSTRAR BOTÃO DE LOGIN COM ANIMAÇÃO
  if (!isLoggedIn) {
    return (
      <div
        className="flex items-center relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Link href="/login" className="flex items-center group">
          <svg
            width={28}
            height={28}
            className={`cursor-pointer transition-all duration-500 ease-out group-hover:scale-110 ${
              isDarkBackground ? 'text-white' : 'text-black'
            }`}
            viewBox="0 0 100 100"
            style={{ 
              filter: isDarkBackground ? 'brightness(0) invert(1)' : 'none'
            }}
          >
            <image href="/icons/login icon.svg" width="100" height="100" />
          </svg>
          
          <span
            className={`ml-3 text-sm font-medium transition-all duration-500 ease-out whitespace-nowrap cursor-pointer ${
              isHovered ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
            } ${isDarkBackground ? 'text-white' : 'text-black'}`}
            style={{ 
              minWidth: isHovered ? "auto" : "0", 
              overflow: "hidden",
              transform: isHovered ? "translateX(0)" : "translateX(-16px)",
              transition: "all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
            }}
          >
            {displayText}
          </span>
        </Link>
      </div>
    )
  }

  // ✅ SE ESTÁ LOGADO, MOSTRAR BOTÃO COM PRIMEIRO NOME E ANIMAÇÃO
  return (
    <div className="relative">
      <div
        className="flex items-center relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <button 
          className="flex items-center group"
          onClick={() => setShowDropdown(!showDropdown)}
        >
          <svg
            width={28}
            height={28}
            className={`cursor-pointer transition-all duration-500 ease-out group-hover:scale-110 ${
              isDarkBackground ? 'text-white' : 'text-black'
            }`}
            viewBox="0 0 100 100"
            style={{ 
              filter: isDarkBackground ? 'brightness(0) invert(1)' : 'none'
            }}
          >
            <image href="/icons/login icon.svg" width="100" height="100" />
          </svg>
          
          <span
            className={`ml-3 text-sm font-medium transition-all duration-500 ease-out whitespace-nowrap cursor-pointer ${
              isHovered ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
            } ${isDarkBackground ? 'text-white' : 'text-black'}`}
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
      </div>

      {/* ✅ DROPDOWN COM OPÇÕES */}
      {showDropdown && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          <div className="py-2">
            {/* ✅ CABEÇALHO COM INFORMAÇÕES DO CUSTOMER */}
            <div className="px-4 py-3 border-b border-gray-100">
              <p className="text-sm font-medium text-gray-900">
                {customer?.name || 'Cliente'}
              </p>
              <p className="text-xs text-gray-500">
                {customer?.email || 'email@exemplo.com'}
              </p>
            </div>

            {/* ✅ OPÇÕES DO MENU */}
            <div className="py-1">
              <Link href="/perfil">
                <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Minha Conta
                </button>
              </Link>
              
              <Link href="/pedidos">
                <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  Meus Pedidos
                </button>
              </Link>
              
              <Link href="/enderecos">
                <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Meus Endereços
                </button>
              </Link>
            </div>

            {/* ✅ BOTÃO DE LOGOUT */}
            <div className="border-t border-gray-100 pt-1">
              <button
                onClick={() => {
                  logout()
                  setShowDropdown(false)
                }}
                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Sair
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ✅ OVERLAY PARA FECHAR DROPDOWN */}
      {showDropdown && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowDropdown(false)}
        />
      )}
    </div>
  )
}

// ✅ COMPONENTE SIMPLES APENAS COM PRIMEIRO NOME (para usar no navbar)
export function CustomerNameDisplay() {
  const { isLoggedIn, isLoading, customer } = useCustomerAuth()

  if (isLoading || !isLoggedIn) {
    return null
  }

  return (
    <span className="text-sm font-medium text-gray-900">
      Olá, {customer?.name?.split(' ')[0] || 'Cliente'}!
    </span>
  )
}

// ✅ COMPONENTE PARA CHECKOUT (carrega dados automaticamente)
export function CheckoutDataLoader() {
  const { isLoggedIn, customer, getDefaultAddress } = useCustomerAuth()

  // ✅ SE ESTÁ LOGADO, PREENCHER DADOS AUTOMATICAMENTE
  useEffect(() => {
    if (isLoggedIn && customer) {
      const defaultAddress = getDefaultAddress()
      
      if (defaultAddress) {
        // ✅ PREENCHER FORMULÁRIO DE ENTREGA
        console.log('✅ Preenchendo dados de entrega automaticamente:', defaultAddress)
        
        // Exemplo de como preencher campos:
        // document.getElementById('shipping-street').value = defaultAddress.street
        // document.getElementById('shipping-number').value = defaultAddress.number
        // document.getElementById('shipping-neighborhood').value = defaultAddress.neighborhood
        // document.getElementById('shipping-city').value = defaultAddress.city
        // document.getElementById('shipping-state').value = defaultAddress.state
        // document.getElementById('shipping-zipcode').value = defaultAddress.zipCode
      }
      
      // ✅ PREENCHER DADOS DE FATURAMENTO
      console.log('✅ Preenchendo dados de faturamento:', customer)
      
      // Exemplo de como preencher campos:
      // document.getElementById('billing-name').value = customer.name
      // document.getElementById('billing-email').value = customer.email
      // document.getElementById('billing-phone').value = customer.phone
      // document.getElementById('billing-cpf').value = customer.cpf
    }
  }, [isLoggedIn, customer, getDefaultAddress])

  return null // Componente invisível, apenas para carregar dados
}
