<template>
  <div>

    <div v-if="error">
      <p>خطایی رخ داد</p>
    </div>
    <div v-else-if="!data">
      <v-progress-circular v-if="loading" :size="55" class="ma-10" bg-color="grey4" :width="7" color="blue"
        indeterminate></v-progress-circular>
    </div>
    <div v-else>
      <div v-for="course in data" :key="course.id" class="mt-5">
        <SharedYourCourse :progress="false" :data="course" />
      </div>
      <v-alert v-if="data.length == 0" icon="fa fa-info" variant="text" color="blue" class=" rtl  my-10">
        <div class="pb-3 text-body-1 font-weight-black irsa">
          دوره ای وجود ندارد
        </div>
        <div class="text-body-2 irsa">
          هیچ دوره ی منتشر شده ای وجود ندارد
        </div>
      </v-alert>
    </div>
  </div>
</template>

<script setup>
import { useFetch } from '#app'
import { useRoute } from 'vue-router'

const route = useRoute()
const username = route.params.username

// Fetch data using useFetch, suitable for SSR
const { data, error } = await useFetch(`https://tedline.org/api/course/institute-courses/${username}`, {
  key: `courses-${username}`,
  // Optionally, configure SSR behavior
  server: true,
  headers: {
    // Add any necessary headers
  }
})
</script>