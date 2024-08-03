import { collectionApi } from '@/services/collections.service'
import { store } from '@/store'
import { Params } from 'react-router'

export const homeLoader = async ({ params }: { params: Params<string> }) => {
  try {
    const fetchAllCollections = store.dispatch(
      collectionApi.endpoints.getAllCollections.initiate()
    )

    const response = await fetchAllCollections.unwrap()
    return response
  } catch (e) {
    throw new Response('Not Found', { status: 404 })
  }
}
