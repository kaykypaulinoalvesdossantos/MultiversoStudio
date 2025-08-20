"use client"

import { use, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Star,
  Heart,
  Share2,
  ShoppingCart,
  Plus,
  Minus,
  Truck,
  Shield,
  RotateCcw,
  MessageCircle,
  ArrowLeft,
} from "lucide-react"
import { Navbar } from "@/components/navbar"
import Footer from "@/components/footer"

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const [selectedSize, setSelectedSize] = useState("")
  const [selectedColor, setSelectedColor] = useState("")
  const [selectedType, setSelectedType] = useState("")
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)

  // Mock product data - in real app, fetch based on id
  const product = {
    id,
    name: "Camiseta Cafézini Garganttinni - Edição Limitada",
    price: 79.9,
    originalPrice: 99.9,
    images: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
    store: "Sacocheio.tv",
    rating: 4.8,
    reviews: 234,
    sales: 856,
    badge: "Lançamento",
    badgeColor: "bg-amber-500",
    discount: "20% OFF",
    freeShipping: true,
    description:
      "Camiseta exclusiva da coleção Cafézini, feita em 100% algodão premium. Design único que combina humor e qualidade em uma peça confortável e estilosa.",
    features: [
      "100% Algodão Premium",
      "Estampa de alta qualidade",
      "Corte moderno e confortável",
      "Resistente a lavagem",
      "Edição limitada",
    ],
    sizes: ["PP", "P", "M", "G", "GG", "XG", "EXG"],
    types: ["Regular", "Oversized", "Babylook", "Infantil"],
    colors: [
      { name: "Preto", value: "#000000" },
      { name: "Branco", value: "#FFFFFF" },
      { name: "Cinza", value: "#808080" },
      { name: "Azul", value: "#0066CC" },
    ],
    specifications: {
      material: "100% Algodão",
      weight: "180g/m²",
      origin: "Brasil",
      care: "Lavar à máquina até 40°C",
    },
  }

  const relatedProducts = [
    {
      id: 2,
      name: "Caneca Cafézini Premium",
      price: 45.9,
      originalPrice: 55.9,
      image: "/placeholder.svg?height=300&width=300",
      store: "Sacocheio.tv",
      rating: 4.9,
      badge: "Best Seller",
      badgeColor: "bg-green-500",
    },
    {
      id: 3,
      name: "Kit Cafézini Completo",
      price: 119.9,
      originalPrice: 149.9,
      image: "/placeholder.svg?height=300&width=300",
      store: "Sacocheio.tv",
      rating: 4.8,
      badge: "Kit",
      badgeColor: "bg-blue-500",
    },
    {
      id: 4,
      name: "Moletom Cafézini",
      price: 159.9,
      image: "/placeholder.svg?height=300&width=300",
      store: "Sacocheio.tv",
      rating: 4.7,
      badge: "Novo",
      badgeColor: "bg-purple-500",
    },
  ]

  const handleAddToCart = () => {
    console.log("Added to cart:", {
      product,
      size: selectedSize,
      color: selectedColor,
      type: selectedType,
      quantity,
    })
    alert("Produto adicionado ao carrinho!")
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4 pt-20">
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-gray-600 hover:text-gray-900">
              Início
            </Link>
            <span className="text-gray-400">/</span>
            <Link href={`/loja/${product.store.toLowerCase()}`} className="text-gray-600 hover:text-gray-900">
              {product.store}
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Button
            variant="ghost"
            className="text-gray-600 hover:text-gray-900 p-0"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square overflow-hidden bg-gray-50 rounded-lg">
              <Image
                src={product.images[selectedImage] || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute top-4 left-4 flex flex-col space-y-2">
                <Badge className={`${product.badgeColor} text-white`}>{product.badge}</Badge>
                {product.discount && <Badge className="bg-green-500 text-white">{product.discount}</Badge>}
                {product.freeShipping && <Badge className="bg-blue-500 text-white">Frete Grátis</Badge>}
              </div>
            </div>

            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  className={`relative aspect-square overflow-hidden bg-gray-50 rounded-lg border-2 transition-colors ${
                    selectedImage === index ? "border-black" : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => setSelectedImage(index)}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${product.name} ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Header */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <Link
                  href={`/loja/${product.store.toLowerCase()}`}
                  className="text-amber-600 hover:text-amber-700 font-medium"
                >
                  {product.store}
                </Link>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="icon" className="text-gray-600 hover:text-red-500">
                    <Heart className="w-5 h-5" />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-gray-600 hover:text-blue-500">
                    <Share2 className="w-5 h-5" />
                  </Button>
                </div>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold mb-4">{product.name}</h1>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-1">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{product.rating}</span>
                  <span className="text-gray-600">({product.reviews} avaliações)</span>
                </div>
                <span className="text-gray-600">{product.sales} vendidos</span>
              </div>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <span className="text-3xl font-bold">R$ {product.price.toFixed(2)}</span>
                {product.originalPrice && (
                  <span className="text-xl text-gray-500 line-through">R$ {product.originalPrice.toFixed(2)}</span>
                )}
              </div>
              {product.originalPrice && (
                <p className="text-green-600 font-semibold">
                  Economia de R$ {(product.originalPrice - product.price).toFixed(2)} ({product.discount})
                </p>
              )}
            </div>

            {/* Type Selection */}
            <div>
              <Label className="text-base font-semibold mb-3 block">Tipo</Label>
              <RadioGroup value={selectedType} onValueChange={setSelectedType}>
                <div className="grid grid-cols-2 gap-2">
                  {product.types.map((type) => (
                    <div key={type} className="relative">
                      <RadioGroupItem value={type} id={type} className="sr-only" />
                      <Label
                        htmlFor={type}
                        className={`block p-3 border-2 rounded-lg cursor-pointer text-center transition-colors ${
                          selectedType === type
                            ? "border-black bg-black text-white"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        {type}
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </div>

            {/* Size Selection */}
            <div>
              <Label className="text-base font-semibold mb-3 block">Tamanho</Label>
              <RadioGroup value={selectedSize} onValueChange={setSelectedSize}>
                <div className="grid grid-cols-4 gap-2">
                  {product.sizes.map((size) => (
                    <div key={size} className="relative">
                      <RadioGroupItem value={size} id={size} className="sr-only" />
                      <Label
                        htmlFor={size}
                        className={`block p-3 border-2 rounded-lg cursor-pointer text-center transition-colors ${
                          selectedSize === size
                            ? "border-black bg-black text-white"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        {size}
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </div>

            {/* Color Selection */}
            <div>
              <Label className="text-base font-semibold mb-3 block">Cor</Label>
              <RadioGroup value={selectedColor} onValueChange={setSelectedColor}>
                <div className="grid grid-cols-2 gap-2">
                  {product.colors.map((color) => (
                    <div key={color.name} className="relative">
                      <RadioGroupItem value={color.name} id={color.name} className="sr-only" />
                      <Label
                        htmlFor={color.name}
                        className={`flex items-center space-x-3 p-3 border-2 rounded-lg cursor-pointer transition-colors ${
                          selectedColor === color.name
                            ? "border-black bg-gray-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <div
                          className="w-6 h-6 rounded-full border-2 border-gray-300"
                          style={{ backgroundColor: color.value }}
                        />
                        <span>{color.name}</span>
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </div>

            {/* Quantity */}
            <div>
              <Label className="text-base font-semibold mb-3 block">Quantidade</Label>
              <div className="flex items-center space-x-4">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="text-xl font-semibold w-12 text-center">{quantity}</span>
                <Button variant="outline" size="icon" onClick={() => setQuantity(quantity + 1)}>
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Add to Cart */}
            <div className="space-y-4">
              <Button
                className="w-full bg-black hover:bg-gray-800 h-12 text-lg"
                onClick={handleAddToCart}
                disabled={!selectedSize || !selectedColor || !selectedType}
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Adicionar ao Carrinho - R$ {(product.price * quantity).toFixed(2)}
              </Button>
              <Button variant="outline" className="w-full h-12 text-lg bg-transparent">
                Comprar Agora
              </Button>
            </div>

            {/* Benefits */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t">
              <div className="flex items-center space-x-2">
                <Truck className="w-5 h-5 text-black" />
                <div>
                  <p className="font-semibold text-sm">Frete Grátis teste</p>
                  <p className="text-xs text-gray-600">Acima de R$ 99</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <RotateCcw className="w-5 h-5 text-black" />
                <div>
                  <p className="font-semibold text-sm">Troca Fácil</p>
                  <p className="text-xs text-gray-600">7 dias para trocar</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-black" />
                <div>
                  <p className="font-semibold text-sm">Compra Segura</p>
                  <p className="text-xs text-gray-600">100% protegida</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-12">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="description">Descrição</TabsTrigger>
              <TabsTrigger value="specifications">Especificações</TabsTrigger>
              <TabsTrigger value="reviews">Avaliações</TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <p className="text-gray-700 mb-4">{product.description}</p>
                  <h4 className="font-semibold mb-2">Características:</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-700">
                    {product.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="specifications" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <div key={key} className="flex justify-between py-2 border-b border-gray-100">
                        <span className="font-semibold capitalize">{key.replace(/([A-Z])/g, " $1")}:</span>
                        <span className="text-gray-700">{value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="reviews" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <div className="text-center py-8">
                    <Star className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Avaliações em breve</h3>
                    <p className="text-gray-600">As avaliações dos clientes aparecerão aqui</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-8">Produtos Relacionados</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <Link key={relatedProduct.id} href={`/produto/${relatedProduct.id}`}>
                <div className="group cursor-pointer">
                  <div className="relative aspect-square overflow-hidden bg-gray-50 mb-4 rounded-lg">
                    <Image
                      src={relatedProduct.image || "/placeholder.svg"}
                      alt={relatedProduct.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className={`${relatedProduct.badgeColor} text-white text-xs`}>
                        {relatedProduct.badge}
                      </Badge>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600">{relatedProduct.store}</p>
                    <h3 className="font-semibold line-clamp-2">{relatedProduct.name}</h3>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm text-gray-600">{relatedProduct.rating}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-bold">R$ {relatedProduct.price.toFixed(2)}</span>
                      {relatedProduct.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">
                          R$ {relatedProduct.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <Footer />

      {/* WhatsApp Float */}
      <div className="fixed bottom-6 right-6 z-40">
        <Button className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-green-500 hover:bg-green-600 shadow-lg hover:scale-105 transition-all">
          <MessageCircle className="w-6 h-6 md:w-8 md:h-8 text-white" />
        </Button>
      </div>
    </div>
  )
}
