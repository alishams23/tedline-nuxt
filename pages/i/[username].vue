<template>

    <Head>
        <Title v-if="pending == false">{{ data.name }} | موسسه</Title>

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

        <v-row dir="rtl" class="curved_profile rounded-b-lg row-one display" :style="headerBackgroundStyle">
            <v-col class="mt-5" cols="9" sm="8" md="4">
                <div class="d-flex">
                    <div>
                      <v-badge color="blue" >
                        <v-avatar color="auto" class="text-h5 shadow-1  " rounded="lg" size="125">
                            <v-icon class=" position-absolute ">
                                <IconUserStar size="90"  />
                            </v-icon>
                            <v-img :src="data.image" cover></v-img>
                        </v-avatar>
                        <template v-slot:badge>
                            <IconCheck size="9"  />
                        </template>
                      </v-badge>
                    </div>
                    <div class="mr-6 d-flex flex-column justify-center">
                        <h2 class="text-h4 irsa font-weight-bold text-white  mt-1">{{ data.name }}</h2>
             
                        <span class=" text-h6 text-white font-weight-thin d-block">

                            {{ data.username }}</span>
                    </div>
                </div>
            </v-col>
            <v-col class="mt-md-5  "  cols="3"  md="2" >
                <div  class="d-flex mb-16 justify-end">
                    <v-btn  @click="shareLink" icon="" variant="tonal" color="#F3E8FD"
                        class=" mb-10 ml-3  ">

                        <v-icon >
                            <IconShare2 size="20" />
                            </v-icon>
                    </v-btn>


                </div>
            </v-col>
        </v-row>
        <v-row style="z-index: 1" justify="center" class="row-two mt-n16">
            <v-col class="rtl" cols="12" md="3">
                <v-card class="rounded-lg px-5 py-9 shadow-3 mb-5">

                    <h3 class="mb-7 px-3">مدرسان مجموعه</h3>
                    <SharedTeacher  :data="item" v-for="(item, index) in data.teachers" :key="index" />
                    
                    <p v-if="data.teachers.length == 0" class=" text-grey text-body-2 text-center irsa">
                        مدرسی برای این موسسه ثبت نشده است

                    </p>
                </v-card>
            </v-col>
            <v-col cols="12" sm="12" md="8" class="ml-none ml-md-4 pb-16">
                <v-card elevation="0" class="rounded-lg rtl px-9 py-9 shadow-3 mb-5">
                    <div class="d-block d-sm-flex mb-10" v-if="data.bio">
                        <h3 style="white-space: nowrap" class="ml-12  mb-sm-0">
                            درباره
                        </h3>
                        <p class="irsa">
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
import { IconUserStar ,IconCheck ,IconShare2 } from '@tabler/icons-vue';


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

const headerBackgroundStyle = computed(() => {
    const backgroundImage = data.value?.background_image
    if (!backgroundImage) return {}

    return {
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
    }
})
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
