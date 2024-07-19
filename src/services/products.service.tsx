import {
  CommonFilter,
  PaginateData,
  ProductType,
  QueryData
} from '@/interfaces/global.interface'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const productApi = createApi({
  reducerPath: 'productApi',

  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),

  endpoints: (builder) => ({
    getProductBySlug: builder.query<ProductType, string>({
      query: (slug) => `products/?slug=${slug}`,

      transformResponse: (response: ProductType[], meta, arg) => response[0]
      //   Types:
    }),
    getAllProducts: builder.query<ProductType[], void>({
      query: () => `products?_limit=1`
      //   Types:
    }),
    getSearchLimitedProducts: builder.query<PaginateData<ProductType>, string>({
      query: (search) => `products?title_like=${search}&_limit=9&_page=1`,
      transformResponse: (response: ProductType[], meta, arg) => {
        return {
          data: response,
          count: Number(meta!.response!.headers.get('X-Total-Count'))
        }
      }
      //   Types:
    }),
    getSearchProducts: builder.query<PaginateData<ProductType>, string>({
      query: (search) => {
        if (search.includes('_limit')) {
          return `products?${search}`
        }
        return `products?${search}&_limit=9`
      },
      transformResponse: (response: ProductType[], meta, arg) => {
        return {
          data: response,
          count: Number(meta!.response!.headers.get('X-Total-Count'))
        }
      }
      //   Types:
    }),
    getProductsByCollectionSlug: builder.query<ProductType[], string>({
      query: (slugCategory) => `products?category.slug=${slugCategory}`

      //   Types:
    }),
    getProductsByCollectionFilter: builder.query<
      PaginateData<ProductType>,
      QueryData
    >({
      query: (data) => {
        return `products?collection.slug=${data.params}&${data.searchParams}`
      },
      transformResponse: (response: ProductType[], meta, arg) => {
        return {
          data: response,
          count: Number(meta!.response!.headers.get('X-Total-Count'))
        }
      }
    }),
    getProductsByCategoryFilter: builder.query<
      PaginateData<ProductType>,
      QueryData
    >({
      query: (data) => {
        return `products?category.slug=${data.params}&${data.searchParams}`
      },
      transformResponse: (response: ProductType[], meta, arg) => {
        return {
          data: response,
          count: Number(meta!.response!.headers.get('X-Total-Count'))
        }
      }
    }),
    getProductsByHotDealFilter: builder.query<
      PaginateData<ProductType>,
      string
    >({
      query: (searchParams) => {
        return `products?reduction=60&reduction=70&reduction=808reduction=90&${searchParams}`
      },
      transformResponse: (response: ProductType[], meta, arg) => {
        return {
          data: response,
          count: Number(meta!.response!.headers.get('X-Total-Count'))
        }
      }
    }),
    getNewProductsByCollectionSlug: builder.query<ProductType[], string>({
      extraOptions: {},
      query: (slugCollection) =>
        `products?_limit=10&collection.slug=${slugCollection}`
    }),
    getTopSellingProductsByCollectionSlug: builder.query<ProductType[], string>(
      {
        extraOptions: {},
        query: (slugCollection) =>
          `products?rating_gte=4&_limit=10&collection.slug=${slugCollection}`
      }
    ),
    getTopSellingProductsByCategorySlug: builder.query<ProductType[], string>({
      extraOptions: {},

      query: (slugCategory) =>
        `products?rating_gte=4&_limit=10&category.slug=${slugCategory}`
      // transformResponse: (response: ProductType[], meta, arg) =>
      //   shuffle(response).slice(1, 11)
    })
  })
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetNewProductsByCollectionSlugQuery,
  useGetProductsByCollectionFilterQuery,
  useGetProductBySlugQuery,
  useGetProductsByCategoryFilterQuery,
  useGetAllProductsQuery,
  useGetSearchLimitedProductsQuery,
  useGetSearchProductsQuery,
  useLazyGetSearchLimitedProductsQuery,
  useGetProductsByHotDealFilterQuery,
  useGetTopSellingProductsByCategorySlugQuery,
  useGetTopSellingProductsByCollectionSlugQuery,
  useGetProductsByCollectionSlugQuery,
  useLazyGetProductsByCollectionSlugQuery
} = productApi
