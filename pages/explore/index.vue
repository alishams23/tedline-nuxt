<template>


      <v-bottom-sheet  inset v-if="tab == 1"  elevation="0" v-model="drawerChecker">
      <v-card  elevation="0" class="rounded-t-xl ">
        <v-toolbar flat class="border-b rounded-t-xl" color="transparent">
          <v-btn icon @click="drawerChecker = false">
            <v-icon size="25px">fal fa-times</v-icon>
            
          </v-btn>
          <v-toolbar-title class=" text-right px-3  ">
           <div class="d-flex justify-end align-center">
            <div >
              <p class="text-sm pb-0 mb-0 font-weight-bold ">فیلتر </p>
              <p class="text-xs mt-n2">فیلتر دوره</p>
            </div>
            <v-avatar color="blue-accent-4" rounded="xl" class="ms-3" >
              <AdjustmentsHorizontalIcon style="height: 21px"/>
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
      </v-card>
    
      <v-sheet height="100"></v-sheet>
  
    </v-bottom-sheet>
 
  
  
      <v-app-bar color="auto" height="80"   elevation="0">
      <v-container class="">
      <v-card-text class="" color="" elevation="0">
        <v-locale-provider rtl>
        <v-text-field   :loading="loading ? 'blue-accent-4' : false" elevation="0" @update:model-value="searchCourse();searchBlog()" v-model="text"
          class=" custom-label-color  "  :flat="true" variant="solo-filled" 
          label="جستجو بین درس ها" rounded="pill" single-line hide-details>
          <template v-slot:prepend>
            <v-avatar color="blue-accent-4" rounded="pill" class="text-xs" size="55">
              <MagnifyingGlassIcon style="height: 21px" />
            </v-avatar>
          </template>
        </v-text-field>
      </v-locale-provider>
      </v-card-text>
    </v-container>
    </v-app-bar>
   
  
  
  <div>
  
    <v-container v-if="loading == false"  >
      <v-container>
        <v-tabs v-model="tab" align-tabs="end" color="transparent" class="text-grey2">
          <v-btn  v-if="drawerChecker == false && tab != 2" variant="text" class="me-auto mt-auto "
            @click="drawerChecker = true" size="small" color="nauto "   rounded="pill" icon=""> 
    
            <AdjustmentsHorizontalIcon style="height: 19px"/>
          </v-btn>
          <v-tab  :hide-slider="true" height="50"   class="mt-auto text-xs rounded-2lg px-6 text-auto px-md-16 " variant="tonal" color="blue" :value="1" >
          <div :class="tab == 1 ? 'text-nauto  ' : 'text-grey1'" class="align-center justify-center d-flex">
           <span>
            دوره ها
           </span>

            <VideoCameraIconSolid v-if="tab == 1"  class="text-blue ps-5 "  style="height: 21px"  />
            <VideoCameraIcon v-else class="text-grey ps-5 "  style="height: 21px" />
            <!-- <v-icon  :color="tab == 1?'blue' : 'grey'" size="15" class="ps-5">{{tab == 1 ? 'fad' : 'fa'}} fa-video</v-icon> -->
          </div>
          </v-tab>
          <v-tab :hide-slider="true" height="50"  class="mt-auto  text-xs  text-auto rounded-2lg px-6 px-md-16 " variant="tonal" color="blue" :value="2" >
            
          <div :class="tab == 2 ? 'text-nauto  ' : 'text-grey1'" class="align-center justify-center d-flex" >
          <span>  وبلاگ ها</span>
        <DocumentTextIconSolid v-if="tab == 2"  class="text-blue ps-5 "  style="height: 21px"  />
            <DocumentTextIcon v-else class="text-grey1 ps-5 "  style="height: 21px" />
            <!-- <v-icon  :color="tab == 2?'blue' : 'grey'" size="15" class="ps-5">{{tab == 2 ? 'fad' : 'fa'}} fa-chalkboard-teacher</v-icon> -->
          </div>
          </v-tab>
        </v-tabs>
      </v-container>
      <v-card  color="grey4" class="inner-shadow-md rounded-2xl pa-3 pa-md-5" elevation="0">
        <v-window v-model="tab" >
          <v-window-item :value="1">
            <v-row no-gutters >
              <v-col v-for="item in data" :key="item" class="d-flex justify-center  " cols="6" lg="3" md="4" sm="6">
                <Course :data="item" :detail="false" color="grey4" class="w-100  ma-2 ma-md-5 " />
              </v-col>
              <v-container>
              <v-alert v-if="data.length == 0 && loading == false"  color="blue" icon="fa fa-info" variant="tonal"  class="rtl border-opacity-100 my-10">
                <div class="text-sm  font-weight-black irsa">
                  دوره ای وجود ندارد
                </div>
              </v-alert>
            </v-container>
            </v-row>
          </v-window-item>
          <v-window-item :value="2">
            <v-row no-gutters >
              <v-col v-for="item in blogData" :key="item" class="d-flex justify-center  " cols="6" lg="3" md="4" sm="6">
                <CardBlog :data="item"  color="grey4" class="w-100  ma-2 ma-md-5 " />
              </v-col>
              <v-container>
              <v-alert v-if="blogData.length == 0 && loading == false"  color="blue" icon="fa fa-info" variant="tonal"  class="rtl border-opacity-100 my-10">
                <div class="text-sm  font-weight-black irsa">
                  وبلاگی ای وجود ندارد
                </div>
              </v-alert>
            </v-container>
            </v-row>
          
          </v-window-item>
        </v-window>
      </v-card>
    </v-container>
  </div>
   
    

</template>




<script >
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
    searchCourse() {
      this.loading = true
      axios.get(`http://127.0.0.1:8000/api/course/SearchCourse/?search=${this.text}&is_free=${this.is_free}&is_discount=${this.is_discount}${this.selectedDataCategoryIds.length != 0 ? '&categories=' + this.selectedDataCategoryIds.join(',') : ''}`).then((response) => {
        this.data = response.data.results
        this.loading = false
      }
      )
    },
    searchBlog() {
      this.loading = true
      axios.get(`http://127.0.0.1:8000/api/blog/Blog_List/?search=${this.text}`).then((response) => {
        this.blogData = response.data.results
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
  font-size: 14px ;
}

</style>