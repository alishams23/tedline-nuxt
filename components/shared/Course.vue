<template>
  <div>

    <v-card  class=" rounded-xl   text-right" :class="cardClass" :color="color ? color : 'auto'" rounded="xl"
      elevation="0">
      <v-card :ripple="false" class=" pa-0  rounded-2lg " color="transparent" elevation="0" :to="'/course/' + data.id">

        <div>
          <v-img class=" align-end rounded-2lg  text-auto  text-left" :aspect-ratio="1 / 1" :src="data.image" cover>

            <div class="h-100  w-100 rounded-xl d-flex align-end">
              
              <div class="bg-gradient-glass2 rtl h-100 d-flex flex-column justify-end   pt-md-16 py-3 py-md-5  px-5  w-100 text-white text-right">
              
             
               
               <div class="d-flex">
                <v-list-item v-if="detail != true && data.teacher" class="  px-0" >
                  <template v-slot:prepend>
                    <v-avatar variant="tonal" color="black" size="25" class=" rounded-2lg  text-nauto">
                      <v-icon size="10" class="position-absolute text-white " icon="fad fa-users"></v-icon>
                      <v-img :src="`https://tedline.org/api/account/user_profile_image/${data.teacher.username}`" cover></v-img>
      
                    </v-avatar>
                  </template>
                  <v-list-item-title class=" font-weight-bold  text-xs-2 text-white">{{ data.teacher.username
                  }}
                  </v-list-item-title>
      
                </v-list-item>
               </div>
               <div class=" d-flex  flex-wrap align-center">
                <div v-if="data.price != 0" class="d-flex align-center pl-5 pl-md-0 ">
                  <span v-if="data.discount == 0" class="pl-1">{{ data.price }}</span> 
                  <span v-else  >
                      
                      <div class=" text-xs-2 text-grey1  mb-n1">
                      <span class="text-decoration-line-through">  {{ data.price }}</span>
                      <span class="text-red  pl-1 text-sm font-weight-black">{{data.discount}}%</span>
                      </div>
                      <div class="text-xs">
                        {{ data.price - (data.price * data.discount / 100) }}
                      </div>
                  </span> <span :class="data.discount != 0 ? 'mb-n4 mr-n4': '' " class=" text-grey1  irsa text-xxs">تومان</span>
                </div>
  
                <div v-else class="text-xs-2 pl-3 pl-md-0 font-weight-light ">
                  رایگان
  
                </div>
            <div class=" mx-2 py-2 hidden-md-and-down bg-grey-lighten-1" style="padding-left: 0.5px;"></div>


                <div class="rtl text-xs-2 font-weight-light  ">
                  <v-avatar color="auto" variant="tonal" class="ml-1 " size="20">
                    <IconClockFilled class="text-blue" size="10" />

                  </v-avatar>
                  {{ convertSeconds(data.duration) }}
                  

                </div>
               </div>
              </div>
            </div>
          </v-img>
        </div>

        <div :class="titleClass">
          <v-responsive height="55">
            <div
              class=" test-right text-xs   rtl irsa px-3 pt-1  line-height-sm  font-weight-medium font-weight-black-lg">{{
                data.title }}
            </div>
          </v-responsive>
        </div>
      </v-card>
      <v-card-actions class=" pb-0 pt-0 ma-0" v-if="detail != false">


        <v-icon @click="show = !show" class="px-3" size="15">
          {{ show ? 'fal fa-chevron-up' : 'fal fa-chevron-down' }}
        </v-icon>

        <v-spacer></v-spacer>
        <div class="rtl text-xs font-weight-light  ">
          <v-list-item class="  px-0" v-if="data.teacher">
            <template v-slot:prepend>
              <v-avatar size="25" class=" rounded-2lg bg-blue text-nauto">
                <v-icon size="10" class="position-absolute text-white " icon="fad fa-users"></v-icon>
                <v-img :src="`https://tedline.org/api/account/user_profile_image/${data.teacher.username}`" cover></v-img>

              </v-avatar>
            </template>
            <v-list-item-title class=" font-weight-bold  text-xs-2 text-nauto">{{ data.teacher.username
            }}
            </v-list-item-title>

          </v-list-item>

        </div>
      </v-card-actions>
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