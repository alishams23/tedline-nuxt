<template>
    <v-app height="100%" >
      <v-card height="100%" elevation="0" class="bg-auto  bg-blue-sm " rounded="0"  >
  
        <v-window v-model="stepData" class=" h-100" >
          <v-window-item :value="1" class=" h-100" >
            <v-row class="h-100" >
              <v-col cols="12" md="6"  class="h-100">
                
                <v-card-text  class="mt-12" height="100%">
                  <h4 class="text-center irsa text-h4 my-10 font-weight-black">ورود به اکانت</h4>
                
                  <v-locale-provider rtl>
                    <v-row align="center" justify="center">
                      
                      <v-col cols="12" sm="8">
                      
                 <SignIn class="ma-3  ma-md-0 pa-8 pt-16 pa-md-0 bg-auto  rounded-2xl" />
                 <v-btn
                 variant="tonal"
                 color="auto"
                 rounded="pill"
                 size="small"
                 class="mt-5 mx-2 px-5 mr-5 hidden-md-and-up"
                 to="/"
                 >
                   برگشت به خانه
                 </v-btn>
                 <v-btn
                 variant="tonal"
                 color="auto"
                 rounded="pill"
                 size="small"
                 class="mt-5 px-10 mx-2 hidden-md-and-up"
                 @click="stepData++"
            
                 >
                   ثبت نام
                 </v-btn>
                </v-col>
              </v-row>
                  </v-locale-provider>
                </v-card-text>
              </v-col>
              <v-col cols="12" md="6" class="bg-blue-accent-4  rounded-bl-xl h-100">
                <div style="  text-align: center; padding: 180px 0;">
                  <v-card-text class="light--text">
                    <h3 class="irsa text-center font-weight-black text-h3 rtl">اکانتی نداری؟</h3>
                    <div class="text-center mt-3">
                      از قبل اکانتی برای پنل ادمین به ثبت نرسانده اید؟
                    </div>
                  </v-card-text>
                  <div class="text-center">
                    <v-btn tile rounded variant="outlined" dark @click="stepData++" class="mt-10 font-weight-bold px-15">ثبت
                      نام</v-btn>
                  </div>
                </div>
              </v-col>
            </v-row>
          </v-window-item>
          <v-window-item :value="2" class=" h-100">
            <v-row class=" h-100">
              <v-col cols="12" md="6"  class="bg-blue-accent-4 hidden-sm-and-down  rounded-br-xl h-100">
                <div style="  text-align: center; padding: 180px 0;">
                  <v-card-text class="light--text">
                    <h3 class="irsa text-center font-weight-black text-h3 rtl">اکانتی داری؟</h3>
                    <div class="text-center mt-3">
                      از قبل اکانتی برای پنل ادمین به ثبت رسانده اید؟
                    </div>
                  </v-card-text>
                  <div class="text-center">
                    <v-btn tile rounded variant="outlined" dark @click="stepData--" class="mt-10 font-weight-bold px-15">ورود
                    </v-btn>
  
                  </div>
                </div>
              </v-col>
  
              <v-col cols="12" md="6" class="h-100">
                <v-card-text class="mt-12">
                  <h4 class="irsa text-center text-h4 my-10 font-weight-black">ثبت نام </h4>
                  <v-locale-provider rtl>
  
                    <v-row align="center" justify="center">
                      <v-col cols="12" sm="8">
                     <SignUp class="ma-3  ma-md-0 pa-8 pt-16 pa-md-0 bg-auto  rounded-2xl"/>
                  
                     <v-btn
                     variant="tonal"
                     color="auto"
                     rounded="pill"
                     size="small"
                     class="mt-5 mx-2 px-5 mr-5 hidden-md-and-up"
                     to="/"
                     >
                       برگشت به خانه
                     </v-btn>
                     <v-btn
                     variant="tonal"
                     color="auto"
                     rounded="pill"
                     size="small"
                     class="mt-5 px-10 mx-2 hidden-md-and-up"
                     @click="stepData--"
                
                     >
                       لاگین
                     </v-btn>
                     
                      </v-col>
                    </v-row>
                  </v-locale-provider>
  
                </v-card-text>
              </v-col>
            </v-row>
          </v-window-item>
        </v-window>
      </v-card>
    </v-app>
  </template>
    
  <script>
  

  import axios from 'axios'
  import SignIn from './SignIn.vue';
  import SignUp from './SignUp.vue';
  export default {
    props:['step'],
components:{SignIn,SignUp},
 
    mounted() {
    if (this.$store.state.isAuthenticated == true) {
      this.$router.push("/");
    }
  },
    data: () => ({
      stepData: 1,
     
    }),
    beforeMount(){
      this.stepData = this.step 
    }
   

  }
  </script>
  <style scoped>
  .full-card {
    width: 100%;
    height: 100%;
  }
  
  .v-application .rounded-bl-xl {
    border-bottom-left-radius: 300px !important;
  }
  
  .v-application .rounded-br-xl {
    border-bottom-right-radius: 300px !important;
  }

  @media (max-width: 960px) {
    .bg-blue-sm {
      color: light;
    background-color: rgb(0, 94, 255) !important;
    }
  
  }
  </style>
    
