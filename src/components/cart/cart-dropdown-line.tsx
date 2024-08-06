import { useCart } from '@/hooks/useCart'
import { useCartLine } from '@/hooks/useCartLine'
import { CartType } from '@/interfaces/global.interface'
import { formatPrice, formatReductPrice, pause } from '@/utils/index.utils'
import { Transition } from '@headlessui/react'
import { useState } from 'react'

export const CartDropdownLine = ({ cartLine }: { cartLine: CartType }) => {
  const { removeCartLine } = useCartLine(cartLine.id)
  const time = 700
  const [open, setOpen] = useState(true)
  const goRemove = async () => {
    setOpen(() => false)
    await pause(time + 100)
    removeCartLine()
  }
  return (
    <>
      <Transition show={open}>
        <section
          className={`transition duration-${time} ease-in data-[closed]:opacity-0`}
        >
          <div className="product-widget border">
            <div className="product-img">
              <img src={cartLine.product.images[0]} alt="" />
            </div>
            <div className="product-body">
              <h3 className="product-name">
                <a href="#" className="line-clamp-2">
                  {cartLine.product.title}
                </a>
              </h3>
              <h4 className="product-price">
                <span className="qty">{cartLine.quantity} x</span>
                {cartLine.product.reduction
                  ? formatReductPrice(cartLine.product)
                  : formatPrice(cartLine.product.price)}
              </h4>
            </div>
            <button className="delete" onClick={goRemove}>
              <i className="fa fa-close"></i>
            </button>
          </div>
        </section>
      </Transition>
    </>
  )
}
