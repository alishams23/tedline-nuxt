<template>

<Navbar :shadow="true" />

<div class="d-flex h-100 justify-center align-center" v-if="loading">
    <v-progress-circular :size="60" class="ma-10" bg-color="transparent" :width="6" color="blue"
      indeterminate></v-progress-circular>
  </div>

<v-container v-if="data">

  <v-img 
  v-if="loading == false" class="rounded-xl mt-10 " rounded="xl" :aspect-ratio="30 / 9" cover
  :src="data.imageBlog.photo"
  >
  <div class="h-100  w-100 rounded-xl d-flex align-end">
      <div class="bg-gradient-glass h-100 d-flex flex-column justify-end  pt-16 py-md-5 w-100 ">
        <v-container>
          <h1 class=' text-h6 text-white text-md-h5 font-weight-black irsa rtl py-5 py-md-10'>
            {{ data.title }}
          </h1>
        
          <div  class="d-flex justify-end">
            <v-card  color="transparent" class="rtl" elevation="0">
        

          </v-card>

            <v-card v-if="data.author" color="transparent" class="rtl     " elevation="0"
              :to="'/profile/' + data.author.username">
              <v-list-item class="  m ">
                <template v-slot:prepend>
                  <v-avatar size="50" class=" rounded-2lg bg-blue-gradient-2 text-white">
                    <v-icon size="15" class="position-absolute" icon="fad fa-users"></v-icon>
                    <v-img :src="`https://tedline.org/api/account/user_profile_image/${data.author.username}`"
                      cover></v-img>

                  </v-avatar>
                </template>
                <v-list-item-title class=" font-weight-bold text-md-1 text-white">{{ data.author.username
                }}
              </v-list-item-title>
                <v-list-item-subtitle class="text-xs mt-2 text-white">{{ data.author.get_full_name
                }}</v-list-item-subtitle>
              </v-list-item>

            </v-card>
          </div>
     
        </v-container>
      </div>
    </div>
  </v-img>



<div class="mx-5 px-md-10">
  <ShowTextEditor  :content="data.body"/>

</div>

</v-container>
</template>

<script>
import axios from 'axios'
import ShowTextEditor from '~/components/shared/ShowTextEditor.vue'

export default {
  setup() {
    definePageMeta({
      layout: "dashboard",
    })
  },
  components:{ShowTextEditor},

  data() {
    return {
      loading: true,
      loadingCategory: true,
      data: null,
      category: null,
      editorOptions: {
        theme: 'bubble'
      }
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    async getData() {
      this.loading=true
      await axios
        .get(
          `https://tedline.org/api/blog/blog_retrieve/${this.$route.params.id}/`,
          {
            headers: {
              'Content-type': 'application/json',
              Accept: 'application/json',
              Authorization:
                this.$store.state.token != ''
                  ? `Token ${this.$store.state.token}`
                  : ''
            }
          }
        )
        .then(response => (this.data = response.data))
      this.loading = false
      
    },
    async like(id) {
      await fetch(
        `https://tedline.org/api/blog/AddLikeView/?id=${this.$route.params.id}`,
        {
          headers: {
            'Content-type': 'application/json',
            Accept: 'application/json',
            Authorization:
              this.$store.state.token != ''
                ? `Token ${this.$store.state.token}`
                : ''
          }
        }
      )
      if (this.data.likeAuthor == true) {
        this.data.likeAuthor = false
        this.data.like_count--
      } else {
        this.data.likeAuthor = true
        this.data.like_count++
      }
    },
   shareLink() {
      this.copyToClipboard(`https://tedline.org/t/blog/${this.data.id}/`);
      alert(` کپی شد.`);
    },copyToClipboard (textToCopy) {
      // navigator clipboard api needs a secure context (https)
      if (navigator.clipboard && window.isSecureContext) {
        // navigator clipboard api method'
        return navigator.clipboard.writeText(textToCopy)
      } else {
        // text area method
        const textArea = document.createElement('textarea')
        textArea.value = textToCopy
        // make the textarea out of viewport
        textArea.style.position = 'fixed'
        textArea.style.left = '-999999px'
        textArea.style.top = '-999999px'
        document.body.appendChild(textArea)
        textArea.focus()
        textArea.select()
        // eslint-disable-next-line promise/param-names
        return new Promise((res, rej) => {
          // here the magic happens
          // eslint-disable-next-line prefer-promise-reject-errors
          document.execCommand('copy') ? res() : rej()
          textArea.remove()
        })
      }
    },
  }

}
</script>