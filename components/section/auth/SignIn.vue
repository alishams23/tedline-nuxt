<template>
  <div>

    <v-form validate-on="input" v-if="state != 'get_login_code'" @submit.prevent="sendLoginSms">
      <v-row align="center" justify="center">
        <v-col cols="12">
          <div v-if="error" class="  text-red-accent-4 d-flex justify-start pl-3 pt-1 mb-12">
            {{ error }}
          </div>
          <v-text-field v-model="phoneNumber" :rules="[rules.required, rules.phoneNumber]" rounded="pill"
            persistent-hint color="blue" variant="outlined" label="شماره موبایل .......۰۹۱" required class="" />

          <v-btn type="submit" class="mt-12" size="large" elevation="0" rounded color="blue" :loading="loading" dark
            block tile> دریافت کد</v-btn>
        </v-col>
      </v-row>
    </v-form>
    <v-form validate-on="input" v-if="state == 'get_login_code'" @submit.prevent="check_code">
      <v-row align="center" justify="center">
        <v-col cols="12">
          <div v-if="error" class="  text-red-accent-4 d-flex justify-start pl-3 pt-1 mb-12">
            {{ error }}
          </div>
          <v-text-field v-model="code" :rules="[rules.required, rules.number]" label="کد را وارد کنید" required
            rounded="pill" persistent-hint color="blue" variant="outlined" />
          <div @click="state = 'login'" class="  text-indigo-accent-4 d-flex justify-end pl-3 pt-1 cursor-pointer">
            تغییر شماره {{ phoneNumber }}
          </div>


          <v-btn type="submit" class="mt-16" size="large" elevation="0" rounded color="blue" :loading="loading" dark
            block tile>

            <div>
              ورود
            </div>
          </v-btn>
          <div v-if="isCooldownActive" class="text-indigo-accent-2 d-flex  justify-center pt-5">
            {{ Math.floor(cooldownTime / 60) }}:{{ ('0' + cooldownTime % 60).slice(-2) }} تا تلاش مجدد
          </div>
          <div v-else @click="sendLoginSms" class="text-indigo-accent-4 d-flex justify-center cursor-pointer pt-5">
            دریافت مجدد کد
          </div>
        </v-col>
      </v-row>
    </v-form>
  </div>
</template>


<script>
import axios from "axios";
export default {

  data() {
    return {
      error: null,
      isCooldownActive: false,
      cooldownInterval: null,
      cooldownTime: 120, // 2 minutes in seconds
      state: 'login',
      next : null,


      rules: {
        required: value => !!value || 'این فیلد اجباری است',
        phoneNumber: value => {
          const pattern = /^\d{11}$/; // Updated to check for exactly 11 digits
          return pattern.test(value) || 'شماره باید ۱۱ رقم و با اعداد انگلیسی باشد';
        },
        number: value => {
          const pattern = /^[0-9]*$/;
          return pattern.test(value) || 'باید از اعداد استفاده شود';
        }
      },
      generalError: false,
      phoneNumber: '',
      code: null,
      loading: false,
    }
  },
  mounted() {
    if (this.$store.state.isAuthenticated == true) {
      this.$router.push("/");
    }
    if (this.$route.query.next != null) this.next = this.$route.query.next

  },
  methods: {


    startCooldown() {
      this.cooldownInterval = setInterval(() => {
        if (this.cooldownTime > 0) {
          // Decrease the cooldown time
          this.cooldownTime -= 1;
        } else {
          // Reset cooldown state and time, then clear interval
          this.isCooldownActive = false;
          this.cooldownTime = 120; // Reset to 2 minutes
          clearInterval(this.cooldownInterval);
        }
      }, 1000); // Update every second
    },
    async sendLoginSms() {
      // Ensure the phone number is not empty
      if (this.phoneNumber) {

        this.loading = true
        await axios.post(`http://127.0.0.1:8000/api/account/login-sms/${this.phoneNumber}/`,
        )
          .then(response => {
            // Handle success response
            this.state = 'get_login_code'
            this.error = null
            this.loading = false
            this.isCooldownActive = true;
            this.cooldownTime = 120
            clearInterval(this.cooldownInterval)
            this.startCooldown();
          })
          .catch(error => {
            // Handle error response
            this.error = 'کاربری با این شماره وجود ندارد'
            this.loading = false
            console.log(error);

          });
      } else {
        // Phone number is empty, handle accordingly
        console.error('Phone number is empty');

      }
    },
    async check_code() {

      this.loading = true
      if (this.code) {


        const params = new URLSearchParams();
        params.append('phone', this.phoneNumber);
        params.append('code', this.code);

        await axios({
          method: 'post',
          url: 'http://127.0.0.1:8000/api/account/code-check/',
          data: params
        }).catch(function (error) {
          if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          }
        })
          .then(response => {
            // Handle success response
            this.$store.commit("login", {
              token: response.data.token,
              username: response.data.username,
            });
            if (this.next != null) {
              
              this.$router.push(`/course/${this.next}/?register=true`);
            } else {

              this.$router.push(`/`);
            }
            
          })

      } else {
        // Phone number is empty, handle accordingly
        console.error('Phone number is empty');
      }
    },


  },

};
</script>
