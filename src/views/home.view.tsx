import MiniSlider from '@/components/sliders/mini-slyder.component'

import { Collection } from '@/components/globals/collection.component'
import { HotDeal } from '@/components/globals/hot-deal.component'
import { NewProducts } from '@/components/globals/new-products.component'
import { TopSelling } from '@/components/globals/top-selling.component'
import dayjs from 'dayjs'

import { useGetAllCollectionsQuery } from '@/services/collections.service'

function Home() {
  const { data: collections } = useGetAllCollectionsQuery()

  const showCollections = () => {
    const elements = []
    for (let index = 0; index <= 2; index++) {
      elements.push(collections![index])
    }
    return elements.map((coll) => (
      <Collection key={coll.id} collection={coll}></Collection>
    ))
  }
  return (
    <>
      <div>
        {/* <!-- SECTION COLLECTION --> */}
        <div className="section centerContent">
          {/* <!-- container --> */}
          <div className="mx-auto  py-8">
            {/* <!-- row --> */}
            <div className="flex flex-wrap">{showCollections()}</div>
            {/* <!-- /row --> */}
          </div>
          {/* <!-- /container --> */}
        </div>
        {/* <!-- /SECTION  COLLECTION--> */}
        {/* <!-- SECTION NEW PRODUCTS --> */}
        <NewProducts collections={collections!}></NewProducts>
        {/* <!-- /SECTION NEW PRODUCTS --> */}
        {/* <!-- HOT DEAL SECTION --> */}
        <HotDeal></HotDeal>
        {/* <!-- /HOT DEAL SECTION --> */}
        {/* <!-- SECTION TOP SELLING --> */}
        <TopSelling collections={collections!}></TopSelling>
        {/* <!-- /SECTION TOP SELLING --> */}
        {/* <!-- SECTION --> */}
        <div>
          {/* <!-- container --> */}
          <div className="centerContent px-4 py-8">
            {/* <!-- row --> */}
            <div className="flex flex-wrap">
              {/* <!-- col-md-4 col-xs-6 --> */}
              <div className="w-full sm:w-1/2 md:w-4/12 px-4">
                <MiniSlider
                  title="MICRO-CASQUES"
                  categorySlug="micro-casque"
                ></MiniSlider>
              </div>
              {/* <!-- /col-md-4 col-xs-6 --> */}

              {/* <!-- col-md-4 col-xs-6 --> */}
              <div className="w-full sm:w-1/2 md:w-4/12 px-4">
                <MiniSlider
                  title={'SMARTPHONES'}
                  categorySlug={'smartphone-android'}
                ></MiniSlider>
              </div>
              {/* <!-- /col-md-4 col-xs-6 --> */}

              {/* <!-- col-md-4 col-xs-6 --> */}
              <div className="w-full sm:w-1/2 md:w-4/12 px-4">
                <MiniSlider
                  title="IPHONES"
                  categorySlug="iphone-apple"
                ></MiniSlider>
              </div>
              {/* <!-- /col-md-4 col-xs-6 --> */}
            </div>
            {/* <!-- /row --> */}
          </div>
          {/* <!-- /container --> */}
        </div>
        {/* <!-- /SECTION --> */}
      </div>
    </>
  )
}

export default Home
