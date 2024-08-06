import { useAppDispatch, useAppSelector } from '@/store'
import { cartsSelectors } from '@/store/slices/cart.slice'
import { reductPrice } from '@/utils/index.utils'
import { shallowEqual } from 'react-redux'

export const useCart = () => {
  const carts = useAppSelector(cartsSelectors.selectAll, {
    equalityFn: shallowEqual
  })

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
    carts,
    subTotalCarts
  }
}
