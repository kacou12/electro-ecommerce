import React from 'react'
import { useState } from 'react'
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
  TransitionChild
} from '@headlessui/react'
import { HiMenuAlt1 } from 'react-icons/hi'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { Button } from 'flowbite-react'
import { LuMenu } from 'react-icons/lu'
import { RouteEnum } from '@/routes/route.enum'
import { Link } from 'react-router-dom'

export const Drawer = () => {
  const [open, setOpen] = useState(false)
  return (
    <>
      {/* <Button outline pill onClick={() => setOpen(() => true)}>
        <HiMenuAlt1 size={15} />
      </Button> */}
      <div
        className="cursor-pointer p-1 bg-red-700 hover:scale-125 transition-all duration-300 "
        onClick={() => setOpen(() => true)}
      >
        <LuMenu size={20} />
      </div>

      <Dialog open={open} onClose={setOpen} className="relative z-10">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity duration-500 ease-in-out data-[closed]:opacity-0"
        />

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <DialogPanel
                transition
                className="pointer-events-auto relative w-96 max-w-md transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700"
              >
                <TransitionChild>
                  <div className="absolute left-0 top-0 -ml-8 flex pr-2 pt-4 duration-500 ease-in-out data-[closed]:opacity-0 sm:-ml-10 sm:pr-4">
                    <button
                      type="button"
                      onClick={() => setOpen(false)}
                      className="relative rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                    >
                      <span className="absolute -inset-2.5" />
                      <span className="sr-only">Close panel</span>
                      <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                    </button>
                  </div>
                </TransitionChild>
                <div className="flex h-full flex-col  bg-black py-6 shadow-xl">
                  <div className="px-4 sm:px-6">
                    <DialogTitle className="text-base font-semibold leading-6 text-white">
                      <Link to={RouteEnum.DEFAULT} className="logo">
                        <img
                          src="/img/logo.png"
                          alt="Logo"
                          className="h-12"
                        ></img>
                      </Link>
                    </DialogTitle>
                  </div>
                  <div className="relative mt-6 flex-1 px-4 sm:px-6">
                    <nav id="navigation" className="h-fit">
                      {/* <!-- container --> */}
                      <div className="container">
                        {/* <!-- responsive-nav --> */}
                        <div id="responsive-nav">
                          {/* <!-- NAV --> */}
                          <ul className="main-nav  bg-green-600">
                            <li className="border py-2">
                              <a href="#" className="text-white">
                                Home
                              </a>
                            </li>
                            <li className="border py-2">
                              <a href="#" className="text-white">
                                Hot Deals
                              </a>
                            </li>
                            <li className="border py-2">
                              <a href="#" className="text-white">
                                Categories
                              </a>
                            </li>
                            <li className="border py-2">
                              <a href="#" className="text-white">
                                Laptops
                              </a>
                            </li>
                            <li className="border py-2">
                              <a href="#" className="text-white">
                                Smartphones
                              </a>
                            </li>
                            <li className="border py-2">
                              <a href="#" className="text-white">
                                Cameras
                              </a>
                            </li>
                            <li className="border py-2">
                              <a href="#" className="text-white">
                                Accessories
                              </a>
                            </li>
                          </ul>
                          {/* <!-- /NAV --> */}
                        </div>
                        {/* <!-- /responsive-nav --> */}
                      </div>
                      {/* <!-- /container --> */}
                    </nav>
                  </div>
                </div>
              </DialogPanel>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  )
}
