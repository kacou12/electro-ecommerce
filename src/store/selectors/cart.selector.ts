import { CartType } from '@/interfaces/global.interface'
import { RootState, store } from '..'
import { cartsAdapter } from '../slices/cart.slice'

export const cartsSelectors = cartsAdapter.getSelectors<RootState>(
  (state) => state.carts
)

export const cartLineSelector = (cartId: string) =>
  cartsSelectors.selectById(store.getState(), cartId) as CartType | undefined
