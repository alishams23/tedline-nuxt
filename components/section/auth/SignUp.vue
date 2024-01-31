
<template>

   <v-form ref="form" @submit.prevent="submitForm">
    <v-alert variant="tonal" v-if="generalError == true" icon="fa fa-exclamation-triangle" title="خطا"
      class="rtl my-8" text="ایمیل یا نام کاربری تکراری میباشد " type="error"></v-alert>
    <v-row class="d-flex mb-3">
      <v-col cols="12">
        <v-text-field color="blue" label="یوزرنیم" @input="updateUsername" v-model="username" :rules="usernameRules"
          rounded="pill" persistent-hint variant="outlined"></v-text-field>
      </v-col>
      <v-col cols="12">
        <v-text-field color="blue" label="پسورد" v-model="password" :rules="passwordRules" rounded="pill" persistent-hint
          variant="outlined"></v-text-field>
      </v-col>

      <v-col cols="12">
        <v-text-field color="blue" label="ایمیل" v-model="email" rounded="pill" :rules="emailRules" persistent-hint
          variant="outlined"></v-text-field>
      </v-col>

      <v-col cols="12">
        <v-text-field color="blue" label="نام" v-model="firstName" rounded="pill" :rules="nameRules" persistent-hint
          variant="outlined"></v-text-field>
      </v-col>

      <v-col cols="12">
        <v-text-field color="blue" label="نام خانوادگی" v-model="lastName" rounded="pill" :rules="nameRules"
          persistent-hint variant="outlined"></v-text-field>
      </v-col>

      <v-col cols="12" class="pt-5">
        <v-btn type="submit" :loading="loading" color="blue" rounded="pill" width="100%"
          size="x-large" class="text-body-2" flat>ثبت
          نام</v-btn>
      </v-col>
    </v-row>
  </v-form>
  </template>
  <script>
  import axios from "axios";
  
  export default {
    data() {
      return {
        email: '',
        password: '',
        username: '',
        firstName: '',
        lastName: '',
        loading: false,
        generalError: false,
  
      };
    },
    computed: {
      emailRules() {
        return [
          v => !!v || 'ایمیل اجباری است',
          v => this.isValidEmail(v) || 'آدرس ایمیل نامعتبر است',
        ];
      },
      nameRules() {
        return [
          v => !!v || 'نام اجباری است',
        ];
      },
      passwordRules() {
        return [
          v => !!v || 'پسورد اجباری است',
          v => this.isStrongPassword(v) || 'پسورد باید به طول ۸ کارکتر و شامل عدد و حروف انگلیسی بزرگ و کوچک باشد',
        ];
      },
      usernameRules() {
        return [
          v => !!v || 'یوزرنیم اجباری است',
          v => this.isValidUsername(v) || 'یوزرنیم حداقل باید شامل ۶ کاراکتر باشد و شامل کارکتر های !@#$%^&*()-+?=,<>/ نباشد ',
        ];
      },
    },
    methods: {
      isValidEmail(email) {
        // Regular expression for basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
      },
      updateUsername() {
        // Transform the input to lowercase and update the data property
        this.username = this.username.toLowerCase();
      },
      async submitForm() {
        if (this.$refs.form.validate()) {
          this.loading = true;
          try {
            await axios
              .post(`https://tedline.org/api/account/RegisterUser/`, {
                "username": this.username,
                "password": this.password,
                "email": this.email,
                "last_name": this.lastName,
                "first_name": this.firstName,
              }).then((response) => {
  
                this.$store.commit("login", {
                  token: response.data.token,
                  username: this.username,
                });
              }).then(() => {
                this.$router.push("/home");
              })
          }
  
          catch (error) {
            console.log(error)
            this.generalError = true;
            this.loading= false
  
  
          }
  
  
        }
  
      },
      isStrongPassword(password) {
        // Check for at least one uppercase letter, one lowercase letter, one digit, and length > 8
        const hasUppercase = /[A-Z]/.test(password);
        const hasLowercase = /[a-z]/.test(password);
        const isLengthValid = password.length >= 8;
  
        return hasUppercase && hasLowercase && isLengthValid;
      },
      isValidUsername(username) {
        const disallowedCharsRegex = /[!@#$%^&*()\-\+?=,<>'/]/;
        const isLengthValid = username.length >= 6;
        return isLengthValid && !disallowedCharsRegex.test(username);
      },
  
    },
  };
  </script>