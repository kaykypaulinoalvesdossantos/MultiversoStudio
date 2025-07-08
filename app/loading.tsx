import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"

export default function Loading() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-amber-500 mx-auto mb-4"></div>
        <h2 className="text-xl font-semibold text-gray-900">Carregando...</h2>
        <p className="text-gray-600">Aguarde um momento</p>
      </div>

      {/* Header Skeleton */}
      <div className="bg-black h-20 animate-pulse mt-16" />

      {/* Hero Banner Skeleton */}
      <div className="relative h-[600px] bg-gray-200 mt-8">
        <Skeleton className="w-full h-full" />
        <div className="absolute bottom-8 left-8">
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 max-w-lg">
            <div className="flex space-x-2 mb-4">
              <Skeleton className="w-20 h-6" />
              <Skeleton className="w-24 h-6" />
            </div>
            <Skeleton className="w-80 h-8 mb-3" />
            <Skeleton className="w-64 h-6 mb-6" />
            <Skeleton className="w-32 h-10" />
          </div>
        </div>
      </div>

      {/* Benefits Skeleton */}
      <div className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex items-center space-x-4 bg-white p-6 rounded-xl">
                <Skeleton className="w-8 h-8 rounded-full" />
                <div>
                  <Skeleton className="w-20 h-5 mb-1" />
                  <Skeleton className="w-24 h-4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Products Grid Skeleton */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center space-x-4">
              <Skeleton className="w-12 h-12 rounded-full" />
              <div>
                <Skeleton className="w-48 h-8 mb-2" />
                <Skeleton className="w-64 h-6" />
              </div>
            </div>
            <Skeleton className="w-24 h-10" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(4)].map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <Skeleton className="aspect-square w-full" />
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <Skeleton className="w-20 h-5" />
                    <Skeleton className="w-16 h-5" />
                  </div>
                  <Skeleton className="w-full h-6 mb-3" />
                  <Skeleton className="w-full h-16 mb-4" />
                  <Skeleton className="w-full h-10" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Stores Skeleton */}
      <div className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Skeleton className="w-80 h-10 mx-auto mb-4" />
            <Skeleton className="w-96 h-6 mx-auto" />
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {[...Array(2)].map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <Skeleton className="h-80 w-full" />
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Skeleton className="w-15 h-15 rounded-full" />
                      <div>
                        <Skeleton className="w-32 h-6 mb-1" />
                        <Skeleton className="w-24 h-4" />
                      </div>
                    </div>
                    <Skeleton className="w-24 h-10" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Skeleton */}
      <div className="bg-gray-900 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <Skeleton className="w-12 h-8 bg-gray-700" />
                <div>
                  <Skeleton className="w-32 h-6 bg-gray-700 mb-1" />
                  <Skeleton className="w-24 h-4 bg-gray-700" />
                </div>
              </div>
              <Skeleton className="w-full h-20 bg-gray-700" />
            </div>
            {[...Array(3)].map((_, i) => (
              <div key={i}>
                <Skeleton className="w-24 h-6 bg-gray-700 mb-4" />
                <div className="space-y-2">
                  {[...Array(3)].map((_, j) => (
                    <Skeleton key={j} className="w-20 h-4 bg-gray-700" />
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-12 pt-8 border-t border-gray-800 text-center">
            <Skeleton className="w-64 h-4 bg-gray-700 mx-auto" />
          </div>
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="space-y-4">
              <div className="aspect-square bg-gray-200 rounded animate-pulse" />
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse" />
                <div className="h-6 bg-gray-200 rounded w-1/2 animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
