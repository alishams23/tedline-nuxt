<template>
    <quiz :answer="changeAnswer" :data="data" />
    <v-btn :loading="loading" color="blue" :disabled="answer == false || answer == null"
        @click="answer && answer != false ? getData() : null" rounded="xl" variant="flat" class="px-10 mx-5 mb-3 text-body-2">
        ثبت
    </v-btn>
    <v-alert v-if="result && result.result == 'correct'" class="rtl mt-10" variant="tonal" border="start" type="success">
        پاسخ شما صحیح است
    </v-alert>
    <v-alert v-if="result && result.result == 'incorrect'" class="rtl mt-10" variant="tonal" border="start" color="red">
        پاسخ شما صحیح نیست

        <div class=" font-weight-bold mt-5 px-2">
            پاسخ صحیح:
        </div>
        <div class="mt-3 px-4">
            {{ result.answer }}
        </div>
    </v-alert>
</template>
    
<script>

import '~/assets/styles/video.css'
import axios from "axios";
import quiz from '~/components/shared/quiz.vue';
import { IconSquareRoundedX } from '@tabler/icons-vue';

export default {
    props: ['data', 'idVideo'],
    components: { quiz },
    data() {
        return {
            loading: false,
            answer: null,
            result: null

        };
    },
    async mounted() {
        await this.$store.commit('onStart')
    },
    methods: {

        changeAnswer(answer) {
            this.answer = answer
            this.result = null
        },
        getData() {
            this.loafing = true
            axios.get(`http://127.0.0.1:8000/api/box/video/check_answer/${this.answer}/${this.idVideo}/${this.data.id}/`, {
                headers: {
                    "Content-type": "application/json",
                    Accept: "application/json",
                    Authorization: this.$store.state.token != ''
                        ? `Token ${this.$store.state.token}`
                        : ''
                },
            }).then((response) => {
                this.loading = false
                this.result = response.data
                
            }
            )
        }
    }
};
</script>
  
