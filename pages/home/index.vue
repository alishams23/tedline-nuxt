<template>
  <Navbar :transparent="false" :shadow="true"  />
  <Navbar :transparent="true"  />
  
  <Header />
  <ClientOnly >
  <v-container >
   <YourCourses :username="$store.state.username"  />
   <SectionSchoolCourses/>
   <div class="pb-md-5 ">
    <Category1  />
   </div>
   <SectionSwapCourses/>
 
    <BestCourses class="my-16 " />
  </v-container>
</ClientOnly>
</template>
<script >
import Course from '~/components/shared/Course.vue'
import axios from "axios";
import Header from "~/components/section/Header.vue";

import BestCourses from "~/components/section/BestCourses.vue";
import Category1 from "~/components/section/Category1.vue";
import YourCourses from "~/components/section/YourCourses.vue";



export default {
  setup() {
    definePageMeta({
      ssr:false,
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