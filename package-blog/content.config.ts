import { defineContentConfig, defineCollection } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    blog: defineCollection({
      type: 'page',
      source: {
        repository: 'https://github.com/slow-groovin/api2o-contents',
        include: 'blog/**',
        prefix:'/',
        authToken:process.env.GITHUB_AUTH_TOKEN,
      }
    }),
  }
})
