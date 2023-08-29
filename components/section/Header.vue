<template>
  <div class=" custom-bg-gradient-blue-light">
    <v-container class="py-12 mb-12 ">
      <v-row justify="center" class="my-12 ">
        <v-col cols="12" sm="6" lg="6" xl="4"  class="ml-auto">
          <v-img  class=" hidden-sm-and-down"  src="/images/header.png">
           <v-sheet height="550" color="transparent">
           </v-sheet>
          </v-img>
        </v-col>
        <v-col cols="12" sm="6" lg="6" class="d-flex align-center flex-wrap ">
          <div class="text-right">
            <div class="   ">
              <div class=" text-h6 text-md-h5 irsa font-weight-bold">
                هیجان یادگیری و شگفتی های نو
              </div>
              <h2 class="text-h4 text-md-h3 pt-3 font-weight-bold line-height-sm  irsa  mt-3">پلتفرم آموزشی <span class="text-blue">تدلاین</span>
              </h2>
            </div>
            <p class="mt-3 pt-4 ms-lg-16 ps-lg-16 line-height-md text-body-1 irsa">
              فضایی برای یادگیری و آموزش هایی که منجر به کسب مهارت
            
              و زندگی حرفه ای شما می شود
            </p>
           
            <div class="mt-6 pt-2 justify-center justify-lg-end d-flex">
              <div>
                <div class="stylish-input-group">
                  <input  v-on:keyup.enter="$router.push('/explore/?search='+text);" v-model="text" placeholder="درس مورد نظر شما" class="custom-search bg-white px-md-16 px-8">
                  <v-btn rounded :to="'/explore/?search='+text" color="blue" elevation="0" class=" text-uppercase custom-btn font-weight-medium" dark>
                    جستجو
                  </v-btn>
                </div>
              </div>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
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
}


</style>
