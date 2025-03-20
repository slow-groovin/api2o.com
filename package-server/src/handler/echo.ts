import { Hono } from 'hono'

export const echo = new Hono()

echo.get('/echo', (c) => {
  const msg = c.req.query('msg')
  const resp_type = c.req.query('resp_type')
  console.debug('/echo',msg,resp_type)
  if(!msg){
    return c.text('no msg.',400)
  }
  if (resp_type === 'text' || !resp_type) {
    return c.text(msg)
  } else if (resp_type === 'json') {
    return c.json({ msg })
  } else {
    return c.text('Invalid user input', 400)
  }
})
