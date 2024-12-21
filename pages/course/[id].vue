<template>

  <Head>
    <Title v-if="data.title"> دوره ی {{ data.title }}</Title>
  </Head>
  <Navbar :shadow="true" />

  <v-snackbar v-model="snackbar" class="rtl" color="blue-accent-4" elevation="24" rounded="lg">
    <template v-slot:actions>
      <v-btn color="white" variant="text" icon="fal fa-times" @click="snackbar = false">
      </v-btn>
    </template>
    کپی شد
  </v-snackbar>

  <v-snackbar v-model="snackbarDiscount" class="rtl" color="green-darken-1" elevation="24" rounded="lg">
    <template v-slot:actions>
      <v-btn color="white" variant="text" icon="fal fa-times" @click="snackbarDiscount = false">
      </v-btn>
    </template>
    کد تخفیف اعمال شد
  </v-snackbar>
  <v-snackbar v-model="snackbarDiscountError" class="rtl" color="red-darken-1" elevation="24" rounded="lg">
    <template v-slot:actions>
      <v-btn color="white" variant="text" icon="fal fa-times" @click="snackbarDiscountError = false">
      </v-btn>
    </template>
    {{ error_discount }}
  </v-snackbar>

  <div class="ma-3" v-if="loading">
    <!-- <v-progress-circular class="ma-10" v-if="loading" bg-color="primary-lighten-5" :size="63" :width="6" color="blue"
      indeterminate></v-progress-circular> -->

    <v-container>
      <v-skeleton-loader height="350" class="rounded-xl" color="transparent"></v-skeleton-loader>
      <v-row justify="end">
        <v-col cols="4" md="2">
          <v-skeleton-loader height="40" class="rounded-b-0 rounded-t-lg mt-8" color="transparent"></v-skeleton-loader>
        </v-col>
        <v-col cols="4" md="2">
          <v-skeleton-loader height="40" class="rounded-b-0 rounded-t-lg mt-8" color="transparent"></v-skeleton-loader>
        </v-col>
        <v-col cols="4" md="2">
          <v-skeleton-loader height="40" class="rounded-b-0 rounded-t-lg mt-8" color="transparent"></v-skeleton-loader>
        </v-col>
      </v-row>

      <v-divider></v-divider>
      <v-row class="mt-16">
        <v-col cols="12" md="6">
          <v-skeleton-loader height="70" class="rounded-xl" color="transparent"></v-skeleton-loader>
          <v-skeleton-loader height="70" class="rounded-xl mt-5" color="transparent"></v-skeleton-loader>

        </v-col>
        <v-col cols="12" md="6">
          <v-skeleton-loader height="160" class="rounded-xl" color="transparent"></v-skeleton-loader>
        </v-col>


      </v-row>
      <v-skeleton-loader class="mt-10" type="article" color="transparent"></v-skeleton-loader>

    </v-container>


  </div>

  <v-container v-if="loading == false">

    <v-img v-if="loading == false" class="rounded-xl mt-4 " rounded="xl" :aspect-ratio="30 / 9" cover :src="data.image">

      <div class="h-100  w-100 rounded-xl d-flex align-end">
        <div class="bg-gradient-glass h-100 d-flex flex-column justify-end px-md-5 pt-16 py-md-5 w-100 ">
          <v-container>
            <h1 class=' text-h6 text-white text-md-h5 font-weight-black irsa rtl px-4 py-5 py-md-10'>
              {{ data.title }}
            </h1>

            <div class="d-flex justify-end">
              <v-card color="transparent" class="rtl     " elevation="0">
                <v-list-item class=" px-0 text-center ">

                  <div v-if="data.price != 0" class="d-flex align-center text-white">
                    <span v-if="data.discount == 0" class="pl-1">{{ data.price }}</span>
                    <span v-else class="px-1 ">

                      <div class=" text-xxs text-grey1 mt-n3 mb-n1">
                        <span class="text-decoration-line-through"> {{ data.price }}</span>
                        <span class="text-blue  font-weight-black">{{ data.discount }}%</span>
                      </div>
                      <div class="text-xs">
                        {{ data.price - (data.price * data.discount / 100) }}
                      </div>
                    </span> <span class=" text-grey1  irsa text-xxs">تومان</span>
                  </div>
                  <v-list-item-title v-else class=" font-weight-bold text-md-1 text-white"> رایگان</v-list-item-title>
                  <v-list-item-subtitle class="text-xs mt-2 text-white d-flex align-center ">
                    <div class="mx-1">قیمت</div>
                    <IconCoins size="15" />
                  </v-list-item-subtitle>
                </v-list-item>

              </v-card>
              <div class="my-4 mx-4 mx-md-8  bg-grey" style="padding-left: 0.5px;"></div>
              <v-card v-if="data.institute" color="transparent" class="rtl  px-md-2   " elevation="0"
                :to="'/i/' + data.institute.username">
                <v-list-item class=" px-0 ">
                  <template v-slot:prepend>
                    <v-avatar size="50" class=" rounded-lg bg-blue-gradient-2 text-white">
                      <v-icon size="15" class="position-absolute" icon="fad fa-users"></v-icon>
                      <v-img :src="data.institute.image" cover></v-img>

                    </v-avatar>
                  </template>
                  <v-list-item-title class=" font-weight-bold text-md-1 text-white">{{ data.institute.username
                    }}
                  </v-list-item-title>
                  <v-list-item-subtitle class="text-xs mt-2 text-white">{{ data.institute.name
                    }}</v-list-item-subtitle>
                </v-list-item>

              </v-card>
              <v-card v-else v-if="data.teacher" color="transparent" class="rtl  px-md-2   " elevation="0"
                :to="'/profile/' + data.teacher.username">
                <v-list-item class=" px-0 ">
                  <template v-slot:prepend>
                    <v-avatar size="50" class=" rounded-2lg bg-blue-gradient-2 text-white">
                      <v-icon size="15" class="position-absolute" icon="fad fa-users"></v-icon>
                      <v-img :src="`https://tedline.org/api/account/user_profile_image/${data.teacher.username}`"
                        cover></v-img>

                    </v-avatar>
                  </template>
                  <v-list-item-title class=" font-weight-bold text-md-1 text-white">{{ data.teacher.username
                    }}
                  </v-list-item-title>
                  <v-list-item-subtitle class="text-xs mt-2 text-white">{{ data.teacher.get_full_name
                    }}</v-list-item-subtitle>
                </v-list-item>

              </v-card>

            </div>
            <v-row class="pt-10 pb-3 rtl" v-if="data.session.length != 0">
              <v-btn v-if="data.registered == false" variant="flat" size="large"
                @click="isAuthenticated == false ? $router.push(`/auth/signUp/?next=${data.id}`) : data.price > 0 ? dialog_register = true : registerFree()"
                :loading="loadingRegister" color="blue-accent-4" elevation="0"
                class=" px-10 px-16 mb-3 mx-3 mx-2 bg-blue-gradient-3 text-body-2 " rounded="xl">
                ثبت نام
              </v-btn>


              <v-dialog v-model="dialog_register" max-width="500">

                <v-locale-provider rtl>
                  <v-card rounded="xl">
                    <div class="d-flex flex-no-wrap justify-space-between align-center pa-4">
                      <v-card elevation="0">
                        <v-card-title class="text-h5 pt-0 irsa">
                          {{ data.title }}
                        </v-card-title>

                        <v-card-subtitle> {{ data.description }}</v-card-subtitle>
                      </v-card>

                      <div>
                        <v-avatar class="ma-3 custom-rounded-2" size="90">
                          <v-img :src="data.image"></v-img>
                        </v-avatar>
                      </div>
                    </div>
                    <v-expansion-panels elevation="0" class="border">
                      <v-expansion-panel rounded="lg" class="">
                        <v-expansion-panel-title expand-icon="fal  fa-chevron-down" collapse-icon="fal fa-chevron-up"
                          class="px-2 rounded-0 text-xs">اعمال کد تخفیف</v-expansion-panel-title>
                        <v-expansion-panel-text>
                          <div class="d-flex mx-4 mt-3">
                            <div class="w-100">
                              <v-text-field v-model="discount_code" label="کد تخفیف" variant="outlined" rounded="xl"
                                :loading="btn_discount_loading" class="ml-2 mb-0 pb-0">
                              </v-text-field>
                              <p class=" mt-n5 text-grey text-xs-2">در صورتی که کد تخفیف دارید آن را در این قسمت وارد
                                کنید
                              </p>

                            </div>
                            <v-btn rounded="xl" variant="flat" class=" text-xs mt-2" color="blue-accent-4"
                              icon="fa fa-check" :loading="btn_discount_loading" @click="checkDiscountCode"></v-btn>
                          </div>
                        </v-expansion-panel-text>
                      </v-expansion-panel>

                    </v-expansion-panels>

                    <!-- <v-divider></v-divider> -->
                    <template v-slot:actions>


                      <div class="mt-3 mb-4 w-100 d-flex mx-4 justify-space-between justify-center">
                        <div>
                          <v-btn @click="registerCredit()" class=" bg-blue-gradient-3 text-white text-xs px-6"
                            variant="flat" rounded="pill">
                            نهایی کردن خرید
                          </v-btn>
                        </div>
                        <!-- <v-btn rounded="pill" class="text-xs " @click="dialog_register = false">
                        کنسل کردن
                      </v-btn> -->
                        <div class="text-center d-flex flex-column justify-center">
                          <div class=" font-weight-bold">
                            {{ data.price - (data.price * data.discount / 100) - discount_amount }}
                          </div>
                          <div v-if="data.discount > 0 || discount_amount > 0" class=" text-xs text-grey1  ">
                            <span class="text-decoration-line-through"> {{ data.price }}</span>

                          </div>

                        </div>
                      </div>


                    </template>
                  </v-card>
                </v-locale-provider>
              </v-dialog>


              <div class="d-flex">
                <v-btn :variant="data.registered == false ? 'text' : 'flat'" size="large"
                  :to="`/course/learn/${data.id}/${data.session[0].id}`" color="blue"
                  :class="data.registered == false ? '' : 'bg-blue-gradient-3'" elevation="0"
                  class="rounded-pill mx-2  text-xs   ">
                  مشاهده ی دروس

                  <template v-slot:prepend>
                    <v-icon>
                      <IconEye />
                    </v-icon>
                  </template>
                </v-btn>
                <v-btn variant="text" @click="shareLink" size="large" color="blue" elevation="0"
                  class="rounded-pill  text-body-2  ">
                  <template v-slot:prepend>
                    <v-icon>
                      <IconShare />
                    </v-icon>
                  </template>
                  اشتراک گذاری
                </v-btn>
              </div>



            </v-row>
            <div class="d-flex justify-end">
              <div>
                <v-alert variant="tonal" border="start" v-if="data.session.length == 0"
                  class="text-white rtl mt-5 text-xs">
                  دوره در حال اپدیت است.
                </v-alert>
              </div>
            </div>
          </v-container>
        </div>
      </div>


    </v-img>

    <v-snackbar v-model="dialog" v-if="data.registered == true" class="rtl" color="blue-accent-4" elevation="24"
      rounded="lg">
      <template v-slot:actions>
        <v-btn variant="flat" size="small" :to="`/course/learn/${data.id}/${data.session[0].id}`" color="blue-accent-4 "
          rounded="xl" elevation="0" class=" text-xs  font-weight-bold px-5 rounded-xl ">
          مشاهده
        </v-btn>
        <!-- <v-btn color="blue-lighten-4" variant="text" icon="fal fa-times" @click="dialog = false">
      </v-btn> -->

      </template>
      شما در این دوره ثبت نام کرده اید
    </v-snackbar>

    <v-locale-provider rtl>

      <v-tabs v-model="tab" class="  border-b  mt-10 " elevation="0">
        <v-tab color="blue" class="px-5 px-md-10   transition-inactive-class rounded-t-lg text-xs " variant="text"
          :ripple="false" value="one">
          <div :class="tab == 'one' ? 'text-nauto font-weight-bold  ' : ' font-weight-light text-nauto'">
            جزيیات دوره
            <v-icon :color="tab == 'one' ? 'blue' : 'grey2'" size="13" class="ps-5">{{ tab == 'one' ? 'fad' : 'fa' }}
              fa-list</v-icon>
          </div>
        </v-tab>
        <v-tab color="blue" class="px-5 px-md-10 transition-inactive-class rounded-t-lg text-xs " variant="text"
          :ripple="false" value="two">
          <div :class="tab == 'two' ? 'text-nauto font-weight-bold  ' : ' font-weight-light text-nauto'">
            سرفصل ها
            <v-icon :color="tab == 'two' ? 'blue' : 'grey2'" size="13" class="ps-5">{{ tab == 'two' ? 'fad' : 'fa' }}
              fa-check</v-icon>

          </div>
        </v-tab>
        <v-tab color="blue" class="px-5 px-md-10 transition-inactive-class rounded-t-lg text-xs " variant="text"
          :ripple="false" value="three">
          <div :class="tab == 'three' ? 'text-nauto font-weight-bold  ' : ' font-weight-light text-nauto'">
            پیشنیاز ها
            <v-icon :color="tab == 'three' ? 'blue' : 'grey2'" size="13" class="ps-5">{{ tab == 'three' ? 'fad' : 'fa'
              }}
              fa-check</v-icon>

          </div>
        </v-tab>

      </v-tabs>

      <v-window v-model="tab">
        <v-window-item value="one" class="my-10">
          <v-row justify="end" align="stretch">
            <v-col cols="12">
              <div class="text-h6 irsa font-weight-black rtl px-5"> جزئیات دوره </div>
            </v-col>
            <v-col cols="12" md="8">
              <v-card height="100%" color="grey4" class="   px-3 rounded-xl rtl " elevation="0">
                <div class="d-flex flex-no-wrap justify-space-between align-center fill-height">
                  <div>
                    <v-card-title class="irsa text-sm font-weight-black">
                      مهارت ها
                    </v-card-title>
                    <v-card-text>
                      <div class=" pa-4" v-if="data.skill && data.skill.length == 0">
                        مهارتی برای این آموزش ثبت نشده
                      </div>
                      <v-chip v-for="item in data.skill" :key="item.id + '+skill'" variant="flat" color="auto"
                        class="mx-2 my-2 px-8 shadow-2 font-weight-medium ">
                        {{ item.title }}
                      </v-chip>
                    </v-card-text>
                  </div>
                  <v-avatar class="ma-3  text-h6 rounded-pill " size="50" color="indigo">
                    <IconLockOpen class="fad fa-key text-auto"></IconLockOpen>
                  </v-avatar>
                </div>
              </v-card>
            </v-col>
            <v-col cols="12" md="4">
              <v-card class="bg-green-gradient text-auto px-3  rounded-xl rtl mb-4" elevation="0">
                <div class="d-flex flex-no-wrap justify-space-between align-center">
                  <div>
                    <v-card-title class="irsa text-sm font-weight-black ">
                      هزینه ی دوره
                    </v-card-title>
                    <div v-if="data.price != 0" class="d-flex align-center  pb-3 px-3">
                      <span v-if="data.discount == 0" class="pl-1">{{ data.price }}</span>
                      <span v-else class="px-1 ">

                        <div class=" text-xs  mt-n3 mb-n1">
                          <span class="text-decoration-line-through "> {{ data.price }}</span>

                        </div>
                        <div class="text-sm font-weight-bold">
                          {{ data.price - (data.price * data.discount / 100) }}
                        </div>
                      </span> <span class="    irsa text-xxs">تومان</span>
                    </div>
                    <div v-else class="text-sm px-4 pb-3 ">
                      رایگان

                    </div>
                  </div>

                  <v-avatar v-if="data.discount == 0" class="ma-3 text-h6  rounded-pill " size="50" variant="tonal"
                    color="auto">
                    <IconCoins />

                  </v-avatar>
                  <v-avatar v-else class="ma-3 text-h6  rounded-pill " size="50" variant="outline" color="auto">

                    <div class="pt-1">
                      {{ data.discount }}%
                    </div>
                  </v-avatar>
                </div>
              </v-card>
              <v-card class="bg-blue-circle text-auto  px-3 rounded-xl rtl mt-4  shadow-2" elevation="0">
                <div class="d-flex flex-no-wrap justify-space-between align-center">
                  <div>
                    <v-card-title class="text-sm irsa font-weight-black">
                      مدت زمان دوره
                    </v-card-title>
                    <v-card-text>{{ convertSeconds(data.duration) }} </v-card-text>
                  </div>
                  <v-avatar class="ma-3 text-h6  rounded-pill " variant="tonal" size="50" color="auto">
                    <IconClock class="fad fa-clock"></IconClock>
                  </v-avatar>
                </div>
              </v-card>
            </v-col>
          </v-row>
          <div v-if="data.teacher" class=" bg-grey4 py-8 mt-16     rounded-xl  px-3 rtl">

            <div class=" d-flex justify-space-between  align-center irsa font-weight-black rtl px-5 mb-10">
              مدرسان
              <v-avatar class="ma-3  text-h6 rounded-pill " size="50" color="blue">
                <IconUsers size="20" class=" text-auto"></IconUsers>
              </v-avatar>
            </div>
            <div class="line-height-sm text-body-2 rtl irsa pb-5 px-4    mt-5 ">

              <SharedTeacher v-if="data.teachers.length > 0" v-for="(item, index) in data.teachers"
                :key="index + 'teacher'" :data="item" />
              <SharedTeacher v-else :data="data.teacher" />

            </div>

          </div>

          <v-card color="grey4" v-if="data.description" class="   px-3 my-10 rounded-xl rtl py-10" elevation="0">
            <div class="d-flex flex-no-wrap justify-space-between align-center fill-height">
              <div>
                <v-card-title class="irsa text-sm font-weight-black">
                  توضیحات
                </v-card-title>
                <div class="line-height-sm text-body-2 rtl irsa pb-5 px-4    mt-5 ">
                  {{ data.description }}
                </div>
              </div>
              <v-avatar class="ma-3  text-h6 rounded-pill " size="50" color="blue">
                <IconPaperclip size="20" class="fad fa-key text-auto"></IconPaperclip>
              </v-avatar>
            </div>
          </v-card>

        </v-window-item>
        <v-window-item value="two">

          <v-card elevation="0" color="transparent" class=" mt-10 ">
            <div class="text-h6 irsa font-weight-black rtl pb-5 px-5 ">سر فصل های دوره </div>
            <v-alert v-if="data.session.length == 0" icon="fa fa-info" variant="text" color="blue"
              class="bg-grey5 rtl border-opacity-100  my-10" border="start">
              <div class=" text-body-2 font-weight-black irsa">
                سر فصلی وجود ندارد
              </div>

            </v-alert>
            <v-timeline side="end">
              <v-timeline-item size="small" v-for="item in data.session" dot-color="transparent"
                :key="item.id + '+session'">
                <template v-slot:icon>
                  <v-avatar class="bg-blue" size="30"></v-avatar>
                </template>
                <template v-slot:opposite>
                  <span class=" font-weight-bold"> {{ item.title }}</span>
                </template>
                <v-card elevation="0" class="rtl rounded-lg">
                  <v-card-text>{{ item.description }}</v-card-text>
                </v-card>
              </v-timeline-item>

            </v-timeline>
          </v-card>
        </v-window-item>
        <v-window-item value="three">

          <div class=" mt-10 py-8    rounded-xl bg-grey4 px-3 rtl">
            <div class="text-h6  d-flex justify-space-between  align-center  irsa font-weight-black rtl px-5 mb-10">دوره
              های
              پیشنیاز

              <v-avatar class=" text-h6  rounded-pill   " size="50" color="blue">
                <IconListCheck class="text-auto" />
              </v-avatar>
            </div>
            <YourCourseComponents v-if="data.prerequisite && data.prerequisite.length != 0" class="bg-auto mb-5"
              v-for="item in data.prerequisite" :progress="false" :data="item" />
            <v-alert v-if="data.prerequisite.length == 0" icon="fa fa-info" variant="text" color="blue"
              class=" rtl  my-10">
              <div class="pb-3 text-body-2 font-weight-black irsa">
                پیشنیازی وجود ندارد
              </div>

            </v-alert>
          </div>
        </v-window-item>
      </v-window>
      <v-card height="300" elevation="0" color="transparent">

      </v-card>
    </v-locale-provider>




  </v-container>
  <FooterComponent class="rounded-lg ma-3" />
