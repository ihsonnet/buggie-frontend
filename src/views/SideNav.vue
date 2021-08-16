<template>
    <v-navigation-drawer
        dark
        app
        permanent
        expand-on-hover
      >
        <v-list>
          <v-list-item class="px-2" link>
            <v-list-item-avatar>
              <v-img src="https://i.ibb.co/vXPhN8g/eff3aeec8f45.jpg"></v-img>
            </v-list-item-avatar>
            <v-list-item-content v-if="userInfo">
              <v-list-item-title class="text-h7">
               {{userInfo.firstName}} {{userInfo.lastName}}
              </v-list-item-title>
              <v-list-item-subtitle v-if="userInfo">
                <v-chip x-small color="purple">@{{userInfo.username}}</v-chip>
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list
          nav
          dense
        >
          <v-list-item link to="/dashboard">
            <v-list-item-icon>
              <v-icon>mdi-creation</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Dashboard</v-list-item-title>
          </v-list-item>
          <v-list-item disabled link to="bug-list">
            <v-list-item-icon>
              <v-icon>mdi-bug-check</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Bug Controller</v-list-item-title>
          </v-list-item>
          <v-list-item link to="/projects">
            <v-list-item-icon>
              <v-icon>mdi-application</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Projects</v-list-item-title>
          </v-list-item>
          <v-list-item link to="/about">
            <v-list-item-icon>
              <v-icon>mdi-information-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-title>About</v-list-item-title>
          </v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>
<script>
import axios from "axios"
export default {
  data(){
    return {
      GET_LOGGED_IN_PROFILE_API: "https://buggie-backend.herokuapp.com/auth/user-info",
      user: {},
      auth: "Bearer " + localStorage.getItem("token"),
      userInfo:{},
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
      this.userInfo = r.data;
      localStorage.setItem("userInfo", JSON.stringify(r.data));
      // location.reload();
              })
      .catch(r => {
        console.log(r)
      });
    },
  },
  mounted(){
      this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
      this.getProfileInfo();
  }
}
</script>
<style lang="scss" scoped>
.v-list-item__title {
  font-size: 15px !important;
}
.v-breadcrumbs__item a{
  font-weight: bolder !important;
}
</style>
