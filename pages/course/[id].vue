<template>
  <Navbar />
  <v-snackbar v-model="snackbar" class="rtl" color="blue-darken-4" elevation="24" rounded="lg">
    <template v-slot:actions>
      <v-btn color="white" variant="text" icon="fal fa-times" @click="snackbar = false">
      </v-btn>
    </template>
    کپی شد
  </v-snackbar>
  <div class="d-flex h-100 justify-center align-center" v-if="loading">
    <v-progress-circular :size="60" class="ma-10" :width="8" color="blue" indeterminate></v-progress-circular>
  </div>
  <v-container v-if="loading == false">

    <v-row>
      <v-col cols="12" md="7" class="">

        <v-img class="rounded-xl mt-12" :aspect-ratio="16 / 9" cover :src="data.image"></v-img>
        <v-list-item class="rounded-xl mb-lg-12 mt-2" v-if="data.teacher">
          <template v-slot:prepend>
            <v-avatar size="x-large" color="blue-grey-darken-4" :image="data.teacher.image">
              <v-icon size="small" icon="fad fa-users"></v-icon>
            </v-avatar>
          </template>
          <v-list-item-title class=" font-weight-bold">{{ data.teacher.username }}</v-list-item-title>
          <v-list-item-subtitle class="text-xs">{{ data.teacher.get_full_name }}</v-list-item-subtitle>
        </v-list-item>

      </v-col>
      <v-col cols="12" md="5" class="pt-lg-10 pt-sm-1 px-lg-12">
        <h1 class=' text-h6 font-weight-black irsa rtl py-5'>
          {{ data.title }}
        </h1>
        <v-divider>
        </v-divider>
        <p class="rtl  font-weight-light py-8">
          {{ data.description }}
        </p>
        <v-alert
        icon="fa fa-info"
        variant="tonal"
        type="info"
        v-if="data.registered == true"
        class="rtl border-opacity-100  my-2"
        border="start"
        >
          شما در این دوره ثبت نام کرده اید
        </v-alert>
        <v-row class="py-10 ">
          <v-col>
            <v-btn variant="flat" @click="register" :loading="loadingRegister" color="blue-accent-4" rounded="xl"
              elevation="0" class="w-100" v-if="data.registered == false">
              ثبت نام
            </v-btn>
            <v-btn variant="flat" :to="`/course/learn/${data.id}/${data.session[0].id}`" color="blue-accent-4"
              rounded="xl" elevation="0" class="w-100" v-if="data.registered == true">
              مشاهده ی دوره
            </v-btn>
          </v-col>
          <v-col>

            <v-btn @click="shareLink()" variant="text" append-icon="fal fa-external-link" color="black" rounded="xl"
              elevation="0" class="w-100">
              <div class="px-2">اشتراک گذاری</div>
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <v-row justify="end" align="stretch" class="mb-12">
      <v-col cols="12">
        <div class="text-h6 irsa font-weight-black rtl px-5"> جزئیات دوره </div>

      </v-col>
      <v-col cols="12" md="8">
        <v-card height="100%" color="grey-lighten-4" class="custom-rounded-1 rtl " elevation="0">
          <div class="d-flex flex-no-wrap justify-space-between align-center fill-height">
            <div>
              <v-card-title class="irsa text-sm font-weight-black">
                مهارت هایی که کسب میکنید
              </v-card-title>
              <v-card-text>
                <v-alert icon="fa fa-info" v-if="data.skill && data.skill.length == 0" border="start" variant="text"
                  class="border-opacity-100 bg-grey-lighten-3 font-weight-bold" color="black">
                  <div class="text-black">
                    مهارتی برای این آموزش ثبت نشده
                  </div>
                </v-alert>
                <v-chip v-for="item in data.skill" :key="item.id + '+skill'" variant="flat" color="white"
                  class="mx-2 my-2 px-8 shadow-2 font-weight-medium ">
                  {{ item.title }}
                </v-chip>
              </v-card-text>
            </div>
            <v-avatar class="ma-3 text-h6 rounded-pill " size="50" color="indigo-darken-3">
              <i class="fad fa-key"></i>
            </v-avatar>
          </div>

        </v-card>


      </v-col>
      <v-col cols="12" md="4">
        <v-card color="#008000" class=" text-white custom-rounded-1 rtl mb-4" elevation="0">
          <div class="d-flex flex-no-wrap justify-space-between align-center">
            <div>
              <v-card-title class="irsa text-sm font-weight-black">
                هزینه ی دوره
              </v-card-title>
              <v-card-text>{{ data.price }} تومان</v-card-text>
            </div>
            <v-avatar class="ma-3 text-h6 text-teal-darken-2 rounded-pill " size="50" color="white">
              <i class="fad fa-money-bill shadow-2"></i>
            </v-avatar>
          </div>
        </v-card>
        <v-card color="blue-accent-4" class="custom-rounded-1 rtl mt-4" elevation="0">
          <div class="d-flex flex-no-wrap justify-space-between align-center">
            <div>
              <v-card-title class="text-sm irsa font-weight-black">
                مدت زمان دوره
              </v-card-title>
              <v-card-text>{{ data.duration }} دقیقه</v-card-text>
            </div>
            <v-avatar class="ma-3 text-h6 text-blue-accent-4 rounded-pill " size="50" color="white">
              <i class="fad fa-clock"></i>
            </v-avatar>
          </div>
        </v-card>
      </v-col>
    </v-row>
    <div class="py-12 mt-12">
      <div class="text-h6 irsa font-weight-black rtl px-5 mb-10">سر فصل های دوره </div>
      <v-timeline side="start">
        <v-timeline-item size="large" v-for="item in data.session" :key="item.id + '+session'">
          <template v-slot:icon>
            <v-avatar color="white" size="20"></v-avatar>
          </template>
          <template v-slot:opposite>
            <span class=" font-weight-bold"> {{ item.title }}</span>
          </template>
          <v-card elevation="0" class="rtl rounded-lg">
            <v-card-text>{{ item.description }}</v-card-text>
          </v-card>
        </v-timeline-item>

      </v-timeline>
    </div>
  </v-container>
  <FooterComponent />
</template>




<script >
import Course from '~/components/shared/Course.vue'
import axios from "axios";
import FooterComponent from "~/components/section/FooterComponent.vue";


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
    FooterComponent

  },
  data: () => ({
    model: null,
    data: {},
    loading: true,
    snackbar: false,
    loadingRegister: false,
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
    register() {
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
    shareLink() {
      this.copyToClipboard(`https://tedline.org/course/${this.$route.params.id}/`)
      this.snackbar = true
    },
  }, async mounted() {
    await this.$store.commit('onStart') // get token

    this.getData()
  }
}
</script>