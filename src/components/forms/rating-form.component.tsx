import { useAddCommentMutation } from '@/services/comment.service'
import { useProductContext } from '@/views/product-details.view'
import { Button, Textarea, TextInput } from 'flowbite-react'
import { FormEvent, useContext, useEffect, useRef, useState } from 'react'
import * as yup from 'yup'
import { Controller, useForm } from 'react-hook-form'

import { toast } from 'react-toastify'
import { yupResolver } from '@hookform/resolvers/yup'

const ratingschema = yup
  .object({
    name: yup.string().required(),
    email: yup.string().email().required(),
    review: yup.string().required(),
    rating: yup.number().min(1).max(5).required()
  })
  .required()

export const RatingForm = () => {
  const product = useProductContext()
  const refForm = useRef<HTMLFormElement>(null)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [rate, setRate] = useState('0')
  const [message, setMessage] = useState('')
  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(ratingschema)
  })

  const [initaddComment, result] = useAddCommentMutation()

  const submitForm = async (data: any) => {
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
      toast.success('Une erreur est survenue', {
        theme: 'colored'
      })
    }
  }

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
      toast.success('Une erreur est survenue', {
        theme: 'colored'
      })
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
          ref={refForm}
          className="review-form space-y-1"
          onSubmit={handleSubmit(submitForm)}
        >
          <TextInput
            className=""
            type="text"
            color={errors.name && 'failure'}
            placeholder="Your Name"
            {...register('name')}
          />
          <div className="h-5 ">
            {errors.name && (
              <span className="text-xs text-primary">
                {errors.name?.message}
              </span>
            )}
          </div>
          <TextInput
            className=""
            color={errors.email && 'failure'}
            type="email"
            placeholder="Your Email"
            {...register('email')}
          />
          <div className="h-5 ">
            {errors.email && (
              <span className="text-xs text-primary">
                {errors.email?.message}
              </span>
            )}
          </div>
          <Textarea
            rows={4}
            color={errors.review && 'failure'}
            {...register('review')}
            placeholder="Your Review"
          ></Textarea>
          <div className="h-5 ">
            {errors.review && (
              <span className="text-xs text-primary">
                {errors.review?.message}
              </span>
            )}
          </div>
          <div className="input-rating">
            <span>Your Rating: </span>
            <div className="stars">
              <input
                id="star5"
                {...register('rating')}
                value="5"
                type="radio"
              />
              <label htmlFor="star5"></label>
              <input
                id="star4"
                {...register('rating')}
                value="4"
                type="radio"
              />
              <label htmlFor="star4"></label>
              <input
                id="star3"
                {...register('rating')}
                value="3"
                type="radio"
              />
              <label htmlFor="star3"></label>
              <input
                id="star2"
                {...register('rating')}
                value="2"
                type="radio"
              />
              <label htmlFor="star2"></label>
              <input
                id="star1"
                {...register('rating')}
                value="1"
                type="radio"
              />
              <label htmlFor="star1"></label>
            </div>
            <div className="h-6 ">
              {errors.rating && (
                <span className="text-xs text-primary">
                  {errors.rating?.message}
                </span>
              )}
            </div>
          </div>
          <Button type="submit" className="rounded-full px-4" size="sm">
            Submit
          </Button>
        </form>
      </div>
    </>
  )
}
