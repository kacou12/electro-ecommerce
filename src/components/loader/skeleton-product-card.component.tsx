import React from 'react'

export const SkeletonProductCard = ({
  isFetching
}: {
  isFetching: boolean
}) => {
  return (
    <>
      <div
        className={`transition-opacity duration-300 w-full ${
          isFetching ? 'opacity-100 h-[536px] ' : 'opacity-0 h-0'
        }`}
      >
        <div
          role="status"
          className="grid grid-cols-4 gap-6 animate-pulse w-full  h-[437px]"
        >
          <section className="border-2 border-gray-300">
            <div className="flex items-center justify-center w-full h-[256px] bg-gray-300 rounded  ">
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
            <div className="mx-2 space-y-2 py-1">
              <div className="h-2  bg-gray-300 my-[1px] rounded-full w-20 mx-auto"></div>
              <div className="h-2 mx-auto bg-gray-300  rounded-full"></div>
              <div className="h-2 mx-auto bg-gray-300  rounded-full"></div>
              <div className="h-2 mx-auto bg-gray-300  w-10 rounded-full"></div>
              <div className="py-5">
                <div className="h-3 mx-auto bg-gray-300 w-24 "></div>
              </div>
              <div className="flex justify-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-300"></div>
                <div className="w-8 h-8 rounded-full bg-gray-300"></div>
              </div>
            </div>
          </section>

          <section className="border-2 border-gray-300">
            <div className="flex items-center justify-center w-full h-[256px] bg-gray-300 rounded  ">
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
            <div className="mx-2 space-y-2 py-1">
              <div className="h-2  bg-gray-300 my-[1px] rounded-full w-20 mx-auto"></div>
              <div className="h-2 mx-auto bg-gray-300  rounded-full"></div>
              <div className="h-2 mx-auto bg-gray-300  rounded-full"></div>
              <div className="h-2 mx-auto bg-gray-300  w-10 rounded-full"></div>
              <div className="py-5">
                <div className="h-3 mx-auto bg-gray-300 w-24 "></div>
              </div>
              <div className="flex justify-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-300"></div>
                <div className="w-8 h-8 rounded-full bg-gray-300"></div>
              </div>
            </div>
          </section>

          <section className="border-2 border-gray-300">
            <div className="flex items-center justify-center w-full h-[256px] bg-gray-300 rounded  ">
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
            <div className="mx-2 space-y-2 py-1">
              <div className="h-2  bg-gray-300 my-[1px] rounded-full w-20 mx-auto"></div>
              <div className="h-2 mx-auto bg-gray-300  rounded-full"></div>
              <div className="h-2 mx-auto bg-gray-300  rounded-full"></div>
              <div className="h-2 mx-auto bg-gray-300  w-10 rounded-full"></div>
              <div className="py-5">
                <div className="h-3 mx-auto bg-gray-300 w-24 "></div>
              </div>
              <div className="flex justify-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-300"></div>
                <div className="w-8 h-8 rounded-full bg-gray-300"></div>
              </div>
            </div>
          </section>

          <section className="border-2 border-gray-300">
            <div className="flex items-center justify-center w-full h-[256px] bg-gray-300 rounded  ">
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
            <div className="mx-2 space-y-2 py-1">
              <div className="h-2  bg-gray-300 my-[1px] rounded-full w-20 mx-auto"></div>
              <div className="h-2 mx-auto bg-gray-300  rounded-full"></div>
              <div className="h-2 mx-auto bg-gray-300  rounded-full"></div>
              <div className="h-2 mx-auto bg-gray-300  w-10 rounded-full"></div>
              <div className="py-5">
                <div className="h-3 mx-auto bg-gray-300 w-24 "></div>
              </div>
              <div className="flex justify-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-300"></div>
                <div className="w-8 h-8 rounded-full bg-gray-300"></div>
              </div>
            </div>
          </section>
        </div>

        <div className="flex justify-end mt-[40px] space-x-2">
          <div className="w-10 h-10 rounded-full bg-gray-300"></div>
          <div className="w-10 h-10 rounded-full bg-gray-300"></div>
        </div>
      </div>
    </>
  )
}
