// ProfileScreen.js
import { useGetUserDetailsQuery } from '@/services/auth.service'
import { useAppDispatch, useAppSelector } from '@/store'
import { setCredentials } from '@/store/slices/auth.slice'
import { useEffect } from 'react'

const Profile = () => {
  const { userInfo } = useAppSelector((state) => state.auth)
  const dispatch = useAppDispatch()
  const { data, isFetching } = useGetUserDetailsQuery(userInfo!.user.id, {
    pollingInterval: 900000 // 15mins
  })
  useEffect(() => {
    if (data) dispatch(setCredentials(data))
  }, [data, dispatch])

  return (
    <div>
      <figure>{userInfo?.user.email.charAt(0).toUpperCase()}</figure>
      <span>
        Welcome <strong>{userInfo?.user.email}!</strong> You can view this page
        because you're logged in
      </span>
    </div>
  )
}
export default Profile
