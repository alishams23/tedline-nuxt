import { createVuetify, type ThemeDefinition } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const dark: ThemeDefinition =  {
  dark: true,
  colors: {
    background:'#181818',
    'primary-lighten-5':'#022d5c',
    'primary-lighten-4':'#004ac1',
    'primary-lighten-3':'#004ac1',
    'primary-darken-1': '#0473e9',
    'primary-darken-2': '#045de9',
    grey1:'#757575',
    grey2:'#616161',
    grey3:'#424242',
    grey4:'#212121',
    grey5:'#212121',
    auto:'#181818',
    nauto:'#FFFFFF',
    shadow1 :'#4E74FF ',
    'shadow-inner-dark' :'#9898A4',
    
  },
}

const light: ThemeDefinition =  {

  colors: {
    'primary-lighten-5':'#d5eef9',
    'primary-lighten-4':'#7498fa',
    'primary-lighten-3':'#4eabf7',

    grey1:'#BDBDBD',
    grey2:'#E0E0E0',
    grey3:'#EEEEEE',
    grey4:'#F5F5F5',
    grey5:'#FAFAFA',
    auto:'#FFFFFF',
    nauto:'#121212',
    shadow1 :'#000000',
    'primary-darken-1': '#15233f',
    'primary-darken-2': '#0f1931',
  },
}
export default defineNuxtPlugin(nuxtApp => {
  const vuetify = createVuetify({
    ssr: true,
    components,
    directives,
    
    theme: {
      defaultTheme: 'dark',
    
      themes: {
        dark,
        light
      },
    }
  })

  nuxtApp.vueApp.use(vuetify)
})