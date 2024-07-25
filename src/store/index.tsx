import { productApi } from '@/services/products.service'
import { configureStore, EntityState } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { setupListeners } from '@reduxjs/toolkit/query'
import { collectionApi } from '@/services/collections.service'
import { categoryApi } from '@/services/category.service'
import { commentApi } from '@/services/comment.service'
import storage from 'redux-persist/lib/storage'
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist'
import { persistStore, persistReducer, PersistConfig } from 'redux-persist'
import { cartsReducer } from './slices/cart.slice'
import { CartType } from '@/interfaces/global.interface'

const persistConfig: PersistConfig<EntityState<CartType, string>> = {
  key: 'carts',
  storage
}

const persistedReducer = persistReducer(persistConfig, cartsReducer)

export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [productApi.reducerPath]: productApi.reducer,
    [collectionApi.reducerPath]: collectionApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [commentApi.reducerPath]: commentApi.reducer,
    carts: persistedReducer
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    })
      .concat(productApi.middleware)
      .concat(collectionApi.middleware)
      .concat(categoryApi.middleware)
      .concat(commentApi.middleware)
})

export const persistore = persistStore(store)

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch)

// export const store = createStore();

export type AppDispatch = typeof store.dispatch
export const useAppSelector = useSelector.withTypes<RootState>()

export const useAppDispatch: () => AppDispatch = useDispatch
export type RootState = ReturnType<typeof store.getState>
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector
