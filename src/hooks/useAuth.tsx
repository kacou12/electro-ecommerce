import {
  authApi,
  useGetUserDetailsQuery,
  useLazyGetUserDetailsQuery
} from '@/services/auth.service'
import { store, useAppDispatch, useAppSelector } from '@/store'
import { setCredentials } from '@/store/slices/auth.slice'
import React, { useEffect } from 'react'

export const useAuth = () => {
  const { loading, error, userInfo } = useAppSelector((state) => state.auth)
  const dispatch = useAppDispatch()
  const isAuth = () => {
    return userInfo ? true : false
  }

  const { data, isFetching } = useGetUserDetailsQuery(undefined, {
    pollingInterval: 900000, // 15mins
    skip: !isAuth()
  })

  const getUser = () => userInfo

  useEffect(() => {
    if (data) dispatch(setCredentials(data))
  }, [data, dispatch])

  const favorites = () => {
    return userInfo?.favorites
  }

  const isFavorite = (productId: string) => {
    if (!isAuth()) return false
    console.log(userInfo!.favorites.map((favProd) => favProd.id))
    return userInfo!.favorites.map((favProd) => favProd.id).includes(productId)
  }

  return { isAuth, favorites, isFavorite, getUser }
}
