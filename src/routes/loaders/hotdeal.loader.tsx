import { collectionApi } from '@/services/collections.service'
import { productApi } from '@/services/products.service'
import { store } from '@/store'
import React from 'react'
import { Params } from 'react-router'

export const hotDealLoader = async ({ request }: { request: Request }) => {
  const url = new URL(request.url)
  try {
    const fetchProductFilter = store.dispatch(
      productApi.endpoints.getProductsByHotDealFilter.initiate(
        url.searchParams.size > 0 ? url.searchParams.toString() : '_limit=9'
      )
    )
    const response = await fetchProductFilter.unwrap()
    return response
  } catch (e) {
    throw new Response('Not Found', { status: 404 })
  }
}
