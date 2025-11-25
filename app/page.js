'use client'

import { useState, useEffect, createContext, useContext } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  ShoppingCart,
  Search,
  Menu,
  X,
  ChevronRight,
  Star,
  Trash2,
  Plus,
  Minus
} from 'lucide-react'

/*
  ============================
  CONFIG
  ============================
  - logoUrl: kendi logo dosyan ile değiştir
  - themeColor / header / accent: istenen lacivert / açık mavi / bej tonları
*/

const logoUrl = "logo.png" ;
const theme = {
  headerDark: '#0B1C4A',     // üst bar lacivert
  headerLight: '#E6F3FA',    // üst arka plan açık mavi
  pageBg: '#F8FAFF',         // sayfa arka planı
  footerBg: '#FFF7F2',       // footer bej
  accent: '#132C75',         // accent lacivert
  textPrimary: '#111827'
}

/*
  ============================
  MOCK DATA (senin verdiğinle aynı)
  ============================
*/

const PRODUCTS = [
  {
    id: 1,
    name: 'Fenerbahçe 2024/25 İÇ SAHA FORMASI',
    category: 'Spor',
    price: 349.99,
    description: 'Fenerbahçe S.K. 24/25 iç saha forması, spor tutkunlarının beklentilerini karşılamak üzere tasarlanmış bir üründür. Yüksek kaliteli kumaş yapısı, oyuncuların performansını artırmak için optimum konfor ve hareket serbestliği sunar. Formanın hafif ve nefes alabilir özellikleri, yoğun maç temposunda dahi serin kalmayı sağlar.',
    image: 'FB.png', 
    featured: true,
    rating: 4.5
  },
  {
    id: 2,
    name: 'Galatasaray 2024/2025 İÇ SAHA PARÇALI FORMASI',
    category: 'Spor',
    price: 349.99,
    description: 'Galatasaray Puma 2024/2025 iç saha parçalı forması, spor tutkunlarının beklentilerini karşılamak üzere tasarlanmış bir üründür. Yüksek kaliteli kumaş yapısı, oyuncuların performansını artırmak için optimum konfor ve hareket serbestliği sunar. Formanın hafif ve nefes alabilir özellikleri, yoğun maç temposunda dahi serin kalmayı sağlar.',
    image: 'GS.png',
    featured: true,
    rating: 4.7
  },
  {
    id: 3,
    name: 'Beşiktaş 2024/25 İÇ SAHA FORMASI  ',
    category: 'Spor',
    price: 349.99,
    description: 'ADİDAS BEŞİKTAŞ FORMA K.K. 24-25 iç saha forması, spor tutkunlarının beklentilerini karşılamak üzere tasarlanmış bir üründür. Yüksek kaliteli kumaş yapısı, oyuncuların performansını artırmak için optimum konfor ve hareket serbestliği sunar. Formanın hafif ve nefes alabilir özellikleri, yoğun maç temposunda dahi serin kalmayı sağlar.',
    image: 'bjk.png',
    featured: true,
    rating: 4.4
  },
  // {
  //   id: 4,
  //   name: 'Running Shoes',
  //   category: 'Spor',
  //   price: 129.99,
  //   description: 'Lightweight running shoes with superior cushioning and support.',
  //   image: 'https://via.placeholder.com/400x400/1a1a1a/ffffff?text=Running+Shoes',
  //   featured: false,
  //   rating: 4.6
  // },
  // {
  //   id: 5,
  //   name: 'Coffee Maker',
  //   category: 'Ev&Yaşam',
  //   price: 89.99,
  //   description: 'Programmable coffee maker with thermal carafe and auto-brew feature.',
  //   image: 'https://via.placeholder.com/400x400/1a1a1a/ffffff?text=Coffee+Maker',
  //   featured: false,
  //   rating: 4.4
  // },
  // {
  //   id: 6,
  //   name: 'Laptop Backpack',
  //   category: 'Giyim',
  //   price: 79.99,
  //   description: 'Water-resistant laptop backpack with multiple compartments.',
  //   image: 'https://via.placeholder.com/400x400/1a1a1a/ffffff?text=Backpack',
  //   featured: false,
  //   rating: 4.2
  // },
  // {
  //   id: 7,
  //   name: '4K Monitor',
  //   category: 'Elektronik',
  //   price: 449.99,
  //   description: '27-inch 4K UHD monitor with HDR support and slim bezels.',
  //   image: 'https://via.placeholder.com/400x400/1a1a1a/ffffff?text=4K+Monitor',
  //   featured: true,
  //   rating: 4.8
  // },
  // {
  //   id: 8,
  //   name: 'Yoga Mat',
  //   category: 'Spor',
  //   price: 39.99,
  //   description: 'Extra-thick non-slip yoga mat with carrying strap.',
  //   image: 'https://via.placeholder.com/400x400/1a1a1a/ffffff?text=Yoga+Mat',
  //   featured: false,
  //   rating: 4.5
  // },
  // {
  //   id: 9,
  //   name: 'Desk Lamp',
  //   category: 'Ev&Yaşam',
  //   price: 59.99,
  //   description: 'LED desk lamp with adjustable brightness and color temperature.',
  //   image: 'https://via.placeholder.com/400x400/1a1a1a/ffffff?text=Desk+Lamp',
  //   featured: false,
  //   rating: 4.1
  // },
  // {
  //   id: 10,
  //   name: 'Wireless Mouse',
  //   category: 'Elektronik',
  //   price: 49.99,
  //   description: 'Ergonomic wireless mouse with precision tracking.',
  //   image: 'https://via.placeholder.com/400x400/1a1a1a/ffffff?text=Mouse',
  //   featured: false,
  //   rating: 4.3
  // },
  // {
  //   id: 11,
  //   name: 'Denim Jeans',
  //   category: 'Giyim',
  //   price: 89.99,
  //   description: 'Classic fit denim jeans with stretch comfort.',
  //   image: 'https://via.placeholder.com/400x400/1a1a1a/ffffff?text=Jeans',
  //   featured: false,
  //   rating: 4.4
  // },
  // {
  //   id: 12,
  //   name: 'Dumbbells Set',
  //   category: 'Spor',
  //   price: 149.99,
  //   description: 'Adjustable dumbbells set with storage rack.',
  //   image: 'https://via.placeholder.com/400x400/1a1a1a/ffffff?text=Dumbbells',
  //   featured: false,
  //   rating: 4.7
  // }
]

