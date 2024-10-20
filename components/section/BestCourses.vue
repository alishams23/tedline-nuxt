
<template>
  <v-row justify="center" class="inner-shadow-1 bg-custom-s rounded-xl flex-row-reverse" align="center" no-gutters>
    <v-col cols="12" lg="3" class="px-6 pb-md-10 pt-10">
      <h3 class="text-h5 text-md-h3 font-weight-bold irsa text-right text-md-center line-height-sm">
        دوره های <span class=" text-gradient-1">پیشنهادی</span>
      </h3>
      <p class="mt-md-6 rtl pt-4 text-muted text-right text-md-center">
        دوره‌های آموزشی که تدلاین به شما توصیه می‌کند.
      </p>
    </v-col>
    
    <v-col cols="12" lg="9">
      <!-- Check if data is still loading -->
       
      <v-progress-circular v-if="pending == true" :size="55" class="ma-10" bg-color="grey4" :width="7" color="blue" indeterminate />
      
      <!-- Render courses when data is available -->
      <Swiper v-else :slides-per-view="'auto'" :loop="false" :space-between="3" class="px-3">
        <SwiperSlide v-for="item in data" :key="item">
          <SharedCourseCard2 :data="item" :detail="true" cardClass="pb-0" class="my-16 shadow-1 responsive-card px-1 px-md-2" />
        </SwiperSlide>
      </Swiper>
      
      <!-- Handle error if there is any -->
      <div v-if="error" class="error-message">
        Error loading data: {{ error.message }}
      </div>
    </v-col>
  </v-row>
</template>
<script setup>
import { useAsyncData } from 'nuxt/app';
import axios from 'axios';
import { useRuntimeConfig, useRoute } from '#app';


// Access runtime config to get the baseURL from environment variables
const config = useRuntimeConfig();
const route = useRoute();

// Use useAsyncData for server-side data fetching
const { data, pending, error } = await useAsyncData('getCourseData', async () => {
  const response = await axios.get(`https://tedline.org/api/course/HomeCourses/?ordering=?`);
  return response.data.results;
});
</script>

