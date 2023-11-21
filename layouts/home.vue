
<template>
    <v-app >
  
      <Navbar :transparent="false"   />
  
      <v-main>
        
        <slot />  
      
      </v-main>
  
    </v-app>
  </template>
  <script>
 
export default {
  mounted(){
    this.$store.commit('onStart');

  }
}
</script>