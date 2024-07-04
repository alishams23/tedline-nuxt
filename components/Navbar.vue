<template>
  <div>
    <v-navigation-drawer elevation="0" temporary v-model="drawerChecker">
      <Sidebar />
    </v-navigation-drawer>
    <v-fade-transition>
      <v-app-bar v-if="(scrollY > 100 && transparent == false) || (scrollY < 100 && transparent == true) || transparent == null"
        :class="transparent == true ? 'custom-bg-blue text-auto  ' : shadow == true ? 'shadow-1 bg-auto ' : ''"
        :scroll-behavior="transparent == true ? '' : ''" :absolute="transparent == true ? true : false"
        scroll-threshold="1" class="" app elevation="0">
        <v-app-bar-nav-icon @click.stop="drawerChecker = !drawerChecker">
          <i class="fa fa-bars"></i>
        </v-app-bar-nav-icon>
        <v-toolbar-title>

          <v-sheet v-if="transparent == false" class="mr-auto hidden-md-and-down rounded-pill   " color="transparent"
            height="33" width="110">
            <v-img src="/images/icon2.png" class="  w-100 h-100  "></v-img>

          </v-sheet>

        </v-toolbar-title>
        <v-spacer></v-spacer>
        <div class="me-2 " :class="transparent == true ? 'text-white' : ''"
          v-for="item in isAuthenticated != true ? menuItems : menuItemsLogin">
          <v-list-item class=" hidden-md-and-down custom-rounded-2  text-center text-xs font-weight-bold" width="120px"
            :color="transparent == true ? 'light' : 'blue'" :key="item.title" :to="item.path">
            {{ item.title }}
          </v-list-item>
        </div>


        <v-btn v-if="isAuthenticated != true" to="/auth/signIn/" width="120px" class="ma-3 font-weight-bold" height="40"
          variant="flat" :color="transparent == true ? 'blue' : 'blue-darken-1'" rounded="pill">
          ورود
        </v-btn>
        <v-btn v-if="isAuthenticated != true" to="/auth/signUp/" width="120px"
          class="mr-8 font-weight-bold custom-letter-spacing " height="40" variant="flat" color="blue-grey-darken-4"
          rounded="pill">
          ثبت نام
        </v-btn>
        <v-menu v-if="isAuthenticated == true" v-model="menuNotification" :close-on-content-click="false"
          location="start">
          <template v-slot:activator="{ props }">
            <v-avatar v-bind="props" variant="tonal" :color="transparent == true ? 'white' : 'blue'"
              class="me-4  hidden-md-and-up custom-rounded-2">
              <v-icon size="13" icon="fa fa-bell"></v-icon>
            </v-avatar>
          </template>
          <v-card min-width="300" elevation="24" class="rounded-lg">
            <v-list>
              <v-list-item class="rtl ">
                <v-list-item-title class="font-weight-bold text-sm">
                  گزارش ها
                </v-list-item-title>
                <template v-slot:prepend>
                  <v-avatar variant="tonal" color="blue" class="me-4">
                    <v-icon size="13" icon="fa fa-bell"></v-icon>
                  </v-avatar>
                </template>
              </v-list-item>
            </v-list>
            <v-divider></v-divider>
            <Notification />
          </v-card>

        </v-menu>


        <dark class="me-9  text-auto  " />



      </v-app-bar>
    </v-fade-transition>
  </div>
</template>
<script>
import Sidebar from "~/components/Sidebar.vue";
import Notification from "~/components/section/Notification.vue";
import dark from "~/components/shared/dark.vue";

export default {

  name: "App",
  props: ['transparent', 'shadow'],
  components: { Sidebar, Notification, dark },
  data() {
    return {
      menuNotification: false,
      drawerChecker: false,
      loading: true,
      scrollY: 0,
      menuItems: [
        { title: "خانه", path: "/", icon: "fa fa-menu" },
        { title: "وبلاگ", path: "/explore/?tab=2", icon: "mdi-face" },
        { title: "ارتباط با ما", path: "/contactUs", icon: "mdi-face" },
        { title: "همه ی دوره ها", path: "/explore", icon: "mdi-lock-open" }
      ], menuItemsLogin: [

        { title: "خانه", path: "/home", icon: "fa fa-menu" },
        { title: "وبلاگ", path: "/explore/?tab=2", icon: "mdi-face" },
        { title: "ارتباط با ما", path: "/contactUs", icon: "mdi-face" },
        { title: "همه ی دوره ها", path: "/explore", icon: "mdi-lock-open" }
      ]
    };
  },
  computed: {
    isAuthenticated() {
      return this.$store.state.isAuthenticated;
    }
  },
  methods: {
    handleScroll() {
      this.scrollY = window.scrollY;
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll);
  },

};
</script>

<style>
.v-btn {
  /* Apply the custom letter-spacing to all v-btn components */
  letter-spacing: 0px;
  /* Adjust the value as needed */
}
</style>
