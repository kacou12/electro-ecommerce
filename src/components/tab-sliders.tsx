import { CollectionType, ProductType } from '@/interfaces/global.interface'
import {
  QueryActionCreatorResult,
  QueryDefinition
} from '@reduxjs/toolkit/query'
import React, { useState } from 'react'
import HugeSlider from './sliders/huge-slider.component'

export const TabSlider = <T extends QueryDefinition<any, any, any, any>>({
  data,
  title,
  refetch,
  products,
  isFetching
}: {
  data: CollectionType[]
  title: string
  isFetching: boolean
  products: ProductType[] | undefined
  refetch: () => QueryActionCreatorResult<T>
}) => {
  const [activeTabSlug, setActiveTabSlug] = useState(data[0].slug)
  const changeCurrentTab = (slug: string) => {
    if (slug != activeTabSlug) {
      setActiveTabSlug(() => slug)
      refetch()
    }
  }
  const listTab = () => {
    return data.map((dataLine, i) => {
      return (
        <li
          onClick={() => changeCurrentTab(dataLine.slug)}
          key={dataLine.id}
          className={`${
            activeTabSlug == dataLine.slug && 'active'
          } cursor-pointer`}
        >
          <a href={`#tab${i + 1}`}>{dataLine.title}</a>
        </li>
      )
    })
  }

  return (
    <>
      <div className="flex flex-wrap -mx-4">
        {/* <!-- section title --> */}
        <div className="w-full">
          <div className="section-title">
            <h3 className="title text-2xl font-bold">{title}</h3>

            <div className="section-nav">
              <ul className="section-tab-nav tab-nav">{listTab()}</ul>
            </div>
          </div>
        </div>
        {/* <!-- /section title --> */}

        {/* <!-- Products tab & slick --> */}
        <div className="w-full">
          {isFetching ? (
            <div>Loading by skeleton...</div>
          ) : (
            <HugeSlider products={products!}></HugeSlider>
          )}
        </div>
        {/* <!-- /Products tab & slick --> */}
      </div>
    </>
  )
}
