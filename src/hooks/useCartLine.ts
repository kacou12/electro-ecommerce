import { ProductType } from '@/interfaces/global.interface'
import { useAppDispatch, useAppSelector } from '@/store'
import {
  cartAddLine,
  cartRemoveLine,
  cartsSelectors,
  decreaseQuantity,
  getCartLine,
  increaseQuantity
} from '@/store/slices/cart.slice'
import { shallowEqual } from 'react-redux'
import { toast } from 'react-toastify'

export const useCartLine = (idCart: string) => {
  const dispatch = useAppDispatch()

  const cartLine = useAppSelector((state) =>
    cartsSelectors.selectById(state, idCart)
  )
  const isInCart = () => !!getCartLine(idCart)

  const addToCart = ({
    product,
    quantity
  }: {
    product: ProductType
    quantity?: number
  }) => {
    dispatch(
      cartAddLine({ quantity: quantity ?? 1, product: product, id: product.id })
    )
    toast.success('Le produit a bien été ajouté au panier', {
      theme: 'colored'
    })
  }

  const decreaseOrRemoveFromCart = () => {
    const currentCartLine = getCartLine(idCart)!
    if (currentCartLine.quantity == 1) {
      return removeCartLine()
    }
    return dispatch(decreaseQuantity(currentCartLine))
  }

  const removeCartLine = () => {
    const currentCartLine = getCartLine(idCart)!
    dispatch(cartRemoveLine(currentCartLine.id))
    toast.success('Le produit a bien été supprimé du panier', {
      theme: 'colored'
    })
  }
  const increaseQuantityCartLine = () => {
    const currentCartLine = getCartLine(idCart)!
    dispatch(increaseQuantity(currentCartLine))
    toast.success('La quantité a été augmentée avec success', {
      theme: 'colored'
    })
  }

  return {
    isInCart,
    addToCart,
    increaseQuantityCartLine,
    decreaseOrRemoveFromCart,
    removeCartLine,
    getCartLineFromProduct: cartLine
    // subTotalCarts
  }
}
