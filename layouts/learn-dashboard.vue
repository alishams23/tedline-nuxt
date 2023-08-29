
<template>
    <v-app id="inspire">
      <SideNavigation @updateData="updatePageDrawerChecker"/>
      <v-navigation-drawer temporary location="right" class=" border-none  hidden-sm-and-down shadow-2 " elevation="0" v-model="drawerChecker">
        <Notification />
  
      </v-navigation-drawer>
  
      <v-main>
    
        <v-navigation-drawer location="right" class="" elevation="0" v-model="drawerCheckerSide">


          <div v-if="data">

              <v-list class="ms-3">
                  <div class="rtl text-right px-3 text-h6 irsa font-weight-bold  mt-10">
                      {{ data.title }}
                  </div>
                  <v-list-subheader color="blue-darken-4"
                      class="   text-sm mt-9  text-grey justify-end  mb-2 ">جلسات</v-list-subheader>
                  <v-list-item :to="'/course/learn/'+data.id+'/'+item.id" v-for="(item, i) in data.session"
                      class="leftPadding  rounded-s-pill px-6 mb-3 py-2" color="blue-darken-2" subtitle="">
                      <v-list-item-title class=" text-right rtl font-weight-bold  irsa ">{{ item.title }}</v-list-item-title>
                      <v-list-item-subtitle class="text-right rtl text-xs">
                          {{ item.description }}
                      </v-list-item-subtitle>
                      <template v-slot:subtitle="{ subtitle }">
                          <div v-html="subtitle"></div>
                      </template>
                  </v-list-item>
                  <v-list-subheader color="blue-darken-4"
                      class="   text-sm mt-9  text-grey justify-end  mb-2 ">عمومی</v-list-subheader>
                  <v-list-item :to="'/course/'+data.id"  class="leftPadding  rounded-s-pill px-6 mb-3 py-2" color="blue-darken-2" >
                      <v-list-item-title  class=" text-right rtl font-weight-bold  irsa "> توضیحات دوره</v-list-item-title>
                  </v-list-item>
  
              </v-list>
          </div>
      </v-navigation-drawer>
      <v-app-bar color="light-blue-darken-4" scroll-behavior="collapse inverted" scroll-threshold="70" elevation="0" icon=""
          class="rtl  ">
  
          <v-app-bar-nav-icon @click.stop="drawerCheckerSide = !drawerCheckerSide">
              <i class="fa fa-bars"></i>
          </v-app-bar-nav-icon>
          <v-app-bar-title class=" font-weight-bold text-body-1" v-if="data">
            {{ data.title }}
          </v-app-bar-title>
      </v-app-bar>
       <slot />
      </v-main>
     
    </v-app>
    <v-layout class="overflow-visible  hidden-lg-and-up" style="height: 65px;">
      <bottomNavigation />
    </v-layout>
  </template>
  
   
  <script>
  import Notification from "~/components/section/Notification.vue";
  import SideNavigation from "~/components/section/SideNavigation.vue";
  import bottomNavigation from "~/components/section/BottomNavigation.vue";
  import axios from "axios";
  
  import { useStore } from 'vuex'
  export default {
  
    components: { Notification,bottomNavigation,SideNavigation },
  
    data: () => ({
      drawerChecker: false,
      loading: true,
      data: null,
        drawerCheckerSide: true,
    }),
  
  methods:{
    updatePageDrawerChecker() {
        this.drawerChecker = !this.drawerChecker;
      },  getData() {
        
            axios.get(`https://tedline.org/api/course/RetrieveCourses/${this.$route.params.id}/`,{
            headers: {
              "Content-type": "application/json",
              Accept: "application/json",
              Authorization: this.$store.state.token != ''
                ? `Token ${this.$store.state.token}`
                : ''
            },
          }).then((response) => {
                this.data = response.data
                this.loading = false
            }
            )
        }
  },
    async mounted() {
     await this.$store.commit('onStart');
     this.getData()
   
    }
  
  };
  </script>