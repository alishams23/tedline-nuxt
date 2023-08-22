<template>
  <div >

    <v-card color="white" :class="['ma-1', selectedClass]" class="rounded-xl shadow-2 " @click="toggle">
      <v-card class=""  elevation="0" :to="'/course/' + data.id">
       
         <div class="responsive-image ">
          <v-img class=" align-end text-white " height="100%" width="100%" :src="data.image" cover>
            <v-btn  class="bg-glass text-white text-body-2 mx-3 my-3 shadow-2  " rounded>
              <div v-if="data.price != 0">
                {{ data.price }} <span class="  ps-1 irsa">تومان</span>
              </div>
              <div v-else>
                رایگان
              </div>
            </v-btn>
          </v-img>
         </div>
     
        <v-responsive height="70" >
          <div class=" test-n text-body-2 text-lg-body-1  rtl irsa px-3 pt-2 line-height-md  font-weight-black">{{ data.title }}
          </div>
        </v-responsive>
      </v-card>
      <v-card-actions>
        <v-btn :icon="show ? 'fal fa-chevron-up' : 'fal fa-chevron-down'" @click="show = !show" size="small"></v-btn>
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
  props: ["data","width"],
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