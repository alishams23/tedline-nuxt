<template>
  <div class="d-flex justify-center">
    <v-progress-circular
      v-if="loading"
      :size="55"
      class="ma-10"
      bg-color="grey4"
      :width="7"
      color="blue"
      indeterminate
    ></v-progress-circular>
  </div>
  <v-container v-if="loading == false">
    <v-list-item class="mb-5 mt-3 rounded-lg rtl">
      <template v-slot:prepend>
        <v-avatar size="x-large" rounded="lg" color="blue">
          <v-icon color="auto"> fad fa-video</v-icon>
        </v-avatar>
      </template>
      <template v-slot:title>
        <div class="font-weight-bold">ویدئو</div>
      </template>
      <template v-slot:append>
        <v-btn
          :to="`/course/learn/${$route.params.id}/${$route.params.session}/`"
          icon="fal fa-arrow-left"
          rounded="xl"
          variant="flat" >
        </v-btn>
      </template>
    </v-list-item>
    <div>
      <v-sheet rounded="xl">
        <video-player
          @seeking="seeking"
          :src="`${videoUrl}/${$route.params.id}/${$route.params.box}/?token=${$store.state.token}#.mp4`"
          data-type="video/mp4"
          controls
          oncontextmenu="return false;"
          :loop="true"
          @mounted="update"
          :responsive="true"
          :fluid="true"
          :playbackRates="[0.5, 1, 1.5, 2]"
          :volume="0.6"
        >
          <template v-if="state" v-slot="{ player, state }">
            <!-- overlay for show user -->
           
            <v-overlay
              :scrim="false"
              :no-click-animation="true"
              contained
              :persistent="true"
              v-if="state.playing == true"
              class="d-flex  align-start my-overlay  mt-20"
              v-model="show_user"
            >
              <div class="d-flex align-center"
              :class="position_show_user == 1 ? 'justify-end ' : position_show_user == 2  ?  'justify-start'  : 'justify-center'"
              
              >
                <v-card
                  color="transparent"
                  class="bg-glass-black px-1 d-flex align-center justify-center"
                  height="100%"
                  rounded="xl"
                >

                  <v-avatar color="blue" variant="tonal" >
                    <IconUser size="15"/> </v-avatar>
                  <v-card-title class="px-5 text-body-2">
                    {{ username }}
                  </v-card-title>
                </v-card>
              </div>
            </v-overlay>

            {{ dialog == true ? player.pause() : "" }}
            <div v-if="data" v-for="item in data.quiz">
              {{
                showDialog(Math.floor(state.currentTime), item.time) == null
                  ? ""
                  : ""
              }}
              <v-overlay
                contained
                :persistent="true"
                v-model="dialog"
                class="d-flex justify-center align-center my-overlay"
              >
                <v-card width="100%" height="100%" rounded="lg">
                  <v-btn
                    color="primary"
                    class="mt-4 mx-4 mb-0"
                    variant="tonal"
                    @click="
                      dialog = false;
                      player.play();
                      lastQuiz = Math.floor(state.currentTime);
                    "
                    icon=""
                  >
                    <IconX />
                  </v-btn>
                  <v-card-text>
                    <QuizMovie :idVideo="data.id" :data="item.quiz" />
                  </v-card-text>
                </v-card>
              </v-overlay>
            </div>
          </template>
        </video-player>
      </v-sheet>
    </div>
  </v-container>
</template>

<script>
import "~/assets/styles/video.css";
import axios from "axios";
import QuizMovie from "~/components/section/QuizMovie.vue";
import { IconX } from "@tabler/icons-vue";
import { IconUser } from '@tabler/icons-vue';

export default {
  setup() {
    definePageMeta({
      layout: "dashboard",
    });
  },
  components: { IconX, QuizMovie,IconUser },
  data() {
    return {
      videoUrl: "http://127.0.0.1:8000/api/box/video/stream_video",
      state: null,
      data: null,
      loading: true,
      dialog: false,
      lastQuiz: null,
      show_user: false,
      username: null,
      interval_show_user : null,
      position_show_user : 1,
    };
  },
  async mounted() {
    await this.$store.commit("onStart");
    this.username = this.$store.state.username;
    this.getData();
    document.addEventListener("contextmenu", function (e) {
      e.preventDefault();
    });
    // Prevent F12 key from opening developer tools

    document.addEventListener("keydown", function (e) {
      if (e.keyCode == 123 /* F12 */) {
        e.preventDefault();
      }
    });
  },

  methods: {
    showDialog(current, time) {
      if (current == time && this.lastQuiz != time) {
        this.dialog = true;
        this.lastQuiz = time;
        return true;
      } else {
        return false;
      }
    },
    seeking() {
      // when user jump to new time of movie
      // last quiz can appear again
      this.lastQuiz = null;
    },
    update(data) {
      this.state = data.state;
    },
    getRandomInt(max) {
      return Math.floor(Math.random() * max);
    },
    getData() {
      
      axios
        .get(
          `http://127.0.0.1:8000/api/box/video/retrieve-video/${this.$route.params.box}/`,
          {
            headers: {
              "Content-type": "application/json",
              Accept: "application/json",
              Authorization:
                this.$store.state.token != ""
                  ? `Token ${this.$store.state.token}`
                  : "",
            },
          }
        )
        .then((response) => {
          this.loading = false;
          this.data = response.data;
          this.show_user = response.data.show_user
          // change position of show_user each 10 sec
          if (this.show_user == true) this.interval_show_user =  setInterval(() => {
              this.position_show_user =   this.getRandomInt(3)
              }, 10000);
            })

    },
  },
};
</script>

<style scoped>
.my-overlay :deep(.v-overlay__content) {
  width: 100%;
  padding: 20px;
}
</style>
