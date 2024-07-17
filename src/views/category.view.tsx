import { LocalPagination } from '@/components/local-pagination.component'
import ProductLineCard from '@/components/products/product-line-card.component'
import { useGetCategoryBySlugQuery } from '@/services/category.service'
import { useParams } from 'react-router'

function Category() {
  const { categorySlug } = useParams()
  const { currentData: category, data } = useGetCategoryBySlugQuery(
    categorySlug!,
    {}
  )
  return (
    <div>
      <div className="centerContent">
        <main className="grid grid-cols-4 gap-x-4 ">
          <section className="col-span-1 h-[calc(100%-30px)] mt-[15px]">
            <h3 className="title text-xl font-bold">MARQUES</h3>
            {/* <RadioGroupSelect brands={category!.brands}></RadioGroupSelect> */}
            <div className="my-4">
              {/* <DefaultRcSlider></DefaultRcSlider> */}
            </div>
          </section>
          {/* LIST ARTICLES */}
          <section className="col-span-3 ">
            {/* {COLLECTION OR SUB } */}
            <section className="flex justify-between">
              <div className="flex items-center space-x-2">
                <h3 className="title text-xl font-bold">Category Name</h3>
                <p className="text-sm font-light">(100 résultats)</p>
              </div>

              {/* DROPDOWN FILTER */}
              <div>{/* <FilterSelect></FilterSelect> */}</div>
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

export default Category
