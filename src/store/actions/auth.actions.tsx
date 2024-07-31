// authActions.js
import axios, { AxiosError } from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { DataUserToken } from '@/interfaces/global.interface'

type ReturnedType = any // The type of the return of the thunk
type ThunkArg = { email: string; password: string }

export const registerUser = createAsyncThunk(
  'auth/register',
  async (
    {
      firstName,
      email,
      password
    }: { firstName: string; email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      }
      await axios.post<DataUserToken>(
        `${import.meta.env.VITE_BASE_URL}register`,
        { firstName, email, password },
        config
      )
    } catch (error) {
      // return custom error message from backend if present
      //   if (error.response && error.response.data.message) {
      //     return rejectWithValue(error.response.data.message)
      //   } else {
      //     return rejectWithValue(error.message)
      //   }
    }
  }
)

export const UserLogin = createAsyncThunk<ReturnedType, ThunkArg>(
  '/users/authentication',
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      // configure header's Content-Type as JSON
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      }
      const { data } = await axios.post<DataUserToken>(
        `${import.meta.env.VITE_BASE_URL}login`,
        { email, password },
        config
      )
      // store user's token in local storage
      localStorage.setItem('userToken', data.accessToken)

      return data
    } catch (err) {
      console.log(err)

      const error = err as AxiosError

      return rejectWithValue(error.message)
    }
  }
)
