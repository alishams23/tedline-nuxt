<template>

  <Navbar :transparent="false"   />
  <Navbar :transparent="true"  />

 
  <Header />
  <v-container>
    <v-card elevation="0" class="mt-5 ">
     
      <v-tabs v-model="tab" align-tabs="center" elevation="0" slider-color="transparent" color="blue-darken-2"
        density="comfortable">
        <div class=" rounded-pill bg-grey-lighten-4 ">
          <v-tab class="bg-transparent px-md-16 px-10 rounded-pill " variant="flat" value="one">در حال یادگیری</v-tab>
          <v-tab class="bg-transparent   px-md-16 px-10  rounded-pill " variant="flat" value="two">به اتمام
            رسیده</v-tab>
        </div>
      </v-tabs>
      <v-card-text>
        <v-window v-model="tab">
          <v-window-item value="one">
            <div class="my-10">
              <YourCourse />
            </div>
          </v-window-item>
          <v-window-item value="two">
         
              <v-alert
              icon="fa fa-info"
                variant="tonal"
                color="blue"
                class="rtl border-opacity-100  my-10"
                border="start"
               
              >
            <div class=" text-h6 pb-3  font-weight-black irsa">
              دوره ای وجود ندارد
            </div>
            <div>
              شما هیچ دوره های را به اتمام نرسانده اید
            </div>
            </v-alert>
         
          </v-window-item>
        </v-window>
      </v-card-text>
    </v-card>
    <SuggestionCourses class="my-12 pb-16" />
   <Category1 />
    <BestCourses class="my-16" />
  </v-container>
</template>




<script >
import Course from '~/components/shared/Course.vue'
import axios from "axios";
import Header from "~/components/section/Header.vue";
import SuggestionCourses from "~/components/section/Courses.vue";
import BestCourses from "~/components/section/BestCourses.vue";
import Category1 from "~/components/section/Category1.vue";
import YourCourse from "~/components/shared/YourCourse.vue";


export default {
  setup() {
    definePageMeta({
      layout: "dashboard",
      
    })
  },
  components: {
    Course,
    Header,
    SuggestionCourses,
    YourCourse,
    BestCourses,
    Category1

  },
  data: () => ({
    model: null,
    data: [],
    tab: null,
   

  }),
  methods: {
    getData() {
      axios.get('http://127.0.0.1:8000/api/course/HomeCourses/').then((response) =>
        this.data = response.data
      )
    }
  }, mounted() {
    if (this.$store.state.isAuthenticated == null)  this.$store.commit('onStart');
    if (this.$store.state.isAuthenticated == false) this.$router.push('/');
    this.getData()
  }
  
}
</script>