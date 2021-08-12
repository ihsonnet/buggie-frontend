<template>
        <v-container class="full-height" fluid>
        <!-- <v-row justify="center" align-content="center">
            <v-col class="mx-20 my-10">
                 <div class="d-flex align-center">
                    <v-img
                    alt="Vuetify Name"
                    class="shrink bt-2 mr-2"
                    contain
                    min-width="100"
                    src="@/assets/hero-logo.png"
                    width="140"
                    />
                </div>
                <v-card elevation="0" width="400px" height="250px">
                   <h4>Sign In</h4>
                </v-card>
            </v-col>
        </v-row> -->

        <v-snackbar
            v-model="alert"
            timeout=3000
            absolute
            center
            rounded="pill" class="text-center"
            top
            color="red"
            >
            {{ apiResponse }}
            </v-snackbar>
            <v-row style="margin-top:8%;vertical-align: middle; !important" align="center" justify="center">
            <v-col style="margin-left:35%;" class="d-flex flex-column justify-center align-center">

            <v-card flat tile style="padding:2.5%; !important" color="white" width="400" max-height="1000">
            <v-progress-linear
                :active="dialog"
                :indeterminate="dialog"
                absolute
                top
                color="matgreen"
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
                        :rules="[rules.required]"
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
                    <v-row>
                        <!-- <v-btn
                            class="elevation-0"
                            style="margin-left:2.5%"
                            to="signup"
                            >
                            Create An Account
                            </v-btn> -->
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
                Copyroght Buggie | 2021
            </v-footer>
        </v-container>
</template>

<script>
import axios from 'axios';
const API_URL = 'https://dokanee-backend-monolithic.herokuapp.com/'
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
      response: "",
       rules: {
          required: value => !!value || 'Required.',
          min: v => v.length >= 8 || 'Min 8 characters',
          emailMatch: () => ('The email and password you entered don\'t match'),
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
      localStorage.setItem('id_token', response.id_token)
      localStorage.setItem('access_token', response.data.accessToken)
      localStorage.setItem("role",response.data.role)
    
      // this.user.authenticated = true
      console.log(localStorage)
      // Redirect to a specified route
      this.$router.push("/cpanel/dashboard");
    })
    .catch(err => {
      console.log(err.response)
      if (err.response.status === 401) {
      // client received an error response (5xx, 4xx)
     this.apiResponse = "Password or Email or Both didn't match!";
      this.dialog = false;
      this.alert = true;
       
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
    let token = localStorage.getItem('access_token');
    if(token != null) {
  console.log("already logged in");
  // window.location.href = "http://localhost:8080/#/cpanel/dashboard";
  this.$router.push("/cpanel/dashboard");
    }
         
  },
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
  height: 720px;
  background-color:#f2f5f8;
}
</style>