import Vue3VideoPlayer from '@cloudgeek/vue3-video-player'

export default defineNuxtPlugin((nuxtApp) => {
    
    nuxtApp.vueApp.use(Vue3VideoPlayer,{
        lang: 'en'
      })

})