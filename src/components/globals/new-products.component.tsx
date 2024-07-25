import React, { useCallback, useRef, useState } from 'react'
import HugeSlider from '../sliders/huge-slider.component'
import { useGetNewProductsByCollectionSlugQuery } from '@/services/products.service'
import { Button } from 'flowbite-react'
import { useAppDispatch } from '@/store'
import { CollectionType } from '@/interfaces/global.interface'
import { useGetAllCollectionsQuery } from '@/services/collections.service'
import { Transition } from '@tailwindui/react'

export const NewProducts = ({
  collections
}: {
  collections: CollectionType[]
}) => {
  const [activeTabSlug, setActiveTabSlug] = useState(collections[0].slug)

  const {
    data: products,
    isFetching,
    isSuccess
  } = useGetNewProductsByCollectionSlugQuery(activeTabSlug)

  const changeCurrentTab = (slug: string) => {
    if (slug != activeTabSlug) {
      setActiveTabSlug(() => slug)
    }
  }

  const listTab = () => {
    return collections.map((collection, i) => {
      return (
        <li
          onClick={() => changeCurrentTab(collection.slug)}
          key={collection.id}
          className={`${
            activeTabSlug == collection.slug && 'active'
          } cursor-pointer`}
        >
          <a href={`#tab${i + 1}`}>{collection.title}</a>
        </li>
      )
    })
  }

  return (
    <>
      {/* <!-- SECTION NEW PRODUCTS --> */}
      <div className="centerContent">
        {/* <!-- container --> */}
        <div className="container mx-auto px-4 py-8">
          {/* <!-- row --> */}
          <div className="flex flex-wrap -mx-4">
            {/* <!-- section title --> */}
            <div className="w-full">
              <div className="section-title">
                <h3 className="title text-2xl font-bold">NEW PRODUCTS</h3>

                <div className="section-nav">
                  <ul className="section-tab-nav tab-nav">{listTab()}</ul>
                </div>
              </div>
            </div>
            {/* <!-- /section title --> */}

            {/* <!-- Products tab & slick --> */}
            <div className="w-full ">
              <div
                className={`transition-opacity duration-300  ${
                  isFetching ? 'opacity-100 h-[563px] ' : 'opacity-0 h-0'
                }`}
              >
                <div
                  role="status"
                  className="space-y-8 animate-pulse md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center h-[563px]"
                >
                  <div className="flex items-center justify-center w-full h-full bg-gray-300 rounded sm:w-96 ">
                    <svg
                      className="w-10 h-10 text-gray-200 "
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 18"
                    >
                      <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                    </svg>
                  </div>
                  <div className="flex items-center justify-center w-full h-full bg-gray-300 rounded sm:w-96 ">
                    <svg
                      className="w-10 h-10 text-gray-200 "
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 18"
                    >
                      <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                    </svg>
                  </div>
                  <div className="flex items-center justify-center w-full h-full bg-gray-300 rounded sm:w-96 ">
                    <svg
                      className="w-10 h-10 text-gray-200 "
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 18"
                    >
                      <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                    </svg>
                  </div>
                  <div className="flex items-center justify-center w-full h-full bg-gray-300 rounded sm:w-96 ">
                    <svg
                      className="w-10 h-10 text-gray-200 "
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 18"
                    >
                      <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                    </svg>
                  </div>

                  <span className="sr-only">Loading...</span>
                </div>
              </div>

              {/* <Transition
                show={isSuccess && !isFetching}
                enter="transition-opacity duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity duration-500"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <HugeSlider products={products!}></HugeSlider> */}
              {isSuccess && !isFetching && (
                <HugeSlider products={products!}></HugeSlider>
              )}
              {/* </Transition> */}
            </div>
            {/* <!-- /Products tab & slick --> */}
          </div>
          {/* <!-- /row --> */}
        </div>
        {/* <!-- /container --> */}
      </div>
      {/* <!-- /SECTION NEW PRODUCTS --> */}
    </>
  )
}
