
<template>
  <v-app id="inspire">

    <v-navigation-drawer class=" hidden-sm-and-down" location="right" rail-width="90" rail style="position:fixed; top:0; right:0; ">
      <div class="d-flex flex-column justify-center align-center" style="height: 100%;">
        <v-btn rounded="xl" elevation="0" size="small" width="50" height="50" class="mt-5 mb-auto">tedline</v-btn>
        <v-btn v-for="item in menu" :variant="currentRouteCheck(item.to) ? 'tonal' : 'flat'" :key="item + '+sidebar'"
          :to="item.to" elevation="0" size="x-small" width="50" height="50" class="my-3 custom-rounded-1"
          :color="currentRouteCheck(item.to) ? 'blue-darken-1' : 'grey-lighten-4'"
          :icon="currentRouteCheck(item.to) ? 'fa ' + item.icon : 'fad ' + item.icon"></v-btn>
        <v-btn rounded="xl" @click="drawerChecker = true" elevation="0" size="small" width="45" height="45"
          class="mt-auto mb-5 " color="indigo-darken-4" icon="fad fa-bells"></v-btn>
      </div>
    </v-navigation-drawer>

    <v-main>
      <slot />
    </v-main>
    <v-navigation-drawer temporary location="right" class=" border-none  hidden-sm-and-down shadow-2 " elevation="0" v-model="drawerChecker">
      <Notification />

    </v-navigation-drawer>

  </v-app>
  <v-layout class="overflow-visible  hidden-lg-and-up" style="height: 65px;">
    <v-bottom-navigation v-model="value" height="65"  elevation="2"  mode="shift" color="transparent" class=" px-1 w-100 shadow-t"
      grow>
      <v-btn   v-for="(item, index) in menuDown" :to="item.to" :key="item + '+Down menu'"    :ripple="{ class: 'text-blue' }">
        <v-sheet variant="flat" class="px-6 py-2 rounded-pill "
          :color="currentRouteCheck(item.to) ? 'blue' : 'white'">
          <v-icon :size="currentRouteCheck(item.to) ? '17' : '20'">{{ currentRouteCheck(item.to) == false ? "fad " : "fa "
          }} {{ item.icon }}</v-icon>
        </v-sheet>
        <span v-if="value != index || (value == index && currentRouteCheck(item.to) )" class="pt-2 text-black">{{ item.title }}</span>
      </v-btn>


    </v-bottom-navigation>


  </v-layout>
</template>

 
<script>
import Notification from "~/components/section/Notification.vue";

import { useStore } from 'vuex'
export default {

  components: { Notification, },

  data: () => ({
    drawerChecker: false,
    value: null,
    menu: [

      {

        icon: "fa-home",
        to: '/home'
      },
      {

        icon: "fa-search",
        to: '/explore'
      },
      {

        icon: "fa-user",
        to: '/profile/1/'
      },
      {

        icon: "fa-book",
        to: '/blog/'
      },


    ],
    menuDown: [
      {
        title: 'خانه',
        icon: "fa-home",
        to: '/home',
      },
      {
        title: 'جستجو',
        icon: "fa-search",
        to: '/explore',
      },
      {
        title: 'پروفایل',
        icon: "fa-user",
        to: '/profile/1/',
      },
    ]

  }),
  methods: {
    currentRouteCheck(url) {
      return this.$route.name.split("-").includes(url.split('/')[1]);
    },
  },

  async mounted() {
   await this.$store.commit('onStart');

    for (let index = 0; index < this.menuDown.length; index++) {
      if (this.$route.name.split("-").includes(this.menuDown[index].to.split('/')[1])) this.value = index;
    }
  }
  

};
</script>