import { ProductType } from '@/interfaces/global.interface'
import { formatPrice, formatReductPrice, isNew } from '@/utils/index.utils'
import { useNavigate } from 'react-router'
import { LocalRating } from '../globals/local-rating'
import { ProductAction } from './product-action.component'
import { useCart } from '@/hooks/useCart'
import { Link } from 'react-router-dom'
import { useCartLine } from '@/hooks/useCartLine'
// import dayjs from 'dayjs'

const ProductCard = ({ product }: { product: ProductType }) => {
  const imgError = (img: string) => {
    return img.replace('/r250/', '/r150/')
  }

  const addDefaultSrc = (ev: React.SyntheticEvent<HTMLImageElement, Event>) => {
    //@ts-ignore
    ev.target.src = imgError(product.images[0])
  }
  const { isInCart, addToCart } = useCartLine(product.id)
  return (
    <div>
      <div className="product">
        <div className="product-img">
          <img src={product.images[0]} onError={addDefaultSrc} alt="" />
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
            <Link
              to={`/${product.collection.slug}/${product.category.slug}/${product.slug}`}
            >
              {product.title}
            </Link>
          </h3>
          <h4 className="product-price font-bold">
            <div className="flex  items-end justify-center space-x-1 leading-none">
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
          <ProductAction hiddenCart={true} product={product}></ProductAction>
        </div>
        <div className={` ${isInCart() && 'hidden'}  add-to-cart`}>
          <button
            onClick={() => addToCart({ product })}
            className="add-to-cart-btn"
          >
            <i className="fa fa-shopping-cart"></i> add to cart
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
