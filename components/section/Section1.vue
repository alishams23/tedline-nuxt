<template>
    <div>
      <div class="feature3-component mini-spacer ">
        <v-container class="position-relative  pt-12 pb-12 mt-12 mb-12 ">

          <v-row>
            <v-col cols="12" md="10" lg="9" class=" ">
              <v-img src="/assets/images/section.avif"
               width="100%"
               
                cover
               
                class="rounded-xl img-fluid hidden-sm-and-down"
              />
              <v-sheet height="500" class=" hidden-md-and-up">

              </v-sheet>
            </v-col>
            <v-col cols="12" md="7"  lg="5" class="feature3-card px-sm-10">
              <v-card class="shadow-2 rounded-xl">
                <div>
                  <div class="pa-10 text-center">
                    <v-chip size="small" class="bg-primary">
                      مدرس شوید
                    </v-chip>
                    <h3 class="feature3-title font-weight-black rtl font-weight-medium">
                      با علاقه و دانش خود شروع و موضوعی مناسب با تخصص خود انتخاب کنید.
                    </h3>
                    <p class="text-muted font-weight-light rtl">
                      با ابزار های لازم دوره خود را ضبط و بارگذاری کنید و از طریق سایت شروع به فروش دوره ی خود کنید
                    </p>
                    <v-btn
                      color="blue"
                      class="btn-custom-lg linking mt-10 btn-arrow rounded-pill"
                      nuxt
                      width="200"
                      large
                      to="/"
                      elevation="0"
                    >
                      <span>بیشتر بخوانید</span>
                      <i class="mdi mdi-arrow-right"></i>
                    </v-btn>
                  </div>
                </div>
              </v-card>
            </v-col>
          </v-row>
  
          <!-- -----------------------------------------------
              End Feature 3 Text
          ----------------------------------------------- -->
        </v-container>
      </div>
    </div>
  </template>
  
  <style scoped>

  .position-relative {
    position: relative !important;
  }
  .feature3-card {
    position: absolute;
    top: 17%;
    right: 0;
    .feature3-title {
      font-size: 20px;
      line-height: 30px;
      margin: 20px 0 15px;
    }
  }
  
  
  
</style>