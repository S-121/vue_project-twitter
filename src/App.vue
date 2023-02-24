<template>
  <v-app>
    <router-view />
  </v-app>
</template>
<script>

export default {
  name: "App",
  data (){
    return{
    }
  },

};
</script>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

</style>


