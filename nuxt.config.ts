// https://nuxt.com/docs/api/configuration/nuxt-config
// Subpath deploy (e.g. https://bingo.example.de/bingo/): build with NUXT_APP_BASE_URL=/bingo/
// (trailing slash) and upload the full .output/public contents under that path on the server.
export default defineNuxtConfig({
  app: {
    baseURL: process.env.NUXT_APP_BASE_URL || '/',
  },
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      apiBase: '/api/',
    }
  },
  css: [
    '~/assets/css/main.css'
  ],

  routeRules: {
    '/api/**': { proxy: (process.env.API_HOST || 'http://localhost:8090') + '/**' },
    '/impressum': { redirect: 'https://blackeyestudio.de/impressum' },
    '/datenschutz': { redirect: 'https://blackeyestudio.de/datenschutz' },
  },

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  modules: ["@nuxtjs/tailwindcss", "@nuxt/eslint"]
})