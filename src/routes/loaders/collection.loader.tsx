import { collectionApi } from '@/services/collections.service'
import { productApi } from '@/services/products.service'
import { store } from '@/store'
import React from 'react'
import { Params } from 'react-router'

export const collectionLoader = async ({
  params,
  request
}: {
  request: Request
  params: Params<string>
}) => {
  const url = new URL(request.url)
  try {
    const fetchingCollection = store.dispatch(
      collectionApi.endpoints.getCollectionBySlug.initiate(
        params['collectionSlug']!
      )
    )

    // const fetchProductFilter = store.dispatch(
    //   productApi.endpoints.getProductsByCollectionFilter.initiate({
    //     params: params['collectionSlug']!,
    //     searchParams:
    //       url.searchParams.size > 0 ? url.searchParams.toString() : '_limit=9'
    //   })
    // )
    const response = await Promise.all([
      // fetchProductFilter.unwrap(),
      fetchingCollection.unwrap()
    ])
    return response
  } catch (e) {
    throw new Response('Not Found', { status: 404 })
  }
}
