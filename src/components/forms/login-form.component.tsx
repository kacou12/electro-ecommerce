import { RouteEnum } from '@/routes/route.enum'
import { useAppDispatch } from '@/store'
import { UserLogin } from '@/store/actions/auth.actions'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Spinner, TextInput } from 'flowbite-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import * as yup from 'yup'
const loginschema = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().min(8).required()
  })
  .required()

export const LoginForm = () => {
  const dispatch = useAppDispatch()
  const [isLoading, setIsLoading] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(loginschema)
  })

  const submitForm = async (data: any) => {
    setIsLoading(() => true)
    try {
      await dispatch(UserLogin(data)).unwrap()
    } catch (err) {
      toast.error('Incorrect email or password')
    } finally {
      setIsLoading(() => false)
    }
  }
  return (
    <>
      <form onSubmit={handleSubmit(submitForm)} className="mx-10 space-y-1">
        <section>
          <label htmlFor="email" className="text-xs">
            Email
          </label>
          <TextInput
            type="email"
            className=""
            color={errors.email && 'failure'}
            placeholder="example@example.com"
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

        <section>
          <label htmlFor="password" className="text-xs">
            Password
          </label>
          <TextInput
            type="password"
            placeholder="*********"
            color={errors.password && 'failure'}
            className=""
            {...register('password', { required: true })}
          />
          <div className="h-6">
            {errors.password && (
              <span className="text-xs text-primary">
                {errors.password?.message}
              </span>
            )}
          </div>
        </section>
        <Button
          type="submit"
          className="button w-full mx-auto  mt-8"
          disabled={isLoading}
        >
          {isLoading ? (
            <Spinner aria-label="Default status example" />
          ) : (
            'Login'
          )}
        </Button>
        <div className="flex justify-end mt-5">
          <Link to={RouteEnum.REGISTER} className="text-sm">
            Create account
          </Link>
        </div>
      </form>
    </>
  )
}
