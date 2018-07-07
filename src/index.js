import http from 'http'
import url from 'url'
import { itemliHeadUrl } from './api_itemli'

const server = new http.Server()

server.on('request', function(req, res) {
  const {
    query: { url: targetUrl }
  } = url.parse(req.url, true)

  res.writeHead(200, {
    'Content-Type': 'application/json; charset=utf-8'
  })

  if (targetUrl) {
    itemliHeadUrl(targetUrl, res)
  } else {
    res.end(
      JSON.stringify({
        status: 'error',
        reason: 'Url not finded in request params.'
      })
    )
  }
})

server.listen(4001, 'localhost')
console.log('server is started')
