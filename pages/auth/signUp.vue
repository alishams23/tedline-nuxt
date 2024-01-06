
<template>
  <Head>
    <Title>ثبت نام</Title>
 </Head>
<Auth :step="2" />
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