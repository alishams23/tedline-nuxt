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
  <div class="d-flex h-100 justify-center align-center" v-if="loading">
    <v-progress-circular :size="60" class="ma-10" bg-color="transparent" :width="6" color="blue"
      indeterminate></v-progress-circular>
  </div>

  <v-container v-if="loading == false">
 
    <v-img v-if="loading == false" class="rounded-xl mt-10 " rounded="xl" :aspect-ratio="30 / 9" cover
    :src="data.image">
    
    <div class="h-100  w-100 rounded-xl d-flex align-end">
      <div class="bg-gradient-glass h-100 d-flex flex-column justify-end px-md-5 pt-16 py-md-5 w-100 ">
        <v-container>
          <h1 class=' text-h6 text-white text-md-h5 font-weight-black irsa rtl px-4 py-5 py-md-10'>
            {{ data.title }}
          </h1>
     
          <div  class="d-flex justify-end">
            <v-card  color="transparent" class="rtl     " elevation="0"
          >
            <v-list-item class=" px-0 text-center ">
             
              <v-list-item-title v-if="data.price != 0 " class=" font-weight-bold text-md-1 text-white"> {{ data.price - (data.price * data.discount / 100) }}</v-list-item-title>
              <v-list-item-title v-else class=" font-weight-bold text-md-1 text-white"> رایگان</v-list-item-title>
              <v-list-item-subtitle class="text-xs mt-2 text-white d-flex align-center ">
                <div class="mx-1">قیمت</div>
                <IconCoins size="15" />
              </v-list-item-subtitle>
            </v-list-item>

          </v-card>
            <div class="my-4 mx-8   bg-grey " style="padding-left: 0.5px;"></div>

            <v-card v-if="data.teacher" color="transparent" class="rtl     " elevation="0"
              :to="'/profile/' + data.teacher.username">
              <v-list-item class=" px-0 m ">
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
          <v-row class="pt-10 pb-3 rtl" v-if="data.session.length != 0" >
            <v-btn v-if="data.registered == false" variant="flat" size="large" @click="register"
            :loading="loadingRegister" color="blue-accent-4" elevation="0"
            class=" px-10 px-16 mb-3 mx-3 mx-2 bg-blue-gradient-3 text-body-2 " rounded="xl">
            ثبت نام
          </v-btn>
          <div class="d-flex">
            <v-btn :variant="data.registered == false ? 'text' : 'flat'" size="large"
            :to="`/course/learn/${data.id}/${data.session[0].id}`" color="blue"
            :class="data.registered == false ? '' : 'bg-blue-gradient-3'" elevation="0"
            class="rounded-pill mx-2  text-body-2  ">
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
              <v-alert variant="tonal" border="start" v-if="data.session.length == 0" class="text-white rtl mt-5 text-xs">
                دوره در حال اپدیت است.
            </v-alert>
            </div>
          </div>
        </v-container>
      </div>
    </div>
    

  </v-img>

    <v-dialog :open-delay="4000" transition="dialog-bottom-transition" v-model="dialog" :scrim="false" persistent
      class="position-dialog-b-l" width="auto" location="top" scroll-strategy="none">
      <v-alert variant="text" color="blue-accent-4" v-if="data.registered == true"
        class="rtl rounded-lg bg-auto shadow-3   border-opacity-100   my-2" border="start">
        <div class="d-flex align-center">
          <div class="text-nauto   text-body-2 irsa">
            شما در این دوره ثبت نام کرده اید
          </div>
          <v-avatar color="blue" size="25" variant="tonal" @click="dialog = false" class="mr-4">
            <IconX size="15" />
          </v-avatar>

        </div>
        <v-btn variant="flat" size="small" :to="`/course/learn/${data.id}/${data.session[0].id}`"
          color="blue-accent-4 mt-4" rounded="xl" elevation="0" class=" text-xs  px-5 rounded-xl ">
          مشاهده ی دروس
        </v-btn>
      </v-alert>

    </v-dialog>

    <v-locale-provider rtl>

      <v-tabs v-model="tab" class="  border-b  mt-10 " elevation="0">
        <v-tab color="blue" class="px-5 px-md-10   transition-inactive-class rounded-t-lg text-xs " variant="text" :ripple="false"
          value="one">
          <div :class="tab == 'one' ? 'text-nauto font-weight-bold  ' : ' font-weight-light text-nauto'">
            جزيیات دوره
            <v-icon :color="tab == 'one' ? 'blue' : 'grey2'" size="13" class="ps-5">{{ tab == 'one' ? 'fad' : 'fa' }}
              fa-list</v-icon>
          </div>
        </v-tab>
        <v-tab color="blue" class="px-5 px-md-10 transition-inactive-class rounded-t-lg text-xs " variant="text" :ripple="false"
          value="two">
          <div :class="tab == 'two' ? 'text-nauto font-weight-bold  ' : ' font-weight-light text-nauto'">
            سرفصل ها
            <v-icon :color="tab == 'two' ? 'blue' : 'grey2'" size="13" class="ps-5">{{ tab == 'two' ? 'fad' : 'fa' }}
              fa-check</v-icon>

          </div>
        </v-tab>
        <v-tab color="blue" class="px-5 px-md-10 transition-inactive-class rounded-t-lg text-xs " variant="text" :ripple="false"
          value="three">
          <div :class="tab == 'three' ? 'text-nauto font-weight-bold  ' : ' font-weight-light text-nauto'">
            پیشنیاز ها
            <v-icon :color="tab == 'three' ? 'blue' : 'grey2'" size="13" class="ps-5">{{ tab == 'three' ? 'fad' : 'fa' }}
              fa-check</v-icon>

          </div>
        </v-tab>

      </v-tabs>

      <v-window v-model="tab" >
        <v-window-item value="one" class="my-10">
          <v-row justify="end" align="stretch">
            <v-col cols="12">
              <div class="text-h6 irsa font-weight-black rtl px-5"> جزئیات دوره </div>
            </v-col>
            <v-col cols="12" md="8">
              <v-card height="100%" color="grey4" class="inner-shadow-1 px-3 rounded-xl rtl " elevation="0">
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
                    <v-card-text v-if="data.price != 0">{{ data.price - (data.price * data.discount / 100)  }} تومان</v-card-text>
                    <v-card-text v-else>رایگان</v-card-text>
                  </div>
                  <v-avatar class="ma-3 text-h6  rounded-pill " size="50" variant="tonal" color="auto">
                    <IconCoins />
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
          <v-card color="grey4" v-if="data.description" class="inner-shadow-1 px-3 my-10 rounded-xl rtl py-10" elevation="0">
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
                <IconPaperclip class="fad fa-key text-auto"></IconPaperclip>
              </v-avatar>
            </div>
          </v-card>
          <div class="py-8 mt-16  inner-shadow-1 rounded-xl  px-3 rtl" v-if="data.teacher && data.teacher.bio">
            <div class="text-h6 d-flex justify-space-between  align-center irsa font-weight-black rtl px-5 mb-10"> مدرس

              <v-avatar class=" text-h6  rounded-pill inner-shadow-1" size="50" color="green">
                <IconUser class="text-auto" />
              </v-avatar>
            </div>
            <v-card class=" rounded-xl  ma-4 bg-auto inner-shadow-1   " elevation="0"
              :to="'/profile/' + data.teacher.username">
              <v-list-item class="  pa-4 pe-4">
                <template v-slot:prepend>
                  <v-avatar size="43" class="bg-blue-gradient text-white">
                    <v-icon size="15" class="position-absolute" icon="fad fa-users"></v-icon>
                    <v-img :src="`https://tedline.org/api/account/user_profile_image/${data.teacher.username}`"
                      cover></v-img>

                  </v-avatar>
                </template>
                <v-list-item-title class=" font-weight-bold text-xs text-nauto">{{ data.teacher.username
                }}</v-list-item-title>
                <v-list-item-subtitle class="text-xs-2 text-nauto">{{ data.teacher.get_full_name }}</v-list-item-subtitle>
              </v-list-item>
              <v-card-text class="rtl text-nauto text-xs irsa" v-if="data.teacher.bio">{{ data.teacher.bio
              }}</v-card-text>
            </v-card>
          </div>
        </v-window-item>
        <v-window-item value="two" >
         
          <v-card elevation="0" color="transparent"  class=" mt-10 ">
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
                  <v-avatar class="bg-blue-gradient-2" size="30"></v-avatar>
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
        
          <div class=" mt-10 py-8 inner-shadow-1 rounded-xl bg-grey4 px-3 rtl"
           >
            <div class="text-h6  d-flex justify-space-between  align-center  irsa font-weight-black rtl px-5 mb-10">دوره
              های
              پیشنیاز

              <v-avatar  class=" text-h6  rounded-pill inner-shadow-1" size="50" color="blue">
                <IconListCheck class="text-auto" />
              </v-avatar>
            </div>
            <YourCourseComponents  v-if="data.prerequisite && data.prerequisite.length != 0" class="bg-auto mb-5" v-for="item in data.prerequisite" :progress="false" :data="item" />
            <v-alert v-if="data.prerequisite.length == 0" icon="fa fa-info" variant="text" color="blue"
            class="bg-grey5 rtl border-opacity-100  my-10" border="start">
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
  <FooterComponent />
