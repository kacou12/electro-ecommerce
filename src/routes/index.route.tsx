// import HotDeals from '@/views/hot-deals.view'
import { lazy } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { RouteEnum } from './route.enum'
// import { useQuery } from '@tanstack/react-query'
import { PageError } from '@/views/page-error'
import { categoryLoader } from './loaders/category.loader'
import { collectionLoader } from './loaders/collection.loader'
import { homeLoader } from './loaders/home.loader'

// LAYOUT
import Auth from '@/layouts/auth.layout'
import Default from '@/layouts/default.layout'

const ProductDetails = lazy(() => import('@/views/product-details.view'))
const Home = lazy(() => import('@/views/home.view'))
const App = lazy(() => import('@/components/App'))
const Category = lazy(() => import('@/views/category.view'))
const Collection = lazy(() => import('@/views/collection.view'))
const HotDeals = lazy(() => import('@/views/hot-deals.view'))
const Search = lazy(() => import('@/views/search.view'))
const Login = lazy(() => import('@/views/guest/login.view'))
const Register = lazy(() => import('@/views/guest/register.view'))
const Profil = lazy(() => import('@/views/auth/profile.view'))

const Test = lazy(() => import('@/views/Test.view'))

export const router = createBrowserRouter([
  {
    path: RouteEnum.DEFAULT,
    element: <Default></Default>,
    ErrorBoundary: () => <PageError />,

    children: [
      {
        path: RouteEnum.DEFAULT,
        element: <Home />,
        loader: homeLoader,
        index: true
      },

      {
        path: RouteEnum.COLLECTION,
        element: <Collection />,
        ErrorBoundary: () => <PageError />,
        loader: collectionLoader
      },
      {
        path: RouteEnum.CATEGORY,
        element: <Category />,
        ErrorBoundary: () => <PageError />,
        loader: categoryLoader
      },
      {
        path: RouteEnum.PRODUCT_DETAILS,
        element: <ProductDetails />
        // loader: productLoader
      },

      {
        path: RouteEnum.HOTDEALS,
        element: <HotDeals />
        // loader: hotDealLoader
      },
      {
        path: RouteEnum.SEARCH,
        element: <Search />
      }
    ]
  },
  {
    path: RouteEnum.TEST,
    element: <Test />
  },
  {
    path: RouteEnum.LOGIN,
    element: <Login />
  },
  {
    path: RouteEnum.REGISTER,
    element: <Register />
  },
  {
    path: RouteEnum.AUTH,
    element: <Auth />,
    ErrorBoundary: () => <PageError />,
    // loader: authLoader,
    children: [
      {
        path: RouteEnum.PROFIL,
        element: <Profil />
      }
    ]
  }
])