const CATEGORIES = ['Tümü', 'Elektronik', 'Giyim', 'Ev&Yaşam', 'Spor', 'Hayvanlar', 'Kitap', 'Diğer'];

/*
  ============================
  CART CONTEXT
  ============================
*/

const CartContext = createContext()

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart must be used within CartProvider')
  return context
}

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([])

  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('cart')
      if (savedCart) setCart(JSON.parse(savedCart))
    } catch (e) {
      // ignore malformed
    }
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem('cart', JSON.stringify(cart))
    } catch (e) {
      // ignore
    }
  }, [cart])

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id)
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      }
      return [...prev, { ...product, quantity: 1 }]
    })
  }

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.id !== productId))
  }

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }
    setCart((prev) => prev.map((item) => (item.id === productId ? { ...item, quantity } : item)))
  }

  const clearCart = () => setCart([])

  const cartCount = cart.reduce((sum, item) => sum + (item.quantity || 0), 0)
  const cartTotal = cart.reduce((sum, item) => sum + (item.price * (item.quantity || 0)), 0)

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, cartCount, cartTotal }}
    >
      {children}
    </CartContext.Provider>
  )
}

/*
  ============================
  NAVIGATION
  - renkler güncellendi
  - tüm metinler Türkçe
  ============================
*/

