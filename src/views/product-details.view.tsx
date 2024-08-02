import {
  FavoriteActions,
  useFavoriteContext
} from '@/components/favorite-actions'
import { AddToCartForm } from '@/components/forms/add-to-cart-form.component'
import { Footer } from '@/components/globals/footer'
import { LocalRating } from '@/components/globals/local-rating'
import { Newsletter } from '@/components/globals/newsletter.component'
import { ProductDetailSlick } from '@/components/products/product-detail-slick'
import { ProductTabs } from '@/components/products/product-tabs.component'
import { ProductType } from '@/interfaces/global.interface'
import { useGetCommentsByProductSlugQuery } from '@/services/comment.service'
import { useGetProductBySlugQuery } from '@/services/products.service'
import { formatPrice, formatReductPrice } from '@/utils/index.utils'
import { createContext, useContext } from 'react'
import { CiHeart } from 'react-icons/ci'
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import { useLoaderData, useParams } from 'react-router'
import { Link } from 'react-router-dom'

export const ProductContext = createContext<ProductType | null>(null)

export function useProductContext() {
  return useContext(ProductContext)
}
export default function ProductDetails() {
  const { productSlug } = useParams()
  // const product = useLoaderData() as ProductType
  const {
    data: product,
    isFetching,
    isSuccess
  } = useGetProductBySlugQuery(productSlug!)
  const {
    isSuccess: isSuccessComments,
    data: comments,
    isFetching: isFetchingComments
  } = useGetCommentsByProductSlugQuery(productSlug!)

  return (
    <div>
      <div className="centerContent">
        <main className="">
          {/* <!-- SECTION --> */}
          <div className="section">
            {/* <!-- container --> */}
            <div className="md:container">
              {/* <!-- row --> */}
              <div className="md:grid md:grid-cols-12 md:gap-10">
                <div className="md:col-span-7 ">
                  {isFetching && (
                    <SkeletonProductDetailSlick
                      isFetching
                    ></SkeletonProductDetailSlick>
                  )}
                  {isSuccess && (
                    <ProductDetailSlick
                      imgs={product.images}
                    ></ProductDetailSlick>
                  )}
                </div>

                {/* <!-- Product details --> */}
                {isFetching && (
                  <div className="md:col-span-5">
                    <SkeletonProductContent isFetching></SkeletonProductContent>
                  </div>
                )}
                {isSuccess && (
                  <div className="md:col-span-5 md:mt-0 mt-8">
                    <div className="product-details">
                      <div className="flex justify-between">
                        <h2 className="product-name font-bold">
                          {product?.title}
                        </h2>
                        <div className="product-btns">
                          <FavoriteActions product={product}>
                            <FavoriteDetailChild></FavoriteDetailChild>
                          </FavoriteActions>
                        </div>
                      </div>
                      <div className="product-rating">
                        <LocalRating rate={product.rating ?? 0}></LocalRating>

                        {product.rating == null ? (
                          <span className="text-sm text-gray-500">
                            (Pas d'avis disponibles)
                          </span>
                        ) : (
                          <span className="text-sm text-gray-500">
                            ( {isSuccessComments && comments?.length} avis
                            utilisateurs)
                          </span>
                        )}
                      </div>
                      <div className="mt-2">
                        <span>Brand: </span>
                        <Link
                          className="hover:underline"
                          to={`/${product.collection.slug}/${product.category.slug}`}
                        >
                          {product.brand.title}
                        </Link>
                      </div>

                      <div className="h-[1px] my-2 bg-gray-200 w-full"></div>
                      <div>
                        <h3 className="product-price font-bold">
                          <span
                            className={`${
                              product.reduction == null ? 'w-full' : ''
                            }   `}
                          >
                            {product.reduction
                              ? formatReductPrice(product)
                              : formatPrice(product.price)}
                          </span>

                          {product.reduction && (
                            <del className="product-old-price">
                              {formatPrice(product.price)}
                            </del>
                          )}
                        </h3>
                      </div>
                      <p className="text-sm">{product.subtitle}</p>

                      {/* ADD TO CART */}
                      <AddToCartForm product={product}></AddToCartForm>
                      {/* END  ADD TO CART */}

                      <ul className="product-links space-x-3">
                        <li>Share:</li>
                        <li>
                          <a href="#">
                            <i className="fa-brands fa-facebook-f "></i>
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i className="fa-brands fa-twitter"></i>
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i className="fa-brands fa-google-plus-g"></i>
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i className="fa fa-envelope"></i>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                )}
                {/* <!-- /Product details --> */}

                {/* <!-- Product tab --> */}
                {product && (
                  <div className="col-span-12">
                    <ProductContext.Provider value={product}>
                      <ProductTabs></ProductTabs>
                    </ProductContext.Provider>
                  </div>
                )}
                {/* <!-- /product tab --> */}
              </div>
              {/* <!-- /row --> */}
            </div>
            {/* <!-- /container --> */}
          </div>
          {/* <!-- /SECTION --> */}
        </main>
      </div>
    </div>
  )
}

const FavoriteDetailChild = () => {
  const favoriteContext = useFavoriteContext()
  const showIcon = () => {
    const favoriteOn = useFavoriteContext()!.on
    if (favoriteOn) {
      return (
        <>
          <button
            onClick={() => favoriteContext?.toggleFavoriteProduct()}
            className="rounded-full hover:bg-primary/20  p-1 transition duration-300 border-gray-400"
          >
            <FaHeart size={24} className="text-primary" />
          </button>
        </>
      )
    }

    return (
      <>
        <button
          onClick={() => favoriteContext?.toggleFavoriteProduct()}
          className="rounded-full p-1 border border-transparent hover:bg-primary/20 transition duration-300 "
        >
          <FaRegHeart size={24} color="#D10024" />
        </button>
      </>
    )
  }
  return <>{showIcon()}</>
}

const SkeletonProductDetailSlick = ({
  isFetching
}: {
  isFetching: boolean
}) => {
  return (
    <>
      <div
        className={`transition-opacity duration-300  ${
          isFetching ? 'opacity-100 h-[563px] ' : 'opacity-0 h-0'
        }`}
      >
        <div role="status" className="animate-pulse h-[525px] flex space-x-4">
          <section className="w-[176px]  rounded grid cols-1 gap-4">
            <div className="bg-gray-300 rounded flex items-center justify-center">
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
            <div className="bg-gray-300 rounded flex items-center justify-center">
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
            <div className="bg-gray-300 rounded flex items-center justify-center">
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
          </section>
          <section className="flex flex-1 items-center justify-center w-full h-full bg-gray-300 rounded">
            <svg
              className="w-10 h-10 text-gray-200 "
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 18"
            >
              <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
            </svg>
          </section>

          <span className="sr-only">Loading...</span>
        </div>
      </div>
    </>
  )
}

const SkeletonProductContent = ({ isFetching }: { isFetching: boolean }) => {
  return (
    <>
      <div
        className={`transition-opacity duration-300  ${
          isFetching ? 'opacity-100  ' : 'opacity-0 h-0'
        }`}
      >
        <div className="h-5 bg-gray-200 rounded-full  w-[70%] mb-4"></div>
        <div className="h-5 bg-gray-200 rounded-full  w-[50%] mb-4"></div>
        <div className="h-2 bg-gray-200 rounded-full  max-w-[150px] mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full  max-w-[130px] mb-2.5"></div>
        <div className="mt-12"></div>
        <div className="h-5 bg-gray-200 rounded-full w-[40%]  my-5"></div>
        <div className="h-2 bg-gray-200 rounded-full  max-w-[440px] mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full  max-w-[460px] mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full  max-w-[360px]"></div>

        <div className="flex items-center gap-5">
          <div className="h-10 bg-gray-200  w-[40%] my-8"></div>
          <div className="h-10 bg-gray-200 rounded-full w-[40%]"></div>
        </div>

        <div className="h-4 bg-gray-200 rounded-full  w-[40%]"></div>
      </div>
    </>
  )
}
