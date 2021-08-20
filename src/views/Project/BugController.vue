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
<!-- item for bug  -->
                <v-card class="ma-5" elevation="0">

                    <!-- Add new bug  -->
                   <v-row v-if="tester()">
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
                                    @click.stop="addBugDialog = true, 
                                    successMsg=false,
                                    errorMsg = false, getDevelopers();"
                                >
                                    <v-icon>mdi-bug</v-icon>
                                    <span class="mr-2">Add New Bug</span>
                                </v-btn>
                            </v-card>
                        </v-col>
                   </v-row>

                 <!-- bug list  -->
                    <v-row v-if="developer()">
                       <v-col>
                           <v-card class="pa-4 mt-2" elevation="0" style="border: 1px solid #e7e7e7" width="100%">
                               <v-row class="pa-5">
                                   <v-icon large>mdi-bug</v-icon> <h3 class="mt-1 ml-2">Bugs Assigned to Me</h3>
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
                               <v-row v-for="bug in projectMembers.bugs" :key="bug.id" v-show="bug.approveStatus=='Approved'" style="text-align:center;border-bottom: 1px solid #e7e7e7">
                                    <v-col class="ml-2" style="text-align:left" cols="3">
                                        <h5 style="cursor:pointer" @click="getBugId(bug),bugDetailsDialog=true" class="mt-2">
                                            {{bug.title}}
                                        </h5>
                                        <v-chip x-small color="orange lighten-1">{{bug.type}}</v-chip>
                                    </v-col>
                                    <v-col>
                                        <v-card-subtitle>
                                            @{{bug.createdBy}}
                                        </v-card-subtitle>
                                    </v-col>
                                    <v-col>

                                            <v-chip small :color="getColor(bug.approveStatus)"><b>{{bug.approveStatus}}</b></v-chip><br>
                                            <small>[Note:] {{bug.approveComment}}</small>
                                    </v-col>
                                    <v-col>
                                        <v-card-subtitle>
                                            <v-chip small :color="getColor(bug.status)">{{bug.status}}</v-chip>
                                        </v-card-subtitle>
                                    </v-col>
                                      <v-col>
                                        <v-card-subtitle>
                                                <v-btn color="info" @click="getBugId(bug),bugStatusDialog=true,successMsg=false,errorMsg=false" depressed small><v-icon small>mdi-pencil-outline</v-icon> Change Status</v-btn>
                                        </v-card-subtitle>
                                    </v-col>
                                  
                               </v-row>
                           </v-card>
                       </v-col>
                   </v-row>



            <!-- bug Request list  -->
                    <v-row v-if="projectManager()">
                       <v-col>
                           <v-card class="pa-4 mt-2" elevation="0" style="border: 1px solid #e7e7e7" width="100%">
                               <v-row class="pa-5">
                                   <v-icon large>mdi-bug</v-icon> <h3 class="mt-1 ml-2">Bug waiting for Approve</h3>
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
                                       <b>Assigned To</b>
                                   </v-col>
                                   <v-col>
                                       <b>Approve Status</b>
                                   </v-col>
                                   <v-col>
                                       <b>Approve / Reject</b>
                                   </v-col>
                               </v-row>
                               <v-row v-for="bug in projectMembers.bugs" :key="bug.id" v-show="bug.approveStatus=='No Action'" style="text-align:center;border-bottom: 1px solid #e7e7e7">
                                    <v-col class="ml-2" style="text-align:left" cols="3">
                                        <h5 style="cursor:pointer" @click="getBugId(bug),bugDetailsDialog=true" class="mt-2">
                                            {{bug.title}}
                                        </h5>
                                        <v-chip x-small color="orange lighten-1">{{bug.type}}</v-chip>
                                    </v-col>
                                    <v-col>
                                        <v-card-subtitle>
                                            @{{bug.createdBy}}
                                        </v-card-subtitle>
                                    </v-col>
                                    <v-col>
                                        <v-card-subtitle>
                                            @{{bug.assignedTo}}
                                        </v-card-subtitle>
                                    </v-col>
                                    <v-col>
                                        <v-card-subtitle>
                                            <v-chip small outlined :color="getColor(bug.approveStatus)"><b>{{bug.approveStatus}}</b></v-chip>
                                        </v-card-subtitle>
                                    </v-col>
                                    <v-col>
                                        <v-card-subtitle>
                                                <v-btn color="info" @click="getApproveBugId(bug.id),ApproveStatusDialog=true,successMsg=false,errorMsg=false" depressed small><v-icon small>mdi-pencil-outline</v-icon></v-btn><v-btn color="error" @click="getApproveBugId(bug.id),ApproveStatusDialog=true,successMsg=false,errorMsg=false" depressed small><v-icon small>mdi-delete</v-icon></v-btn>
                                        </v-card-subtitle>
                                    </v-col>
                                  
                               </v-row>
                           </v-card>
                       </v-col>
                   </v-row>




                    <!-- bug list for tester  -->
                    <v-row v-if="tester()"> 
                       <v-col>
                           <v-card class="pa-4 mt-2" elevation="0" style="border: 1px solid #e7e7e7" width="100%">
                               <v-row class="pa-5">
                                   <v-icon large>mdi-bug</v-icon> <h3 class="mt-1 ml-2">Bug Created By Me</h3>
                                   <!-- <v-spacer></v-spacer> <v-btn depressed @click="adddialog = true" color="info">Add Drugs</v-btn> -->
                               </v-row>
                               <v-row style="background-color:#f2f5f8;border-radius:8px;text-align:center">
                                   <v-col cols="3">
                                       <b>Title</b>
                                   </v-col>
                                   <v-col>
                                       <b>Approve Status</b>
                                   </v-col>
                                   <v-col>
                                       <b>Bug Status</b>
                                   </v-col>
                                   <v-col>
                                       <b>Last Update</b>
                                   </v-col>
                                   <v-col>
                                       <b>Action</b>
                                   </v-col>
                               </v-row>
                               <v-row v-for="bug in projectMembers.bugs" :key="bug.id" style="text-align:center;border-bottom: 1px solid #e7e7e7">
                                    <v-col class="ml-2" style="text-align:left" cols="3">
                                        <h5 style="cursor:pointer" @click="getBugId(bug),bugDetailsDialog=true" class="mt-2">
                                            {{bug.title}}
                                        </h5>
                                        <v-chip x-small color="orange lighten-1">{{bug.type}}</v-chip>
                                    </v-col>
                                    <v-col>
                                            <v-chip small :color="getColor(bug.approveStatus)"><b>{{bug.approveStatus}}</b></v-chip><br>
                                            <small>[Note:] {{bug.approveComment}}</small>
                                    </v-col>
                                    <v-col>
                                        <v-chip small :color="getColor(bug.status)">{{bug.status}}</v-chip><br>
                                            <small>[Note:] {{bug.comment}}</small>
                                    </v-col>
                                    <v-col>
                                            <v-chip small color="purple lighten-3">{{bug.updatedBy}}</v-chip><br>
                                           <small>( {{bug.updatedOn}} )</small>
                                    </v-col>
                                      <v-col>
                                        <v-card-subtitle>
                                                <v-btn color="info" :disabled="!bug.status===`Fixed`" @click="getBugId(bug),bugStatusDialog=true,successMsg=false,errorMsg=false" depressed small><v-icon small>mdi-pencil-outline</v-icon>Change Status</v-btn>
                                        </v-card-subtitle>
                                    </v-col>
                                  
                               </v-row>
                           </v-card>
                       </v-col>
                   </v-row>



                <!-- bug list for project Manager  -->
                    <v-row v-if="projectManager()">
                       <v-col>
                           <v-card class="pa-4 mt-2" elevation="0" style="border: 1px solid #e7e7e7" width="100%">
                               <v-row class="pa-5">
                                   <v-icon large>mdi-bug</v-icon> <h3 class="mt-1 ml-2">Resent Bugs of ( {{projectMembers.name}} )</h3>
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
                                       <b>Assigned To</b>
                                   </v-col>
                                   <v-col>
                                       <b>Approve Status</b>
                                   </v-col>
                                   <v-col>
                                       <b>Bug Status</b>
                                   </v-col>
                                   <v-col>
                                       <b>Last Update</b>
                                   </v-col>
                               </v-row>
                               <v-row v-for="bug in projectMembers.bugs" :key="bug.id" style="text-align:center;border-bottom: 1px solid #e7e7e7">
                                    <v-col class="ml-2" style="text-align:left" cols="3">
                                        <h5 style="cursor:pointer" @click="getBugId(bug),bugDetailsDialog=true" class="mt-2">
                                            {{bug.title}}
                                        </h5>
                                        <v-chip x-small color="orange lighten-1">{{bug.type}}</v-chip>
                                    </v-col>
                                    <v-col>
                                        <v-card-subtitle>
                                            @{{bug.createdBy}}
                                        </v-card-subtitle>
                                    </v-col>
                                    <v-col>
                                        <v-card-subtitle>
                                            @{{bug.assignedTo}}
                                        </v-card-subtitle>
                                    </v-col>
                                    <v-col>
                                        <v-card-subtitle>
                                           <v-chip small :color="getColor(bug.approveStatus)" outlined><b>{{bug.approveStatus}}</b></v-chip>
                                        </v-card-subtitle>
                                    </v-col>
                                    <v-col>
                                        <v-chip small :color="getColor(bug.status)">{{bug.status}}</v-chip><br>
                                            <small>[Note:] {{bug.comment}}</small>
                                    </v-col>
                                    <v-col>
                                        <v-chip small color="red lighten-3">@{{bug.updatedBy}}</v-chip><br>
                                           <small>( {{bug.updatedOn}} )</small>
                                    </v-col>
                                  
                               </v-row>
                           </v-card>
                       </v-col>
                   </v-row>

                </v-card>



            </v-col>
        </v-row>



        <!-- add bug dialog -->

        <v-dialog title="Add New Drug" v-model="addBugDialog" max-width="980px">
            <v-card class="pa-5">
                 <v-progress-linear
                    :active="loadingResponse"
                    :indeterminate="loadingResponse"
                    absolute
                    top
                    color="#AD74B8"
                ></v-progress-linear>
                <h3>Report New Bug To ( {{projectMembers.name}} )</h3>
                <!-- <v-btn depressed color="info"><v-icon class="mr-2" @click="adddialog = false">mdi-content-save</v-icon> Save Drug</v-btn> -->
                <br><br>
                <v-form ref="form" lazy-validation class="pa-2">
                   <v-row>
                     <v-col>
                        <v-row>
                        <v-col class="pb-0 pt-0">
                            <v-text-field
                            dense
                            v-model="formData.title"
                            :rules="[rules.required]"
                            label="Bug Title"
                            required
                            ></v-text-field>
                        </v-col>
                        </v-row>
                        <v-row class="pb-0 pt-0">
                        <v-col class="pb-0 pt-0">
                            <v-select
                            v-model="formData.type"
                            :items="type"
                            :rules="[rules.required]"
                            item-text="Name"
                            item-value="value"
                            label="Bug Type"
                            ></v-select>
                        </v-col>
                        </v-row>
                        <!-- <v-row>
                        <v-col class="pb-0 pt-0">
                            <v-textarea
                            dense
                            v-model="formData.description"
                            :rules="[rules.required, rules.description]"
                            label="Description"
                            required
                            ></v-textarea>
                        </v-col>
                        </v-row> -->
                     </v-col>
                     <v-col>
                      <v-row class="pb-0 pt-0">
                        <v-col class="pb-0 pt-0">
                            <v-select
                            v-model="formData.assignedTo"
                            :items="developers"
                            :rules="[rules.required]"
                            item-text="name"
                            item-value="username"
                            label="Assigned a Developer"
                            ></v-select>
                        </v-col>
                    </v-row>
                     </v-col>
                   </v-row>

                   <v-row>
                       <v-col>
                           <tiptap-vuetify
                           class="formhtmlimg"
                           style="elevation:0"
                           title="Description"
                                v-model="formData.description"
                                :extensions="extensions"
                                />
                       </v-col>
                   </v-row>
                    
                    <v-row>
                            
                            <v-col class="pb-0 pt-2">
                                <v-btn elevation="0" class="float-right" color="purple white--text" @click="addNewBug()">Submit</v-btn>
                            </v-col>
                    </v-row>
                </v-form>
            </v-card>
        </v-dialog>




        <!-- Change Bug Status dialog -->

        <v-dialog title="Add New Drug" v-model="bugStatusDialog" max-width="500px">
            <v-card class="pa-5">
                 <v-progress-linear
                    :active="loadingResponse"
                    :indeterminate="loadingResponse"
                    absolute
                    top
                    color="#AD74B8"
                ></v-progress-linear>
                <h3>Change Bug Status</h3>
                <!-- <v-btn depressed color="info"><v-icon class="mr-2" @click="adddialog = false">mdi-content-save</v-icon> Save Drug</v-btn> -->
                <br><br>
                <v-form ref="form" lazy-validation class="pa-2">
                    <v-row v-if="developer()" class="pb-0 pt-0">
                        <v-col class="pb-0 pt-0">
                            <v-select
                            v-model="bugStatus.status"
                            :items="['In Progress','Fixed']"
                            item-text="Name"
                            item-value="value"
                            label="Set Status As"
                            ></v-select>
                        </v-col>
                    </v-row>

                    <v-row v-if="tester()" class="pb-0 pt-0">
                        <v-col class="pb-0 pt-0">
                            <v-select
                            v-model="bugStatus.status"
                            :items="['Closed','ReOpened']"
                            item-text="Name"
                            item-value="value"
                            label="Set Status As"
                            ></v-select>
                        </v-col>
                    </v-row>

                    <v-row>
                    <v-col class="pb-0 pt-0">
                        <v-textarea
                        dense
                        v-model="bugStatus.comment"
                        :rules="[rules.required, rules.description]"
                        label="Update Note"
                        required
                        ></v-textarea>
                    </v-col>
                    </v-row>

                    <v-row>
                            
                            <v-col class="pb-0 pt-2">
                                <v-btn elevation="0" class="float-right" color="purple white--text" @click="changeBug()">Submit</v-btn>
                            </v-col>
                    </v-row>
                </v-form>
            </v-card>
        </v-dialog>


        <!-- Bug Details dialog -->

        <v-dialog title="Add New Drug"  v-model="bugDetailsDialog" max-height="500px" max-width="1200px">
            <v-card class="pa-5">
                <v-container>   
                <v-row>
                    <v-col>
                        <br>
                        <v-card class="pa-4">
                           <v-row style="text-align:center;">
                                    <v-col cols="1">
                                        <v-card-subtitle>
                                          <v-icon color="purple lighten-3">mdi-bug</v-icon>
                                        </v-card-subtitle>
                                    </v-col>
                                    <v-col class="ml-2" style="text-align:left" cols="4">
                                        <h5 class="mt-2">
                                            {{bugDetails.title}}
                                        </h5>
                                        <v-chip x-small color="orange lighten-1">{{bugDetails.type}}</v-chip>
                                    </v-col>
                                    <v-col>
                                        <v-card-subtitle>
                                           CREATED BY <v-chip class="ml-2" text-color="white" small color="purple lighten-2">@{{bugDetails.createdBy}}</v-chip>
                                        </v-card-subtitle>
                                    </v-col>
                                    <v-col>
                                        <v-card-subtitle>
                                           Assigned To <v-chip class="ml-2" text-color="white" small color="purple lighten-2">@{{bugDetails.assignedTo}}</v-chip>
                                        </v-card-subtitle>
                                    </v-col>
                                  
                               </v-row>
                        </v-card>
                    </v-col>
                </v-row>
                <v-row class="pa-4" style="text-align:center">
                    <v-col>
                        Last Update By 
                        <v-chip small class="ml-2" color="red lighten-3">@{{bugDetails.updatedBy}}</v-chip> <br>
                        ( {{bugDetails.updatedOn}} )
                    </v-col>
                    <v-divider vertical></v-divider>
                    <v-col>
                        Approve Status: 
                        <v-chip small class="ml-2" outlined :color="getColor(bugDetails.approveStatus)"><b>{{bugDetails.approveStatus}}</b></v-chip> <br>
                        [Note:] <small>{{bugDetails.approveComment}}</small>
                    </v-col>
                    <v-divider vertical></v-divider>
                    <v-col>
                        Bug Status: 
                        <v-chip small class="ml-2" :color="getColor(bugDetails.status)">{{bugDetails.status}}</v-chip> <br>
                        [Note:] <small>{{bugDetails.comment}}</small>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <v-card v-show="isLoadingBugDetails" class="ma-5" style="text-align:center" elevation="0"> 
                            <v-progress-circular
                            style="margin:auto"
                            :size="70"
                            :width="7"
                            color="purple lighten-5"
                            indeterminate
                            ></v-progress-circular>
                         </v-card>
                    </v-col>
                </v-row>
                <v-row v-show="!isLoadingBugDetails">
                    <v-col>
                        <div style="width:900px !important" class="htmlimg" v-html="bugInfo.description"></div>
                    </v-col>
                </v-row>
            </v-container>
            </v-card>
        </v-dialog>

         <v-dialog title="Add New Drug" v-model="ApproveStatusDialog" max-width="500px">
            <v-card class="pa-5">
                 <v-progress-linear
                    :active="loadingResponse"
                    :indeterminate="loadingResponse"
                    absolute
                    top
                    color="#AD74B8"
                ></v-progress-linear>
                <h3>Change Approve Status</h3>
                <!-- <v-btn depressed color="info"><v-icon class="mr-2" @click="adddialog = false">mdi-content-save</v-icon> Save Drug</v-btn> -->
                <br><br>
                <v-form ref="form" lazy-validation class="pa-2">
                    <v-row class="pb-0 pt-0">
                        <v-col class="pb-0 pt-0">
                            <v-select
                            v-model="approveBugStatus.status"
                            :items="['Approved','Rejected','Deffered','Duplicate']"
                            label="Set Status As"
                            ></v-select>
                        </v-col>
                    </v-row>

                    <v-row>
                    <v-col class="pb-0 pt-0">
                        <v-textarea
                        dense
                        v-model="approveBugStatus.comment"
                        :rules="[rules.required, rules.description]"
                        label="Update Note"
                        required
                        ></v-textarea>
                    </v-col>
                    </v-row>

                    <v-row>
                            
                            <v-col class="pb-0 pt-2">
                                <v-btn elevation="0" class="float-right" color="purple white--text" @click="approveBug()">Submit</v-btn>
                            </v-col>
                    </v-row>
                </v-form>
            </v-card>
        </v-dialog>


    </div>
