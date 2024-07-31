// hello.js
module.exports = (req, res, next) => {
  //   res.header('X-Hello', 'World')
  console.log('favorite call')
  next()
}

server.use(jsonServer.bodyParser)
server.use((req, res, next) => {
  if (req.method === 'POST') {
    req.body.createdAt = Date.now()
  }
  // Continue to JSON Server router
  next()
})
