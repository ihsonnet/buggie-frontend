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
              <v-img src="https://randomuser.me/api/portraits/women/85.jpg"></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title class="text-h6">
                Dr. Sandra Adams
              </v-list-item-title>
              <v-list-item-subtitle>MBBS, Dhaka Medical College</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list
          nav
          dense
        >
          <v-list-item link to="/rx-prescription">
            <v-list-item-icon>
              <v-icon>mdi-prescription</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Create Presciption</v-list-item-title>
          </v-list-item>
          <v-list-item link to="/create-appointment">
            <v-list-item-icon>
              <v-icon>mdi-clipboard-plus</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Create Appointment</v-list-item-title>
          </v-list-item>
          <v-list-item link to="appointment-list">
            <v-list-item-icon>
              <v-icon>mdi-clipboard-text</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Appointment List</v-list-item-title>
          </v-list-item>
          <v-list-item link to="generic-controller">
            <v-list-item-icon>
              <v-icon>mdi-pill</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Generic Contoller</v-list-item-title>
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
