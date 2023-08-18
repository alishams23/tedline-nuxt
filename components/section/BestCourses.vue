<template>
  <v-row justify="center" class="  bg-grey-lighten-4 rounded-xl flex-row-reverse" align="center" no-gutters>
    <v-col cols="12" lg="3" class="px-6 py-10">
      <h3 class=" text-h3 font-weight-bold irsa text-center line-height-sm">
        <span class=" text-blue">بهترین</span> دوره ها
      </h3>
      <p class="mt-6 pt-4 text-muted text-center">
        دوره هایی آموزشی که تدلاین به شما توصیه میکند
      </p>
    </v-col>
    <v-col cols="12" lg="9" class="">
      <v-slide-group v-model="model" prev-icon=" fal fa-chevron-left" next-icon="  fal fa-chevron-right"
        selected-class="bg-primary" :show-arrows="false">
        <v-slide-group-item v-for="item in data" :key="item" v-slot="{ isSelected, toggle, selectedClass }">
          <Course :data="item" />
        </v-slide-group-item>
      </v-slide-group>
      <div class="d-flex justify-center">
        <v-progress-circular v-if="loading" :size="60" class="ma-10" :width="10" color="blue"
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
    model: null,
    data: [],
    loading: true
  }),
  methods: {
    getData() {
      axios.get('http://127.0.0.1:8000/api/course/HomeCourses/').then((response) => {
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