import React, { createContext, ReactNode, useContext } from 'react'
import { useState } from 'react'
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle
} from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import { useToggleFavoriteProductMutation } from '@/services/auth.service'
import { Button, Spinner } from 'flowbite-react'
import { useAuth } from '@/hooks/useAuth'
import { ProductType } from '@/interfaces/global.interface'
import { useToggle } from '@reactuses/core'

export const FavoriteContext = createContext<{
  toggleFavoriteProduct: () => Promise<void>
  on: boolean
} | null>(null)

export function useFavoriteContext() {
  return useContext(FavoriteContext)
}

export const FavoriteActions = ({
  product,
  children
}: {
  product: ProductType
  children: ReactNode
}) => {
  const [open, setOpen] = useState(false)
  const { isFavorite, isAuth } = useAuth()
  const [on, toggle] = useToggle(isFavorite(product.id))
  const [initToggleFavorite, { isSuccess, isLoading }] =
    useToggleFavoriteProductMutation()
  const toggleFavoriteProduct = async () => {
    if (!isAuth()) {
      return setOpen(() => true)
    }
    toggle()
    try {
      await initToggleFavorite(product.slug).unwrap()
    } catch (error) {
      console.log(error)
      toggle()
    }
  }

  return (
    <>
      <FavoriteContext.Provider
        value={{
          on,
          toggleFavoriteProduct
        }}
      >
        {children}
      </FavoriteContext.Provider>

      {/* <button onClick={toggleFavoriteProduct} className="add-to-wishlist">
        {showIcon()}
      </button> */}
      <Dialog open={open} onClose={setOpen} className="relative z-10">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className={clsx(
                'relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl ',
                'transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0',
                'data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out',
                'data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0',
                'data-[closed]:sm:scale-95 p-8'
              )}
            >
              {/* CONTENT */}
              <div className="bg-white px-4 pb-4 ">
                <div className="flex flex-col items-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100 ">
                    <ExclamationTriangleIcon
                      aria-hidden="true"
                      className="h-6 w-6 text-red-600"
                    />
                  </div>
                  <div className="mt-3 text-center">
                    <DialogTitle
                      as="h3"
                      className="text-base font-semibold leading-6 text-gray-900"
                    >
                      need to be connected
                    </DialogTitle>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500 ">
                        Sorry, you must have an account and be logged in to be
                        able to like an article.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <Button
                type="button"
                onClick={() => setOpen(false)}
                className=" w-full"
              >
                Go to login page
              </Button>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  )
}
