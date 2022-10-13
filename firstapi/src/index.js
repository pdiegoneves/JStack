const http = require('http')
const users = require('./mocks/users')

const server = http.createServer((request, response) =>{
    console.log(`Request dethod: ${request.method} | Endpoint: ${request.url}`)

    if(request.url === '/users' && request.method === 'GET'){
        response.writeHead(200, { 'content-type': 'application/json'})
        response.end('')
    }

    response.writeHead(200, { 'content-type': 'text/html'})
    response.end('<h1>Ola Mundo!</h1>')
})

server.listen(3000, () => {
    console.log('🔥 Server started at http://localhost:3000')
})