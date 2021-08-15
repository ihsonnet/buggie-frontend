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
        @click="logout()"
        color="#e55a67"
        outlined
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
import axios from "axios"
import SideNav from '../views/SideNav.vue'
export default {
  name: 'App',
  components: {
    'side-nav': SideNav
  },
  data () {
    return {
      GET_LOGGED_IN_PROFILE_API: "https://buggie-backend.herokuapp.com/auth/user-info",
      user: {},
      auth: "Bearer " + localStorage.getItem("token"),
    }
  },
  methods: {
    getProfileInfo() {
      console.log(this.auth)
      axios({
        method: "get",
        url: this.GET_LOGGED_IN_PROFILE_API,
        headers: {
          Authorization: this.auth,
          "Content-Type": "application/json"
        }
      })
      .then(r => {
      console.log(r.data)
      this.user = r.data;
      localStorage.setItem("userInfo", JSON.stringify(r.data));
      // location.reload();
              })
      .catch(r => {
        console.log(r)
      });
    },
    logout(){
      localStorage.removeItem("token")
      localStorage.removeItem("userInfo")
      localStorage.removeItem("projectInfo")
      this.$router.push("/auth/signin")
    },
  },
  beforeMount(){
      if(localStorage.token == undefined){
            this.$router.push("/auth/signin")
        }
      else{
            this.getProfileInfo();
      }
  },
  mounted(){
      console.log("mounted")
    }
}
</script>

<style lang="scss" scoped>

</style>
