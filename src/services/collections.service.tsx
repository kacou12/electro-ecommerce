import { CommonType, CollectionType } from '@/interfaces/global.interface'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const collectionApi = createApi({
  reducerPath: 'collectionApi',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
  endpoints: (builder) => ({
    getAllCollections: builder.query<CollectionType[], void>({
      query: () => `collections`
      //   Types:
    }),
    getCollectionBySlug: builder.query<CollectionType, string>({
      query: (collectionSlug) => {
        return {
          url: `collections`,
          params: {
            slug: collectionSlug
          }
        }
      },
      transformResponse: (response: CollectionType[], meta, arg) => response[0]
    })
  })
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetAllCollectionsQuery, useGetCollectionBySlugQuery } =
  collectionApi
