<template>
  <div class="  curved" >
    <v-container class=" mb-10 text-auto  ">
      <v-row justify="center" class="mb-md-16 mb-0 mt-0 ">
        <v-col cols="12" sm="6" lg="6" xl="4"  class="ml-auto">
          <v-img  class=" hidden-sm-and-down "  src="/images/header2.png">
         
          </v-img>
        </v-col>
        
        <v-col cols="12" sm="6" lg="6" class="d-flex align-center flex-wrap ">
          
          <div class="text-md-right text-center">
            <div class="   ">
              <div class=" text-body-2 text-md-body-1 text-md-h6 text-blue-lighten-3 irsa font-weight-bold">
                هیجان یادگیری و شگفتی های نو
              </div>
 
              <h2 class="text-h5 text-white text-md-h4 pt-3 font-weight-bold line-height-sm  irsa mt-3 ">پلتفرم آموزشی <span class="text-auto  rounded-pill bg-blue bg-blue-darken-4  px-7   ">تدلاین</span>
              </h2>
            </div>
        
            <p class=" rtl  mt-3 pt-4 me-lg-16 text-blue-lighten-4 pe-lg-16 line-height-md text-body-2 text-md-body-1 irsa">
              فضایی برای یادگیری و آموزش، که منجر به کسب مهارت و توسعه حرفه‌ای شما می‌شود.
            </p>
            <div class="mt-6 pt-2 justify-center justify-lg-end  d-flex">
              <div>
                <div class="stylish-input-group">
                  <input  v-on:keyup.enter="$router.push('/explore/?search='+text);" v-model="text" placeholder="درس مورد نظر شما" class="custom-search text-body-2 irsa bg-glass   px-md-16 px-3">
                  <v-btn rounded :to="'/explore/?search='+text"  elevation="0" class="bg-blue-darken-4 text-white text-uppercase custom-btn  font-weight-medium" dark>
                    جستجو
                  </v-btn>
                </div>
                
               
              </div>
              
            </div>
            <v-chip :to="'/explore/?category=' + item.id"  v-for="item in data" :key="item.id + '+category+header'" color="white" class="mt-3 mx-1 px-3 text-xs-2" size="small" variant="tonal">
              {{ item.title }}
            </v-chip>
          </div>
        </v-col>
      </v-row>
    </v-container>
    
  
    <v-sheet height="20" color="auto" elevation="0"  class=" rounded-t-lg hidden-md-and-up w-100 " >
      <div class="d-flex justify-center">
        <v-sheet width="60" height="5" rounded="pill" class="mt-3" color="grey3"></v-sheet>
      </div>
    </v-sheet>
  </div>
</template>
<script >
import axios from "axios";

export default {

  data: () => ({

   
    data: [],
    loading: true,
  }),
  methods: {
    getData() {
      axios.get('https://tedline.org/api/course/CourseCategoryPopular/').then((response) => {
        this.data = response.data.slice(0, 4);
        this.loading = false
      }
      )
    }

  }, mounted() {
    this.getData()
  }
}
</script>
<style scoped lang="scss">


.stylish-input-group {
  display: flex;
  align-items: center;
}

.stylish-input-group .v-field__input {
  padding-bottom: 0;
}

.stylish-input-group .v-text-field__details {
  display: none;
}

.stylish-input-group .custom-search {
  margin-bottom: 0;
  border-radius: 36px 0 0 36px !important;
  text-indent: 35px;
  font-weight: 300;
  text-overflow: ellipsis;
  min-height: 72px;
  
  box-shadow: -5px 0 30px 0 rgb(0 0 0 / 5%);
}

.stylish-input-group .custom-btn {
  border-radius: 0 36px 36px 0 !important;
  height: 72px !important;
  padding: 0 30px !important;
}


@media (max-width: 767px) {
  .stylish-input-group .v-input__slot {
    min-height: 60px;
    padding-left: 20px !important;
  }
  .curved {
    background-color: #2a2a72;

    background-image:radial-gradient(ellipse 100% 80% at 80% 0%, #0473e9 89.9%, #ffffff00 90%), radial-gradient(ellipse 100% 100% at 20% 7%, #045de9 89.9%, #ffffff00 90%),
    radial-gradient(ellipse 100% 90% at 50% 50%, #1c7ce3 89.9%, #ffffff00 90%);
  }
}
@media (min-width: 767px) {

  .curved {
    padding: 10px 20px 50px 20px;
    background-image:radial-gradient(ellipse 100% 60% at 80% 0%, #0473e9 89.9%, #ffffff00 90%), radial-gradient(ellipse 100% 90% at 50% 7%, #045de9 89.9%, #ffffff00 90%),
        radial-gradient(ellipse 100% 90% at 60% 10%, rgba(var(--v-theme-primary-lighten-5)) 89.9%, #ffffff00 90%);
    text-align: center;
    font-family: sans-serif;
    text-transform: uppercase;
  
  }
}




</style>
