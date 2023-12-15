<template>
  
  <!-- <Navbar :transparent="false" /> -->
  <v-app-bar elevation="0" color="#0f1931" v-if="loading" height="35">
    <v-progress-linear
    color="white"
    indeterminate
    height="3"
  ></v-progress-linear>
  </v-app-bar>

  <v-snackbar v-model="snackbar" class="rtl" color="blue-darken-4" elevation="24" rounded="lg">
    <template v-slot:actions>
      <v-btn color="white" variant="text" icon="fal fa-times" @click="snackbar = false">
      </v-btn>
    </template>
    کپی شد
  </v-snackbar>
 <div class=" curved text-white rounded-b-xl mx-md-16">
  <v-container >
    <v-row align="center" class=" mx-10 mb-5 mt-2">
      <v-col class="d-flex justify-center justify-md-end rtl"  cols="12" md="6">
       <div>
        <v-avatar   class="text-h5 shadow-1 bg-white"   size="110" >
          
          <v-icon color="black" class=" position-absolute" >
            fad fa-user
          </v-icon>
          <v-img :src="`https://tedline.org/api/account/user_profile_image/${$route.params.username}`" cover></v-img>
        </v-avatar>
        <div class="mt-n10 ">
          <v-menu elevation="0" >
            <template v-slot:activator="{ props }">
              <v-btn size="small" class="shadow-2  bg-glass-white"     v-bind="props" icon="far  fa-ellipsis-v"  variant="flat"></v-btn>
            </template>
            <v-list elevation="0" class="shadow-2 py-0" rounded="lg">
              <v-list-item @click="shareLink">
                <v-list-item-title class=" font-weight-bold px-5 text-body-2 irsa" >به اشتراک گذاری</v-list-item-title>
                <template v-slot:prepend>
                  <v-avatar class="text-blue " icon="" size="20" rounded="0">
                    <v-icon size="15">
                      fa fa-external-link
                    </v-icon>
                  </v-avatar>
                </template>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
       </div>
       
      </v-col>
      <v-col class="rtl  d-flex   justify-center justify-md-start" cols="12" md="6">
     

        <div class=" d-flex flex-column align-center align-md-start">
          <h3 class="text-h5  font-weight-black irsa">
            {{ $route.params.username }}
          </h3>
          <v-list-item-subtitle v-if="data">{{data.get_full_name}}</v-list-item-subtitle>
        </div>
      </v-col>
    </v-row>
  </v-container>
  <v-sheet height="40" elevation="0"  class=" hidden-md-and-up rounded-t-xl  w-100 " style="border:1px solid  white">

    <div class="d-flex justify-center">
      <v-sheet width="100" height="6" rounded="pill" class="mt-3" color="grey-lighten-3"></v-sheet>
    </div>
  </v-sheet>

 </div>
  <v-container class="mt-0 mt-md-5">
    
   
    <div class="text-right rtl mb-10 px-5 " v-if="data && data.bio">
        {{ data.bio }}
    </div>
    <v-row v-if="loading == false"  class="d-flex flex-row-reverse justify-md-start justify-center mx-1  flex-wrap align-stretch">
        <v-col cols="6" md="4" lg="2" class="pa-1 " v-if="data.status == 's'">
          <v-sheet  class="align-center rounded-pill bg-blue  d-flex justify-space-between pa-2 pe-3">
            <v-avatar variant="tonal" class=" " color="white" size="38">
             <v-icon size="15">
              fad fa-list
             </v-icon>
            </v-avatar>
            <div class="rtl">
              <p class=" font-weight-bold text-xs">دوره  تمام نشده </p>
              <p class="text-xs irsa ">{{data.unfinished_course}} دوره</p>
             </div>
          </v-sheet>
        </v-col>
        <v-col cols="6" md="4" lg="2" class="pa-1" v-if="data.status == 's'" >
          <v-sheet  class="align-center rounded-pill bg-blue-grey-darken-4  d-flex justify-space-between  pa-2 pe-3">
            <v-avatar variant="tonal"  class=" " color="white" size="38">
             <v-icon size="15">
              fad fa-check
             </v-icon>
            </v-avatar>
            <div class="rtl">
              <p class=" font-weight-bold text-xs">دوره  تمام شده </p>
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
    <div class="mt-16"></div>
    <YourCourses v-if="loading == false && data.status == 's'" :progress="false" variant="flat" :username="$route.params.username"  />
    <TeacherCourses v-if="loading == false && data.status == 't'" :username="$route.params.username"  />
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

<style scoped>



@media (max-width: 767px) {
  .curved {
    background-color: #060f21;

    background-image:radial-gradient(ellipse 100% 100% at -20% 20%, #0b1630 89.9%, #ffffff00 90%),radial-gradient(ellipse 100% 60% at 30% 100%, #15233f 89.9%, #00000000 90%);
    
  }
}
@media (min-width: 767px) {

  .curved {
    background-color: #0f1931;

    background-image:radial-gradient(ellipse 50% 200% at 80% 0%, #15233f 89.9%, #00000000 90%), radial-gradient(ellipse 100% 90% at 20% 7%, #0f1931 89.9%, #ffffff00 90%);
    
  }
}

</style>