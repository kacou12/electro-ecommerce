import { RouteEnum } from '@/routes/route.enum'
import { useGetAllCollectionsQuery } from '@/services/collections.service'
import { Link, useLocation, useParams } from 'react-router-dom'

export const Navigation = () => {
  const { data: collections } = useGetAllCollectionsQuery()
  const { collectionSlug } = useParams()
  const { pathname } = useLocation()

  const listNav = () => {
    return collections?.map((collection) => (
      <li
        className={`${collectionSlug == collection.slug && 'active'}`}
        key={collection.id}
      >
        <Link
          reloadDocument={true}
          to={`/${collection.slug}`}
          className="text-header"
        >
          {collection.title}
        </Link>
      </li>
    ))
  }
  return (
    <>
      {/* <!-- NAVIGATION --> */}
      <nav id="navigation" className="bg-gray-800 text-white">
        {/* <!-- container --> */}
        <div className="centerContent">
          {/* <!-- responsive-nav --> */}
          <div id="responsive-nav">
            {/* <!-- NAV --> */}
            <ul className="main-nav nav flex py-4 text-[14px]">
              <li className={`${pathname == RouteEnum.DEFAULT && 'active'}`}>
                <Link to={RouteEnum.DEFAULT} className="text-header">
                  Home
                </Link>
              </li>
              <li className={`${pathname == RouteEnum.HOTDEALS && 'active'}`}>
                <Link to={RouteEnum.HOTDEALS} className="text-header">
                  Hot Deals
                </Link>
              </li>
              {listNav()}
            </ul>
            {/* <!-- /NAV --> */}
          </div>
          {/* <!-- /responsive-nav --> */}
        </div>
        {/* <!-- /container --> */}
      </nav>
      {/* <!-- /NAVIGATION --> */}
    </>
  )
}
