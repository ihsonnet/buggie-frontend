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
            <v-col lg="4" md="4" sm="12" cols="12">
                <v-card flat tile color="#F2F5F8" style="border-radius:15px !importanat" class="ma-5 pa-6" elevation="0">
                <v-progress-linear
                :active="loadingResponse"
                :indeterminate="loadingResponse"
                absolute
                top
                color="#AD74B8"
            ></v-progress-linear>
                    <v-row class="pa-2">
                        <v-icon large>mdi-plus</v-icon> <h4 class="mt-1 ml-2">Add Members</h4>
                        <!-- <v-spacer></v-spacer> <v-btn depressed @click="adddialog = true" color="info">Add Drugs</v-btn> -->
                    </v-row>
                    <br>
                <v-form ref="form" lazy-validation class="pa-0">
                <v-row>
                  <v-col class="pb-0 pt-0" cols="12" sm="6">
                    <v-text-field dense v-model="formData.firstName"  :rules="[rules.required, rules.counter]" required label="First Name" filled></v-text-field>
                  </v-col>

                  <v-col class="pb-0 pt-0" cols="12" sm="6">
                    <v-text-field dense v-model="formData.lastName" :rules="[rules.required, rules.counter]" required label="Last Name" filled></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col class="pb-0 pt-0">
                    <v-text-field
                      dense
                      v-model="formData.email"
                      :rules="[rules.required, rules.email]"
                      label="E-mail"
                      required
                      filled
                    ></v-text-field>
                  </v-col>
                </v-row>
                <!-- <v-row>
              <v-col>
                <VuePhoneNumberInput dark-color="#9e9e9e" default-country-code="BD" required v-model="yourValue" />
              </v-col>
                </v-row>-->

                <v-row>
                  <v-col class="pb-0 pt-0" cols="12" sm="6">
                    <v-text-field
                      v-model="formData.password"
                      :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                      :rules="[rules.required, rules.counter]"
                      :type="showPassword ? 'text' : 'password'"
                      name="input-10-1"
                      label="Password"
                      hint="At least 8 characters"
                      counter
                      dense
                      filled
                      @click:append="showPassword = !showPassword"
                    ></v-text-field>
                  </v-col>
                  <v-col class="pb-0 pt-0" cols="12" sm="6">
                    <v-text-field
                      v-model="password2"
                      :append-icon="showPassword2 ? 'mdi-eye' : 'mdi-eye-off'"
                   :rules="[rules.required, rules.counter, (formData.password === password2) || 'Password must match']"
                      :type="showPassword2 ? 'text' : 'password'"
                      name="input-10-1"
                      label="Confirm"
                      hint="At least 8 characters"
                      counter
                      dense
                      filled
                      @click:append="showPassword2 = !showPassword2"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col class="pb-0 pt-0" cols="12">
                    <v-text-field
                      dense
                      v-model="formData.phoneNo"
                      :rules="[rules.required]"
                      label="Phone Number"
                      required
                      filled
                      type="number"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row class="pb-0 pt-0">
                    <v-col class="pb-0 pt-0">
                   <v-select
                    v-model="formData.role[0]"
                    :items="role"
                    item-text="Name"
                    item-value="value"
                    label="Select User Role"
                    filled
                    ></v-select>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col class="pb-0 pt-0">
                    <v-text-field dense v-model="formData.address" :rules="[rules.required]" required label="Address" filled></v-text-field>
                  </v-col>
                </v-row>

                <!-- <v-checkbox
              v-model="checkbox"
              :rules="[v => !!v || 'You must agree to continue!']"
              label="Do you agree?"
              required
                ></v-checkbox>-->
                <v-row>
                  <!-- <v-btn
                    class="elevation-0"
                    style="margin-left:3%"
                    :to="{path:'signin'}"
                    >
                    Back to sign in
                    </v-btn> -->
                  <v-col class="pb-0 pt-0">
                    <v-btn elevation="0" class="float-right" color="purple white--text" @click="submit">Register New Member</v-btn>
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
                   
                   <v-row>
                       <v-col>
                           <v-card class="pa-4 mt-2" elevation="0" style="border: 1px solid #e7e7e7" width="100%">
                               <v-row class="pa-5">
                                   <v-icon large>mdi-account-supervisor-circle-outline</v-icon> <h3 class="mt-1 ml-2">Team Members of ({{userInfo.teamDetails.name}})</h3>
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
            windowWidth: window.innerWidth,
            loadingResponse: false,
            yourValue: 0,
            showPassword: false,
            showPassword2: false,
            apiResponse: null,
            SIGNUP_URL: "https://buggie-backend.herokuapp.com/auth/signup",
            successMsg: false,
            errorMsg: false,
            alert: false,
            alertType: "",
            password: "",
            password2: "",
            rules: {
                required: value => !!value || 'Required.',
                counter: value => value.length <= 20 || 'Max 20 characters',
                email: value => {
                    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                    return pattern.test(value) || 'Invalid e-mail.'
                },
                },
            formData: {
                address: "Dhaka, Bangladesh",
                createdBy: "",
                createdOn: "string",
                email: "onikrs1@gmail.com",
                firstName: "Shahriar",
                lastName: "Onik",
                password: "12345678",
                phoneNo: "01734543028",
                role: [
                    "TESTER"
                ]
            },
            role: [{Name:"Tester",value:"TESTER"},{Name:"Developer",value:"DEVELOPER"}],
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
                    }
                    ,
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
    computed: {
    showImage(){
      return this.windowWidth > 950;
    },
    passwordConfirmationRule() {
      return () => (this.password === this.password2) || 'Password must match'
    }
  },
  watch: {
    
  },
 mounted(){
     this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
     this.formData.createdBy = this.userInfo.id;
     console.log(this.formData)
   window.addEventListener('resize', () => {
      this.windowWidth = window.innerWidth
    })
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
    console.log(data);
    axios({
        method: "POST",
        data: this.formData,
        url: this.SIGNUP_URL
    })
    .then(response => {
      console.log(response)
      if(response.status == 200){
      if(response.data.massage != "OK") {
        this.apiResponse = response.data.massage;
        // this.alertType  = "red";
        // this.alert = true;
        this.successMsg=false;
        this.errorMsg = true;
         this.loadingResponse = false;
        }else{
          this.apiResponse = "Account has been created successfully!";
//           this.alertType = "green"
// this.alert = true;
          this.errorMsg = false;
          this.successMsg=true;
         this.loadingResponse = false;
      // localStorage.setItem('id_token', response.id_token)
      // localStorage.setItem('access_token', response.data.accessToken)
        }
    }
    else{
      this.apiResponse = response.data.massage;
        this.successMsg=false;
        this.errorMsg = true;
         this.loadingResponse = false;
    }
      // this.user.authenticated = true
      // console.log(localStorage)
    })
     .catch(err => console.log(err.response));
         
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