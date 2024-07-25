import { useCart } from '@/hooks/useCart'
import { ProductType } from '@/interfaces/global.interface'
import { useUpdate } from '@reactuses/core'
import { Transition } from '@tailwindui/react'
import { Button } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { IoMdAdd, IoMdRemove } from 'react-icons/io'

export const AddToCartForm = ({ product }: { product: ProductType }) => {
  const {
    increaseQuantityCartLine,
    decreaseOrRemoveFromCart,
    isInCart,
    addToCart,
    getCartLineFromProduct: currentCartLine
  } = useCart()
  const [quantity, setQuantity] = useState(1)
  const decreaseQty = () => {
    if (quantity > 0) {
      setQuantity((qty) => qty - 1)
    }
  }
  const increaseQty = () => {
    setQuantity((qty) => qty + 1)
  }

  useEffect(() => {
    if (!isInCart({ product })) {
      setQuantity(() => 1)
    }
  }, [isInCart({ product })])

  return (
    <>
      {isInCart({ product }) ? (
        <section className="flex items-center mt-5">
          <div className="increase-qty">
            <Button
              onClick={() => decreaseOrRemoveFromCart({ product })}
              className="w-8 h-8 rounded-md flex justify-center items-center"
            >
              <IoMdRemove className="w-6 h-6" />
            </Button>
          </div>

          <div>
            <span className="product-qty px-4 font-bold">
              {currentCartLine({ product })!.quantity}
            </span>
          </div>
          <div className="decrease-qty ">
            <Button
              onClick={() => increaseQuantityCartLine({ product })}
              className="w-8 h-8 rounded-md flex justify-center items-center"
            >
              <IoMdAdd className="w-6 h-6 text-white" />
            </Button>
          </div>
        </section>
      ) : (
        <div className="add-to-cart mt-5">
          <div className="qty-label">
            Qty
            <div className="input-number">
              <input type="number" disabled value={quantity} />
              <span className="qty-up" onClick={increaseQty}>
                +
              </span>
              <span
                className={`qty-down ${' cursor-not-allowed'}`}
                onClick={decreaseQty}
              >
                -
              </span>
            </div>
          </div>
          <button
            onClick={() => addToCart({ product, quantity })}
            disabled={quantity == 0}
            className="add-to-cart-btn "
          >
            <i className="fa fa-shopping-cart"></i> add to cart
          </button>
        </div>
      )}
    </>
  )
}
