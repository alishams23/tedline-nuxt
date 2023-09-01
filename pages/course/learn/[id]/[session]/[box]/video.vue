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
        <video autoplay controls class="w-100 rounded-xl">
          <source :src="videoUrl + $route.params.box +`/?token=${$store.state.token}`" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </v-container>
  </template>
  
  <script>
  export default {
    setup() {
        definePageMeta({
            layout: "dashboard",
        })
    },
    data() {
      return {
        videoUrl :'https://tedline.org/api/box/video/stream_video/',
      };
    },
    async mounted() {
    
      
    },
    methods: {

    }
  };
  </script>