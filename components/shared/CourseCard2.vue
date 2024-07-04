<template>
  <div>

    <v-card class=" rounded-xl   text-right" :class="cardClass" :color="color ? color : 'auto'" rounded="xl"
      elevation="0">
      <v-card :ripple="false" class=" pa-0   " color="transparent" elevation="0" :to="'/course/' + data.id">

        <div>
          <v-img transition="" class=" align-end   text-auto  text-left" :aspect-ratio="1.5 / 1" :src="data.image" cover>

            <div class="h-100  w-100 rounded-lg  justify-start d-flex align-start">

              <div class=" rtl  pt-16 py-3 py-md-3  px-3  w-100 text-white text-right">
                <div class="d-flex mb-1" v-if="data.discount != 0">
                  <div class=" text-xs-1 bg-glass-red font-weight-bold text-red-darken-4  mb-auto rounded-lg   px-3">
                    {{ data.discount }}% </div>

                </div>
                <div class=" d-flex  mb-auto align-center">
                  <div class="bg-glass-black mb-auto rounded-lg pl-3 pr-1">
                    <div class="rtl text-xs-2 text-white font-weight-light  ">

                      <v-avatar color="transparent" variant="tonal" class="ml-1 " size="20">
                        <IconClockFilled class="text-blue" size="10" />
                      </v-avatar>
                      {{ convertSeconds(data.duration) }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </v-img>
        </div>
        <div class="d-flex" style="margin-top:-20px;margin-bottom:-10px;z-index:99999">
          <v-avatar size="43" class=" rounded-pill ml-3  opacity-25" color="auto">
            <v-avatar size="37" class="  rounded-pill bg-blue  " variant="flat">
              <v-icon size="10" class="position-absolute text-white text-white " icon="fad fa-users"></v-icon>
              <v-img :src="`https://tedline.org/api/account/user_profile_image/${data.teacher.username}`" cover></v-img>

            </v-avatar>
          </v-avatar>
        </div>


        <v-list-item-title class=" font-weight-light text-grey mr-3 ml-2 pb-0 mb-0  text-xs-2 ">{{ data.teacher.username
        }}
        </v-list-item-title>

        <div :class="titleClass">

          <v-responsive height="50" class="mt-0">
            <div
              class=" test-right text-xs   pt-md-0 rtl irsa px-3   line-height-sm  font-weight-medium font-weight-black-lg">
              {{
                data.title }}
            </div>
          </v-responsive>
        </div>
      </v-card>
      <div class=" d-flex justify-space-between px-3 pb-3 pt-3 pt-md-3  pt-md-0 ma-0" v-if="detail != false">


        <v-icon @click="show = !show" class="px-3" size="15">
          {{ show ? 'fal fa-chevron-up' : 'fal fa-chevron-down' }}
        </v-icon>

        <v-spacer></v-spacer>
        <div class="rtl text-xs px-1 px-md-3   ">


          <div v-if="data.price != 0" class="d-flex align-center ">
            <span v-if="data.discount == 0" class="pl-1">{{ data.price }}</span>
            <span v-else class="px-1 ">

              <div class=" text-xs-2 text-grey1 mt-n3 mb-n1">
                <span class="text-decoration-line-through"> {{ data.price }}</span>
                <span class="text-blue pl-1 font-weight-black">{{data.discount}}%</span>
              </div>
              <div class="text-xs">
                {{ data.price - (data.price * data.discount / 100) }}
              </div>
            </span> <span :class="data.discount > 0 ? 'mr-n2' : ''" class=" text-grey1  irsa text-xxs">تومان</span>
          </div>

          <div v-else class="text-xs-2 font-weight-light ">
            رایگان

          </div>

        </div>
      </div>
      <v-expand-transition>
        <div v-show="show" class="rtl">
          <v-divider></v-divider>

          <v-card-text class="rtl text-xs-2">

            {{ data.description }}
          </v-card-text>


        </div>
      </v-expand-transition>

    </v-card>
  </div>
</template>
<script>
import { IconClockFilled } from '@tabler/icons-vue';
export default {
  props: ["data", "width", "detail", "color", "titleClass", "cardClass"],
  components: { IconClockFilled, },
  data: () => ({
    show: false,
  }),
  methods: {
    convertSeconds(inputMinute) {
      let totalSeconds = parseInt(inputMinute) * 60;
      let hours = Math.floor(totalSeconds / 3600);
      totalSeconds %= 3600;
      let minutes = Math.floor(totalSeconds / 60);
      let seconds = totalSeconds % 60;
      return `${hours}:${minutes}`
    }
  }
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