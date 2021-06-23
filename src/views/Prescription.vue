<template>
    <div>
        <v-card rounded="0" elevation="0" color="#f2f5f8"> 
            <v-breadcrumbs :items="items">
            <template v-slot:divider>
                <v-icon>mdi-chevron-right</v-icon>
            </template>
            </v-breadcrumbs>
        </v-card>
        <v-row>
        <v-col cols="12" lg="3" md="3" sm="12" xs="12">
            <v-card  class="ma-5" elevation="0">
                <v-row>
                    <v-col>

                    </v-col>
                </v-row>
                <v-row v-for="i in 5" :key="i">
                    <v-col>
                        <v-text-field
                            v-model="search"
                            label="Advice"
                            placeholder="Search"
                            class="ma-0 pa-0"
                            outlined
                            color="teal"
                            dense
                        >
                            <template slot="append">
                                <v-btn depressed class="mt-0" small style="vertical-align:center;" @click="getDataFromApi">
                                    <v-icon>mdi-plus</v-icon>
                                </v-btn>
                            </template>
                        </v-text-field>
                       <v-textarea
                        style="margin:0px"
                        name="input-7-1"
                        outlined
                        background-color="white"
                        color="teal"
                        auto-grow
                        ></v-textarea>
                        <v-divider
                        ></v-divider>
                    </v-col>
                </v-row>
            </v-card>
        </v-col>
        <v-divider
        class="mx-0"
        vertical
        ></v-divider>
        <v-col cols="12"  lg="9" md="9" sm="12" xs="12">

        </v-col>
    </v-row>
    </div>
</template>
<script>
export default {
    data() {
        return {
            input: "new",
            items: [
        {
          text: 'a2sDMS',
          disabled: false,
          href: 'https://a2sdms.com',
        },
        {
          text: 'Create Prescription',
          disabled: true,
          href: 'rx-prescription',
        },
      ],
        }
    },
    methods: {
        show(){ 
            return 0   
        }
    }
}
</script>
