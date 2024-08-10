import { QueryData } from '@/interfaces/global.interface'
import ProductsFilterLayout from '@/layouts/products-filter.layout'
import { useGetCollectionBySlugQuery } from '@/services/collections.service'
import { useGetProductsByCollectionFilterQuery } from '@/services/products.service'
import { useParams } from 'react-router'
import { useSearchParams } from 'react-router-dom'

function Collection() {
  let [searchParams] = useSearchParams()
  const { collectionSlug } = useParams()

  const { data: collection } = useGetCollectionBySlugQuery(collectionSlug!, {})

  return (
    <ProductsFilterLayout<QueryData>
      dataTypeSlug={collectionSlug!}
      dataType={collection}
      useQuery={useGetProductsByCollectionFilterQuery}
      title={collection?.title}
      queryParameters={{
        params: collectionSlug,
        searchParams:
          searchParams.size > 0 ? searchParams.toString() : '_limit=9'
      }}
    ></ProductsFilterLayout>
  )
}

export default Collection
