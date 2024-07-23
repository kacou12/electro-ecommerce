import { AddToCartForm } from '@/components/forms/add-to-cart-form.component'
import { Footer } from '@/components/globals/footer'
import { LocalRating } from '@/components/globals/local-rating'
import { Newsletter } from '@/components/globals/newsletter.component'
import { ProductDetailSlick } from '@/components/products/product-detail-slick'
import { ProductTabs } from '@/components/products/product-tabs.component'
import { ProductType } from '@/interfaces/global.interface'
import { formatPrice, formatReductPrice } from '@/utils/index.utils'
import { createContext, useContext } from 'react'
import { CiHeart } from 'react-icons/ci'
import { useLoaderData } from 'react-router'

export const ProductContext = createContext<ProductType | null>(null)

export function useProductContext() {
  return useContext(ProductContext)
}
export default function ProductDetails() {
  const product = useLoaderData() as ProductType

  return (
    <div>
      <div className="centerContent">
        <main className="">
          {/* <!-- SECTION --> */}
          <div className="section">
            {/* <!-- container --> */}
            <div className="container">
              {/* <!-- row --> */}
              <div className="grid grid-cols-12 gap-10">
                <div className="col-span-7 bg-green-500">
                  <ProductDetailSlick
                    imgs={product.images}
                  ></ProductDetailSlick>
                </div>

                {/* <!-- Product details --> */}
                <div className="col-span-5 border">
                  <div className="product-details">
                    <div className="flex justify-between">
                      <h2 className="product-name font-bold">
                        {product.title}
                      </h2>
                      <div className="product-btns">
                        <button className="rounded-full p-1 border border-transparent hover:bg-primary/20 transition duration-300 ">
                          <CiHeart size={24} color="#D10024" />
                        </button>
                      </div>
                    </div>
                    <div>
                      <div className="product-rating">
                        {product.rating && (
                          <LocalRating rate={product.rating}></LocalRating>
                        )}
                      </div>
                      <a className="review-link" href="#">
                        10 Review(s) | Add your review
                      </a>
                    </div>
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
                    <AddToCartForm></AddToCartForm>
                    {/* END  ADD TO CART */}

                    <ul className="product-links">
                      <li>Category:</li>
                      <li>
                        <a href="#">Headphones</a>
                      </li>
                      <li>
                        <a href="#">Accessories</a>
                      </li>
                    </ul>

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
                {/* <!-- /Product details --> */}

                {/* <!-- Product tab --> */}
                <div className="col-span-12">
                  <ProductContext.Provider value={product}>
                    <ProductTabs></ProductTabs>
                  </ProductContext.Provider>
                </div>
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
