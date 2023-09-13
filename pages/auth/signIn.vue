
<template>
    <v-app id="inspire">
        <v-main class=" bg-blue "> 
          <v-locale-provider rtl>
        <v-container  >
            <v-row class="my-16 d-flex justify-center align-center" >
                <v-col cols="12" lg="5" xl="4" class="d-flex align-center" >
                    <v-card rounded="xl" elevation="0" class=" shadow-2  px-5  mx-auto" >
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
                            <div class="font-weight-bold irsa text-muted text-center  text-h4 mt-5 ">ورود</div>
                            <div class="d-flex text-h6 text-blue justify-center font-weight-bold py-4 mb-5">
                              tedline
                            </div>
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
                                    rounded="lg"
                                    persistent-hint
                                    variant="outlined"
                                  ></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field
                                    v-model="password"
                                    :rules="[rules.required]"
                                    label="password"
                                    type="password"
                                    rounded="lg"
                                    persistent-hint
                                    variant="outlined"
                                  ></v-text-field>
                                </v-col>
                                <v-col cols="12" class="pt-0 rtl">
                                   
                                            <RouterLink to="/"
                                                class=" text-grey-darken-1 text-decoration-none text-body-1 irsa font-weight-light mb-2"> فراموشی رمز عبور</RouterLink>
                                  
                                </v-col>
                                <v-col cols="12" class="pt-0" >
                                    <v-btn type="submit"  :loading="loading" color="blue-grey-darken-3"  rounded="lg" width="100%" size="large" flat >ورود</v-btn>
                                </v-col>
                            </v-row>
                        </v-form>
                            <h6 class=" irsa text-muted  text-body-1  font-weight-light d-flex justify-center align-center my-8">
                                <RouterLink to="/auth/signUp"
                                class="text-black px-3 irsa text-decoration-none text-body-1 opacity-1 font-weight-black ">
                                ساخت اکانت</RouterLink>
                            اکانتی ندارید؟
                             
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
  head() {
    return {
      title: "ورود"
    };
  },
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
        
          await axios
            .post("https://tedline.org/api/account/login/", {
              username: this.username,
              password: this.password,
            })
            .then((response) =>
              this.$store.commit("login", {
                token: response.data.token,
                username: this.username,
              })
            )
          this.loading = false;
          this.$router.push("/")
        } catch (error) {
          this.loading = false;
          this.generalError = true;
        }
      }
    },
  
};
</script>
