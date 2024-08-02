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
      lastName,
      email,
      password
    }: { firstName: string; lastName: string; email: string; password: string },
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
        {
          firstName,
          lastName,
          email,
          password
        },
        config
      )
    } catch (err) {
      console.log(err)

      const error = err as AxiosError

      return rejectWithValue(error.message)
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
