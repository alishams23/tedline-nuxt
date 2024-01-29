<template>
  <v-row justify="center" align="center" no-gutters>
    <v-col cols="12" lg="3" class="">
      <h3 class=" text-h5 text-md-h3 font-weight-bold irsa text-right text-md-center line-height-sm">
        دوره های <span class=" text-blue">پیشنهادی</span>
      </h3>
      <p class="mt-md-6 pt-4 text-muted text-right text-md-center">
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
        <Course :data="item" :detail="false" titleClass="pt-md-3" class="my-16 responsive-card mx-1 mx-md-2   rounded-2xl" />
      </SwiperSlide>
    </Swiper>

      <div class="d-flex justify-center">
        <v-progress-circular class="ma-10" v-if="loading" bg-color="transparent" :size="55"  :width="6" color="blue" indeterminate></v-progress-circular>
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
    model: null,
    data: [],
    loading: true,    
    
 

  }),
  methods: {
    getData() {
      axios.get('https://tedline.org/api/course/HomeCourses/').then((response) =>{
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