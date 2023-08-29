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
      <div >
        <video class="w-100 rounded-xl" controls autoplay >
          <source :src="videoUrl" type="video/mp4" />
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
        videoUrl: '', // URL of the Django stream endpoint
 
      };
    },
    async mounted() {
      const videoId = this.$route.params.box; // Assuming the route parameter is 'id'
      
      this.fetchVideoStream(videoId);
      
    },
    methods: {
      async fetchVideoStream(videoId) {
        try {
          const response = await fetch(`https://tedline.org/api/box/video/stream_video/${videoId}/`,{
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
          Authorization: `Token ${this.$store.state.token}`,
        },
      });
          if (response.ok) {
            const blob = await response.blob();
            this.videoUrl = URL.createObjectURL(blob);
            
          } else {
            console.error('Failed to fetch video stream');
          }
        } catch (error) {
          console.error('Error fetching video stream:', error);
        }
      }
    }
  };
  </script>