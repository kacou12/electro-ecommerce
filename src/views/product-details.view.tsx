import { AddToCartForm } from '@/components/forms/add-to-cart-form.component'
import { Footer } from '@/components/globals/footer'
import { Newsletter } from '@/components/globals/newsletter.component'
import { ProductDetailSlick } from '@/components/products/product-detail-slick'
import { ProductTabs } from '@/components/products/product-tabs.component'
import { CiHeart } from 'react-icons/ci'

export default function ProductDetails() {
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
                  <ProductDetailSlick></ProductDetailSlick>
                </div>

                {/* <!-- Product details --> */}
                <div className="col-span-5 border">
                  <div className="product-details">
                    <div className="flex justify-between">
                      <h2 className="product-name font-bold">
                        product name goes here
                      </h2>
                      <div className="product-btns">
                        <button className="rounded-full p-1 border border-transparent hover:bg-primary/20 transition duration-300 ">
                          <CiHeart size={24} color="#D10024" />
                        </button>
                      </div>
                    </div>
                    <div>
                      <div className="product-rating">
                        <i className="fa fa-star fa-xs"></i>
                        <i className="fa fa-star fa-xs"></i>
                        <i className="fa fa-star fa-xs"></i>
                        <i className="fa fa-star fa-xs"></i>
                        <i className="fa fa-star-o fa-xs"></i>
                      </div>
                      <a className="review-link" href="#">
                        10 Review(s) | Add your review
                      </a>
                    </div>
                    <div>
                      <h3 className="product-price font-bold">
                        $980.00 <del className="product-old-price">$990.00</del>
                      </h3>
                      <span className="product-available">In Stock</span>
                    </div>
                    <p className="text-sm">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>

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
                  {/* <ProductTabs></ProductTabs> */}
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

      {/* <!-- NEWSLETTER --> */}
      <Newsletter></Newsletter>
      {/* <!-- /NEWSLETTER --> */}

      {/* <!-- FOOTER --> */}
      <Footer></Footer>
      {/* <!-- /FOOTER --> */}
    </div>
  )
}
