// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
	modules: ['@nuxt/content'],
  imports:{
    autoImport:false
  },
  experimental: {
		clientFallback: true,
	},

  $production: {
		sourcemap: false,
		//
		routeRules: {
			'/zh/**': {
				isr: 5400,
				swr: 5400,
				cors: true
			},
			'/en/**': {
				isr: 5400,
				swr: 5400,
				cors: true
			},
			// '/api/v1/graphql': { cors: true },
			// '/zh/blog/sample': {
			// 	prerender: true
			// }
		},
		nitro: {
			prerender: {
				autoSubfolderIndex: false
			},
			// preset: 'cloudflare_pages'  //似乎是没用的, cf+git部署已经启用了这个
			preset: 'node-server'
		},
		runtimeConfig: {
			public: {
				apiBaseUrl: 'https://www.api2o.com',
				logo: '/icon/word-logo1.svg'
			}
		},
		ignore: [
			"pages/debug/*.*",
		],
	
	},

	$development: {
    sourcemap: {
      server: true,
      client: true
    },
		runtimeConfig: {
			public: {
				apiBaseUrl: 'http://localhost:3001',
				// apiBaseUrl: 'http://localhost:3000',
				logo: '/icon/dev.png'
			}
		},
	},

	content: {
    build: {
      markdown: {
        toc: {
          depth: 3, // include h3 headings
        },
				remarkPlugins:{
					
				},
				highlight: {
          // OR
          theme: {
            // Default theme (same as single string)
            default: 'github-light',
            // Theme used if `html.dark`
            dark: 'github-dark',
            // Theme used if `html.sepia`
            sepia: 'monokai'
          }
        }
      }
    }
  }

})
