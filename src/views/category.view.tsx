import { QueryData } from '@/interfaces/global.interface'
import ProductsFilterLayout from '@/layouts/products-filter.layout'
import { useGetCategoryBySlugQuery } from '@/services/category.service'
import { useGetProductsByCategoryFilterQuery } from '@/services/products.service'
import { useParams } from 'react-router'
import { useSearchParams } from 'react-router-dom'

function Category() {
  const { categorySlug } = useParams()
  let [searchParams] = useSearchParams()
  const { currentData: category, data } = useGetCategoryBySlugQuery(
    categorySlug!,
    {}
  )

  return (
    <ProductsFilterLayout<QueryData>
      queryParameters={{
        params: categorySlug,
        searchParams:
          searchParams.size > 0 ? searchParams.toString() : '_limit=9'
      }}
      dataTypeSlug={categorySlug!}
      dataType={category}
      useQuery={useGetProductsByCategoryFilterQuery}
      title={category?.title}
      showCollection={false}
    ></ProductsFilterLayout>
  )
}

export default Category
