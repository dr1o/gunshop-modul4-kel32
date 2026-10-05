const NAV = ['Catalog', 'About', 'Contact']

function Header({ tab, onTab, totalItems, onOpenCart }) {
  return (
    <header className="header">
      <div className="brand-group">
        <span className="brand display">Bore &amp; Barrel</span>
        <span className="group-tag">Kelompok 32</span>
      </div>

      <nav className="nav">
        {NAV.map((item) => (
          <button
            key={item}
            type="button"
            className={tab === item ? 'nav-link active' : 'nav-link'}
            onClick={() => onTab(item)}
          >
            {item}
          </button>
        ))}
      </nav>

      <button
        type="button"
        className="cart-toggle-btn"
        onClick={onOpenCart}
        aria-label={`Keranjang Belanja, ${totalItems} item`}
      >
        <svg
          className="cart-svg-icon"
          viewBox="0 0 24 24"
          width="20"
          height="20"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="9" cy="21" r="1" />
          <circle cx="20" cy="21" r="1" />
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
        </svg>
        <span className="cart-btn-label">Keranjang</span>
        {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
      </button>
    </header>
  )
}

export default Header
