<template>
  <v-container>
      <v-card>yuyuy</v-card>
    <v-row class="text-center">
      <v-col class="my-4">
        <h1 class="display-2 font-weight-bold mb-3">
          Form Validation Testing v0.1
        </h1>

        <p class="subheading font-weight-regular">
          For help developers to test their applications validation,
          <br/> Contribute in this project
          <a
            href="https://github.com/ihsonnet/blackbox-testing-tool"
            target="_blank"
            >Github Repository</a
          >
        </p>
      </v-col>
    </v-row>
    <v-row>
      <v-card
        class="mx-auto pa-5"
        style="border-radius: 15px; border: 1px solid #e7e7e7"
        elevation="0"
        width="820px"
      >
        <v-card-title>Add Requirment</v-card-title>
        
      </v-card>
    </v-row>
    <v-card
      width="100%"
      class="mt-10 pa-3"
      flat
      style="background-color: #e7e7e7; border-radius: 15px"
    >
      <v-card-title align="center" class="mx-auto">
        Testing Result
      </v-card-title>
    </v-card>
  </v-container>
</template>

<script>
export default {

  data: () => ({
    idx: 0,
    issue: false,
    ecp: false,
    vba: false,
    isRange: false,
    calculate: false,
    requirements: [
      {
        key: "",
        value: "",
      },
    ],
    minBoundary: "",
    maxBoundary: "",
    valid: true,
    name: "",
    nameRules: [
      (v) => !!v || "Value is required",
      (v) => (v && v.length <= 10) || "Value must be less than 10 characters",
    ],
    email: "",
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
    select: null,
    items: ["Input Type", "Range"],
    checkbox1: false,
    checkbox2: false,
    checkbox3: false,
  }),

  methods: {
    addReq(input, field) {
      field.push({ key: "", value: "" });
      console.log(this.requirements);
    },
    deleteReq(index, field) {
      field.splice(index, 1);
    },
    calculateRange() {
      var ranges;
      for (var i = 0; i < this.requirements.length; i++) {
        if(this.requirements[i].key == "Range") {
          ranges = this.requirements[i].value.split("-");
          this.isRange = true
        }
        else {
        this.isRange = false
        }
      }
      this.minBoundary = ranges[0];
      this.maxBoundary = ranges[1];
    },
    validate() {
      this.$refs.form.validate();
      if (this.$refs.form.validate()) {
        this.calculate = true;
        this.calculateRange();
      } else {
        this.calculate = false;
      }
    },
    reset() {
      this.$refs.form.reset();
      this.calculate = false;
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
  },
};
</script>
<style>
.text-field .col {
  padding-bottom: 0 !important;
  padding-top: 0 !important;
}
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td,
th {
  border: 1px solid #dddddd;
  text-align: center;
  padding: 8px;
}

tr:nth-child(odd) {
  background-color: #dddddd;
}
</style>
