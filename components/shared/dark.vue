<template>
  <v-btn @click="toggleTheme"  class="bg-blue "  size="small" icon="">

    <MoonIcon style="height: 20px;"  v-if="night == 'light'" />
    <SunIcon style="height: 20px;" class="text-black"  v-if="night == 'dark'" />
  </v-btn>
</template>
<script setup>
import { ref, watch, onMounted } from 'vue';
import { MoonIcon, SunIcon } from '@heroicons/vue/24/solid';
// Import useTheme from Vuetify
import { useTheme } from 'vuetify/lib/framework';

const theme = useTheme();
const night = ref('');

function getLocalStorage(name) {
  return localStorage.getItem(name);
}

function setLocalStorage(name, value) {
  localStorage.setItem(name, value);
}

function handledarkmode() {
  if (typeof window === 'undefined') return;

  if (theme.global.current.value.dark) {
    setLocalStorage('DarkMode', 'true');
  } else {
    setLocalStorage('DarkMode', 'false');
  }
}

function toggleTheme() {
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark';
  night.value = theme.global.name.value;
  handledarkmode();
}

onMounted(() => {
  const darkModeLocalStorage = getLocalStorage('DarkMode');

  if (darkModeLocalStorage !== null) {
    if (darkModeLocalStorage === 'true') {
      if (!theme.global.current.value.dark) toggleTheme();
    } else {
      if (theme.global.current.value.dark) toggleTheme();
    }
  } else {
    handledarkmode();
  }

  night.value = theme.global.name.value;
});

watch(night, (newValue, oldValue) => {
  // Do something when `night` changes
});
</script>