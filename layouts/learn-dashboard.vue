
<template>
  <v-app id="inspire" class="bg-grey4">
    <SideNavigation color="grey4" class=" border " @updateData="updatePageDrawerChecker" />
   
    <v-app-bar color="grey4" scroll-threshold="70" elevation="0" icon="" class="rtl  ">

      <v-app-bar-nav-icon class="" @click.stop="drawerCheckerSide = !drawerCheckerSide">
        <i class="fa fa-bars"></i>
      </v-app-bar-nav-icon>
      
      <template v-slot:append>
        <dark class="mx-3" />
        <v-btn size="small"
        variant="tonal"
        class="me-3"
        color="blue"
        :to="'/course/' + $route.params.id" 
        icon=""
        >
        <v-icon >
          fa fa-question
        </v-icon>
        </v-btn>
      </template>
      <v-app-bar->

      </v-app-bar->
    </v-app-bar>
    <v-main>

      <v-navigation-drawer location="right" color="grey4" class="    border-none" elevation="0" v-model="drawerCheckerSide">

        <div class="d-flex justify-center mx-10">
          <v-progress-linear
          v-if="loading"
          color="blue-accent-4"
          indeterminate
          rounded
          height="6"
        ></v-progress-linear>
        </div>
        <div v-if="data">
          <v-alert
        
          variant="text"
          
          color="blue-grey-darken-4"
          rounded="lg"
          v-if="data.registered == false"
          class="rtl mx-3 bg-grey3   border-opacity-100  my-2"
          border="start"
          >
           <div class="text-nauto text-body-2 irsa">
            در این دوره ثبت نام کنید
           </div>
     
          <v-btn :to="'/course/' + data.id + '/?register=true'" variant="flat" class="mt-3 px-4" color="blue-grey-darken-4" size="small" rounded="xl">
            ثبت نام
           </v-btn>
        
          </v-alert>
          <v-list active-class="bg-blue-accent-4  " variant="flat" class="ms-3">
            <div class="rtl text-right px-3 text-body-1  irsa font-weight-black  mt-3">
                      {{ data.title }}
                  </div>
                 
               
            <v-list-subheader color="blue-darken-4"
              class="  text-sm mt-9  text-grey justify-end  mb-2 ">جلسات</v-list-subheader>
            <v-list-item   active-class="bg-blue-gradient-3 text-white"  :to="'/course/learn/' + data.id + '/' + item.id" v-for="(item, i) in data.session"
              class=" bg-grey4  rounded-pill  px-6 mx-3 mb-3 py-2" variant="flat" >
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
            <v-list-item :to="'/course/' + data.id" class="  rounded-pill  px-6 mx-3 mb-16 py-2 bg-grey4"
              color="grey4">
              <v-list-item-title class="  rtl font-weight-bold  irsa "> توضیحات دوره</v-list-item-title>
            </v-list-item>

          </v-list>
        </div>
      </v-navigation-drawer>


     <div class=" h-100 pa-5  " >
      <div class="bg-auto h-100  inner-shadow-1 rounded-xl" >
        <slot  />
      </div>
     </div>
    </v-main>

  </v-app>
  <v-layout class="overflow-visible bg-grey4 hidden-lg-and-up" style="height: 65px;">
    <bottomNavigation />
  </v-layout>
</template>
  
   
<script>
import Notification from "~/components/section/Notification.vue";
import SideNavigation from "~/components/section/SideNavigation.vue";
import bottomNavigation from "~/components/section/BottomNavigation.vue";
import dark from "~/components/shared/dark.vue";

import axios from "axios";

import { useStore } from 'vuex'
export default {

  components: { Notification, bottomNavigation, SideNavigation ,dark},

  data: () => ({
    drawerChecker: false,
    loading: true,
    data: null,
    drawerCheckerSide: true,
  }),

  methods: {
    updatePageDrawerChecker() {
      this.drawerChecker = !this.drawerChecker;
    }, getData() {

      axios.get(`https://tedline.org/api/course/RetrieveCourses/${this.$route.params.id}/`, {
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