import { authApi } from '@/services/auth.service'
import { store, useAppSelector } from '@/store'
import React from 'react'

export const useAuth = () => {
  const { loading, error, userInfo } = useAppSelector((state) => state.auth)
  const isAuth = () => {
    return userInfo ? true : false
  }

  const favorites = () => {
    return userInfo?.user.favorites
  }

  return { isAuth, favorites }
}
