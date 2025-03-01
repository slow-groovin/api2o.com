import { defineContentConfig, defineCollection, z } from '@nuxt/content'
import path from 'path'
// const options= import.meta.env.NODE_ENV==='development' ? { cwd: path.resolve(import.meta.env.LOCAL_CONTENT_PATH) } : { repository: import.meta.env.REMOTE_CONTENT_REPO }

const source = import.meta.env.NODE_ENV === 'development' ? 'blog/**/*.md' : {
  repository: import.meta.env.REMOTE_CONTENT_REPO,
  include: 'blog/**',
  prefix: '/',
  authToken: process.env.GITHUB_AUTH_TOKEN,
}

console.log('[content][load]options:', import.meta.env.NODE_ENV, source)
export default defineContentConfig({
  collections: {
    blog: defineCollection({
      type: 'page',
      source: source,
      schema: z.object({
        date: z.date(),
        /**
         * manual article id
         */
        _id: z.string().min(1),
        tags: z.array(z.string().min(1)),
        _locale: z.enum(['en','zh'])
      })
    })
  }
})
