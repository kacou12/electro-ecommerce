import React from 'react'

export const RatinForm = () => {
  return (
    <>
      <div id="review-form">
        <form className="review-form">
          <input className="input" type="text" placeholder="Your Name" />
          <input className="input" type="email" placeholder="Your Email" />
          <textarea className="input" placeholder="Your Review"></textarea>
          <div className="input-rating">
            <span>Your Rating: </span>
            <div className="stars">
              <input id="star5" name="rating" value="5" type="radio" />
              <label htmlFor="star5"></label>
              <input id="star4" name="rating" value="4" type="radio" />
              <label htmlFor="star4"></label>
              <input id="star3" name="rating" value="3" type="radio" />
              <label htmlFor="star3"></label>
              <input id="star2" name="rating" value="2" type="radio" />
              <label htmlFor="star2"></label>
              <input id="star1" name="rating" value="1" type="radio" />
              <label htmlFor="star1"></label>
            </div>
          </div>
          <button className="primary-btn">Submit</button>
        </form>
      </div>
    </>
  )
}
