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
            <v-col lg="3" md="3" sm="12" cols="12">
                <v-card  class="ma-5" elevation="0">
                    <v-row v-for="item in sideItems" :key="item">
                        <v-col>
                            <h4>{{item.testTitle}} :</h4>
                            <v-text-field
                                v-model="input"
                                placeholder="Search"
                                class="mt-2 pa-0"
                                outlined
                                color="teal"
                                dense
                            >
                                <template slot="append">
                                    <v-btn depressed class="mt-0" small style="vertical-align:center;margin-top:-2px !important; margin-right:-4px !important" @click="show">
                                        <v-icon>mdi-plus</v-icon>
                                    </v-btn>
                                </template>
                            </v-text-field>
                        <v-textarea
                            style="margin-top:0px !important"
                            name="input-7-1"
                            outlined
                            background-color="white"
                            color="teal"
                            auto-grow
                            placeholder="type here..."
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
            <v-col lg="" md="9" sm="12" cols="12">
                <v-card  class="ma-5" elevation="0">
                   <v-row>
                        <v-col>
                            <h4>Patient Information :</h4>
                            <v-card color="teal lighten-5" outlined class="mt-2" elevation="0" style="border: 1px solid #e7e7e7" width="100%">
                                <v-row>
                                    <v-col>
                                        <v-card-subtitle>
                                            <b>Patient ID:</b> <br>PID0234
                                        </v-card-subtitle>
                                    </v-col>
                                    <v-col>
                                        <v-card-subtitle>
                                            <b>Patient Name:</b> <br> Mr. Mahtab Uddin
                                        </v-card-subtitle>
                                    </v-col>
                                     <v-col>
                                        <v-card-subtitle>
                                            <b>Age</b> <br> 34 year's old
                                        </v-card-subtitle>
                                    </v-col>
                                    <v-col>
                                        <v-card-subtitle>
                                            <b>Phone Number:</b> <br> 01734543027
                                        </v-card-subtitle>
                                    </v-col>
                                </v-row>
                            </v-card>
                        </v-col>
                   </v-row>
                   <v-row>
                        <v-col>
                            <v-card class="pa-4 mt-2" elevation="0" style="border: 1px solid #e7e7e7" width="100%">
                                <v-row class="rowise">
                                    <v-col>
                                        <v-text-field
                                            v-model="input"
                                            class="mt-2 pa-0"
                                            outlined
                                            color="#666666"
                                            dense
                                            label="Pulse"
                                        >
                                            <template slot="append">
                                                <v-chip color="info" small>/min</v-chip>
                                            </template>
                                        </v-text-field>
                                    </v-col>
                                    <v-col>
                                        <v-text-field
                                            v-model="input"
                                            placeholder="120/80"
                                            class="mt-2 pa-0"
                                            outlined
                                            color="#666666"
                                            dense
                                            label="BP"
                                        >
                                            <template slot="append">
                                                <v-chip color="green" small>mmHg</v-chip>
                                            </template>
                                        </v-text-field>
                                    </v-col>
                                     <v-col>
                                        <v-text-field
                                            v-model="input"
                                            class="mt-2 pa-0"
                                            outlined
                                            color="#666666"
                                            dense
                                            label="Temparature"
                                        >
                                            <template slot="append">
                                                <v-chip color="orange" small>°F</v-chip>
                                            </template>
                                        </v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row class="rowise">
                                    <v-col>
                                        <v-autocomplete
                                            v-model="input"
                                            :items="select"
                                            placeholder="Search Drug Name"
                                            class="mt-2 pa-0"
                                            outlined
                                            color="teal"
                                            dense
                                        >
                                            <template slot="append">
                                                <v-btn depressed class="mt-0" small style="vertical-align:center;margin-top:-2px !important; margin-right:-4px !important" @click="show">
                                                    <v-icon>mdi-plus</v-icon>
                                                </v-btn>
                                            </template>
                                        </v-autocomplete>
                                    </v-col>
                                    <v-col>
                                        <v-autocomplete
                                            v-model="input"
                                            :items="select"
                                            placeholder="Select a Dose"
                                            class="mt-2 pa-0"
                                            outlined
                                            color="teal"
                                            dense
                                        >
                                            <template slot="append">
                                                <v-btn  depressed class="mt-0" small style="vertical-align:center;margin-top:-2px !important; margin-right:-4px !important" @click="show">
                                                    <v-icon>mdi-plus</v-icon>
                                                </v-btn>
                                            </template>
                                        </v-autocomplete>
                                    </v-col>
                                </v-row>
                            </v-card>
                        </v-col>
                   </v-row>
                </v-card>
            </v-col>
    </v-row>
    </div>
</template>
<script>
export default {
    data() {
        return {
            input: "",
            sideItems: [
                {
                    testTitle: "Cheif Complaints",
                },
                {
                    testTitle: "On Examination",
                },
                {
                    testTitle: "Diagnosis",
                },
                {
                    testTitle: "Investigation Advice",
                }
            ],
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
            select: ["Napa","Bexted","Koroz"]
        }
    },
    methods: {
        show(){ 
            return 0   
        }
    }
}
</script>
<style lang="scss" scoped>
.rowise .col {
    padding-bottom: 0px !important;
}
</style>