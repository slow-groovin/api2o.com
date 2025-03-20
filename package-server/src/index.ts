import 'dotenv/config'
import { serve } from '@hono/node-server'
import { app } from './hono-entry.js'


const port = Number(process.env.PORT??3001)
const hostname=process.env.HOSTNAME??'localhost'
console.log(`Server is running on http://localhost:${port}`)

serve({
  fetch: app.fetch,
  port,
  hostname,
})
