<template>
  <v-locale-provider rtl>
    <v-card elevation="0" color="transparent" class="mt-5 ">
      
      <v-tabs   v-model="tab"  class="border-b "  elevation="0" 
        >
  
          <v-tab color="blue" class="   transition-inactive-class px-10 rounded-t-lg text-xs"  variant="text" value="one"><div :class="tab == 'one'?'text-nauto' : 'text-grey1'">
            به اتمام رسیده
            <v-icon  :color="tab == 'one'?'blue' : 'grey1'" size="15" class="ps-5">{{tab == 'one' ? 'fad' : 'fa'}} fa-check</v-icon>
        
          </div></v-tab>
          <v-tab color="blue" class="   transition-inactive-class px-10 rounded-t-lg text-xs " variant="text" value="two">
            <div :class="tab == 'two'?'text-nauto' : 'text-grey1'">
                در حال برگزاری
            <v-icon :color="tab == 'two'?'blue' : 'grey1'" size="15" class="ps-5">{{tab == 'two' ? 'fad' : 'fa'}} fa-list</v-icon>
  
            </div>
          </v-tab>
      
      </v-tabs>
      <v-card-text>
        <v-window v-model="tab">
            <v-window-item value="one">
                <div class="my-10" v-for="item in dataFinished" :key="item.id+'unfinished'">
                  <YourCourseComponents :progress="false" :data="item"  />
                </div>
                <v-alert v-if="loadingFinished == false && dataFinished.length == 0"  icon="fa fa-info" variant="text" color="blue" class="bg-grey5 rtl border-opacity-100  my-10" border="start">
                  <div class="pb-3 text-body-1 font-weight-black irsa">
                    دوره ای وجود ندارد
                  </div>
                  <div class="text-body-2 irsa">
                  هیچ دوره ای به پایان نرسیده است
                  </div>
                </v-alert>
                <div class="d-flex justify-center">
                  <v-progress-circular v-if="loadingFinished" :size="55" class="ma-10" bg-color="grey4" :width="5" color="blue"
                    indeterminate></v-progress-circular>
                </div>
              </v-window-item>
          <v-window-item value="two">
            <div class="my-10" v-for="item in data" :key="item.id+'unfinished'">
              <YourCourseComponents :progress="false"  :data="item" />
            </div>
            <v-alert  v-if="loadingUnfinished == false && data.length == 0" icon="fa fa-info" variant="text" color="blue" class="rtl bg-grey5  border-opacity-100  my-10" border="start">
              <div class="pb-3 text-body-1 font-weight-black irsa">
                دوره ای وجود ندارد
              </div>
              <div class="text-body-2 irsa" >
              هیچ دوره ای در حال برگزاری نیست
              </div>
            </v-alert>
            <div class="d-flex justify-center">
              <v-progress-circular v-if="loadingUnfinished" :size="55" class="ma-10" bg-color="grey4" :width="5" color="blue"
                indeterminate></v-progress-circular>
                
            </div>
          </v-window-item>
       
        </v-window>
      </v-card-text>
    </v-card>
  </v-locale-provider>
  </template>
  
  
  <script >
  import axios from "axios";
  import YourCourseComponents from "~/components/shared/YourCourse.vue";
  
  
  export default {
  props:['username',],
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
        await axios.get(`https://tedline.org/api/course/TeacherUnfinishedCourse/${this.username}/`, {
          headers: {
            "Content-type": "application/json",
            Accept: "application/json",
            Authorization: this.$store.state.token != ''
                        ? `Token ${this.$store.state.token}`
                        : ''
          },
        }).then((response) => {
          this.data = response.data
          this.loadingUnfinished = false
        }
        )
      },
      async getDataFinished() {
        await axios.get(`https://tedline.org/api/course/TeacherFinishedCourse/${this.username}/`, {
          headers: {
            "Content-type": "application/json",
            Accept: "application/json",
            Authorization: this.$store.state.token != ''
                        ? `Token ${this.$store.state.token}`
                        : ''
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