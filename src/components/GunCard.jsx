import { useRef } from 'react'

function GunCard({ gun, onAddToCart, inCartQuantity }) {
  const popup = useRef(null)

  return (
    <li className="card">
      <div className="card-inner">
        <div
          className="card-clickable"
          onClick={() => popup.current?.showModal()}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              popup.current?.showModal()
            }
          }}
        >
          <div className="card-img-wrapper">
            <img className="card-img" src={gun.image} alt={gun.name} />
          </div>
          <div className="card-info">
            <span className="name display">{gun.name}</span>
            <span className="type">
              {gun.type} · {gun.caliber}
            </span>
            <span className="price">${gun.price.toLocaleString()}</span>
          </div>
        </div>

        <div className="card-actions">
          <button
            type="button"
            className="btn-add-cart"
            onClick={() => onAddToCart(gun)}
          >
            <span>+ Keranjang</span>
            {inCartQuantity > 0 && (
              <span className="card-in-cart-badge">{inCartQuantity}</span>
            )}
          </button>
        </div>
      </div>

      <dialog
        className="popup"
        ref={popup}
        onClick={(e) => e.target === popup.current && popup.current.close()}
      >
        <div className="popup-img-wrapper">
          <img className="popup-img" src={gun.image} alt={gun.name} />
        </div>
        <h3 className="display">{gun.name}</h3>
        <p className="type">
          {gun.type} · {gun.caliber} · <span className="price">${gun.price.toLocaleString()}</span>
        </p>
        <p>{gun.description}</p>
        <div className="popup-actions">
          <button
            type="button"
            className="btn-primary"
            onClick={() => {
              onAddToCart(gun)
              popup.current?.close()
            }}
          >
            + Tambah ke Keranjang (${gun.price.toLocaleString()})
          </button>
          <form method="dialog">
            <button className="popup-close">Close</button>
          </form>
        </div>
      </dialog>
    </li>
  )
}

export default GunCard
