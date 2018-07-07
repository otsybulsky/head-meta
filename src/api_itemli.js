import metascraper from 'metascraper'
import got from 'got'

async function getMetadata(targetUrl) {
  const { body: html, url } = await got(targetUrl, { timeout: 2000 })
  const metadata = await metascraper({ html, url })
  return metadata
}

export function itemliHeadUrl(targetUrl, res) {
  res.writeHead(200, {
    'Content-Type': 'application/json; charset=utf-8'
  })

  const result = {
    requestUrl: targetUrl
  }

  getMetadata(targetUrl)
    .then(metaData => {
      const meta = {
        title: metaData.title,
        description: metaData.description,
        url: metaData.url,
        favicon: metaData.logo ? metaData.logo : metaData.image
      }
      result.meta = meta
      result.status = 'ok'
      res.end(JSON.stringify(result))
    })
    .catch(err => {
      result.status = 'error'
      result.reason = err
      res.end(JSON.stringify(result))
    })
}
