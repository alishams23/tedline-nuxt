<template>

  <Head>
    <Title>جستجو | تدلاین</Title>

  </Head>

  <v-bottom-sheet inset v-if="tab == 1" elevation="0" v-model="drawerChecker">
    <v-card elevation="0" class="rounded-t-xl ">
      <v-toolbar flat class="border-b rounded-t-xl" color="transparent">
        <v-btn icon @click="drawerChecker = false">
          <v-icon size="25px">fal fa-times</v-icon>

        </v-btn>
        <v-toolbar-title class=" text-right px-3  ">
          <div class="d-flex justify-end align-center">
            <div>
              <p class="text-sm pb-0 mb-0 font-weight-bold ">فیلتر </p>
              <p class="text-xs mt-n2">فیلتر دوره</p>
            </div>
            <v-avatar color="blue-accent-4" rounded="xl" class="ms-3">
              <AdjustmentsHorizontalIcon style="height: 21px" />
            </v-avatar>
          </div>
        </v-toolbar-title>
      </v-toolbar>
      <v-card-text>

        <h2 class="text-sm mt-5 irsa rtl mb-2">دسته بندی</h2>


        <v-chip v-for="item in dataCategoryBest" :key="item.id"
          :color="selectedDataCategoryIds.includes(item.id) ? 'blue-accent-4' : ''" filter
          :isSelected="selectedDataCategoryIds.includes(item.id)"
          :append-icon="selectedDataCategoryIds.includes(item.id) ? 'fal fa-check' : ''" class="ma-1"
          :variant="selectedDataCategoryIds.includes(item.id) ? 'flat' : 'outlined'"
          @click="toggleDataCategory(item.id)">
          {{ item.title }}
        </v-chip>

      </v-card-text>
      <v-list lines="three" select-strategy="classic">

        <v-list-item color="blue-accent-4" :active="is_free" @click="is_free = !is_free; page = 1; searchCourse()"
          rounded="lg" class="text-right mx-1 my-1 ">
          <template v-slot:prepend="{ isActive }">
            <v-list-item-action start>
              <v-checkbox-btn color="blue-accent-4" v-model="is_free" :model-value="is_free" false-icon="fal fa-square"
                true-icon="fad fa-check-square"></v-checkbox-btn>
            </v-list-item-action>
          </template>
          <v-list-item-title class="font-weight-bold">رایگان</v-list-item-title>
          <v-list-item-subtitle class="text-xs">
            نمایش دوره های رایگان
          </v-list-item-subtitle>
        </v-list-item>


        <v-list-item color="blue-accent-4" :active="is_discount"
          @click="is_discount = !is_discount; page = 1; searchCourse()" rounded="lg" class="text-right mx-1 my-1 ">
          <template v-slot:prepend="{ isActive }">
            <v-list-item-action start>
              <v-checkbox-btn color="blue-accent-4" v-model="is_discount" :model-value="is_discount"
                false-icon="fal fa-square" true-icon="fad fa-check-square"></v-checkbox-btn>
            </v-list-item-action>
          </template>
          <v-list-item-title class="font-weight-bold">تخفیف</v-list-item-title>
          <v-list-item-subtitle class="text-xs">
            نمایش دوره های دارای تخفیف
          </v-list-item-subtitle>
        </v-list-item>

      </v-list>
    </v-card>

    <v-sheet height="100"></v-sheet>

  </v-bottom-sheet>



  <v-app-bar color="auto" scroll-behavior="elevate" height="74" class="custom-elevation">

    <v-card-text class=" mt-7 mx-3" color="" elevation="0">
      <v-locale-provider rtl>
        <v-text-field density="compact" :loading="loading ? 'blue-accent-4' : false" elevation="0"
          @update:model-value="page = 1; searchCourse(); searchBlog()" v-model="text" class="   " :flat="true"
          variant="solo-filled" label="جستجو   ..." rounded="pill">
          <template v-slot:prepend>
            <v-avatar class="text-xs bg-blue-gradient text-auto " size="55">
              <MagnifyingGlassIcon style="height: 21px" />
            </v-avatar>
          </template>
        </v-text-field>
      </v-locale-provider>
    </v-card-text>

  </v-app-bar>



  <div>



    <v-tabs density="comfortable" v-model="tab" align-tabs="end" class="text-grey2 border-b px-2 px-md-10 mt-4">
      <v-btn v-if="drawerChecker == false && tab != 2" variant="text" class="me-auto mt-auto "
        @click="drawerChecker = true" size="small" color="nauto " rounded="pill" icon="">

        <AdjustmentsHorizontalIcon style="height: 19px" />
      </v-btn>
      <v-tab class="mt-auto text-xs  px-6 text-auto px-md-8  rounded-t-lg" variant="tonal" color="blue" :value="1">
        <div :class="tab == 1 ? 'text-nauto  ' : 'text-grey1'" class="align-center justify-center d-flex">
          <span>
            دوره ها
          </span>

          <VideoCameraIconSolid v-if="tab == 1" class="text-blue ps-5 " style="height: 21px" />
          <VideoCameraIcon v-else class="text-grey ps-5 " style="height: 21px" />
          <!-- <v-icon  :color="tab == 1?'blue' : 'grey'" size="15" class="ps-5">{{tab == 1 ? 'fad' : 'fa'}} fa-video</v-icon> -->
        </div>
      </v-tab>
      <v-tab class="mt-auto  text-xs  text-auto  px-6 px-md-8 rounded-t-lg " variant="tonal" color="blue" :value="2">

        <div :class="tab == 2 ? 'text-nauto  ' : 'text-grey1'" class="align-center justify-center d-flex">
          <span> وبلاگ ها</span>
          <DocumentTextIconSolid v-if="tab == 2" class="text-blue ps-5 " style="height: 21px" />
          <DocumentTextIcon v-else class="text-grey1 ps-5 " style="height: 21px" />
          <!-- <v-icon  :color="tab == 2?'blue' : 'grey'" size="15" class="ps-5">{{tab == 2 ? 'fad' : 'fa'}} fa-chalkboard-teacher</v-icon> -->
        </div>
      </v-tab>
      <!-- <v-tab :hide-slider="true" height="50"  class="mt-auto  text-xs  text-auto rounded-2lg px-6 px-md-16 " variant="tonal" color="blue" :value="3" >
            
          <div :class="tab == 3 ? 'text-nauto  ' : 'text-grey1'" class="align-center justify-center d-flex" >
          <span> اساتید</span>
        <DocumentTextIconSolid v-if="tab == 3"  class="text-blue ps-5 "  style="height: 21px"  />
            <DocumentTextIcon v-else class="text-grey1 ps-5 "  style="height: 21px" />
          </div>
          </v-tab> -->
    </v-tabs>
    <v-slide-y-transition>
    <div class="d-flex justify-md-center  overflow-x-auto flex-0-0-100 pt-3 " v-if="tab == 1">
                <div v-for="item in dataCategoryBest" :key="item.id">
                  <v-chip :color="selectedDataCategoryIds.includes(item.id) ? 'blue-accent-4' : 'nauto'" filter
                    :isSelected="selectedDataCategoryIds.includes(item.id)"
                    :append-icon="selectedDataCategoryIds.includes(item.id) ? 'fal fa-check' : ''"
                    class="ma-1 border-card whitespace-nowrap text-xs-1"
                    :variant="selectedDataCategoryIds.includes(item.id) ? 'flat' : 'outlined'"
                    @click="toggleDataCategory(item.id)">
                    {{ item.title }}
                  </v-chip>
                </div>
              </div>
            </v-slide-y-transition>

            
    <v-container class="pt-3 pt-md-0">
      <v-row no-gutters>
          <v-col v-for="item in 20" v-if="loading" cols="12" lg="6" md="6" sm="12">
            <v-skeleton-loader color="transparent" class="mx-2 mx-md-5 my-6" type="image"></v-skeleton-loader>

          </v-col>
        </v-row>
      <v-card class="   pt-0 " color="transparent" elevation="0">
        <v-scroll-x-transition>
          <v-window v-model="tab" v-if="loading == false">
            <v-window-item :value="1">
              

              <v-row no-gutters>
                <v-col v-for="item in data.results" :key="item" class="d-flex justify-center  " cols="12" lg="6" md="6"
                  sm="12">
                  <SharedCourseHorizontal :data="item" class="w-100  ma-2 ma-md-5 " />
                </v-col>

                <v-container>


                  <v-alert v-if="data.results && data.results.length == 0" color="blue" icon="fa fa-info" variant="text"
                    class="rtl border-opacity-100 my-10">
                    <div class="text-sm  font-weight-black irsa">
                      دوره ای وجود ندارد
                    </div>
                  </v-alert>

                </v-container>


                <v-col cols="12">
                  <v-pagination class="bg-gray-4 rounded-xl " v-model="page" next-icon=" fal fa-angle-right"
                    prev-icon=" fal fa-angle-left" rounded="pill" :length="data.total_pages"
                    @click="data.total_pages > 1 ? searchCourse() : null"></v-pagination>
                </v-col>
              </v-row>
            </v-window-item>
            <v-window-item :value="2" v-if="loading == false">
              <v-row no-gutters>
                <v-col v-for="item in blogData" :key="item" class="d-flex justify-center  " cols="6" lg="3" md="4"
                  sm="6">
                  <CardBlog :data="item" color="auto" class="w-100  ma-2 ma-md-5 " />
                </v-col>
                <v-container>
                  <v-alert v-if="blogData.length == 0 && loading == false" color="blue" icon="fa fa-info" variant="text"
                    class="rtl border-opacity-100 my-10">
                    <div class="text-sm  font-weight-black irsa">
                      وبلاگی وجود ندارد
                    </div>
                  </v-alert>
                </v-container>
              </v-row>

            </v-window-item>
          </v-window>
        </v-scroll-x-transition>
        

      </v-card>
    </v-container>
  </div>



