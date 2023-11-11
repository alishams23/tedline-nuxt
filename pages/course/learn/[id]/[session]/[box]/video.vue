<template>
    <v-container>
      <v-list-item class="mb-5 mt-3 rounded-lg   rtl">
        <template v-slot:prepend>
            <v-avatar size="x-large" rounded="lg" color="blue">
                <v-icon color="white"> fad fa-video</v-icon>
            </v-avatar>
        </template>
        <template v-slot:title>
            <div class="font-weight-bold">
                ویدئو
            </div>
        </template>
        <template v-slot:append>
          <v-btn :to="`/course/learn/${$route.params.id}/${$route.params.session}/`" icon="fal fa-arrow-left" rounded="xl" variant="flat"> </v-btn>
      </template>
    </v-list-item>
      <div>
        <v-sheet rounded="xl" class="player-container ">
          <vue3-video-player class="text-blue" :auto-play="true"  :src="videoUrl + $route.params.box +`/?token=${$store.state.token}`" >
          </vue3-video-player>
        </v-sheet>
        
      </div>
    </v-container>
  </template>
  
  <script>
import '~/assets/styles/video.css'

  export default {
    setup() {
        definePageMeta({
            layout: "dashboard",
        })
    },

    data() {
      return {
        videoUrl :'http://127.0.0.1:8000/api/box/video/stream_video/',

      };
    },
    async mounted() {
      document.addEventListener('contextmenu', function (e) {
  e.preventDefault();
});

// Prevent F12 key from opening developer tools
document.addEventListener('keydown', function (e) {
  if (e.keyCode == 123 /* F12 */) {
    e.preventDefault();
  }
});
      
    },
    methods: {

    }
  };
  </script>