const Navigation = ({ currentPage, setCurrentPage }) => {
  const { cartCount } = useCart()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navLinks = [
    { name: 'Anasayfa', page: 'home' },
    { name: 'Ürünler', page: 'products' },
    { name: 'Hakkımızda', page: 'about' },
    { name: 'İletişim', page: 'contact' }
  ]

  return (
    <nav className="sticky top-0 z-50" style={{ background: theme.headerLight }}>
      <div className="container mx-auto px-4">
        <div
          className="flex items-center justify-between h-16"
          style={{ borderBottom: `4px solid ${theme.headerDark}` }}
        >
          <div className="flex items-center cursor-pointer" onClick={() => setCurrentPage('home')}>
            <div className="h-12 w-12 rounded-md bg-white flex items-center justify-center overflow-hidden">
              {/* logo küçük versiyon */}
              <img src={logoUrl} alt="GLORİES Logo" className="h-300 w-auto object-contain" />
            </div>
            <span className="ml-3 text-2xl font-bold" style={{ color: theme.textPrimary }}>
              GLORİES
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.page}
                onClick={() => setCurrentPage(link.page)}
                className={`text-sm font-medium transition-colors ${
                  currentPage === link.page ? 'text-black' : 'text-gray-600 hover:text-black'
                }`}
              >
                {link.name}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage('cart')}
              className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 bg-white">
            {navLinks.map((link) => (
              <button
                key={link.page}
                onClick={() => {
                  setCurrentPage(link.page)
                  setMobileMenuOpen(false)
                }}
                className={`block w-full text-left px-4 py-2 text-sm font-medium ${
                  currentPage === link.page ? 'text-black bg-gray-100' : 'text-gray-600'
                }`}
              >
                {link.name}
              </button>
            ))}
            <button
              onClick={() => {
                setCurrentPage('cart')
                setMobileMenuOpen(false)
              }}
              className="block w-full text-left px-4 py-2 text-sm font-medium text-gray-600 flex items-center justify-between"
            >
              Sepet
              {cartCount > 0 && (
                <span className="bg-black text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        )}
      </div>
    </nav>
  )
}

/*
  ============================
  FOOTER
  - bağlantılar korunuyor (dokunulmadı),
  - renkler bej / koyu lacivert tonuna çekildi
  ============================
*/

const Footer = () => {
  return (
    <footer className="mt-16" style={{ background: theme.footerBg }}>
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-gray-700">
          <div>
            <div className="flex items-center mb-4">
              <div className="h-10 w-10 bg-white rounded-md flex items-center justify-center overflow-hidden">
                <img src={logoUrl} alt="GLORİES Logo" className="h-2007 w- object-contain" />
              </div>
              <span className="ml-2 text-xl font-bold">GLORİES</span>
            </div>
            <p className="text-sm">Kalite ve güvenli alışverişin adresi</p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Alışveriş</h3>
            <ul className="space-y-2 text-sm">
              <li>Elektronik</li>
              <li>Giyim</li>
              <li>Ev&Yaşam</li>
              <li>Spor</li>
              <li>Hayvanlar</li>
              <li>Kitap</li>
              <li>Diğer</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Müşteri Hizmetleri</h3>
            <ul className="space-y-2 text-sm">
              <li>İletişim</li>
              <li>Kargo</li>
              <li>İade</li>
              <li>Yardım</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Bağlantılarımız</h3>
            <ul className="space-y-2 text-sm">
              <li>Facebook</li>
              <li>Instagram</li>
              <li>Shopier</li>
              <li>Trendyol</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-8 text-center text-sm text-gray-500">
          <p>&copy; 2025 GLORİES. Tüm Hakları Saklıdır.</p>
        </div>
      </div>
    </footer>
  )
}

/*
  ============================
  PRODUCT CARD
  ============================
*/

const ProductCard = ({ product, onClick }) => {
  const { addToCart } = useCart()

  const handleAddToCart = (e) => {
    e.stopPropagation()
    addToCart(product)
  }

  return (
    <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={onClick}>
      <CardContent className="p-0">
        <div className="aspect-square bg-gray-100 overflow-hidden">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        </div>
        <div className="p-4">
          <div className="text-xs text-gray-500 mb-1">{product.category}</div>
          <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
          <div className="flex items-center mb-2">
            <Star className="h-4 w-4 fill-black text-black" />
            <span className="ml-1 text-sm text-gray-600">{product.rating}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold">₺{product.price}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button onClick={handleAddToCart} className="w-full bg-black hover:bg-gray-800">
          Sepete Ekle
        </Button>
      </CardFooter>
    </Card>
  )
}

/*
  ============================
  HOME PAGE
  - Öne çıkanlar ve kategoriler korunmuştur
  - Renkler güncellendi
  ============================
*/

