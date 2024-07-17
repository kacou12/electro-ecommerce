import { categoryApi } from '@/services/category.service'
import { collectionApi } from '@/services/collections.service'
import { store } from '@/store'
import React from 'react'
import { Params } from 'react-router'

export const categoryLoader = async ({
  params
}: {
  params: Params<string>
}) => {
  try {
    const queryFetching = store.dispatch(
      categoryApi.endpoints.getCategoryBySlug.initiate(params['categorySlug']!)
    )
    const response = await queryFetching.unwrap()
    return response
  } catch (e) {
    throw new Response('Not Found', { status: 404 })
  }
}
