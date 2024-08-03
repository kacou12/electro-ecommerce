import { CommentType } from '@/interfaces/global.interface'
import React from 'react'
import { LocalRating } from '../globals/local-rating'

export const CommentLine = ({ comment }: { comment: CommentType }) => {
  return (
    <>
      <li>
        <div className="review-heading">
          <h5 className="name text-sm font-bold line-clamp-1">
            {comment.fullName}
          </h5>
          <p className="date">
            {new Intl.DateTimeFormat('fr-FR', {
              // weekday: 'short',
              year: 'numeric',
              month: 'numeric',
              day: 'numeric',
              hour: 'numeric',
              minute: 'numeric',
              hourCycle: 'h23'
            }).format(new Date(comment.createdAt))}
          </p>
          <div className="review-rating">
            <LocalRating rate={comment.rate}></LocalRating>
          </div>
        </div>
        <div className="review-body">
          <p className="text-sm">{comment.message}</p>
        </div>
      </li>
    </>
  )
}
