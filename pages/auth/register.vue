<template>

  <div id="create-account" class="main-container">
    <div class="main-content">
      <h1>createAccount</h1>
      <form @submit.prevent="createAccount" v-if="!emailSend">
        <label class="form-label"> Name</label>
        <div class="flex">
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

        <label class="form-label"> Email Address</label>
        <div class="wrap-input">
          <input
            type="email"
            name="email"
            placeholder="youremail@gmail.con"
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
        <label class="form-label"> Phone Number</label>
        <div class="wrap-input">
          <input
            type="text"
            name="phone"
            placeholder="+9999-9999-9999"
            v-model="phone"
          />
          <!-- <div v-if="v$.phone.$error" class="input-error">Invalid Phone</div> -->
        </div>
        <button  v-if="!emailSend" type="submit">next</button>
        <nuxt-link to="/auth/login">
            <p>already have an account? login</p>
          </nuxt-link>
      </form>
      <div v-if="errorMessage">{{errorMessage}}</div>
      <div class="email-send"  v-if="emailSend">
        <div class="title">Hi, {{ firstName}} {{ lastName}}</div>
        <p class="content">
          we're happy you signed up for remember. to continue please confirm your
          email address.
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
import { createUser } from "~/services/user-service.js";
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
      phone: "",
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
      phone: { required, minLength: minLength(9), numeric }, // Matches this.contact.phone
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
        user.phone = self.phone;
        user.types = ['pageManager'];
        await createUser(user).then(async (newUser) => {
          localStorage.setItem("currentUser", JSON.stringify(newUser));
          this.$store.commit("setState", {
            value: newUser,
            state: "currentUser",
          });
          this.sendEmailLink();
         
        }).catch((error)=> {
          let data = error.response.data;
          if(data.includes("Error, expected `email` to be unique")) 
          this.errorMessage = "This email is already registered in the system, please register with another email or go to the login screen";
          else
          this.errorMessage = error.response.data;
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
      this.phone = this.currentUser.phone;
      this.$store.commit("setState", {
        value: this.currentUser,
        state: "currentUser",
      });
    }
    if((localStorage.getItem("emailForSignIn") ||  localStorage.getItem("emailVerified"))  && this.currentUser && this.currentUser != "") this.emailSend = true;
  },
};
</script>

<style>
.purchase-cnt {
  align-items: center;
  margin-bottom: 61px;
}
.purchase-cnt input[type="number"] {
  width: 60px;
  margin-left: 19px;
  padding: 0;
  padding-right: 10px;
  text-align: center;
}
.purchase-cnt .form-label {
  font-weight: normal;
}
.emil-send .title {
  font-size: 30px;
  font-weight: bold;
}
.emil-send .contact {
  font-size: 20px;
  font-weight: 600;
}
.emil-send .verify-now {
  margin-top: 57px;
  margin-bottom: 26px;
  height: 52px;
  width: 190px;
  font-size: 20px;
}
.emil-send .continue-request {
  font-size: 16px;
  text-decoration: underline;
}
</style>