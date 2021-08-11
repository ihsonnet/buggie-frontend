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
              <v-img src="https://avatars.githubusercontent.com/u/48057930?v=4"></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title class="text-h6">
               Injamamul Haque Sonet
              </v-list-item-title>
              <v-list-item-subtitle>Project Manager</v-list-item-subtitle>
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
          <v-list-item link to="bug-list">
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
          <v-list-item link to="team-members">
            <v-list-item-icon>
              <v-icon>mdi-account-supervisor-circle-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Team Members</v-list-item-title>
          </v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>
<style lang="scss" scoped>
.v-list-item__title {
  font-size: 15px !important;
}
.v-breadcrumbs__item a{
  font-weight: bolder !important;
}
</style>
