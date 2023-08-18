// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  
  ssr:true,
  devtools: { enabled: true },
  css: ['~/assets/WebFonts/css/fontiran.css','~/assets/styles/main.scss', '~/assets/WebFonts/css/all.min.css',],
  build: {
  
      transpile: ["vuetify"],
    },
    
 
 
})
