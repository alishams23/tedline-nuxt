<template>
  <v-navigation-drawer class=" hidden-sm-and-down" location="right" rail-width="90" rail
    style="position:fixed; top:0; right:0; ">
    <div class="d-flex flex-column justify-center align-center" style="height: 100%;">
      <v-btn rounded="xl" elevation="0" size="small" width="50" height="50" class="mt-5 mb-auto">tedline</v-btn>
      <v-btn v-for="item in menu" :variant="currentRouteCheck(item.to) ? 'tonal' : 'flat'" :key="item + '+sidebar'"
        :to="item.to" elevation="0" size="x-small" width="50" height="50" class="my-3 custom-rounded-1"
        :color="currentRouteCheck(item.to) ? 'blue-darken-1' : 'grey-lighten-4'"
        :icon="currentRouteCheck(item.to) ? 'fa ' + item.icon : 'fad ' + item.icon"></v-btn>
      <v-btn rounded="xl" @click="changeComponentData" elevation="0" size="small" width="45" height="45"
        class="mt-auto mb-5 " color="indigo-darken-4" icon="fad fa-bells"></v-btn>
    </div>
  </v-navigation-drawer>
</template>

 
<script>



export default {



  data: () => ({
    menu: [
      {
        icon: "fa-home-alt",
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