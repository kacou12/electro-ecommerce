import { authApi, useGetUserDetailsQuery } from '@/services/auth.service'
import { categoryApi } from '@/services/category.service'
import { collectionApi } from '@/services/collections.service'
import { store, useAppSelector } from '@/store'
import React from 'react'
import { Params, redirect } from 'react-router'
import { RouteEnum } from '../route.enum'
import { useAuth } from '@/hooks/useAuth'

export const authLoader = async ({ params }: { params: Params<string> }) => {
  console.log('waaa')
  const { isAuth } = useAuth()

  const result = await isAuth()
  if (!result) {
    return redirect(RouteEnum.LOGIN)
  }
}