</template>




<script>
import Course from '~/components/shared/Course.vue'
import axios from "axios";
import FooterComponent from "~/components/section/FooterComponent.vue";
import YourCourseComponents from "~/components/shared/YourCourse.vue";
import { IconUser, IconListCheck, IconCoins, IconClock, IconLockOpen, IconX, IconShare, IconEye, IconPaperclip, IconUsers } from '@tabler/icons-vue';


export default {
  setup() {
    definePageMeta({
      layout: "dashboard",
    })
  },
  head() {
    return {
      title: 'تدلاین'
    }
  },
  computed: {
    isAuthenticated() {
      return this.$store.state.isAuthenticated;
    }
  },
  components: {
    Course,
    FooterComponent,
    YourCourseComponents,
    IconPaperclip,
    IconUser, IconListCheck, IconCoins, IconClock,
    IconLockOpen, IconX, IconShare, IconEye, IconUsers

  },
  data: () => ({
    model: null,
    data: {},
    overlay: true,
    loading: true,
    snackbar: false,
    loadingRegister: false,
    dialog: true,
    tab: null,
    nextRegister: null,
    dialog_register: false,
    btn_discount_loading: false,
    discount_code: null,
    discount_amount: 0,
    snackbarDiscount: false,
    snackbarDiscountError: false,
    error_discount: '',
  }),
  methods: {
    async getData() {
      axios.get(`https://tedline.org/api/course/RetrieveCourses/${this.$route.params.id}/`, {
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
          Authorization: this.$store.state.token != ''
            ? `Token ${this.$store.state.token}`
            : ''
        },
      }).then((response) => {
        this.data = response.data
        this.loading = false
        if (this.nextRegister == 'true' && this.data.registered == false) {
          this.dialog_register = true
        }
      }
      )
    },

    copyToClipboard(textToCopy) {
      // navigator clipboard api needs a secure context (https)
      if (navigator.clipboard && window.isSecureContext) {
        // navigator clipboard api method'
        return navigator.clipboard.writeText(textToCopy);
      } else {
        // text area method
        let textArea = document.createElement("textarea");
        textArea.value = textToCopy;
        // make the textarea out of viewport
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        textArea.style.top = "-999999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        return new Promise((res, rej) => {
          // here the magic happens
          document.execCommand("copy") ? res() : rej();
          textArea.remove();
        });
      }
    },
    convertSeconds(inputMinute) {
      let totalSeconds = parseInt(inputMinute) * 60;
      let hours = Math.floor(totalSeconds / 3600);
      totalSeconds %= 3600;
      let minutes = Math.floor(totalSeconds / 60);
      let seconds = totalSeconds % 60;
      return `${hours}:${minutes}`
    },
    registerFree() {
      this.loadingRegister = true
      if (this.$store.state.isAuthenticated != true) {
        this.$router.push(`/auth/signIn/`)
      } else {
        axios.get(`https://tedline.org/api/course/RegisterCourseFree/${this.$route.params.id}/`, {
          headers: {
            "Content-type": "application/json",
            Accept: "application/json",
            Authorization: `Token ${this.$store.state.token}`
          },
        }).then((response) => {
          this.$router.push(`/course/learn/${this.data.id}/${this.data.session[0].id}`)
        }

        )
      }

    },
    async registerCredit() {
      if (this.amount < 10000) {
        this.amountError = true;
        return;
      } else {
        if (this.amountError != false) {
          this.amountError = false;
        }
      }

      this.loading = true;
      this.loadingRegister = true

      await fetch(`https://tedline.org/api/wallet/increase-money/`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
          Authorization:
            this.$store.state.token != ""
              ? `Token ${this.$store.state.token}`
              : "",
        },
        body: JSON.stringify({
          course_id: this.$route.params.id,
          discount_code: this.discount_code
        }),
      })
        .then((response) => {

          if (response.status == 200) {
            return response.json();
          } else {
            // Handle error

            if (this.discount_code != null && this.discount_code != '') this.checkDiscountCode()

          }
        })
        .then((data) => {

          window.location.href = data["result"]
        });

    },
    shareLink() {
      this.copyToClipboard(`https://tedline.org/course/${this.$route.params.id}/`)
      this.snackbar = true
    },
    checkDiscountCode() {

      this.btn_discount_loading = true
      const apiUrl = `https://tedline.org/api/course/check-valid-product-discount/${this.discount_code}/${this.$route.params.id}/`;
      axios.get(apiUrl, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Accept: "application/json",
          Authorization: `Token ${this.$store.state.token}`
        },
      }).then(response => {
        console.log('discount', response.data);
        if (response.data.valid) {
          if (response.data.is_percentage) {
            this.discount_amount = (this.data.price - (this.data.price * this.data.discount / 100)) * (response.data.amount / 100)
          } else {
            this.discount_amount = response.data.amount
          }
          this.snackbarDiscount = true
        } else {

          this.error_discount = 'کد تخفیف معتبر نیست'
          this.snackbarDiscountError = true
        }
        console.log('amount', this.discount_amount, this.product);
        this.btn_discount_loading = false
      }).catch(error => {
        // Handle error response
        this.snackbarDiscountError = true

        this.error_discount = 'مشکلی پیش‌آمده'
      });
    },
  }, async mounted() {
    if (this.$route.query.register != null) this.nextRegister = this.$route.query.register
    await this.$store.commit('onStart') // get token

    await this.getData()



  }
}
</script>

<style lang="scss">
:root {
  --dialog-xpos: -10px;
  --dialog-ypos: 0px;

  @media (max-width: 1290px) {
    --dialog-ypos: 60px;

  }
}

.position-dialog-b-l .v-overlay__content {
  bottom: var(--dialog-ypos);
  right: var(--dialog-xpos);
}
</style>