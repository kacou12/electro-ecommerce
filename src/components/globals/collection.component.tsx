import { CollectionType } from '@/interfaces/global.interface'

export function Collection({ collection }: { collection: CollectionType }) {
  return (
    <>
      {/* <!-- shop --> */}
      <div className="w-full md:w-1/3 px-4 mb-8">
        <div className="shop">
          <div className="shop-img w-[343px] h-[232px]">
            <img
              src={collection.img}
              className="object-contain w-[250px] h-[240px]"
              alt="Collection"
            ></img>
          </div>
          <div className="p-4 shop-body">
            <h3 className="text-2xl font-semibold">
              {collection.title} <br /> Collection
            </h3>
            <a
              href="#"
              className=" mt-2 text-white hover:text-gray-400 transition-colors space-x-[2px] flex items-center"
            >
              <span>Shop now</span>
              <i className="fa fa-arrow-circle-right"></i>
            </a>
          </div>
        </div>
      </div>
      {/* <!-- /shop --> */}
    </>
  )
}
