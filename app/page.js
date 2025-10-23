'use client'

import { useState, useEffect, createContext, useContext } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ShoppingCart, Search, Menu, X, ChevronRight, Star, Trash2, Plus, Minus } from 'lucide-react'

// Mock Product Data
const PRODUCTS = [
  {
    id: 1,
    name: 'Wireless Headphones',
    category: 'Electronics',
    price: 199.99,
    description: 'Premium noise-cancelling wireless headphones with 30-hour battery life.',
    image: 'https://via.placeholder.com/400x400/1a1a1a/ffffff?text=Headphones',
    featured: true,
    rating: 4.5
  },
  {
    id: 2,
    name: 'Smart Watch',
    category: 'Electronics',
    price: 299.99,
    description: 'Advanced fitness tracking and notification features in a sleek design.',
    image: 'https://via.placeholder.com/400x400/1a1a1a/ffffff?text=Smart+Watch',
    featured: true,
    rating: 4.7
  },
  {
    id: 3,
    name: 'Leather Jacket',
    category: 'Fashion',
    price: 249.99,
    description: 'Classic genuine leather jacket with modern cut and premium finish.',
    image: 'https://via.placeholder.com/400x400/1a1a1a/ffffff?text=Leather+Jacket',
    featured: true,
    rating: 4.3
  },
  {
    id: 4,
    name: 'Running Shoes',
    category: 'Sports',
    price: 129.99,
    description: 'Lightweight running shoes with superior cushioning and support.',
    image: 'https://via.placeholder.com/400x400/1a1a1a/ffffff?text=Running+Shoes',
    featured: false,
    rating: 4.6
  },
  {
    id: 5,
    name: 'Coffee Maker',
    category: 'Home',
    price: 89.99,
    description: 'Programmable coffee maker with thermal carafe and auto-brew feature.',
    image: 'https://via.placeholder.com/400x400/1a1a1a/ffffff?text=Coffee+Maker',
    featured: false,
    rating: 4.4
  },
  {
    id: 6,
    name: 'Laptop Backpack',
    category: 'Fashion',
    price: 79.99,
    description: 'Water-resistant laptop backpack with multiple compartments.',
    image: 'https://via.placeholder.com/400x400/1a1a1a/ffffff?text=Backpack',
    featured: false,
    rating: 4.2
  },
  {
    id: 7,
    name: '4K Monitor',
    category: 'Electronics',
    price: 449.99,
    description: '27-inch 4K UHD monitor with HDR support and slim bezels.',
    image: 'https://via.placeholder.com/400x400/1a1a1a/ffffff?text=4K+Monitor',
    featured: true,
    rating: 4.8
  },
  {
    id: 8,
    name: 'Yoga Mat',
    category: 'Sports',
    price: 39.99,
    description: 'Extra-thick non-slip yoga mat with carrying strap.',
    image: 'https://via.placeholder.com/400x400/1a1a1a/ffffff?text=Yoga+Mat',
    featured: false,
    rating: 4.5
  },
  {
    id: 9,
    name: 'Desk Lamp',
    category: 'Home',
    price: 59.99,
    description: 'LED desk lamp with adjustable brightness and color temperature.',
    image: 'https://via.placeholder.com/400x400/1a1a1a/ffffff?text=Desk+Lamp',
    featured: false,
    rating: 4.1
  },
  {
    id: 10,
    name: 'Wireless Mouse',
    category: 'Electronics',
    price: 49.99,
    description: 'Ergonomic wireless mouse with precision tracking.',
    image: 'https://via.placeholder.com/400x400/1a1a1a/ffffff?text=Mouse',
    featured: false,
    rating: 4.3
  },
  {
    id: 11,
    name: 'Denim Jeans',
    category: 'Fashion',
    price: 89.99,
    description: 'Classic fit denim jeans with stretch comfort.',
    image: 'https://via.placeholder.com/400x400/1a1a1a/ffffff?text=Jeans',
    featured: false,
    rating: 4.4
  },
  {
    id: 12,
    name: 'Dumbbells Set',
    category: 'Sports',
    price: 149.99,
    description: 'Adjustable dumbbells set with storage rack.',
    image: 'https://via.placeholder.com/400x400/1a1a1a/ffffff?text=Dumbbells',
    featured: false,
    rating: 4.7
  }
]

