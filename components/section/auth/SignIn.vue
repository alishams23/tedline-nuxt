
<template>
   
   <v-form validate-on="input" @submit.prevent="Login">
    <v-alert
      
      variant="tonal"
      v-if="generalError == true"
      icon="fa fa-exclamation-triangle"
      title="خطا"
      class="rtl my-8"
      text="پسورد یا نام کاربری اشتباه میباشد"
      type="error"
    ></v-alert>
  <v-row class="d-flex mb-3">
      <v-col cols="12">
          <v-text-field
          v-model="username"
          :rules="[rules.required]"
          label="username"
          rounded="pill"
          persistent-hint
          color="blue"
          variant="outlined"
        ></v-text-field>
      </v-col>
      <v-col cols="12">
          <v-text-field
          v-model="password"
          :rules="[rules.required]"
          label="password"
          type="password"
          rounded="pill"
          persistent-hint
          color="blue"
          variant="outlined"
        ></v-text-field>
      </v-col>
      <v-col cols="12" class="pt-0 pb-16 rtl">
         
                  <RouterLink to="/"
                      class=" text-grey-darken-1 text-decoration-none text-body-2 irsa font-weight-light "> فراموشی رمز عبور</RouterLink>
        
      </v-col>
      <v-col cols="12" class="pt-0" >
          <v-btn type="submit"  :loading="loading" color="blue" rounded="pill" width="100%" size="x-large" class="text-body-2" flat >ورود</v-btn>
      </v-col>
  </v-row>
</v-form>
  
  </template>
  
  
  <script>
  import axios from "axios";
  export default {
   
    data() {
      return {
        rules: {
          required: value => !!value || 'Field is required',
        },
        generalError: false,
        username: "",
        password: "",
        loading: false,
      };
    },
    mounted() {
      if (this.$store.state.isAuthenticated == true) {
        this.$router.push("/");
      }
    },
    methods: {
      async Login() {
    this.loading = true;
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/account/login/", {
        username: this.username,
        password: this.password,
      });
  
      if (response.status === 200) {
        // Login successful
        this.$store.commit("login", {
          token: response.data.token,
          username: this.username,
        });
        this.loading = false;
        this.$router.push("/");
      } else {
        // Handle other HTTP status codes (e.g., 401 for unauthorized)
        this.loading = false;
        this.generalError = true;
      }
    } catch (error) {
      // Handle network errors or unexpected exceptions
      this.loading = false;
      this.generalError = true;
      
      // Log the error to the console
      console.error("API error:", error);
    }
  }
  
  
      },
    
  };
  </script>
  