import { useGetTopSellingProductsByCategorySlugQuery } from '@/services/products.service'
import { useRef } from 'react'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import Slider, { Settings } from 'react-slick'
import ProdutLine from '../products/slick-produt-line.component'

function MiniSlider({
  title,
  categorySlug
}: {
  title: string
  categorySlug: string
}) {
  const { data: products, isFetching } =
    useGetTopSellingProductsByCategorySlugQuery(categorySlug)
  let sliderRef = useRef<Slider | null>(null)
  const settings: Settings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 200,
    autoplaySpeed: 5000,
    cssEase: 'linear',
    arrows: false,
    dots: false
    // responsive: [
    //   {
    //     breakpoint: 960,
    //     settings: {
    //       slidesToShow: 3
    //     }
    //   },
    //   {
    //     breakpoint: 700,
    //     settings: {
    //       slidesToShow: 2
    //     }
    //   },
    //   {
    //     breakpoint: 480,
    //     settings: {
    //       slidesToShow: 2
    //     }
    //   },
    //   {
    //     breakpoint: 320,
    //     settings: {
    //       slidesToShow: 1
    //     }
    //   }
    // ]
  }

  const listProducts = () => {
    let mapPrpoducts: JSX.Element[] = []
    for (let index = 0; index <= products!.length - 2; index += 3) {
      const currentProduct = products![index]
      let currentLine = (
        <div key={currentProduct.id} className="space-y-4">
          <ProdutLine product={products![index]}></ProdutLine>
          <ProdutLine product={products![index + 1]}></ProdutLine>
          <ProdutLine product={products![index + 2]}></ProdutLine>
        </div>
      )
      mapPrpoducts.push(currentLine)
    }
    return mapPrpoducts
  }

  return (
    <>
      <div className="section-title">
        <div className="flex justify-between">
          <h4 className="title text-xl font-bold">{title}</h4>
          <div className="space-x-2 flex">
            <div
              className="rounded-full p-2 border-2 cursor-pointer"
              onClick={() => sliderRef.current?.slickPrev()}
            >
              <IoIosArrowBack />
            </div>
            <div
              className="rounded-full p-2 border-2  cursor-pointer"
              onClick={() => sliderRef.current?.slickNext()}
            >
              <IoIosArrowForward />
            </div>
          </div>
        </div>
        <div className="section-nav">
          <div id="slick-nav-3" className="products-slick-nav"></div>
        </div>
      </div>

      <div className="products-widget-slick" data-nav="#slick-nav-3">
        <div className=" ">
          <Slider ref={sliderRef} {...settings}>
            {isFetching ? (
              <SkeletonMiniSliderLine></SkeletonMiniSliderLine>
            ) : (
              listProducts()
            )}
          </Slider>
        </div>
      </div>
    </>
  )
}

const SkeletonMiniSliderLine = () => {
  return (
    <>
      <div
        role="status"
        className="animate-pulse flex items-center h-[60px] space-x-2 my-2"
      >
        <div className="flex items-center justify-center w-[60px] h[60px] bg-gray-300 rounded ">
          <svg
            className="w-10 h-10 text-gray-200 dark:text-gray-600"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 18"
          >
            <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
          </svg>
        </div>
        <div className="flex-1 space-y-2 p-1">
          <div className="h-2.5 bg-gray-200 rounded-full  w-20"></div>
          <div className="h-2 bg-gray-200 rounded-full  w-full"></div>
          <div className="h-2 bg-gray-200 rounded-full w-[70%]"></div>
        </div>
        <span className="sr-only">Loading...</span>
      </div>
    </>
  )
}

export default MiniSlider
