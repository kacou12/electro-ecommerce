import GuestLayout from '@/layouts/guest.layout'
import { RouteEnum } from '@/routes/route.enum'
import { useAppDispatch, useAppSelector } from '@/store'
import { UserLogin } from '@/store/actions/auth.actions'
import { Button, Spinner, TextInput } from 'flowbite-react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { toast } from 'react-toastify'
import { LoginForm } from '@/components/forms/login-form.component'

interface IFormInputs {
  email: string
  password: string
}

const loginschema = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().min(8).required()
  })
  .required()

export default function Login() {
  const { loading, error, userInfo } = useAppSelector((state) => state.auth)
  const dispatch = useAppDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(loginschema)
  })

  const submitForm = async (data: any) => {
    try {
      await dispatch(UserLogin(data)).unwrap()
    } catch (err) {
      console.log('error login')
      toast.error('Incorrect email or password')
    }
  }
  return (
    <>
      <GuestLayout>
        <div className="w-full ">
          <h3>SIGN IN</h3>

          <LoginForm></LoginForm>
        </div>
      </GuestLayout>
    </>
  )
}
