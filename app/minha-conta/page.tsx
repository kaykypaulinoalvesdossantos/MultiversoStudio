"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function MinhaContaPage() {
  const router = useRouter()

  useEffect(() => {
    router.replace("/perfil")
  }, [router])

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <p className="text-gray-600">Redirecionando para sua conta...</p>
      </div>
    </div>
  )
}
