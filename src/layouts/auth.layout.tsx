import { Navigation } from '@/components/globals/navigation.component'
import { RouteEnum } from '@/routes/route.enum'
import { useAppSelector } from '@/store'
import { Navigate, Outlet, useLocation } from 'react-router'
import { ScrollRestoration } from 'react-router-dom'

import { Bounce, ToastContainer } from 'react-toastify'

import { Breadcrumbs } from '@/components/globals/breadcrumbs.component'
import { Newsletter } from '@/components/globals/newsletter.component'
import { Footer } from '@/components/globals/footer'
import { Header } from '@/components/globals/header.component'
import { useAuth } from '@/hooks/useAuth'

export default function AuthLayout() {
  const { pathname } = useLocation()
  const { isAuth } = useAuth()

  if (!isAuth()) {
    return <Navigate to={RouteEnum.LOGIN} replace />
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
      {/* <!-- HEADER --> */}
      <Header></Header>
      {/* <!-- END HEADER --> */}

      {/* <!-- NAVIGATION --> */}
      <Navigation></Navigation>
      {/* <!-- END NAVIGATION --> */}

      {/* BREADCRUMB */}
      {pathname != RouteEnum.DEFAULT && <Breadcrumbs></Breadcrumbs>}
      {/* END BREADCRUMB */}

      {/* CHILDREN */}
      <Outlet></Outlet>
      {/* END CHILDREN */}
      {/* <!-- NEWSLETTER --> */}
      <Newsletter></Newsletter>
      {/* <!-- END NEWSLETTER --> */}
      {/* <!-- FOOTER --> */}
      <Footer></Footer>
      {/* <!-- END FOOTER --> */}
    </>
  )
}
