import { createBrowserRouter, Link, redirect } from 'react-router-dom'
import { RouteEnum } from './route.enum'
import { lazy } from 'react'
import HotDeals from '@/views/hot-deals.view'
// import { useQuery } from '@tanstack/react-query'
import { collectionApi } from '@/services/collections.service'
import { store } from '@/store'
import { PageError } from '@/views/page-error'
import { collectionLoader } from './loaders/collection.loader'
import { homeLoader } from './loaders/home.loader'
import { categoryLoader } from './loaders/category.loader'
import { hotDealLoader } from './loaders/hotdeal.loader'
// import Collection from '@/views/collection.view'

const ProductDetails = lazy(() => import('@/views/product-details.view'))
const Home = lazy(() => import('@/views/home.view'))
const App = lazy(() => import('@/components/App'))
const Category = lazy(() => import('@/views/category.view'))
const Collection = lazy(() => import('@/views/collection.view'))
const Hotdeals = lazy(() => import('@/views/hot-deals.view'))

const Test = lazy(() => import('@/views/Test.view'))

export const router = createBrowserRouter([
  {
    path: RouteEnum.DEFAULT,
    element: <App></App>,
    ErrorBoundary: () => <PageError></PageError>,
    children: [
      {
        path: RouteEnum.DEFAULT,
        element: <Home></Home>,
        loader: homeLoader
      },
      {
        path: RouteEnum.TEST,
        element: <Collection></Collection>
      },
      {
        path: RouteEnum.COLLECTION,
        element: <Collection></Collection>,
        ErrorBoundary: () => <PageError></PageError>,
        loader: collectionLoader
      },
      {
        path: RouteEnum.CATEGORY,
        element: <Category></Category>,
        ErrorBoundary: () => <PageError></PageError>,
        loader: categoryLoader
      },
      {
        path: RouteEnum.PRODUCT_DETAILS,
        element: <ProductDetails></ProductDetails>
      },
      {
        path: RouteEnum.HOTDEALS,
        element: <HotDeals></HotDeals>,
        loader: hotDealLoader
      }
    ]
  }
])
