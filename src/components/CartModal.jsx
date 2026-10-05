function CartModal({ isOpen, onClose, cart, onUpdateQuantity, onRemove, onClear }) {
  if (!isOpen) return null

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <div className="cart-backdrop" onClick={onClose} role="presentation">
      <div
        className="cart-modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-title"
      >
        <div className="cart-header">
          <div>
            <h2 id="cart-title" className="display">Keranjang Belanja</h2>
            <span className="cart-subtitle">{totalItems} item dipilih</span>
          </div>
          <button
            type="button"
            className="cart-close-btn"
            onClick={onClose}
            aria-label="Tutup keranjang"
          >
            ✕
          </button>
        </div>

        <div className="cart-body">
          {cart.length === 0 ? (
            <div className="cart-empty">
              <span className="cart-empty-icon">🛒</span>
              <p>Keranjang Anda masih kosong.</p>
              <button type="button" className="btn-secondary" onClick={onClose}>
                Mulai Belanja
              </button>
            </div>
          ) : (
            <ul className="cart-list">
              {cart.map((item) => (
                <li key={item.name} className="cart-item">
                  <div className="cart-item-img-wrapper">
                    <img src={item.image} alt={item.name} className="cart-item-img" />
                  </div>
                  <div className="cart-item-info">
                    <span className="cart-item-name">{item.name}</span>
                    <span className="cart-item-type">{item.type} · ${item.price.toLocaleString()}</span>
                  </div>
                  <div className="cart-quantity-controls">
                    <button
                      type="button"
                      className="qty-btn"
                      onClick={() => onUpdateQuantity(item.name, -1)}
                      aria-label={`Kurangi ${item.name}`}
                    >
                      −
                    </button>
                    <span className="qty-value">{item.quantity}</span>
                    <button
                      type="button"
                      className="qty-btn"
                      onClick={() => onUpdateQuantity(item.name, 1)}
                      aria-label={`Tambah ${item.name}`}
                    >
                      +
                    </button>
                  </div>
                  <div className="cart-item-subtotal">
                    ${(item.price * item.quantity).toLocaleString()}
                  </div>
                  <button
                    type="button"
                    className="cart-item-remove"
                    onClick={() => onRemove(item.name)}
                    title="Hapus produk"
                    aria-label={`Hapus ${item.name}`}
                  >
                    🗑
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {cart.length > 0 && (
          <div className="cart-footer">
            <div className="cart-total-row">
              <span>Total Harga:</span>
              <span className="cart-total-price">${totalPrice.toLocaleString()}</span>
            </div>
            <div className="cart-actions">
              <button type="button" className="btn-secondary" onClick={onClear}>
                Kosongkan
              </button>
              <button
                type="button"
                className="btn-primary"
                onClick={() => {
                  alert(`Pesanan berhasil dibuat! Total: $${totalPrice.toLocaleString()}`)
                  onClear()
                  onClose()
                }}
              >
                Checkout (${totalPrice.toLocaleString()})
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CartModal
