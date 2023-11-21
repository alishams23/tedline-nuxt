<template>
  <div class="  curved" >
    <v-container class=" mb-16 text-white ">
      <v-row justify="center" class="mb-md-16 mb-5 mt-10 mt-md-0 ">
        <v-col cols="12" sm="6" lg="6" xl="4"  class="ml-auto">
          <v-img  class=" hidden-sm-and-down"  src="/images/header.png">
         
          </v-img>
        </v-col>
        <v-col cols="12" sm="6" lg="6" class="d-flex align-center flex-wrap ">
          <div class="text-md-right text-center">
            <div class="   ">
              <div class=" text-body-1 text-md-h6 text-blue-lighten-3 irsa font-weight-bold">
                هیجان یادگیری و شگفتی های نو
              </div>
              <h2 class="text-h4 text-white text-md-h4 pt-3 font-weight-bold line-height-sm  irsa  mt-3">پلتفرم آموزشی <span class="text-white rounded-pill bg-blue bg-blue-darken-4  px-7   ">تدلاین</span>
              </h2>
            </div>
            <p class="mt-3 pt-4 ms-lg-16 text-blue-lighten-4 ps-lg-16 line-height-md text-body-1 irsa">
              فضایی برای یادگیری و آموزش هایی که منجر به کسب مهارت
            
              و زندگی حرفه ای شما می شود
            </p>
           
            <div class="mt-6 pt-2 justify-center justify-lg-end d-flex">
              <div>
                <div class="stylish-input-group">
                  <input  v-on:keyup.enter="$router.push('/explore/?search='+text);" v-model="text" placeholder="درس مورد نظر شما" class="custom-search bg-white px-md-16 px-3">
                  <v-btn rounded :to="'/explore/?search='+text"  elevation="0" class="bg-blue-gradient-2 text-white text-uppercase custom-btn font-weight-medium" dark>
                    جستجو
                  </v-btn>
                </div>
              </div>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
    
  
    <v-sheet height="40" elevation="0"  class=" rounded-t-xl hidden-md-and-up w-100 " style="border:1px solid  white"></v-sheet>
  </div>
</template>

<script>

export default {

  data: () => ({
    text: "",
  }),

}
</script>
<style scoped>


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
    background-image: linear-gradient(360deg, #3333b2 0%, #0473e9 74%);
  }
}
@media (min-width: 767px) {

  .curved {
    padding: 10px 20px 50px 20px;
    background-image:radial-gradient(ellipse 100% 60% at 80% 0%, #0473e9 89.9%, #ffffff00 90%), radial-gradient(ellipse 100% 90% at 50% 7%, #045de9 89.9%, #ffffff00 90%),
        radial-gradient(ellipse 100% 90% at 60% 10%, #d5eef9 89.9%, #ffffff00 90%);
    text-align: center;
    font-family: sans-serif;
    text-transform: uppercase;
  
  }
}




</style>
