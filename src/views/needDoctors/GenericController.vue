<template>
  <v-container>
    <div style="position: fixed;z-index:1;right:20px">
    <v-alert v-if="successMsg" text type="success">
     <b>#ID {{model}}</b> Info Edited Successfully!
    </v-alert>

    <v-alert v-if="errorMsg" text type="error">
      <b>#ERROR </b>Something Went Wrong!
    </v-alert>
  </div>
  <br>
    <v-card
    elevation="0"
    style="border:1px solid #e7e7e7">
      <v-card-title>
        Search Generic:
      </v-card-title>
      <v-row class="ma-4">
        <v-col>
        <v-autocomplete
          v-model="model"
          :items="items"
          :loading="isLoading"
          :search-input.sync="search"
          chips
          clearable
          hide-details
          hide-selected
          item-text="genericName"
          item-value="getGenericId"
          label="Search for a Generic"
          solo
        >
          <template v-slot:no-data>
            <v-list-item>
              <v-list-item-title>
                Search By
                <strong>Generic Name</strong>
              </v-list-item-title>
            </v-list-item>
          </template>
          <template v-slot:selection="{ attr, on, item, selected }">
            <v-chip
              v-bind="attr"
              :input-value="selected"
              color="blue-grey"
              class="white--text"
              v-on="on"
            >
              <v-icon left>
                mdi-pill
              </v-icon>
              <span v-text="item.genericName"></span>
            </v-chip>
          </template>
          <template v-slot:item="{ item }">
            <v-list-item-avatar
              color="teal"
              class="text-h5 font-weight-light white--text"
            >
              <v-icon color="white">mdi-pill</v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title v-text="item.genericName"></v-list-item-title>
              <v-list-item-subtitle v-text="item.getGenericId"></v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-icon>mdi-chart-bubble</v-icon>
            </v-list-item-action>
          </template>
        </v-autocomplete>
        </v-col>
      </v-row>
    </v-card>
    <br>
    <v-card
    elevation="0"
    style="border:1px solid #e7e7e7">
      <v-card-title>Edit Generic (#ID {{ model }})</v-card-title>
      <v-row class="ma-4">
        <v-col>
          <v-form
            ref="form"
            v-model="valid"
            lazy-validation
          >
            <h3>Generic Name: {{ genericInfo.genericName }}</h3>
            <br>
            <v-textarea
              v-model="genericInfo.precaution"
              auto-grow
              filled
              color="teal"
              label="Precaution"
              rows="1"
              required>
            </v-textarea>
            <v-textarea
              v-model="genericInfo.indication"
              auto-grow
              filled
              color="teal"
              label="Indication"
              rows="1"
              required>
            </v-textarea>
            <v-textarea
              v-model="genericInfo.dose"
              auto-grow
              filled
              color="teal"
              label="Dose"
              rows="1"
              required>
            </v-textarea>
             <v-textarea
              v-model="genericInfo.sideEffect"
              auto-grow
              filled
              color="teal"
              label="Side Effect"
              rows="1"
              required>
            </v-textarea>
            <v-textarea
              v-model="genericInfo.modeOfAction"
              auto-grow
              filled
              color="teal"
              label="Mode of Action"
              rows="1"
              required>
            </v-textarea>
            <v-textarea
              v-model="genericInfo.pregnancyCategoryNote"
              auto-grow
              filled
              color="teal"
              label="Pregnancy Category Note"
              rows="1">
            </v-textarea>
            <v-textarea
              v-model="genericInfo.adultDose"
              auto-grow
              filled
              color="teal"
              label="Adult Dose"
              rows="1"
              required>
            </v-textarea>
             <v-textarea
              v-model="genericInfo.childDose"
              auto-grow
              filled
              color="teal"
              label="Child Dose"
              rows="1"
              required>
            </v-textarea>
             <v-textarea
              v-model="genericInfo.renalDose"
              auto-grow
              filled
              color="teal"
              label="Renal Dose"
              rows="1"
              required>
            </v-textarea>
             <v-textarea
              v-model="genericInfo.administration"
              auto-grow
              filled
              color="teal"
              label="Administration"
              rows="1"
              required>
            </v-textarea>
            <v-btn
              color="success"
              style="color:white"
              class="mr-4 pa-2"
              @click="editGenericInfo"
            >
             <v-progress-circular
                indeterminate
                :size="25"
                :width="2"
                class="mr-2"
                v-if="isLoading2"
                color="white"
              ></v-progress-circular>
               Update Info
            </v-btn>
          </v-form>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>
<script>
import axios from 'axios'
export default {
    data: () => ({
      isLoading: false,
      isLoading2: false,
      successMsg: false,
      errorMsg: false,
      items: [],
      model: null,
      search: null,
      tab: null,
      GET_GENERIC_API: "http://need-doctors-backend.southeastasia.cloudapp.azure.com:8100/drugs/generics",
      genericList: [],
      genericInfo: {
        "administration": "",
        "adultDose": "",
        "childDose": "",
        "contraIndication": "",
        "dose": "",
        "genericId": 0,
        "genericName": "",
        "indication": "",
        "interaction": "",
        "modeOfAction": "",
        "precaution": "",
        "pregnanciesCategoryId": 0,
        "pregnancyCategoryNote": "",
        "renalDose": "",
        "sideEffect": ""
      },
    }),
    methods: {
      getGeneticList(){
      axios({
        method: "GET",
        url: `${this.GET_GENERIC_API}?genericName=${this.search}&pageNo=0&pageSize=50`
      })
      .then((r)=>{
        this.items = r.data
        console.log("Data")
        console.log(r.data);
      })
      .catch(err => {
            console.log(err)
          })
      .finally(() => (this.isLoading = false))
      },
      submit () {
        this.$refs.observer.validate()
      },
      getGenericInfo(){
      axios({
        method: "GET",
        url: `${this.GET_GENERIC_API}/${this.model}`
      })
      .then((r)=>{
        this.genericInfo = r.data
        console.log("Data")
        console.log(r.data);
      })
      .catch(err => {
            console.log(err)
      })
      },
      editGenericInfo(){
        this.isLoading2 = true
        axios({
          method: "PUT",
          url: `${this.GET_GENERIC_API}/${this.model}`,
          data: this.genericInfo,
          headers: {
            "Content-Type": "application/json"
          }
        })
        .then( (r)=> {
          if(r.data == "Generic Edited"){
            this.successMsg = true
            this.errorMsg = false
          }
          else {
            this.successMsg = false
            this.errorMsg = true
          }
          this.getGenericInfo()
        })
        .catch(r => {
            this.successMsg = false
            this.errorMsg = true
        })
        .finally(() => (this.isLoading2 = false))
      }
    },
    watch: {
      model (val) {
        if (val != null) {
          this.tab = 0
          this.getGenericInfo()
        }
        else this.tab = null
        this.successMsg = false
        this.errorMsg = false
        console.log(val)
      },
      search (val) {
        // Items have already been loaded
        // if (this.items.length > 0) return
        console.log(val)
        this.successMsg = false
        this.errorMsg = false
        this.isLoading = true
        this.getGeneticList()
      },
    },
  }
</script>