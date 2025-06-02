import * as tavily from '@tavily/core';
import getRedisClient from './redis.js';
const client = tavily.tavily({ apiKey: process.env.TAVILY_KEY });

/*
  News content is saved in redis key 'content:bbc-news-today' with 24h TTL.
  Each query execution checks if content exists:
  - If exists, return directly
  - If not, fetch new content and save it
 */
export async function getCachedNewOfToday() {
  const redis = getRedisClient();

  const key = 'content:bbc-news-today';
  const cached = await redis.get(key);

  if (cached) {
    return cached;
  }
  console.debug('fetch news with tavily.')
  let news = await client.extract(["https://www.bbc.com/news"], {});
  let content = news.results[0].rawContent;
  content = extractMarkdownLinkTitles(content)

  await redis.setex(key, 24 * 60 * 60, content); // 24 hours TTL
  return content;
}

/**
 * extract title of [title](url) in text content
 * @param text 
 * @returns 
 */
function extractMarkdownLinkTitles(text: string): string {
  const matches = [...text.matchAll(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g)];
  const titles = matches.map(match => match[1]).filter(t => t.length > 30);
  return titles.join(' ').trim();
}