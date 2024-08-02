import React from 'react'
import { useRouteError } from 'react-router-dom'
import { isRouteErrorResponse } from 'react-router-dom'

type ErrorResponse = {
  data: any
  status: number
  statusText: string
  message?: string
}
const errorCheck = (error: any): error is ErrorResponse => {
  return 'data' in error && 'status' in error && 'statusText' in error
}

export const PageError = () => {
  const error: any = useRouteError()

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      return <div>This page doesn't exist!</div>
    }

    if (error.status === 401) {
      return <div>You aren't authorized to see this</div>
    }

    if (error.status === 503) {
      return <div>Looks like our API is down</div>
    }

    if (error.status === 418) {
      return <div>🫖</div>
    }
  }
  return (
    <div className="centerContent flex flex-col items-center">
      <img src="/img/404.png"></img>
      <h1>Oops!</h1>
      <h2>{error.status}</h2>
      <p>{error.statusText}</p>
      {error.data?.message && <p>{error.data.message}</p>}
    </div>
  )
}
