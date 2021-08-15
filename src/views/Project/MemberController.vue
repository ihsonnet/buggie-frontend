<template>
    <div>
        
        <v-row>

            <div style="position: fixed;z-index:1;right:20px">
            <v-alert v-if="successMsg" text type="success">
            {{apiResponse}}
            </v-alert>

            <v-alert v-if="errorMsg" text type="error">
              {{apiResponse}}
            </v-alert>
            </div>
            <!--Main Col 2 -->
            <v-col lg="" md="9" sm="12" cols="12">

                <v-card v-show="isLoading" class="ma-5" style="text-align:center" elevation="0"> 
                    <v-progress-circular
                    style="margin:auto"
                    :size="70"
                    :width="7"
                    color="purple lighten-5"
                    indeterminate
                    ></v-progress-circular>
                </v-card>


                
                <!-- item for members -->
                <v-card class="ma-5" elevation="0">

                      <!-- Assign Member  -->
                   <v-row v-if="projectManager()">
                        <v-col>
                            <v-card style="border: 1px solid #e7e7e7;text-align:center !important" color="#F2F5F8" outlined class="mt-2 pa-4" elevation="0" width="100%">
                                <v-icon color="blue lighten-1" x-large>mdi-account-network</v-icon>
                                <br><br>
                                <v-row justify="center" align-content="center">
                                   <v-col style="margin:auto;text-align:center">
                                       <p>As a project manager You can Assigned new member to this project by using their email.</p>
                                   </v-col>
                                </v-row>
                                <v-btn
                                    color="blue lighten-2 white--text"
                                    elevation="0"
                                    @click.stop="assignMemberDialog = true, 
                                    successMsg=false,
                                    errorMsg = false"
                                >
                                    <v-icon>mdi-account-plus</v-icon>
                                    <span class="mr-2">Assigne New Member</span>
                                </v-btn>
                            </v-card>
                        </v-col>
                   </v-row>
                    
                   <!-- member list  -->
                   <v-row>
                       <v-col>
                           <v-card class="pa-4 mt-2" elevation="0" style="border: 1px solid #e7e7e7" width="100%">
                               <v-row class="pa-5">
                                   <v-icon large>mdi-bug</v-icon> <h3 class="mt-1 ml-2">Members of ( {{projectMembers.name}})</h3>
                                   <v-spacer></v-spacer> {{projectMembers.members[0].firstName.charAt(0)}}
                               </v-row>
                               <v-row style="background-color:#f2f5f8;border-radius:8px;text-align:center">
                                   <v-col cols="4">
                                       <b>Name</b>
                                   </v-col>
                                   <v-col>
                                       <b>Role</b>
                                   </v-col>
                                   <v-col>
                                       <b>Email</b>
                                   </v-col>
                                   <v-col>
                                       <b>Phone</b>
                                   </v-col>
                                   <v-col v-if="projectManager()">
                                       <b>Action</b>
                                   </v-col>
                               </v-row>
                               <v-row v-for="member in projectMembers.members" :key="member.id" style="text-align:center;border-bottom: 1px solid #e7e7e7">
                                    <v-col class="ml-2" style="text-align:left" cols="4">

                                        <v-row>
                                            <v-col cols="3">
                                               <v-avatar
                                               class="ma-3 white--text"
                                                :color="getRandomColor()"
                                                size="42"
                                                ><h3>{{member.firstName.charAt(0)}}</h3></v-avatar>
                                            </v-col>
                                            <v-col>
                                                 <h5 class="mt-2">
                                                    {{member.firstName}} {{member.lastName}}
                                                </h5>
                                                <v-chip x-small color="purple lighten-2 white--text">@{{member.username}}</v-chip>    
                                            </v-col>
                                        </v-row>
                                    </v-col>
                                    <v-col>
                                        <v-chip class="mt-3" small outlined color="teal">{{member.roles[0].name}}</v-chip>
                                    </v-col>
                                    <v-col>
                                        <v-card-subtitle>
                                            {{member.email}}
                                        </v-card-subtitle>
                                    </v-col>
                                    <v-col>
                                        <v-card-subtitle>
                                            {{member.phoneNo}}
                                        </v-card-subtitle>
                                    </v-col>
                                    <v-col v-if="projectManager()">
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



        <!-- assign member dialog -->

        <v-dialog title="Add New Drug" v-model="assignMemberDialog" max-width="500px">
            <v-card class="pa-5">
                 <v-progress-linear
                    :active="loadingResponse"
                    :indeterminate="loadingResponse"
                    absolute
                    top
                    color="#AD74B8"
                ></v-progress-linear>
                <h3>Assign Member To ( {{projectMembers.name}} )</h3>
                <!-- <v-btn depressed color="info"><v-icon class="mr-2" @click="adddialog = false">mdi-content-save</v-icon> Save Drug</v-btn> -->
                <br><br>
                <v-form ref="form" lazy-validation class="pa-2">
                    <v-row>
                    <v-col class="pb-0 pt-0">
                        <v-text-field
                        dense
                        v-model="formData.userEmail"
                        :rules="[rules.required, rules.email]"
                        label="E-mail"
                        required
                        ></v-text-field>
                    </v-col>
                    </v-row>
                    <v-row class="pb-0 pt-0">
                        <v-col class="pb-0 pt-0">
                            <v-select
                            v-model="formData.userRole[0]"
                            :items="role"
                            item-text="Name"
                            item-value="value"
                            label="Select User Role"
                            ></v-select>
                        </v-col>
                    </v-row>

                    <v-row>
                            
                            <v-col class="pb-0 pt-2">
                                <v-btn elevation="0" class="float-right" color="purple white--text" @click="assignMember()">Submit</v-btn>
                            </v-col>
                    </v-row>
                </v-form>
            </v-card>
        </v-dialog>

    </div>
