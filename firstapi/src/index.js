const http = require('http')
const url = require('url')

const routes = require('./routes')
const server = http.createServer((request, response) => {
    const parsedUrl = url.parse(request.url)

    console.log(`Request method: ${request.method} | Endpoint: ${parsedUrl.pathname}`)

    const route = routes.find((routeObj) => (
        routeObj.endpoint === parsedUrl.pathname && routeObj.method === request.method
    ))

    console.log(route)

    if (route) {
        route.handler(request, response)
    } else {
        response.writeHead(404, { 'content-type': 'text/html'})
        response.end(`Cannot ${request.method} ${parsedUrl.pathname}`)
    }

})

server.listen(3000, () => {
    console.log('🔥 Server started at http://localhost:3000')
})