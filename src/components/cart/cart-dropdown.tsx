import { cartsSelectors } from '@/store/slices/cart.slice'
import { Menu, MenuButton, MenuItems } from '@headlessui/react'
import { Button } from 'flowbite-react'
import { FaRegHeart } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { CartDropdownLine } from './cart-dropdown-line'
import { formatPrice } from '@/utils/index.utils'
import { useCart } from '@/hooks/useCart'
import { CartType } from '@/interfaces/global.interface'
import { IoCartOutline } from 'react-icons/io5'

export const CartDropdown = () => {
  const { carts, subTotalCarts } = useCart()
  return (
    <Menu as="div" className="relative inline-block text-left ">
      <div>
        <MenuButton>
          {({ hover, active }) => (
            <div
              className="relative flex flex-col items-center 
                text-sm 
                text-white header-dropdown"
            >
              <span>
                <IoCartOutline
                  color={hover || active ? '#D10024' : ''}
                  size={20}
                ></IoCartOutline>
              </span>
              <p className={`text-xs ${hover || active ? 'text-primary' : ''}`}>
                Your Cart
              </p>
              {carts.length > 0 && (
                <div
                  className="absolute right-1 -top-3 inline-flex items-center justify-center w-5 h-5 text-xs
                font-thin text-white bg-primary rounded-full "
                >
                  {carts.length}
                </div>
              )}
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
        {carts.length == 0 ? (
          <div className="h-40 flex flex-col justify-center items-center">
            <img src="/img/empty_cart.png" className="h-20 w-20 " alt="" />
            <p className="text-gray-500 text-sm">Your cart is empty</p>
          </div>
        ) : (
          <>
            <section
              id="scroll-design"
              className={`m-4 space-y-1 ${
                carts.length >= 4 && 'h-[200px] overflow-y-scroll'
              }`}
            >
              {carts.map((cartLine) => {
                return (
                  <CartDropdownLine
                    cartLine={cartLine}
                    key={cartLine.id}
                  ></CartDropdownLine>
                )
              })}
            </section>

            <div>
              <div className="local-cart-dropdown">
                <div className="m-4">
                  <p className="text-black text-xs">
                    {carts.length} Item(s) selected
                  </p>
                  <h4 className="font-bold text-sm">
                    SUBTOTAL: {formatPrice(subTotalCarts())}
                  </h4>
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
          </>
        )}
      </MenuItems>
    </Menu>
  )
}
