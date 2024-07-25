import { formatPrice, formatReductPrice, isNew } from '@/utils/index.utils'
import { Button } from 'flowbite-react'
import { IoMdAdd, IoMdRemove } from 'react-icons/io'
import { useNavigate } from 'react-router'
import { LocalRating } from '../globals/local-rating'
import { ProductType } from '@/interfaces/global.interface'
import { useCart } from '@/hooks/useCart'

export const ProductAction = ({
  product,
  hiddenCart = false
}: {
  product: ProductType
  hiddenCart?: boolean
}) => {
  const navigate = useNavigate()
  const {
    addToCart,
    isInCart,
    decreaseOrRemoveFromCart,
    increaseQuantityCartLine,
    getCartLineFromProduct: currentCartLine
  } = useCart()

  const goToDetailPage = (product: ProductType) => {
    setTimeout(() => {
      navigate(
        `/${product.collection.slug}/${product.category.slug}/${product.slug}`
      )
    }, 500)
  }
  return (
    <>
      <section className="flex items-center">
        {/* INCREASE  QUANTITY */}
        {isInCart({ product }) && (
          <div className="increase-qty ">
            <Button
              onClick={() => decreaseOrRemoveFromCart({ product })}
              className="w-10 h-10 rounded-md flex justify-center items-center"
            >
              <IoMdRemove className="w-6 h-6" />
            </Button>
          </div>
        )}
        {/* END INCREASE  QUANTITY */}

        <div className="product-btns  flex-1">
          <button className="add-to-wishlist">
            <i className="fa-regular fa-heart fa-xs"></i>
            <span className="tooltipp">add to wishlist</span>
          </button>

          {/* PRODUCT QUANITY */}
          {isInCart({ product }) ? (
            <span className="product-qty px-4 font-bold">
              {currentCartLine({ product })!.quantity}
            </span>
          ) : (
            <button
              onClick={() => addToCart({ product })}
              className={`${hiddenCart && 'hidden'} add-to-compare`}
            >
              <i className="fa-solid fa-cart-shopping fa-xs"></i>
              <span className="tooltipp">add to cart</span>
            </button>
          )}
          {/* END PRODUCT QUANITY */}

          {/* ADD TO CART */}
          <button
            className="quick-view"
            onClick={() => goToDetailPage(product)}
          >
            <i className="fa fa-eye fa-xs"></i>
            <span className="tooltipp">quick view</span>
          </button>
          {/* END TO CART */}
        </div>

        {/* DECCREASE  QUANTITY */}
        {isInCart({ product }) && (
          <div className="decrease-qty ">
            <Button
              onClick={() => increaseQuantityCartLine({ product })}
              className="w-10 h-10 rounded-md flex justify-center items-center"
            >
              <IoMdAdd className="w-6 h-6 text-white" />
            </Button>
          </div>
        )}
        {/* END DECCREASE  QUANTITY */}
      </section>
    </>
  )
}
