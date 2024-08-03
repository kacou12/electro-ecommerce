import { useAddCommentMutation } from '@/services/comment.service'
import { useProductContext } from '@/views/product-details.view'
import { Button, Textarea, TextInput } from 'flowbite-react'
import { FormEvent, useContext, useEffect, useRef, useState } from 'react'
import * as yup from 'yup'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'

import { toast } from 'react-toastify'
import { yupResolver } from '@hookform/resolvers/yup'

interface RateFormType {
  fullName: string
  email: string
  message: string
  rate: number
}

const ratingschema = yup
  .object({
    fullName: yup.string().required(),
    email: yup.string().email().required(),
    message: yup.string().required(),
    rate: yup.number().min(1).max(5).required()
  })
  .required()

export const RatingForm = () => {
  const product = useProductContext()
  const refForm = useRef<HTMLFormElement>(null)
  const [initaddComment, result] = useAddCommentMutation()

  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<RateFormType>({
    resolver: yupResolver(ratingschema)
  })

  const submitForm: SubmitHandler<RateFormType> = async (data) => {
    try {
      await initaddComment({
        ...data,
        productSlug: product!.slug
      }).unwrap()

      toast.success('Votre message a été ajouté avec success', {
        theme: 'colored'
      })

      refForm.current?.reset()
    } catch (error) {
      toast.error('Une erreur est survenue', {
        theme: 'colored'
      })
    }
  }

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
            color={errors.fullName && 'failure'}
            placeholder="Your Name"
            {...register('fullName')}
          />
          <div className="h-5 ">
            {errors.fullName && (
              <span className="text-xs text-primary">
                {errors.fullName?.message}
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
            color={errors.message && 'failure'}
            {...register('message')}
            placeholder="Your Review"
          ></Textarea>
          <div className="h-5 ">
            {errors.message && (
              <span className="text-xs text-primary">
                {errors.message?.message}
              </span>
            )}
          </div>
          <div className="input-rating">
            <span>Your Rating: </span>
            <div className="stars">
              <input id="star5" {...register('rate')} value="5" type="radio" />
              <label htmlFor="star5"></label>
              <input id="star4" {...register('rate')} value="4" type="radio" />
              <label htmlFor="star4"></label>
              <input id="star3" {...register('rate')} value="3" type="radio" />
              <label htmlFor="star3"></label>
              <input id="star2" {...register('rate')} value="2" type="radio" />
              <label htmlFor="star2"></label>
              <input id="star1" {...register('rate')} value="1" type="radio" />
              <label htmlFor="star1"></label>
            </div>
            <div className="h-6 ">
              {errors.rate && (
                <span className="text-xs text-primary">
                  {errors.rate?.message}
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
