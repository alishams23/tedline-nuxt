<template>

  <Navbar :transparent="false" :shadow="true"  />
  <Navbar :transparent="true"  />
  <Header />
  <v-container >
   <YourCourses :username="$store.state.username"  />
    <SuggestionCourses class="  " />
   <div class="pb-md-5 ">
    <Category1  />
   </div>
    <BestCourses class="my-16 " />
  </v-container>
</template>
<script >
import Course from '~/components/shared/Course.vue'
import axios from "axios";
import Header from "~/components/section/Header.vue";
import SuggestionCourses from "~/components/section/Courses.vue";
import BestCourses from "~/components/section/BestCourses.vue";
import Category1 from "~/components/section/Category1.vue";
import YourCourses from "~/components/section/YourCourses.vue";


export default {
  setup() {
    definePageMeta({
      layout: "dashboard",
      
    })
  },
  head () {
    return {
        title: 'تدلاین'
    }
},
  components: {
    Course,
    Header,
    SuggestionCourses,
    YourCourses,
    BestCourses,
    Category1

  },
  data: () => ({
   
    data: [],
  
   

  }),
 mounted() {
    if (this.$store.state.isAuthenticated == null)  this.$store.commit('onStart');
    if (this.$store.state.isAuthenticated == false) this.$router.push('/');
  
  }
  
}
</script>