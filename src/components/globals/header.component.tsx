import React from 'react'
import { IoIosCall } from 'react-icons/io'
import { FaRegHeart } from 'react-icons/fa'
import { IoCartOutline } from 'react-icons/io5'
import { CartDropdown } from '../cart/cart-dropdown'
import { Link } from 'react-router-dom'
import { RouteEnum } from '@/routes/route.enum'
import { SearchBar } from '../searchbar'
import { useSelector } from 'react-redux'
import { cartsSelectors } from '@/store/slices/cart.slice'
import { ProfileDropdown } from '../profile-dropdown'
import { useAuth } from '@/hooks/useAuth'

export const Header = () => {
  const { isAuth, favorites } = useAuth()
  return (
    <>
      {/* <!-- HEADER --> */}
      <header>
        {/* <!-- TOP HEADER --> */}
        <div id="top-header" className="bg-gray-900 text-white py-2 ">
          <div className=" flex md:justify-between items-center centerContent flex-wrap justify-start  ">
            <ul className="header-links flex space-x-4  flex-wrap">
              <li>
                <a href="#" className="flex items-center">
                  <IoIosCall className="text-primary mr-1" /> +021-95-51-84
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center">
                  <i className="fa fa-envelope mr-1"></i> email@email.com
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center">
                  <i className="fa-solid fa-location-dot mr-1"></i> 1734
                  Stonecoal Road
                </a>
              </li>
            </ul>
            <ul className="header-links flex space-x-4">
              {/* login */}
              {!isAuth() && (
                <>
                  <li>
                    <Link to={RouteEnum.LOGIN} className="flex items-center">
                      <i className="fa fa-right-to-bracket mr-1"></i> sign in
                    </Link>
                  </li>
                  {/* register */}
                  <li>
                    <Link to={RouteEnum.REGISTER} className="flex items-center">
                      <i className="fa-solid fa-registered mr-1"></i> sign up
                    </Link>
                  </li>
                </>
              )}

              {isAuth() && <ProfileDropdown></ProfileDropdown>}
            </ul>
          </div>
        </div>
        {/* <!-- /TOP HEADER --> */}

        {/* <!-- MAIN HEADER --> */}
        <div id="header" className="bg-gray-800 text-white py-4">
          {/* <!-- container --> */}
          <div className="centerContent ">
            {/* <!-- row --> */}
            <div className="flex flex-wrap items-center justify-between">
              {/* <!-- LOGO --> */}
              <div className="w-full md:w-1/4 lg:w-[30%]">
                <div className="header-logo">
                  <Link to={RouteEnum.DEFAULT} className="logo">
                    <img src="/img/logo.png" alt="Logo" className="h-12"></img>
                  </Link>
                </div>
              </div>
              {/* <!-- /LOGO --> */}

              {/* <!-- SEARCH BAR --> */}
              <div className="w-full md:w-1/2 lg:w-[45%]">
                <SearchBar></SearchBar>
              </div>
              {/* <!-- /SEARCH BAR --> */}

              {/* <!-- ACCOUNT --> */}
              <div className="w-full md:w-1/4 lg:w-[25%] flex  justify-center md:justify-end clearfix">
                <div className="header-ctn flex items-center space-x-8">
                  {/* <!-- Wishlist --> */}

                  <div className="flex items-center  relative">
                    <a
                      href="#"
                      className=" flex flex-col items-center text-white"
                    >
                      <FaRegHeart size={20} />

                      <span className="ml-2 text-center">Your Wishlist</span>
                      {isAuth() && favorites()!.length > 0 && (
                        <div className="absolute right-4 -top-3 inline-flex items-center justify-center w-5 h-5 text-xs font-thin text-white bg-primary rounded-full ">
                          {favorites()!.length}
                        </div>
                      )}
                    </a>
                  </div>

                  <CartDropdown></CartDropdown>
                </div>
              </div>
              {/* <!-- /ACCOUNT --> */}
            </div>
            {/* <!-- /row --> */}
          </div>
          {/* <!-- /container --> */}
        </div>
        {/* <!-- /MAIN HEADER --> */}
      </header>
      {/* <!-- /HEADER --> */}
    </>
  )
}
