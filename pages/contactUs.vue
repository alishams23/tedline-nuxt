<template>
  <Head>
    <Title>ارتباط با ما</Title>
 </Head>
  <v-app id="inspire">
    <v-main class=" bg-blue "> 
  <v-locale-provider rtl  >
  <div class="px-5">
    <v-card
    class="mx-auto pa-10 shadow-3  rounded-xl mt-10"
    max-width="444"

  >

  <v-btn
  variant="tonal"
  color="blue"
  size="small"
  class="mb-5"
  to="/"
  prepend-icon="fa fa-arrow-right"
  >
    برگشت به خانه
  </v-btn>
  <h1 class="text-h5 irsa font-weight-bold py-5">
    ارتباط با ما
  </h1>
  <form @submit.prevent="submit">
    <v-text-field
      v-model="name"
      variant="outlined"
      rounded="lg"
      color="blue"
      label="نام"
    ></v-text-field>

    <v-text-field
      v-model="phone"
      variant="outlined"
      rounded="lg"
      
      label="شماره تماس"
      color="blue"
    ></v-text-field>

    <v-text-field
      v-model="email"
      variant="outlined"
      rounded="lg"
      color="blue"
    
      label="ایمیل"
    ></v-text-field>

    <v-textarea
      v-model="select"
      variant="outlined"
      rounded="lg"

      color="blue"

      label="متن مورد نظر"
    ></v-textarea>



    <v-btn
      class="w-100"
      type="submit"
      elevation="0"
      color="blue"
      rounded="lg"
      @click="handleReset" :loading="loading"
    >
      ارسال
    </v-btn>

   
  </form>
  </v-card>
  </div>
</v-locale-provider>
    </v-main>
  </v-app>

</template>
<script >
import axios from "axios";
export default {

  data:() => ({
    loading:false,
    name:'',
phone:'',
email:'',
select:'',
  }),
  methods:{
    handleReset(){
      this.loading= true
    }
  }
  }
</script>