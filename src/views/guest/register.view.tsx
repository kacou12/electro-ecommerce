import { RegisterForm } from '@/components/forms/register-form.component'
import GuestLayout from '@/layouts/guest.layout'

export default function Register() {
  return (
    <GuestLayout>
      <div className="w-full">
        <h3>SIGN UP</h3>

        <RegisterForm></RegisterForm>
      </div>
    </GuestLayout>
  )
}
