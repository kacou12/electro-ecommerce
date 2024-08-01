import { CommonType, SortTypeEnum } from '@/interfaces/global.interface'
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions
} from '@headlessui/react'
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid'
import clsx from 'clsx'
import { Dispatch } from 'react'

const dataFilterBy: CommonType[] = [
  { id: '3', title: 'Prix croissant', slug: SortTypeEnum.PRICE_ASC },
  { id: '4', title: 'Prix décroissant', slug: SortTypeEnum.PRICE_DESC },
  { id: '5', title: 'Les mieux notés', slug: SortTypeEnum.RATING_DESC }
]

export default function FilterSelect({
  selectedFilterBy,
  setSelectedFilterBy
}: {
  selectedFilterBy: SortTypeEnum | null
  setSelectedFilterBy: Dispatch<React.SetStateAction<SortTypeEnum | null>>
}) {
  // const [selected, setSelected] = useState(dataFilterBy[1])

  return (
    <div className="md:mx-auto h-fit w-full md:w-72 ">
      <Listbox value={selectedFilterBy} onChange={setSelectedFilterBy}>
        <ListboxButton
          className={clsx(
            'relative block w-full rounded-lg bg-white py-1.5 pr-8 pl-3 text-left text-sm/6 text-black border-2 '
          )}
        >
          <span className="font-bold">Trier par : </span>
          {selectedFilterBy == null ? (
            <span></span>
          ) : (
            <span>
              {dataFilterBy.find((el) => el.slug == selectedFilterBy)?.title}
            </span>
          )}
          <ChevronDownIcon
            className="group pointer-events-none absolute top-2.5 right-2.5 size-4 fill-black"
            aria-hidden="true"
          />
        </ListboxButton>
        <ListboxOptions
          anchor="bottom"
          transition
          className={clsx(
            'w-[var(--button-width)] mt-1 rounded-xl border-2 border-gray-200 bg-white p-1 [--anchor-gap:var(--spacing-1)] focus:outline-none',
            'transition-opacity duration-200 ease-in-out  data-[leave]:data-[closed]:opacity-0'
          )}
        >
          {dataFilterBy.map((filterBy) => (
            <ListboxOption
              key={filterBy.title}
              value={filterBy.slug}
              className="group flex  cursor-default items-center gap-2 rounded-lg py-2.5 px-3 select-none  data-[focus]:text-white data-[focus]:bg-primary"
            >
              <CheckIcon className="invisible size-4 fill-black group-data-[selected]:visible " />
              <div className="text-sm">{filterBy.title}</div>
            </ListboxOption>
          ))}
        </ListboxOptions>
      </Listbox>
    </div>
  )
}
