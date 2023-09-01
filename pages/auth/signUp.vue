
<template>
  <v-app id="inspire">
    <v-main class=" bg-blue ">

      <v-container>
        <v-row class="my-16 d-flex justify-center align-center">
          <v-col cols="12" lg="5" xl="4" class="d-flex align-center">
            <v-card rounded="xl" elevation="0" class=" shadow-2  px-5  mx-auto">
              <v-card-item class="">
                <div class="font-weight-bold irsa text-muted text-center  text-h4 mt-5 ">ثبت نام</div>
                <div class="d-flex text-h6 text-blue justify-center font-weight-bold py-4 mb-5">
                  tedline
                </div>
                <v-locale-provider rtl>
                <v-form @submit.prevent="submitForm">
                  <v-row class="d-flex mb-3">
                    <v-col cols="12">
                      <v-text-field label="یوزرنیم" :rules="usernameRules" rounded="lg" persistent-hint variant="outlined"></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field label="پسورد" :rules="passwordRules" rounded="lg" persistent-hint
                        variant="outlined"></v-text-field>
                    </v-col>
             
                    <v-col cols="12">
                      <v-text-field label="ایمیل" rounded="lg" :rules="emailRules" persistent-hint
                        variant="outlined"></v-text-field>
                    </v-col>
               
                    <v-col cols="12">
                      <v-text-field label="نام" rounded="lg" :rules="nameRules" persistent-hint
                        variant="outlined"></v-text-field>
                    </v-col>
               
                    <v-col cols="12">
                      <v-text-field label="نام خانوادگی" rounded="lg" :rules="nameRules" persistent-hint
                        variant="outlined"></v-text-field>
                    </v-col>
               
                    <v-col cols="12" class="pt-5">
                      <v-btn type="submit" color="blue-grey-darken-3" rounded="lg" width="100%" size="large" flat>ثبت
                        نام</v-btn>
                    </v-col>
                  </v-row>
                </v-form>
              </v-locale-provider>
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
    </v-main>
  </v-app>
</template>
<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      username: '',
      firstName: '',
      lastName: ''
    };
  },
  computed: {
    emailRules() {
      return [
        v => !!v || 'Email is required',
        v => this.isValidEmail(v) || 'Invalid email address',
      ];
    },
    nameRules() {
      return [
        v => !!v || 'Email is required',
      ];
    },
    passwordRules() {
      return [
        v => !!v || 'Password is required',
        v => this.isStrongPassword(v) || 'Password must be at least 8 characters long and contain a mix of letters, numbers',
      ];
    },
    usernameRules() {
      return [
        v => !!v || 'Password is required',
        v => this.isValidPassword(v) || 'username must be at least 6 characters ',
      ];
    },
  },
  methods: {
    isValidEmail(email) {
      // Regular expression for basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    },
 
    submitForm() {
      if (this.$refs.form.validate()) {
        // Valid form submission logic here
      }
    },
    isStrongPassword(password) {
      // Check for at least one uppercase letter, one lowercase letter, one digit, and length > 8
      const hasUppercase = /[A-Z]/.test(password);
      const hasLowercase = /[a-z]/.test(password);
      const isLengthValid = password.length >= 8;

      return hasUppercase && hasLowercase && isLengthValid;
    },
    isValidPassword(password) {
      const isLengthValid = password.length >= 6;
      return isLengthValid;
    },
    async validateForm() {
      this.loading = true;
      await axios
        .post(`https://tedline.org/api/UserCreate/`, {
          "username": this.username,
          "password": this.Password,
          "email": this.email,
          "last_name": this.lastName,
          "first_name": this.firstName,
        }).catch(function (error) {
          if (error.response) {
            // Request made and server responded
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            // The request was made but no response was received
            console.log(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
          }

        })
        .then((response) => {

          this.$store.commit("login", {
            token: response.data.token,
            username: this.username,
          });
        }).then(() => {
          this.$router.push("/t/home");
        })

    },
  },
};
</script>