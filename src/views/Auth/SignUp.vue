<template>
        <v-container class="full-height" fluid>

        <div style="padding-top:25px; position: fixed;z-index:1;right:20px">
            <v-alert v-if="successMsg" color="#4BCA81" text type="success">
            {{apiResponse}}
            </v-alert>

            <v-alert v-if="errorMsg" text color="#E4515D" type="error">
              {{apiResponse}}
            </v-alert>
          </div>
            <v-row style="padding-top:5%; vertical-align: middle; !important" align="center" justify="center">
            <v-col class="d-flex justify-center align-center">

            <v-card flat style="padding:2.5%;border:1px solid #d6d9db;margin: auto; !important" color="white" width="500" max-height="1000">
            <v-progress-linear
                :active="loadingResponse"
                :indeterminate="loadingResponse"
                absolute
                top
                color="#AD74B8"
            ></v-progress-linear>
                <div align="center">
                    <v-img max-width='200' min-width="170" height='80' src="@/assets/hero-logo.png"></v-img>
                    <br>
                    <h3 class="my-4">Create A Buggie Account</h3>
                </div>
                <br>
                <br>
               <v-form ref="form" lazy-validation class="pa-0">
                <v-row>
                  <v-col class="pb-0 pt-0" cols="12" sm="6">
                    <v-text-field dense v-model="formData.firstName"  :rules="[rules.required, rules.counter]" required label="First Name" outlined></v-text-field>
                  </v-col>

                  <v-col class="pb-0 pt-0" cols="12" sm="6">
                    <v-text-field dense v-model="formData.lastName" :rules="[rules.required, rules.counter]" required label="Last Name" outlined></v-text-field>
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
                      outlined
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
                      outlined
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
                      outlined
                      @click:append="showPassword2 = !showPassword2"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col class="pb-0 pt-0" cols="12">
                    <v-text-field
                      dense
                      v-model="formData.phoneNo"
                      :rules="[rules.required, rules.phone]"
                      label="Phone Number"
                      required
                      hint="Length must be 11"
                      outlined
                      type="number"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col class="pb-0 pt-0">
                    <v-text-field dense v-model="formData.address" :rules="[rules.required]" required label="Address" outlined></v-text-field>
                  </v-col>
                </v-row>

                <!-- <v-checkbox
              v-model="checkbox"
              :rules="[v => !!v || 'You must agree to continue!']"
              label="Do you agree?"
              required
                ></v-checkbox>-->
                <v-row>
                  <v-btn
                    class="elevation-0"
                    style="margin-left:3%"
                    :to="{path:'signin'}"
                    elevation="0"
                    >
                    Back to sign in
                    </v-btn>
                  <v-col style="text-align:right" class="pb-0 pt-0">
                    <v-btn elevation="0" class="float-right" color="#A873B9" @click="submit">Register</v-btn>
                  </v-col>
                </v-row>
              </v-form>
                </v-card>
            </v-col>
            </v-row>
            <v-footer fixed>
                <p style="text-align:center;margin:auto; !important">Copyright © Buggie | 2021</p> 
            </v-footer>
        </v-container>
</template>

<script>
import axios from 'axios';
const API_URL = 'https://buggie-backend.herokuapp.com/'
const LOGIN_URL = API_URL + 'auth/signin/'
const SIGNUP_URL = API_URL + 'auth/signup'
const options = {
    headers: {
        'Content-Type': 'application/json',
    }
  };
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
                phone: value => {
                    const pattern = /^(?:\+88|01)?(?:\d{11}|\d{13})$/
                    return pattern.test(value) || 'Use +880 or 01x pattern && Length must be 11'
                    },
                email: value => {
                    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                    return pattern.test(value) || 'Invalid e-mail.'
                },
                },
            formData: {
                address: "",
                createdBy: "",
                createdOn: "",
                email: "",
                firstName: "",
                lastName: "",
                password: "",
                phoneNo: "",
                role: [
                    "PROJECT_MANAGER"
                ]
            },
    }
  },
  methods: {
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
      if(response.data.massage == "OK") {
            this.apiResponse = "Account has been created successfully!";
            localStorage.setItem('token', response.data.accessToken)
            this.errorMsg = false;
            this.successMsg=true;
            this.loadingResponse = false;
            this.$router.push("/");
        }else{
            this.apiResponse = response.data.massage;
            this.successMsg=false;
            this.errorMsg = true;
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
    redirect(){
      this.$router.push("/");
    }
  },
  mounted(){
    if(localStorage.token!= undefined){
      this.$router.push("/");
    }
  }
  //   watch: {
  //     response (val) {
  //       console.log("logging" + val);
  //         let i = this;
  //        if(val!=false){
  //     this.dialog = false;
  //   setTimeout(() => {   
  //           window.location.href = "http://localhost:8080/#/";
  //       }, 4000)
  //  }
  //     },
  //   }
}
</script>

<style scoped>
.full-height {
  background-color:#f2f5f8;
  padding: 0;
  margin: 0;
  width: 100%;
  min-height: 100vh;
}
.col, .col-sm-6, .col-12 {
    padding-top: 0px !important;
    padding-bottom: 0px !important;
}
</style>