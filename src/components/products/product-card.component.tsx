import { ProductType } from '@/interfaces/global.interface'
import { formatPrice, formatReductPrice, isNew } from '@/utils/index.utils'
import { useNavigate } from 'react-router'
import { LocalRating } from '../globals/local-rating'
// import dayjs from 'dayjs'

const ProductCard = ({ product }: { product: ProductType }) => {
  const navigate = useNavigate()
  const goToDetailPage = (product: ProductType) => {
    setTimeout(() => {
      navigate(
        `/${product.collection.slug}/${product.category.slug}/${product.slug}`
      )
    }, 500)
  }
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
            <button
              className="quick-view"
              onClick={() => goToDetailPage(product)}
            >
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
