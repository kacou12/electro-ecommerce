import { QueryData } from '@/interfaces/global.interface'
import ProductsFilterLayout from '@/layouts/products-filter.layout'
import { useGetSearchProductsQuery } from '@/services/products.service'
import { useSearchParams } from 'react-router-dom'

function search() {
  let [searchParams] = useSearchParams()

  const urlQueryParams = Array.from(searchParams.entries())

  const initSearchText = () => {
    let text: string | undefined
    urlQueryParams.forEach((param) => {
      if (param[0].includes('title_like')) {
        text = param[1]
      }
    })
    return text
  }

  return (
    <ProductsFilterLayout<string>
      queryParameters={
        searchParams.size > 0 ? searchParams.toString() : '_limit=9'
      }
      useQuery={useGetSearchProductsQuery}
      title={`Recherche ${initSearchText()!.toUpperCase()}`}
      showCollection={false}
    ></ProductsFilterLayout>
  )
}

export default search
