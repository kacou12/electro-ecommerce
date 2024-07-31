const jsonServer = require('json-server')
const jsonServerAuth = require('json-server-auth')
const axios = require('axios')
// import * as jsonServer from 'json-server'
// import * as jsonServerAuth from 'json-server-auth'
const server = jsonServer.create()
const router = jsonServer.router('server/db.json')
const middlewares = jsonServer.defaults()
// @ts-ignore
server.db = router.db

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares)
server.use(jsonServerAuth)
// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser)

// Add custom routes before JSON Server router
server.post('/favorites', async (req, res) => {
  // server.patch()
  // const data = res.jsonp(req.query)
  // { productId: '12', userId: 'auiaap' }
  // console.log(req.body)
  const productSlug = req.body.productSlug

  if (
    req.headers.authorization === undefined ||
    req.headers.authorization.split(' ')[0] !== 'Bearer'
  ) {
    const status = 401
    const message = 'Error in authorization format'
    res.status(status).json({ status, message })
    return
  }
  const token = req.headers.authorization.split(' ')[1]

  // {
  //   email: 'olivier@mail.com',
  //   iat: 1722433136,
  //   exp: 1722436736,
  //   sub: 'uS8iXHn'
  // }
  const dataToken = JSON.parse(
    Buffer.from(token.split('.')[1], 'base64').toString()
  )
  const userId = dataToken.sub

  const promiseResults = await Promise.all([
    axios
      .get(`http://localhost:3000/products?slug=${productSlug}`)
      .then((r) => r.data[0]),
    axios.get(`http://localhost:3000/users?id=${userId}`).then((r) => r.data[0])
  ])

  const product = promiseResults[0]
  const user = promiseResults[1]

  let newFavorites = []
  if (user.favorites.map((fav) => fav.id).includes(product.id)) {
    newFavorites = [
      ...user.favorites.filter((faProd) => faProd.id != product.id)
    ]
  } else {
    newFavorites = [...user.favorites, product]
  }

  axios
    .patch(
      `http://localhost:3000/600/users/${userId}`,
      {
        favorites: newFavorites
      },
      {
        headers: { Authorization: req.headers.authorization }
      }
    )
    .then((putRes) => {
      res.json('success ')
    })
    .catch((err) => {
      res.status(500).json('fails request')
    })

  // next()
})

// Use default router
server.use(router)
server.listen(3000, () => {
  console.log('JSON Server is running')
})