</template>




<script >
import Course from '~/components/shared/Course.vue'
import axios from "axios";
import FooterComponent from "~/components/section/FooterComponent.vue";
import YourCourseComponents from "~/components/shared/YourCourse.vue";
import { IconUser, IconListCheck, IconCoins, IconClock, IconLockOpen, IconX, IconShare, IconEye,IconPaperclip } from '@tabler/icons-vue';


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
  components: {
    Course,
    FooterComponent,
    YourCourseComponents,
    IconPaperclip,
    IconUser, IconListCheck, IconCoins, IconClock,
    IconLockOpen, IconX, IconShare, IconEye

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
  }),
  methods: {
    getData() {
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
    register() {
      if (this.data.price > 0) {
        this.registerCredit()
      } else {
        this.registerFree()
      }
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
          course_id: this.$route.params.id
        }),
      })
        .then((response) => {
          console.log('ddd')

          if (response.status == 200) {
            return response.json();
          } else {
            // Handle error
            console.log('ddd')

          }
        })
        .then((data) => {

          window.location.href = data["result"]
        });
      this.loading = false;
    },
    shareLink() {
      this.copyToClipboard(`https://tedline.org/course/${this.$route.params.id}/`)
      this.snackbar = true
    },
  }, async mounted() {
    await this.$store.commit('onStart') // get token

    this.getData()
    setTimeout(() => (this.dialog = false), 6000)
  }
}
</script>

<style lang="scss">:root {
  --dialog-xpos: -10px;
  --dialog-ypos: 0px;

  @media (max-width: 1290px) {
    --dialog-ypos: 60px;

  }
}

.position-dialog-b-l .v-overlay__content {
  bottom: var(--dialog-ypos);
  right: var(--dialog-xpos);
}</style>