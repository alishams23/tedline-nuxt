<template>
    <v-footer color="black" v-if="isAuthenticated != true">
      <v-row justify="center" no-gutters>
       <v-col cols="11"  >
        <div class="d-flex flex-wrap justify-center">
          <v-btn
        v-for="item in menuItems"
        :key="item"
        color="white"
        variant="text"
        class="mx-2"
        rounded="xl"
        :to="item.path"
      >
        {{ item.title }}
      </v-btn>
        </div>
      <div class="text-center mt-4" >
        {{ new Date().getFullYear() }} — <strong>Tedline</strong>
      </div>
       </v-col>
        <v-col cols="1">
          <div >
            <a href="https://tedline.org/api/wallet/enamad/" >
              <v-img src="images/enamad.png" height="50"></v-img>
            </a>
           </div>
        </v-col>
      </v-row>
    </v-footer>
  </template>
  <script>
    export default {
      computed: {
    isAuthenticated() {
      return this.$store.state.isAuthenticated;
    }
  },
      data: () => ({
  
        menuItems: [
        { title: "خانه", path: "/"},
        { title: "وبلاگ", path: "/blog"},
        { title: "ارتباط با ما", path: "/contactUs"},
        { title: "دوره ها", path: "/explore" },
        { title:  'قوانین', path: "/terms" }
      ],
      }),
    }
  </script>