import { useAddCommentMutation } from '@/services/comment.service'
import { useProductContext } from '@/views/product-details.view'
import { Button } from 'flowbite-react'
import { FormEvent, useContext, useEffect, useRef, useState } from 'react'

import { toast } from 'react-toastify'

export const RatingForm = () => {
  const product = useProductContext()
  const refForm = useRef<HTMLFormElement>(null)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [rate, setRate] = useState('0')
  const [message, setMessage] = useState('')

  const [initaddComment, result] = useAddCommentMutation()

  const addComment = async (e: FormEvent<HTMLFormElement>) => {
    console.log('wapp')

    e.preventDefault()
    try {
      await initaddComment({
        fullName: name,
        message,
        rate: parseInt(rate),
        productSlug: product!.slug
      }).unwrap()

      console.log('is ok')
      toast.success('Votre message a été ajouté avec success', {
        theme: 'colored'
      })

      refForm.current?.reset()
    } catch (error) {
      console.log(error)
    }
  }

  // useEffect(() => {
  //   if (result.isSuccess) {
  //     console.log('is success')
  //   }
  // }, [result.isSuccess])

  return (
    <>
      <div id="review-form">
        <form
          onSubmit={(e) => addComment(e)}
          ref={refForm}
          className="review-form"
        >
          <input
            className="input"
            type="text"
            placeholder="Your Name"
            name="name"
            onChange={(e) => setName(() => e.target.value)}
            // value={name}
          />
          <input
            className="input"
            type="email"
            placeholder="Your Email"
            name="email"
            onChange={(e) => setEmail(() => e.target.value)}
            // value={email}
          />
          <textarea
            className="input"
            onChange={(e) => setMessage(() => e.target.value)}
            placeholder="Your Review"
            // value={message}
          ></textarea>
          <div className="input-rating">
            <span>Your Rating: </span>
            <div className="stars">
              <input
                id="star5"
                name="rating"
                onChange={(e) => setRate(() => e.target.value)}
                value="5"
                type="radio"
              />
              <label htmlFor="star5"></label>
              <input
                id="star4"
                onChange={(e) => setRate(() => e.target.value)}
                name="rating"
                value="4"
                type="radio"
              />
              <label htmlFor="star4"></label>
              <input
                id="star3"
                name="rating"
                onChange={(e) => setRate(() => e.target.value)}
                value="3"
                type="radio"
              />
              <label htmlFor="star3"></label>
              <input
                id="star2"
                name="rating"
                onChange={(e) => setRate(() => e.target.value)}
                value="2"
                type="radio"
              />
              <label htmlFor="star2"></label>
              <input
                id="star1"
                name="rating"
                onChange={(e) => setRate(() => e.target.value)}
                value="1"
                type="radio"
              />
              <label htmlFor="star1"></label>
            </div>
          </div>
          <Button className="rounded-full px-4" size="sm">
            Submit
          </Button>
        </form>
      </div>
    </>
  )
}
