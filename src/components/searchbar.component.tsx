import { ProductType } from '@/interfaces/global.interface'
import { RouteEnum } from '@/routes/route.enum'
import { useLazyGetSearchLimitedProductsQuery } from '@/services/products.service'
import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions
} from '@headlessui/react'
import { useUpdateEffect } from '@reactuses/core'
import { Button, Spinner } from 'flowbite-react'
import { Fragment, memo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const SearchBar = () => {
  const [selectedPerson, setSelectedPerson] = useState('')
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [trigger, { data: paginated, isFetching, isSuccess }] =
    useLazyGetSearchLimitedProductsQuery()
  const products = paginated?.data
  const count = paginated?.count
  const goSearchPage = () => {
    console.log('go search page')

    setQuery('')

    setTimeout(() => {
      navigate({
        pathname: RouteEnum.SEARCH,
        search: `?title_like=${query}`
      })
    }, 500)
  }
  const goToDetailPage = (product: ProductType) => {
    setTimeout(() => {
      navigate(
        `/${product.collection.slug}/${product.category.slug}/${product.slug}`
      )
    }, 500)
  }

  useUpdateEffect(() => {
    trigger(query)
  }, [query])

  return (
    <div className="flex items-center">
      <Combobox
        value={selectedPerson}
        onChange={() => setSelectedPerson}
        // onClose={() => setQuery('')}
      >
        <section className="flex w-full">
          <div className="relative w-full">
            <ComboboxInput
              aria-label="Assignee"
              placeholder="Search here"
              className="w-full
            input
            rounded-l-full border-gray-400 text-gray-700 focus:border-gray-400 focus:ring-0
            pr-10 pl-5"
              displayValue={(person: { id: number; name: string }) =>
                person?.name
              }
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
            {isFetching && (
              <ComboboxButton
                disabled
                className="group absolute inset-y-0 right-0 px-2.5"
              >
                <Spinner color={'failure'}></Spinner>
              </ComboboxButton>
            )}
          </div>
          {/* 
        <Button
          onClick={goSearchPage}
          className="rounded-l-none rounded-r-full font-bold px-4 z-50"
          size={'sm'}
          disabled={!!!query}
        >
          Search
        </Button> */}
        </section>

        <section className="bg-purple-800">
          <ComboboxOptions
            anchor="bottom"
            transition
            className="origin-top bg-white 
          shadow-2xl
            md:w-[22%]
            lg:w-[30%]
            w-[80%]
            transition-all duration-500 ease-out 
          empty:invisible 
          data-[closed]:translate-x-10
          data-[closed]:opacity-0
          mt-1
          "
          >
            {/* data-[closed]:scale-95 
            data-[closed]:opacity-0 */}

            {isSuccess &&
              products!.map((product, index) => {
                return (
                  <Fragment key={product.id}>
                    {/* <Link
                    to={`/${product.collection.slug}/${product.category.slug}/${product.slug}`}
                  > */}
                    <ComboboxOption
                      value={product}
                      onClick={() => goToDetailPage(product)}
                      className="data-[focus]:bg-primary py-2 pl-3 data-[focus]:text-white  text-sm"
                    >
                      <span className="line-clamp-1 ">{product.title}</span>
                    </ComboboxOption>
                    {/* </Link> */}
                    {index == products!.length - 1 && count! > 9 && (
                      <div className="w-full mt-1">
                        {/* <Link to={`${RouteEnum.SEARCH}?title_like=${query}`}> */}
                        <ComboboxOption value={null}>
                          <Button
                            onClick={goSearchPage}
                            className="rounded-none w-full font-bold"
                            size={'sm'}
                          >
                            SHOW MORE ({count!})
                          </Button>
                        </ComboboxOption>
                        {/* </Link> */}
                      </div>
                    )}
                  </Fragment>
                )
              })}
          </ComboboxOptions>
        </section>
      </Combobox>

      <Button
        onClick={goSearchPage}
        className="rounded-l-none rounded-r-full font-bold px-4 z-50"
        size={'sm'}
        disabled={!!!query}
      >
        Search
      </Button>
    </div>
  )
}
