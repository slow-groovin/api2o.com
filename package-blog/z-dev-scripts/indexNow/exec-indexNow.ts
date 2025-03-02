
import 'dotenv/config'
import { getAllUrls } from "../gen-sitemap-xml";


indexNow()

async function indexNow() {
  const indexNowKey=process.env.INDEX_NOW_KEY
  if(!indexNowKey){
    throw new Error('INDEX_NOW_KEY is not set in .env')
  }
  const body = JSON.stringify({
    host: 'www.api2o.com',
    key: indexNowKey,
    keyLocation: `https://www.api2o.com/${indexNowKey}.txt`,
    urlList: getAllUrls()
  })

  const resp = await fetch('https://api.indexnow.org/IndexNow', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    },
    body: body
  })

  console.log(resp.status, await resp.text())
}