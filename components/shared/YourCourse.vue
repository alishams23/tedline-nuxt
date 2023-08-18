
<template>
    <v-card
   
     class=" bg-grey-lighten-4 rounded-xl " elevation="0">
  
           
            <v-row>
                
                <v-col cols="12"  sm="6"  class=" rtl text-black ">
                    <v-card
                    height="140"
                    width="100%"
                    rounded="0"
                 
                  >
                  <v-parallax 
                  width="100%"
                  src="/assets/images/feature-img.jpg"
                  
                  class=" "
                />
                    <v-row justify="center">
                      
                      <v-overlay
                        v-model="overlay"
                        :persistent="true"
                        contained

                        class="align-center justify-center font-weight-bold"
                      >
                      <v-progress-circular
                      :rotate="360"
                      :size="100"
                      :width="15"
                      
                      :model-value="value"
                      color="white"
                    >
                      {{ value }}
                    </v-progress-circular>
                      </v-overlay>
                    </v-row>
                  </v-card>
                   
                </v-col>
                <v-col cols="12" sm="6" class="rtl">
                    <div class="mt-6 px-10">
                        <h3 class="text-h5 irsa font-weight-black">دوره ی یک </h3>
                      
                        <div class="d-flex align-center mt-sm-10 mt-8">
                            <h6 class="text-subtitle-1 text-muted">
                                <v-icon icon="fa fa-dot-circle" class="mr-1" size="10" color="black"></v-icon> 2022
                            </h6>
                            <h6 class="irsa text-subtitle-1 text-muted pl-5">
                                <v-icon icon="fa fa-clock" class="mr-1" size="10" color="blue"></v-icon> ۹ ساعت
                            </h6>
                        </div>
                    </div>

                  
                </v-col>
            </v-row>
      
    </v-card>
</template>



<script >
import Course from '~/components/shared/Course.vue'
import axios from "axios";
import FooterComponent from "~/components/section/FooterComponent.vue";
import SuggestionCourses from "~/components/section/Courses.vue";


  export default {
 
    components:{
      Course,
  FooterComponent,
  SuggestionCourses

    },
    data: () => ({
        labels: ['series-1', 'series-2', 'series-3'],
        value:40,
        overlay:true,
        colors: [ 'black','black','#F9F9FD'],
        plotOptions: {
            pie: {
                startAngle: 0,
                endAngle: 360,
                donut: {
                    size: '75%',
                    background: 'transparent'
                }
            }
        },
        stroke: {
            show: false
        },
        
        dataLabels: {
            enabled: false
        },
        legend: {
            show: false
        },
        tooltip: { theme: "light", fillSeriesColor: false },
        Chart : [38, 40, 25]
      }),
    
  }
</script>

<style > .v-progress-circular__overlay { stroke-linecap: round; } </style>