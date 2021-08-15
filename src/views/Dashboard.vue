<template>
    <div>
        <v-card rounded="0" elevation="0" color="#f2f5f8"> 
            <v-breadcrumbs :items="items">
            <template v-slot:divider>
                <v-icon>mdi-chevron-right</v-icon>
            </template>
            </v-breadcrumbs>
        </v-card>
        <v-row v-if="!userInfo" style="margin-top:20px;text-align:center;vertical-align:middle !important">
            <v-col style="margin:auto">
                <v-progress-circular
                :size="70"
                :width="7"
                color="#d4d6d8"
                indeterminate
                ></v-progress-circular>
            </v-col>
        </v-row>
        <v-row v-if="userInfo">
            <v-col lg="3" md="3" sm="12" cols="12">
                <v-card flat  class="ma-5" elevation="0">
                    <h4>My Projects:</h4>
                    <br>
                    <v-row v-for="item in userInfo.projects" :key="item">
                        <v-col>
                           <v-card elevation="0" class="my-2" :color="getRandomColor()" link :to="'project/'+item.id">
                               <v-row>
                                   <v-col cols="3">
                                       <v-icon class="mx-5 my-7" x-large>mdi-code-tags</v-icon>
                                   </v-col>
                                   <v-col cols="9">
                                       <h3>{{item.name}}</h3>
                                       <small style="font-size:12;color:gray">By @{{item.created_by}}</small> 
                                       <br>
                                       <small>{{item.description}}</small>
                                   </v-col>
                               </v-row>
                           </v-card>
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
                            <v-card color="purple lighten-5" outlined class="mt-2" elevation="0" style="border: 1px solid #e7e7e7" width="100%">
                                <v-row>
                                   <v-col cols="3">
                                       <v-img sizes="10" class="ma-5 mx-15" style="width:150px;border:1px solid gray;border-radius:100px!important" src="https://avatars.githubusercontent.com/u/48057930?v=4"></v-img>
                                   </v-col>
                                   <v-col cols="4">
                                       <h3 class="ma-4"><b>{{ userInfo.firstName }} {{ userInfo.lastName }}</b></h3>
                                        <v-chip v-for="role in userInfo.userRole" :key="role" class="mx-4">{{role}}</v-chip>
                                   </v-col>
                                   <v-col>
                                       <v-row>
                                            <v-col>
                                                <v-card-subtitle>
                                                    <b>Email:</b> <br>{{userInfo.email}}
                                                </v-card-subtitle>
                                            </v-col>
                                            <v-col align-self="center">
                                                <v-chip color="purple" class="white--text" small link><b>@{{userInfo.username}}</b></v-chip>
                                            </v-col>
                                       </v-row>
                                       <v-row>
                                            <v-col>
                                                <v-card-subtitle>
                                                    <b>Phone Number:</b> <br>{{userInfo.phoneNo}}
                                                </v-card-subtitle>
                                            </v-col>
                                            <v-col>
                                                <v-card-subtitle>
                                                    <b>Address:</b> <br> {{userInfo.address}}
                                                </v-card-subtitle>
                                            </v-col>
                                       </v-row>
                                   </v-col>
                                </v-row>
                            </v-card>
                        </v-col>
                   </v-row>
                   <!-- <v-row>
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
                            </v-card>
                        </v-col>
                   </v-row> -->
                   <v-row>
                       <v-col>
                           <v-card class="pa-4 mt-2" elevation="0" style="border: 1px solid #e7e7e7" width="100%">
                               <v-row class="pa-5">
                                   <v-icon large>mdi-bug</v-icon> <h3 class="mt-1 ml-2">Resent Bugs</h3>
                                   <!-- <v-spacer></v-spacer> <v-btn depressed @click="adddialog = true" color="info">Add Drugs</v-btn> -->
                               </v-row>
                               <v-row style="background-color:#f2f5f8;border-radius:8px;text-align:center">
                                   <v-col cols="3">
                                       <b>Title</b>
                                   </v-col>
                                   <v-col>
                                       <b>Created By</b>
                                   </v-col>
                                   <v-col>
                                       <b>Approve Status</b>
                                   </v-col>
                                   <v-col>
                                       <b>Bug Status</b>
                                   </v-col>
                                   <v-col>
                                       <b>Action</b>
                                   </v-col>
                               </v-row>
                               <v-row v-for="drug in 3" :key="drug" style="text-align:center;border-bottom: 1px solid #e7e7e7">
                                    <v-col class="ml-2" style="text-align:left" cols="3">
                                        <h5 class="mt-2">
                                            Issu: Normal user can edit project
                                        </h5>
                                        <v-chip x-small color="orange lighten-1">Web Development</v-chip>
                                    </v-col>
                                    <v-col>
                                        <v-card-subtitle>
                                            ihsonnet
                                        </v-card-subtitle>
                                    </v-col>
                                    <v-col>
                                        <v-card-subtitle>
                                            No Action
                                        </v-card-subtitle>
                                    </v-col>
                                    <v-col>
                                        <v-card-subtitle>
                                            <v-chip small color="red lighten-3">New</v-chip>
                                        </v-card-subtitle>
                                    </v-col>
                                    <v-col>
                                        <v-card-subtitle>
                                            <v-btn-group>
                                                <v-btn color="info" depressed small><v-icon small>mdi-pencil-outline</v-icon></v-btn><v-btn color="error" depressed small><v-icon small>mdi-delete</v-icon></v-btn>
                                            </v-btn-group>
                                        </v-card-subtitle>
                                    </v-col>
                               </v-row>
                           </v-card>
                       </v-col>
                   </v-row>
                </v-card>
            </v-col>
    </v-row>



    <!-- dialog here -->

    <v-dialog title="Add New Drug" v-model="adddialog" max-width="800px">
        <v-card class="pa-5">
            <h3>Add New Drug</h3>
            <v-row class="rowise pt-5">
            <v-col cols="6" v-for="i in 4" :key="i">
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
        </v-row>
        <v-textarea
        style="margin-top:0px !important"
        name="input-7-1"
        outlined
        background-color="white"
        color="teal"
        auto-grow
        placeholder="Write Note..."
        ></v-textarea>
        <v-btn-group>
            <v-btn depressed color="info"><v-icon class="mr-2" @click="adddialog = false">mdi-content-save</v-icon> Save Drug</v-btn>
        </v-btn-group>
        </v-card>
    </v-dialog>
    </div>
