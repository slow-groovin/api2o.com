import { writeFileSync } from "node:fs";
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  compatibilityDate: "2024-11-01",

  modules: [
    "@nuxt/content",
    "@nuxtjs/tailwindcss",
    "shadcn-nuxt",
    "@nuxt/icon",
    "@vueuse/nuxt",
    "nuxt-gtag",
    "@nuxtjs/i18n",
  ],
  imports: {
    autoImport: false,
    scan: false,
  },
  experimental: {
    clientFallback: true,
  },

  runtimeConfig: {
    public: {
      customContentSource: process.env.CONTENT_SOURCE,
      apiBearerToken: process.env.API_BEARER_TOKEN, //take effect in build stage.
    },
  },
  devServer: {
    // host: '0.0.0.0'
  },
  $production: {
    // debug: true,
    sourcemap: false,
    //
    routeRules: {
      "/zh/**": {
        isr: 5400,
        swr: 5400,
        cors: true,
      },
      "/en/**": {
        isr: 5400,
        swr: 5400,
        cors: true,
      },
      '/zh/blog/apisix-direct-return-content': {
        redirect: '/zh/handbook/apisix/apisix-direct-return-content'
      },
      '/en/blog/apisix-direct-return-content': {
        redirect: '/en/handbook/apisix/apisix-direct-return-content'
      }
      // '/':{
      // 	redirect:'/index',  //current version of nuxt and nuxt/i18n has bugs in handling `/` route, so mannually redirect it here
      // },
      // '/api/v1/graphql': { cors: true },
      // '/zh/blog/sample': {
      // 	prerender: true
      // }
    },
    nitro: {
      prerender: {
        autoSubfolderIndex: false,
      },
      preset: "node-server",
    },
    runtimeConfig: {
      public: {
        baseUrl: "https://www.api2o.com",
        apiBaseUrl: "https://www.api2o.com",
        logo: "/icon/logo.png",
      },
    },
    hooks: {
      "nitro:build:before"() {
        const indexNowKey =
          process.env.INDEX_NOW_KEY ?? "indexNowToken-NotFound";

        writeFileSync(`public/${indexNowKey}.txt`, `${indexNowKey}`, "utf-8");
        console.log("Generated indexNow .txt during build.");
      },
    },
    ignore: ["pages/debug/*.*"],
  },

  $development: {
    sourcemap: {
      server: true,
      client: true,
    },
    runtimeConfig: {
      public: {
        baseUrl: "http://localhost:3000",
        apiBaseUrl: "http://localhost:3001",
        logo: "/icon/dev-logo1.png",
        // apiBaseUrl: 'http://localhost:3000',
      },
    },
  },
  routeRules: {
    // '/':{  // this setting may affect seo
    // 	redirect:'/index',  //current version of nuxt and nuxt/i18n has bugs in handling `/` route, so mannually redirect it here
    // }
  },

  hooks: {},
  content: {
    build: {
      markdown: {
        toc: {
          depth: 3, // include h3 headings
        },
        remarkPlugins: {},
        highlight: {
          // OR
          theme: {
            default: "slack-dark",
            dark: "slack-dark",
            // Theme used if `html.sepia`
            // sepia: 'monokai'
          },
          langs: [
            "json",
            "js",
            "ts",
            "html",
            "css",
            "vue",
            "shell",
            "mdc",
            "md",
            "yaml",
            "lua",
            "graphql",
            "java",
            "sh",
            "vue",
            "toml",
            "rust",
            "python",
          ],
        },
      },
    },
  },
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: "",
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: "./components/ui",
  },
  i18n: {
    vueI18n: "../i18n.config.ts", //@nuxtjs/i18n更新到9.3之后突然出现bug, 原因未知, 为何这样设置未知, https://github.com/nuxt-modules/i18n/issues/3394
    strategy: "prefix",
    locales: ["zh", "en"], // used in URL path prefix
    defaultLocale: "en", // default locale of your project for Nuxt pages and routings,
    // 经过测试, 没有办法在首次访问时根据`Accept-Language`设置locale. 新版本已经可以
    detectBrowserLanguage: {
      useCookie: false,
      cookieKey: "i18n_redirected",

      redirectOn: "root", // recommended,
      // alwaysRedirect: true
    },
  },
  gtag: {
    enabled: process.env.NODE_ENV === "production",
    id: process.env.GTAG_ID,
  },
  // vite: {
  //   build: {
  //     rollupOptions: {
  //       external: ["@waline/client/*"],
  //     },
  //   },
  // },
});
