<template>
  <div>

    <v-card class="    text-right" variant="text" :class="cardClass" :color="color ? color : 'auto'" elevation="0">
      <v-card :ripple="false" class=" pa-0  " color="transparent" elevation="0" :to="'/course/' + data.id">

        <div>
          <v-img class="  course-image-rounded  rounded-2lg text-auto  text-left" :aspect-ratio="1 / 1"
            :src="data.image" cover>

            <div class=" h-100  w-100  d-flex align-end">

              <div
              :class="detail == true ? '' : 'bg-gradient-glass2 pt-md-16 pt-10 px-5  py-1 py-md-2 ' "
                class="rounded-b-2lg rtl h-100 d-flex flex-column justify-end      w-100 text-white text-right">
        
            <div>
              <div class=" d-flex  flex-wrap align-center" :class="detail == true ? 'bg-glass-black px-4 py-3 ma-2 rounded-2lg' : '' ">
                  <div v-if="data.price != 0" class="d-flex align-center pl-5 mb-n1 pl-md-0 ">
                    <span v-if="data.discount == 0" class="pl-1  ">{{ data.price }}</span>
                    <span v-else>
                      <div class=" text-xs-2 text-white  mb-n1">
                        <span class="text-decoration-line-through"> {{ data.price }}</span>
                        <span class="text-red  pl-1 text-sm font-weight-black">{{ data.discount }}%</span>
                      </div>
                      <div class="text-xs">
                        {{ data.price - (data.price * data.discount / 100) }}
                      </div>
                    </span> <span :class="data.discount != 0 ? 'mb-n4 mr-n4' : ''"
                      class=" text-white  irsa text-xxs">تومان</span>
                  </div>
                  <div v-else class="text-xs-2 pl-3 pl-md-0 font-weight-light ">
                    رایگان
                  </div>
                  <div class=" mx-2 py-2 hidden-md-and-down bg-grey-lighten-1" style="padding-left: 0.5px;"></div>
                  <div class="rtl text-xs-2 font-weight-light  hidden-md-and-down">
                    <v-avatar color="auto" variant="tonal" class="ml-1 " size="20">
                      <IconClockFilled class="text-blue" size="10" />
                    </v-avatar>
                    {{ convertSeconds(data.duration) }}
                  </div>
                </div>
                <v-list-item v-if="detail != true && data.institute" class=" pb-0 px-0 pt-0">
                  <template v-slot:prepend>
                  
          
                    <v-avatar size="25" rounded="0" class="    text-nauto">
                      <v-icon size="10" class="position-absolute text-white " icon="fad fa-users"></v-icon>
                      <v-img :src="data.institute.image"  class="company-rounded-card"
                        cover content-class="ddd"></v-img>
                    </v-avatar>
          
                   

                  </template>
                  <v-list-item-title class=" font-weight-bold  text-xs-1 text-white">{{ data.institute.username
                    }}
                  </v-list-item-title>
                 
                </v-list-item>
                <v-list-item v-if="detail != true && data.teacher && !data.institute" class=" pb-0 px-0 pt-0">
                  <template v-slot:prepend>
                    <v-avatar variant="tonal" color="black" size="25" class=" rounded-2lg  text-nauto">
                      <v-icon size="10" class="position-absolute text-white " icon="fad fa-users"></v-icon>
                      <v-img :src="`https://tedline.org/api/account/user_profile_image/${data.teacher.username}`"
                        cover></v-img>
                    </v-avatar>
                  </template>
                  <v-list-item-title class=" font-weight-bold  text-xs-2 text-white">{{ data.teacher.username
                    }}
                  </v-list-item-title>
                </v-list-item>
            </div>
              </div>
            </div>
          </v-img>
        </div>
        <div :class="titleClass">
          <v-responsive >
            <div
              class=" test-right text-xs  text-nauto  rtl irsa px-3 pt-1  line-height-sm  font-weight-medium font-weight-black-lg">
              {{
                data.title }}
            </div>
            <div class="rtl text-xs font-weight-light  " v-if="detail != false">
          <v-list-item class="  px-0 pt-0" v-if="data.teacher ">
            <template v-slot:prepend>
              <v-avatar size="25" class=" rounded-2lg bg-blue text-nauto">
                <v-icon size="10" class="position-absolute text-white " icon="fad fa-users"></v-icon>
                <v-img :src="`https://tedline.org/api/account/user_profile_image/${data.teacher.username}`"
                  cover></v-img>

              </v-avatar>
            </template>
            <v-list-item-title class=" font-weight-bold  text-xs-2 text-nauto">{{ data.teacher.username
              }}
            </v-list-item-title>

          </v-list-item>

        </div>
          </v-responsive>
        </div>
        
      </v-card>


    </v-card>
  </div>
</template>
<script>
import { IconClockFilled,IconCheck } from '@tabler/icons-vue';

export default {
  props: ["data", "width", "detail", "color", "titleClass", "cardClass"],
  components: { IconClockFilled,IconCheck },
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
<style >
.test-n {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.course-image-rounded .v-img__img {
  border-radius: 21px;
}

.company-rounded-card .v-img__img {
  border-radius:5px !important;
  
}
</style>