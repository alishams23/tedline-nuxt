<template>
    <v-container >
        <div class="d-flex justify-center mx-10">
            <v-progress-linear
            v-if="loading"
            color="blue-accent-4"
            indeterminate
            rounded
            height="6"
          ></v-progress-linear>
          </div>

          
        <div v-if="data">

            <div class="rtl text-right px-3 text-h6 irsa font-weight-bold mb-3   d-flex align-center">
                <v-avatar size="x-large" rounded="lg" color="blue">
                    <v-icon color="auto"> fad fa-info</v-icon>
                </v-avatar>
                <div class="px-2">
                    <div>
                        {{ data.title }}
                    </div>
                    <!-- <div class=" font-weight-light text-body-2 irsa ">
                        هفته ی اول
                    </div> -->
                </div>
            </div>
            <div>
                <div class="rtl pa-5 border bg-grey4 text-xs rounded-lg mx-2 my-10">
                    {{ data.description }}
                </div>
            </div>
            
            <v-alert v-for="item in data.alerts"  rounded="lg" icon="fa fa-info" variant="tonal"  :type="item.status == 'w' ? 'orange' : 'red'" class=" rtl border-opacity-100 mx-2 my-10" border="start">
                  <div class="pb-3 text-body-1 font-weight-black irsa">
                  {{item.title}}
                  </div>
                  <div class="text-body-2 irsa">
                    {{item .body}}
                  </div>
                </v-alert>
            <v-expansion-panels  v-model="panel" multiple class="bg-auto  rounded-lg ">
                <v-expansion-panel active v-for="(boxes, index) in data.boxes" elevation="0" class="bg-auto ">
                    <v-expansion-panel-title color="auto" class="rtl bg-auto  font-weight-bold" expand-icon="fal  fa-chevron-left" collapse-icon="fal fa-chevron-up">{{boxes.title}}</v-expansion-panel-title>
                    <v-expansion-panel-text class="bg-auto ">
                        <v-list lines="two" class="bg-auto ">
                            <div v-for="box in boxes.box" :key="box.title">
                               <box v-if="box.file" :read="box.is_finished" :title="box.title ? box.title :'فایل'" :disable="box.is_locked == true && data.is_signed == false " color="amber" icon="fa-file" :to="'/course/learn/'+ $route.params.id +'/'+ $route.params.session + '/' + box.file+ '/files'" />    
                               <box v-if="box.video" :read="box.is_finished" :title="box.title ? box.title :'ویدئو'" :disable="box.is_locked == true && data.is_signed == false " color="blue" icon="fa-video" :to="'/course/learn/'+ $route.params.id +'/'+ $route.params.session + '/' + box.id+ '/video'" />    
                               <box v-if="box.audio" :read="box.is_finished" :title="box.title ? box.title :'صوت'" :disable="box.is_locked == true && data.is_signed == false " color="green" icon="fa-volume" :to="'/course/learn/'+ $route.params.id +'/'+ $route.params.session + '/' + box.id+ '/audio'" />    
                            </div>
                        </v-list>
                    </v-expansion-panel-text>
                </v-expansion-panel>
            </v-expansion-panels>
        </div>
    </v-container>
</template>




<script >
import box from "~/components/shared/box.vue";
import axios from "axios";


export default {
    setup() {
        definePageMeta({
            layout: "learn-dashboard",
        })
    },
components:{box},
    data: () => ({
        model: null,
        data: null,
        panel: [],
        loading:true,
    }),
    methods: {
        getData() {
            axios.get(`https://tedline.org/api/course/RetrieveSession/${this.$route.params.session}/`,{
            headers: {
              "Content-type": "application/json",
              Accept: "application/json",
              Authorization: this.$store.state.token != ''
                ? `Token ${this.$store.state.token}`
                : ''
            },
          }).then((response) => {
              this.loading = false
                this.data = response.data
                let index = 0
                this.data.boxes.forEach(element => {
                    this.panel.push(index)
                    index ++
                });
            }
            )
        }
    },async mounted() {
     await this.$store.commit('onStart') // get token
      this.getData()
    }
}
</script>
<style >
.v-expansion-panel-title__overlay {
    background-color: transparent !important;
}
</style>