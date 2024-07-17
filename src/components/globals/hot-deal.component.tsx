import { useCountDown } from '@reactuses/core'
import React from 'react'

export const HotDeal = () => {
  const now = new Date()
  const tomorrow = new Date()
  tomorrow.setDate(now.getDate() + 2)
  tomorrow.setHours(0, 0, 0, 0)
  const diffInSec = Math.floor((tomorrow.getTime() - now.getTime()) / 1000)
  const [hour, minute, second] = useCountDown(diffInSec)

  return (
    <>
      {/* <!-- HOT DEAL SECTION --> */}
      <div id="hot-deal" className="section bg-gray-100">
        {/* <!-- container --> */}
        <div className="centerContent px-4 py-8 ">
          {/* <!-- row --> */}
          <div className="flex flex-col justify-center flex-wrap -mx-4 items-center">
            <div className="w-full md:w-1/2 px-4 mb-4 md:mb-0 text-white ">
              <ul className="flex justify-center space-x-4 ">
                {/* <li className="rounded-full flex p-8 justify-center items-center bg-primary">
                  <div className="text-center px-1 flex flex-col w-10  h-10 border items-center">
                    <p className="text-[22px] font-bold leading-none">02</p>
                    <span className="text-[10px] ">DAYS</span>
                  </div>
                </li> */}
                <li className="rounded-full flex p-8 justify-center items-center bg-primary">
                  <div className="text-center px-1 flex flex-col w-10  h-10 border items-center">
                    <p className="text-[22px] font-bold leading-none">{hour}</p>
                    <span className="text-[10px] ">HOURS</span>
                  </div>
                </li>
                <li className="rounded-full flex p-8 justify-center items-center bg-primary">
                  <div className="text-center px-1 flex flex-col w-10  h-10 border items-center">
                    <p className="text-[22px] font-bold leading-none">
                      {minute}
                    </p>
                    <span className="text-[10px] ">MINS</span>
                  </div>
                </li>
                <li className="rounded-full flex p-8 justify-center items-center bg-primary">
                  <div className="text-center px-1 flex flex-col w-10  h-10 border items-center">
                    <p className="text-[22px] font-bold leading-none">
                      {second}
                    </p>
                    <span className="text-[10px] ">SECS</span>
                  </div>
                </li>
              </ul>
            </div>
            <div className="flex flex-col items-center w-full md:w-1/2 px-4 mt-10">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-uppercase mb-2">
                  HOT DEAL THIS WEEK
                </h2>
                <p className="text-2xl">NEW COLLECTION UP TO 50% OFF</p>
                <a
                  href="#"
                  className="bg-primary  text-white px-6 py-3 rounded-full inline-block mt-4 hover:bg-blue-600 transition duration-300"
                >
                  SHOP NOW
                </a>
              </div>
            </div>
          </div>
          {/* <!-- /row --> */}
        </div>
        {/* <!-- /container --> */}
      </div>
      {/* <!-- /HOT DEAL SECTION --> */}
    </>
  )
}
