import { ProductType } from '@/interfaces/global.interface'
import { store } from '@/store'
import {
  cartAddLine,
  cartRemoveLine,
  cartsSelectors,
  decreaseQuantity,
  increaseQuantity
} from '@/store/slices/cart.slice'
import { reductPrice } from '@/utils/index.utils'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { v4 as uuidv4 } from 'uuid'

export const useCart = () => {
  const carts = useSelector(cartsSelectors.selectAll)
  const isInCart = ({ product }: { product: ProductType }) => {
    return carts.some((cartLine) => cartLine.product.id == product.id)
  }

  const addToCart = ({
    product,
    quantity
  }: {
    product: ProductType
    quantity?: number
  }) => {
    store.dispatch(
      cartAddLine({ quantity: quantity ?? 1, product: product, id: uuidv4() })
    )
    toast.success('Le produit a bien été ajouté au panier', {
      theme: 'colored'
    })
  }

  const decreaseOrRemoveFromCart = ({ product }: { product: ProductType }) => {
    const currentCartLine = getCartLineFromProduct({ product })!
    if (currentCartLine.quantity == 1) {
      return removeCartLine({ product })
    }
    return store.dispatch(decreaseQuantity(currentCartLine))
  }

  const removeCartLine = ({ product }: { product: ProductType }) => {
    const currentCartLine = getCartLineFromProduct({ product })!
    store.dispatch(cartRemoveLine(currentCartLine.id))
    toast.success('Le produit a bien été supprimé du panier', {
      theme: 'colored'
    })
  }
  const increaseQuantityCartLine = ({ product }: { product: ProductType }) => {
    const currentCartLine = getCartLineFromProduct({ product })!
    store.dispatch(increaseQuantity(currentCartLine))
    toast.success('La quantité a été augmentée avec success', {
      theme: 'colored'
    })
  }

  const getCartLineFromProduct = ({ product }: { product: ProductType }) =>
    carts.find((cart) => cart.product.id === product.id)

  const subTotalCarts = () => {
    return carts.reduce((previous, current) => {
      const currentProductPrice =
        current.product.reduction != null
          ? reductPrice(current.product)
          : current.product.price
      return previous + current.quantity * currentProductPrice
    }, 0)
  }

  return {
    isInCart,
    addToCart,
    increaseQuantityCartLine,
    decreaseOrRemoveFromCart,
    getCartLineFromProduct,
    carts,
    removeCartLine,
    subTotalCarts
  }
}

// export const subTotalCarts = () => {
//   const carts = useSelector(cartsSelectors.selectAll)
//   return carts.reduce((previous, current) => {
//     const currentProductPrice =
//       current.product.reduction != null
//         ? reductPrice(current.product)
//         : current.product.price
//     return previous + current.quantity * currentProductPrice
//   }, 0)
// }
