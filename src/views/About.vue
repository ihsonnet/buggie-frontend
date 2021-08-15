<template>
<div>
    <v-card rounded="0" elevation="0" color="#f2f5f8"> 
        <v-breadcrumbs :items="items">
        <template v-slot:divider>
            <v-icon>mdi-chevron-right</v-icon>
        </template>
        </v-breadcrumbs>
    </v-card>
    <v-container>
        <v-alert
        class="ma-auto pa-10 mt-5"
      border="left"
      colored-border
      flat
      color="purple lighten-3"
      elevation="2"
    >
    <br>
      <h2 style="color:#B678B8">Buggie | A OpenSource Bug Report Management Tool</h2> <br><br>
      <h3>Backend Technology: Java , Spring Boot , Rest Api</h3><br>
      <h3>Database: PostgreSQL</h3> <br>
      <h3>Frontend Technology: Vue.Js , Vuetify.Js</h3><br>

      <h3>Api Documentation: <a href="https://buggie-backend.herokuapp.com/swagger-ui.html">https://buggie-backend.herokuapp.com/swagger-ui.html</a></h3><br>
      <h3>GitHub Repository:</h3>
      <h4>Buggie Backend: <a href="https://github.com/ihsonnet/buggie-backend">https://github.com/ihsonnet/buggie-backend</a></h4>
      <h4>Buggie Frontend: <a href="https://github.com/ihsonnet/buggie-frontend">https://github.com/ihsonnet/buggie-frontend</a></h4><br><br>
    </v-alert>
    </v-container>
</div>
    
</template>
<script>
  export default {
    data: () => ({
      items: [
        {
          text: 'a2sDMS',
          disabled: false,
          href: 'https://a2sdms.com',
        },
        {
          text: 'About',
          disabled: true,
          href: 'about',
        },
      ],
    }),
  }
</script>