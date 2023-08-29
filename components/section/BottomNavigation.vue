<template>
   
        <v-bottom-navigation v-model="value" height="65"  elevation="2"  mode="shift" color="transparent" class=" px-1 w-100 shadow-t"
          grow>
          <v-btn   v-for="(item, index) in menuDown" :to="item.login && isAuthenticated == false ? '/auth/signIn' : item.to + `/${index == 2 ? username : ''}`" :key="item + '+Down menu'"    :ripple="{ class: 'text-blue' }">
            <v-sheet variant="flat" class="px-6 py-2 rounded-pill "
              :color="currentRouteCheck(item.to) ? 'blue' : 'white'">
              <v-icon :size="currentRouteCheck(item.to) ? '16' : '19'">{{ currentRouteCheck(item.to) == false ? "far " : "fa "
              }} {{ item.icon }}</v-icon>
            </v-sheet>
            <span v-if="value != index || (value == index && currentRouteCheck(item.to) )" class="pt-2 text-black">{{ item.title }}</span>
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