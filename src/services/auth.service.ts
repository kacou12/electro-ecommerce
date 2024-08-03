import { DataUserToken, User } from '@/interfaces/global.interface'
import { RootState } from '@/store'
import { pause } from '@/utils/index.utils'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError
} from '@reduxjs/toolkit/query'
import { logout, setRefreshToken } from '@/store/slices/auth.slice'

const baseQuery = fetchBaseQuery({
  // base url of backend API
  baseUrl: import.meta.env.VITE_BASE_URL,
  // prepareHeaders is used to configure the header of every request and gives access to getState which we use to include the token from the store
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.userToken
    if (token) {
      // include token in req header
      headers.set('authorization', `Bearer ${token}`)
      return headers
    }
  }
})

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions)

  if (result.error && result.error.status === 401) {
    // try to get a new token
    const refreshResult = await baseQuery('/refreshToken', api, extraOptions)

    if (refreshResult.data) {
      const refreshToken = refreshResult.data as { accessToken: string }
      // store the new token in the store or wherever you keep it
      api.dispatch(setRefreshToken(refreshToken))
      // retry the initial query
      result = await baseQuery(args, api, extraOptions)
    } else {
      // refresh failed - do something like redirect to login or show a "retry" button
      api.dispatch(logout())
    }
  }
  return result
}

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['User'],
  endpoints: (builder) => ({
    getUserDetails: builder.query<User, undefined>({
      query: () => ({
        url: `user-data`,
        method: 'GET'
      }),
      providesTags: ['User']
    }),
    toggleFavoriteProduct: builder.mutation<void, string>({
      query: (productSlug) => ({
        url: `favorite`,
        method: 'POST',
        body: {
          productSlug
        }
      }),
      invalidatesTags: ['User']
    })
  })
})

// export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetUserDetailsQuery,
  useToggleFavoriteProductMutation,
  useLazyGetUserDetailsQuery
} = authApi
