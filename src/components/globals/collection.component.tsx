import { Category } from '@/interfaces/global.interface'

export function Collection({ category }: { category: Category }) {
  return (
    <>
      {/* <!-- shop --> */}
      <div className="w-full md:w-1/3 px-4 mb-8">
        <div className="shop">
          <div className="shop-img">
            <img src={category.img} alt="Laptop Collection"></img>
          </div>
          <div className="p-4 shop-body">
            <h3 className="text-2xl font-semibold">
              {category.title} <br /> Collection
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
