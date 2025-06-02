import { createOpenRouter } from '@openrouter/ai-sdk-provider';
import { generateObject } from 'ai';
import 'dotenv/config';
import { type Context } from 'hono';
import z from 'zod';
// server/api/v1/rand/thing.ts
import { db2 } from '@/clients/drizzle-pg.js';
import getRedisClient, { acquireAsyncLock } from "@/clients/redis.js";
import { randThings } from '@/db/schema/random-topics.js';
import { sql } from 'drizzle-orm';
type RandThing = {
  type: string,
  value: string
}
const LOCK_KEY = 'lock:generate-random-things'
const AT_KEY = 'time:last-generate-random-things'
/**
 * `rand/thing` handler
 * @param c 
 * @returns 
 */
export const getRandomThing = async (c: Context) => {

  if (await isNeedAppend()) {
    const acquired = await acquireAsyncLock(LOCK_KEY, '', 600_000)
    if (acquired) {
      (async function () {
        const condition = genRandomCondition(c)
        const newGeneratedData = await generateRandomDataThroughLLM(condition)
        if (newGeneratedData) {
          await saveNewDataToDB(newGeneratedData)
        }
        // await releaseAsyncLock(LOCK_KEY, '')
        await getRedisClient().set(AT_KEY, Date.now())
      })();
    }
  }

  const randomThing = await queryRandomOne()
  const { type, value } = randomThing
  return c.json({
    type,
    value
  });
};

/**
 * if there is need to re-generate some data and insert them into DB
 * current conditon: interval > 7 days
 * @returns 
 */
async function isNeedAppend() {
  const lastAppendAtStr = await getRedisClient().get(AT_KEY)
  if (!lastAppendAtStr) return true
  const lastAppendAt = Number.parseInt(lastAppendAtStr)
  if (Date.now() - lastAppendAt > 7 * 24 * 60 * 60 * 1000) {
    return true
  }
  return false
}

/**
 * query one rand thing from DB
 * @returns 
 */
async function queryRandomOne() {
  const result = await db2
    .select()
    .from(randThings)
    .orderBy(sql`RANDOM()`)
    .limit(1);
  return result[0]
}

/**
 * save data to DB
 * skip repeat type-value items
 */
async function saveNewDataToDB(randThingsData: RandThing[]) {
  const ret = await db2
    .insert(randThings)
    .values(randThingsData.map(t => ({ ...t, created_at: new Date() })))
    .onConflictDoNothing();

  console.debug('insert new randthings:', `${ret.rowCount}/${randThingsData.length}`)
}

/**
 * generate rand things by llm
 * with {country of request, a random year} as `conditionText`
 */
async function generateRandomDataThroughLLM(conditonText: string) {
  const provider = createOpenRouter({
    apiKey: process.env.OPENROUTER_KEY,
  });

  const chatModel = provider.chat('openai/gpt-4.1');

  try {
    const { object, finishReason, response, usage, warnings } = await generateObject({
      model: chatModel,
      // temperature: 1,
      topP: 1,
      prompt: `Generate some(count:10~50) randthings (${conditonText}), every item have a type(such as food/book/game/site/city/country/device/phone/car/brand/mountain/movie/app/Music, or any category you could image) and its value`,
      schema: z.object({
        randthings:
          z.array(z.object({
            type: z.string({ description: 'type name of a rand thing' }),
            value: z.string().describe('value of the rand thing')
          }))
      })
    })
    return object.randthings
  } catch (e) {
    console.log('error:', e)
    return
  }
}

/**
 * eg: `'country: US, year: 1980s '`, `'country: DE, year: 2010s'`
 */
function genRandomCondition(ctx: Context): string {
  const countryCode = ctx.req.header('CF-IPCountry')
  let year = Math.floor(Math.random() * (new Date().getFullYear() - 1800 + 1)) + 1800;
  year = Math.floor(year / 10) * 10;
  let text = ''
  if (countryCode) {
    text += 'country: ' + countryCode + ', '
  }
  if (year) {
    text += 'year: ' + year + 's, '  //eg: 1980s 1990s 
  }
  return text
}