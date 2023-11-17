<template>
  
  <Navbar />
  <v-app-bar elevation="0" height="35">
    <v-progress-linear
    v-if="loading"
    color="blue-accent-4"
    indeterminate

    
    height="2"
  ></v-progress-linear>
  </v-app-bar>

  <v-snackbar v-model="snackbar" class="rtl" color="blue-darken-4" elevation="24" rounded="lg">
    <template v-slot:actions>
      <v-btn color="white" variant="text" icon="fal fa-times" @click="snackbar = false">
      </v-btn>
    </template>
    کپی شد
  </v-snackbar>
  <v-container >
    
    <v-row align="center" class=" mx-10">
      <v-col class="d-flex justify-center justify-md-end rtl"  cols="12" md="6">
       <div>
        <v-avatar   class="text-h5" variant="tonal" color="blue" size="120" >
          
          <v-icon class=" position-absolute" >
            fad fa-user
          </v-icon>
          <v-img :src="`https://tedline.org/api/account/user_profile_image/${$route.params.username}`" cover></v-img>
        </v-avatar>
        <div class="mt-n10 ">
          <v-menu elevation="0" location="start">
            <template v-slot:activator="{ props }">
              <v-btn size="small" class="shadow-2" color="white" v-bind="props" icon="far  fa-ellipsis-v"  variant="flat"></v-btn>
            </template>
            <v-list elevation="0" class="shadow-2" rounded="lg">
              <v-list-item @click="shareLink">
                <v-list-item-title class=" font-weight-bold px-5 text-body-2 irsa" >به اشتراک گذاری</v-list-item-title>
                <template v-slot:prepend>
                  <v-avatar class="text-blue text-xs" icon="fad fa-external-link" size="25" rounded="0"></v-avatar>
                </template>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
       </div>
       
      </v-col>
      <v-col class="rtl  d-flex mb-5  justify-center justify-md-start" cols="12" md="6">
     

        <div class=" d-flex flex-column align-center align-md-start">
          <h3 class="text-h5  font-weight-black irsa">
            {{ $route.params.username }}
          </h3>
          <v-list-item-subtitle v-if="data">{{data.get_full_name}}</v-list-item-subtitle>
        </div>
      </v-col>
    </v-row>
    <div class="text-right rtl my-10 px-5 " v-if="data">
        {{ data.bio }}
    </div>
    <v-row v-if="loading == false"  class="d-flex flex-row-reverse justify-md-start justify-center  mt-lg-16 flex-wrap align-stretch">
        <v-col cols="6" md="2" class="pa-1 " v-if="data.status == 's'">
          <v-sheet  class="align-center rounded-pill bg-blue  d-flex justify-space-between pa-2 pe-3">
            <v-avatar variant="tonal" class=" " color="white" size="38">
             <v-icon size="15">
              fad fa-list
             </v-icon>
            </v-avatar>
            <div class="rtl">
              <p class=" font-weight-bold text-xs">دوره های تمام نشده </p>
              <p class="text-xs irsa ">{{data.unfinished_course}} دوره</p>
             </div>
          </v-sheet>
        </v-col>
        <v-col cols="6" md="2" class="pa-1" v-if="data.status == 's'" >
          <v-sheet  class="align-center rounded-pill bg-blue-grey-darken-4  d-flex justify-space-between  pa-2 pe-3">
            <v-avatar variant="tonal"  class=" " color="white" size="38">
             <v-icon size="15">
              fad fa-check
             </v-icon>
            </v-avatar>
            <div class="rtl">
              <p class=" font-weight-bold text-xs">دوره های تمام شده </p>
              <p class="text-xs irsa ">{{data.finished_course}} دوره</p>
             </div>
          </v-sheet>
        </v-col>
        <v-col cols="6" md="2" class="pa-1" v-if="data.status == 't'" >
          <v-sheet  class="align-center rounded-pill bg-blue  d-flex justify-space-between  pa-2 pe-3">
            <v-avatar variant="tonal"  class=" " color="white" size="38">
             <v-icon size="15">
              fad fa-chalkboard-teacher
             </v-icon>
            </v-avatar>
            <div class="rtl">
              <p class=" font-weight-bold text-sm font-weight-black">مدرس </p>
          
             </div>
          </v-sheet>
        </v-col>
    </v-row>
    <YourCourses v-if="loading == false && data.status == 's'" :progress="false" variant="flat" :username="$route.params.username" class="mt-16 " />
    <TeacherCourses v-if="loading == false && data.status == 't'" :username="$route.params.username" class="mt-16 " />
  </v-container>


</template>
<script>
import axios from "axios";

import YourCourses from "~/components/section/YourCourses.vue";
import TeacherCourses from "~/components/section/TeacherCourses.vue";

export default {

  data(){
    return{
      snackbar :false,
      data:null,
      loading:true,
    }
  },
  setup() {
    definePageMeta({
      layout: "dashboard",
    })
  },
  methods:{
    copyToClipboard(textToCopy) {
      // navigator clipboard api needs a secure context (https)
      if (navigator.clipboard && window.isSecureContext) {
        // navigator clipboard api method'
        return navigator.clipboard.writeText(textToCopy);
      } else {
        // text area method
        let textArea = document.createElement("textarea");
        textArea.value = textToCopy;
        // make the textarea out of viewport
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        textArea.style.top = "-999999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        return new Promise((res, rej) => {
          // here the magic happens
          document.execCommand("copy") ? res() : rej();
          textArea.remove();
        });
      }
    },
    shareLink() {
      this.copyToClipboard(`https://tedline.org/profile/${this.$route.params.username}/`)
      this.snackbar = true
    },
    getData() {
      axios.get(`https://tedline.org/api/account/RetrieveUser/${this.$route.params.username}/`).then((response) => {
        this.data = response.data
        this.loading = false
      }
      )
    },
    
  },
  mounted(){
    this.getData()
  },
  components: {

    YourCourses,
    TeacherCourses

  },
}
</script>