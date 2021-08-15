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
                <v-card flat color="teal lighten-5"  class="ma-5" elevation="0" style="border-top: 1px solid gray;">
                    <v-row class="pa-5">
                        <v-col>
                            <h3>Project Name: {{projectInfo.name}} </h3> <br>
                           <small><b>Created By: <v-chip small color="teal" text-color="white">@{{projectInfo.created_by}}</v-chip></b></small>  <br>
                            Description: {{projectInfo.description}}<br><br>
                            I'am a <v-chip small outlined color="teal">{{getRoleInProject(userInfo.id)}}</v-chip>
                        </v-col>
                    </v-row>
                </v-card>
                <v-row class="mx-3" style="text-align:center">
                    <v-col>
                        <v-btn
                            color="blue lighten-1"
                            outlined
                            disabled
                            block
                            to="'bugs'"
                        >
                            <v-icon>mdi-bug</v-icon>
                            <span class="mr-2">Bug Contoller</span>
                        </v-btn>
                    </v-col>
                </v-row>
                <v-row class="mx-3" style="text-align:center">
                    <v-col>
                        <v-btn
                            color="purple lighten-1"
                            outlined
                            block
                            :to="'members'"
                        >
                            <v-icon>mdi-account-supervisor-circle-outline   </v-icon>
                            <span class="mr-2">Project Members</span>
                        </v-btn>
                    </v-col>
                </v-row>
            </v-col>
            <v-divider
            class="mx-0"
            vertical
            ></v-divider>

            <!--Main Col 2 -->
            <v-col lg="" md="9" sm="12" cols="12">

                  <v-card  class="ma-5" elevation="0">

                    <!-- Add new bug  -->
                   <v-row>
                        <v-col>
                            <v-card style="border: 1px solid #e7e7e7;text-align:center !important" color="#F2F5F8" outlined class="mt-2 pa-4" elevation="0" width="100%">
                                <v-icon color="blue lighten-1" x-large>mdi-baby-buggy</v-icon>
                                <br><br>
                                <v-row justify="center" align-content="center">
                                   <v-col style="margin:auto;text-align:center">
                                       <p>As a Tester You can Add a new bug to this project by giving some information</p>
                                   </v-col>
                                </v-row>
                                <v-btn
                                    color="blue lighten-2 white--text"
                                    elevation="0"
                                >
                                    <v-icon>mdi-bug</v-icon>
                                    <span class="mr-2">Add New Bug</span>
                                </v-btn>
                            </v-card>
                        </v-col>
                   </v-row>

                    <!-- bug list  -->
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
                                          
                                                <v-btn color="info" depressed small><v-icon small>mdi-pencil-outline</v-icon></v-btn><v-btn color="error" depressed small><v-icon small>mdi-delete</v-icon></v-btn>
                                          
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
      adddialog: true,
      selectedProject: "",
      projectInfo: {},
      memberSelected: true,
      bugSelected: false,
        PROJECT_API:"https://buggie-backend.herokuapp.com/project/",
        auth: "Bearer " + localStorage.getItem("token"),
      userInfo: {},
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
        },
      ],
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
      select: ["Napa", "Bexted", "Koroz"],
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
      ],
    };
  },
  methods: {
    // randomColor() {
    //   this.idx++;
    //   var randomColor = ((Math.random() * 0xffffff) << 0).toString(16);
    //   return "#" + randomColor;
    // },
    getRandomColor() {
      return (
        "rgb(" +
        (Math.floor(Math.random() * 50) + 200) +
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
            console.log(r.data)
            this.projectInfo = r.data.data;
            localStorage.setItem("projectInfo", JSON.stringify(r.data));
            this.items[2].text = this.projectInfo.name;
            // location.reload();
                })
        .catch(r => {
            console.log(r)
        });
    },
    getRoleInProject(id){
        var location = this.projectInfo.members;
        var length = location.length;
        for (let i = 0; i < length; i++) {
            if(location[i].id == id){
                return location[i].roles[0].name;
            }
            
        }
    }
  },
  mounted() {
    this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
    this.selectedProject = this.$route.params.projectId;
    this.getProjectInfo();
  }
};
</script>
<style lang="scss" scoped>
.rowise .col-6 {
  padding-bottom: 0px !important;
  padding-top: 0px !important;
}
</style>