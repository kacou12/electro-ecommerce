import React from 'react'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import clsx from 'clsx'
import { Fragment } from 'react'
import { FaRegHeart } from 'react-icons/fa'
import { CartDropdownLine } from './cart-dropdown-line'
import { Button } from 'flowbite-react'

const links = [
  { href: '/settings', label: 'Settings' },
  { href: '/support', label: 'Support' },
  { href: '/license', label: 'License' }
]

export const CartDropdown = () => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <MenuButton>
          {({ hover, active }) => (
            <div
              className="relative flex flex-col items-center 
                text-sm 
                text-white border header-dropdown"
            >
              <span>
                <FaRegHeart
                  color={hover || active ? '#D10024' : ''}
                  size={20}
                ></FaRegHeart>
              </span>
              <p className={`text-xs ${hover || active ? 'text-primary' : ''}`}>
                Your Wishlist
              </p>
              <div
                className="absolute right-2 -top-3 inline-flex items-center justify-center w-5 h-5 text-xs
                font-thin text-white bg-primary rounded-full "
              >
                5
              </div>
            </div>
          )}
        </MenuButton>
      </div>

      <MenuItems
        transition
        className="absolute right-0 z-10 mt-2 w-80 origin-top-right 
        rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition 
        focus:outline-none data-[closed]:scale-95 data-[closed]:transform 
        data-[closed]:opacity-0 data-[enter]:duration-100 
        data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
      >
        <section
          id="scroll-design"
          className="m-4 space-y-1 h-[200px] overflow-y-scroll"
        >
          <CartDropdownLine></CartDropdownLine>
          <CartDropdownLine></CartDropdownLine>
          <CartDropdownLine></CartDropdownLine>
          <CartDropdownLine></CartDropdownLine>
          <CartDropdownLine></CartDropdownLine>
        </section>
        <section></section>
        <section></section>
        {/* <div className="py-1">
          <MenuItem>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
            >
              Account settings
            </a>
          </MenuItem>
          <MenuItem>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
            >
              Support
            </a>
          </MenuItem>
          <MenuItem>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
            >
              License
            </a>
          </MenuItem>
          <form action="#" method="POST">
            <MenuItem>
              <button
                type="submit"
                className="block w-full px-4 py-2 text-left text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
              >
                Sign out
              </button>
            </MenuItem>
          </form>
        </div> */}

        <div>
          <div className="local-cart-dropdown">
            <div className="m-4">
              <p className="text-black text-xs">3 Item(s) selected</p>
              <h4 className="font-bold text-sm">SUBTOTAL: $2940.00</h4>
            </div>
            <div className="flex ">
              <Button color="dark" className="flex-1 rounded-none">
                View Cart
              </Button>

              <Button
                color="failure"
                className="flex-1 rounded-none flex items-center justify-center"
              >
                <span>Checkout</span>
                <div className="ml-1">
                  <i className="fa fa-arrow-circle-right"></i>
                </div>
              </Button>
            </div>
          </div>
        </div>
      </MenuItems>
    </Menu>
  )
}
