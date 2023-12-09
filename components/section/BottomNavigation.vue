
<template>

  <v-bottom-navigation  v-model="value" height="69"  elevation="2"  mode="shift" color="transparent" class=" px-1 w-100 shadow-t"
    grow>
    <v-btn variant="plain"  v-for="(item, index) in menuDown" :to="item.login && isAuthenticated == false ? '/auth/signIn' : item.to + `${index == 2 ? '/' + username : ''}`" :key="item + '+Down menu'"  class="no-hover-effect"  :ripple="false">
      
      <v-sheet v-if="currentRouteCheck(item.to) == false" variant="flat" class="px-6 py-2 rounded-pill "
        :color="'white'">
      
        <component :is="item.icon" style="height: 23px;"  />

   
      </v-sheet>
   
    <v-slide-y-transition :disabled="currentRouteCheck(item.to) == false">
      <v-sheet v-if="currentRouteCheck(item.to)" variant="flat" class="px-5 py-1 bg-blue-accent-4 text-white rounded-pill "
        >
        <component :is="item.iconSolid" style="height: 19px;margin-top: 1px;margin-bottom: -3px;"  />
      
     
   
      </v-sheet>
    </v-slide-y-transition>
  <v-slide-y-reverse-transition>
      <span v-if="value != index || (value == index && currentRouteCheck(item.to) )" class="pt-2   text-black">{{ item.title }}</span>
    </v-slide-y-reverse-transition>
    </v-btn>
  </v-bottom-navigation>
</template>


<script>
import {
  AcademicCapIcon,
  MagnifyingGlassIcon,
  UserCircleIcon,

} from '@heroicons/vue/24/outline'

import AcademicCapIconSolid from '@heroicons/vue/24/solid/AcademicCapIcon'
import MagnifyingGlassIconSolid from '@heroicons/vue/24/solid/MagnifyingGlassIcon'
import UserCircleIconSolid from '@heroicons/vue/24/solid/UserCircleIcon'
 
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
        icon: AcademicCapIcon,
        iconSolid : AcademicCapIconSolid,
        to: '/home',
        login : false,
      },
      {
        title: 'جستجو',
        icon: MagnifyingGlassIcon,
        iconSolid : MagnifyingGlassIconSolid,
        to: '/explore',
        login : false,
      },
      {
        title: 'پروفایل',
        icon: UserCircleIcon,
        iconSolid : UserCircleIconSolid,
        to :  '/profile',
        login : true,
      },
      
    ],

  }),
  methods: {
    currentRouteCheck(url) {
      return this.$route.name.split("-").includes(url.split('/')[1]);
    },

  },
async beforeMount(){

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
  background-color: inherit !important; /* Use !important to override Vuetify styles */
  color: inherit !important;
}
.v-btn--variant-plain {
  opacity: 1 !important;
}
</style>
