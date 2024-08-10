import { SortTypeEnum } from '@/interfaces/global.interface'

export const useFormatQueryParams = ({
  minMax,
  page,
  selectedBrands,
  selectedFilterBy
}: {
  minMax: number[]
  page: number
  selectedBrands: string[]
  selectedFilterBy: SortTypeEnum | null
}) => {
  const sortData = selectedFilterBy?.split('_')

  const obj: {
    brandSlugs: string[][]
    minMax: (string | number)[][] | null
    sort: string[][] | null
    page: (string | number)[][]
    limit: (string | number)[][]
  } = {
    brandSlugs: selectedBrands.map((brand) => {
      return ['brand.slug', brand]
    }),
    minMax:
      minMax.length != 0
        ? [
            ['price_gte', minMax[0]],
            ['price_lte', minMax[1]]
          ]
        : null,
    sort:
      sortData != null
        ? [
            ['_sort', sortData[0]],
            ['_order', sortData[1]]
          ]
        : null,
    page: [['_page', page]],
    limit: [['_limit', 9]]
  }
  for (let propName in obj) {
    if (
      //@ts-ignore
      obj[propName] == null ||
      //@ts-ignore
      (Array.isArray(obj[propName]) && obj[propName].length === 0)
    ) {
      //@ts-ignore
      delete obj[propName]
    }
  }

  return extractSubObjects(obj)
}

const extractSubObjects = (obj: Object) => {
  //@ts-ignore
  let subObjects = []

  for (const key in obj) {
    //@ts-ignore
    if (Array.isArray(obj[key])) {
      //@ts-ignore
      subObjects = subObjects.concat(obj[key])
      //@ts-ignore
    } else if (typeof obj[key] === 'object' && obj[key] !== null) {
      //@ts-ignore
      subObjects.push(obj[key])
    }
  }

  return subObjects
}
