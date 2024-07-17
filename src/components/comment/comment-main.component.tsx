import React from 'react'
import { CommentLine } from './comment-line.component'
import { FlowbitePaginationTheme, Pagination } from 'flowbite-react'
import { useState } from 'react'
import { paginateTheme } from '@/utils/tailwind.theme'

export const CommentMain = () => {
  const [currentPage, setCurrentPage] = useState(1)

  const onPageChange = (page: number) => setCurrentPage(page)

  return (
    <>
      <div id="reviews">
        <ul className="reviews">
          <CommentLine></CommentLine>
          <CommentLine></CommentLine>
          <CommentLine></CommentLine>
        </ul>

        <div className="flex overflow-x-auto sm:justify-center ">
          <Pagination
            layout="pagination"
            currentPage={currentPage}
            totalPages={1000}
            previousLabel=""
            nextLabel=""
            theme={paginateTheme}
            onPageChange={onPageChange}
            showIcons
          />
        </div>
      </div>
    </>
  )
}
