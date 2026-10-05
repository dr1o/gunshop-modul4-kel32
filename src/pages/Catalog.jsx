import { useState, useMemo } from 'react'
import GUNS from '../data/guns.js'
import GunCard from '../components/GunCard.jsx'

const CATEGORIES = ['All', 'Pistol', 'Rifle', 'Shotgun']

function Catalog({ onAddToCart, cart = [] }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedType, setSelectedType] = useState('All')
  const [sortField, setSortField] = useState(null) // 'name' | 'price' | null
  const [sortOrder, setSortOrder] = useState('asc') // 'asc' | 'desc'

  // Toggle sorting by name
  const handleToggleSortName = () => {
    if (sortField === 'name') {
      setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortField('name')
      setSortOrder('asc')
    }
  }

  // Toggle sorting by price
  const handleToggleSortPrice = () => {
    if (sortField === 'price') {
      setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortField('price')
      setSortOrder('asc')
    }
  }

  // Reset all filters and sort
  const handleResetFilters = () => {
    setSearchQuery('')
    setSelectedType('All')
    setSortField(null)
    setSortOrder('asc')
  }

  // Filtered and sorted guns
  const filteredGuns = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()

    const filtered = GUNS.filter((gun) => {
      const matchSearch = gun.name.toLowerCase().includes(query)
      const matchType = selectedType === 'All' || gun.type.toLowerCase() === selectedType.toLowerCase()
      return matchSearch && matchType
    })

    if (!sortField) return filtered

    return [...filtered].sort((a, b) => {
      if (sortField === 'name') {
        const result = a.name.localeCompare(b.name)
        return sortOrder === 'asc' ? result : -result
      }
      if (sortField === 'price') {
        const result = a.price - b.price
        return sortOrder === 'asc' ? result : -result
      }
      return 0
    })
  }, [searchQuery, selectedType, sortField, sortOrder])

  // Cart item count lookup
  const cartQuantityMap = useMemo(() => {
    const map = new Map()
    cart.forEach((item) => {
      map.set(item.name, item.quantity)
    })
    return map
  }, [cart])

  const hasActiveFilters = searchQuery !== '' || selectedType !== 'All' || sortField !== null

  return (
    <>
      <section className="masthead">
        <h1 className="display">Hardware, by the spec sheet.</h1>
        <p className="lede">
          A small armory of pistols, rifles, and shotguns. Every piece listed with its
          type, caliber, and price — nothing else.
        </p>
      </section>

      <section className="catalog-controls-section">
        {/* Search bar */}
        <div className="search-bar">
          <svg
            className="search-icon"
            viewBox="0 0 24 24"
            width="18"
            height="18"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            className="search-input"
            placeholder="Cari nama senjata (contoh: Glock, AK, AR)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Cari nama senjata"
          />
          {searchQuery && (
            <button
              type="button"
              className="search-clear-btn"
              onClick={() => setSearchQuery('')}
              aria-label="Hapus pencarian"
            >
              ✕
            </button>
          )}
        </div>

        {/* Filter by Category & Sort Toggle Buttons */}
        <div className="filter-sort-bar">
          <div className="category-filters">
            <span className="control-label">Jenis:</span>
            <div className="category-buttons">
              {CATEGORIES.map((category) => (
                <button
                  key={category}
                  type="button"
                  className={`chip-btn ${selectedType === category ? 'active' : ''}`}
                  onClick={() => setSelectedType(category)}
                >
                  {category === 'All' ? 'Semua' : category}
                </button>
              ))}
            </div>
          </div>

          <div className="sort-controls">
            <span className="control-label">Urutkan:</span>
            <div className="sort-buttons">
              <button
                type="button"
                className={`toggle-sort-btn ${sortField === 'name' ? 'active' : ''}`}
                onClick={handleToggleSortName}
                title="Klik untuk toggle arah urutan nama"
              >
                <span>Nama</span>
                <span className="toggle-direction">
                  {sortField === 'name' ? (sortOrder === 'asc' ? 'A → Z ↑' : 'Z → A ↓') : '⇅'}
                </span>
              </button>

              <button
                type="button"
                className={`toggle-sort-btn ${sortField === 'price' ? 'active' : ''}`}
                onClick={handleToggleSortPrice}
                title="Klik untuk toggle arah urutan harga"
              >
                <span>Harga</span>
                <span className="toggle-direction">
                  {sortField === 'price'
                    ? sortOrder === 'asc'
                      ? 'Termurah ↑'
                      : 'Termahal ↓'
                    : '⇅'}
                </span>
              </button>

              {hasActiveFilters && (
                <button
                  type="button"
                  className="reset-btn"
                  onClick={handleResetFilters}
                  title="Reset pencarian, filter, dan urutan"
                >
                  Reset
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="list-head">
          <h2>Current stock</h2>
          <span className="count">
            Menampilkan {filteredGuns.length} dari {GUNS.length} produk
          </span>
        </div>

        {filteredGuns.length === 0 ? (
          <div className="empty-stock">
            <p className="empty-title">Tidak ada produk yang sesuai kriteria.</p>
            <p className="empty-desc">
              Coba gunakan kata kunci pencarian yang berbeda atau reset filter.
            </p>
            <button type="button" className="btn-secondary" onClick={handleResetFilters}>
              Reset Semua Filter
            </button>
          </div>
        ) : (
          <ul className="stock">
            {filteredGuns.map((gun) => (
              <GunCard
                key={gun.name}
                gun={gun}
                onAddToCart={onAddToCart}
                inCartQuantity={cartQuantityMap.get(gun.name) || 0}
              />
            ))}
          </ul>
        )}
      </section>
    </>
  )
}

export default Catalog
