<template>
    <div>


        <v-card :ripple="false" class=" d-flex border-card " rounded="xl" :aspect-ratio="1 / 2" color="grey5" elevation="0"
            :to="'/course/' + data.id">
            <v-row>
                <v-col cols="12" md="5">

                    <v-img :src="data.image"   class="ma-2 rounded-2lg "  height="150" cover>

                        <div class="h-100  w-100 d-flex     align-content-end">
                        <div class="mt-auto">
                            <div class=" shadow-custom  ma-2 rounded-xl rtl" :class="data.institute ? 'bg-blue-accent-4' : 'bg-auto'">
                            <div class=" rounded-xl rtl">
                            <div v-if="data.institute" class=" d-flex py-1 px-1 align-center">
                               
                                    <v-avatar size="27"   class="   text-nauto">
                                        <v-icon size="10" class="position-absolute  " icon="fad fa-users"></v-icon>
                                        <v-img :src="data.institute.image"  cover
                                            ></v-img>
                                    </v-avatar>
                            
                             <div class="d-flex flex-column justify-center pr-2 pl-2 ">
                                <v-list-item-title class=" font-weight-bold   text-white   text-xs-1 ">
                                    {{ data.institute.name }}

                                </v-list-item-title>
                                <div class="text-xs-2 mt-n1">
                                    {{   data.institute.username}}
                                </div>
                                
                             </div>
                            </div>
                            <div v-if="data.teacher && !data.institute" class=" d-flex py-1 px-1 align-center">
                          
                                    <v-avatar variant="tonal" color="auto" size="27" class=" rounded-2lg ma-0 pa-0 text-nauto">
                                        <v-icon size="10" class="position-absolute  " icon="fad fa-users"></v-icon>
                                        <v-img
                                            :src="`https://tedline.org/api/account/user_profile_image/${data.teacher.username}`"
                                            cover></v-img>
                                    </v-avatar>
                                    <div class="d-flex flex-column justify-center pr-2 pl-2 ">
                                <v-list-item-title class=" font-weight-bold  text-xs-2 ">
                                    {{ data.teacher.first_name }}  {{ data.teacher.last_name }}

                                </v-list-item-title>
                                <div class="text-xxs text-grey ">
                                    {{
                                    data.teacher.username
                                }}
                                </div>
                                    </div>
                            </div>
                        </div>
                          </div>
                        </div>

                        </div>
                    </v-img>
                </v-col>
                <v-col class="d-flex flex-column justify-space-between h-full pt-0">
                    <div class="px-4 pt-md-4">
                        <div
                        
                            class=" test-right text-body-2  rtl irsa   pt-1  line-height-sm  font-weight-medium font-weight-black-lg">
                            {{  data.title }}
                        </div>
                        <v-sheet  class="text-clamp-3 text-xs-1 overflow-hidden mt-2  font-weight-thin rtl" color="transparent">
                            {{ data.description }}
                        </v-sheet>
                       
                    </div>
                    <div class=" rtl px-4 pb-3">
                        <div class=" d-flex  flex-wrap align-center mt-3">
                            <BanknotesIcon class="mx-2 text-grey" style="height: 14px;width: 14px;" size="13" />

                            <div v-if="data.price != 0" class="d-flex align-center pl-5 pl-md-0 ">
                                <span v-if="data.discount == 0" class="pl-1 text-xs ">{{ data.price }}</span>
                                <span v-else>
                                    <div class=" text-xs-2  mb-n1">
                                        <span class="text-decoration-line-through"> {{ data.price }}</span>
                                        <span class="text-red  pl-1 text-sm font-weight-black">{{
                                            data.discount }}%</span>
                                    </div>
                                    <div class="text-xs">
                                        {{ data.price - (data.price * data.discount / 100) }}
                                    </div>
                                </span> <span :class="data.discount != 0 ? 'mb-n4 mr-n4' : ''"
                                    class="   irsa text-xxs">تومان</span>
                            </div>
                            <div v-else class="text-xs-2 pl-3 pl-md-0 font-weight-light ">
                                رایگان
                            </div>
                            <div class=" mx-4 py-2  bg-grey-lighten-1" style="padding-left: 0.5px;">
                            </div>
                          
                            <v-card rounded="lg"  color="grey" variant="tonal" class="rtl text-xs-2 font-weight-light px-2 d-flex align-center py-1 ">
                             
                                    <IconClockFilled class=" mb-1 text-blue" size="13" />
                               
                                <span class=" text-nauto px-2">
                                    {{ convertSeconds(data.duration) }}
                                </span>
                            </v-card>
                        </div>
                    </div>
                </v-col>
            </v-row>



        </v-card>



    </div>
</template>
<script>
import { IconClockFilled, IconCheck , } from '@tabler/icons-vue';
import { BanknotesIcon } from '@heroicons/vue/24/solid';

export default {
    props: ["data", "width",],
    components: { IconClockFilled, IconCheck ,BanknotesIcon},
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

.border-card{
    border: solid 0.5px rgba(112, 111, 111, 0.188);
}

.text-clamp-3 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  -webkit-line-clamp: 2; /* Limit to 3 lines */
  text-overflow: ellipsis; /* Add ellipsis (...) for overflow */
}
</style>