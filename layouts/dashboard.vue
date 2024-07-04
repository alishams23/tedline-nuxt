
<template>
  <v-app id="inspire">

    
    <SideNavigation  />
    <v-main>
     
      <slot />
   
    </v-main>
    

  </v-app>
  <v-layout class="overflow-visible bg-auto hidden-lg-and-up" style="height: 65px;">
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
   
 
  }),

methods:{

},
  async mounted() {
   await this.$store.commit('onStart');
 
  }

};
</script>