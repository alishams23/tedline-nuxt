
<template>

  <v-bottom-navigation  v-model="value" height="63"  elevation="2"  mode="shift" color="transparent" class=" px-1 w-100 shadow-t"
    grow>
    <v-btn variant="plain"  v-for="(item, index) in menuDown" :to="item.login && isAuthenticated == false ? '/auth/signIn' : item.to + `${index == 2 ? '/' + username : ''}`" :key="item + '+Down menu'"  class="no-hover-effect"  :ripple="false">
      
      <v-sheet v-if="currentRouteCheck(item.to) == false" variant="flat" class="px-6 py-2 rounded-pill "
        :color="'white'">
      
        <v-icon :size=" '18'" >{{ "far " 
        }} {{ item.icon }}</v-icon>
   
      </v-sheet>
   
    <v-scale-transition :disabled="currentRouteCheck(item.to) == false">
      <v-sheet v-if="currentRouteCheck(item.to)" variant="flat" class="px-5 py-1 rounded-pill "
        :color="'blue'">
      
        <v-icon :size=" '16' " style="margin-top: 2px;margin-bottom: 2px;">{{  "fa "
        }} {{ item.icon }}</v-icon>
   
      </v-sheet>
    </v-scale-transition>
     
      <span v-if="value != index || (value == index && currentRouteCheck(item.to) )" class="pt-1  text-black">{{ item.title }}</span>
  
    </v-btn>
  </v-bottom-navigation>
</template>


<script>
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
        icon: "fa-home-alt",
        to: '/home',
        login : false,
      },
      {
        title: 'جستجو',
        icon: "fa-search",
        to: '/explore',
        login : false,
      },
      {
        title: 'پروفایل',
        icon: "fa-user",
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
