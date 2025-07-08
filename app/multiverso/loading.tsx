export default function MultiversoLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
      {/* Header Skeleton */}
      <div className="bg-black text-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-8 bg-gray-700 rounded animate-pulse" />
              <div className="w-32 h-6 bg-gray-700 rounded animate-pulse" />
            </div>
            <div className="flex-1 max-w-2xl mx-8">
              <div className="h-10 bg-gray-700 rounded animate-pulse" />
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-20 h-8 bg-gray-700 rounded animate-pulse" />
              <div className="w-10 h-10 bg-gray-700 rounded-full animate-pulse" />
              <div className="w-20 h-8 bg-gray-700 rounded animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      {/* Store Header Skeleton */}
      <div className="h-80 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 relative">
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-white/20 rounded-full animate-pulse" />
                <div className="w-32 h-8 bg-white/20 rounded animate-pulse" />
              </div>
              <div className="w-96 h-16 bg-white/20 rounded animate-pulse" />
              <div className="w-80 h-6 bg-white/20 rounded animate-pulse" />
              <div className="w-full max-w-2xl h-6 bg-white/20 rounded animate-pulse" />
              <div className="flex space-x-6">
                <div className="w-32 h-6 bg-white/20 rounded animate-pulse" />
                <div className="w-32 h-6 bg-white/20 rounded animate-pulse" />
                <div className="w-32 h-6 bg-white/20 rounded animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="py-8">
        <div className="container mx-auto px-4">
          <div className="flex gap-8">
            {/* Sidebar Skeleton */}
            <div className="w-80 space-y-6">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="w-24 h-6 bg-gray-200 rounded animate-pulse mb-4" />
                <div className="space-y-3">
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className="flex justify-between items-center">
                      <div className="w-32 h-4 bg-gray-200 rounded animate-pulse" />
                      <div className="w-8 h-4 bg-gray-200 rounded animate-pulse" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Products Grid Skeleton */}
            <div className="flex-1">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <div className="w-48 h-8 bg-gray-200 rounded animate-pulse mb-2" />
                  <div className="w-32 h-4 bg-gray-200 rounded animate-pulse" />
                </div>
                <div className="flex space-x-4">
                  <div className="w-24 h-10 bg-gray-200 rounded animate-pulse" />
                  <div className="w-20 h-10 bg-gray-200 rounded animate-pulse" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(9)].map((_, i) => (
                  <div key={i} className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <div className="w-full h-64 bg-gray-200 animate-pulse" />
                    <div className="p-6 space-y-4">
                      <div className="w-full h-4 bg-gray-200 rounded animate-pulse" />
                      <div className="w-3/4 h-4 bg-gray-200 rounded animate-pulse" />
                      <div className="flex justify-between items-center">
                        <div className="w-20 h-6 bg-gray-200 rounded animate-pulse" />
                        <div className="w-16 h-8 bg-gray-200 rounded animate-pulse" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
