
<template>
  <v-app id="inspire">

   <SideNavigation  @updateData="updatePageDrawerChecker"/>

    <v-main>
     
      <slot />
   
    </v-main>
    <v-navigation-drawer temporary location="right" class=" rounded-s-xl border-none  hidden-sm-and-down shadow-2 " elevation="0" v-model="drawerChecker">
      <div class="d-flex  flex-column align-center justify-center mt-11">

      <v-avatar color="blue-accent-4" variant="tonal" :size="80"  >
        <v-icon :size="29" icon="fad fa-bells"></v-icon>
      </v-avatar>
      <div class="my-5 font-weight-bold text-sm">
        نوتیفیکیشن
      </div>
    </div>
    
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