<template>
  <v-row justify="center" align="center" no-gutters>
    <v-col cols="12" lg="3" class="">
      <h3 class="text-h5 text-md-h3 font-weight-bold irsa text-right text-md-center line-height-sm">
        دوره های <span class="text-gradient-2">مهارت ورزی</span>
      </h3>
      <p class="mt-md-6 pt-4 rtl text-muted text-right text-md-center mx-md-4">
         دوره های مهارت ورزی پیشنهادی 
      </p>
    </v-col>
    <v-col cols="12" lg="9" class="">
      <div v-if="status == 'pending'" class="d-flex justify-center">
        <v-progress-circular class="ma-10" bg-color="primary-lighten-5" :size="55" :width="7" color="blue" indeterminate></v-progress-circular>
      </div>
      <Swiper
        v-else
        :slides-per-view="'auto'"
        :loop="false"
        :space-between="3"
        class="px-3"
      >
        <SwiperSlide v-for="item in data.results" :key="item">
          <SharedCourse :data="item" :detail="false" titleClass="py-3" class="mt-16 responsive-card mx-1 mx-md-2 rounded-2xl" />
        </SwiperSlide>
      </Swiper>

      <div v-if="error" class="error-message">
        خطایی رخ داد
      </div>
    </v-col>
  </v-row>
</template>

<script setup>
import { useFetch } from 'nuxt/app';

// Use useFetch for fetching data on server-side or client-side
const { status, data,error } = await useFetch('https://tedline.org/api/course/HomeCourses/?ordering=?&exclude_category_slug=تحصیلی', {
  method: 'GET'
});
</script>
