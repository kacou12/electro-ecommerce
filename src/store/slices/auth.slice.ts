import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '..'
import axios, { AxiosError } from 'axios'
import { registerUser, UserLogin } from '../actions/auth.actions'
import { DataUserToken, User, UserState } from '@/interfaces/global.interface'

// initialize userToken from local storage
const userToken = localStorage.getItem('userToken')
  ? localStorage.getItem('userToken')
  : null

const initialState: UserState = {
  loading: false,
  userInfo: null as User | null, // for user object
  userToken: null as string | null, // for storing the JWT
  error: null as any | null,
  success: false // for monitoring the registration process.
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem('userToken') // deletes token from storage
      state.loading = false
      state.userInfo = null
      state.userToken = null
      state.error = null
    },
    setCredentials: (state, { payload }: { payload: User }) => {
      state.userInfo = payload
    },
    setRefreshToken: (
      state,
      { payload }: { payload: { accessToken: string } }
    ) => {
      state.userToken = payload.accessToken
    }
  },

  extraReducers: (builder) => {
    // CASE REGISTER
    builder.addCase(registerUser.pending, (state, action) => {
      state.loading = true
      state.error = null
    }),
      builder.addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
      }),
      builder.addCase(registerUser.rejected, (state, { payload }) => {
        state.loading = false
        state.error = payload
      })

    // CASE LOGIN
    builder.addCase(UserLogin.pending, (state, action) => {
      state.loading = true
      state.error = null
    }),
      builder.addCase(
        UserLogin.fulfilled,
        (state, { payload }: { payload: DataUserToken }) => {
          state.loading = false
          state.userInfo = payload.user
          state.userToken = payload.accessToken
        }
      ),
      builder.addCase(UserLogin.rejected, (state, { payload }) => {
        state.loading = false
        state.error = payload
      })
  }
})

export const { logout, setCredentials, setRefreshToken } = authSlice.actions
export const authReducer = authSlice.reducer
