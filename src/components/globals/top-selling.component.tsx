import { CollectionType } from '@/interfaces/global.interface'
import HugeSlider from '../sliders/huge-slider.component'
import { useGetTopSellingProductsByCollectionSlugQuery } from '@/services/products.service'
import { useState } from 'react'

interface TopSellingProps {
  children: React.ReactNode
}

export function TopSelling({ collections }: { collections: CollectionType[] }) {
  const [activeTabSlug, setActiveTabSlug] = useState(collections[0].slug)

  const {
    data: products,
    isFetching,
    refetch
  } = useGetTopSellingProductsByCollectionSlugQuery(activeTabSlug)
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
      {/* <!-- SECTION TOP SELLING --> */}
      <div className="centerContent">
        {/* <!-- container --> */}
        <div className="container mx-auto px-4 py-8">
          {/* <!-- row --> */}
          <div className="flex flex-wrap -mx-4">
            {/* <!-- section title --> */}
            <div className="w-full">
              <div className="section-title">
                <h3 className="title text-2xl font-bold">TOP SELLING</h3>
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
          {/* <!-- /row --> */}
        </div>
        {/* <!-- /container --> */}
      </div>
      {/* <!-- /SECTION TOP SELLING --> */}
    </>
  )
}
