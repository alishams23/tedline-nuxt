<template>
  <v-btn
  @click="toggleTheme"
  class="bg-blue text-dark"
 
  size="small"
  icon=""

>

<MoonIcon style="height: 20px;" v-if="night == 'light'" />
<SunIcon style="height: 20px;" v-if="night == 'dark'" />
</v-btn>
  </template>
  
  <script setup>
  import { useTheme } from 'vuetify'
  import {
  MoonIcon,
  SunIcon


} from '@heroicons/vue/24/solid'
  const theme = useTheme()
  let night = theme.global.name.value
  function toggleTheme () {
    theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
    night = theme.global.name.value
  }

  watch(() => theme.global.name.value, (newValue, oldValue) => {
  // Do something when theme.global.name.value changes
  night = theme.global.name.value
})
  </script>