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
      vuetifyLoaded: true,
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
.loader {
  height: 15px;
  width: 150px;
  --c:no-repeat linear-gradient(#0739ce 0 0);
  background: var(--c),var(--c),#ffffff;
  background-size: 60% 100%;
  border-radius: 40px;
  animation: l16 3s infinite;
}
@keyframes l16 {
  0%   {background-position:-150% 0,-150% 0}
  66%  {background-position: 250% 0,-150% 0}
  100% {background-position: 250% 0, 250% 0}
}
</style>