<template>
<div>
  <v-navigation-drawer  elevation="0" temporary   v-model="drawerChecker">
<Sidebar  />
  </v-navigation-drawer>
  <v-app-bar  :class="transparent == true ? 'custom-bg-blue' : 'shadow-1'" :scroll-behavior="transparent == true ||transparent == null ? '':'elevate hide inverted' " scroll-threshold="1" class="py-2" app elevation="0">
    <v-app-bar-nav-icon  @click.stop="drawerChecker = !drawerChecker">
      <i class="fad fa-bars"></i>
    </v-app-bar-nav-icon>
    <v-toolbar-title>
      <v-btn  variant="text" class="mx-4 text-blue font-weight-bold text-h6  hidden-md-and-down "  rounded  >
       Tedline
      </v-btn>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <div
    
    v-for="item in isAuthenticated != true ? menuItems : menuItemsLogin"
    
  >
    <v-list-item colo  class=" hidden-md-and-down text-center text-body-2 font-weight-bold"  width="120px"   color="blue-darken-2"   rounded="pill"  :key="item.title" :to="item.path">
  
      {{ item.title }}
    </v-list-item>

  </div>
  
    <v-btn v-if="  isAuthenticated != true" to="/auth/signIn/" width="120px" class="ma-3 font-weight-bold" height="40"  variant="flat" color="blue-darken-1" rounded="pill"  >
      ورود
    </v-btn>
    <v-btn v-if=" isAuthenticated != true" to="/auth/signUp/" width="120px" class="mr-8 font-weight-bold custom-letter-spacing " height="40" variant="flat" color="blue-grey-darken-4" rounded="pill" >
     ثبت نام
    </v-btn>
    <v-avatar  variant="tonal"  color="indigo-darken-4" class="me-4" v-if="isAuthenticated  == true">
      <v-icon size="13" icon="fad fa-search"></v-icon>
    </v-avatar>
    <v-avatar  color="indigo-darken-4" class="me-9" v-if="isAuthenticated  == true">
      <v-icon size="13" icon="fad fa-user"></v-icon>
    </v-avatar>
  </v-app-bar>
</div>
</template>
<script>
import Sidebar from "~/components/Sidebar.vue";

export default {

  name: "App",
  props:['transparent'],
  components:{Sidebar},
  computed: {
  isAuthenticated() {
    return this.$store.state.isAuthenticated;
  }
},


  data() {
    return {
      appTitle: "tedline",
      drawerChecker: false,
      loading:true,
      menuItems: [
        { title: "خانه", path: "/", icon: "fa fa-menu" },
        { title: "وبلاگ", path: "/blog", icon: "mdi-face" },
        { title: "ارتباط با ما", path: "/contactUs", icon: "mdi-face" },
        { title: "همه ی دوره ها", path: "/explore", icon: "mdi-lock-open" }
      ],menuItemsLogin:[]
    };
  }
};
</script>

<style>
.v-btn {
  /* Apply the custom letter-spacing to all v-btn components */
  letter-spacing: 0px; /* Adjust the value as needed */
}

</style>