</template>
<script>
import axios from "axios"
export default {
    data() {
        return {
            idx:0,
            input: "",
            adddialog: false,
            GET_LOGGED_IN_PROFILE_API: "https://buggie-backend.herokuapp.com/auth/user-info",
            user: {},
            auth: "Bearer " + localStorage.getItem("token"),
            userInfo: {},
            items: [
                {
                text: 'Buggie',
                disabled: false,
                href: '/',
                },
                {
                text: 'Dashboard',
                disabled: true,
                href: 'dashboard',
                },
            ],
            select: ["Napa","Bexted","Koroz"],
            drugList: [
                {
                    brand: "Ace | Paracetamol | 500mg",
                    dose: "১+০+১",
                    instruction: "খাবার পরে খাবেন",
                    duration: "৭ দিন",
                    note: "",
                },
                {
                    brand: "Napa Extra | Paracetamol | 200mg",
                    dose: "১+০+১",
                    instruction: "খাবার পরে খাবেন",
                    duration: "১৫ দিন",
                    note: " -",
                },
            ]
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
        this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
        console.log(this.userInfo.firstName)

        // location.reload();
                })
        .catch(r => {
            console.log(r)
        });
        },
        getRandomColor() {
        return 'rgb(' + 
            (Math.floor(Math.random()*56)+200) + ', ' +
            (Math.floor(Math.random()*56)+200) + ', ' +
            (Math.floor(Math.random()*56)+200) +
            ')';
        },
         show(){ 
            return 0   
        },
        
    },
    mounted(){
        this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
        this.getProfileInfo();
    },
}
</script>
<style lang="scss" scoped>
.rowise .col-6{
    padding-bottom: 0px !important;
    padding-top: 0px !important;
}
</style>