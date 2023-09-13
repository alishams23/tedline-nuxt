<template>
  <v-card elevation="0" class="mt-5 ">
    <v-tabs v-if="variant != 'flat'" v-model="tab" align-tabs="center" elevation="0" slider-color="transparent" color="blue-darken-1"
      density="comfortable">
      <div class=" rounded-pill bg-grey-lighten-4 ">
        <v-tab class="bg-transparent px-md-16 px-10 rounded-pill " variant="flat" value="one">در حال یادگیری</v-tab>
        <v-tab class="bg-transparent   px-md-16 px-10  rounded-pill " variant="flat" value="two">به اتمام
          رسیده</v-tab>
      </div>
    </v-tabs>
    <v-tabs fixed-tabs v-if="variant == 'flat'" v-model="tab"  class="border-b rtl"  elevation="0" 
      >

        <v-tab color="blue" class=""  variant="text" value="one"><div :class="tab == 'one'?'text-black' : 'text-grey'">
          در حال یادگیری

          <v-icon  :color="tab == 'one'?'blue' : 'grey'" size="15" class="ps-5">{{tab == 'one' ? 'fad' : 'fa'}} fa-list</v-icon>
      
        </div></v-tab>
        <v-tab color="blue" class="" variant="text" value="two">
          <div :class="tab == 'two'?'text-black' : 'text-grey'">
            به اتمام
          رسیده
          <v-icon :color="tab == 'two'?'blue' : 'grey'" size="15" class="ps-5">{{tab == 'two' ? 'fad' : 'fa'}} fa-check</v-icon>

          </div>
        </v-tab>
    
    </v-tabs>
    <v-card-text>
      <v-window v-model="tab">
        <v-window-item value="one">
          <div class="my-10" v-for="item in data" :key="item.id+'unfinished'">
            <YourCourseComponents :progress="progress"  :data="item" />
          </div>
          <v-alert  v-if="loadingUnfinished == false && data.length == 0" icon="fa fa-info" variant="text" color="blue" class="rtl bg-grey-lighten-5  border-opacity-100  my-10" border="start">
            <div class="pb-3 text-body-1 font-weight-black irsa">
              دوره ای وجود ندارد
            </div>
            <div class="text-body-2 irsa" >
              شما هیچ دوره ای برای یادگیری ندارید
            </div>
          </v-alert>
          <div class="d-flex justify-center">
            <v-progress-circular v-if="loadingUnfinished" :size="60" class="ma-10" :width="10" color="blue"
              indeterminate></v-progress-circular>
              
          </div>
        </v-window-item>
        <v-window-item value="two">
          <div class="my-10" v-for="item in dataFinished" :key="item.id+'unfinished'">
            <YourCourseComponents :progress="progress" :data="item"  />
          </div>
          <v-alert v-if="loadingFinished == false && dataFinished.length == 0"  icon="fa fa-info" variant="text" color="blue" class="bg-grey-lighten-5 rtl border-opacity-100  my-10" border="start">
            <div class="pb-3 text-body-1 font-weight-black irsa">
              دوره ای وجود ندارد
            </div>
            <div class="text-body-2 irsa">
              شما هیچ دوره های را به اتمام نرسانده اید
            </div>
          </v-alert>
          <div class="d-flex justify-center">
            <v-progress-circular v-if="loadingFinished" :size="60" class="ma-10" :width="10" color="blue"
              indeterminate></v-progress-circular>
          </div>
        </v-window-item>
      </v-window>
    </v-card-text>
  </v-card>
</template>


<script >
import axios from "axios";
import YourCourseComponents from "~/components/shared/YourCourse.vue";


export default {
props:['username','progress','variant'],
  components: {
    YourCourseComponents,
  },
  data: () => ({
    model: null,
    data: [],
    dataFinished:[],
    tab: null,
    loadingUnfinished: true,
    loadingFinished: true
  }),
  methods: {
    async getData() {
      await axios.get(`https://tedline.org/api/course/UnfinishedCourse/${this.username}/`, {
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
          Authorization: `Token ${this.$store.state.token}`,
        },
      }).then((response) => {
        this.data = response.data
        this.loadingUnfinished = false
      }
      )
    },
    async getDataFinished() {
      await axios.get(`https://tedline.org/api/course/FinishedCourse/${this.username}/`, {
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
          Authorization: `Token ${this.$store.state.token}`,
        },
      }).then((response) => {
        this.dataFinished = response.data
        this.loadingFinished = false
      }
      )
    }
  }, async mounted() {
    if (this.$store.state.isAuthenticated == null) await this.$store.commit('onStart');
    await this.getData()
    await this.getDataFinished()
  }

}
</script>