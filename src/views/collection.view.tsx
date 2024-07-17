import { DefaultRcSlider } from '@/components/defaultRcSlider.omponent'
import FilterSelect from '@/components/filter-select.component'
import { RadioGroupSelect } from '@/components/forms/RadioGroupSelect'
import { LocalPagination } from '@/components/local-pagination.component'
import ProductLineCard from '@/components/products/product-line-card.component'
import { useFormatQueryParams } from '@/hooks/useFormatQueryParams'
import {
  CollectionType,
  CommonType,
  PaginateData,
  ProductType,
  SortTypeEnum
} from '@/interfaces/global.interface'
import { useGetCollectionBySlugQuery } from '@/services/collections.service'
import { useGetProductsByCollectionFilterQuery } from '@/services/products.service'
import { paginateTheme } from '@/utils/tailwind.theme'
import { useMountedState, useUpdateEffect } from '@reactuses/core'
import { Pagination } from 'flowbite-react'
import { useEffect, useRef, useState } from 'react'
import { useLoaderData, useNavigate, useParams } from 'react-router'
import {
  createSearchParams,
  Link,
  ParamKeyValuePair,
  useSearchParams
} from 'react-router-dom'

function Collection() {
  const isMounted = useMountedState()
  let [searchParams, setSearchParams] = useSearchParams()
  const { collectionSlug } = useParams()

  // const loaderData = useLoaderData() as [
  //   PaginateData<ProductType>,
  //   CollectionType
  // ]
  const navigate = useNavigate()
  const { data: collection } = useGetCollectionBySlugQuery(collectionSlug!, {})
  const {
    data: paginated,
    isFetching,
    isSuccess
  } = useGetProductsByCollectionFilterQuery({
    params: collectionSlug!,
    searchParams: searchParams.size > 0 ? searchParams.toString() : '_limit=9'
  })
  // const products = loaderData[0].data
  const countProducts = paginated?.count
  const urlQueryParams = Array.from(searchParams.entries())

  const initBrands = () => {
    let brands: string[] = []
    urlQueryParams.forEach((param) => {
      if (param[0] == 'brand.slug') {
        brands.push(param[1])
      }
    })
    return brands
  }
  const initFilterBy = () => {
    let filter: string[] = []
    urlQueryParams.forEach((param) => {
      if (param[0].includes('_sort')) {
        filter.push(param[1])
      }
      if (param[0].includes('_order')) {
        filter.push(param[1])
      }
    })

    return filter.length == 2 ? (filter.join('_') as SortTypeEnum) : null
  }
  const initMinMax = () => {
    let minMax: number[] = [defaultMin, defaultMax]

    urlQueryParams.forEach((param) => {
      if (param[0].includes('price_gte')) {
        minMax[0] = parseInt(param[1])
      }
      if (param[0].includes('price_lte')) {
        minMax[1] = parseInt(param[1])
      }
    })

    return minMax
  }

  const initPage = () => {
    let page = defaultPage
    urlQueryParams.forEach((param) => {
      if (param[0].includes('_page')) {
        page = parseInt(param[1])
      }
    })
    return page
  }

  // FILTER DATA
  const defaultMin = 1000
  const defaultMax = 5000000
  const defaultPage = 1
  const page = useRef(initPage())
  const [selectedBrands, setSelectedBrands] = useState<string[]>(initBrands())
  const [minMax, setMinMax] = useState<number[]>(initMinMax())
  const [selectedFilterBy, setSelectedFilterBy] = useState<SortTypeEnum | null>(
    initFilterBy()
  )

  const onPageChange = (p: number) => {
    page.current = p
    setSearchParams(
      () =>
        createSearchParams(
          useFormatQueryParams({
            minMax,
            page: page.current,
            selectedBrands,
            selectedFilterBy
          })
        ),
      {
        unstable_viewTransition: true
      }
    )
  }

  const categoryList = () => {
    return collection!.categories.map((categorie) => (
      <div
        key={categorie.id}
        className="px-2 py-[10px] hover:bg-gray-300 transition"
      >
        <Link to={`/${collectionSlug}/${categorie.slug}`}>
          {categorie.title}
        </Link>
      </div>
    ))
  }

  useFormatQueryParams

  useUpdateEffect(() => {
    setSearchParams(
      () =>
        createSearchParams(
          useFormatQueryParams({
            minMax,
            page: page.current,
            selectedBrands,
            selectedFilterBy
          })
        ),
      {
        unstable_viewTransition: true
      }
    )
  }, [selectedFilterBy])

  useUpdateEffect(() => {
    page.current = 1
    setSearchParams(
      () =>
        createSearchParams(
          useFormatQueryParams({
            minMax,
            page: page.current,
            selectedBrands,
            selectedFilterBy
          })
        ),
      {
        unstable_viewTransition: true
      }
    )

    // navigate(
    //   {
    //     pathname: `/collection/${collectionSlug}`,
    //     search: `?${createSearchParams(formatQueryParams())}`
    //   },
    //   {
    //     unstable_viewTransition: true
    //     // replace: true
    //   }
    // )
  }, [selectedBrands, minMax])

  // const formatQueryParams = (): ParamKeyValuePair[] => {
  //   let filterObj = []
  //   const sortData = selectedFilterBy?.split('_')

  //   const obj = {
  //     brandSlugs: selectedBrands.map((brand) => {
  //       return ['brand.slug', brand]
  //     }),
  //     minMax:
  //       minMax.length != 0
  //         ? [
  //             ['price_gte', minMax[0]],
  //             ['price_lte', minMax[1]]
  //           ]
  //         : null,
  //     sort:
  //       sortData != null
  //         ? [
  //             ['_sort', sortData[0]],
  //             ['_order', sortData[1]]
  //           ]
  //         : null,
  //     page: [['_page', page.current]],
  //     limit: [['_limit', 9]]
  //   }
  //   for (var propName in obj) {
  //     if (
  //       //@ts-ignore
  //       obj[propName] == null ||
  //       //@ts-ignore
  //       (Array.isArray(obj[propName]) && obj[propName].length === 0)
  //     ) {
  //       //@ts-ignore
  //       delete obj[propName]
  //     }
  //   }

  //   return extractSubObjects(obj)
  // }

  const showResult = () => {
    if (isFetching) {
      console.log('fetching')

      return (
        <div className="w-full h-40 bg-green-500">
          <span>loading...</span>
        </div>
      )
    } else {
      return (
        <article className="grid grid-cols-3 gap-x-6 transition-all">
          {paginated!.data.map((product) => {
            return (
              <ProductLineCard
                key={product.id}
                product={product}
              ></ProductLineCard>
            )
          })}
        </article>
      )
    }
  }

  return (
    <div>
      <div className="centerContent">
        <main className="grid grid-cols-4 gap-x-4 ">
          <section className="col-span-1 h-[calc(100%-30px)] mt-[15px]">
            <h3 className="title text-xl font-bold">CATEGORIES</h3>
            {categoryList()}
            <h3 className="title text-xl font-bold">MARQUES</h3>
            <RadioGroupSelect
              selectedBrands={selectedBrands}
              setSelectedBrands={setSelectedBrands}
              brands={collection!.brands}
            ></RadioGroupSelect>
            <div className="my-4">
              <DefaultRcSlider
                setMinMax={setMinMax}
                defaultMax={minMax[1]}
                defaultMin={minMax[0]}
              ></DefaultRcSlider>
            </div>
          </section>
          {/* LIST ARTICLES */}
          <section className="col-span-3 ">
            {/* {COLLECTION OR SUB } */}
            <section className="flex justify-between">
              <div className="flex items-center space-x-2">
                <h3 className="title text-xl font-bold">{collection!.title}</h3>
                <p className="text-sm font-light">
                  ({countProducts} résultats)
                </p>
              </div>

              {/* DROPDOWN FILTER */}
              <div>
                <FilterSelect
                  selectedFilterBy={selectedFilterBy}
                  setSelectedFilterBy={setSelectedFilterBy}
                ></FilterSelect>
              </div>
              {/* END DROPDOWN FILTER */}
            </section>
            {/* {END COLLECTION OR SUB } */}

            {showResult()}

            {/*END  LIST ARTICLES */}
            <article className="flex justify-center">
              {/* <LocalPagination></LocalPagination> */}
              {isSuccess && (
                <Pagination
                  layout="pagination"
                  currentPage={page.current}
                  totalPages={Math.round(countProducts! / 9)}
                  previousLabel=""
                  nextLabel=""
                  theme={paginateTheme}
                  onPageChange={onPageChange}
                  showIcons
                />
              )}
            </article>
          </section>
        </main>
      </div>
    </div>
  )
}

export default Collection
