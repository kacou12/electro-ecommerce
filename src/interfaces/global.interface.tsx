export interface ProductType {
  id: string
  title: string
  subtitle: string
  slug: string
  price: number
  collection: CollectionType
  category: CommonType
  brand: CommonType
  isNew?: boolean
  reduction?: ReductionEnum
  rating?: number
  images: string[]
  description: string
  details: string
  createdAt: Date
}
export enum SortTypeEnum {
  PRICE_ASC = 'price_asc',
  PRICE_DESC = 'price_desc',
  RATING_DESC = 'rating_desc'
}
export interface QueryData {
  params: string
  searchParams?: string
}
export type CommonFilter = {
  brandSlugs?: string[]
  minMax?: number[]
  sort?: SortTypeEnum
}

export interface BrandType extends CommonType {}
export interface CategoryType extends CommonType {
  brands: CommonType[]
}

export interface CollectionType extends CommonType {
  brands: CommonType[]
  categories: CategoryType[]
}
export interface PaginateData<T> {
  count: number
  data: Array<T>
}

export interface CommonType {
  id: string
  title: string
  slug: string
  img?: string
}
export enum ReductionEnum {
  TEN = 10,
  TWENTY = 20,
  THIRTY = 30,
  FOUR = 40,
  FIFTY = 50,
  SIXTY = 60,
  SEVENTY = 70,
  EIGHTY = 80,
  NINETY = 90
}
