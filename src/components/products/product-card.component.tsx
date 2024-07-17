import React from 'react'
import { IoIosCall } from 'react-icons/io'
import { FaRegHeart } from 'react-icons/fa'
import { IoCartOutline } from 'react-icons/io5'
import { ProductType } from '@/interfaces/global.interface'
import { formatPrice, formatReductPrice, isNew } from '@/utils/index.utils'
import { LocalRating } from '../globals/local-rating'
// import dayjs from 'dayjs'

const ProductCard = ({ product }: { product: ProductType }) => {
  // const isNew = () => {
  //   const date1 = dayjs(Date.now())
  //   const date2 = dayjs(product.createdAt)
  //   return date1.diff(date2, 'month') <= 1
  //   // product.createdAt.
  // }
  return (
    <div>
      <div className="product">
        <div className="product-img">
          <img src={product.images[0]} alt="" />
          <div className="product-label space-x-1">
            {product.reduction && (
              <span className="sale">-{product.reduction}%</span>
            )}
            {isNew(product.createdAt) && <span className="new">NEW</span>}
          </div>
        </div>
        <div className="product-body">
          <p className="product-category">{product.category.title}</p>
          <h3 className="product-name line-clamp-1">
            <a href="#">{product.title}</a>
          </h3>
          <h4 className="product-price font-bold">
            <div className="flex items-center justify-center">
              <span
                className={`${product.reduction == null ? 'w-full' : ''}   `}
              >
                {product.reduction
                  ? formatReductPrice(product)
                  : formatPrice(product.price)}
              </span>

              {product.reduction && (
                <del className="product-old-price">
                  {formatPrice(product.price)}
                </del>
              )}
            </div>
          </h4>
          <div className="product-rating">
            {product.rating && (
              <LocalRating rate={product.rating}></LocalRating>
            )}
          </div>
          <div className="product-btns">
            <button className="add-to-wishlist">
              <i className="fa-regular fa-heart fa-xs"></i>
              <span className="tooltipp">add to wishlist</span>
            </button>
            <button className="add-to-compare">
              <i className="fa fa-exchange fa-xs"></i>
              <span className="tooltipp">add to compare</span>
            </button>
            <button className="quick-view">
              <i className="fa fa-eye fa-xs"></i>
              <span className="tooltipp">quick view</span>
            </button>
          </div>
        </div>
        <div className="add-to-cart">
          <button className="add-to-cart-btn">
            <i className="fa fa-shopping-cart"></i> add to cart
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
