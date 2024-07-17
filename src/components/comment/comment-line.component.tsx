import React from 'react'

export const CommentLine = () => {
  return (
    <>
      <li>
        <div className="review-heading">
          <h5 className="name text-sm font-bold">John</h5>
          <p className="date">27 DEC 2018, 8:0 PM</p>
          <div className="review-rating">
            <i className="fa fa-star fa-xs"></i>
            <i className="fa fa-star fa-xs"></i>
            <i className="fa fa-star fa-xs"></i>
            <i className="fa fa-star fa-xs"></i>
            <i className="fa-regular fa-star  empty fa-xs"></i>
          </div>
        </div>
        <div className="review-body">
          <p className="text-sm">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua
          </p>
        </div>
      </li>
    </>
  )
}
