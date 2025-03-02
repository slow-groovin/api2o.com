import { defineContentConfig, defineCollection, z } from '@nuxt/content'
import path from 'path'
// const options= import.meta.env.NODE_ENV==='development' ? { cwd: path.resolve(import.meta.env.LOCAL_CONTENT_PATH) } : { repository: import.meta.env.REMOTE_CONTENT_REPO }

const buildSource = (path: string) => {
  const source = import.meta.env.NODE_ENV === 'development' ? path : {
    repository: import.meta.env.REMOTE_CONTENT_REPO,
    include: path,
    prefix: '/',
    authToken: process.env.GITHUB_AUTH_TOKEN,
  }
  return source
}

console.log('[content][load]options test:', import.meta.env.NODE_ENV, buildSource('blog'))
export default defineContentConfig({
  collections: {
    blog: defineCollection({
      type: 'page',
      source: buildSource('blog/**/*.md'),
      schema: z.object({
        date: z.date(),
        /**
         * manual article id
         */
        _id: z.string().min(1),
        tags: z.array(z.string().min(1)),
        _locale: z.enum(['en', 'zh'])
      })
    }),

    handbook: defineCollection({
      type: 'page',
      source: buildSource('handbook/**/*.md'),
      schema: z.object({
        date: z.date(),
        /**
         * manual article id
         */
        _id: z.string().min(1),
        _group: z.string().nullish(),
        _order: z.number().nullish(),
        _locale: z.enum(['en', 'zh'])
      })
    }),

    handbookNav: defineCollection({
      type: 'data',
      source: buildSource('handbook/nav.json'),
      schema: z.object({
        books: z.array(
          z.object({
            name: z.string(),
            icon: z.string()
          }))
      })
    })
  }
})
