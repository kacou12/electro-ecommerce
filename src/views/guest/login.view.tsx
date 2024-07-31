import { DataUserToken } from '@/interfaces/global.interface'
import GuestLayout from '@/layouts/guest.layout'
import { RouteEnum } from '@/routes/route.enum'
import { useAppDispatch, useAppSelector } from '@/store'
import { UserLogin } from '@/store/actions/auth.actions'
import { setCredentials } from '@/store/slices/auth.slice'
import { Button } from 'flowbite-react'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'

interface IFormInputs {
  email: string
  password: string
}

export default function Login() {
  const { loading, error, userInfo } = useAppSelector((state) => state.auth)
  const dispatch = useAppDispatch()
  const { register, handleSubmit } = useForm()
  const navigate = useNavigate()

  const submitForm = (data: any) => {
    dispatch(UserLogin(data))
  }
  return (
    <>
      <GuestLayout>
        <form onSubmit={handleSubmit(submitForm)}>
          {error && <span>{error}</span>}
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="form-input"
              {...register('email')}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-input"
              {...register('password')}
              required
            />
          </div>
          <Button type="submit" className="button">
            Login
          </Button>
        </form>
      </GuestLayout>
    </>
  )
}
