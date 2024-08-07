import { CollectionType } from '@/interfaces/global.interface'
import { useGetNewProductsByCollectionSlugQuery } from '@/services/products.service'
import { useState } from 'react'
import { TabSlider } from '../tab-sliders'

export const NewProducts = ({
  collections
}: {
  collections: CollectionType[]
}) => {
  return (
    <>
      <TabSlider
        useQuery={useGetNewProductsByCollectionSlugQuery}
        title="NEW PRODUCTS"
        collections={collections}
      >
        {/* {listTab()} */}
      </TabSlider>
      {/* <!-- /row --> */}
    </>
  )
}
