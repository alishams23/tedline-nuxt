<template>

  <div>
    <form  v-if="state != 'get_code_signup'" @submit.prevent="sendSingUpSms">
      <v-row align="center" justify="center">
        <v-col cols="12">
          <v-row>
            <v-col cols="12" sm="6">
              <v-text-field v-model="first_name" required label="نام" rounded="pill" persistent-hint variant="outlined"
                color="blue" class="mt-lg-4" />
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field v-model="last_name" required  label="نام خانوادگی" rounded="pill" persistent-hint
                variant="outlined" color="blue" class="mt-lg-4" />
            </v-col>
          </v-row>
          <v-text-field v-model="phoneNumber" class="mt-5 "  :rules="[rules.required, rules.phoneNumber]"
            label="شماره تلفن" rounded="pill" persistent-hint variant="outlined" color="blue" />

          <v-btn  :loading="loading" type="submit" class="mt-16" size="large" elevation="0" rounded color="blue" dark
            block tile>ثبت
            نام</v-btn>
        </v-col>
      </v-row>
    </form>
    <v-form validate-on="input" v-if="state == 'get_code_signup'" @submit.prevent="check_code_signup">
      <v-row align="center" justify="center">
        <v-col cols="12">
          <div v-if="error" class="  text-red-accent-4 d-flex justify-start pl-3 pt-1 mb-16 ">
            {{ error }}
          </div>
          <v-text-field v-model="code" :rules="[rules.required, rules.number]" label="کد را وارد کنید" required
            rounded="pill" persistent-hint variant="outlined" color="blue" />
          <div @click="state = 'blue'" class="  text-indigo-accent-4 d-flex justify-end pl-3 pt-1 cursor-pointer">
            تغییر شماره {{ phoneNumber }}
          </div>


          <v-btn type="submit" class="mt-16" size="large" elevation="0" rounded color="blue" :loading="loading" dark
            block tile>

            <div>
              ثبت نام
            </div>
          </v-btn>
          <div v-if="isCooldownActive" class="text-indigo-accent-2 d-flex  justify-center pt-5">
            {{ Math.floor(cooldownTime / 60) }}:{{ ('0' + cooldownTime % 60).slice(-2) }} تا تلاش مجدد
          </div>
          <div v-else @click="sendSingUpSms" class="text-indigo-accent-4 d-flex justify-center cursor-pointer pt-5">
            دریافت مجدد کد
          </div>
        </v-col>
      </v-row>
    </v-form>
  </div>
</template>

<script>

import axios from 'axios'
export default {

  data: () => ({
    error: null,
    isCooldownActive: false,
    cooldownInterval: null,
    cooldownTime: 120, // 2 minutes in seconds
    state: 'login',
    first_name: '',
    last_name: '',
    step: null,
    rules: {
      required: value => !!value || 'این فیلد اجباری است',

phoneNumber: value => {
  const pattern = /^\d{11}$/; // Check for exactly 11 digits
  if (!pattern.test(value)) {
    return 'شماره باید ۱۱ رقم و با اعداد انگلیسی باشد';
  }
  return true;
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
  }),


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
    checkNumber(){
      const pattern = /^\d{11}$/; // Updated to check for exactly 11 digits
        return pattern.test(this.phoneNumber) 
    },

    sendSingUpSms() {
      console.log('sendSingUpSms', this.phoneNumber);
      // Ensure the phone number is not empty
      if (this.phoneNumber && this.checkNumber() == true) {
        const apiUrl = `https://tedline.org/api/account/sign-up-sms/`;
        const params = new URLSearchParams();
        params.append('first_name', this.first_name);
        params.append('last_name', this.last_name);
        params.append('number', this.phoneNumber);

        this.loading = true
        axios({
          method: 'post',
          url: apiUrl,
          data: params
        })
          .then(response => {
            // Handle success response
            console.log('SMS sent successfully:', response);
            this.state = 'get_code_signup'
            this.loading = false
            this.isCooldownActive = true;
            this.cooldownTime = 120
            clearInterval(this.cooldownInterval)
            this.startCooldown();
            // You can change the dialog page or show a success message here
          })
          .catch(error => {
            // Handle error response
            console.error('Error sending SMS:', error);
            // You can show an error message to the user here
          });
      } else {
        // Phone number is empty, handle accordingly
        console.error('Phone number is empty');
        // You can show an error message to the user here
      }
    },
    check_code_signup() {
      // Ensure the phone number is not empty
      this.loading = true

      if (this.code) {
        const apiUrl = `https://tedline.org/api/account/code-check-sign-up/`;
        const params = new URLSearchParams();

        params.append('code', this.code);
        params.append('number', this.phoneNumber);

        axios({
          method: 'post',
          url: apiUrl,
          data: params
        })
          .then(response => {
            this.$store.commit("login", {
              token: response.data.token,
              username: response.data.username,
            });
          }).then(() => {
            this.$router.push("/home");
          })
          .catch(error => {
            // Handle error response
            this.error = 'کد معتبر نیست'
            this.loading = false
            console.error('Error sending SMS:', error);
            // You can show an error message to the user here
          });
      } else {
        // Phone number is empty, handle accordingly
        console.error('Phone number is empty');
        // You can show an error message to the user here
      }
    },
  }
}
</script>