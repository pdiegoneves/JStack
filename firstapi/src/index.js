const http = require('http')
const { URL } = require('url')
const bodyParser = require('./helpers/bodyParser')

const routes = require('./routes')
const server = http.createServer((request, response) => {
  //   const parsedUrl = url.parse(request.url, true)
  const parsedUrl = new URL(`http://localhost:3000${request.url}`)

  console.log(
    `Request method: ${request.method} | Endpoint: ${parsedUrl.pathname}`
  )

  let { pathname } = parsedUrl
  let id = null

  const splitEndpoit = pathname.split('/').filter(Boolean)

  if (splitEndpoit.length > 1) {
    pathname = `/${splitEndpoit[0]}/:id`
    id = splitEndpoit[1]
  }

  const route = routes.find(
    (routeObj) =>
      routeObj.endpoint === pathname && routeObj.method === request.method
  )

  if (route) {
    request.query = Object.fromEntries(parsedUrl.searchParams)
    request.params = { id }

    response.send = (statusCode, body) => {
      response.writeHead(statusCode, { 'content-type': 'application/json' })
      response.end(JSON.stringify(body))
    }

    if (['POST', 'PUT', 'PATCH'].includes(request.method)) {
      bodyParser(request, () => route.handler(request, response))
    } else {
      route.handler(request, response)
    }
  } else {
    response.writeHead(404, { 'content-type': 'text/html' })
    response.end(`Cannot ${request.method} ${parsedUrl.pathname}`)
  }
})

server.listen(3000, () => {
  console.log('🔥 Server started at http://localhost:3000')
})
