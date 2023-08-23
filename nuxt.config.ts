// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  
  ssr:true,
  devtools: { enabled: true },
  css: ['~/assets/WebFonts/css/fontiran.css','~/assets/styles/main.scss', '~/assets/WebFonts/css/all.min.css',],
  build: {
      transpile: ["vuetify"],
    },
    modules: ['@vite-pwa/nuxt'],
  pwa: {
    registerType: 'autoUpdate',
    manifest: {
      lang: 'fa',
      name: 'tedline',
      orientation: 'portrait',
      background_color: '#FFFFFF',
      theme_color: '#045de9',
      short_name: 'تدلاین',
      description: 'پلتفرم آموزشی تدلاین',
      start_url: '/',
  }, 
  devOptions: {
    enabled: true,
    suppressWarnings: true,
    navigateFallbackAllowlist: [/^\/$/],
    type: 'module',
  },
    /* your pwa options */
  }
    
    
 
 
})
