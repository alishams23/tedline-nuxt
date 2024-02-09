<template>
  <v-row justify="center" class="inner-shadow-1  bg-grey4  rounded-xl flex-row-reverse" align="center" no-gutters>
    <v-col cols="12" lg="3" class="px-6 pb-md-10 pt-10">
      <h3 class=" text-h5 text-md-h3 font-weight-bold irsa text-right text-md-center line-height-sm">
        <span class=" text-blue">بهترین</span> دوره ها
      </h3>
      <p class="mt-md-6 rtl pt-4 text-muted text-right text-md-center">
        دوره‌های آموزشی که تدلاین به شما توصیه می‌کند.
      </p>
    </v-col>
    <v-col cols="12" lg="9" class="">
    

      <Swiper
      :slides-per-view="'auto'"
      :loop="false"
      :space-between="3"
      class="px-3"
    >
    
      <SwiperSlide v-for="item in data"  :key="item">
        
        <Course :data="item" titleClass="pt-md-3 py-1" cardClass="pa-2 pb-0 " class="my-16  responsive-card px-1 px-md-2"  />

      </SwiperSlide>
    </Swiper>



      <div class="d-flex justify-center">
        <v-progress-circular v-if="loading" :size="55" class="ma-10" bg-color="grey4" :width="7" color="blue"
          indeterminate></v-progress-circular>
      </div>
    </v-col>
  </v-row>
</template>
<script>
import Course from '~/components/shared/Course.vue'
import axios from "axios";


export default {
  components: {
    Course,
  },
  data: () => ({

 
    data: [],

    loading: true
  }),
  methods: {
    getData() {
      axios.get('https://tedline.org/api/course/HomeCourses/').then((response) => {
        this.data = response.data
        this.loading = false
      }
      )
    }
  }, mounted() {
    this.getData()
  }
}
</script>


