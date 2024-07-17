import React from 'react'
import { useMatches } from 'react-router'

export const Breadcrumbs = () => {
  let matches = useMatches()
  // console.log(matches)

  let crumbs = matches
    // first get rid of any matches that don't have handle and crumb
    // @ts-ignore
    .filter((match) => Boolean(match.handle?.crumb))
    // now map them into an array of elements, passing the loader
    // data to each one
    // @ts-ignore
    .map((match) => match.handle.crumb(match.data))
  return (
    <>
      <div className="h-10 w-full bg-primary my-7">
        <section className="centerContent bg-green-500  h-full">
          {/* <ol>
        {crumbs.map((crumb, index) => (
          <li key={index}>{crumb}</li>
        ))}
      </ol> */}
        </section>
      </div>
    </>
  )
}
