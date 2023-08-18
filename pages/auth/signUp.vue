
<template>
    <v-app id="inspire">
        <v-main class=" bg-blue "> 
 
        <v-container  >
            <v-row class="my-16 d-flex justify-center align-center" >
                <v-col cols="12" lg="4" xl="3" class="d-flex align-center" >
                    <v-card rounded="xl" elevation="0" class=" shadow-2  px-5  mx-auto" >
                        <v-card-item class="">
                            <div class="font-weight-bold irsa text-muted text-center  text-h4 mt-5 ">ثبت نام</div>
                            <div class="d-flex text-h6 text-blue justify-center font-weight-bold py-4 mb-5">
                              tedline
                            </div>
                           <v-form @submit="submitForm">
                            <v-row class="d-flex mb-3">
                                <v-col cols="12">
                                    <v-text-field
                                 
                                    label="username"
                                    rounded="lg"
                                    persistent-hint
                                    variant="outlined"
                                  ></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field
                                    label="password"
                                    :rules="passwordRules" 
                                    rounded="lg"
                                    persistent-hint
                                    variant="outlined"
                                  ></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field
                                    label="email"
                                    rounded="lg"
                                    :rules="emailRules"
                                    persistent-hint
                                    variant="outlined"
                                  ></v-text-field>
                                </v-col>
                           
                                <v-col cols="12" class="pt-5" >
                                    <v-btn type="submit" color="blue-grey-darken-3"  rounded="lg" width="100%" size="large" flat >ثبت نام</v-btn>
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
    </v-main>
    </v-app>

</template>
<script>
export default {
  data() {
    return {
      email: '',
      password: '',
    };
  },
  computed: {
    emailRules() {
      return [
        v => !!v || 'Email is required',
        v => this.isValidEmail(v) || 'Invalid email address',
      ];
    },
  },
  methods: {
    isValidEmail(email) {
      // Regular expression for basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    },
    passwordRules() {
      return [
        v => !!v || 'Password is required',
        v => this.isStrongPassword(v) || 'Password must be at least 8 characters long and contain a mix of letters, numbers, and symbols',
      ];
    },
    submitForm() {
      if (this.$refs.form.validate()) {
        // Valid form submission logic here
      }
    },
  },
};
</script>