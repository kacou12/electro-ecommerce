import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '..'

export const selectFavoriteById = createSelector(
  [
    (state: RootState) => state.auth.userInfo?.favorites,
    (state: RootState, favoriteId: string) => favoriteId
  ],
  (dataMap, favoriteId) => dataMap?.find((fav) => fav.id == favoriteId)
)
