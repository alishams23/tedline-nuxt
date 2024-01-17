
<template>
  <v-bottom-navigation  v-model="value" height="65" elevation="0" class="shadow-t bg-auto border-t  px-1 w-100 " grow>
    <v-btn variant="plain" v-for="(item, index) in menuDown"
      :to="item.login && isAuthenticated == false ? '/auth/signIn' : item.to + `${index == 2 ? '/' + username : ''}`"
      :key="item + '+Down menu'" class="no-hover-effect" :ripple="false">

      <v-sheet v-if="currentRouteCheck(item.to) == false" variant="flat" class="px-5 py-1 bg-auto rounded-pill ">
        <component :is="item.icon" class="text-grey" style="height: 21px;margin-bottom: -3px;" />
      </v-sheet>

      <v-slide-y-transition :disabled="currentRouteCheck(item.to) == false">
        <v-sheet v-if="currentRouteCheck(item.to)" variant="flat" color="blue"
          class="px-5 bg-blue-gradient-3 py-1  text-auto  rounded-pill ">
          <component :is="item.iconSolid" style="height: 18px;margin-top: 1px;margin-bottom: -3px;" />
        </v-sheet>
      </v-slide-y-transition>

      <div v-if="currentRouteCheck(item.to)"
        :class="currentRouteCheck(item.to) ? 'font-weight-bold' : 'font-weight-light '"
        class="pt-2  text-xs-2  text-nauto  ">{{ item.title }}</div>

    </v-btn>
  </v-bottom-navigation>
</template>


<script>
import {
  HomeIcon,
  MagnifyingGlassIcon,
  UserIcon,

} from '@heroicons/vue/24/outline'

import HomeIconSolid from '@heroicons/vue/24/solid/HomeIcon'
import MagnifyingGlassIconSolid from '@heroicons/vue/24/solid/MagnifyingGlassIcon'
import UserIconSolid from '@heroicons/vue/24/solid/UserIcon'

export default {
  computed: {
    isAuthenticated() {
      return this.$store.state.isAuthenticated;
    },
    username() {
      return this.$store.state.username;
    }
  },
  data: () => ({
    value: null,
    menuDown: [
      {
        title: 'خانه',
        icon: HomeIcon,
        iconSolid: HomeIconSolid,
        to: '/home',
        login: false,
      },
      {
        title: 'جستجو',
        icon: MagnifyingGlassIcon,
        iconSolid: MagnifyingGlassIconSolid,
        to: '/explore',
        login: false,
      },
      {
        title: 'پروفایل',
        icon: UserIcon,
        iconSolid: UserIconSolid,
        to: '/profile',
        login: true,
      },

    ],

  }),
  methods: {
    currentRouteCheck(url) {
      return this.$route.name.split("-").includes(url.split('/')[1]);
    },

  },
  async beforeMount() {

  },
  async mounted() {

    for (let index = 0; index < this.menuDown.length; index++) {
      if (this.$route.name.split("-").includes(this.menuDown[index].to.split('/')[1])) this.value = index;
    }
  }


};
</script>

<style scoped>
/* Using scoped style for the component */
.no-hover-effect:hover {
  background-color: inherit !important;
  /* Use !important to override Vuetify styles */
  color: inherit !important;
}

.v-btn--variant-plain {
  opacity: 1 !important;
}
</style>
