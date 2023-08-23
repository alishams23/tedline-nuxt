
<template>
  <v-app id="inspire">

   <SideNavigation @updateData="updatePageDrawerChecker"/>

    <v-main>
      <slot />
    </v-main>
    <v-navigation-drawer temporary location="right" class=" border-none  hidden-sm-and-down shadow-2 " elevation="0" v-model="drawerChecker">
      <Notification />

    </v-navigation-drawer>

  </v-app>
  <v-layout class="overflow-visible  hidden-lg-and-up" style="height: 65px;">
    <bottomNavigation />
  </v-layout>
</template>

 
<script>
import Notification from "~/components/section/Notification.vue";
import SideNavigation from "~/components/section/SideNavigation.vue";
import bottomNavigation from "~/components/section/BottomNavigation.vue";

import { useStore } from 'vuex'
export default {

  components: { Notification,bottomNavigation,SideNavigation },

  data: () => ({
    drawerChecker: false,
 
  }),

methods:{
  updatePageDrawerChecker() {
      this.drawerChecker = !this.drawerChecker;
    },
},
  async mounted() {
   await this.$store.commit('onStart');
 
  }

};
</script>