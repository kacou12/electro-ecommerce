import { RouteEnum } from '@/routes/route.enum'
import { useAppDispatch } from '@/store'
import { logout } from '@/store/slices/auth.slice'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Link } from 'react-router-dom'

export const ProfileDropdown = () => {
  const dispatch = useAppDispatch()
  const initLogout = () => {
    dispatch(logout())
  }
  return (
    <>
      {/* Profile dropdown */}
      <Menu as="div" className="relative ml-3">
        <div>
          <MenuButton
            className="relative flex rounded-full 
          bg-gray-800 text-sm "
          >
            {({ hover, active }) => (
              <>
                <span className="absolute -inset-1.5" />
                <span className="sr-only">Open user menu</span>

                <li>
                  <a href="#" className={`flex items-center`}>
                    <i className="fa-regular fa-user mr-1"></i>
                    <span
                      className={`${
                        hover || active ? 'text-primary flex items-center' : ''
                      }`}
                    >
                      My Account
                    </span>
                  </a>
                </li>
              </>
            )}
          </MenuButton>
        </div>
        <MenuItems
          transition
          className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
        >
          <MenuItem>
            <Link
              to={RouteEnum.PROFIL}
              className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
            >
              Your Profile
            </Link>
          </MenuItem>
          <MenuItem>
            <a
              href=""
              onClick={initLogout}
              className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
            >
              Sign out
            </a>
          </MenuItem>
        </MenuItems>
      </Menu>
    </>
  )
}
