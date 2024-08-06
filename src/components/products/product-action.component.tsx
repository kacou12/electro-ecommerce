import { formatPrice, formatReductPrice, isNew } from '@/utils/index.utils'
import { Button } from 'flowbite-react'
import { IoMdAdd, IoMdRemove } from 'react-icons/io'
import { useNavigate } from 'react-router'
import { LocalRating } from '../globals/local-rating'
import { ProductType } from '@/interfaces/global.interface'
import { useCart } from '@/hooks/useCart'
import { useToggleFavoriteProductMutation } from '@/services/auth.service'
import { toast } from 'react-toastify'
import { useAuth } from '@/hooks/useAuth'
import { FavoriteActions, useFavoriteContext } from '../favorite-actions'
import { useToggle } from '@reactuses/core'
import { useCartLine } from '@/hooks/useCartLine'

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
  } = useCartLine(product.id)

  const [initToggleFavorite, { isSuccess, isLoading }] =
    useToggleFavoriteProductMutation()

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
        {isInCart() && (
          <div className="increase-qty ">
            <Button
              onClick={() => decreaseOrRemoveFromCart()}
              className="w-10 h-10 rounded-md flex justify-center items-center"
            >
              <IoMdRemove className="w-6 h-6" />
            </Button>
          </div>
        )}
        {/* END INCREASE  QUANTITY */}

        <div className="product-btns  flex-1">
          <FavoriteActions product={product}>
            <FavoriteChild product={product}></FavoriteChild>
          </FavoriteActions>

          {/* PRODUCT QUANITY */}
          {isInCart() ? (
            <span className="product-qty px-4 font-bold">
              {/* {currentCartLine({ product })!.quantity} */}
              {currentCartLine!.quantity}
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
        {isInCart() && (
          <div className="decrease-qty">
            <Button
              onClick={() => increaseQuantityCartLine()}
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

const FavoriteChild = ({ product }: { product: ProductType }) => {
  const favoriteContext = useFavoriteContext()
  const initToggle = () => {}
  const showIcon = () => {
    const favoriteOn = useFavoriteContext()!.on
    if (favoriteOn) {
      return (
        <>
          <i className="fa-solid fa-heart fa-xs text-primary"></i>
          <span className="tooltipp">delete from wishlist</span>
        </>
      )
    }

    return (
      <>
        <i className="fa-regular fa-heart fa-xs"></i>
        <span className="tooltipp">add to wishlist</span>
      </>
    )
  }
  return (
    <button
      onClick={() => favoriteContext?.toggleFavoriteProduct()}
      className="add-to-wishlist"
    >
      {showIcon()}
    </button>
  )
}
