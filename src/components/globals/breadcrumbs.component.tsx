import { RouteEnum } from '@/routes/route.enum'
import React, { Fragment } from 'react'
import { UIMatch, useMatches } from 'react-router'

export const Breadcrumbs = () => {
  let matches = useMatches() as UIMatch<string, string>[]
  // console.log(matches)

  // name of differents path , ex:
  // :collectionSlug/:categorySlug
  // /laptop/ netbooks/currentPage
  let pathnames = { ...matches[1].params }
  let keys = Object.keys(pathnames) // Obtenir toutes les clés de l'objet
  let lastKey = keys[keys.length - 1] // Trouver la dernière clé
  let name = pathnames[lastKey] ?? matches[1].pathname.split('/')[1]

  let finalData: string[] = []

  //delete the current page name , because we are on this
  delete pathnames[lastKey]
  let i = 0

  for (const key in pathnames) {
    let current
    current = pathnames[key]
    if (i >= 1) {
      current = finalData[i - 1].concat(`/${pathnames[key]!}`)
    }

    finalData.push(current!)
    i++
  }
  // console.log(finalData)

  return (
    <>
      <div className=" w-full mb-7 bg-[#FBFBFC] border-b-[#e4e7ed] border-b-2">
        <section className="centerContent  h-full flex items-center py-7 text-xs">
          <ol className="flex space-x-3">
            <li>
              <a href={RouteEnum.DEFAULT}>HOME</a>
            </li>
            <span>/</span>
            {keys.length >= 2 &&
              Object.keys(pathnames).map((item, key) => {
                return (
                  <Fragment key={key}>
                    <li>
                      <a href={`/${finalData[key]}`}>
                        {pathnames[item]!.toUpperCase()}
                      </a>
                    </li>
                    <span>/</span>
                  </Fragment>
                )
              })}
            <li>{name!.toUpperCase()}</li>
          </ol>
        </section>
      </div>
    </>
  )
}
