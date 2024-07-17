import React, { useRef } from 'react'
import Slider, { Settings } from 'react-slick'
import { IoIosArrowBack } from 'react-icons/io'
import { IoIosArrowForward } from 'react-icons/io'
import { ProductType } from '@/interfaces/global.interface'
import ProdutLine from '../products/slick-produt-line.component'
import { useGetTopSellingProductsByCategorySlugQuery } from '@/services/products.service'

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
    autoplay: false,
    speed: 2000,
    autoplaySpeed: 2000,
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
        <div key={currentProduct.id}>
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
            {isFetching ? <span>loading...</span> : listProducts()}
            {/* <div>
              <ProdutLine></ProdutLine>
              <ProdutLine></ProdutLine>
              <ProdutLine></ProdutLine>
            </div>
            <div>
              <ProdutLine></ProdutLine>
              <ProdutLine></ProdutLine>
              <ProdutLine></ProdutLine>
            </div>
            <div>
              <ProdutLine></ProdutLine>
              <ProdutLine></ProdutLine>
              <ProdutLine></ProdutLine>
            </div> */}
          </Slider>
        </div>
      </div>
    </>
  )
}

export default MiniSlider
