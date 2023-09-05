<template>
    <v-footer color="black" v-if="isAuthenticated != true">
      <v-row justify="center" no-gutters>
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
        <v-col class="text-center mt-4" cols="12">
          {{ new Date().getFullYear() }} — <strong>Tedline</strong>
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
        { title:  'قوانین', path: "/blog" }
      ],
      }),
    }
  </script>