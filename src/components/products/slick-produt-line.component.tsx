import { ProductType } from '@/interfaces/global.interface'
import { FaFrancSign } from 'react-icons/fa6'
import React from 'react'

const ProdutLine = ({ product }: { product: ProductType }) => {
  const formatPrice = (price: number) =>
    new Intl.NumberFormat('ci-CI', {
      style: 'currency',
      currency: 'XOF'
    }).format(price)
  const formatReductPrice = () => {
    return formatPrice((product.price * product.reduction!) / 100)
  }
  return (
    <>
      {/* <!-- product widget --> */}
      <div className="product-widget">
        <div className="product-img">
          <img src={product.images[0]} alt="" />
        </div>
        <div className="product-body">
          <p className="product-category line-clamp-1">
            {product.category.title}
          </p>
          <h3 className="product-name">
            <a href="#" className="line-clamp-1">
              {product.title}
            </a>
          </h3>
          <h4 className="product-price font-bold">
            <div className="flex items-center">
              <span className="text-xs">
                {product.reduction
                  ? formatReductPrice()
                  : formatPrice(product.price)}
              </span>

              {product.reduction && (
                <del className="product-old-price">
                  {formatPrice(product.price)}
                </del>
              )}
            </div>
          </h4>
        </div>
      </div>
      {/* <!-- /product widget --> */}
    </>
  )
}

export default ProdutLine
