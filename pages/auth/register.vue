<template>
  <div id="create-account" class="register auth-page">
    <h1>SIGN UP</h1>
    <div v-if="!emailSend" class="auth-link">already have an account?  <nuxt-link to="/auth/login">login </nuxt-link></div>
    <div class="wrap-auth">
      <form @submit.prevent="createAccount" v-if="!emailSend">
        <div class="flex">
          <div class="wrap-field">
            <label class="form-label"> First Name</label>
            <div class="wrap-input left-input">
              <input
                type="text"
                name="first name"
                placeholder="First Name"
                v-model="firstName"
              />
              <!-- <div v-if="v$.firstName.$error" class="input-error">
                Required Field
              </div> -->
            </div>
          </div>
          <div class="wrap-field">
            <label class="form-label"> Last Name</label>
            <div class="wrap-input">
              <input
                type="text"
                name="last name"
                placeholder="Last Name"
                v-model="lastName"
              />
              <!-- <div v-if="lastName" class="input-error">
                Required Field
              </div> -->
            </div>
          </div>
        </div>
        <div class="wrap-field">
          <label class="form-label"> Email Address</label>
          <div class="wrap-input">
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              v-model="email"
            />
            <!-- <div
              class="input-errors"
              v-for="error of v$.email.$errors"
              :key="error.$uid"
            >
              <div class="error-msg">{{ error.$message }}</div>
            </div> -->
          </div>
        </div>
        <button  v-if="!emailSend" type="submit">Sign Up</button>
        <div class="auth-form-text">
          By signing up, you agree to our <a href="">Terms of Service</a> and <a href="">Privacy Policy</a>.
        </div>
      </form>
      <div v-if="errorMessage&&!emailSend">{{errorMessage}}</div>
      <div class="email-send"  v-if="emailSend">
        <div class="title">Hi, {{ firstName}} {{ lastName}}</div>
        <p class="content">
        <b>we're happy you signed up for remember! </b>
          to continue please confirm your email address.
        </p>
        <button
            class="fill-button verify-now"
            @click="sendEmailLink"
          >
            Verify Now
        </button>
      </div>
    </div>
  </div>
</template>
<script>

const actionCodeSettings = {
  url: window.location.origin + "/auth/resetPassword",
  handleCodeInApp: true,
};
import { createUser } from "~/services/userService.js";
import { User } from "~/models/user";
//vuelidate
/*import useVuelidate from "vuelidate/core";
import {
  required,
  email,
  maxLength,
  minLength,
  numeric,
} from "vuelidate/validators";*/
export default {
  name: "CreateAccount",
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      email: "",
      firstName: "",
      lastName: "",
      emailSend: false,
      errorMessage: "",
      url: window.location.href,
      currentUser: localStorage.getItem("currentUser"),
    };
  },
  /*validations() {
    return {
      firstName: { required }, // Matches this.firstName
      lastName: { required }, // Matches this.lastName
      email: { required, email }, // Matches this.contact.email
    };
  },*/
  methods: {
    /*status(validation) {
      return {
        error: validation.$error,
        dirty: validation.$dirty,
      };
    },*/
    createAccount: async function () {
      //if (this.checkValidForm()) {
        let email = this.email;
        const self = this;
        //SAVE USER IN DB
        let user = new User();
        user.firstName = self.firstName;
        user.lastName = self.lastName;
        user.email = email;
        user.types = ['pageManager'];
        await createUser(user).then(async (newUser) => {
          this.$store.commit("setState", {
            value: newUser,
            state: "currentUser",
          });
          newUser.password = '';
          localStorage.setItem("currentUser", JSON.stringify(newUser));
         
          this.sendEmailLink();
         
        }).catch((error)=> {
          let data = error.response.data;
          if(data.includes("Error, expected `email` to be unique")) {
            this.errorMessage = "This email is already registered in the system, please register with another email or go to the login screen";
          }
          else {
            this.errorMessage = error.response.data;
          }
        });
       
      //}
    },
    sendEmailLink: async function() {
      let email = this.email;
      await this.$fire.auth
      .sendSignInLinkToEmail(email, actionCodeSettings)
      .then((response) => {
        localStorage.setItem("emailForSignIn", email);
        this.emailSend = true;
      })
      .catch((error) => {
        this.errorCode = error.code;
        this.errorMessage = error.message;
      });
    }
    // checkValidForm: async function () {
    //   let isFormCorrect = await this.v$.$validate();
    //   if (isFormCorrect) {
    //     //change the icon
    //     //this.$router.replace({ path: "/auth/createPassword" });
    //     return true;
    //   } else return false;
    // },
  },
  created() {
    this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (this.currentUser && this.currentUser != "") {
      this.email = this.currentUser.email;
      this.firstName = this.currentUser.firstName;
      this.lastName = this.currentUser.lastName;
      this.$store.commit("setState", {
        value: this.currentUser,
        state: "currentUser",
      });
    }
    if((localStorage.getItem("emailForSignIn") ||  localStorage.getItem("emailVerified"))  && this.currentUser && this.currentUser != "") this.emailSend = true;
  },
};
</script>