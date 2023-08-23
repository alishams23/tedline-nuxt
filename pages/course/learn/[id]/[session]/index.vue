<template>
    <v-container>
        <div v-if="data">
            <div class="rtl text-right px-3 text-h6 irsa font-weight-bold mb-3   d-flex">
               
                <v-avatar size="x-large" rounded="lg" color="blue">
                    <v-icon color="white"> fad fa-info</v-icon>
                </v-avatar>
                <div class="px-2">
                    <div>
                        {{ data.title }}
                    </div>
                    <div class=" font-weight-light text-body-2 irsa ">
                        هفته ی اول
                    </div>
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
                             
                               <box v-if="box.video" title="فایل" color="amber" icon="fa-file" />    
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
        data: {},
        panel: [0],
    


    }),
    methods: {
        getData() {
            axios.get(`https://tedline.org/api/course/RetrieveSession/${this.$route.params.session}/`).then((response) => {
                this.data = response.data
                this.loading = false
            }
            )
        }
    }, mounted() {
        this.getData()
    }
}
</script>
<style >
.v-expansion-panel-title__overlay {
    background-color: white !important;
}
</style>