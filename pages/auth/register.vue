<template>

  <div id="create-account" class="main-container">
    <div class="main-content">
      <h1>createAccount</h1>
      <form @submit.prevent="createAccount" v-if="!emailSend">
        <label class="form-label"> Name</label>
        <div class="flex">
          <div class="wrap-input left-input">
            <input
              :class="{ invalid: v$.firstName.$error }"
              type="text"
              name="first name"
              placeholder="First Name"
              v-model="v$.firstName.$model"
            />
            <div v-if="v$.firstName.$error" class="input-error">
              Required Field
            </div>
          </div>
          <div class="wrap-input">
            <input
              :class="{ invalid: v$.lastName.$error }"
              type="text"
              name="last name"
              placeholder="Last Name"
              v-model="v$.lastName.$model"
            />
            <div v-if="v$.lastName.$error" class="input-error">
              Required Field
            </div>
          </div>
        </div>

        <label class="form-label"> Email Address</label>
        <div class="wrap-input">
          <input
            :class="{ invalid: v$.email.$error }"
            type="email"
            name="email"
            placeholder="youremail@gmail.con"
            v-model="v$.email.$model"
          />
          <div
            class="input-errors"
            v-for="error of v$.email.$errors"
            :key="error.$uid"
          >
            <div class="error-msg">{{ error.$message }}</div>
          </div>
        </div>
        <label class="form-label"> Phone Number</label>
        <div class="wrap-input">
          <input
            :class="{ invalid: v$.phone.$error }"
            type="text"
            name="phone"
            placeholder="+9999-9999-9999"
            v-model="v$.phone.$model"
          />
          <div v-if="v$.phone.$error" class="input-error">Invalid Phone</div>
        </div>
        <button  v-if="!emailSend" type="submit">next</button>
        <nuxt-link to="/auth/login">
            <p>already have an account? login</p>
          </nuxt-link>
      </form>
      <div class="email-send"  v-if="emailSend">
        <div class="title">Hi, {{ v$.firstName.$model}} {{ v$.lastName.$model}}</div>
        <p class="content">
          we're happy you signed up for remember. to continue please confirm your
          email address.
        </p>
        <button class="fill-button verify-now" @click="createAccount">Verify Now</button>
        <a class="continue-request">
          continue process and verify later.
        </a>
      </div>
    </div>
  </div>
</template>
<script>

const actionCodeSettings = {
  url: window.location.origin + "/auth/createPassword",
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
      if (this.checkValidForm()) {
        let email = this.email;
         await this.$fire.auth
        .sendSignInLinkToEmail(email, actionCodeSettings)
        .then((response) => {
          self.getLoginUser(email);
          this.emailSend = true;
          localStorage.setItem("emailForSignIn", email);
          let newUser = new User();
          newUser.firstName = this.firstName;
          newUser.lastName = this.lastName;
          newUser.email = email;
          newUser.phone = this.phone;
          newUser.types = ['pageManager'];
          createUser(newUser);
          self.$router.replace("/rememberPage/main");
        })
        .catch((error) => {
          this.errorCode = error.code;
          this.errorMessage = error.message;
        });
      }
    },
    createUser: async function (user) {
      await createUser(user).then((newUser) => {
        localStorage.setItem("currentUser", JSON.stringify(newUser));
        this.$store.state.currentUser = newUser;
      });
    },
    checkValidForm: async function () {
      let isFormCorrect = await this.v$.$validate();
      if (isFormCorrect) {
        //change the icon
        //this.$router.replace({ path: "/auth/createPassword" });
        return true;
      } else return false;
    },
  },
  created() {
    if(!this.currentUser) {
      currentUser = JSON.parse(localStorage.getItem("currentUser"));
    }
    if (currentUser) {
      this.email = currentUser.email;
      this.firstName = currentUser.firstName;
      this.lastName = currentUser.lastName;
      this.phone = currentUser.phone;
    }
    if (!this.$store.state.currentUser)
      this.$store.state.currentUser = currentUser;

  },
  computed: {
    emailVerified: function () {
      return localStorage.getItem("emailVerified") == "true";
    },
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