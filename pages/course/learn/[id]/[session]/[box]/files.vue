<template>
  <v-container v-if="data">
    <v-list-item class="mb-5 mt-3 rounded-lg   rtl">

      <template v-slot:prepend>
        <v-avatar size="x-large" rounded="lg" color="amber">
          <v-icon color="auto"> fad fa-file</v-icon>
        </v-avatar>
      </template>
      <template v-slot:title>
        <div class="font-weight-bold">
          فایل
        </div>
      </template>
      <template v-slot:append>
        <v-btn :to="`/course/learn/${$route.params.id}/${$route.params.session}/`" icon="fal fa-arrow-left" rounded="xl"
          variant="flat"> </v-btn>
      </template>
{{ data.title }}
    </v-list-item>
    <v-card elevation="0" class="border rounded-lg my-3" v-for="(item,index) in data.sub_file" v-if="data" >
      <v-card-title class=" font-weight-black rtl"> فایل {{index + 1}}</v-card-title>
      <v-card-text >

        <v-btn :loading="loadingDownload.indexOf(item.id) == -1 ? false : true" color="blue" rounded="xl" variant="flat" class=" font-weight-black rtl" @click="downloadFile(item.id)">
          <template v-slot:prepend>
            <v-icon size="14" class="px-3">
              fad fa-download
            </v-icon>
          </template>
          دانلود فایل</v-btn>
      </v-card-text>
    </v-card>


  </v-container>
  <div class="d-flex justify-center">
    <v-progress-circular v-if="loading" :size="55" class="ma-10" bg-color="grey4" :width="7" color="blue"
      indeterminate></v-progress-circular>
  </div>
</template>
<script>
import axios from "axios";

export default {
  data() {
    return {
      data: null, 
      loading:true,
      loadingDownload:[],
    };
  },
  async mounted() {
    await this.$store.commit('onStart') // get token

    this.getData()
  },
  methods: {

    getData() {
      this.loading =true
      axios.get(`https://tedline.org/api/box/files/collections/${this.$route.params.box}/`, {
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
    ,

    async downloadFile(id) {
      try {
        this.loadingDownload.push(id)
        const response = await axios.get(`https://tedline.org/api/box/files/download/${id}/`, {
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
          Authorization: this.$store.state.token != ''
            ? `Token ${this.$store.state.token}`
            : ''
        },
      });
        this.loadingDownload.splice(this.loadingDownload.indexOf(id))

        // Trigger file download
        const a = document.createElement('a');
        a.href = `data:application/octet-stream;base64,${response.data.file_data}`;
        a.download = response.data.filename;
        a.click();
      } catch (error) {
        console.error('Error downloading file:', error);
      }
    },



  },
  
};
</script>