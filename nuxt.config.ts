// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  modules: ['@nuxt/content'],
  css: ['github-markdown-css/github-markdown-light.css', '~/assets/css/main.css'],
  mdc: {
    headings: {
      anchorLinks: {
        h1: true,
        h2: true,
        h3: true,
        h4: true,
        h5: true,
        h6: true,
      },
    },
  },
  app: {
    head: {
      title: "Wilson's Blog",
      link: [
        { rel: 'icon', type: 'image/png', href: '/favicon.png' }
      ]
    }
  },
  devtools: { enabled: true }
})
