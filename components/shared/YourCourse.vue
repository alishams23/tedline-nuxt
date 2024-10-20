
<template>
    <v-card
    :to="progress == false && data.registered == false ? `/course/${data.id}`:`/course/learn/${data.id}/${data.session[0].id}`"
     class=" bg-grey4   rounded-xl " elevation="0">
            <v-row>
                <v-col cols="12"  sm="5"  class=" rtl text-black ">
                    <v-card
                    height="130"
                    color="transparent"
                    elevation="0"
                    width="100%"
                    rounded="0"
                    class=" rounded-xl rounded pt-3 pb-0 px-3 pa-sm-3"
                  >
                  <v-img 
                  cover
                  class="rounded-2lg"
                  :src="data.image"
                />   
                    <v-row justify="center" v-if="progress != false">
                      <v-overlay
                        v-model="overlay"
                        :persistent="true"
                       
                        contained
                        class="align-center justify-center mx-3 mt-3 ma-sm-3 rounded-2lg font-weight-bold"
                      >
                      <v-progress-circular
                      :rotate="360"
                      :size="80"
                      :width="15"
                      :model-value="value"
                    
                      color="auto"
                     
                    >
                      {{ value }}
                    </v-progress-circular>
                      </v-overlay>
                    </v-row>
                  </v-card>   
                </v-col>
                <v-col cols="12" sm="7" class="rtl pt-0 pt-md-3 ">
                    <div class="mt-0 mt-sm-6  px-6 px-md-10 ">
                        <h3 class=" text-md-1 text-md-body-1 line-height-sm  irsa font-weight-medium ">{{data.title}}</h3>
                        <div class="d-flex pb-5 align-center mt-4 mt-sm-10 ">
                            <h6 class="irsa text-xs text-muted font-weight-light pl-5">
                              <v-avatar color="auto" variant="tonal" class="ml-1 " size="20">
                                <IconClockFilled class="text-blue" size="10" />
            
                              </v-avatar>{{convertSeconds(data.duration)}} 
                            </h6>
                        </div>
                    </div>
                </v-col>
            </v-row>
    </v-card>
</template>



<script >
import axios from "axios";
import { IconClockFilled } from '@tabler/icons-vue';

  export default {
    components: { IconClockFilled, },
 props:["data","progress"],
    data: () => ({
        value:0,
        overlay:true,
      }),
      mounted(){
        this.value = this.data.progress_percent
      },

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

<style > .v-progress-circular__overlay { stroke-linecap: round; } </style>