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
  const imgError = (img: string) => {
    return img.replace('/r250/', '/r150/')
  }

  const addDefaultSrc = (ev: React.SyntheticEvent<HTMLImageElement, Event>) => {
    //@ts-ignore
    ev.target.src = imgError(product.images[0])
  }
  return (
    <>
      {/* <!-- product widget --> */}
      <div className="product-widget">
        <section className="product-img ">
          <img src={product.images[0]} onError={addDefaultSrc} alt="" />
        </section>
        <section className="product-body flex flex-col  space-y-1">
          <p className="product-category line-clamp-1 ">
            {product.category.title}
          </p>
          <p className="product-name">
            <a href="#" className="line-clamp-1">
              {product.title}
            </a>
          </p>
          <h4 className="product-price font-bold ">
            <div className="flex items-center space-x-1 leading-none">
              <span className="text-xs ">
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
        </section>
      </div>
      {/* <!-- /product widget --> */}
    </>
  )
}

export default ProdutLine
