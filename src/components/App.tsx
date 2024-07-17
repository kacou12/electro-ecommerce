import { Navigation } from '@/components/globals/navigation.component'
import { Newsletter } from '@/components/globals/newsletter.component'
import React, { ReactNode } from 'react'
import { Outlet } from 'react-router'
import { Header } from './globals/header.component'
import { Footer } from './globals/footer'
import { Breadcrumbs } from './globals/breadcrumbs.component'
import { useGetAllCollectionsQuery } from '@/services/collections.service'
import { ScrollRestoration } from 'react-router-dom'

export default function App() {
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
      <Breadcrumbs></Breadcrumbs>
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
