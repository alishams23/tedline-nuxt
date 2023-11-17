<template>
  <div>

    <v-card class="rounded-xl shadow-3  text-right">
      <v-card class="rounded-0" elevation="0" :to="'/course/' + data.id">

        <div class="">
          <v-img class=" align-end  rounded-e-xl text-white text-left" :aspect-ratio="1 / 1" :src="data.image" cover>
            <v-btn    class="  text-xs  bg-white  font-weight-bold   shadow-2  rounded-tr-xl " >
              
              <template  v-slot:prepend>
                <v-icon></v-icon>
              </template>
              <div v-if="data.price != 0">
                {{ data.price }} <span class="  text-grey irsa text-xxs">تومان</span>
              </div>
              
              <div v-else>
                رایگان
              </div>
            </v-btn>
          </v-img>
        </div>

        <v-responsive height="60">
          <div class=" test-right text-body-2 text-lg-body-1  rtl irsa px-3 pt-2 line-height-sm  font-weight-bold">{{
            data.title }}
          </div>
        </v-responsive>
      </v-card>
      <v-card-actions>


        <v-icon @click="show = !show" class="px-3" size="17">
          {{ show ? 'fal fa-chevron-up' : 'fal fa-chevron-down' }}
        </v-icon>

        <v-spacer></v-spacer>
        <div class="rtl text-xs  ">
          <v-icon color="blue" class="px-3 " :size="13">
            fa fa-clock
          </v-icon>
          {{ data.duration }}
          دقیقه

        </div>
      </v-card-actions>
      <v-expand-transition>
        <div v-show="show" class="rtl">
          <v-divider></v-divider>

          <v-card-text class="rtl">

            {{ data.description }}
          </v-card-text>


        </div>
      </v-expand-transition>

    </v-card>
  </div>
</template>
<script>
export default {
  props: ["data", "width"],
  data: () => ({
    show: false,
  }),
}
</script>
<style>
.test-n {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>