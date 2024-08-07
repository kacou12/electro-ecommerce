import { CollectionType, ProductType } from '@/interfaces/global.interface'
import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta
} from '@reduxjs/toolkit/query'
import { TypedUseQuery } from '@reduxjs/toolkit/query/react'
import { useState } from 'react'
import { SkeletonProductCard } from './loader/skeleton-product-card.component'
import HugeSlider from './sliders/huge-slider.component'

export const TabSlider = ({
  collections,
  title,
  useQuery
}: {
  collections: CollectionType[]
  title: string
  useQuery: TypedUseQuery<
    ProductType[],
    string,
    BaseQueryFn<
      string | FetchArgs,
      unknown,
      FetchBaseQueryError,
      {},
      FetchBaseQueryMeta
    >
  >
}) => {
  const [activeTabSlug, setActiveTabSlug] = useState(collections[0].slug)
  const { isFetching, isSuccess, data: products } = useQuery(activeTabSlug)

  const changeCurrentTab = (slug: string) => {
    if (slug != activeTabSlug) {
      setActiveTabSlug(() => slug)
      // trigger(slug)
    }
  }
  const listTab = () => {
    return collections.map((dataLine, i) => {
      return (
        <li
          onClick={() => changeCurrentTab(dataLine.slug)}
          key={dataLine.id}
          className={`${
            activeTabSlug == dataLine.slug && 'active'
          } cursor-pointer`}
        >
          <span>{dataLine.title}</span>
        </li>
      )
    })
  }

  return (
    <>
      <div className="centerContent">
        <div className="">
          <div className="flex flex-wrap">
            {/* <!-- section title --> */}
            <div className="w-full">
              <div className="section-title">
                <h3 className="title text-2xl font-bold">{title}</h3>

                <div className="section-nav">
                  <ul className="section-tab-nav tab-nav">{listTab()}</ul>
                  {/* <ul className="section-tab-nav tab-nav">{children}</ul> */}
                </div>
              </div>
            </div>
            {/* <!-- /section title --> */}

            {/* <!-- Products tab & slick --> */}
            <div className="w-full ">
              <SkeletonProductCard
                isFetching={isFetching}
              ></SkeletonProductCard>

              {isSuccess && !isFetching && (
                <HugeSlider products={products!}></HugeSlider>
              )}
            </div>
            {/* <!-- /Products tab & slick --> */}
          </div>
        </div>
      </div>
    </>
  )
}
