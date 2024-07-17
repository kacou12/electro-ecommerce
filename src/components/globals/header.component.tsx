import React from 'react'
import { IoIosCall } from 'react-icons/io'
import { FaRegHeart } from 'react-icons/fa'
import { IoCartOutline } from 'react-icons/io5'
import { CartDropdown } from '../cart/cart-dropdown'
import { Link } from 'react-router-dom'
import { RouteEnum } from '@/routes/route.enum'

export const Header = () => {
  return (
    <>
      {/* <!-- HEADER --> */}
      <header>
        {/* <!-- TOP HEADER --> */}
        <div id="top-header" className="bg-gray-900 text-white py-2 ">
          <div className=" flex justify-between items-center centerContent">
            <ul className="header-links flex space-x-4">
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
              <li>
                <a href="#" className="flex items-center">
                  <i className="fa fa-dollar mr-1"></i> USD
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center">
                  <i className="fa-regular fa-user mr-1"></i> My Account
                </a>
              </li>
            </ul>
          </div>
        </div>
        {/* <!-- /TOP HEADER --> */}

        {/* <!-- MAIN HEADER --> */}
        <div id="header" className="bg-gray-800 text-white py-4">
          {/* <!-- container --> */}
          <div className="centerContent">
            {/* <!-- row --> */}
            <div className="flex flex-wrap items-center justify-between">
              {/* <!-- LOGO --> */}
              <div className="w-full md:w-1/4 lg:w-1/6">
                <div className="header-logo">
                  <Link to={RouteEnum.DEFAULT} className="logo">
                    <img src="/img/logo.png" alt="Logo" className="h-12"></img>
                  </Link>
                </div>
              </div>
              {/* <!-- /LOGO --> */}

              {/* <!-- SEARCH BAR --> */}
              <div className="w-full md:w-1/2 lg:w-2/4">
                <div className="header-search">
                  <form className="flex items-center">
                    <select className="input-select bg-white text-gray-700 py-2 px-4 rounded-l">
                      <option value="0">All Categories</option>
                      <option value="1">Category 01</option>
                      <option value="1">Category 02</option>
                    </select>
                    <input
                      className="input bg-white text-gray-700 py-2 px-4 flex-grow"
                      placeholder="Search here"
                    />
                    <button className="search-btn bg-blue-500 text-white py-2 px-4 rounded-r">
                      Search
                    </button>
                  </form>
                </div>
              </div>
              {/* <!-- /SEARCH BAR --> */}

              {/* <!-- ACCOUNT --> */}
              <div className="w-full md:w-1/4 lg:w-1/6 flex justify-end clearfix">
                <div className="header-ctn flex items-center space-x-4">
                  {/* <!-- Wishlist --> */}

                  <div className="flex items-center ">
                    <a href="#" className=" flex flex-col items-center">
                      <FaRegHeart className=" icon" />

                      <span className="ml-2">Your Wishlist</span>
                      <div className="qty bg-red-500 text-white rounded-full px-2 ml-2">
                        2
                      </div>
                    </a>
                  </div>

                  {/* <!-- /Wishlist --> */}

                  {/* <!-- Cart --> */}
                  {/* <div className="relative dropdown">
                    <a className="dropdown-toggle  flex flex-col items-center cursor-pointer">
                      <IoCartOutline className="   icon" />

                      <span className="ml-2">Your Cart</span>
                      <div className="qty-cart bg-red-500 text-white rounded-full  ml-2">
                        3
                      </div>
                    </a>
                    <div className="cart-dropdown absolute right-0 mt-2 bg-white text-gray-700 rounded-lg shadow-lg w-64 hidden">
                      <div className="cart-list p-4">
                        <div className="product-widget flex items-center justify-between mb-4">
                          <div className="product-img w-16 h-16">
                            <img src="img/product01.png" alt="Product"></img>
                          </div>
                          <div className="product-body flex-grow ml-4">
                            <h3 className="product-name text-sm">
                              <a href="#">product name goes here</a>
                            </h3>
                            <h4 className="product-price text-sm">
                              <span className="qty">1x</span> $980.00
                            </h4>
                          </div>
                          <button className="delete text-red-500">
                            <i className="fa fa-close"></i>
                          </button>
                        </div>

                        <div className="product-widget flex items-center justify-between mb-4">
                          <div className="product-img w-16 h-16">
                            <img src="img/product02.png" alt="Product"></img>
                          </div>
                          <div className="product-body flex-grow ml-4">
                            <h3 className="product-name text-sm">
                              <a href="#">product name goes here</a>
                            </h3>
                            <h4 className="product-price text-sm">
                              <span className="qty">3x</span> $980.00
                            </h4>
                          </div>
                          <button className="delete text-red-500">
                            <i className="fa fa-close"></i>
                          </button>
                        </div>
                      </div>
                      <div className="cart-summary p-4">
                        <small className="block mb-2">3 Item(s) selected</small>
                        <h5 className="font-semibold">SUBTOTAL: $2940.00</h5>
                      </div>
                      <div className="cart-btns p-4">
                        <a
                          href="#"
                          className="block mb-2 text-center bg-gray-200 py-2 px-4 rounded"
                        >
                          View Cart
                        </a>
                        <a
                          href="#"
                          className="block text-center bg-blue-500 text-white py-2 px-4 rounded"
                        >
                          Checkout <i className="fa fa-arrow-circle-right"></i>
                        </a>
                      </div>
                    </div>
                  </div> */}

                  {/* <!-- /Cart --> */}

                  <CartDropdown></CartDropdown>

                  {/* <!-- Menu Toggle --> */}
                  <div className="menu-toggle flex items-center cursor-pointer">
                    <a href="#" className="flex items-center">
                      <i className="fa fa-bars text-xl"></i>
                      <span className="ml-2">Menu</span>
                    </a>
                  </div>
                  {/* <!-- /Menu Toggle --> */}
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
