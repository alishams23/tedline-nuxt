<template>
  
   <v-container>
    <v-locale-provider rtl  >
        <div class="mx-3 text-h6 irsa font-weight-bold ">
            {{ data.text_question }}
        </div>
    
        <div class="mt-13 px-3">
            <v-checkbox  v-for="item in data.options" class="mt-n5 w-100 "   v-model="selected"  :value="item.id">
                <template v-slot:label>
                   <div class="">
                    {{ item.text }}
                   </div>
                  </template>
                  <div></div>
            </v-checkbox>
           
    
        </div>
       
    </v-locale-provider>
   </v-container>
</template>

<script>
export default {
    props: ['data','answer'], data() {
        return {
            selected: null
        }
    },watch: {
        selected: {
      handler: function (val, oldVal) {
        this.answer(val);
      },
     
    },
  },
}
</script>