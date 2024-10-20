<template>
  <v-container class="">
    <div class="pa-8 border rounded-xl ma-5 bg-grey4 mt-8 rtl" v-if="question.image_url">
  
          <p class="text-body-1 mb-5 irsa">
            تصویر پیوست شده
          </p>
            <v-img
              class="mb-2"
              width="auto"
              rounded="xl"
              cover
              :src="question.image_urlg"
            ></v-img>
          </div>
    <v-card color="transparent" dir="rtl" class="pa-5 pt-0" elevation="0">
      
      <v-card-title class="headline text-h5 font-weight-bold"></v-card-title>
      <v-card-text>
      
         <div class="d-flex ">
          <v-avatar class="mx-4 " size="x-large" rounded="lg" color="blue" variant="tonal">
            <v-icon size="20"> fad fa-question</v-icon>
          </v-avatar>
             <p class="text-h6 irsa mt-3 font-weight-medium">
               {{ question.title }}
             </p>
          
         </div>
      
        <v-radio-group v-model="selectedOption" dir="rtl" class="mt-4 mr-1">
          <v-row class="mt-5">
            <v-col
              cols="12"
              sm="12"
              md="6"
              v-for="(item, index) in question.options"
              :key="item + index"
              @click="selectedId(item.id)"
            >
              <v-radio
                :class="getRadioClass(item.id)"
                :label="item.title"
                :id="item.id"
                class="rounded-xl "
             
                @change="selectedId(item.id)"
                :value="item.id"
              ></v-radio>
            </v-col>
          </v-row>
        </v-radio-group>
        <div class=" d-flex mt-5">
         
            <v-btn
              @click="plusCurrentQuestion"
              :loading="loading"
              
              class="px-10  ml-5"
              color="blue"
              elevation="0"
              rounded="pill"
              >ثبت پاسخ</v-btn
            >
       
            <v-btn
              @click="minusCurrentQuestion"
      
              class="px-6"
              color="blue"
              variant="tonal"
              rounded="pill"
              elevation="0"
              >سوال قبل</v-btn
            >
    
        </div>
        
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  props: ["question"],
  emits: ["currentQuestionPlusOne", "currentQuestionMinusOne", "selectedId"],
  data() {
    return {
      selectedOptionId: null,
      selectedOption: this.selectedOptionId || null,
      loading: false,
    };
  },
  methods: {
    getRadioClass(radioId) {
      return this.selectedOption === radioId
        ? "rounded-lg pa-3 selected-radio"
        : "rounded-lg pa-3";
    },
    async sendUserAnswer() {
      try {
        const response = await axios.post(
          `https://tedline.org/api/quiz/answer/${this.question.id}/${this.selectedOptionId}/`,
          {},
          {
            headers: {
              Authorization: "Token f9c8de8fc98c8cf9a836eb7aa99e5d654a8aab25",
            },
          }
        );
        return response;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    async sendBlankAnswer() {
      try {
        const response = await axios.post(
          `https://tedline.org/api/quiz/answer/${this.question.id}/`,
          {},
          {
            headers: {
              Authorization: "Token f9c8de8fc98c8cf9a836eb7aa99e5d654a8aab25",
            },
          }
        );
        return response;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    async plusCurrentQuestion() {
      this.loading = true;
      try {
        let response;

        if (this.selectedOption !== null) {
          response = await this.sendUserAnswer();
        } else {
          response = await this.sendBlankAnswer();
        }
        if (response && response.status === 200) {
          console.log("Status:", response.status);
          this.loading = false;
          this.$emit("currentQuestionPlusOne");
        }
      } catch (error) {
        console.error(error);
      }
    },
    minusCurrentQuestion() {
      this.$emit("currentQuestionMinusOne");
    },
    selectedId(id) {
      this.selectedOption = id;
      this.selectedOptionId = id;
      this.$emit("selectedOptionId", id);
    },
  },
  computed: {},
  watch: {
    statement() {
      this.selectedOption = this.selectedOptionId || null;
    },
    selectedOptionId(newVal) {
      this.selectedOption = newVal || null;
    },
  },
  mounted() {},
};
</script>

<style scoped>

.v-radio {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  background-color: #938e8e0e;
  border: 1px solid rgba(158, 158, 158, 0.603);
  
}

.selected-radio {
  border: 2px solid rgb(73, 149, 255);
  background-color: rgba(0, 113, 212, 0.039);
  color: rgb(5, 103, 242);
}



</style>
