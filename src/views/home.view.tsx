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
          <div className="container mx-auto px-4 py-8">
            {/* <!-- row --> */}
            <div className="flex flex-wrap -mx-4">
              {showCollections()}

              {/* <Collection
                category={{ title: 'Laptop', img: '/img/shop01.png', id: 1 }}
              ></Collection>
            
              <Collection
                category={{
                  title: 'Accessories',
                  img: '/img/shop03.png',
                  id: 2
                }}
              ></Collection>
              
           
              <Collection
                category={{ title: 'Cameras', img: '/img/shop02.png', id: 2 }}
              ></Collection> */}
            </div>
            {/* <!-- /row --> */}
          </div>
          {/* <!-- /container --> */}
        </div>
        {/* <!-- /SECTION  COLLECTION--> */}!
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
            <div className="flex flex-wrap -mx-4">
              {/* <!-- col-md-4 col-xs-6 --> */}
              <div className="w-full md:w-4/12 px-4">
                <MiniSlider
                  title="MICRO-CASQUES"
                  categorySlug="micro-casque"
                ></MiniSlider>
              </div>
              {/* <!-- /col-md-4 col-xs-6 --> */}

              {/* <!-- col-md-4 col-xs-6 --> */}
              <div className="w-full md:w-4/12 px-4">
                <MiniSlider
                  title={'SMARTPHONES'}
                  categorySlug={'smartphone-android'}
                ></MiniSlider>
              </div>
              {/* <!-- /col-md-4 col-xs-6 --> */}

              {/* <!-- col-md-4 col-xs-6 --> */}
              <div className="w-full md:w-4/12 px-4">
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
