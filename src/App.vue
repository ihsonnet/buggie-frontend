<template>
    <router-view/>
</template>
<script>
export default {
  data: () => ({
    //
  })
  ,
  mounted() {
    if (location.protocol !== "http:") {
  location.protocol = "http:";
}
  }
}
</script>
<style lang="scss" scoped>
body {
  font-family: 'Open Sans', sans-serif;
}
.v-application {
   font-family: 'Open Sans', sans-serif !important;
    .title { // To pin point specific classes of some components
       font-family: 'Open Sans', sans-serif !important;
    }
 }
</style>
