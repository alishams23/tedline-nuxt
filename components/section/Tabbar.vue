<template>
  <v-snackbar
  v-model="snackbar"
  class="rtl"
  color="blue-accent-4"
  elevation="24"
  rounded="lg"
>
<template v-slot:actions>
  <v-btn
    color="auto"
    variant="text"
    icon="fal fa-times"
    @click="snackbar = false"
  >
  </v-btn>
</template>
  این بخش در حال اپدیت است

 
</v-snackbar>
  <v-card elevation="0" color="transparent">
    <v-tabs
      v-model="tab"
      align-tabs="center"
      elevation="0"
   
     slider-color="transparent" 
     color="blue-accent-4"
     density="comfortable"
    >
      <v-sheet class=" rounded-pill bg-grey5 " >
        <v-tab class="bg-transparent  px-7 px-md-16 rounded-pill "  variant="flat" value="one">دانشجویان</v-tab>
      <v-tab class="bg-transparent px-7 mx-1 px-md-16  rounded-pill "  variant="flat" value="two">مدرسین</v-tab>
      <v-tab class="bg-transparent px-7 px-md-16 rounded-pill "  variant="flat" value="three">سازمان ها</v-tab>
      </v-sheet>
    </v-tabs>
    <v-card-text>
      <v-window v-model="tab">
        <v-window-item value="one">
            <v-container class=" py-12">
                <v-row justify="center">    
                    <v-col cols="11" md="6" class="text-center">
                      <div class="font-weight-bold pb-3">
                        شروع به یادگیری کنید و دانش خود را در هر سطحی گسترش دهید</div>
         
                      <div class="rtl   font-weight-light line-height-md">
                        با شروع به یادگیری، دنیایی از فرصت‌ها را در دست خواهید داشت. تمرکز بر یادگیری در هر سطحی، نه تنها به شما کمک می‌کند تا دانش خود را گسترش دهید، بلکه به شما .
                        <span class="font-weight-bold">
                          اعتماد به نفس و احساس پیشرفت
                        </span>
                        را نیز هدیه خواهد داد. هر روز با یک قدم کوچک، می‌توانید به دستاوردهای بزرگی در مسیر یادگیری دست پیدا کنید. همچنین، به یاد داشته باشید که هیچ وقت برای یادگیری خیلی دیر نیست و همیشه فرصتی برای بهبود و پیشرفت وجود دارد
                      </div>
                      <div class="pt-15  pt-2">
                        <v-btn
                          nuxt
                          large
                          to="/auth/signUp"
                          class=" btn-arrow px-12"
                          depressed
                          rounded
                          color="blue"
                          elevation="0"
                        >
                          <span>ثبت نام</span>
                          <i class="mdi mdi-arrow-right"></i>
                        </v-btn>
                      </div>
                    </v-col>
               
                </v-row>
              </v-container>
      
        </v-window-item>
        <v-window-item value="two">
            <v-container class=" py-12">

                <v-row justify="center">
                  <v-col cols="11" md="6" class="text-center">
                    <div class="font-weight-bold pb-3"> 
                      
                      تخصص و مهارت خودتان را آموزش دهید و به صورت همزمان دانش خود را توسعه دهید
                    
                    </div>
               
                      <div class="rtl  font-weight-light line-height-md">
                       با ارتقاء تخصص و مهارت‌های خود، می‌توانید به عنوان یک کارشناس در زمینه‌ای خاص شناخته شوید. آموزش دادن دانش خود به دیگران علاوه بر تقویت یادگیری شما، به شما فرصتی می‌دهد تا دستاوردها و دانش‌های خود را با دیگران به اشتراک بگذارید. این تبادل دانش، باعث افزایش تعاملات شما با افراد مختلف و گسترش دایره‌ی آشنایی‌های شما خواهد شد.

به علاوه، همزمان با آموزش دادن به دیگران، خودتان نیز می‌توانید از دانش خود بهره‌برداری کنید. با انتقال دانش به دیگران، نه تنها آنها از شما یاد می‌گیرند، بلکه شما نیز با بازنگری و تدریس مفاهیم، دانش خود را تثبیت و تقویت می‌کنید.
  </div>
        
                      <div class="pt-15  pt-2">
                        <v-btn
                          nuxt
                          large
                          @click="snackbar = true"
                          
                          class="btn-custom-lg btn-arrow px-12"
                          depressed
                          rounded
                          color="blue"
                          elevation="0"
                        >
                          <span>ارتباط با ما</span>
                          <i class="mdi mdi-arrow-right"></i>
                        </v-btn>
                      </div>
                   
               </v-col>
                </v-row>
        
               
              </v-container>
      
        </v-window-item>
        <v-window-item value="three">
            <v-container class=" py-12">
               
                <v-row justify="center">
                  <v-col cols="11" md="6" class="text-center">
                    <div class="font-weight-bold pb-3"> نیروی انسانی خودتان ارتقا دهید و یادگیری را وارد فرهنگ سازمانی خود کنید</div>
                      <div class="   font-weight-light line-height-md">
                        ارتقاء نیروی انسانی، یکی از اصول اساسی در موفقیت سازمان‌هاست. با ایجاد فرهنگ یادگیری در داخل سازمان، می‌توانید زمینه‌ای را برای بهبود مداوم دانش و مهارت‌های کارکنان فراهم کنید. این فرهنگ، افراد را ترغیب می‌کند تا همیشه به دنبال فرصت‌های جدید یادگیری باشند و تجربیات خود را با هم به اشتراک بگذارند.
                      </div>
                      <div class="pt-15  pt-2">
                        <v-btn
                          nuxt
                          large
                          @click="snackbar = true"

                          class="btn-custom-lg btn-arrow px-12"
                          depressed
                          rounded
                          color="blue"
                          elevation="0"
                        >
                        <span>ارتباط با ما</span>

                          <i class="mdi mdi-arrow-right"></i>
                        </v-btn>
                      </div>
               </v-col>
                </v-row>
              </v-container>
        </v-window-item>
      </v-window>
    </v-card-text>
  </v-card>
</template>
<script>
  export default {
    data: () => ({
      tab: null,
      snackbar:false
    }),
  }
</script>

