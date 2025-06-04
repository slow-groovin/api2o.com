import { createOpenRouter } from '@openrouter/ai-sdk-provider';
import { generateObject } from 'ai';
import 'dotenv/config';
import { type Context } from 'hono';
import z from 'zod';
// server/api/v1/rand/sentence.ts
import { db2 } from '@/clients/drizzle-pg.js';
import getRedisClient, { acquireAsyncLock, releaseAsyncLock } from "@/clients/redis.js";
import { randTodaySentences } from '@/db/schema/random-topics.js';
import { and, eq, sql } from 'drizzle-orm';
import ISO6391 from 'iso-639-1';
import { getCachedNewOfToday } from '@/clients/tavily.js';

type RandTodaySentence = {
  sentence: string,
}

type Option = { language: string }
const LOCK_KEY = (lang: string) => `lock:generate-random-sentences:${lang}`
const AT_KEY = (lang: string) => `time:last-generate-random-sentences:${lang}`
const GENERATE_INTERVAL = 24 * 60 * 60 * 1000


/**
 * `rand/sentence` handler
 * @param c 
 * @returns 
 */
export const getRandomTodaySentence = async (c: Context) => {

  let { lang, format } = c.req.query()
  if (!lang) lang = 'en'
  if (!ISO6391.validate(lang)) {
    c.json({ error: `${lang} is not a valid ISO-639-1 language code.` }, 400)
  }


  const atKey = AT_KEY(lang)
  const lockKey = LOCK_KEY(lang)
  const options = { language: lang }
  if (await isNeedAppend(atKey)) {
    const acquired = await acquireAsyncLock(lockKey, '', 600_000)
    if (acquired) {
      console.debug('begin to generate random today sentences', lang, getCurrentUTCDateStr());
      (async function () {
        await getRedisClient().set(atKey, Date.now())
        const newGeneratedData = await generateRandomTodaySentencesThroughLLM(options)
        if (newGeneratedData) {
          await saveNewDataToDB(newGeneratedData, options)
        }
        // await releaseAsyncLock(lockKey, '')
      })();
    }
  }

  const randomTodaySentence = await queryRandomOne(options)
  const { sentence, date, language_code } = randomTodaySentence || {}

  if (format === 'json') {
    return c.json({
      sentence,
      date,
      lang: language_code
    });
  } else {
    return c.text(sentence)
  }

};

/**
 * if there is need to re-generate some data and insert them into DB
 * current conditon: interval > 1 days
 * @returns 
 */
async function isNeedAppend(atKey: string) {
  const lastAppendAtStr = await getRedisClient().get(atKey)
  if (!lastAppendAtStr) return true
  const lastAppendAt = Number.parseInt(lastAppendAtStr)
  if (Date.now() - lastAppendAt > GENERATE_INTERVAL) {
    return true
  }
  return false
}

/**
 * query one rand sentence from DB
 * @returns 
 */
async function queryRandomOne(opt: Option) {
  let result = await db2
    .select()
    .from(randTodaySentences)
    .where(
      and(
        eq(randTodaySentences.date, getCurrentUTCDateStr()),
        eq(randTodaySentences.language_code, opt.language),
      )
    )
    .orderBy(sql`RANDOM()`)
    .limit(1);
  if (result.length === 0) {
    result = await db2
      .select()
      .from(randTodaySentences)
      .where(
        and(
          eq(randTodaySentences.language_code, opt.language),
        )
      )
      .orderBy(sql`RANDOM()`)
      .limit(1);
  }
  if (result.length === 0) {
    return {
      sentence: "Waiting for generate, please try again later", date: getCurrentUTCDateStr(), language_code: opt.language

    }
  }
  return result[0]
}

/**
 * save data to DB
 * skip repeat type-value items
 */
async function saveNewDataToDB(randTodaySentencesData: RandTodaySentence[], opt: Option) {
  const ret = await db2
    .insert(randTodaySentences)
    .values(randTodaySentencesData.map(t => ({ ...t, language_code: opt.language, date: getCurrentUTCDateStr() })))
    .onConflictDoNothing();

  console.debug('insert new rand sentences:', `[${opt.language}] ${ret.rowCount}/${randTodaySentencesData.length}`)
}

/**
 * generate rand sentences by llm
 * with {country of request, a random year} as `conditionText`
 */
async function generateRandomTodaySentencesThroughLLM(opt: Option) {
  const provider = createOpenRouter({
    apiKey: process.env.OPENROUTER_KEY,
  });

  const chatModel = provider.chat('openai/gpt-4.1');
  const newsOfToday = await getCachedNewOfToday()

  try {
    const { object, finishReason, response, usage, warnings } = await generateObject({
      model: chatModel,
      // temperature: 1,
      topP: 1,
      prompt: `Generate 5 rand sentences (in language: ${opt.language}) for today: ${getCurrentUTCDateStr()}, I will provide you some news recently, you can optionally refer to them, but the result you ouput must be: 1. had better but not required be related with date of today. 2. DO NOT just Rephrase these news. 3. The tone is easy to understand and approachable, like some idioms and famous sayings..  <news>${newsOfToday}</news>`,
      schema: z.object({
        rand_sentences:
          z.array(z.object({
            sentence: z.string({ description: 'one sentence for today' }),
          }))
      })
    })
    return object.rand_sentences
  } catch (e) {
    console.log('error:', e)
    return
  }
}



function getCurrentUTCDateStr(): string {
  const now = new Date();
  const year = now.getUTCFullYear();
  const month = String(now.getUTCMonth() + 1).padStart(2, '0');
  const day = String(now.getUTCDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}
