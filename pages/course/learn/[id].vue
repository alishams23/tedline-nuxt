<template>
    <v-container>
        <div>

            <div class="rtl text-right px-3 text-h6 irsa font-weight-bold mb-3  mt-10">
                آموزش مقدماتی پایتون
            </div>
            <v-expansion-panels v-model="panel" :disabled="disabled" multiple class=" rounded-lg ">
                <v-expansion-panel elevation="0" class="">
                    <v-expansion-panel-title expand-icon="fal fa-chevron-left" collapse-icon="fal fa-chevron-up">Panel
                        1</v-expansion-panel-title>
                    <v-expansion-panel-text >
                        <v-list lines="two">
                            <v-list-item v-for="file in files" :key="file.title" :title="file.title"
                                :subtitle="file.subtitle" class="mb-3 rounded-lg border">
                                <template v-slot:prepend>
                                    <v-avatar size="x-large" rounded="lg" :color="file.color">
                                        <v-icon color="white"> fad {{ file.icon }}</v-icon>
                                    </v-avatar>
                                </template>
                                <template v-slot:append>
                                    <v-btn color="grey-lighten-1"  size="x-small"  variant="outlined"> خوانده نشده</v-btn>
                                </template>
                            </v-list-item>
                        </v-list>
                    </v-expansion-panel-text>
                </v-expansion-panel>
                <v-expansion-panel elevation="0">
                    <v-expansion-panel-title expand-icon="fal fa-chevron-left" collapse-icon="fal fa-chevron-up">Panel
                        1</v-expansion-panel-title>
                    <v-expansion-panel-text class=" border rounded-lg
                 ">
                        Some content
                    </v-expansion-panel-text>
                </v-expansion-panel>
            </v-expansion-panels>
        </div>
    </v-container>
    <v-navigation-drawer location="right" class="" elevation="0" v-model="drawerChecker">



        <div>

            <v-list class="ms-3">
                <div class="rtl text-right px-3 text-h6 irsa font-weight-bold  mt-10">
                    آموزش مقدماتی پایتون
                </div>
                <v-list-subheader color="blue-darken-4"
                    class="   text-sm mt-9  text-grey justify-end  mb-2 ">جلسات</v-list-subheader>
                <v-list-item :to="item.to" v-for="(item, i) in sidebarMenu" class="leftPadding  rounded-s-pill px-6 mb-3 py-2"
             color="blue-darken-2" subtitle="">
                    <v-list-item-title class=" text-right rtl font-weight-bold  irsa ">{{ item.title }}</v-list-item-title>
                    <v-list-item-subtitle class="text-right rtl text-xs">
                        {{ item.subtitle }}
                    </v-list-item-subtitle>
                    <template v-slot:subtitle="{ subtitle }">
                        <div v-html="subtitle"></div>
                    </template>
                </v-list-item>
                <v-list-subheader color="blue-darken-4"
                    class="   text-sm mt-9  text-grey justify-end  mb-2 ">عمومی</v-list-subheader>
                <v-list-item class="leftPadding  rounded-pill px-6  " color="blue" subtitle="">
                    <v-list-item-title class=" text-right rtl font-weight-bold  irsa "> توضیحات دوره</v-list-item-title>
                </v-list-item>
                <v-list-item class="leftPadding  rounded-pill px-6  " color="blue" subtitle="">
                    <v-list-item-title class=" text-right rtl font-weight-bold  irsa "> گفتگو</v-list-item-title>
                </v-list-item>
            </v-list>
        </div>
    </v-navigation-drawer>
</template>




<script >
import axios from "axios";


export default {
    setup() {
        definePageMeta({
            layout: "dashboard",
        })
    },

    data: () => ({
        model: null,
        panel: [0, 1],
        files: [
            {
                color: 'blue',
                icon: 'fa-video',
                subtitle: 'Jan 20, 2014',
                title: 'Vacation itinerary',
            },
            {
                color: 'amber',
                icon: 'fa-file',
                subtitle: 'Jan 10, 2014',
                title: 'Kitchen remodel',
            },
        ],
        data: {},
        drawerChecker: true,
        sidebarMenu: [
            {
                subtitle: 'هفته ی ۱',

                to: '/course/learn/1',
                title: "پایتون مقدماتی"
            },
            {
                subtitle: 'هفته ی ۲',

                to: '/course/learn/2',
                title: "معنی در صنعت چاپ، صفحه‌آرایی و طراحی گرافیک گفته می‌شود. طراح گرافیک از این متن به ..."
            },
            {
                subtitle: 'هفته ی ۳',

                to: '/course/learn/3',
                title: "پایتون مقدماتی"
            },


        ]
    }),
    methods: {
        getData() {
            axios.get(`http://127.0.0.1:8000/api/course/RetrieveCourses/${this.$route.params.id}/`).then((response) =>
                this.data = response.data
            )
        }
    }, mounted() {
        this.getData()
    }
}
</script>
<style >
.v-expansion-panel-title__overlay {
    background-color: white !important;
}
</style>