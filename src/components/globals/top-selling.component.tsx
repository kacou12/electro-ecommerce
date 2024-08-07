import { CollectionType } from '@/interfaces/global.interface'
import { useGetTopSellingProductsByCollectionSlugQuery } from '@/services/products.service'
import { TabSlider } from '../tab-sliders'

export function TopSelling({ collections }: { collections: CollectionType[] }) {
  return (
    <>
      <TabSlider
        useQuery={useGetTopSellingProductsByCollectionSlugQuery}
        title="TOP SELLING"
        collections={collections}
      >
        {/* {listTab()} */}
      </TabSlider>
      {/* <!-- /row --> */}
    </>
  )
}
