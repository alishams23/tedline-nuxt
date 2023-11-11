<template>
    <v-container>
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
                    <v-icon color="white"> fad fa-info</v-icon>
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
                <div class="rtl pa-5 border bg-grey-lighten-4 rounded-lg mx-2 my-10">
                    {{ data.description }}
                </div>
            </div>
            <v-expansion-panels v-model="panel" multiple class=" rounded-lg ">
                <v-expansion-panel active v-for="(boxes, index) in data.boxes" elevation="0" class="">
                    <v-expansion-panel-title  class="rtl font-weight-bold" expand-icon="fal fa-chevron-left" collapse-icon="fal fa-chevron-up">{{boxes.title}}</v-expansion-panel-title>
                    <v-expansion-panel-text>
                        <v-list lines="two">
                            <div v-for="box in boxes.box" :key="box.title">
                               <box v-if="box.file" :read="box.is_finished" title="فایل" color="amber" icon="fa-file" :to="'/course/learn/'+ $route.params.id +'/'+ $route.params.session + '/' + box.file+ '/files'" />    
                               <box v-if="box.video" :read="box.is_finished" title="ویدئو" color="blue" icon="fa-video" :to="'/course/learn/'+ $route.params.id +'/'+ $route.params.session + '/' + box.video+ '/video'" />    
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
            axios.get(`http://127.0.0.1:8000/api/course/RetrieveSession/${this.$route.params.session}/`,{
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
    background-color: white !important;
}
</style>