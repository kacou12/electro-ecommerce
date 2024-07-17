import React from 'react'

export const CartDropdownLine = () => {
  return (
    <>
      <div className="product-widget border">
        <div className="product-img">
          <img src="./img/product01.png" alt="" />
        </div>
        <div className="product-body">
          <h3 className="product-name">
            <a href="#" className="line-clamp-2">
              product name goes here
            </a>
          </h3>
          <h4 className="product-price">
            <span className="qty">1x</span>$980.00
          </h4>
        </div>
        <button className="delete">
          <i className="fa fa-close"></i>
        </button>
      </div>
    </>
  )
}
