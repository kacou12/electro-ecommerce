import { RouteEnum } from '@/routes/route.enum'
import { useAppSelector } from '@/store'
import { Navigate, Outlet, useLocation } from 'react-router'
import { Link, ScrollRestoration } from 'react-router-dom'
import { Bounce, ToastContainer } from 'react-toastify'
import { MdOutlineKeyboardBackspace } from 'react-icons/md'

export default function GuestLayout({
  children
}: {
  children: React.ReactNode
}) {
  const { loading, error, userInfo } = useAppSelector((state) => state.auth)

  const isAuth = () => {
    return userInfo ? true : false
  }

  if (isAuth()) {
    return <Navigate to={RouteEnum.PROFIL} replace />
  }
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce}
      ></ToastContainer>
      {/* Same as */}
      <ScrollRestoration />

      <div className="guestLayout">
        <section className="login">
          <div className="login_box">
            <div className="left">
              <div className="">
                <Link to="/" className="flex items-center space-x-1">
                  <MdOutlineKeyboardBackspace />
                  <span>Return home</span>
                </Link>
              </div>
              <div className=" h-full  flex items-center justify-center">
                {/* CHILDREN */}
                {children}
                {/* END CHILDREN */}
              </div>
            </div>
            <div className="right">
              <div className="right-text">
                <h2>ELECTRO</h2>
                <h5>THE BEST ITEMS FOR EVERY TASTE</h5>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
