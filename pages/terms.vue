<template>
    <Head>
        <Title>قوانین</Title>
     </Head>
    <v-app class="">
       
        <Navbar />
        <v-container class="container rtl pt-10 mt-10 pt-5">
           
            <div v-if="loading == false">
                <h1 class="irsa fs-1 text-blue">قوانین</h1>
                <br />

                <div v-for="result in data" :key="result.id" class="border-bottom py-5">
                    <div class="d-flex">
                        <p class=" font-weight-black pa-3 fs-3  ">{{ result.title }}</p>
                    </div>
                    <p class="fs-5" v-html="result.body"></p>
                </div>
            </div>
            <div class="d-flex justify-center">
                <v-progress-circular v-if="loading" :size="60" class="ma-10" :width="10" color="blue"
                  indeterminate></v-progress-circular>
              </div>

        </v-container>
   
    </v-app>
</template>
  
<script>
export default {


    data() {
        return {
            data: [],
            loading: true,
        };
    },
    methods: {
        async getData() {
            fetch(`https://tedline.org/api/account/TermsListApi/`, {
                headers: {
                    "Content-type": "application/json",
                    Accept: "application/json",
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    this.data = data;
                    this.loading = false;
                    console.log(this.data);
                });
        },
    },
    mounted() {
        this.getData();
    },
};
</script>
  
<style></style>