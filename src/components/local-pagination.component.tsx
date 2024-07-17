import { MouseEventHandler, ReactElement, useCallback, useState } from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

function Button2({
  content,
  onClick,
  active,
  disabled
}: {
  content: ReactElement<any, any> | number
  active?: boolean
  disabled?: boolean
  onClick: MouseEventHandler<HTMLButtonElement>
}) {
  return (
    <button
      className={`flex flex-col cursor-pointer items-center justify-center w-9 h-9 shadow-[0_4px_10px_rgba(0,0,0,0.03)] text-sm font-normal transition-colors rounded-lg
      ${active ? 'bg-green-400   text-white' : 'text-primary '}
      ${typeof content != 'number' && 'navPaginate'}
      ${
        !disabled
          ? 'bg-white hover:bg-primary  hover:text-white'
          : 'text-red-300 bg-white cursor-not-allowed '
      }
      `}
      onClick={onClick}
      disabled={disabled}
    >
      {content}
    </button>
  )
}

function PaginationNav({
  gotoPage,
  canPreviousPage,
  canNextPage,
  pageCount,
  pageIndex
}: {
  gotoPage: (pageCount: number) => void
  pageIndex: number
  pageCount: number
  canNextPage: boolean
  canPreviousPage: boolean
}) {
  const renderPageLinks = useCallback(() => {
    if (pageCount === 0) return null
    const visiblePageButtonCount = 3
    let numberOfButtons =
      pageCount < visiblePageButtonCount ? pageCount : visiblePageButtonCount
    const pageIndices = [pageIndex]
    numberOfButtons--
    ;[...Array(numberOfButtons)].forEach((_item, itemIndex) => {
      const pageNumberBefore = pageIndices[0] - 1
      const pageNumberAfter = pageIndices[pageIndices.length - 1] + 1
      if (
        pageNumberBefore >= 0 &&
        (itemIndex < numberOfButtons / 2 || pageNumberAfter > pageCount - 1)
      ) {
        pageIndices.unshift(pageNumberBefore)
      } else {
        pageIndices.push(pageNumberAfter)
      }
    })
    return pageIndices.map((pageIndexToMap) => (
      <li key={pageIndexToMap}>
        <Button2
          content={pageIndexToMap + 1}
          onClick={() => gotoPage(pageIndexToMap)}
          active={pageIndex === pageIndexToMap}
        />
      </li>
    ))
  }, [pageCount, pageIndex])
  return (
    <ul className="flex gap-2">
      <li>
        <Button2
          content={
            <div className="flex ml-1">
              <FaChevronLeft size="0.6rem" />
              <FaChevronLeft size="0.6rem" className="-translate-x-1/2" />
            </div>
          }
          onClick={() => gotoPage(0)}
          disabled={!canPreviousPage}
        />
      </li>
      {renderPageLinks()}
      <li>
        <Button2
          content={
            <div className="flex ml-1">
              <FaChevronRight size="0.6rem" />
              <FaChevronRight size="0.6rem" className="-translate-x-1/2" />
            </div>
          }
          onClick={() => gotoPage(pageCount - 1)}
          disabled={!canNextPage}
        />
      </li>
    </ul>
  )
}

function LocalPagination({
  pageCount = 40,
  currentPage = 1
}: {
  pageCount?: number
  currentPage?: number
}) {
  const [pageIndex, setPageIndex] = useState(currentPage - 1)
  return (
    <div className="flex gap-3 flex-wrap p-6 py-12">
      <PaginationNav
        gotoPage={setPageIndex}
        canPreviousPage={pageIndex > 0}
        canNextPage={pageIndex < pageCount - 1}
        pageCount={pageCount}
        pageIndex={pageIndex}
      />
    </div>
  )
}

export { LocalPagination }
