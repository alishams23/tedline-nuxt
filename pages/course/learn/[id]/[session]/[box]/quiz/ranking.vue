<template>
    <v-container class="position-relative">
      <v-row justify="center">
        <v-col cols="12" sm="12" md="8">
          <div dir="rtl">
            <h1 class="mb-3">رویداد های ما</h1>
            <v-img
              rounded="lg"
              width="100%"
              height="200"
              cover
              aspect-ratio="16/9"
              src="https://img.freepik.com/free-vector/recruitment-isometric-composition-with-images-different-office-rooms-infographic-text-captions-available-editing-illustration_1284-29101.jpg?t=st=1726852469~exp=1726856069~hmac=dfb3bc638720500c1bd509703fd7f1fbd59ca8a42df530aa35fd11ccc37b449e&w=1380"
            ></v-img>
          </div>
        </v-col>
      </v-row>
      <v-row v-if="loading == true" align="center" justify="center">
        <v-col cols="12" sm="12" md="8">
          <v-card class="d-flex justify-center align-center px-8 py-8">
            <v-progress-circular
              color="primary"
              indeterminate
              :size="87"
              :width="7"
            ></v-progress-circular>
          </v-card>
        </v-col>
      </v-row>
      <v-row v-if="loading == false" justify="center" class="mt-5">
        <v-col cols="12" sm="12" md="8">
          <div dir="rtl" class="d-flex justify-space-between">
            <h1 class="mb-4">برترین نمرات</h1>
            <v-icon
              style="margin-top: 6px"
              size="x-large"
              icon="mdi-dots-horizontal"
            >
            </v-icon>
          </div>
          <div class="mt-6 d-flex justify-center">
            <div
              style="margin-top: 31px; margin-right: 35px"
              class="d-flex flex-column align-center position-relative"
            >
              <v-avatar
                class="avatar_border"
                :image="data.ranking[1].user.image"
                :size="avatarSize"
              ></v-avatar>
              <v-sheet
                rounded="circle"
                color="light-blue-darken-1"
                width="29"
                height="29"
                class="d-flex justify-center align-center"
                style="
                  position: absolute;
                  top: 0;
                  right: 0;
                  transform: translate(11%, -15%);
                "
                ><span class="text-body-1 text-white font-weight-bold"
                  >2</span
                ></v-sheet
              >
              <span class="text-body-1 text-md-h6 font-weight-bold mt-2">{{
                data.ranking[1].user.first_name
              }}</span>
              <span class="text-body-1 text-grey-darken-2 mt-1"
                >{{ parseFloat(data.ranking[1].final_score) }}%</span
              >
            </div>
            <div class="d-flex flex-column align-center position-relative">
              <v-avatar
                class="avatar_border"
                :image="data.ranking[0].user.image"
                :size="rankOneAvatarSize"
              ></v-avatar>
              <v-sheet
                rounded="circle"
                color="orange-darken-1"
                width="32"
                height="32"
                class="d-flex justify-center align-center"
                style="
                  position: absolute;
                  top: 0;
                  right: 0;
                  transform: translate(16%, -13%);
                "
                ><span class="text-h6 font-weight-bold">1</span></v-sheet
              >
              <span class="text-h6 font-weight-bold mt-2">{{
                data.ranking[0].user.first_name
              }}</span>
              <span class="text-body-1 text-grey-darken-2 mt-1"
                >{{ parseFloat(data.ranking[0].final_score) }}%</span
              >
            </div>
            <div
              style="margin-top: 33px; margin-left: 35px"
              class="d-flex flex-column align-center position-relative"
            >
              <v-avatar
                class="avatar_border"
                :image="data.ranking[2].user.image"
                :size="avatarSize"
              ></v-avatar>
              <v-sheet
                rounded="circle"
                color="deep-purple-darken-1"
                width="29"
                height="29"
                class="d-flex justify-center align-center"
                style="
                  position: absolute;
                  top: 0;
                  right: 0;
                  transform: translate(11%, -15%);
                "
                ><span class="text-body-1 text-white font-weight-bold"
                  >3</span
                ></v-sheet
              >
              <span class="text-body-1 text-md-h6 font-weight-bold mt-2">{{
                data.ranking[2].user.first_name
              }}</span>
              <span class="text-body-1 text-grey-darken-2 mt-1"
                >{{ parseFloat(data.ranking[2].final_score) }}%</span
              >
            </div>
          </div>
          <div dir="rtl" class="mt-8">
            <div class="w-100">
              <div class="w-100">
                <div
                  v-for="item in data.ranking"
                  class="d-flex align-center w-100 position-relative"
                  :key="item.id + '-rank '"
                >
                  <div v-show="item.id === 3" class="sidebar"></div>
                  <div
                    class="ml-5 my-5 text-h6 font-weight-bold"
                    :class="item.id === 3 ? 'mr-10' : 'mr-11'"
                  >
                    {{ item.rank }}
                  </div>
                  <div class="ml-4">
                    <v-avatar size="45" :image="item.user.image"></v-avatar>
                  </div>
                  <div class="text-h6 font-weight-bold">
                    {{ item.user.first_name }}
                  </div>
                  <div
                    style="margin-right: 0"
                    class="text-body-1 text-grey-darken-2 position-absolute left-0"
                  >
                    {{ parseFloat(item.final_score) }}%
                  </div>
                </div>
              </div>
            </div>
          </div>
        </v-col>
        <v-sheet
          dir="rtl"
          class="d-flex align-center px-5 py-5 position"
          rounded="lg"
          elevation="1"
        >
          <div class="ml-5">
            <span class="text-h6 font-weight-bold">{{
              data.user_rank.rank
            }}</span>
          </div>
          <div>
            <v-avatar size="50" :image="data.user_rank.user.image"></v-avatar>
          </div>
          <div class="mr-5">
            <span class="text-h6 font-weight-bold">{{
              data.user_rank.user.first_name
            }}</span>
          </div>
          <div class="w-100 d-flex justify-end">
            <span style="" class="text-body-1 text-grey-darken-2"
              >{{ parseFloat(data.user_rank.final_score) }}%</span
            >
          </div>
        </v-sheet>
      </v-row>
    </v-container>
  </template>
  <script>
  import axios from "axios";
  
  export default {
    data() {
      return {
        data: {},
        loading: true,
        userId: null,
        avatarSize: 75,
        rankOneAvatarSize: 100,
      };
    },
    methods: {
      getData() {
        this.loading = true;
        axios
          .get(`https://tedline.org/api/quiz/ranking-quiz/${this.$route.params.box}`, {
            headers: {
              Authorization: "Token f9c8de8fc98c8cf9a836eb7aa99e5d654a8aab25",
            },
          })
          .then((response) => {
            this.data = response.data;
            this.loading = false;
            console.log("data: ", this.data);
          })
          .catch((error) => {
            console.error(error);
          });
      },
      getAvatarSize() {
        const width = window.innerWidth;
        let avatarSize, rankOneAvatarSize;
        if (width < 600) {
          avatarSize = 75;
          rankOneAvatarSize = 100;
        } else if (width < 900) {
          avatarSize = 75;
          rankOneAvatarSize = 100;
        } else {
          avatarSize = 100;
          rankOneAvatarSize = 125;
        }
        return { avatarSize, rankOneAvatarSize };
      },
      onResize() {
        const sizes = this.getAvatarSize();
        this.avatarSize = sizes.avatarSize;
        this.rankOneAvatarSize = sizes.rankOneAvatarSize;
      },
    },
    mounted() {
      this.getData();
      const sizes = this.getAvatarSize();
      this.avatarSize = sizes.avatarSize;
      this.rankOneAvatarSize = sizes.rankOneAvatarSize;
      window.addEventListener("resize", this.onResize);
    },
    beforeDestroy() {
      window.removeEventListener("resize", this.onResize);
    },
  };
  </script>
  <style>
  .avatar_border {
    border: 6px solid rgba(0, 0, 0, 0.1);
  }
  .sidebar {
    background-color: #007bff; /* آبی پررنگ سمت چپ */
    width: 5px;
    height: 72px;
    border-radius: 5px 0 0 5px;
    margin: 0;
  }
  .position {
    position: fixed;
    width: 100%;
    bottom: 0;
    right: 0;
    z-index: 10;
  }
  @media (min-width: 576px) {
    .position {
      position: fixed;
      bottom: 20px;
      right: 25px;
      z-index: 10;
      width: 300px;
    }
  }
  </style>
  