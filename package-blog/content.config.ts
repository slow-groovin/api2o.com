import { defineContentConfig, defineCollection, z } from '@nuxt/content'

console.log('contentSource:', process.env.CONTENT_SOURCE)

const buildSource = (path: string) => {
  const contentSource = process.env.CONTENT_SOURCE
  if (contentSource !== 'local' && contentSource !== 'github') {
    console.error('CONTENT_SOURCE must be "local" or "github", You should not see this error in production running(It can appear in building).', 'contentSource:', contentSource)
  }
  const source = process.env.CONTENT_SOURCE !== 'github' ? path : {
    repository: process.env.REMOTE_CONTENT_REPO,
    include: path,
    prefix: '/',
    authToken: process.env.SOURCE_AUTH_TOKEN,
  }
  return source
}

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
        _locale: z.enum(['en', 'zh']),
        last_updated: z.date().nullish(),
        disabled: z.boolean().nullish(),

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
        _locale: z.enum(['en', 'zh']),
        last_updated: z.date().nullish(),
        disabled: z.boolean().nullish(),
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
