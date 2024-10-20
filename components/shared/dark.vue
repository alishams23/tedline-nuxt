<template>
  <v-btn @click="toggleTheme"  class="bg-blue "  size="small" icon="">

    <MoonIcon style="height: 20px;"  v-if="night == 'light'" />
    <SunIcon style="height: 20px;" class="text-black"  v-if="night == 'dark'" />
  </v-btn>
</template>
<script>
import { onBeforeMount, ref, watch } from 'vue';
import {
  MoonIcon,
  SunIcon
} from '@heroicons/vue/24/solid';

// Import useTheme from Vuetify
import { useTheme } from 'vuetify/lib/framework';

export default {
  data() {
    return {
      night: '',
    };
  },
  components: { MoonIcon, SunIcon },
  methods: {
    getLocalStorage(name) {
      return localStorage.getItem(name);
    },
    setLocalStorage(name, value) {
      localStorage.setItem(name, value);
    },
    handledarkmode() {
      if (this.$isServer) return;

      if (this.theme.global.current.value.dark) {
        this.setLocalStorage('DarkMode', 'true');
      } else {
        this.setLocalStorage('DarkMode', 'false');
      }
    },
    toggleTheme() {
      this.theme.global.name.value = this.theme.global.current.value.dark ? 'light' : 'dark';
      this.night = this.theme.global.name.value;
      this.handledarkmode();
    },
  },
  mounted() {
    const darkModeLocalStorage = this.getLocalStorage('DarkMode');
   
    if (darkModeLocalStorage !== null) {
      if (darkModeLocalStorage == 'true') {
        if (this.theme.global.current.value.dark == false) this.toggleTheme();
      } else {
        if (this.theme.global.current.value.dark != false) this.toggleTheme();
      }
    } else {
      this.handledarkmode();
    }

    this.night = this.theme.global.name.value;
  },
  watch: {
    night(newValue, oldValue) {
      // Do something when night changes
    },
  },
  computed: {
    theme() {
      return useTheme();
    },
  },
};
</script>