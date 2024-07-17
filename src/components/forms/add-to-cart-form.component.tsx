import React from 'react'

export const AddToCartForm = () => {
  return (
    <>
      <div className="product-options">
        <label>
          Size
          <select className="input-select">
            <option value="0">X</option>
          </select>
        </label>
        <label>
          Color
          <select className="input-select">
            <option value="0">Red</option>
          </select>
        </label>
      </div>

      <div className="add-to-cart">
        <div className="qty-label">
          Qty
          <div className="input-number">
            <input type="number" />
            <span className="qty-up">+</span>
            <span className="qty-down">-</span>
          </div>
        </div>
        <button className="add-to-cart-btn">
          <i className="fa fa-shopping-cart"></i> add to cart
        </button>
      </div>
    </>
  )
}