</template>




<script>
import Sidebar from "~/components/Sidebar.vue";
import Course from '~/components/shared/Course.vue';
import CardBlog from '~/components/shared/CardBlog.vue'
import axios from "axios";
import FooterComponent from "~/components/section/FooterComponent.vue";

import {


  VideoCameraIcon,
  DocumentTextIcon,



} from '@heroicons/vue/24/outline'

import DocumentTextIconSolid from '@heroicons/vue/24/solid/DocumentTextIcon'
import VideoCameraIconSolid from '@heroicons/vue/24/solid/VideoCameraIcon'
import MagnifyingGlassIcon from '@heroicons/vue/24/solid/MagnifyingGlassIcon'
import AdjustmentsHorizontalIcon from '@heroicons/vue/24/solid/AdjustmentsHorizontalIcon'


export default {
  setup() {
    definePageMeta({
      layout: "dashboard",
    })
  },
  components: {
    Course,
    CardBlog,
    DocumentTextIcon,
    DocumentTextIconSolid,
    VideoCameraIconSolid,
    MagnifyingGlassIcon,
    VideoCameraIcon,
    AdjustmentsHorizontalIcon,
    FooterComponent,
    Sidebar,

  },
  data: () => ({
    model: null,
    data: [],
    page: 1,
    blogData: [],
    dataCategoryBest: [],
    drawerChecker: false,
    selectedDataCategoryIds: [],
    tab: null,
    loading: false,
    loadingCategoryBest: false,
    text: '',
    is_free: false,
    is_discount: false,
  }),
  methods: {
    async searchCourse() {
      this.loading = true
      await axios.get(`https://tedline.org/api/course/SearchCourse/?page=${this.page}&search=${this.text}&is_free=${this.is_free}&is_discount=${this.is_discount}${this.selectedDataCategoryIds.length != 0 ? '&categories=' + this.selectedDataCategoryIds.join(',') : ''}`).then((response) => {
        this.data = response.data
      }
      )
      this.loading = false

    },
    searchBlog() {
      this.loading = true
      axios.get(`https://tedline.org/api/blog/Blog_List/?search=${this.text}`).then((response) => {
        this.blogData = response.data.results
        this.loading = false
      }
      )
    },
    getDataCategoryBest() {
      axios.get('https://tedline.org/api/course/CourseCategoryPopular/').then((response) => {
        this.dataCategoryBest = response.data
        this.loadingCategoryBest = false
      }
      )
    },
    toggleDataCategory(id) {
      console.log(id)
      const index = this.selectedDataCategoryIds.indexOf(id);
      if (index === -1) {
        this.selectedDataCategoryIds.push(id);
      } else {
        this.selectedDataCategoryIds.splice(index, 1);
      }
      this.page = 1
      this.searchCourse()
    },

  }, mounted() {
    if (this.$route.query.search != null) this.text = this.$route.query.search
    if (this.$route.query.tab != null) this.tab = parseInt(this.$route.query.tab)
    if (this.$route.query.category != null) this.selectedDataCategoryIds = [parseInt(this.$route.query.category)]

    this.searchCourse()
    this.searchBlog()
    this.getDataCategoryBest()
  }

}
</script>
<style>
.custom-label-color .v-label {
  font-size: 14px;
}

.v-bottom-sheet__content {
  border-radius: 20px !important;
}

.custom-elevation.v-app-bar.v-toolbar:not(.v-toolbar--flat) {
  box-shadow: rgba(0, 0, 0, 0.221) 0px 25px 40px -30px !important;
}
</style>