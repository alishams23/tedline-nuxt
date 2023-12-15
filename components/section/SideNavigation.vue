<template>
  <v-navigation-drawer class=" hidden-sm-and-down" location="right" rail-width="90" rail
    style="position:fixed; top:0; right:0; ">
    <div class="d-flex flex-column justify-center align-center" style="height: 100%;">
      <!-- <v-btn rounded="xl" elevation="0" size="small" width="50" height="50" class="text-sm text-blue-darken-4 font-weight-black mt-5 mb-auto">تدلاین</v-btn> -->
    <div class="w-50 mt-5 mb-auto">
      <v-img src="/pwa-512x512.png" ></v-img>

    </div>
      <!-- <v-sheet class="mt-5 mb-auto">
      <v-img src="/pwa-512x512.png" width="50" class="custom-rounded-1">
      </v-img>
      </v-sheet> -->
      <v-btn v-for="(item,index) in menu" :variant="currentRouteCheck(item.to) ? 'flat' : 'flat'" :key="item + '+sidebar'"
        :to="item.login && isAuthenticated == false ? '/auth/signIn' : item.to + `${index == 2 ? '/' + username : ''}`" elevation="0" size="x-small" width="50" height="50" class="my-3 custom-rounded-1"
        :class="currentRouteCheck(item.to) ? 'bg-blue-gradient text-white' : 'bg-white'"
        :icon="currentRouteCheck(item.to) ? 'fa ' + item.icon : 'far ' + item.icon"></v-btn>

        <v-btn rounded="xl" variant="text" @click="changeComponentData" elevation="0" size="small" width="45" height="45"
        class="mt-auto mb-5 bg-grey-lighten-4 custom-rounded-1" color="blue-darken-3" icon="fad fa-bells"></v-btn>
    </div>
  </v-navigation-drawer>
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
      {
        icon: "fa-book",
        to: '/blog',
        login:false

      },
    ],
  }),
  methods: {
    currentRouteCheck(url) {
      return this.$route.name.split("-").includes(url.split('/')[1]);
    },
    changeComponentData() {
      this.$emit('updateData');
    },

  },

};
</script>