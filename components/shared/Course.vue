<template>
   <div> <v-card
    color="white"

    :class="['ma-4', selectedClass]"
    
    class="rounded-xl shadow-2 mb-16 mt-16"
    width="240"

    @click="toggle"
  >
  <v-card class="pb-5"  rounded="xl" elevation="0" :to="'/course/'+data.id">
    <v-img
    class="align-end text-white rounded-xl"
    height="240"
    
    :src="data.image"
    cover
  >
  <v-btn  class=" bg-glass text-white mx-3 my-3 shadow-2  " rounded>
    <div v-if="data.price != 0">
        {{ data.price }}  <span class="  ps-3 irsa" >تومان</span>
    </div>
    <div v-else>
        رایگان
    </div>
  </v-btn>
  </v-img>
  <v-card-title   class=" text-body-1 font-bold rtl irsa  font-weight-black">{{data.title}}</v-card-title>

</v-card>
    <v-card-actions>
        <v-btn
          :icon="show ? 'fal fa-chevron-up' : 'fal fa-chevron-down'"
          @click="show = !show"
          size="small"
        ></v-btn>
        <v-spacer></v-spacer>
        <div class="rtl text-xs px-3 ">
          <v-icon color="blue" class="px-3 " :size="13">
            fa fa-clock
          </v-icon>
        {{ data.duration }} 
        ساعت
         
        </div>
      </v-card-actions>
    <v-expand-transition>
        <div v-show="show">
          <v-divider></v-divider>
          <v-card-text class="rtl">
          {{ data.description }}
          </v-card-text>
        </div>
      </v-expand-transition>
      
  </v-card></div>
</template>
  <script>
    export default {
        props:["data"],
      data: () => ({
        show: false,
      }),
    }
  </script>