</template>
<script>
import axios from "axios"
import { TiptapVuetify, Heading, Bold, Italic, Strike, Underline, Code, Paragraph,Image, BulletList, OrderedList, ListItem, Link, Blockquote, HardBreak, HorizontalRule, History } from 'tiptap-vuetify'
export default {
    components: { TiptapVuetify },
    data() {
    return {
      idx: 0,
      input: "",
      dialog: false,
      addBugDialog: false,
      bugStatusDialog: false,
      ApproveStatusDialog: false,
      bugDetailsDialog: false,
      selectedProject: "",
      isLoading: false,
      isLoadingBugDetails: true,
        successMsg: false,
      errorMsg: false,
      myRole: [],
      loadingResponse: false,
      apiResponse: "",
      projectMembers: [],
      bugDetails: {},
      bugInfo: {},
      projectInfo: {},
        PROJECT_API:"https://buggie-backend.herokuapp.com/project/",
        BUG_API:"https://buggie-backend.herokuapp.com/bug/",
        auth: "Bearer " + localStorage.getItem("token"),
      userInfo: {},
      formData: {
            assignedTo: "",
            createdBy: "",
            createdOn: "",
            description: `<h2>Description:</h2>
        <p>write Something here</p>
        <h3>Screenshot:</h3>
        <p></p>`,
            projectId: "",
            teamId: "",
            title: "",
            type: ""
            },
    type: [{Name:"Security defects",value:"Security defects"},{Name:"Compatibility defects",value:"Compatibility defects"},{Name:"Usability defects",value:"Usability defects"},{Name:"Performance defects",value:"Performance defects"}, {Name:"Functional defects",value:"Functional defects"}],
    developers: [
        {
            name: "",
            username: ""
        }
    ],

    bugStatus: {
        bugId: "",
        comment: "",
        status: "",
        updateBy: "",
        updateTime: "",
        userId: ""
    },
    approveBugStatus: {
        bugId: "",
        comment: "",
        status: "",
        updateBy: "",
        updateTime: "",
        userId: ""
    },
    
     rules: {
                required: value => !!value || 'Required.',
                counter: value => value.length <= 20 || 'Max 20 characters',
                description: value => value.length <= 150 || 'Max 150 characters',
                email: value => {
                    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                    return pattern.test(value) || 'Invalid e-mail.'
                },
            },
    // declare extensions you want to use
    extensions: [
        History,
        Blockquote,
        Link,
        Underline,
        Strike,
        Italic,
        Image,
        ListItem,
        BulletList,
        OrderedList,
        [Heading, {
            options: {
            levels: [1, 2, 3]
            }
        }],
        Bold,
        Code,
        HorizontalRule,
        Paragraph,
        HardBreak
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
    getApproveBugId(id){
        this.approveBugStatus.bugId = id;
    },
    getBugId(bug){
        this.bugStatus.bugId = bug.id;
        this.bugDetails = bug;
        this.getBugInfo()
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
            // console.log(r.data.data)
            this.projectMembers = r.data.data;
            // console.log("members")
            // console.log(this.projectMembers)
            // localStorage.setItem("projectInfo", JSON.stringify(r.data.data));
            // this.items[2].text = this.projectInfo.name;
                })
        .catch(r => {
            // console.log(r)
        });
    },
        getBugInfo(){
            this.isLoadingBugDetails = true;
        axios({
            method: "get",
            url: this.BUG_API+"{id}?id="+this.bugStatus.bugId,
            headers: {
            Authorization: this.auth,
            "Content-Type": "application/json"
            }
        })
        .then(r => {
            this.isLoadingBugDetails = false;
            this.bugInfo = r.data.data;
                })
        .catch(r => {
            // console.log(r)
        });
    },
    getRoleInProject(id){
        var location = this.projectMembers.members;
        var length = location.length;
        for (let i = 0; i < length; i++) {
            if(location[i].id == id){
                // console.log(location[i].roles[0].name)
                return location[i].roles[0].name;
            }
            
        }
    },
    addNewBug(){
        this.successMsg=false;
        this.errorMsg = false;
        this.formData.createdBy = this.userInfo.username;
        this.formData.projectId = this.projectMembers.id;
        this.formData.createdOn = new Date().toLocaleString();
        let r =  this.$refs.form.validate();
        if(r == true){
            this.loadingResponse = true;
            this.postAddNewBug(JSON.stringify(this.formData));
        }
    },
    postAddNewBug(data) {
        // console.log(data);
        axios({
            method: "POST",
            data: this.formData,
            url: this.BUG_API,
            headers: {
            Authorization: this.auth,
            "Content-Type": "application/json"
            }
        })
        .then(response => {
        // console.log(response)
        this.addBugDialog = false;
        if(response.status == 201){
            if(response.data.message != "Bug Created") {
                this.apiResponse = response.data.message;
                this.successMsg=false;
                this.errorMsg = true;
                this.loadingResponse = false;
            }else{
                this.apiResponse = "Bug Created successfull!";
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


     changeBug(){
        this.successMsg=false;
        this.errorMsg = false;
        this.bugStatus.updateBy = this.userInfo.username;
        this.bugStatus.updateTime = new Date().toLocaleString();
        let r =  this.$refs.form.validate();
        if(r == true){
            this.loadingResponse = true;
            this.changeBugStatus(JSON.stringify(this.approveBugStatus));
        }
    },
    changeBugStatus(data) {
        // console.log(data);
        axios({
            method: "PUT",
            data: this.bugStatus,
            url: this.BUG_API+"change-status",
            headers: {
            Authorization: this.auth,
            "Content-Type": "application/json"
            }
        })
        .then(response => {
        // console.log(response)
        this.addBugDialog = false;
        if(response.status == 200){
            if(response.data.message != "Status Changed") {
                this.apiResponse = response.data.message;
                this.successMsg=false;
                this.errorMsg = true;
                this.loadingResponse = false;
            }else{
                this.apiResponse = "Status Changed!";
                this.errorMsg = false;
                this.successMsg=true;
                this.loadingResponse = false;
                this.bugStatusDialog = false;
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
     approveBug(){
        this.successMsg=false;
        this.errorMsg = false;
        this.approveBugStatus.updateBy = this.userInfo.username;
        this.approveBugStatus.updateTime = new Date().toLocaleString();
        let r =  this.$refs.form.validate();
        if(r == true){
            this.loadingResponse = true;
            this.changeApproveStatus(JSON.stringify(this.approveBugStatus));
        }
    },
    changeApproveStatus(data) {
        // console.log(data);
        axios({
            method: "PUT",
            data: this.approveBugStatus,
            url: this.BUG_API+"change-approve-status",
            headers: {
            Authorization: this.auth,
            "Content-Type": "application/json"
            }
        })
        .then(response => {
        // console.log(response)
        this.addBugDialog = false;
        if(response.status == 200){
            if(response.data.message != "Approve Status Changed") {
                this.apiResponse = response.data.message;
                this.successMsg=false;
                this.errorMsg = true;
                this.loadingResponse = false;
            }else{
                this.apiResponse = "Approve Status Changed!";
                this.errorMsg = false;
                this.successMsg=true;
                this.loadingResponse = false;
                this.ApproveStatusDialog = false;
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
         var string = this.myRole;   
         if(string=="PROJECT_MANAGER"){
             return true;
         }
     },
     developer(){
         var string = this.myRole;   
         if(string=="DEVELOPER"){
             return true;
         }
     },
     tester(){
         var string = this.myRole;   
         if(string=="TESTER"){
             return true;
         }
     },
     getDevelopers(){
    //    console.log("deveee")
       const user = this.projectMembers.members;
    //    console.log(user)
       var dev;
       for (let i = 0; i < user.length; i++) {
         if(user[i].assignedRole==="DEVELOPER"){
        //    console.log(user[i])
           this.developers.push({name:user[i].userObject.firstName+" "+user[i].userObject.lastName, username: user[i].userObject.username});
         }
       }
     },
     getColor(text){
         if(text==="Approved" || text==="Fixed"){
             return "#66bb6a"
         }
         else if(text==="In Progress" || text==="Deffered"){
             return "#ffa000"
         }
         else if(text==="No Action" || text==="Closed"){
             return "#808e95"
         }
         else return "#e57373"
     }
  },
  mounted() {
    this.selectedProject = this.$route.params.projectId;
    this.getProjectInfo();
    // this.projectMembers = JSON.parse(localStorage.getItem("projectInfo"));
    this.myRole = JSON.parse(localStorage.getItem("myRole"));
    this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
  },
};
</script>
<style lang="scss" scoped>
.rowise .col-6 {
  padding-bottom: 0px !important;
  padding-top: 0px !important;
}
.formhtmlimg::v-deep {
    img {
    max-width: 600px !important;
    margin: 20px !important;
    border: 2px solid gray;
    align-self: center !important;
}
}
.htmlimg::v-deep {
    img {
    max-width: 800px !important;
    margin: 20px !important;
    border: 2px solid gray;
    align-self: center !important;
}
}
</style>