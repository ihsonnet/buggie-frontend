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
            <v-row style="padding-top:8%;vertical-align: middle; !important" align="center" justify="center">
            <v-col class="d-flex justify-center align-center">

            <v-card flat style="padding:2.5%;border:1px solid #d6d9db;margin: auto; !important" color="white" width="400" max-height="1000">
            <v-progress-linear
                :active="dialog"
                :indeterminate="dialog"
                absolute
                top
                color="#AD74B8"
            ></v-progress-linear>
                <div align="center">
                    <v-img max-width='200' min-width="170" height='80' src="@/assets/hero-logo.png"></v-img>
                    <br>
                    <h3 class="my-4">Sign in to Buggie</h3>
                </div>
              <v-form style="margin-top:20px" ref="form" lazy-validation class="">
                    <v-text-field dense
                        v-model="email"
                        label="E-mail"
                        type="email"
                        :rules="[rules.required,rules.email]"
                        required
                        outlined
                    ></v-text-field>
                    <v-text-field
                    v-model="password"
                    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="[rules.required, rules.min]"
                    :type="showPassword ? 'text' : 'password'"
                    name="input-10-1"
                    label="Password"
                    hint="At least 8 characters"
                    counter
                    outlined
                    required
                    dense
                    @click:append="showPassword = !showPassword"
                ></v-text-field>
                    <!-- <router-link style="color:#2196F3;text-decoration: none;"  :to="{path:'reset-password'}">Forgot Password?</router-link> -->
                    <!-- <br/>
                    <br/>
                    <br/> -->
                    <br>
                    <v-row class="mt-8">
                        <v-col>
                          <v-btn
                            class="mt-4 mx-0"
                            elevation="0"
                            to="signup"
                            >
                            Create An Account
                            </v-btn>
                        </v-col>
                            <!-- <v-btn style="color:#666;text-decoration: none;margin-left:2.5%" href="#/auth/signup">Create An Account</v-btn> -->
                                    <v-col  style="text-align:center" class="pb-0 pt-0">
                        <v-btn color="#BB79B8" @click="submit">Sign In</v-btn>
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
      email: "",
      password: "",
      showPassword: false,
      dialog: false,
        apiResponse: null,
      alert: false,
      successMsg: false,
      errorMsg: false,
      response: "",
       rules: {
          required: value => !!value || 'Required.',
          min: v => v.length >= 8 || 'Min 8 characters',
          emailMatch: () => ('The email and password you entered don\'t match'),
          email: value => {
                    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                    return pattern.test(value) || 'Invalid e-mail.'
                },
        }
    }
  },
  watch: {
    date(val) {
      this.dateFormatted = this.formatDate(this.date);
    },
  },
  methods: {
    submit(){
      let r =  this.$refs.form.validate();
      if(r == true){
      let i = this;
        this.dialog = true;
       let signInData = {
         email: this.email,
         password: this.password
       }
        // setTimeout(() => {   
            i.response = this.login(signInData);
            
        // }, 4000)
      }
    },
    login(data) {
    
    axios.post(LOGIN_URL, data)
    .then(response => {
      console.log(response)
      localStorage.setItem('token', response.data.accessToken)
    
      // this.user.authenticated = true
      console.log(localStorage)
      // Redirect to a specified route
      this.$router.push("/");
    })
    .catch(err => {
      console.log(err.response)
      if (err.response.status === 401) {
      // client received an error response (5xx, 4xx)
     this.apiResponse = "Password or Email or Both didn't match!";
      this.dialog = false;
      this.alert = true;
      this.successMsg = false;
      this.errorMsg = true;
    } else if (err.request) {
      // client never received a response, or request never left
    } else {
      // anything else
    }
    });
    
  },
    redirect(){
      this.$router.push("/cpanel/dashboard");
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
.theme--light.v-messages {
  color: #E4515D;
}
</style>