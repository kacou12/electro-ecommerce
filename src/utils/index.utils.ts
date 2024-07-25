import { ProductType } from '@/interfaces/global.interface'
import dayjs from 'dayjs'

export function classNames(...classes: unknown[]): string {
  return classes.filter(Boolean).join(' ')
}
export const formatPrice = (price: number) =>
  new Intl.NumberFormat('ci-CI', {
    style: 'currency',
    currency: 'XOF'
  }).format(price)

export const formatReductPrice = (product: ProductType) => {
  return formatPrice(product.price - (product.price * product.reduction!) / 100)
}
export const reductPrice = (product: ProductType) => {
  return product.price - (product.price * product.reduction!) / 100
}

// declare the function
export const shuffle = <T>(array: T[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

export const isNew = (createdAt: Date) => {
  const date1 = dayjs(Date.now())
  const date2 = dayjs(createdAt)
  return date1.diff(date2, 'month') <= 1
  // product.createdAt.
}

export const pause = (duration: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, duration)
  })
}
