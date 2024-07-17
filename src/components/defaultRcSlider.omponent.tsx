import React, { ChangeEvent, Dispatch, useState } from 'react'
import Slider from 'rc-slider'
import '@/styles/sliderStyle.css'

export const DefaultRcSlider = ({
  defaultMin = 1000,
  defaultMax = 2500000,
  setMinMax
}: {
  setMinMax: Dispatch<React.SetStateAction<number[]>>
  defaultMin?: number
  defaultMax?: number
}) => {
  const [min, setMin] = useState(defaultMin)
  const [max, setMax] = useState(defaultMax)

  const updateMin = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      setMin(parseInt(e.target.value))
    } else {
      setMin(defaultMin)
    }
  }
  const updateMax = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      setMax(parseInt(e.target.value))
    } else {
      setMax(defaultMax)
    }
  }

  const onChangeSlider = (values: number | number[]) => {
    if (Array.isArray(values)) {
      setMin(values[0])
      setMax(values[1])
    }
  }

  const initFilter = () => {
    setMinMax([min, max])
  }

  return (
    <>
      <section className="flex justify-between items-center">
        <p className="title text-md font-bold">PRIX (FCFA)</p>
        <button
          onClick={initFilter}
          className=" hover:bg-primary/30 text-primary 
        font-bold px-2 py-1 rounded"
        >
          FILTRER
        </button>
      </section>
      <section className="my-4 mx-2">
        <Slider
          styles={{
            rail: { backgroundColor: '#d4d4d6' },
            handle: { backgroundColor: '#D10024' },
            track: { backgroundColor: '#D10024' },
            tracks: { backgroundColor: '#D10024' }
          }}
          min={1000}
          max={5000000}
          value={[min, max]}
          onChange={onChangeSlider}
          step={1000}
          range
        />
      </section>
      <section className="flex space-x-3 items-center">
        <input
          onChange={updateMin}
          value={min}
          min={defaultMin}
          className="shadow appearance-none border rounded w-full py-2 px-3 
          text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="username"
          type="number"
          placeholder="0"
        ></input>
        <span>-</span>
        <input
          onChange={updateMax}
          value={max}
          min={defaultMax}
          className="shadow appearance-none border rounded w-full py-2 px-3 
        text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="username"
          type="number"
          placeholder="0"
        ></input>
      </section>
    </>
  )
}
