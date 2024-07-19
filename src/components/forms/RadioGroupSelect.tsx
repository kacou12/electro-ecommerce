import { Dispatch, useRef, useState } from 'react'
import { Checkbox, Field, Label } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/16/solid'
import { CommonType } from '@/interfaces/global.interface'

function RadioGroupSelect({
  brands,
  selectedBrands,
  setSelectedBrands
}: {
  brands: CommonType[]
  selectedBrands: string[]
  setSelectedBrands: Dispatch<React.SetStateAction<string[]>>
}) {
  const changeCheckBox = (selectSlug: string) => {
    if (selectedBrands.includes(selectSlug)) {
      const filterValues = selectedBrands.filter((val) => val != selectSlug)
      return setSelectedBrands(() => filterValues)
    }
    if (!selectedBrands.includes(selectSlug)) {
      const filterValues = [...selectedBrands, selectSlug]
      return setSelectedBrands(() => filterValues)
    }
  }

  return (
    <>
      <div className="space-y-4 my-2">
        {brands.map((brand) => {
          let checked = selectedBrands.includes(brand.slug)
          return (
            <Field key={brand.id} className="flex items-center gap-4  ">
              <Checkbox
                refName={brand.id}
                checked={checked}
                onClick={() => changeCheckBox(brand.slug)}
                className={`
                  ${checked && 'ring-primary'} 
                  group size-5 rounded border bg-white
                  ring-0
                  data-[checked]:ring-1
                  outline-none
                  ring-inset
                  flex justify-center items-center
                  
                `}
              >
                <CheckIcon
                  className={`"
                ${checked ? 'scale-100' : 'scale-0'}
                transition-transform duration-200 ease-out

                size-5 fill-primary group-data-[checked]:block`}
                />
              </Checkbox>

              <Label className="text-sm cursor-pointer  w-full">
                {brand.title}
              </Label>
            </Field>
          )
        })}
      </div>
    </>
  )
}

export { RadioGroupSelect }
