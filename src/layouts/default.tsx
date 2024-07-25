import { Footer } from '@/components/globals/footer'
import { Header } from '@/components/globals/header.component'
import { Navigation } from '@/components/globals/navigation.component'
import { Newsletter } from '@/components/globals/newsletter.component'
import React, { ReactNode } from 'react'
import { Outlet } from 'react-router'

interface TopSellingProps {
  children: React.ReactNode
}

export const DefaultLayout = ({ children }: TopSellingProps) => {
  return (
    <>
      {/* <!-- HEADER --> */}
      <Header></Header>
      {/* <!-- END HEADER --> */}
      {/* <!-- NAVIGATION --> */}
      <Navigation></Navigation>
      {/* <!-- END NAVIGATION --> */}
      {/* CHILDREN */}
      {children}
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
