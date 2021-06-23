<template>
    <v-row>
        <v-col cols="3">
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
        <v-col cols="9">

        </v-col>
    </v-row>
</template>
<script>
export default {
    data() {
        return {
            input: "new"
        }
    },
    methods: {
        show(){ 
            return 0   
        }
    }
}
</script>
