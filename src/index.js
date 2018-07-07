import http from 'http'
import url from 'url'

const server = new http.Server()

server.on('request', function(req, res) {
  const {
    query: { url: targetUrl }
  } = url.parse(req.url, true)

  if (targetUrl) {
    res.end(
      JSON.stringify({
        status: 'ok',
        targetUrl: targetUrl
      })
    )
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
