import { Hono } from 'hono'
import crypto from 'crypto'

const ringCacheSize = 1024
const MAX_BODY_SIZE = 1024

const cache = Array(ringCacheSize).fill(null)
let loc = 0

export const postHandler = new Hono()

postHandler.post('/post', async (c) => {

  
	const reader=c.req.raw.body?.getReader()
  if(!reader){
    return c.text('Invalid request body. Please provide a valid JSON content.', 400)
  }
	let bodyLength = 0;
	let bodyChunks = [];
	//尝试读取body数据, 若超过1000Byte则退出报错
	if(reader){
		while (true) {
			// 读取数据
			const { done, value } = await reader.read();
			if (done) {
				// console.log('Stream has been fully read.');
				break;  // 结束读取
			}

			// console.log(typeof value, value.length)
			bodyLength += value.length;

			// 如果超过了1KB，停止处理
			if (bodyLength > MAX_BODY_SIZE) {
				console.log('Data size exceeds 1KB, stop reading.');
        return c.text('Data size exceeds 1KB, stop.', 400)
			}

			//todo 接入数据库之后, 把read()次数记录
			// 收集数据块
			bodyChunks.push(value);
		}
	}

	// 拼接所有数据块
	const bodyStr=new TextDecoder().decode(Buffer.concat(bodyChunks));

	// 读取请求体中的 content
	let body={}
	try{
		body=JSON.parse(bodyStr)
	}catch (e){
    return c.text('Invalid request body. Please provide a valid JSON content.', 400)
	}


  const objectId = generateObjectId()
  const timestamp = Date.now()

  loc = (loc + 1) % ringCacheSize
  cache[loc] = { uuid: objectId, timestamp, content: body }

  return c.json({ uuid: objectId, timestamp, loc, content: body })
})

function generateObjectId() {
  const timestamp = Math.floor(Date.now() / 1000).toString(16)
  const randomBytes = crypto.randomBytes(8).toString('hex')
  return timestamp + randomBytes
}
