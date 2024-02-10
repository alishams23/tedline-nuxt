
<template>
  <v-bottom-navigation  v-model="value"  height="auto" elevation="0"  class=" bg-transparent  pb-2  w-100 " grow>
   <div class="bg-auto   shadow-custom d-flex justify-center px-0 align-center mx-0 py-0 px-0 rounded-pill  ">
    <v-btn variant="plain" height="20px" c v-for="(item, index) in menuDown"
    :to="item.login && isAuthenticated == false ? '/auth/signIn' : item.to + `${index == 2 ? '/' + username : ''}`"
    :key="item + '+Down menu'" class="no-hover-effect h-full px-0    space-y-8 space-y-1 margin-x-1 rounded-pill" :ripple="false" color="transparent">

    <v-sheet v-if="currentRouteCheck(item.to) == false" variant="flat" class="w-full  bg-auto   rounded-pill ">
      <component :is="item.icon" class="text-grey" style="height: 19px;" />
    </v-sheet>

    <v-scale-transition :disabled="currentRouteCheck(item.to) == false">
      <v-sheet v-if="currentRouteCheck(item.to)" variant="flat" height="100%"
        class="px-5 bg-blue-gradient-3  space-y-1   text-white  rounded-pill d-flex justify-center  align-center " >
        <component :is="item.iconSolid" style="height: 23px;" />
        
        <div v-if="currentRouteCheck(item.to)"
        :class="currentRouteCheck(item.to) ? 'font-weight-bold' : 'font-weight-light '"
        class="  text-xs-2 pl-3 pr-1   ">{{ item.title }}</div>
      </v-sheet>
    </v-scale-transition>

  

  </v-btn>
   </div>

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

<style lang="scss">
/* Using scoped style for the component */
.no-hover-effect:hover {
  background-color: inherit !important;
  /* Use !important to override Vuetify styles */
  color: inherit !important;
}

.v-btn--variant-plain {
  opacity: 1 !important;
}

.shadow-custom{
  border-top: solid 1px rgba(var(--v-theme-nauto),0.05);
  box-shadow: rgba(var(--v-theme-black-in-light), 0.5) 0px 17px 30px 0px !important;
}
.space-y-1{
  padding-top: 13px;
  padding-bottom: 13px;
}
.margin-x-1{
  margin-left: 6px;
  margin-right: 6px;
}
.space-y-8{
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>
