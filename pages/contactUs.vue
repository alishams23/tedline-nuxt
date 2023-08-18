<template>
    <v-container>
        <v-alert
        icon="fa fa-info"
          variant="tonal"
          type="info"
          class="rtl border-opacity-100 my-10"
          border="start"
         
        >
      <div class=" text-sm  font-weight-black irsa">
     این بخش در حال اپدیت است
      </div>
      
      </v-alert>
    </v-container>
    </template> 
    
    <script>
  
export default {
  setup() {
    definePageMeta({
      layout: "dashboard",
    })
  },}
  </script>