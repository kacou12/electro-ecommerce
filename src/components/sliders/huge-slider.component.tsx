import { ProductType } from '@/interfaces/global.interface'
import React, { useRef } from 'react'
import Slider, { Settings } from 'react-slick'
import { IoIosArrowBack } from 'react-icons/io'
import { IoIosArrowForward } from 'react-icons/io'
import ProductCard from '../products/product-card.component'

function HugeSlider({ products }: { products: ProductType[] }) {
  let sliderRef = useRef<Slider | null>(null)
  const settings: Settings = {
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    speed: 200,
    autoplaySpeed: 4000,
    cssEase: 'linear',
    arrows: false,
    dots: false,
    responsive: [
      {
        breakpoint: 960,
        settings: {
          slidesToShow: 3
        }
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1
        }
      },
      {
        breakpoint: 320,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  }

  const listProducts = () => {
    return products.map((product) => (
      <div key={product.id}>
        <ProductCard product={product}></ProductCard>
      </div>
    ))
  }

  return (
    <div className=" relative myslider">
      <Slider ref={sliderRef} {...settings}>
        {listProducts()}
      </Slider>

      <div className="absolute bottom-1 right-6 space-x-2 flex">
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
  )
}

export default HugeSlider
