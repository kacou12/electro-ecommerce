import { CommentType, ProductType } from '@/interfaces/global.interface'
import { useGetCommentsByProductSlugQuery } from '@/services/comment.service'
import { paginateTheme } from '@/utils/tailwind.theme'
import { Pagination } from 'flowbite-react'
import { useEffect, useRef, useState } from 'react'
import { CommentLine } from './comment-line.component'

export const CommentMain = ({ comments }: { comments: CommentType[] }) => {
  const currentPage = useRef(1)
  const [currentComments, setCurrentComments] = useState<CommentType[]>([])

  const itemsPerPage = 3
  const setDataPage = () => {
    const indexOfLastRecord = currentPage.current * itemsPerPage
    const indexOfFirstRecord = indexOfLastRecord - itemsPerPage
    setCurrentComments(() =>
      comments!.slice(indexOfFirstRecord, indexOfLastRecord)
    )
  }

  const onPageChange = (page: number) => {
    currentPage.current = page
    setDataPage()
  }
  useEffect(() => {
    setDataPage()
  }, [])
  if (comments.length == 0) {
    return (
      <div className="h-full flex justify-center items-center">
        <p>Aucun commentaire</p>
      </div>
    )
  }

  return (
    <>
      <div className="flex flex-col h-full">
        <div className="flex-1 ">
          <div>
            <ul className="reviews">
              {currentComments.map((item) => (
                <CommentLine comment={item} key={item.id}></CommentLine>
              ))}
            </ul>
          </div>
        </div>
        <div className="h-fit flex overflow-x-auto sm:justify-center ">
          {comments!.length > itemsPerPage && (
            <Pagination
              layout="pagination"
              currentPage={currentPage.current}
              totalPages={Math.ceil(comments!.length / itemsPerPage)}
              previousLabel=""
              nextLabel=""
              theme={paginateTheme}
              onPageChange={onPageChange}
              showIcons
            />
          )}
        </div>
      </div>
    </>
  )
}
