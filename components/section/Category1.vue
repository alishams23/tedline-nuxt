<template>
  <v-card  class="rounded-xl  my-15 py-10 text-white  background-gradient-category" elevation="0">
    <v-row class=" flex-row-reverse " align="center">
      <v-col cols="12" lg="3" md="4">
        <v-card-title class="irsa  font-weight-black rtl">
          پر طرفدار ترین دسته بندی ها
        </v-card-title>
      </v-col>
      <v-col cols="12" lg="9" md="8">
          <Swiper
            :slides-per-view="'auto'"
            :loop="false"
            :space-between="3"
            class="px-3"
          >
            <SwiperSlide v-for="item in data" :key="item.id + '+category'" >
              <v-btn :to="'/explore/?category=' + item.id" class="ma-2 mx-1 mx-md-2  text-xs    rtl" color="auto" elevation="0" rounded="xl"  size="large" min-width="120">
                <template v-slot:prepend>
                  <v-avatar color="blue" variant="tonal" class="" size="25">
                  <v-icon color="blue"  size="small" >
                    fal fa-arrow-right
                  </v-icon>
                  </v-avatar>
                </template>
                {{ item.title }}
              </v-btn>
            </SwiperSlide>
          </Swiper>
     
        <!-- <v-slide-group :show-arrows="false" prev-icon=" fal fa-chevron-left" next-icon="  fal fa-chevron-right">
          <v-slide-group-item v-for="item in data" :key="item.id + '+category'">
            <v-btn :to="'/explore/?category=' + item.id" class="ma-2 text-body-2  rtl" rounded="lg" prepend-icon="fal fa-arrow-right" size="large" min-width="150">
              <template v-slot:prepend>
                <v-icon color="blue" size="small"></v-icon>
              </template>
              {{ item.title }}
            </v-btn>
          </v-slide-group-item>
        </v-slide-group> -->
        <div class="d-flex justify-center">
          <v-progress-circular v-if="loading" :size="60" :width="8" class="ma-10" color="auto"
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
<style>
.swiper-container{
  width: 100%;
}
.swiper-wrapper {
  width: 50%;
}
.swiper-slide {
  text-align: center;
  width: auto;
}
.slide-image {
  height: 400px;
  width: auto;
}
.my-gallery figure {
  margin: 0px;
}

.background-gradient-category{
  background: radial-gradient(circle at 10% 20%, rgb(59, 149, 237) 0%, rgb(7, 91, 173) 90%);
}
</style>