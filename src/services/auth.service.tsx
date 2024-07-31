import { DataUserToken, User } from '@/interfaces/global.interface'
import { RootState } from '@/store'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
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
  }),
  endpoints: (builder) => ({
    getUserDetails: builder.query<DataUserToken, string>({
      query: (userId) => ({
        url: `600/users/${userId}`,
        method: 'GET'
      })
    })
  })
})

// export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetUserDetailsQuery } = authApi
