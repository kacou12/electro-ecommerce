// ProfileScreen.js
import { useAuth } from '@/hooks/useAuth'
import { useGetUserDetailsQuery } from '@/services/auth.service'
import { useAppDispatch, useAppSelector } from '@/store'
import { setCredentials } from '@/store/slices/auth.slice'
import { useEffect } from 'react'

const Profile = () => {
  const { getUser } = useAuth()

  return (
    <div>
      <figure>{getUser()!.email.charAt(0).toUpperCase()}</figure>
      <span>
        Welcome <strong>{getUser()!.email}!</strong> You can view this page
        because you're logged in
      </span>
    </div>
  )
}
export default Profile