const CATEGORIES = ['All', 'Electronics', 'Fashion', 'Home', 'Sports']

// Cart Context
const CartContext = createContext()

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart must be used within CartProvider')
  return context
}

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([])

  useEffect(() => {
    const savedCart = localStorage.getItem('cart')
    if (savedCart) setCart(JSON.parse(savedCart))
  }, [])

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id)
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      }
      return [...prev, { ...product, quantity: 1 }]
    })
  }

  const removeFromCart = (productId) => {
    setCart(prev => prev.filter(item => item.id !== productId))
  }

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }
    setCart(prev => prev.map(item => 
      item.id === productId ? { ...item, quantity } : item
    ))
  }

  const clearCart = () => setCart([])

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)
  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, cartCount, cartTotal }}>
      {children}
    </CartContext.Provider>
  )
}

// Navigation Component
const Navigation = ({ currentPage, setCurrentPage }) => {
  const { cartCount } = useCart()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navLinks = [
    { name: 'Home', page: 'home' },
    { name: 'Products', page: 'products' },
    { name: 'About', page: 'about' },
    { name: 'Contact', page: 'contact' }
  ]

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center cursor-pointer" onClick={() => setCurrentPage('home')}>
            <ShoppingCart className="h-8 w-8 text-black" />
            <span className="ml-2 text-2xl font-bold text-black">ShopHub</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map(link => (
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
              <ShoppingCart className="h-5 w-5 text-gray-700" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            {navLinks.map(link => (
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
              Cart
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

// Footer Component
const Footer = () => {
  return (
    <footer className="bg-black text-white mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <ShoppingCart className="h-6 w-6" />
              <span className="ml-2 text-xl font-bold">ShopHub</span>
            </div>
            <p className="text-gray-400 text-sm">Your one-stop shop for quality products at great prices.</p>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Shop</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Electronics</li>
              <li>Fashion</li>
              <li>Home & Living</li>
              <li>Sports</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Contact Us</li>
              <li>Shipping Info</li>
              <li>Returns</li>
              <li>FAQ</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Connect</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Facebook</li>
              <li>Instagram</li>
              <li>Twitter</li>
              <li>Pinterest</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2025 ShopHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

// Product Card Component
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
            <span className="text-xl font-bold">${product.price}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button onClick={handleAddToCart} className="w-full bg-black hover:bg-gray-800">
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  )
}

// Home Page
const HomePage = ({ setCurrentPage, setSelectedProduct }) => {
  const featuredProducts = PRODUCTS.filter(p => p.featured)

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gray-900 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Discover Your Next Favorite Product</h1>
            <p className="text-xl text-gray-300 mb-8">Shop the latest trends in electronics, fashion, home, and sports.</p>
            <Button onClick={() => setCurrentPage('products')} size="lg" className="bg-white text-black hover:bg-gray-200">
              Shop Now <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">Featured Products</h2>
          <button onClick={() => setCurrentPage('products')} className="text-sm font-medium hover:underline">
            View All <ChevronRight className="inline h-4 w-4" />
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map(product => (
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
          <h2 className="text-3xl font-bold mb-8 text-center">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {CATEGORIES.filter(cat => cat !== 'All').map(category => (
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

// Products Page
const ProductsPage = ({ setCurrentPage, setSelectedProduct }) => {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredProducts = PRODUCTS.filter(product => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">All Products</h1>
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="w-full md:w-64 flex-shrink-0">
          <div className="bg-white p-6 rounded-lg border border-gray-200 sticky top-20">
            <h3 className="font-semibold mb-4">Categories</h3>
            <div className="space-y-2">
              {CATEGORIES.map(category => (
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
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Results */}
          <div className="mb-4 text-sm text-gray-600">
            {filteredProducts.length} products found
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map(product => (
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
              <p className="text-gray-500">No products found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// Product Detail Page
const ProductDetailPage = ({ product, setCurrentPage }) => {
  const { addToCart } = useCart()
  const [quantity, setQuantity] = useState(1)

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p>Product not found</p>
      </div>
    )
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product)
    }
  }

  const relatedProducts = PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4)

  return (
    <div className="container mx-auto px-4 py-8">
      <button onClick={() => setCurrentPage('products')} className="text-sm text-gray-600 hover:text-black mb-6">
        ← Back to Products
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
        {/* Product Image */}
        <div className="bg-gray-100 rounded-lg overflow-hidden aspect-square">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        </div>

        {/* Product Info */}
        <div>
          <div className="text-sm text-gray-500 mb-2">{product.category}</div>
          <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
          
          <div className="flex items-center mb-6">
            <Star className="h-5 w-5 fill-black text-black" />
            <span className="ml-2 text-lg">{product.rating}</span>
            <span className="ml-2 text-gray-500">(124 reviews)</span>
          </div>

          <div className="text-4xl font-bold mb-6">${product.price}</div>

          <p className="text-gray-700 mb-8 leading-relaxed">{product.description}</p>

          <div className="mb-6">
            <Label className="mb-2 block">Quantity</Label>
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="text-xl font-semibold w-12 text-center">{quantity}</span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity(quantity + 1)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <Button onClick={handleAddToCart} size="lg" className="w-full bg-black hover:bg-gray-800">
            Add to Cart
          </Button>

          <div className="mt-8 border-t border-gray-200 pt-8">
            <h3 className="font-semibold mb-4">Product Features</h3>
            <ul className="space-y-2 text-gray-700">
              <li>• Free shipping on orders over $50</li>
              <li>• 30-day return policy</li>
              <li>• 1-year warranty included</li>
              <li>• Secure payment processing</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section>
          <h2 className="text-3xl font-bold mb-8">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map(p => (
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

// Cart Page
const CartPage = ({ setCurrentPage }) => {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart()

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <ShoppingCart className="h-24 w-24 text-gray-300 mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <p className="text-gray-600 mb-8">Add some products to get started!</p>
        <Button onClick={() => setCurrentPage('products')} className="bg-black hover:bg-gray-800">
          Continue Shopping
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="space-y-4">
            {cart.map(item => (
              <Card key={item.id}>
                <CardContent className="p-4">
                  <div className="flex gap-4">
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
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="font-semibold">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-lg mb-2">${(item.price * item.quantity).toFixed(2)}</div>
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
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div>
          <Card className="sticky top-20">
            <CardContent className="p-6">
              <h3 className="font-semibold text-lg mb-4">Order Summary</h3>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax</span>
                  <span>${(cartTotal * 0.1).toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between font-bold text-xl">
                    <span>Total</span>
                    <span>${(cartTotal * 1.1).toFixed(2)}</span>
                  </div>
                </div>
              </div>
              <Button onClick={() => setCurrentPage('checkout')} className="w-full bg-black hover:bg-gray-800">
                Proceed to Checkout
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

// Checkout Page
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
          <h2 className="text-3xl font-bold mb-4">Order Placed Successfully!</h2>
          <p className="text-gray-600 mb-8">Thank you for your purchase. You will receive a confirmation email shortly.</p>
          <Button onClick={() => setCurrentPage('home')} className="bg-black hover:bg-gray-800">
            Continue Shopping
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit}>
            {/* Shipping Information */}
            <Card className="mb-6">
              <CardContent className="p-6">
                <h3 className="font-semibold text-xl mb-6">Shipping Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" required />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" required />
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" required />
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor="address">Address</Label>
                    <Input id="address" required />
                  </div>
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input id="city" required />
                  </div>
                  <div>
                    <Label htmlFor="zip">ZIP Code</Label>
                    <Input id="zip" required />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Information */}
            <Card className="mb-6">
              <CardContent className="p-6">
                <h3 className="font-semibold text-xl mb-6">Payment Information</h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input id="cardNumber" placeholder="1234 5678 9012 3456" required />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="expiry">Expiry Date</Label>
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
              Place Order
            </Button>
          </form>
        </div>

        {/* Order Summary */}
        <div>
          <Card className="sticky top-20">
            <CardContent className="p-6">
              <h3 className="font-semibold text-lg mb-4">Order Summary</h3>
              <div className="space-y-3 mb-6">
                {cart.map(item => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-gray-600">{item.name} x {item.quantity}</span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
                <div className="border-t border-gray-200 pt-3 mt-3">
                  <div className="flex justify-between text-gray-600 mb-2">
                    <span>Subtotal</span>
                    <span>${cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600 mb-2">
                    <span>Shipping</span>
                    <span>Free</span>
                  </div>
                  <div className="flex justify-between text-gray-600 mb-2">
                    <span>Tax</span>
                    <span>${(cartTotal * 0.1).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-xl mt-3">
                    <span>Total</span>
                    <span>${(cartTotal * 1.1).toFixed(2)}</span>
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

// About Page
const AboutPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">About ShopHub</h1>
        
        <div className="space-y-6 text-gray-700 leading-relaxed">
          <p className="text-lg">
            Welcome to ShopHub, your premier destination for quality products across multiple categories.
            Since our founding, we've been committed to providing our customers with an exceptional shopping experience.
          </p>

          <h2 className="text-2xl font-bold text-black mt-8 mb-4">Our Mission</h2>
          <p>
            At ShopHub, we believe that shopping should be simple, enjoyable, and accessible to everyone.
            We carefully curate our product selection to ensure that every item meets our high standards of quality and value.
          </p>

          <h2 className="text-2xl font-bold text-black mt-8 mb-4">What We Offer</h2>
          <ul className="space-y-2">
            <li>• <strong>Wide Selection:</strong> From electronics to fashion, home goods to sports equipment</li>
            <li>• <strong>Quality Guarantee:</strong> Every product is carefully vetted for quality</li>
            <li>• <strong>Fast Shipping:</strong> Free shipping on orders over $50</li>
            <li>• <strong>Easy Returns:</strong> 30-day hassle-free return policy</li>
            <li>• <strong>Secure Shopping:</strong> Your data and payments are always protected</li>
          </ul>

          <h2 className="text-2xl font-bold text-black mt-8 mb-4">Our Values</h2>
          <p>
            We're more than just an online store. We're a community of people who care about quality,
            sustainability, and customer satisfaction. Every purchase you make supports our commitment
            to these values.
          </p>

          <div className="bg-gray-50 p-8 rounded-lg mt-8">
            <p className="text-center text-lg">
              Thank you for choosing ShopHub. We're honored to be part of your shopping journey.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

// Contact Page
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
          <h2 className="text-3xl font-bold mb-4">Message Sent!</h2>
          <p className="text-gray-600 mb-8">Thank you for contacting us. We'll get back to you within 24 hours.</p>
          <Button onClick={() => setSubmitted(false)} className="bg-black hover:bg-gray-800">
            Send Another Message
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Contact Us</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold text-lg mb-4">Customer Service</h3>
              <p className="text-gray-600 mb-2">Email: support@shophub.com</p>
              <p className="text-gray-600 mb-2">Phone: 1-800-SHOP-HUB</p>
              <p className="text-gray-600">Hours: Mon-Fri 9am-6pm EST</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold text-lg mb-4">Address</h3>
              <p className="text-gray-600">
                123 Commerce Street<br />
                Suite 456<br />
                New York, NY 10001<br />
                United States
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardContent className="p-6">
            <h3 className="font-semibold text-xl mb-6">Send us a Message</h3>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="contactName">Name</Label>
                    <Input id="contactName" required />
                  </div>
                  <div>
                    <Label htmlFor="contactEmail">Email</Label>
                    <Input id="contactEmail" type="email" required />
                  </div>
                </div>
                <div>
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" required />
                </div>
                <div>
                  <Label htmlFor="message">Message</Label>
                  <textarea
                    id="message"
                    required
                    className="w-full min-h-[150px] px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>
                <Button type="submit" className="w-full bg-black hover:bg-gray-800">
                  Send Message
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

// Main App Component
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
      <div className="min-h-screen bg-white flex flex-col">
        <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />
        <main className="flex-1">
          {renderPage()}
        </main>
        <Footer />
      </div>
    </CartProvider>
  )
}