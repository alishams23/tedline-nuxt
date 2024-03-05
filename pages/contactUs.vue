<template>
  <Head>
    <Title>ارتباط با ما</Title>
  </Head>
  <v-app id="inspire">
    <v-main class=" bg-blue ">
      <v-locale-provider rtl>
        <div class="px-5">
          <v-card class="mx-auto pa-10 shadow-3 mb-10  rounded-xl mt-10" max-width="800">

            <v-btn variant="tonal" color="blue" size="small" class="mb-5" to="/" prepend-icon="fa fa-arrow-right">
              برگشت به خانه
            </v-btn>
            <h1 class="text-h5 irsa font-weight-bold py-5">
              ارتباط با ما
            </h1>
            <form @submit.prevent="submit">
              <v-text-field v-model="name" variant="outlined" rounded="lg" color="blue" label="نام"></v-text-field>

              <v-text-field v-model="phone" variant="outlined" rounded="lg" label="شماره تماس"
                color="blue"></v-text-field>

              <v-text-field v-model="email" variant="outlined" rounded="lg" color="blue" label="ایمیل"></v-text-field>

              <v-textarea v-model="select" variant="outlined" rounded="lg" color="blue" label="متن مورد نظر"></v-textarea>



              <v-btn class="w-100" type="submit" elevation="0" color="blue" rounded="lg" @click="handleReset"
                :loading="loading">
                ارسال
              </v-btn>



            </form>

            <v-list class="mt-10">
              <v-list-item  v-for="item in list" class="mt-3">
                <v-list-item-title class="font-weight-bold text-xs">{{ item.title }}</v-list-item-title>
                <div class=" text-xs text-grey">{{ item.subtitle }}</div>
                <template v-slot:prepend>
                  <v-avatar color="blue" variant="tonal">
                    <v-icon>
                      <component :is="item.icon" />
                    </v-icon>
                  </v-avatar>
                </template>
              </v-list-item>


            </v-list>
          </v-card>
        </div>
      </v-locale-provider>
    </v-main>
  </v-app>
</template>
<script >
import axios from "axios";
import { IconPhone, IconMail, IconMap,IconBrandInstagram ,IconBrandX ,IconBrandYoutube } from '@tabler/icons-vue';
import { MapIcon } from "@heroicons/vue/24/solid";

export default {
  components: { IconPhone, IconMail, IconMap },

  data: () => ({
    list: [{ title: 'شماره تماس', subtitle: '09130990985', icon: IconPhone }, 
    { title: 'ایمیل', subtitle: 'tedline.org@gmail.com', icon: IconMail }, 
    { title: 'آدرس', subtitle: 'یزد ، خیابان شهید مطهری ، پارک علم و فناوری یزد.', icon: IconMap },
    { title: 'اینستاگرام', subtitle: 'tedline_org', icon: IconBrandInstagram },
    { title: 'یوتیوب', subtitle: 'tedline_org', icon: IconBrandYoutube },
    { title: 'x', subtitle: 'tedline_org', icon: IconBrandX },
  ],
    loading: false,
    name: '',
    phone: '',
    email: '',
    select: '',
  }),
  methods: {
    handleReset() {
      this.loading = true
    }
  }
}
</script>