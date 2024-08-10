import { DefaultRcSlider } from '@/components/defaultRcSlider.omponent'
import FilterSelect from '@/components/filter-select.component'
import { RadioGroupSelect } from '@/components/forms/RadioGroupSelect'
import ProductLineCard from '@/components/products/product-line-card.component'
import { useFormatQueryParams } from '@/hooks/useFormatQueryParams'
import {
  CategoryType,
  CollectionType,
  PaginateData,
  ProductType,
  SortTypeEnum
} from '@/interfaces/global.interface'
import { useGetAllBrandsQuery } from '@/services/collections.service'
import { paginateTheme } from '@/utils/tailwind.theme'
import { useUpdateEffect } from '@reactuses/core'
import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta
} from '@reduxjs/toolkit/query'
import { TypedUseQuery } from '@reduxjs/toolkit/query/react'
import { Pagination } from 'flowbite-react'
import { useRef, useState } from 'react'
import { createSearchParams, Link, useSearchParams } from 'react-router-dom'

function ProductsFilterLayout<T>({
  title,
  showCollection = true,
  useQuery,
  dataType,
  dataTypeSlug,
  queryParameters
}: {
  useQuery: TypedUseQuery<
    PaginateData<ProductType>,
    // params type
    T,
    BaseQueryFn<
      string | FetchArgs,
      unknown,
      FetchBaseQueryError,
      {},
      FetchBaseQueryMeta
    >
  >
  dataType?: CategoryType | CollectionType | undefined
  title?: string
  dataTypeSlug?: string
  queryParameters: any
  showCollection?: boolean
}) {
  let [searchParams, setSearchParams] = useSearchParams()
  const {
    data: paginated,
    isFetching,
    // isSuccess
    isSuccess
  } = useQuery(queryParameters)

  const { data: allBrands, isSuccess: isSucccessBrands } =
    useGetAllBrandsQuery()

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

  const initSearchText = () => {
    let text = null
    urlQueryParams.forEach((param) => {
      if (param[0].includes('title_like')) {
        text = param[1]
      }
    })
    return text
  }

  // FILTER DATA
  const defaultMin = 1000
  const defaultMax = 5000000
  const defaultPage = 1
  const page = useRef(initPage())
  const searchText = useRef<string | null>(initSearchText())
  const [selectedBrands, setSelectedBrands] = useState<string[]>(initBrands())
  const [minMax, setMinMax] = useState<number[]>(initMinMax())
  const [selectedFilterBy, setSelectedFilterBy] = useState<SortTypeEnum | null>(
    initFilterBy()
  )

  const onPageChange = (p: number) => {
    page.current = p
    setSearchParams(
      () => {
        if (searchText.current) {
          return createSearchParams([
            ...useFormatQueryParams({
              minMax,
              page: page.current,
              selectedBrands,
              selectedFilterBy
            }),
            ['title_like', searchText.current]
          ])
        }
        return createSearchParams(
          useFormatQueryParams({
            minMax,
            page: page.current,
            selectedBrands,
            selectedFilterBy
          })
        )
      },

      {
        unstable_viewTransition: true
      }
    )
  }

  const categoryList = () => {
    return (dataType as CollectionType)!.categories.map((categorie) => (
      <Link
        key={categorie.id}
        className="text-sm"
        to={`/${dataTypeSlug}/${categorie.slug}`}
      >
        <div
          key={categorie.id}
          className="px-2 py-[10px] hover:bg-gray-300 transition"
        >
          {categorie.title}
        </div>
      </Link>
    ))
  }

  useUpdateEffect(() => {
    setSearchParams(
      () => {
        if (searchText.current) {
          return createSearchParams([
            ...useFormatQueryParams({
              minMax,
              page: page.current,
              selectedBrands,
              selectedFilterBy
            }),
            ['title_like', searchText.current]
          ])
        }
        return createSearchParams(
          useFormatQueryParams({
            minMax,
            page: page.current,
            selectedBrands,
            selectedFilterBy
          })
        )
      },
      {
        unstable_viewTransition: true
      }
    )
  }, [selectedFilterBy])

  useUpdateEffect(() => {
    page.current = 1
    setSearchParams(
      () => {
        if (searchText.current) {
          return createSearchParams([
            ...useFormatQueryParams({
              minMax,
              page: page.current,
              selectedBrands,
              selectedFilterBy
            }),
            ['title_like', searchText.current]
          ])
        }
        return createSearchParams(
          useFormatQueryParams({
            minMax,
            page: page.current,
            selectedBrands,
            selectedFilterBy
          })
        )
      },
      {
        unstable_viewTransition: true
      }
    )
  }, [selectedBrands, minMax])

  const showResult = () => {
    let skeletonElements: JSX.Element[] = []
    for (let index = 0; index < 9; index++) {
      skeletonElements.push(
        <SkeletonProductLine key={index}></SkeletonProductLine>
      )
    }
    if (isFetching) {
      return (
        <article className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 transition-all mt-4">
          {skeletonElements}
        </article>
      )
    }
    if (!!!paginated!.data.length) {
      return (
        <div className="flex flex-col items-center">
          <img src="/img/404.png"></img>
          <p className="text-sm ">Aucun résultat trouvé</p>
        </div>
      )
    }

    return (
      <article className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6  transition-all">
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

  return (
    <div>
      <div className="centerContent">
        <main className="md:grid md:grid-cols-4 md:gap-x-4">
          <section className="col-span-1 h-[calc(100%-30px)] mt-[10px]">
            {showCollection && (
              <>
                <h3 className="title text-md font-bold">CATEGORIES</h3>
                <div className="my-2">{categoryList()}</div>
              </>
            )}
            <h3 className="title text-md font-bold">MARQUES</h3>
            {isSucccessBrands && (
              <RadioGroupSelect
                selectedBrands={selectedBrands}
                setSelectedBrands={setSelectedBrands}
                brands={dataType?.brands ?? allBrands!}
              ></RadioGroupSelect>
            )}
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
            <section className="flex md:justify-between  flex-col md:flex-row">
              <div className="flex  md:items-center space-x-2">
                <h3 className="title m-0 text-xl font-bold">
                  {/* {collection!.title} */}
                  {title}
                </h3>
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
              {isSuccess && countProducts != null && countProducts > 9 && (
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

const SkeletonProductLine = () => {
  return (
    <>
      <section className="border-2 border-gray-300 animate-pulse">
        <div className="flex items-center justify-center w-full h-[256px] bg-gray-300 rounded  ">
          <svg
            className="w-10 h-10 text-gray-200 "
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 18"
          >
            <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
          </svg>
        </div>
        <div className="mx-2 space-y-2 py-1">
          <div className="h-2  bg-gray-300 my-[1px] rounded-full w-20 mx-auto"></div>
          <div className="h-2 mx-auto bg-gray-300  rounded-full"></div>
          <div className="h-2 mx-auto bg-gray-300  rounded-full"></div>
          <div className="h-2 mx-auto bg-gray-300  w-10 rounded-full"></div>
          <div className="py-5">
            <div className="h-3 mx-auto bg-gray-300 w-24 "></div>
          </div>
          <div className="flex justify-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gray-300"></div>
            <div className="w-8 h-8 rounded-full bg-gray-300"></div>
          </div>
        </div>
      </section>
    </>
  )
}

export default ProductsFilterLayout