const HomePage = ({ setCurrentPage, setSelectedProduct }) => {
  const featuredProducts = PRODUCTS.filter((p) => p.featured)

  return (
    <div>
      {/* Hero Section */}
      <section style={{ background: theme.headerDark }} className="text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Her Ürün Bir Hikâye, Her Hikâye GLORİES’de</h1>
            <p className="text-xl text-gray-200 mb-8">Senin hikâyene değer katacak ürünleri şimdi keşfet</p>
            <Button onClick={() => setCurrentPage('products')} size="lg" className="bg-white text-black hover:bg-gray-200">
              Almaya Başlayın <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">Öne Çıkan Ürünler</h2>
          <button onClick={() => setCurrentPage('products')} className="text-sm font-medium hover:underline flex items-center">
            Tümü <ChevronRight className="inline h-4 w-4 ml-2" />
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onClick={() => {
                setSelectedProduct(product)
                setCurrentPage('product-detail')
              }}
            />
          ))}
        </div>
      </section>

      {/* Categories Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Kategoriler</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {CATEGORIES.filter((cat) => cat !== 'Tüm Ürünler').map((category) => (
              <div
                key={category}
                onClick={() => setCurrentPage('products')}
                className="bg-white p-8 rounded-lg text-center cursor-pointer hover:shadow-md transition-shadow"
              >
                <h3 className="font-semibold text-lg">{category}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

/*
  ============================
  PRODUCTS PAGE
  - Arama ve kategori filtreleme korunur
  ============================
*/

const ProductsPage = ({ setCurrentPage, setSelectedProduct }) => {
  const [selectedCategory, setSelectedCategory] = useState('Tüm Ürünler')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredProducts = PRODUCTS.filter((product) => {
    const matchesCategory = selectedCategory === 'Tüm Ürünler' || product.category === selectedCategory
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Tüm Ürünler</h1>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="w-full md:w-64 flex-shrink-0">
          <div className="bg-white p-6 rounded-lg border border-gray-200 sticky top-20">
            <h3 className="font-semibold mb-4">Kategoriler</h3>
            <div className="space-y-2">
              {CATEGORIES.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`block w-full text-left px-3 py-2 rounded-md transition-colors ${
                    selectedCategory === category ? 'bg-black text-white' : 'hover:bg-gray-100'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="flex-1">
          {/* Search */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Aramaya başla..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Results */}
          <div className="mb-4 text-sm text-gray-600">{filteredProducts.length} ürün bulundu</div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onClick={() => {
                  setSelectedProduct(product)
                  setCurrentPage('product-detail')
                }}
              />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">Aradığınız kritere uygun ürün bulunamadı.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

/*
  ============================
  PRODUCT DETAIL PAGE
  - Tüm başlıklar ve metinler Türkçe
  ============================
*/

const ProductDetailPage = ({ product, setCurrentPage }) => {
  const { addToCart } = useCart()
  const [quantity, setQuantity] = useState(1)

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p>Ürün bulunamadı</p>
      </div>
    )
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product)
    }
  }

  const relatedProducts = PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4)

  return (
    <div className="container mx-auto px-4 py-8">
      <button onClick={() => setCurrentPage('products')} className="text-sm text-gray-600 hover:text-black mb-6">
        ← Ürünlere Geri Dön
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
        {/* Product Image */}
        <div className="bg-gray-100 rounded-lg overflow-hidden aspect-square">
          <img src= {product.image} alt={product.name} className="w-full h-full object-cover" />
        </div>

        {/* Product Info */}
        <div>
          <div className="text-sm text-gray-500 mb-2">{product.category}</div>
          <h1 className="text-4xl font-bold mb-4">{product.name}</h1>

          <div className="flex items-center mb-6">
            <Star className="h-5 w-5 fill-black text-black" />
            <span className="ml-2 text-lg">{product.rating}</span>
            <span className="ml-2 text-gray-500">(119 yorum)</span>
          </div>

          <div className="text-4xl font-bold mb-6">₺{product.price}</div>

          <p className="text-gray-700 mb-8 leading-relaxed">{product.description}</p>

          <div className="mb-6">
            <Label className="mb-2 block">Adet</Label>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="icon" onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                <Minus className="h-4 w-4" />
              </Button>
              <span className="text-xl font-semibold w-12 text-center">{quantity}</span>
              <Button variant="outline" size="icon" onClick={() => setQuantity(quantity + 1)}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <Button onClick={handleAddToCart} size="lg" className="w-full bg-black hover:bg-gray-800">
            Sepete Ekle
          </Button>

          <div className="mt-8 border-t border-gray-200 pt-8">
            <h3 className="font-semibold mb-4"></h3>
            <ul className="space-y-2 text-gray-700">
              <li>• 400₺ ve üzeri siparişlerde ücretsiz kargo</li>
              <li>• 15 gün iade garantisi</li>
              <li>• 1 yıl garanti</li>
              <li>• Güvenli ödeme</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section>
          <h2 className="text-3xl font-bold mb-8">Benzer Ürünler</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onClick={() => {
                  window.scrollTo(0, 0)
                  setCurrentPage('product-detail')
                }}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

/*
  ============================
  CART PAGE (Tamamlandı)
  - Sepet boş görünümü
  - Ürün miktarı arttırma/azaltma
  - Sepeti temizleme
  - Özet (TL)
  ============================
*/

const CartPage = ({ setCurrentPage }) => {
  const { cart, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart()

  if (!cart || cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <ShoppingCart className="h-24 w-24 text-gray-300 mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-4">Sepetiniz boş</h2>
        <p className="text-gray-600 mb-8">Başlamak için bir ürün ekleyin!</p>
        <div className="flex items-center justify-center gap-4">
          <Button onClick={() => setCurrentPage('products')} className="bg-black hover:bg-gray-800">
            Alışverişe Başla
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Alışveriş Sepeti</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="space-y-4">
            {cart.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-4">
                  <div className="flex gap-4 items-center">
                    <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-1">{item.name}</h3>
                      <p className="text-sm text-gray-500 mb-2">{item.category}</p>
                      <div className="flex items-center space-x-4">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.id, (item.quantity || 1) - 1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="font-semibold">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                        <span className="text-sm text-gray-600 ml-4">Birim: ₺{item.price}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-lg mb-2">₺{(item.price * item.quantity).toFixed(2)}</div>
                      <div className="flex justify-end gap-2 items-center">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex items-center justify-between mt-6">
            <Button variant="ghost" onClick={() => clearCart()} className="text-red-600">
              Sepeti Temizle
            </Button>
            <div className="text-right">
              <div className="text-sm text-gray-600">Ara Toplam: ₺{cartTotal.toFixed(2)}</div>
              <div className="font-bold text-xl">Toplam: ₺{(cartTotal * 1.08).toFixed(2)}</div>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div>
          <Card className="sticky top-20">
            <CardContent className="p-6">
              <h3 className="font-semibold text-lg mb-4">Sipariş Özeti</h3>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Ara Toplam</span>
                  <span>₺{cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Kargo</span>
                  <span>Ücretsiz</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Vergi (yakl.)</span>
                  <span>₺{(cartTotal * 0.08).toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between font-bold text-xl">
                    <span>Toplam</span>
                    <span>₺{(cartTotal * 1.08).toFixed(2)}</span>
                  </div>
                </div>
              </div>
              <Button onClick={() => setCurrentPage('checkout')} className="w-full bg-black hover:bg-gray-800">
                Ödemeye Geç
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

/*
  ============================
  CHECKOUT PAGE (Türkçe)
  ============================
*/

const CheckoutPage = ({ setCurrentPage }) => {
  const { cart, cartTotal, clearCart } = useCart()
  const [orderPlaced, setOrderPlaced] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setOrderPlaced(true)
    clearCart()
  }

  if (orderPlaced) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-md mx-auto">
          <div className="bg-green-100 text-green-700 p-4 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold mb-4">Siparişiniz Alındı!</h2>
          <p className="text-gray-600 mb-8">Siparişiniz başarılı şekilde iletildi. E-posta ile onay alacaksınız.</p>
          <Button onClick={() => setCurrentPage('home')} className="bg-black hover:bg-gray-800">
            Alışverişe Devam Et
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Ödeme</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit}>
            {/* Shipping Information */}
            <Card className="mb-6">
              <CardContent className="p-6">
                <h3 className="font-semibold text-xl mb-6">Teslimat Bilgileri</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">Ad</Label>
                    <Input id="firstName" required />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Soyad</Label>
                    <Input id="lastName" required />
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor="email">E-posta</Label>
                    <Input id="email" type="email" required />
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor="address">Adres</Label>
                    <Input id="address" required />
                  </div>
                  <div>
                    <Label htmlFor="city">Şehir</Label>
                    <Input id="city" required />
                  </div>
                  <div>
                    <Label htmlFor="zip">Posta Kodu</Label>
                    <Input id="zip" required />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Information */}
            <Card className="mb-6">
              <CardContent className="p-6">
                <h3 className="font-semibold text-xl mb-6">Ödeme Bilgileri</h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="cardNumber">Kart Numarası</Label>
                    <Input id="cardNumber" placeholder="1234 5678 9012 3456" required />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="expiry">Son Kullanma</Label>
                      <Input id="expiry" placeholder="MM/YY" required />
                    </div>
                    <div>
                      <Label htmlFor="cvv">CVV</Label>
                      <Input id="cvv" placeholder="123" required />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Button type="submit" className="w-full bg-black hover:bg-gray-800" size="lg">
              Siparişi Tamamla
            </Button>
          </form>
        </div>

        {/* Order Summary */}
        <div>
          <Card className="sticky top-20">
            <CardContent className="p-6">
              <h3 className="font-semibold text-lg mb-4">Sipariş Özeti</h3>
              <div className="space-y-3 mb-6">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-gray-600">
                      {item.name} x {item.quantity}
                    </span>
                    <span>₺{(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
                <div className="border-t border-gray-200 pt-3 mt-3">
                  <div className="flex justify-between text-gray-600 mb-2">
                    <span>Ara Toplam</span>
                    <span>₺{cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600 mb-2">
                    <span>Kargo</span>
                    <span>Ücretsiz</span>
                  </div>
                  <div className="flex justify-between text-gray-600 mb-2">
                    <span>Vergi</span>
                    <span>₺{(cartTotal * 0.08).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-xl mt-3">
                    <span>Toplam</span>
                    <span>₺{(cartTotal * 1.08).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

/*
  ============================
  ABOUT PAGE
  - Senin verdiğin içerik korunmuştur (sadece biçim ve dil uyumu sağlandı)
  ============================
*/

const AboutPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">GLORİES Hakkında</h1>

        <div className="space-y-6 text-gray-700 leading-relaxed">
          <p className="text-lg">
            Her ürünün bir hikâyesi olduğuna inanıyoruz. GLORİES, sadece alışveriş yapılan bir platform değil;
            kalite, güven ve deneyimin birleştiği bir yaşam alanıdır. Kurulduğumuz günden bu yana,
            müşterilerimize güvenilir, hızlı ve keyifli bir alışveriş deneyimi sunmayı hedefledik.
            Her kategori, özenle seçilmiş ürünlerle dolu; çünkü biz, her alışverişin küçük bir mutluluk anı olduğuna inanıyoruz.
          </p>

          <h2 className="text-2xl font-bold text-black mt-8 mb-4">Misyonumuz</h2>
          <p>
            GLORİES olarak misyonumuz, müşterilerimize yüksek kaliteli ürünleri en uygun fiyatlarla,
            en güvenli şekilde sunmaktır. Alışverişi sadece bir ihtiyaç değil, aynı zamanda keyifli bir deneyim hâline getirmek için çalışıyoruz.
            Her gün daha iyiye ulaşmak, yenilikçi çözümler geliştirmek ve müşteri memnuniyetini en üst seviyede tutmak temel hedefimizdir.
          </p>

          <h2 className="text-2xl font-bold text-black mt-8 mb-4">Neden Bizi Tercih Etmelisiniz</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>Geniş ve sürekli güncellenen ürün yelpazesi</li>
            <li>Uygun fiyat politikası</li>
            <li>Hızlı ve güvenilir kargo hizmeti</li>
            <li>7/24 müşteri desteği</li>
            <li>Kolay iade ve değişim politikası</li>
            <li>Müşteri memnuniyetine öncelik veren yaklaşım</li>
          </ul>

          <h2 className="text-2xl font-bold text-black mt-8 mb-4">Değerlerimiz</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>Güven: Tüm işlemlerimizde şeffaflık ve güvenilirlik esastır.</li>
            <li>Kalite: Her ürün, belirli kalite standartlarını karşılamak zorundadır.</li>
            <li>Yenilikçilik: Sürekli gelişen teknolojiyi müşterilerimizin lehine kullanırız.</li>
            <li>Müşteri Odaklılık: Her kararımızda müşterilerimizin memnuniyetini merkezde tutarız.</li>
            <li>Sürdürülebilirlik: Doğaya ve topluma duyarlı bir alışveriş kültürü hedefleriz.</li>
          </ul>

          <div className="bg-gray-50 p-8 rounded-lg mt-8">
            <p className="text-center text-lg">
              "GLORİES'den alışveriş yapmak, sadece ürün satın almak değil, aynı zamanda değerlerimize ve özelliklerimize sahip olmaktır.
              Ürünlerinizi ücretsiz ve hızlı bir şekilde satın almak için çok önemli bir şeydir."
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

/*
  ============================
  CONTACT PAGE
  - Metinler Türkçe, form korundu
  ============================
*/

const ContactPage = () => {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-md mx-auto">
          <h2 className="text-3xl font-bold mb-4">Mesajınız Gönderildi!</h2>
          <p className="text-gray-600 mb-8">İletişiminiz için teşekkürler. En kısa sürede size dönüş yapılacaktır.</p>
          <Button onClick={() => setSubmitted(false)} className="bg-black hover:bg-gray-800">
            Yeni Mesaj Gönder
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Bize Ulaşın</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold text-lg mb-4">Müşteri Hizmetleri</h3>
              <p className="text-gray-600 mb-2">Email: glories@gmail.com</p>
              <p className="text-gray-600 mb-2">Telefon: +905060242272</p>
              <p className="text-gray-600">Saat: 09.00 - 21.00</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold text-lg mb-4">Adres</h3>
              <p className="text-gray-600">İstanbul, Türkiye</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardContent className="p-6">
            <h3 className="font-semibold text-xl mb-6">Mesaj Gönder</h3>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="contactName">Ad Soyad</Label>
                    <Input id="contactName" required />
                  </div>
                  <div>
                    <Label htmlFor="contactEmail">E-posta</Label>
                    <Input id="contactEmail" type="email" required />
                  </div>
                </div>
                <div>
                  <Label htmlFor="subject">Konu</Label>
                  <Input id="subject" required />
                </div>
                <div>
                  <Label htmlFor="message">Açıklama</Label>
                  <textarea
                    id="message"
                    required
                    className="w-full min-h-[150px] px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>
                <Button type="submit" className="w-full bg-black hover:bg-gray-800">
                  Mesajı Gönder
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

/*
  ============================
  APP (Main)
  - renderPage switch korunur
  ============================
*/

export default function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [selectedProduct, setSelectedProduct] = useState(null)

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage setCurrentPage={setCurrentPage} setSelectedProduct={setSelectedProduct} />
      case 'products':
        return <ProductsPage setCurrentPage={setCurrentPage} setSelectedProduct={setSelectedProduct} />
      case 'product-detail':
        return <ProductDetailPage product={selectedProduct} setCurrentPage={setCurrentPage} />
      case 'cart':
        return <CartPage setCurrentPage={setCurrentPage} />
      case 'checkout':
        return <CheckoutPage setCurrentPage={setCurrentPage} />
      case 'about':
        return <AboutPage />
      case 'contact':
        return <ContactPage />
      default:
        return <HomePage setCurrentPage={setCurrentPage} setSelectedProduct={setSelectedProduct} />
    }
  }

  return (
    <CartProvider>
      <div style={{ background: theme.pageBg }} className="min-h-screen flex flex-col">
        <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />
        <main className="flex-1">{renderPage()}</main>
        <Footer />
      </div>
    </CartProvider>
  )
}
