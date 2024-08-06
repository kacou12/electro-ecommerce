import { useCart } from '@/hooks/useCart'
import { ProductType } from '@/interfaces/global.interface'
import { formatPrice, formatReductPrice, isNew } from '@/utils/index.utils'
import { Button } from 'flowbite-react'
import { IoMdAdd, IoMdRemove } from 'react-icons/io'
import { useNavigate } from 'react-router'
import { LocalRating } from '../globals/local-rating'
import { ProductAction } from './product-action.component'
import { Link } from 'react-router-dom'

const ProductLineCard = ({ product }: { product: ProductType }) => {
  const navigate = useNavigate()

  const imgError = (img: string) => {
    return img.replace('/r250/', '/r150/')
  }

  const addDefaultSrc = (ev: React.SyntheticEvent<HTMLImageElement, Event>) => {
    //@ts-ignore
    ev.target.src = imgError(product.images[0])
  }
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
          <h3 className="product-name  line-clamp-1">
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
          <ProductAction product={product}></ProductAction>
        </div>
      </div>
    </div>
  )
}

export default ProductLineCard
