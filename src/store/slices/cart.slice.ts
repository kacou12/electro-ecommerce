import { CartType, ProductType } from '@/interfaces/global.interface'
import {
  createEntityAdapter,
  createSlice,
  configureStore,
  PayloadAction,
  createSelector
} from '@reduxjs/toolkit'

import { RootState, store } from '..'

export const cartsAdapter = createEntityAdapter({
  // Assume IDs are stored in a field other than `cart.id`
  selectId: (cartLine: CartType) => cartLine.id
  // Keep the "all IDs" array sorted based on cart titles
  // sortComparer: (a, b) => a.title.localeCompare(b.title)
})

const cartsSlice = createSlice({
  name: 'carts',
  initialState: cartsAdapter.getInitialState(),

  reducers: {
    // Can pass adapter functions directly as case reducers.  Because we're passing this
    // as a value, `createSlice` will auto-generate the `cartAdded` action type / creator
    cartAddLine: cartsAdapter.addOne,
    cartRemoveLine: cartsAdapter.removeOne,
    increaseQuantity: (state, action: PayloadAction<CartType>) => {
      cartsAdapter.updateOne(state, {
        id: action.payload.id,
        changes: {
          quantity: action.payload.quantity + 1
        }
      })
    },
    decreaseQuantity: (state, action: PayloadAction<CartType>) => {
      cartsAdapter.updateOne(state, {
        id: action.payload.id,
        changes: {
          quantity: action.payload.quantity - 1
        }
      })
    },

    cartsReceived(state, action) {
      // Or, call them as "mutating" helpers in a case reducer
      cartsAdapter.setAll(state, action.payload.carts)
    }
  }
})

export const {
  cartAddLine,
  cartsReceived,
  cartRemoveLine,
  decreaseQuantity,
  increaseQuantity
} = cartsSlice.actions
export const cartsReducer = cartsSlice.reducer
// Can create a set of memoized selectors based on the location of this entity state

export const cartsSelectors = cartsAdapter.getSelectors<RootState>(
  (state) => state.carts
)

// export const getCartLine = (cartId: string) =>
//   cartsSelectors.selectById(store.getState(), cartId) as CartType | undefined
