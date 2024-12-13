<template>
  <!-- <Navbar :transparent="false" /> -->
  <Navbar :shadow="true" />
  <Head>
        <Title v-if="loading==false">{{ data.get_full_name }} | پروفایل</Title>
        <Title v-else>{{ $route.params.username }} | پروفایل</Title>
      
     </Head>

  <v-snackbar v-model="snackbar" class="rtl" color="blue-accent-4" elevation="24" rounded="lg">
    <template v-slot:actions>
      <v-btn color="white" variant="text" icon="fal fa-times" @click="snackbar = false">
      </v-btn>
    </template>
    کپی شد
  </v-snackbar>
  <div class=" curved text-auto custom-rounded-md    mx-md-16">
    <v-progress-linear color="auto" v-if="loading" indeterminate height="3"></v-progress-linear>
    <v-container>
      <v-row align="center" class=" mx-10  mt-2">
        <v-col class="d-flex justify-center justify-md-end rtl" cols="12" md="6">
          <div class="pa-2 rounded-pill border-md ">
            <v-avatar color="auto" class="text-h5 shadow-1  " size="140">

              <v-icon  class=" position-absolute ">
                fad fa-user
              </v-icon>
              <v-img :src="`https://tedline.org/api/account/user_profile_image/${$route.params.username}`"
                cover></v-img>
            </v-avatar>

          </div>

        </v-col>
        <v-col class="rtl text-white d-flex   justify-center justify-md-start" cols="12" md="6">

          <v-skeleton-loader v-if="!data" color="transparent" :boilerplate="true" class="rounded-2lg" type="text, "
            width="200">
          </v-skeleton-loader>
          <div class=" d-flex flex-column align-center align-md-start">

            <h3 v-if="data" class="text-h5 text-white  font-weight-black irsa">
              {{ $route.params.username }}

            </h3>
            <v-list-item-subtitle v-if="data">{{ data.get_full_name }}</v-list-item-subtitle>
          </div>

        </v-col>

      </v-row>
      <v-container v-if="data"> 
  
          <div class="d-flex  justify-center justify-md-end  align-center">
            <v-btn icon=""  density="comfortable" @click="shareLink" color="auto" variant="tonal">
              <ShareIcon  class="text-white" style="height: 15px;" />
            </v-btn>
            <v-card  color="auto" elevation="0" width="120" v-if="data.status == 't'" variant="tonal"
              class="align-center rounded-pill  mx-3  d-flex justify-space-between  pa-1 pe-3">
              <v-avatar variant="tonal" color="black" size="33">
                <v-icon size="14" class="text-white">
                  <UserIcon style="height: 14px;" />
                </v-icon>
              </v-avatar>
              <div class="rtl">
                <p class=" font-weight-bold text-xs text-white">مدرس </p>
              </div>
            </v-card>
          </div>
        
            
        
  
      </v-container>
    </v-container>
    <v-sheet height="40" color="auto" elevation="0" class=" hidden-md-and-up rounded-t-lg  w-100 "
      style="border:1px solid  light">

      <div class="d-flex justify-center">
        <v-sheet width="60" height="5" rounded="pill" class="mt-3" color="grey3"></v-sheet>
      </div>
    </v-sheet>

  </div>
  <v-container class="mt-0 mt-md-5">

    <v-skeleton-loader v-if="!data" v-for="n in 3" color="auto" class="mx-5 my-10 rounded-2lg" type="image, ">
    </v-skeleton-loader>

    <div class="text-right text-xs rtl mb-10 px-5 " v-if="data && data.bio">
      {{ data.bio }}
    </div>
    <v-expand-transition>
      <v-row v-if="loading == false"
        class="d-flex flex-row-reverse justify-md-start justify-center mx-1  flex-wrap align-stretch">
        <v-col cols="6" md="4" lg="2" class="pa-1 " v-if="data.status == 's'">
          <v-card variant="tonal" color="blue-darken-1"
            class="align-center rounded-pill  text-white  d-flex justify-space-between pa-2 pe-3">
            <v-avatar variant="flat" class=" " color="blue" size="38">
              <v-icon size="15">
                fad fa-list
              </v-icon>
            </v-avatar>
            <div class="rtl">
              <p class=" font-weight-bold text-xs-1 text-blue-darken-2">دوره تمام نشده </p>
              <p class="text-xs-1 irsa   text-blue-lighten-1">{{ data.unfinished_course }} دوره</p>
            </div>
          </v-card>
        </v-col>
        <v-col cols="6" md="4" lg="2" class="pa-1" v-if="data.status == 's'">
          <v-card variant="tonal" color="grey"
            class="align-center  rounded-pill   d-flex justify-space-between  pa-2 pe-3">
            <v-avatar variant="flat" class=" " color="black" size="38">
              <v-icon size="15">
                fad fa-check
              </v-icon>
            </v-avatar>
            <div class="rtl">
              <p class=" font-weight-bold text-xs-1 text-nauto">دوره تمام شده </p>
              <p class="text-xs-1 irsa text-nauto">{{ data.finished_course }} دوره</p>
            </div>
          </v-card>
        </v-col>
        
      </v-row>
    </v-expand-transition>
    <div class="mt-16"></div>
    <YourCourses v-if="loading == false && data.status == 's'" :progress="false" variant="flat"
      :username="$route.params.username" />
    <TeacherCourses v-if="loading == false && data.status == 't'" :username="$route.params.username" />
  </v-container>


</template>
<script setup>
import { useAsyncData, useRoute } from "nuxt/app";
import { ShareIcon, UserIcon } from "@heroicons/vue/24/solid";
import YourCourses from "~/components/section/YourCourses.vue";
import TeacherCourses from "~/components/section/TeacherCourses.vue";

definePageMeta({
  layout: 'dashboard', // Specify the layout name here
});
const route = useRoute();
const snackbar = ref(false);
const { data, pending: loading } = useAsyncData(() =>
  $fetch(`https://tedline.org/api/account/RetrieveUser/${route.params.username}/`)
);

const copyToClipboard = (textToCopy) => {
  if (navigator.clipboard && window.isSecureContext) {
    return navigator.clipboard.writeText(textToCopy);
  } else {
    const textArea = document.createElement("textarea");
    textArea.value = textToCopy;
    textArea.style.position = "fixed";
    textArea.style.left = "-999999px";
    textArea.style.top = "-999999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    document.execCommand("copy") ? textArea.remove() : null;
  }
};

const shareLink = () => {
  copyToClipboard(`https://tedline.org/profile/${route.params.username}/`);
  snackbar.value = true;
};
</script>

<style scoped>
@media (max-width: 767px) {
  .curved {
    background-color: #5ba7ee42;

    background-image: radial-gradient(ellipse 100% 140% at -10% 20%, #2b4968 89.9%, #00000000 90%), radial-gradient(ellipse 100% 100% at 30% 100%, #54a1e98c 89.9%, #045ce900 90%);

  }
}

@media (min-width: 767px) {

  .curved {
    background-color: #5ba7ee42;

    background-image: radial-gradient(ellipse 50% 200% at 80% 0%, #2b4968 89.9%, #00000000 90%), radial-gradient(ellipse 30% 100% at 30% -10%, #54a1e98c 89.9%, #045ce900 90%);

  }
}
</style>