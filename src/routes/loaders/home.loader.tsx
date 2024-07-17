import { collectionApi } from '@/services/collections.service'
import { productApi } from '@/services/products.service'
import { store } from '@/store'
import React from 'react'
import { Params } from 'react-router'

export const homeLoader = async ({ params }: { params: Params<string> }) => {
  try {
    const fetchAllCollections = store.dispatch(
      collectionApi.endpoints.getAllCollections.initiate()
    )

    const response = await Promise.all([fetchAllCollections.unwrap()])

    return response[0]
  } catch (e) {
    throw new Response('Not Found', { status: 404 })
  }
}
