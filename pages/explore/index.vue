<template>
  <v-container>
    <v-card-text class="" color="" elevation="0">
      <v-text-field :loading="loading" elevation="0" @update:model-value="searchCourse" v-model="text"
        class="rtl pe-5 ps-1 bg-grey-lighten-4 py-1  rounded-pill"  :flat="true" variant="solo-filled" append-icon="fad fa-search"
        label="جستجو بین درس ها" rounded="pill" single-line hide-details>
      </v-text-field>
    </v-card-text>
    <v-card elevation="0">
      <v-tabs v-model="tab" color="black" align-tabs="end" class="border-b text-grey">
        <v-btn v-if="drawerChecker == false && tab != 2" variant="text" class="mr-auto mt-auto mb-2"
          @click="drawerChecker = true" size="small" color="black" prepend-icon="fa fa-cog" rounded="pill"> فیلتر</v-btn>
        <v-tab selected-class=" border-b-lg  border-opacity-100 rounded-0" :value="1" width="150">
          دوره ها</v-tab>
        <v-tab selected-class=" border-b-lg  border-opacity-100 rounded-0" :value="2" width="150">
          اساتید</v-tab>
      </v-tabs>
      <v-window v-model="tab">
        <v-window-item :value="1">
          <v-container fluid>
            <v-row no-gutters>
              <v-col v-for="item in data" :key="item" class="d-flex justify-center" cols="12" lg="3" md="4" sm="6">
                <Course :data="item" />

              </v-col>
              <v-alert v-if="data.length == 0 && loading == false"  icon="fa fa-info" variant="tonal" color="indigo-darken-4" class="rtl border-opacity-100 my-10" border="start">
                <div class="text-sm  font-weight-black irsa">
                  دوره ای وجود ندارد
                </div>
  
              </v-alert>

            </v-row>
          </v-container>
        </v-window-item>
        <v-window-item :value="2">
          <v-container>
            <v-alert icon="fa fa-info" variant="tonal" type="info" class="rtl  border-opacity-100 my-10" border="start">
              <div class=" text-sm  font-weight-black irsa">
                این بخش در حال اپدیت است
              </div>
            </v-alert>
          </v-container>
        </v-window-item>
      </v-window>
    </v-card>
  </v-container>
  <v-navigation-drawer v-if="tab == 1" location="right" class=" " elevation="0" v-model="drawerChecker">
    <v-card class="mx-auto" max-width="400" elevation="0" rounded="0">
      <v-toolbar flat class="border-b" color="transparent">
        <v-btn icon @click="drawerChecker = false">
          <v-icon size="25px">fal fa-times</v-icon>
        </v-btn>
        <v-toolbar-title class=" text-right px-3  ">
         <div class="d-flex justify-end align-center">
          <div >
            <p class="text-sm pb-0 mb-0 font-weight-bold ">فیلتر </p>
            <p class="text-xs mt-n2">فیلتر دوره</p>
          </div>
          <v-avatar color="indigo-darken-4" rounded="lg" class="ms-3" >
            <v-icon size="18px">
              fa fa-filter
            </v-icon>
          </v-avatar>
         </div>
         </v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <h2 class="text-sm mt-5 irsa rtl mb-2">
          دسته بندی
        </h2>

        <v-chip-group v-model="dataCategoryChecked"  column v-for="item in dataCategoryBest" multiple>
          <v-chip color="indigo-darken-3" filter filter-icon=" fal fa-check" variant="outlined">
            {{ item.title }}
          </v-chip>

        </v-chip-group>
      </v-card-text>
    </v-card>
   
    <v-list lines="three" select-strategy="classic">

      <v-list-item color="indigo-darken-3" :active="is_free" @click="is_free = !is_free;searchCourse()" rounded="lg" class="text-right mx-1 my-1 ">
        <template v-slot:prepend="{ isActive }">
          <v-list-item-action start>
            <v-checkbox-btn color="indigo-darken-3" v-model="is_free" :model-value="is_free" false-icon="fal fa-square"
              true-icon="fad fa-check-square"></v-checkbox-btn>
          </v-list-item-action>
        </template>
        <v-list-item-title class="font-weight-bold">رایگان</v-list-item-title>
        <v-list-item-subtitle class="text-xs">
          نمایش دوره های رایگان
        </v-list-item-subtitle>
      </v-list-item>


      <v-list-item color="indigo-darken-3" :active="is_discount" @click="is_discount = !is_discount;searchCourse()" rounded="lg" class="text-right mx-1 my-1 ">
        <template v-slot:prepend="{ isActive }">
          <v-list-item-action start>
            <v-checkbox-btn color="indigo-darken-3" v-model="is_discount" :model-value="is_discount" false-icon="fal fa-square"
              true-icon="fad fa-check-square"></v-checkbox-btn>
          </v-list-item-action>
        </template>
        <v-list-item-title class="font-weight-bold">تخفیف</v-list-item-title>
        <v-list-item-subtitle class="text-xs">
          نمایش دوره های دارای تخفیف
        </v-list-item-subtitle>
      </v-list-item>

    </v-list>
  </v-navigation-drawer>
</template>




<script >
import Sidebar from "~/components/Sidebar.vue";
import Course from '~/components/shared/Course.vue'
import axios from "axios";
import FooterComponent from "~/components/section/FooterComponent.vue";


export default {
  setup() {
    definePageMeta({
      layout: "dashboard",
    })
  },
  components: {
    Course,
    FooterComponent,
    Sidebar
  },
  data: () => ({
    model: null,
    data: [],
    dataCategoryBest: [],
    drawerChecker: false,
    dataCategoryChecked: [],
    tab: null,
    loading: false,
    loadingCategoryBest: false,
    text: '',
    is_free: false,
    is_discount: false,
  }),
  methods: {
    searchCourse() {
      this.loading = true
      axios.get(`http://127.0.0.1:8000/api/course/SearchCourse/?search=${this.text}&is_free=${this.is_free}&is_discount=${this.is_discount}`).then((response) => {
        this.data = response.data.results
        this.loading = false
      }
      )
    },
    getDataCategoryBest() {
      axios.get('http://127.0.0.1:8000/api/course/CourseCategoryPopular/').then((response) => {
        this.dataCategoryBest = response.data
        this.loadingCategoryBest = false
      }
      )
    }

  }, mounted() {
    this.searchCourse()
    this.getDataCategoryBest()
  }

}
</script>