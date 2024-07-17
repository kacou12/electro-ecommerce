import { createRoot } from 'react-dom/client'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import './styles/local.scss'
import './styles/index.scss'
import React, { Suspense } from 'react'
import 'tailwindcss/tailwind.css'
import {
  RouterProvider,
  ScrollRestoration,
  useLoaderData
} from 'react-router-dom'
import { router } from '@/routes/index.route'
import { Flowbite } from 'flowbite-react'
import { customTheme } from './utils/tailwind.theme'
import { Provider } from 'react-redux'
import { store } from './store'
import { Loader } from './components/loader'
import { ErrorBoundary } from 'react-error-boundary'
import { PageError } from './views/page-error'

const container = document.getElementById('root') as HTMLDivElement
const root = createRoot(container)

root.render(
  // @ts-ignore
  <React.StrictMode>
    {/* <App /> */}
    {/* <Provider store={store}> */}
    <Flowbite theme={{ theme: customTheme }}>
      <Provider store={store}>
        <Suspense fallback={<Loader />}>
          <ErrorBoundary FallbackComponent={PageError}>
            <RouterProvider router={router} />
          </ErrorBoundary>
        </Suspense>
      </Provider>
    </Flowbite>
    {/* </Provider> */}
  </React.StrictMode>
)
