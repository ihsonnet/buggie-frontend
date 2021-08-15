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
          <div style="position: fixed;z-index:1;right:20px">
            <v-alert v-if="successMsg" text type="success">
            {{apiResponse}}
            </v-alert>

            <v-alert v-if="errorMsg" text type="error">
              {{apiResponse}}
            </v-alert>
          </div>
            <v-col lg="3" md="3" sm="12" cols="12">
                <v-card flat tile color="#F2F5F8" style="border-radius:15px !importanat" class="ma-5 pa-6" elevation="0">
                <v-progress-linear
                :active="loadingResponse"
                :indeterminate="loadingResponse"
                absolute
                top
                color="#AD74B8"
            ></v-progress-linear>
                    <v-row class="pa-2">
                        <v-icon large>mdi-plus</v-icon> <h4 class="mt-1 ml-2">Add Projects</h4>
                        <!-- <v-spacer></v-spacer> <v-btn depressed @click="adddialog = true" color="info">Add Drugs</v-btn> -->
                    </v-row>
                    <br>
                <v-form ref="form" lazy-validation class="pa-0">
                <v-row>
                  <v-col class="pb-0 pt-0" cols="12">
                    <v-text-field
                      dense
                      v-model="formData.name"
                      :rules="[rules.required]"
                      label="Project Name"
                      required
                      filled
                      type="text"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col class="pb-0 pt-0">
                    <v-textarea dense placeholder="max 15 words." v-model="formData.description" :rules="[rules.required]" required label="Description" filled></v-textarea>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col class="pb-0 pt-0">
                    <v-btn elevation="0" class="float-right" color="purple white--text" @click="submit">Create Project</v-btn>
                  </v-col>
                </v-row>
              </v-form>
                </v-card>
            </v-col>
            <v-divider
            class="mx-0"
            vertical
            ></v-divider>
            <v-col lg="" md="9" sm="12" cols="12">
                <v-card  class="ma-5" elevation="0"> 
                <v-row >
                        <v-col v-for="item in  userInfo.projects" :key="item.id">
                           <v-card elevation="0" width="320" class="my-2 pa-2" link :to="'project/'+item.id" :color="getRandomColor()">
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
    </v-row>

    </div>
</template>

<script>
import axios from "axios"
export default {
    data() {
        return {
            idx:0,
            loadingResponse: false,
            apiResponse: null,
            PROJECT_URL: "https://buggie-backend.herokuapp.com/project/",
            auth: "Bearer " + localStorage.getItem("token"),
            successMsg: false,
            errorMsg: false,
            rules: {
                required: value => !!value || 'Required.',
                },
            formData: {
                created_by: "",
                description: "",
                name: ""
            },
            userInfo: {
                    "id": "",
                    "firstName": "",
                    "lastName": "",
                    "email": "",
                    "username": "",
                    "phoneNo": "",
                    "projects": [
                        {
                        "id": "",
                        "name": "",
                        "description": "",
                        "created_by": "",
                        "created_on": null
                        }
                    ],
                    "userRole": [
                        "PROJECT_MANAGER"
                    ],
                    "isAuthenticated": true,
                    "teamDetails": {
                        "id": "",
                        "name": "",
                        "createdBy": ""
                    }
                },
                items: [
                {
                text: 'Buggie',
                disabled: false,
                href: '/',
                },
                {
                text: 'Projects',
                disabled: true,
                href: 'projects',
                },
            ],
        }
    },
 mounted(){
     this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
     this.formData.created_by = this.userInfo.username;
   // if(localStorage.getItem("access_token"))
 },
    methods: {
         show(){ 
            return 0   
        },
        submit(){
            this.successMsg=false;
            this.errorMsg = false;
            let r =  this.$refs.form.validate();
            if(r == true){
                this.loadingResponse = true;
                this.signup(JSON.stringify(this.formData));
            }
        },
        signup(data) {
        axios({
            method: "POST",
            data: this.formData,
            url: this.PROJECT_URL,
            headers: {
                Authorization: this.auth,
                "Content-Type": "application/json"
                
            }
        })
        .then(response => {
            console.log(response)
            if(response.status == 201){
                this.apiResponse = "Project created successfully!";
                this.errorMsg = false;
                this.successMsg = true;
                this.loadingResponse = false;
            }
            else{
            this.apiResponse = response.data.messege;
                this.successMsg=false;
                this.errorMsg = true;
                this.loadingResponse = false;
            }
            // this.user.authenticated = true
            // console.log(localStorage)
            })
        .catch(err => console.log(err.response));
            
        },
        getRandomColor() {
            return 'rgb(' + 
                (Math.floor(Math.random()*56)+200) + ', ' +
                (Math.floor(Math.random()*56)+200) + ', ' +
                (Math.floor(Math.random()*56)+200) +
                ')';
            },
        }
}
</script>

<style lang="scss" scoped>
.rowise .col-6{
    padding-bottom: 0px !important;
    padding-top: 0px !important;
}
</style>