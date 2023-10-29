<template>
  <v-row justify="center" align="center" no-gutters>
    <v-col cols="12" lg="3" class="">
      <h3 class=" text-h4 text-md-h3 font-weight-bold irsa text-center line-height-sm">
        دوره های <span class=" text-blue">پیشنهادی</span>
      </h3>
      <p class="mt-6 pt-4 text-muted text-center">
        دوره هایی آموزشی که تدلاین به شما توصیه میکند
      </p>
    </v-col>
    <v-col cols="12" lg="9" class="">



      <Swiper
      :breakpoints="breakpoints"
       
      :effect="'coverflow'"
      :slidesPerView="4"
    :spaceBetween="30"
    :pagination="{
      clickable: true,
    }"
    :modules="modules"
    class="mySwiper"
    >
      <SwiperSlide v-for="item in data"  :key="item">
        <Course :data="item" class="my-16 responsive-card px-1 px-md-2"   />


      </SwiperSlide>
    </Swiper>

      <div class="d-flex justify-center">
        <v-progress-circular class="ma-10" v-if="loading" :size="60" :width="10" color="blue" indeterminate></v-progress-circular>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import Course from '~/components/shared/Course.vue'
import axios from "axios";
import { Pagination } from 'swiper/modules';

export default {
  components: {
    Course,
  },
  data: () => ({
    model: null,
    data: [],
    loading: true,       breakpoints: {       
      320: {       
         slidesPerView: 1.5,
         spaceBetween: 10     
      },     
      410: {       
         slidesPerView: 2,       
         spaceBetween: 50     
      },    
      620: {       
         slidesPerView: 3,       
         spaceBetween: 50     
      },      
      970: {       
         slidesPerView: 3.5,       
         spaceBetween: 50     
      },   
  
      1950: {       
         slidesPerView: 4,       
         spaceBetween: 30     
      } 
   }   ,
   modules: [Pagination],

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