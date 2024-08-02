import React from 'react'
import { useForm } from 'react-hook-form'
import { registerUser } from '@/store/actions/auth.actions'
import { useAppDispatch, useAppSelector } from '@/store'
import { Button, Spinner, TextInput } from 'flowbite-react'
import GuestLayout from '@/layouts/guest.layout'
import { Link, useNavigate } from 'react-router-dom'
import { RouteEnum } from '@/routes/route.enum'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { toast } from 'react-toastify'

const registerSchema = yup
  .object({
    firstName: yup.string().required('firstName is required'),
    lastName: yup.string().required('lastName is required'),
    email: yup.string().email().required(),
    password: yup.string().required('Password is required'),
    confirmPassword: yup
      .string()
      //@ts-ignore
      .oneOf([yup.ref('password'), null], 'Passwords must match')
  })
  .required()

export const RegisterForm = () => {
  const { loading, error, userInfo } = useAppSelector((state) => state.auth)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(registerSchema)
  })

  const submitForm = async (data: any) => {
    try {
      await dispatch(registerUser(data)).unwrap()

      toast.success('Votre compte a été crée , veuillez vous connecter', {
        onClose(props) {
          navigate(RouteEnum.LOGIN)
        }
      })
    } catch (err) {
      console.log('error ')

      toast.error('please check the information provided ')
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(submitForm)} className="mx-10 ">
        <section className="form-group">
          <label className="text-xs" htmlFor="firstName">
            First Name
          </label>
          <TextInput
            type="text"
            color={errors.firstName && 'failure'}
            className=""
            {...register('firstName')}
          />
          <div className="h-6 ">
            {errors.firstName && (
              <span className="text-xs text-primary">
                {errors.firstName?.message}
              </span>
            )}
          </div>
        </section>
        <section className="form-group">
          <label className="text-xs" htmlFor="lastName">
            Last Name
          </label>
          <TextInput
            type="text"
            className=""
            color={errors.lastName && 'failure'}
            {...register('lastName')}
          />
          <div className="h-6 ">
            {errors.lastName && (
              <span className="text-xs text-primary">
                {errors.lastName?.message}
              </span>
            )}
          </div>
        </section>
        <section className="form-group">
          <label className="text-xs" htmlFor="email">
            Email
          </label>
          <TextInput
            type="email"
            color={errors.email && 'failure'}
            className=""
            {...register('email')}
          />
          <div className="h-6 ">
            {errors.email && (
              <span className="text-xs text-primary">
                {errors.email?.message}
              </span>
            )}
          </div>
        </section>
        <section className="form-group">
          <label className="text-xs" htmlFor="password">
            Password
          </label>
          <TextInput
            type="password"
            color={errors.password && 'failure'}
            className=""
            {...register('password')}
          />
          <div className="h-6 ">
            {errors.password && (
              <span className="text-xs text-primary">
                {errors.password?.message}
              </span>
            )}
          </div>
        </section>
        <section className="form-group">
          <label className="text-xs" htmlFor="email">
            Confirm Password
          </label>
          <TextInput
            type="password"
            className=""
            color={errors.confirmPassword && 'failure'}
            {...register('confirmPassword')}
          />
          <div className="h-6 ">
            {errors.confirmPassword && (
              <span className="text-xs text-primary">
                {errors.confirmPassword?.message}
              </span>
            )}
          </div>
        </section>
        <Button
          type="submit"
          className="button w-full mx-auto  "
          disabled={loading}
        >
          {loading ? (
            <Spinner aria-label="Default status example" />
          ) : (
            'Register'
          )}
        </Button>
        <section className="flex justify-end mt-5">
          <Link to={RouteEnum.LOGIN} className="text-sm">
            Login account
          </Link>
        </section>
      </form>
    </>
  )
}
