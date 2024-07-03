<template>
  <div v-if="!vuetifyLoaded" class="progress-bar-container">
    <div>
      <div class="loader "></div>
    </div>
   
  </div>
  <VitePwaManifest />
  <NuxtLoadingIndicator />
  <div>
    <Head>
        <Title>تدلاین</Title>
     </Head>
</div>
  <div>
    <NuxtLayout >
      
      <NuxtPage/>
    </NuxtLayout>
  </div>



</template>
<script>
export default {
  data() {
    return {
      vuetifyLoaded: false,
    };
  },
  methods: {
    handleButtonClick() {
      // Handle button click logic
      console.log('Button clicked!');
    },
  },
  mounted() {
    // Simulate Vuetify loading process
    // In a real project, this might be asynchronous, like loading from CDN or dynamically importing Vuetify
    setTimeout(() => {
      this.vuetifyLoaded = true;
    }, 2000);
  },
};
</script>

<style>


.progress-bar-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #1455fa ;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  z-index: 999999999; /* Make sure it's on top of other elements */
}


/* HTML: <div class="loader"></div> */
/* HTML: <div class="loader"></div> */
.loader {
  width: 100px;
  height: 40px;
  --g: radial-gradient(farthest-side,#0000 calc(95% - 3px),#fff calc(100% - 3px) 98%,#0000 101%) no-repeat;
  background: var(--g), var(--g), var(--g);
  background-size: 30px 30px;
  animation: l9 1s infinite alternate;
}
@keyframes l9 {
  0% {
    background-position: 0 50%, 50% 50%, 100% 50%;
  }
  20% {
    background-position: 0 0, 50% 50%, 100% 50%;
  }
  40% {
    background-position: 0 100%, 50% 0, 100% 50%;
  }
  60% {
    background-position: 0 50%, 50% 100%, 100% 0;
  }
  80% {
    background-position: 0 50%, 50% 50%, 100% 100%;
  }
  100% {
    background-position: 0 50%, 50% 50%, 100% 50%;
  }
}
</style>