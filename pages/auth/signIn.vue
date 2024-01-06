
<template>
  <Head>
    <Title>ورود</Title>
 </Head>
<Auth :step="1" />
</template>

<script>
import axios from "axios";
import Auth from "~/components/section/auth/Auth.vue";
export default {
 
 components:{
  Auth
 }
};
</script>