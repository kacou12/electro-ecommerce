import { CommentType, NullableCommentType } from '@/interfaces/global.interface'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { v4 as uuidv4 } from 'uuid'

export const commentApi = createApi({
  reducerPath: 'commentApi',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
  tagTypes: ['Comment'],
  endpoints: (builder) => ({
    getAllcomments: builder.query<CommentType[], void>({
      query: () => `comments`

      //   Types:
    }),
    getCommentsByProductSlug: builder.query<CommentType[], string>({
      query: (productSlug) => `comments?productSlug=${productSlug}`,
      providesTags: (result, error, arg) =>
        result
          ? [
              ...result.map(({ productSlug }) => ({
                type: 'Comment' as const,
                slug: productSlug
              })),
              'Comment'
            ]
          : ['Comment']
    }),
    addComment: builder.mutation<CommentType, NullableCommentType>({
      query: (payload) => {
        //format data by add id uuid , createdAt
        const formatDate: NullableCommentType = {
          ...payload,
          id: uuidv4(),
          createdAt: new Date()
        }
        return {
          url: `addcomment`,
          method: 'POST',
          body: formatDate
        }
      },
      invalidatesTags: (result, error, arg) => [
        { type: 'Comment', slug: arg.productSlug }
      ]
    })
  })
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useAddCommentMutation,
  useGetAllcommentsQuery,
  useGetCommentsByProductSlugQuery,
  useLazyGetCommentsByProductSlugQuery
} = commentApi
