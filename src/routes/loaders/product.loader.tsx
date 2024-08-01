import { collectionApi } from '@/services/collections.service'
import { productApi } from '@/services/products.service'
import { store } from '@/store'
import React from 'react'
import { defer, Params } from 'react-router'

export const productLoader = async ({ params }: { params: Params<string> }) => {
  try {
    const fetchingProduct = store.dispatch(
      productApi.endpoints.getProductBySlug.initiate(params['productSlug']!)
    )
    // const response = await fetchingProduct.unwrap()
    return defer({
      product: fetchingProduct.unwrap()
    })
  } catch (e) {
    throw new Response('Not Found', { status: 404 })
  }
}
