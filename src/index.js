import http from 'http'
import url from 'url'
import { itemliHeadUrl } from './api_itemli'

if (process.env.NODE_ENV != 'production') {
  require('dotenv').load()
}

const PORT = process.env.PORT || 3000

const server = new http.Server()

server.on('request', function(req, res) {
  const {
    path,
    query: { url: targetUrl }
  } = url.parse(req.url, true)

  if (targetUrl) {
    itemliHeadUrl(targetUrl, res)
  } else if (path != '/favicon.ico') {
    res.writeHead(200, {
      'Content-Type': 'application/json; charset=utf-8'
    })
    res.end(
      JSON.stringify({
        status: 'error',
        reason: 'Url not finded in request params.'
      })
    )
  } else {
    res.end('')
  }
})

server.listen(PORT)
console.log(`server is started on port ${PORT}`)
