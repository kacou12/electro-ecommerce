import { Navigation } from '@/components/globals/navigation.component'
import { Newsletter } from '@/components/globals/newsletter.component'
import { RouteEnum } from '@/routes/route.enum'
import { Outlet, useLocation } from 'react-router'
import { ScrollRestoration } from 'react-router-dom'
import { Breadcrumbs } from './globals/breadcrumbs.component'
import { Footer } from './globals/footer'
import { Header } from './globals/header.component'
import { ToastContainer, Bounce } from 'react-toastify'

export default function App() {
  const { pathname } = useLocation()
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
      ></ToastContainer>
      {/* Same as */}
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
      <div className="min-h-[calc(100vh-225px)] ">
        <Outlet></Outlet>
      </div>
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
