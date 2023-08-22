<template>
  <v-card color="indigo-darken-4" class="rounded-xl my-15 py-10  " elevation="0">
    <v-row class=" flex-row-reverse " align="center">
      <v-col cols="12" lg="3" md="4">
        <v-card-title class="irsa  font-weight-black rtl">
          پر طرفدار ترین دسته بندی ها
        </v-card-title>
      </v-col>
      <v-col cols="12" lg="9" md="8">
        <v-slide-group :show-arrows="false" prev-icon=" fal fa-chevron-left" next-icon="  fal fa-chevron-right">
          <v-slide-group-item v-for="item in data" :key="item.id + '+category'">
            <v-btn :to="'/explore/?category=' + item.id" class="ma-2 text-body-2  rtl" rounded="lg" prepend-icon="fal fa-arrow-right" size="large" min-width="150">
              <template v-slot:prepend>
                <v-icon color="blue" size="small"></v-icon>
              </template>
              {{ item.title }}
            </v-btn>
          </v-slide-group-item>
        </v-slide-group>
        <div class="d-flex justify-center">
          <v-progress-circular v-if="loading" :size="60" :width="10" class="ma-10" color="white"
            indeterminate></v-progress-circular>
        </div>
      </v-col>
    </v-row>
  </v-card>
</template>


<script >
import axios from "axios";

export default {

  data: () => ({

    category: [
      {
        title: 'برنامه نویسی'
      },
      {
        title: 'عکاسی'
      },
      {
        title: 'طراحی'
      },
      {
        title: 'برنامه نویسی'
      },
      {
        title: 'برنامه نویسی'
      },
      {
        title: 'برنامه نویسی'
      },
      {
        title: 'برنامه نویسی'
      },
    ],
    data: [],
    loading: true,
  }),
  methods: {
    getData() {
      axios.get('https://tedline.org/api/course/CourseCategoryPopular/').then((response) => {
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