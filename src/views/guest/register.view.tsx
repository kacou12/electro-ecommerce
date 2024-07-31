import { useForm } from 'react-hook-form'
import { registerUser } from '@/store/actions/auth.actions'
import { useAppDispatch, useAppSelector } from '@/store'
import { Spinner } from 'flowbite-react'
import GuestLayout from '@/layouts/guest.layout'

export default function Register() {
  const { loading, userInfo, error, success } = useAppSelector(
    (state) => state.auth
  )
  const dispatch = useAppDispatch()
  const { register, handleSubmit } = useForm()

  // {firstName: string, email: string, password:string, confirmPassword:string}

  // const submitForm = (data: any) => {
  const submitForm = (data: any) => {
    console.log('data submti: ', data)

    // // check if passwords match
    // if (data.password !== data.confirmPassword) {
    //   alert('Password mismatch')
    // }
    // // transform email string to lowercase to avoid case sensitivity issues in login
    // data.email = data.email.toLowerCase()
    // dispatch(registerUser(data))
  }
  return (
    <GuestLayout>
      <form onSubmit={handleSubmit(submitForm)}>
        {error && <span>{error}</span>}
        <div className="form-group">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            className="form-input"
            {...register('firstName')}
            required
          />
        </div>
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
        <div className="form-group">
          <label htmlFor="email">Confirm Password</label>
          <input
            type="password"
            className="form-input"
            {...register('confirmPassword')}
            required
          />
        </div>
        <button type="submit" className="button" disabled={loading}>
          {loading ? (
            <Spinner aria-label="Default status example" />
          ) : (
            'Register'
          )}
        </button>
      </form>
    </GuestLayout>
  )
}
