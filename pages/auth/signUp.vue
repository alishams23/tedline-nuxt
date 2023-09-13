
<template>
  <v-app id="inspire">
    <v-main class=" bg-blue ">
      <v-locale-provider rtl>
      <v-container>
        <v-row class="my-16 d-flex justify-center align-center">
          <v-col cols="12" lg="5" xl="4" class="d-flex align-center">
            <v-card rounded="xl" elevation="0" class=" shadow-2  px-5  mx-auto">
              <v-btn
              variant="tonal"
              color="blue"
              size="small"
              class="mt-5"
              to="/"
              prepend-icon="far fa-arrow-right"
              >
                برگشت به خانه
              </v-btn>
              <v-card-item class="">
                <div class="font-weight-bold irsa text-muted text-center  text-h4 mt-5 ">ثبت نام</div>
                <div class="d-flex text-h6 text-blue justify-center font-weight-bold py-4 mb-5">
                  tedline
                </div>
               
                  <v-form ref="form" @submit.prevent="submitForm">
                    <v-alert variant="tonal" v-if="generalError == true" icon="fa fa-exclamation-triangle" title="خطا"
                      class="rtl my-8" text="ایمیل یا نام کاربری تکراری میباشد " type="error"></v-alert>
                    <v-row class="d-flex mb-3">
                      <v-col cols="12">
                        <v-text-field label="یوزرنیم" @input="updateUsername" v-model="username" :rules="usernameRules"
                          rounded="lg" persistent-hint variant="outlined"></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field label="پسورد" v-model="password" :rules="passwordRules" rounded="lg" persistent-hint
                          variant="outlined"></v-text-field>
                      </v-col>

                      <v-col cols="12">
                        <v-text-field label="ایمیل" v-model="email" rounded="lg" :rules="emailRules" persistent-hint
                          variant="outlined"></v-text-field>
                      </v-col>

                      <v-col cols="12">
                        <v-text-field label="نام" v-model="firstName" rounded="lg" :rules="nameRules" persistent-hint
                          variant="outlined"></v-text-field>
                      </v-col>

                      <v-col cols="12">
                        <v-text-field label="نام خانوادگی" v-model="lastName" rounded="lg" :rules="nameRules"
                          persistent-hint variant="outlined"></v-text-field>
                      </v-col>

                      <v-col cols="12" class="pt-5">
                        <v-btn type="submit" :loading="loading" color="blue-grey-darken-3" rounded="lg" width="100%"
                          size="large" flat>ثبت
                          نام</v-btn>
                      </v-col>
                    </v-row>
                  </v-form>
              
                <h6 class=" irsa text-muted  text-body-1  font-weight-light d-flex justify-center align-center my-8">
                  <RouterLink to="/auth/signin"
                    class="text-black px-3 irsa text-decoration-none text-body-1 opacity-1 font-weight-black ">
                    ورود</RouterLink>
                  اکانتی دارید؟

                </h6>
              </v-card-item>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-locale-provider>
    </v-main>
  </v-app>
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