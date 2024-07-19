import { Navigation } from '@/components/globals/navigation.component'
import { Newsletter } from '@/components/globals/newsletter.component'
import { RouteEnum } from '@/routes/route.enum'
import { Outlet, useLocation } from 'react-router'
import { ScrollRestoration } from 'react-router-dom'
import { Breadcrumbs } from './globals/breadcrumbs.component'
import { Footer } from './globals/footer'
import { Header } from './globals/header.component'

export default function App() {
  const { pathname } = useLocation()
  return (
    <>
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
