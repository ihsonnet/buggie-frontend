<template>
<v-app>
  <v-app-bar
      elevation="0"
      app
      height="73px"
      style="border-bottom:1px solid #e7e7e7 !important"
      color="white"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Name"
          class="shrink bt-2 mr-2"
          contain
          min-width="100"
          src="../assets/hero-logo.png"
          width="140"
        />
      </div>

      <v-spacer></v-spacer>

      <v-btn
        color="#E5606B"
        to="/auth/signin"
        text
      >
        <v-icon>mdi-exit-to-app</v-icon>
        <span class="mr-2">Log Out</span>
      </v-btn>
    </v-app-bar>
    <side-nav></side-nav>
    <v-main>
     <router-view/>
    </v-main>
</v-app>
</template>

<script>
import SideNav from '../views/SideNav.vue'
export default {
  name: 'App',
  components: {
    'side-nav': SideNav
  },
  data () {
    return {
    }
  },
  beforeMount(){
      if(localStorage.accTkn == undefined){
            this.$router.push("/auth/signin")
        }
  },
  mounted(){
        // this.getProfileInfo();
    }
}
</script>

<style lang="scss" scoped>

</style>
