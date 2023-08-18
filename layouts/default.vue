
<template>
 
      <slot />  
 
  
</template>

<script>
 
export default {
      mounted() {

this.$store.commit('onStart');
}
  ,
}
</script>