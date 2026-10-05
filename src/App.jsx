import { useState } from 'react'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import CartModal from './components/CartModal.jsx'
import Catalog from './pages/Catalog.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import './App.css'

function App() {
  const [tab, setTab] = useState('Catalog')
  const [cart, setCart] = useState([])
  const [isCartOpen, setIsCartOpen] = useState(false)

  // Tambah produk ke keranjang
  const handleAddToCart = (gun) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.name === gun.name)
      if (existing) {
        return prev.map((item) =>
          item.name === gun.name ? { ...item, quantity: item.quantity + 1 } : item,
        )
      }
      return [...prev, { ...gun, quantity: 1 }]
    })
  }

  // Update kuantitas (+1 / -1), hapus jika kuantitas <= 0
  const handleUpdateQuantity = (gunName, delta) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.name === gunName) {
            const nextQty = item.quantity + delta
            return nextQty > 0 ? { ...item, quantity: nextQty } : null
          }
          return item
        })
        .filter(Boolean),
    )
  }

  // Hapus produk dari keranjang
  const handleRemoveFromCart = (gunName) => {
    setCart((prev) => prev.filter((item) => item.name !== gunName))
  }

  // Kosongkan keranjang
  const handleClearCart = () => {
    setCart([])
  }

  // Hitung total item dalam keranjang
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <div className="shell">
      <Header
        tab={tab}
        onTab={setTab}
        totalItems={totalItems}
        onOpenCart={() => setIsCartOpen(true)}
      />

      <main className="main">
        {tab === 'Catalog' && (
          <Catalog onAddToCart={handleAddToCart} cart={cart} />
        )}
        {tab === 'About' && <About />}
        {tab === 'Contact' && <Contact />}
      </main>

      <Footer />

      <CartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemove={handleRemoveFromCart}
        onClear={handleClearCart}
      />
    </div>
  )
}

export default App
