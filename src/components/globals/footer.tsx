import React from 'react'

export const Footer = () => {
  return (
    <>
      {/* <!-- FOOTER --> */}
      <footer id="footer" className="bg-gray-800 text-gray-300">
        {/* <!-- top footer --> */}
        <div className="py-12">
          {/* <!-- container --> */}
          <div className="centerContent px-4">
            {/* <!-- row --> */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
              <div className="footer">
                <h3 className="text-lg text-white  font-semibold mb-4">
                  ABOUT US
                </h3>
                <p className="mb-4">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                  do eiusmod tempor incididunt ut.
                </p>
                <ul className="footer-links">
                  <li>
                    <a href="#">
                      <i className="fa fa-map-marker"></i> 1734 Stonecoal Road
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa fa-phone"></i> +021-95-51-84
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa fa-envelope "></i> email@email.com
                    </a>
                  </li>
                </ul>
              </div>

              <div className="footer">
                <h3 className="text-lg text-white  font-semibold mb-4">
                  CATEGORIES
                </h3>
                <ul className="footer-links">
                  <li>
                    <a href="#">Hot deals</a>
                  </li>
                  <li>
                    <a href="#">Laptops</a>
                  </li>
                  <li>
                    <a href="#">Smartphones</a>
                  </li>
                  <li>
                    <a href="#">Cameras</a>
                  </li>
                  <li>
                    <a href="#">Accessories</a>
                  </li>
                </ul>
              </div>

              <div className="footer">
                <h3 className="text-lg text-white  font-semibold mb-4">
                  INFORMATION
                </h3>
                <ul className="footer-links">
                  <li>
                    <a href="#">About Us</a>
                  </li>
                  <li>
                    <a href="#">Contact Us</a>
                  </li>
                  <li>
                    <a href="#">Privacy Policy</a>
                  </li>
                  <li>
                    <a href="#">Orders and Returns</a>
                  </li>
                  <li>
                    <a href="#">Terms & Conditions</a>
                  </li>
                </ul>
              </div>

              <div className="footer">
                <h3 className="text-lg text-white font-semibold mb-4">
                  SERVICE
                </h3>
                <ul className="footer-links">
                  <li>
                    <a href="#">My Account</a>
                  </li>
                  <li>
                    <a href="#">View Cart</a>
                  </li>
                  <li>
                    <a href="#">Wishlist</a>
                  </li>
                  <li>
                    <a href="#">Track My Order</a>
                  </li>
                  <li>
                    <a href="#">Help</a>
                  </li>
                </ul>
              </div>
            </div>
            {/* <!-- /row --> */}
          </div>
          {/* <!-- /container --> */}
        </div>
        {/* <!-- /top footer --> */}

        {/* <!-- bottom footer --> */}
        <div id="bottom-footer" className="bg-gray-900 py-4">
          <div className="centerContent px-4">
            {/* <!-- row --> */}
            <div className="flex items-center justify-center">
              <ul className="footer-payments flex gap-4">
                <li>
                  <a href="#">
                    <i className="fa-brands fa-cc-visa fa-lg"></i>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fa fa-credit-card fa-lg"></i>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fa-brands fa-paypal fa-lg"></i>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fa-brands fa-cc-mastercard fa-lg"></i>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fa-brands fa-cc-discover fa-lg"></i>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fa-brands fa-cc-amex fa-lg"></i>
                  </a>
                </li>
              </ul>
            </div>
            {/* <!-- /row --> */}
            <div className="text-center mt-4">
              <p className="text-sm">
                &copy; {new Date().getFullYear()} All rights reserved | This
                template is made with{' '}
                <i className="fa-regular fa-heart" aria-hidden="true"></i> by{' '}
                <a
                  href="https://colorlib.com"
                  className="text-blue-500"
                  target="_blank"
                >
                  Colorlib
                </a>
              </p>
            </div>
          </div>
          {/* <!-- /container --> */}
        </div>
        {/* <!-- /bottom footer --> */}
      </footer>
      {/* <!-- /FOOTER --> */}
    </>
  )
}
