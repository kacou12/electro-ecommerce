import React from 'react'

export const LocalRating = ({ rate }: { rate: number }) => {
  const rateElements = () => {
    let elements: JSX.Element[] = []
    for (let index = 0; index < rate; index++) {
      elements.push(<i key={index + 1} className="fa fa-star fa-xs"></i>)
    }
    if (5 - rate) {
      for (let index = 0; index < 5 - rate; index++) {
        elements.push(
          <i
            key={elements.length + index + 1}
            className="fa-regular fa-star fa-xs"
          ></i>
        )
      }
    }
    return elements
  }
  return (
    <>
      <div className="product-rating">{rateElements()}</div>
    </>
  )
}
