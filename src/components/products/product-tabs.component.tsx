import {
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
  Transition
} from '@headlessui/react'
import { useState } from 'react'
import { CommentLine } from '../comment/comment-line.component'
import { CommentMain } from '../comment/comment-main.component'
import { RatinForm } from '../forms/rating-form.component'

export const ProductTabs = () => {
  const [tabIndex, setTabIndex] = useState(0)
  const isActive = (index: number) => tabIndex == index
  return (
    <TabGroup selectedIndex={tabIndex} onChange={setTabIndex}>
      <TabList>
        <div id="product-tab">
          <ul className="tab-nav">
            <Tab className="data-[selected]:outline-none">
              <li
                className={`
                  
                  ${isActive(0) && 'active '}`}
              >
                <a data-toggle="tab">Description</a>
              </li>
            </Tab>
            <Tab className="data-[selected]:outline-none">
              <li
                className={`
                  ${isActive(1) && 'active'}`}
              >
                <a data-toggle="tab">Details</a>
              </li>
            </Tab>
            <Tab className="data-[selected]:outline-none">
              <li
                className={`
                  ${isActive(2) && 'active'}`}
              >
                <a data-toggle="tab">Reviews (3)</a>
              </li>
            </Tab>
          </ul>
        </div>
      </TabList>
      <TabPanels>
        <TabPanel>
          <Transition
            appear
            show={tabIndex == 0}
            enter="transition-opacity duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            {/* <!-- tab1  --> */}

            <div className="row">
              <div className="w-full">
                <p className="text-sm">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </p>
              </div>
            </div>

            {/* <!-- /tab1  --> */}
          </Transition>
        </TabPanel>
        <TabPanel>
          <Transition
            appear
            show={tabIndex == 1}
            enter="transition-opacity duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            {/* <!-- tab2  --> */}

            <div className="row">
              <div className="w-full">
                <p className="text-sm">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </p>
              </div>
            </div>

            {/* <!-- /tab2  --> */}
          </Transition>
        </TabPanel>
        <TabPanel>
          <Transition
            appear
            show={tabIndex == 2}
            enter="transition-opacity duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            {/* <!-- tab3  --> */}

            <div className="flex w-full">
              {/* <!-- Rating --> */}
              <div className="w-1/4 border">
                <div id="rating">
                  <div className="rating-avg">
                    <span>4.5</span>
                    <div className="rating-stars">
                      <i className="fa fa-star fa-xs"></i>
                      <i className="fa fa-star fa-xs"></i>
                      <i className="fa fa-star fa-xs"></i>
                      <i className="fa fa-star fa-xs"></i>
                      <i className="fa-regular fa-star  fa-xs"></i>
                    </div>
                  </div>
                  <ul className="rating">
                    <li>
                      <div className="rating-stars">
                        <i className="fa fa-star fa-xs"></i>
                        <i className="fa fa-star fa-xs"></i>
                        <i className="fa fa-star fa-xs"></i>
                        <i className="fa fa-star fa-xs"></i>
                        <i className="fa fa-star fa-xs"></i>
                      </div>
                      <div className="rating-progress">
                        <div
                          className="w-[80%]"
                          // style="width: 80%;"
                        ></div>
                      </div>
                      <span className="sum">3</span>
                    </li>
                    <li>
                      <div className="rating-stars">
                        <i className="fa fa-star fa-xs"></i>
                        <i className="fa fa-star fa-xs"></i>
                        <i className="fa fa-star fa-xs"></i>
                        <i className="fa fa-star fa-xs"></i>
                        <i className="fa-regular fa-star  fa-xs"></i>
                      </div>
                      <div className="rating-progress">
                        <div
                          className="w-[60%]"
                          // style="width: 60%;"
                        ></div>
                      </div>
                      <span className="sum">2</span>
                    </li>
                    <li>
                      <div className="rating-stars">
                        <i className="fa fa-star fa-xs"></i>
                        <i className="fa fa-star fa-xs"></i>
                        <i className="fa fa-star fa-xs"></i>
                        <i className="fa-regular fa-star  fa-xs"></i>
                        <i className="fa-regular fa-star  fa-xs"></i>
                      </div>
                      <div className="rating-progress">
                        <div></div>
                      </div>
                      <span className="sum">0</span>
                    </li>
                    <li>
                      <div className="rating-stars">
                        <i className="fa fa-star fa-xs"></i>
                        <i className="fa fa-star fa-xs"></i>
                        <i className="fa-regular fa-star  fa-xs"></i>
                        <i className="fa-regular fa-star  fa-xs"></i>
                        <i className="fa-regular fa-star  fa-xs"></i>
                      </div>
                      <div className="rating-progress">
                        <div></div>
                      </div>
                      <span className="sum">0</span>
                    </li>
                    <li>
                      <div className="rating-stars">
                        <i className="fa fa-star fa-xs"></i>
                        <i className="fa-regular fa-star  fa-xs"></i>
                        <i className="fa-regular fa-star  fa-xs"></i>
                        <i className="fa-regular fa-star  fa-xs"></i>
                        <i className="fa-regular fa-star  fa-xs"></i>
                      </div>
                      <div className="rating-progress">
                        <div></div>
                      </div>
                      <span className="sum">0</span>
                    </li>
                  </ul>
                </div>
              </div>
              {/* <!-- /Rating --> */}

              {/* <!-- Reviews --> */}
              <div className="w-1/2 border">
                <CommentMain></CommentMain>
              </div>
              {/* <!-- /Reviews --> */}

              {/* <!-- Review Form --> */}
              <div className="w-1/4 border ml-5">
                <RatinForm></RatinForm>
              </div>
              {/* <!-- /Review Form --> */}
            </div>

            {/* <!-- /tab3  --> */}
          </Transition>
        </TabPanel>
      </TabPanels>
    </TabGroup>
  )
}
