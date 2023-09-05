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
      icons: [
        {
          src: 'pwa-192x192.png',
          sizes: '512x512',
          type: 'image/png',
        },
       
      ],
      },
       
      workbox: {
        navigateFallback: '/',
        globPatterns: ['**/*.{js,css,html,png,svg,ico}'],
      },
      client: {
        installPrompt: true,
        // you don't need to include this: only for testing purposes
        // if enabling periodic sync for update use 1 hour or so (periodicSyncForUpdates: 3600)
        periodicSyncForUpdates: 20,
      },
    
  
    /* your pwa options */
  }

 
 
})
