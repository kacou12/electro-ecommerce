import { RouteEnum } from '@/routes/route.enum'
import { useAppSelector } from '@/store'
import { Navigate, Outlet, useLocation } from 'react-router'
import { ScrollRestoration } from 'react-router-dom'
import { Bounce, ToastContainer } from 'react-toastify'

export default function GuestLayout({
  children
}: {
  children: React.ReactNode
}) {
  const { loading, error, userInfo } = useAppSelector((state) => state.auth)

  const isAuth = () => {
    return userInfo ? true : false
  }

  if (isAuth()) {
    return <Navigate to={RouteEnum.PROFIL} replace />
  }
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce}
      />
      {/* Same as */}
      <ToastContainer />
      <ScrollRestoration />

      {/* CHILDREN */}
      {children}
      {/* END CHILDREN */}
    </>
  )
}
