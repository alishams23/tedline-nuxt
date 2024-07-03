import { createVuetify, type ThemeDefinition } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
// import '@mdi/font/css/materialdesignicons.css'
import { IconSquareRounded , IconSquareRoundedFilled } from '@tabler/icons-vue';

const dark: ThemeDefinition =  {
  dark: true,
  colors: {
    background:'#181818',
    secondary1:'#023b96',
    secondary2:'#023b96',
    'primary-lighten-5':'#022d5c',
    'primary-lighten-4':'#004ac1',
    'primary-lighten-3':'#5cc9f7',
    'blue-gradient-1':'#3411c2',
    'blue-gradient-2':'#045de9',
    'primary-darken-1': '#0473e9',
    'primary-darken-2': '#045de9',
    'gradient-light-box': '#171e1d',
    grey1:'#757575',
    grey2:'#616161',
    grey3:'#424242',
    grey4:'#212121',
    grey5:'#212121',
    auto:'#181818',
    nauto:'#FFFFFF',
    'white-in-light':'#00FFFFFF',
    'black-in-light':'#212121',
    shadow1 :'#cacaca',
    'shadow-inner-dark' :'#9898A4',
    
  },
}

const light: ThemeDefinition =  {

  colors: {
    'primary-lighten-5':'#d5eef9',
    'primary-lighten-4':'#7498fa',
    'primary-lighten-3':'#5cc9f7',
    'blue-gradient-1':'#045de9',
    'blue-gradient-2':'#0995f9',
    secondary1:'#d2942a',
    secondary2:'#ce6b2a',
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
    'white-in-light':'#FFFFFF',
    'black-in-light':'#BDBDBD',
    'gradient-light-box': '#fbfcdb',

    'shadow-inner-dark' :'FFFFFF',

  },
}
export default defineNuxtPlugin(nuxtApp => {
  const vuetify = createVuetify({
    ssr: true,
    components,
    directives,
    icons: {
      aliases: {
      checkboxOff: IconSquareRounded,
      checkboxOn:IconSquareRoundedFilled
      }

    },
    theme: {
      
  
    
      themes: {
        dark,
        light
      },
    }
  })

  nuxtApp.vueApp.use(vuetify)
})