<template>
  <v-navigation-drawer temporary color="auto" location="right" class=" rounded-s-xl border-none   hidden-sm-and-down  " elevation="0" v-model="drawerChecker">
      <div class="d-flex  flex-column align-center justify-center mt-11">

      <v-avatar color="blue-accent-4" variant="tonal" :size="80"  >
        <v-icon :size="29" icon="fad fa-bells"></v-icon>
      </v-avatar>
      <div class="my-5 font-weight-bold text-sm">
        گزارش ها
      </div>
    </div>
    
      <!-- <Notification /> -->
   
    </v-navigation-drawer>
  <v-navigation-drawer :color="color ? color: 'auto'" class="hidden-sm-and-down border-none" location="right" rail-width="80" rail
    style="position:fixed; top:0; right:0; " elevation="0">
    <div class="d-flex flex-column justify-center align-center" style="height: 100%;">
      <!-- <v-btn rounded="xl" elevation="0" size="small" width="50" height="50" class="text-sm text-blue-darken-4 font-weight-black mt-5 mb-auto">تدلاین</v-btn> -->
    <div class="w-50 mt-5 mb-auto">
      <!-- <v-img src="/pwa-512x512.png" ></v-img> -->

    </div>
      <!-- <v-sheet class="mt-5 mb-auto">
      <v-img src="/pwa-512x512.png" width="50" class="custom-rounded-1">
      </v-img>
      </v-sheet> -->
      <v-btn v-for="item,index in menu" variant="flat" 
        :to="item.login && isAuthenticated == false ? '/auth/signIn' : item.to + `${index == 2 ? '/' + username : ''}`" elevation="0" size="x-small" width="50" height="50" class="my-3 rounded-xl"
        :class="currentRouteCheck(item.to) ? 'bg-blue-gradient text-auto text-xs-1' : color ? 'bg-' + color : 'bg-grey4   text-grey  '" 
        :icon="currentRouteCheck(item.to) ? 'fa ' + item.icon : 'far ' + item.icon"></v-btn>
        <v-btn  variant="flat" 
        elevation="0" @click="drawerChecker = true" size="x-small" width="50" height="50" class="my-3 bg-grey4 text-grey"
        :class=" color ? 'bg-' + color :' '"
        :icon="'far ' + 'fa-bells'"></v-btn>
        <!-- <v-btn rounded="xl" variant="text" @click="changeComponentData" elevation="0" size="small" width="45" height="45"
        class="mt-auto mb-5 bg-grey4 custom-rounded-1" color="blue-darken-3" icon="fad fa-bells"></v-btn> -->
        <div class="mt-auto">

        </div>
    </div>
  </v-navigation-drawer>
</template>

 
<script>


export default {
  props:['color'],
  data(){
    return {
      drawerChecker:true
    }
  },
  computed: {
  isAuthenticated() {
    return this.$store.state.isAuthenticated;
  },
  username() {
    return this.$store.state.username;
  }
},
  data: () => ({
    menu: [
      {
        icon: "fa-home-alt",
        to: '/home',
        login:false
      },
      {
        icon: "fa-search",
        to: '/explore',
        login:false

      },
      {
        icon: "fa-user",
        to: '/profile',
        login:true

      },
  
    ],
  }),
  methods: {
    currentRouteCheck(url) {
      return this.$route.name.split("-").includes(url.split('/')[1]);
    },
    

  },

};
</script>