import { DefaultRcSlider } from '@/components/defaultRcSlider.omponent'
import FilterSelect from '@/components/filter-select.component'
import { RadioGroupSelect } from '@/components/forms/RadioGroupSelect'
import { LocalPagination } from '@/components/local-pagination.component'
import ProductLineCard from '@/components/products/product-line-card.component'
import { ProductType } from '@/interfaces/global.interface'
import { useLoaderData } from 'react-router'
import { useSearchParams } from 'react-router-dom'

const categoryList = () => {
  return (
    <>
      <div className="px-2 py-[10px] hover:bg-gray-300 transition">
        Categorie 1
      </div>
      <div className="px-3 py-[10px] hover:bg-gray-300 transition">
        Categorie 1
      </div>
      <div className="px-3 py-[10px] hover:bg-gray-300 transition">
        Categorie 1
      </div>
      <div className="px-3 py-[10px] hover:bg-gray-300 transition">
        Categorie 5
      </div>
    </>
  )
}

function HotDeals() {
  let [searchParams, setSearchParams] = useSearchParams()
  const loaderData = useLoaderData() as ProductType[]
  return (
    <div>
      <div className="centerContent">
        <main className="grid grid-cols-4 gap-x-4 ">
          <section className="col-span-1 h-[calc(100%-30px)] mt-[15px]">
            <h3 className="title text-xl font-bold">CATEGORIES</h3>
            {categoryList()}
            <h3 className="title text-xl font-bold">MARQUES</h3>
            <RadioGroupSelect></RadioGroupSelect>
            <div className="my-4">
              <DefaultRcSlider></DefaultRcSlider>
            </div>
          </section>
          {/* LIST ARTICLES */}
          <section className="col-span-3 ">
            {/* {COLLECTION OR SUB } */}
            <section className="flex justify-between">
              <div className="flex items-center space-x-2">
                <h3 className="title text-xl font-bold">Hot deal</h3>
                <p className="text-sm font-light">(100 résultats)</p>
              </div>

              {/* DROPDOWN FILTER */}
              <div>
                <FilterSelect></FilterSelect>
              </div>
              {/* END DROPDOWN FILTER */}
            </section>
            {/* {END COLLECTION OR SUB } */}
            <article className="grid grid-cols-3 gap-x-6">
              <ProductLineCard></ProductLineCard>
              <ProductLineCard></ProductLineCard>
              <ProductLineCard></ProductLineCard>

              <ProductLineCard></ProductLineCard>
              <ProductLineCard></ProductLineCard>
              <ProductLineCard></ProductLineCard>

              <ProductLineCard></ProductLineCard>
              <ProductLineCard></ProductLineCard>
              <ProductLineCard></ProductLineCard>

              <ProductLineCard></ProductLineCard>
            </article>
            {/*END  LIST ARTICLES */}
            <article className="flex justify-center">
              <LocalPagination></LocalPagination>
            </article>
          </section>
        </main>
      </div>
    </div>
  )
}

export default HotDeals
