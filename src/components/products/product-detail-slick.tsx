import React, { useEffect, useRef, useState } from 'react'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'
import Slider, { Settings } from 'react-slick'

export const ProductDetailSlick = ({ imgs }: { imgs: string[] }) => {
  const [nav1, setNav1] = useState<Slider | undefined>()
  const [nav2, setNav2] = useState<Slider | undefined>()

  const settings: Settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    // centerMode: true,
    // centerPadding: '10px',
    slidesToScroll: 1,
    vertical: true,
    verticalSwiping: true,
    focusOnSelect: true,
    arrows: false

    // autoplay: true,,
  }

  const card = (text: string) => {
    return (
      <div className="h-[169px] img-slick border-2 border-gray-200 bg-white text-white  flex justify-center items-center ">
        <img
          className="w-full h-full"
          data-src-large={text}
          src={text}
          alt=""
        />
        {/* {index} */}
      </div>
    )
  }
  const wideCard = (text: string) => {
    const imgText = text.replace('r250', 'r900')
    return (
      <div className="h-[525px] bg-white text-white  flex justify-center items-center ">
        <img className="object-contain w-[90%] h-[90%]" src={imgText} alt="" />
      </div>
    )
  }

  const customArrowUp = () => {
    return (
      <div
        onClick={() => nav1!.slickNext()}
        className="rounded-full p-[10px] cursor-pointer absolute top-[-20px] left-[40%] right-[50]  z-10
          bg-white
          border-[1px]
          hover:border-transparent
          hover:bg-primary hover:text-white
          transition-all duration-300 ease-in-out"
      >
        <IoIosArrowUp />
      </div>
    )
  }
  const customArrowDown = () => {
    return (
      <div
        onClick={() => nav1!.slickPrev()}
        className="button rounded-full p-[10px] cursor-pointer absolute bottom-[-20px] left-[40%] right-[50]  z-10
          bg-white
          border-[1px]
          hover:border-transparent
          hover:bg-primary hover:text-white
          transition-all duration-300 ease-in-out"
      >
        <IoIosArrowDown />
      </div>
    )
  }

  return (
    <div className="h-full  bg-white">
      <div className="grid grid-cols-4 gap-4 h-full">
        {/* SLIDE COLUMN */}
        <section className="col-span-1  relative">
          {customArrowUp()}
          <Slider
            asNavFor={nav1}
            // @ts-ignore
            ref={(slider2) => setNav2(slider2)}
            {...settings}
            className="h-full vertical-slick"
          >
            {imgs.map((img) => {
              return <div key={img}>{card(img)}</div>
            })}
          </Slider>
          {customArrowDown()}
        </section>
        {/* END SLIDE COLUMN */}

        {/* SLIDE ROW */}
        <section className="col-span-3 bg-green-400 h-full">
          <Slider
            asNavFor={nav2}
            slidesToShow={1}
            slidesToScroll={1}
            // @ts-ignore
            ref={(slider1) => setNav1(slider1)}
            className="h-full horizontal-slick"
          >
            {imgs.map((img) => {
              return <div key={img}>{wideCard(img)}</div>
            })}
          </Slider>
        </section>
        {/*END  SLIDE ROW */}
      </div>
    </div>
  )
}
