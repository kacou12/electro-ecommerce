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

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser)

server.post('/favorite', async (req, res) => {
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

server.get('/user-data', async (req, res) => {
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

  axios
    .get(`http://localhost:3000/600/users/${userId}`, {
      headers: { Authorization: req.headers.authorization }
    })
    .then((getRes) => {
      res.json(getRes.data)
    })
    .catch((err) => {
      res.status(500).json('fails request')
    })
})
server.post('/register', async (req, res, next) => {
  console.log('test register')
  req.body.favorites = []
  next()
})
server.post('/addcomment', async (req, res) => {
  console.log('test add comment')
  let productSlug = req.body.productSlug
  // console.log(req.body)
  await axios.post(`http://localhost:3000/comments`, req.body)

  const product = await axios
    .get(`http://localhost:3000/products?slug=${productSlug}`)
    .then((getRes) => {
      return getRes.data[0]
    })

  const commentsProducts = await axios
    .get(`http://localhost:3000/comments?productSlug=${productSlug}`)
    .then((getRes) => {
      return getRes.data
    })

  let rateMoy = commentsProducts.reduce((accumulate, current) => {
    return accumulate + current.rate
  }, 0)

  let rateFinal = Math.ceil(rateMoy / commentsProducts.length)

  try {
    await axios.patch(`http://localhost:3000/products/${product.id}`, {
      rating: rateFinal
    })
    res.json('success ')
  } catch (error) {
    res.status(500).json('fails add comments ')
  }
})

server.use(jsonServerAuth)

// Use default router
server.use(router)
server.listen(3000, () => {
  console.log('JSON Server is running')
})
