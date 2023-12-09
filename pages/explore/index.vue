<template>
  <v-container>
    <v-card-text class="" color="" elevation="0">
      <v-locale-provider rtl>
      <v-text-field   :loading="loading ? 'blue-accent-4' : false" elevation="0" @update:model-value="searchCourse" v-model="text"
        class="   py-1  "  :flat="true" variant="solo-filled" 
        label="جستجو بین درس ها" rounded="xl" single-line hide-details>
        <template v-slot:prepend>
          <v-avatar color="blue-accent-4" rounded="xl" class="text-xs" size="55" icon="fa fa-search"></v-avatar>
        </template>
      </v-text-field>
    </v-locale-provider>
    </v-card-text>
    <v-card elevation="0">
      <v-tabs v-model="tab" align-tabs="end" class="border-b text-grey">
        <v-btn v-if="drawerChecker == false && tab != 2" variant="text" class="mr-auto mt-auto mb-2"
          @click="drawerChecker = true" size="small" color="black" prepend-icon="fa fa-cog" rounded="pill"> فیلتر</v-btn>
        <v-tab class="text-xs rounded-0 px-8 px-md-16 rounded-t-lg" variant="text" color="blue" :value="1" >
        <div :class="tab == 1 ? 'text-black' : 'text-grey'">
          دوره ها
          <v-icon  :color="tab == 1?'blue' : 'grey'" size="15" class="ps-5">{{tab == 1 ? 'fad' : 'fa'}} fa-video</v-icon>
        </div>
        </v-tab>
        <v-tab class="text-xs rounded-0 px-8 px-md-16 rounded-t-lg" variant="text" color="blue" :value="2" >
          
        <div :class="tab == 2 ? 'text-black' : 'text-grey'" >
          اساتید
          <v-icon  :color="tab == 2?'blue' : 'grey'" size="15" class="ps-5">{{tab == 2 ? 'fad' : 'fa'}} fa-chalkboard-teacher</v-icon>

        </div>
        </v-tab>
      </v-tabs>
      <v-window v-model="tab">
        <v-window-item :value="1">
          <v-row no-gutters>
            <v-col v-for="item in data" :key="item" class="d-flex justify-center" cols="6" lg="3" md="4" sm="6">
              <Course :data="item" :detail="false" class="w-100 mx-2 mb-5 mt-4" />
            </v-col>
            <v-alert v-if="data.length == 0 && loading == false"  icon="fa fa-info" variant="tonal" color="blue" class="rtl border-opacity-100 my-10" border="start">
              <div class="text-sm  font-weight-black irsa">
                دوره ای وجود ندارد
              </div>
            </v-alert>
          </v-row>
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
  <v-navigation-drawer v-if="tab == 1" location="right"  elevation="0" v-model="drawerChecker">
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
          <v-avatar color="blue-accent-4" rounded="lg" class="ms-3" >
            <v-icon size="18px">
              fa fa-filter
            </v-icon>
          </v-avatar>
         </div>
         </v-toolbar-title>
      </v-toolbar>
      <v-card-text>
  
        <h2 class="text-sm mt-5 irsa rtl mb-2">دسته بندی</h2>
       

          <v-chip
            v-for="item in dataCategoryBest"
            :key="item.id"
            
            :color=" selectedDataCategoryIds.includes(item.id)  ? 'blue-accent-4' : ''"
           
            filter
            :isSelected="selectedDataCategoryIds.includes(item.id) "
            :append-icon="selectedDataCategoryIds.includes(item.id)  ? 'fal fa-check' : ''"
           class="ma-1"
            :variant="selectedDataCategoryIds.includes(item.id)  ? 'flat' : 'outlined'"
            @click="toggleDataCategory(item.id)"
          >
            {{ item.title }}
          </v-chip>
       
      </v-card-text>
    </v-card>
    <v-list lines="three" select-strategy="classic">

      <v-list-item color="blue-accent-4" :active="is_free" @click="is_free = !is_free;searchCourse()" rounded="lg" class="text-right mx-1 my-1 ">
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


      <v-list-item color="blue-accent-4" :active="is_discount" @click="is_discount = !is_discount;searchCourse()" rounded="lg" class="text-right mx-1 my-1 ">
        <template v-slot:prepend="{ isActive }">
          <v-list-item-action start>
            <v-checkbox-btn color="blue-accent-4" v-model="is_discount" :model-value="is_discount" false-icon="fal fa-square"
              true-icon="fad fa-check-square"></v-checkbox-btn>
          </v-list-item-action>
        </template>
        <v-list-item-title class="font-weight-bold">تخفیف</v-list-item-title>
        <v-list-item-subtitle class="text-xs">
          نمایش دوره های دارای تخفیف
        </v-list-item-subtitle>
      </v-list-item>
     
    </v-list>
    <v-sheet height="100"></v-sheet>

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
    selectedDataCategoryIds: [],
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
      axios.get(`https://tedline.org/api/course/SearchCourse/?search=${this.text}&is_free=${this.is_free}&is_discount=${this.is_discount}${this.selectedDataCategoryIds.length != 0 ? '&categories=' + this.selectedDataCategoryIds.join(',') : ''}`).then((response) => {
        this.data = response.data.results
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
      this.searchCourse()
    },

  }, mounted() {
     if (this.$route.query.search != null) this.text = this.$route.query.search
     if (this.$route.query.category != null) this.selectedDataCategoryIds = [parseInt(this.$route.query.category)]

    this.searchCourse()
    this.getDataCategoryBest()
  }

}
</script>