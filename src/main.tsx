import { router } from '@/routes/index.route'
import { Flowbite } from 'flowbite-react'
import React, { Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { ErrorBoundary } from 'react-error-boundary'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'
import 'tailwindcss/tailwind.css'
import { Loader } from './components/loader'
import { persistore, store } from './store'
import './styles/index.scss'
import './styles/local.scss'
import { customTheme } from './utils/tailwind.theme'
import { PageError } from './views/page-error'
import 'react-toastify/dist/ReactToastify.css'
import { PersistGate } from 'redux-persist/integration/react'

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
          <PersistGate loading={null} persistor={persistore}>
            <ErrorBoundary FallbackComponent={PageError}>
              <RouterProvider router={router} />
            </ErrorBoundary>
          </PersistGate>
        </Suspense>
      </Provider>
    </Flowbite>
    {/* </Provider> */}
  </React.StrictMode>
)
