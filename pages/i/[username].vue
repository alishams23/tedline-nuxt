<template>
      <Head>
        <Title v-if="pending==false">{{ data.name }} | پروفایل</Title>
      
     </Head>

<v-snackbar v-model="snackbar" class="rtl" color="blue-accent-4" elevation="24" rounded="lg">
    <template v-slot:actions>
      <v-btn color="white" variant="text" icon="fal fa-times" @click="snackbar = false">
      </v-btn>
    </template>
    کپی شد
  </v-snackbar>

    <v-overlay style="z-index: 10" persistent :model-value="pending" class="align-center justify-center">
            <v-progress-circular :width="6" color="primary" size="64" indeterminate></v-progress-circular>
        </v-overlay>
    <v-container style="padding: 12px; height: 100vh" fluid v-if="pending == false">
        
        <v-row  dir="rtl" class="curved_profile rounded-b-lg row-one display">
            <v-col class="mt-5" cols="8" sm="8" md="4">
                <div class="d-flex">
                    <div>
                        <v-avatar color="auto" class="text-h5 shadow-1  " rounded="lg" size="125">
                            <v-icon class=" position-absolute ">
                                <IconUserStar size="90" />
                            </v-icon>
                            <v-img
                                :src="data.image"
                                cover></v-img>
                        </v-avatar>
                    </div>
                    <div class="mr-6">
                        <h2 class="text text-white mb-7 mb-sm-9 mt-1">{{ data.name }}</h2>
                        <span style="font-weight: 100" class="caption text-white font-weight-thin">
                            {{ data.bio }}</span>
                        <span class="caption text-white font-weight-thin d-block">

                            {{ data.username }}</span>
                    </div>
                </div>
            </v-col>
            <v-col class="mt-5" cols="3" sm="3" md="2" offset="0">
                <div style="height: 125px" class="d-flex">
                    <v-btn rounded="lg" @click="shareLink" height="40" variant="tonal" color="#F3E8FD"
                        class="px-4 py-1 ml-3 ">
                        <span class="text-white text-subtitle-1 font-weight-thin">Share link</span>
                    </v-btn>

            
                </div>
            </v-col>
        </v-row>
        <v-row style="z-index: 1" justify="center" class="row-two mt-n16">
            <v-col class="d-none d-md-block rtl" cols="3">
                <v-card class="rounded-lg px-9 py-9 shadow-3 mb-5">
                    <h3 class="mb-7 ">مدرسان مجموعه</h3>
                    <div class="d-flex mb-6" v-for="(item, index) in data.teachers" :key="index">
                        <v-avatar :image="item.avatar" size="48"></v-avatar>
                        <div class="mr-3">
                            <div class="">{{ item.name }}</div>
                            <p class="font-weight-thin text-body-2 text-grey-lighten-1">
                                {{ item.role }}
                            </p>
                        </div>
                    </div>
                    <p v-if="data.teachers.length == 0 " class=" text-grey text-body-2 text-center irsa">
                        مدرسی برای این موسسه ثبت نشده است

                    </p>
                </v-card>
            </v-col>
            <v-col cols="12" sm="12" md="8" class="ml-none ml-md-4">
                <v-card elevation="0" class="rounded-lg rtl px-9 py-9 shadow-3 mb-5">
                    <div class="d-block d-sm-flex mb-10" v-if="data.bio">
                        <h3 style="white-space: nowrap" class="ml-12 mb-3 mb-sm-0">
                            درباره
                        </h3>
                        <p class="text-body-2">
                          {{ data.bio }}
                        </p>
                    </div>
                    <h3 class="">
                        دوره ها
                    </h3>
                    <SectionInstituteCourses />
                </v-card>
            </v-col>

        </v-row>
    </v-container>
</template>

<script setup>
import { useAsyncData, useRoute } from 'nuxt/app'
import axios from 'axios'
import { IconUserStar } from '@tabler/icons-vue';


definePageMeta({
    layout: 'dashboard',
})
let snackbar = ref(false)
const route = useRoute()

// Use useAsyncData to fetch data server-side and client-side
const { data, pending, error } = await useAsyncData('getInstituteData', async () => {
    const response = await axios.get(`https://tedline.org/api/company/retrieve-institute/${route.params.username}`)
    return response.data
})


const shareLink = () => {
  const link = `https://tedline.org/i/${route.params.username}/`;
  copyToClipboard(link);
  snackbar.value = true;
};

const copyToClipboard = (textToCopy) => {
  if (navigator.clipboard && window.isSecureContext) {
    return navigator.clipboard.writeText(textToCopy);
  } else {
    let textArea = document.createElement("textarea");
    textArea.value = textToCopy;
    textArea.style.position = "fixed";
    textArea.style.left = "-999999px";
    textArea.style.top = "-999999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    return new Promise((res, rej) => {
      document.execCommand("copy") ? res() : rej();
      textArea.remove();
    });
  }
};

if (process.server) {
    console.log("Data fetched on the server.")
}

if (process.client) {
    console.log("Data rendered on the client.")
}
</script>

<style scope>
@media (max-width: 767px) {
    .curved_profile {
        background-color: #5ba7ee42;

        background-image: radial-gradient(ellipse 100% 140% at -10% 20%, #2b4968 89.9%, #00000000 90%), radial-gradient(ellipse 100% 100% at 30% 100%, #54a1e98c 89.9%, #045ce900 90%);

    }
}

@media (min-width: 767px) {

    .curved_profile {
        background-color: #1372ccf9;

        background-image: radial-gradient(ellipse 50% 200% at 80% 0%, #2b4968 89.9%, #00000000 90%), radial-gradient(ellipse 20% 100% at 30% -10%, #1451a08c 89.9%, #045ce900 90%);

    }
}


.row-one {
    height: 33.33%;
}

.row-two {
    height: 66.67%;
}

.margin {
    margin-left: 0px;
}

.display {
    justify-content: start;
}

.sizing {
    width: 100px;
    height: 100px;
}

.text {
    font-size: 1em;
}

.caption {
    font-size: 0.63rem;
}

@media (min-width: 576px) {
    .margin {
        margin-left: 175px;
    }

    .display {
        justify-content: space-around;
    }

    .sizing {
        width: 125px;
        height: 125px;
    }

    .text {
        font-size: 1.5em;
    }

    .caption {
        font-size: 0.77rem;
    }
}
</style>