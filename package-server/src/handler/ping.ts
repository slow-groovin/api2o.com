import { Hono } from 'hono'

export const ping = new Hono()

ping.get('/ping', (c) => {
  console.debug('/ping')
  return c.text('pong')
})
