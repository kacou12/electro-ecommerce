import { CommonType, CategoryType } from '@/interfaces/global.interface'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const categoryApi = createApi({
  reducerPath: 'categoryApi',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
  endpoints: (builder) => ({
    getAllCategories: builder.query<CategoryType[], void>({
      query: () => `categories`
      //   Types:
    }),
    getCategoryBySlug: builder.query<CategoryType, string>({
      query: (categorySlug) => `categories?slug=${categorySlug}`,
      transformResponse: (response: CategoryType[], meta, arg) => response[0]
    })
  })
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetAllCategoriesQuery, useGetCategoryBySlugQuery } =
  categoryApi
