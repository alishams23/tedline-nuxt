<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="9">
        <form class="px-3" @submit.prevent="sendData" enctype="multipart/form-data">
          <v-locale-provider rtl>
            <div class="mt-3 mb-5">
              <v-text-field label="تیتر مقاله" v-model="title" rounded="lg" required persistent-hint variant="outlined"
                color="primary" class="mt-10" />
            </div>
          </v-locale-provider>
          <TextEditor @update="handleTextChange"></TextEditor>
          <v-locale-provider rtl>
            <div class="my-4">
              <div>دسته بندی</div>
            </div>
            <div>
              <v-autocomplete label="دسته بندی‌ها" rounded="lg" persistent-hint variant="outlined" color="primary"
                clearable chips v-model="selectedCategories" :items="categories" item-text="name" item-value="id"
                multiple>
              </v-autocomplete>
            </div>
            <div class="my-4">
              <div>انتخاب عکس مقاله</div>
            </div>
            <div>
              <v-file-input @change="changeImage" rounded="lg" accept=".png,.jpg" persistent-hint required
                variant="outlined" color="primary" v-model="photo" placeholder="Upload your documents"
                label="عکس‌های هدر">
                <template v-slot:prepend>
                  <IconPhoto style="margin-left: -20px;" class="text-grey" />
                </template>
              </v-file-input>
              <div class="image-preview-container">
                <template v-for="(preview, index) in imagePreviews" :key="index">
                  <img :src="preview" class="chip-image-preview" />

                </template>
              </div>
            </div>
            <p class="text-danger rtl pt-3">
              {{ error }}
            </p>
            <div class="d-flex rtl m-3 mt-5">
              <v-btn rounded="lg" persistent-hint variant="flat" color="primary"
                class="mx-2 px-10 text-body2 font-weight-bold mb-5" type="submit">
                افزودن
              </v-btn>
            </div>
          </v-locale-provider>
        </form>
      </v-col>
    </v-row>
  </v-container>
  
</template>
  
<script>

import TextEditor from '@/components/shared/TextEditor.vue';

import axios from "axios";
import { IconPhoto, } from '@tabler/icons-vue';

  
  export default {
    components: {
        TextEditor,
        IconPhoto
    },
    data() {
      return {
        loading: false,
        photo: null,
        title: "",
        error: "",
        body: "",
        imageId: null,
        fd: null,
        editorOptions: {
          theme: "snow",
     
        },
      };
    },
    methods: {
        handleTextChange(newText) {
    this.body = newText;
   
  },
      async sendData() {
        if (
          this.body == null ||
          this.body == "" 
        ) {
          this.error = "لطفا همه ی مقادیر را وارد کنید ";
          return 0;
        }
        this.loading = true;
        this.fd = new FormData();
        this.fd.append("photo", this.photo[0]);
        this.fd.append("title_for_photo", this.title);
        console.log(this.photo)
        await axios
          .post(
            `https://tedline.org/api/blog/CreateImage/`,
            this.fd,
  
            {
              headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Token ${this.$store.state.token}`,
              },
            }
          )
          .catch(function (error) {
            if (error.response) {
              console.log(error.response.data);
              console.log(error.response.status);
              console.log(error.response.headers);
            }
          })
          .then((response) => {
            this.imageId = response.data.id;
            axios
              .post(
                `https://tedline.org/api/blog/createBlog/`,
                {
                  title: this.title,
                  body: this.body,
                  imageBlog: this.imageId,
                },
                {
                  headers: {
                    "Content-type": "application/json",
                    Accept: "application/json",
                    Authorization: `Token ${this.$store.state.token}`,
                  },
                }
              )
              .catch(function (error) {
                if (error.response) {
                  console.log(error.response.data);
                  console.log(error.response.status);
                  console.log(error.response.headers);
                }
              })
              .then((response) => {
                this.$router.push(`/blog`);
              });
          });
        this.loading = false;
      },
    },
     async mounted() {
      if (this.$store.state.isAuthenticated == null) await this.$store.commit('onStart');

    }
  };
  </script>
  