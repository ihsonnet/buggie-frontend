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
        class="ma-auto"
      border="left"
      colored-border
      color="deep-purple accent-4"
      elevation="2"
    >
      Aliquam eu nunc. Fusce commodo aliquam arcu. In consectetuer turpis ut velit. Nulla facilisi..

      Morbi mollis tellus ac sapien. Fusce vel dui. Praesent ut ligula non mi varius sagittis. Vivamus consectetuer hendrerit lacus. Suspendisse enim turpis, dictum sed, iaculis a, condimentum nec, nisi.
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
          text: 'Create Appointment',
          disabled: true,
          href: 'create-appointment',
        },
      ],
    }),
  }
</script>