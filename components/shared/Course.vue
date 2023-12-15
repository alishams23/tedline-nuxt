<template>
  <div>

    <v-card class=" rounded-xl   text-right" :color="color ? color : 'white'" rounded="xl" elevation="0" >
      <v-card  :ripple="false" class=" pa-0  " color="transparent"  elevation="0" :to="'/course/' + data.id">

        <div >
          <v-img class=" align-end rounded-t-xl rounded-e-xl text-white text-left" :aspect-ratio="1 / 1" :src="data.image" cover>
           <div class="d-flex">
            <div  :class="color? 'bg-' + color : 'bg-white'"  class="  text-xs   mb-n1 pl-10 pr-4 py-2 font-weight-medium      rounded-tr-xl " >
              
            
              <div v-if="data.price != 0">
                {{ data.price }} <span class="  text-grey irsa text-xxs">تومان</span>
              </div>
              
              <div v-else class="text-xs-2" >
                رایگان
              
              </div>
            </div>
           </div>
          </v-img>
        </div>

        <v-responsive height="60">
          <div class=" test-right text-xs   rtl irsa px-3 pt-2  line-height-sm  font-weight-medium font-weight-black-lg">{{
            data.title }}
          </div>
        </v-responsive>
      </v-card>
      <v-card-actions class=" pb-0 "  v-if="detail!= false">


        <v-icon @click="show = !show" class="px-3" size="17">
          {{ show ? 'fal fa-chevron-up' : 'fal fa-chevron-down' }}
        </v-icon>

        <v-spacer></v-spacer>
        <div class="rtl text-xs font-weight-light  ">
          <v-icon color="blue" class="px-3 " :size="13">
            fa fa-clock
          </v-icon>
          {{ data.duration }}
          دقیقه

        </div>
      </v-card-actions>
      <v-expand-transition >
        <div v-show="show" class="rtl">
          <v-divider></v-divider>

          <v-card-text class="rtl text-xs-2" >

            {{ data.description }}
          </v-card-text>


        </div>
      </v-expand-transition>

    </v-card>
  </div>
</template>
<script>
export default {
  props: ["data", "width","detail","color"],
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