</template>
<script>
import axios from "axios"
export default {
  data() {
    return {
      idx: 0,
      input: "",
      dialog: false,
      assignMemberDialog: false,
      selectedProject: "",
      isLoading: false,
        successMsg: false,
      errorMsg: false,
      myRole: [],
      loadingResponse: false,
      apiResponse: "",
      projectMembers: [],
      projectInfo: {},
        PROJECT_API:"https://buggie-backend.herokuapp.com/project/",
        auth: "Bearer " + localStorage.getItem("token"),
      userInfo: {},
      formData: {
            projectId: "",
            userEmail: "",
            userRole: [
                "string"
            ]
            },
    role: [{Name:"Tester",value:"TESTER"},{Name:"Developer",value:"DEVELOPER"}],
    
     rules: {
                required: value => !!value || 'Required.',
                counter: value => value.length <= 20 || 'Max 20 characters',
                email: value => {
                    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                    return pattern.test(value) || 'Invalid e-mail.'
                },
            },
      items: [
        {
          text: "Buggie",
          disabled: false,
          href: "/",
        },
        {
          text: "Projects",
          disabled: true,
          href: "projects",
        },
        {
          text: "Dokanee",
          disabled: true,
          href: "projects/dokanee",
        },
      ],
    };
  },
  methods: {
    randomColor() {
      this.idx++;
      var randomColor = ((Math.random() * 0xffffff) << 0).toString(16);
      return "#" + randomColor;
    },
    getRandomColor() {
      return (
        "rgb(" +
        (Math.floor(Math.random() * 56) + 200) +
        ", " +
        (Math.floor(Math.random() * 50) + 200) +
        ", " +
        (Math.floor(Math.random() * 56) + 200) +
        ")"
      );
    },
    show() {
      return 0;
    },
    getProjectInfo(){
        axios({
            method: "get",
            url: this.PROJECT_API+"{id}?id="+this.selectedProject,
            headers: {
            Authorization: this.auth,
            "Content-Type": "application/json"
            }
        })
        .then(r => {
            console.log(r.data.data)
            this.projectMembers = r.data.data;
            console.log("members")
            console.log(this.projectMembers)
            // localStorage.setItem("projectInfo", JSON.stringify(r.data.data));
            // this.items[2].text = this.projectInfo.name;
                })
        .catch(r => {
            console.log(r)
        });
    },
    getRoleInProject(id){
        var location = this.projectMembers.members;
        var length = location.length;
        for (let i = 0; i < length; i++) {
            if(location[i].id == id){
                console.log(location[i].roles[0].name)
                return location[i].roles[0].name;
            }
            
        }
    },
    assignMember(){
        this.successMsg=false;
        this.errorMsg = false;
        this.formData.projectId = this.projectMembers.id;
        let r =  this.$refs.form.validate();
        if(r == true){
            this.loadingResponse = true;
            this.postAssignMamber(JSON.stringify(this.formData));
        }
    },
    postAssignMamber(data) {
        console.log(data);
        axios({
            method: "POST",
            data: this.formData,
            url: this.PROJECT_API+'assign/',
            headers: {
            Authorization: this.auth,
            "Content-Type": "application/json"
            }
        })
        .then(response => {
        console.log(response)
        this.assignMemberDialog = false;
        if(response.status == 200){
            if(response.data.message != "Assigned Successfully!") {
                this.apiResponse = response.data.message;
                this.successMsg=false;
                this.errorMsg = true;
                this.loadingResponse = false;
            }else{
                this.apiResponse = "Assigned successfull!";
                this.errorMsg = false;
                this.successMsg=true;
                this.loadingResponse = false;
                this.getProjectInfo();
            }
            }
        else{
        this.apiResponse = response.data.message;
            this.successMsg=false;
            this.errorMsg = true;
            this.loadingResponse = false;
        }
        })
     .catch(err => console.log(err.response));
         
     },
     projectManager(){
         var string = this.myRole[0].name;   
         if(string=="PROJECT_MANAGER"){
             return true;
         }
         console.log(string)
     }
  },
  mounted() {
    this.selectedProject = this.$route.params.projectId;
    this.getProjectInfo();
    this.projectMembers = JSON.parse(localStorage.getItem("projectInfo"));
    this.myRole = JSON.parse(localStorage.getItem("myRole"));
    console.log(this.myRole)
  },
};
</script>
<style lang="scss" scoped>
.rowise .col-6 {
  padding-bottom: 0px !important;
  padding-top: 0px !important;
}
</style>