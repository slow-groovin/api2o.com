// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: '2024-11-01',
	devtools: { enabled: true },

	modules: ['@nuxt/content', '@nuxtjs/tailwindcss', 'shadcn-nuxt', '@nuxt/icon', '@vueuse/nuxt', 'nuxt-gtag', '@nuxtjs/i18n'],
	imports: {
		autoImport: false,
		scan: false,
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
				logo: '/icon/dev-logo1.png'
				// apiBaseUrl: 'http://localhost:3000',
			}
		},
	},

	content: {
		build: {
			markdown: {
				toc: {
					depth: 3, // include h3 headings
				},
				remarkPlugins: {

				},
				highlight: {
					// OR
					theme: {
						default: 'slack-dark',
						dark: 'slack-ochin',
						// Theme used if `html.sepia`
						sepia: 'monokai'
					},
					langs: ['json', 'js', 'ts', 'html', 'css', 'vue', 'shell', 'mdc', 'md', 'yaml', 'lua', 'graphql', 'java', 'sh', 'vue', 'toml', 'rust', 'python']

				}
			}
		}
	},
	shadcn: {
		/**
			* Prefix for all the imported component
			*/
		prefix: '',
		/**
			* Directory that the component lives in.
			* @default "./components/ui"
			*/
		componentDir: './components/ui'
	},
	i18n: {
		vueI18n: './i18n.config.ts',
		strategy: 'prefix',
		locales: ['zh', 'en'], // used in URL path prefix
		defaultLocale: 'zh', // default locale of your project for Nuxt pages and routings,
		detectBrowserLanguage: // 经过测试, 没有办法在首次访问时根据`Accept-Language`设置locale. 新版本已经可以
		{
			useCookie: false,
			cookieKey: 'i18n_redirected',
			redirectOn: 'root' // recommended
		},
	},

})