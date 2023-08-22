<template>
  <Navbar :transparent="true" />

  <Header />
  <v-container>
    <Tabbar />
    <div class="pb-16 pt-8">
      <BestCourses class="my-16" />
    </div>
    <Courses />
   <div class="pt-16 pb-md-7">
    <Category1  />
   </div>
    <Section1 />
  </v-container>
  <FooterComponent />
</template>

<script>
import Header from "~/components/section/Header.vue";
import FooterComponent from "~/components/section/FooterComponent.vue";
import Courses from "~/components/section/Courses.vue";
import Section1 from "~/components/section/Section1.vue";
import Tabbar from "~/components/section/Tabbar.vue";
import Category1 from "~/components/section/Category1.vue";
import BestCourses from "~/components/section/BestCourses.vue";


export default {
  setup() {
    definePageMeta({
      layout: "home",
    })
  },
  name: "index",
  components: {
    Header,
    FooterComponent,
    Courses,
    Section1,
    Tabbar,
    Category1,
    BestCourses
  }, mounted() {
    if (this.$store.state.isAuthenticated == null)  this.$store.commit('onStart');
    if (this.$store.state.isAuthenticated == true) this.$router.push('/home');
  }

};
</script>

