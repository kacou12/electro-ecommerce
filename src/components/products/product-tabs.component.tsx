import { ProductType } from '@/interfaces/global.interface'
import { useGetCommentsByProductSlugQuery } from '@/services/comment.service'
import {
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
  Transition
} from '@headlessui/react'
import { useState } from 'react'
import { CommentMain } from '../comment/comment-main.component'
import { RatingForm } from '../forms/rating-form.component'
import { LocalRating } from '../globals/local-rating'
import { useProductContext } from '@/views/product-details.view'

export const ProductTabs = () => {
  const product = useProductContext()!
  const {
    isSuccess,
    data: comments,
    isFetching
  } = useGetCommentsByProductSlugQuery(product.slug)
  const arrayRates = comments?.map((comment) => comment.rate)
  const rateMoy = comments?.reduce((accumulate, current) => {
    return accumulate + current.rate
  }, 0)

  const getMoyen = ({ rateToCount }: { rateToCount: number }) => {
    return arrayRates?.filter((rate) => rate == rateToCount).length
  }

  const [tabIndex, setTabIndex] = useState(0)
  const isActive = (index: number) => tabIndex == index

  const showComments = () => {
    if (isFetching)
      return (
        <div className="h-full w-full flex justify-center items-center">
          <div className="w-10 h-10 border-4 border-primary rounded-full animate-spin border-t-transparent"></div>
        </div>
      )
    if (isSuccess) return <CommentMain comments={comments}></CommentMain>
  }
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
                <a data-toggle="tab">Reviews ({comments?.length})</a>
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
                <p className="text-sm">{product.description}</p>
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
                <p className="text-sm">{product.details}</p>
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
              <div className="w-1/4 ">
                {isSuccess && comments!.length > 0 && (
                  <div id="rating">
                    <div className="rating-avg">
                      {isSuccess && (
                        <span>{Math.ceil(rateMoy! / comments.length)}</span>
                      )}
                      <div className="rating-stars">
                        <LocalRating
                          rate={Math.ceil(rateMoy! / comments.length)}
                        ></LocalRating>
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
                        <span className="sum">
                          {getMoyen({ rateToCount: 5 })}
                        </span>
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
                        <span className="sum">
                          {getMoyen({ rateToCount: 4 })}
                        </span>
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
                        <span className="sum">
                          {getMoyen({ rateToCount: 3 })}
                        </span>
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
                        <span className="sum">
                          {getMoyen({ rateToCount: 2 })}
                        </span>
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
                        <span className="sum">
                          {getMoyen({ rateToCount: 1 })}
                        </span>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
              {/* <!-- /Rating --> */}

              {/* <!-- Reviews --> */}
              <div className="w-1/2 ">{showComments()}</div>
              {/* <!-- /Reviews --> */}

              {/* <!-- Review Form --> */}
              <div className="w-1/4  ml-5">
                <RatingForm></RatingForm>
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
