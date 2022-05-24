<template>
  <div class="reset-password auth-page">
    <h1>CREATE PASSWORD</h1>
    <div class="auth-link">Continue to sign up, or <nuxt-link to="/auth/login">login</nuxt-link> instead</div>
    <div class="wrap-auth">
      <form @submit.prevent="createPassword" v-if="!isLinkError">
        <div class="wrap-field">
          <label>New Password</label>
          <div class="wrap-input">
            <input
              type="password"
              name="password"
              v-model="password"
              :id="'password_field' + 1"
              class="password-field"
            />
            <img
              class="show-password"
              alt="edit icon"
              :src="require('@/assets/images/show-password.svg')"
              @click="(event) => showPassword(event, 1)"
            />
          </div>
          <!-- <div
            class="input-error"
            v-for="(error, errorIndex) in v$.password.$errors"
            :key="errorIndex"
          >
            {{ error.$message }}
          </div> -->
        </div>
        <div class="wrap-field">
          <label> Confirm New Password</label>
          <div class="wrap-input">
            <input
              type="password"
              name="confirm password"
              v-model="confirmPassword"
              :id="'password_field' + 2"
              class="password-field"
            />
            <img
              class="show-password"
              alt="edit icon"
              :src="require('@/assets/images/show-password.svg')"
              @click="(event) => showPassword(event, 2)"
            /> 
          </div>
          <!-- <div
            class="input-error"
            v-for="(error, errorIndex) in v$.confirmPassword.$errors"
            :key="errorIndex"
          >
            {{ error.$message }}
          </div> -->
        </div>
        <button type="submit" class="">Save</button>
      </form>
      <div v-else>{{isLinkError}}</div>
      <div class="form-terms">
        <div class="form-term">
          <img
            class="term-icon"
            :src="require('@/assets/images/fill-rounded-v-icon.svg')"
          /> 
          <p>At least 8 characters</p>
        </div>
        <div class="form-term">
          <img
            class="term-icon"
            :src="require('@/assets/images/fill-rounded-v-icon.svg')"
          /> 
          <p>
           A mixture of both uppercase and lowercase letters A mixture of letters and numbers
          </p>
        </div>
        <div class="form-term">
          <img
            class="term-icon"
            :src="require('@/assets/images/fill-rounded-v-icon.svg')"
          /> 
          <p>Inclusion of at least one special character, e.g., ! @ # ? ]</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
//import useVuelidate from "vuelidate/core";
//import { required, minLength, sameAs } from "vuelidate/validators";
import { updatePasswordInNode } from "~/services/userService.js";
import { updateUserStatus } from "~/services/userService.js";

import { User } from "../../models/user";

export default {
  name: "CreatePassword",
  components: {  },
  data() {
    return {
      password: "",
      confirmPassword: "",
      isLinkError: ""
    };
  },
  setup() {
    return { v$: useVuelidate() };
  },
  /*validations() {
    return {
      password: {
        required,
        minLength: minLength(8),
      },
      confirmPassword: { required, sameAsPassword: sameAs(this.password) },
    };
  },*/
  methods: {
    showPassword(event, id) {
      let password = document.getElementById("password_field" + id);
      let type;
      if (password.getAttribute("type") === "password") {
        type = "text";
        event.target.src = require("@/assets/images/hide-password.svg");
      } else {
        type = "password";
        event.target.src = require("@/assets/images/show-password.svg");
      }
      password.setAttribute("type", type);
    },
    createPassword: async function () {
      //let confirmPassword = await this.v$.$validate();
      //if (confirmPassword) {
        let updatedUser = new User();
        updatedUser = JSON.parse(localStorage.getItem("currentUser"));

        //firebase
        const newPassword = this.password;
        const auth = this.$fire.auth
        let user = auth.currentUser;
        await user.updatePassword(newPassword).then(async () => {
           //node js update password
            await updatePasswordInNode(updatedUser._id, this.password).then((res) => {
              localStorage.setItem("currentUser", JSON.stringify(updatedUser));
              localStorage.removeItem("emailVerified");

              this.$router.push({
                path: "/rp/create"
              });

            });
        })
      //}
    },
    confirmSignIn: async function () {
      if(this.$fire.auth.isSignInWithEmailLink(window.location.href)) {
        let email = localStorage.getItem("emailForSignIn");
        if (!email) {
          // eslint-disable-next-line no-console
          console.log("not email");
        }
        this.$fire.auth.signInWithEmailLink(email, window.location.href)
        .then((result) => {
          // Clear email from storage.
          window.localStorage.removeItem("emailForSignIn");
          localStorage.setItem("emailVerified", true);

          //save on mongo with isActive=true
          this.updateUser(email, true);
        })
        .catch((error) => {
          console.log("error occured in auth link");
          console.log(error);
          window.localStorage.setItem("emailForSignIn",email);
          this.$router.push({
            path: "/auth/register",
          });
        });
      }
      else {
        if (this.emailVerified != true) {
          this.$router.push({
            path: "/auth/register",
          });
        } 
      }
    },
    updateUser: async function (email, isActive) {
      await updateUserStatus(email, isActive).then((updateUser) => {
        let cUser = JSON.parse(localStorage.getItem("currentUser"));
        cUser["_id"] = updateUser._id;
        cUser["firstName"] = updateUser.firstName;
        cUser["lastName"] = updateUser.lastName;
        cUser["username"] = cUser["firstName"] + " " + cUser["lastName"];
        cUser["phone"] = updateUser.phone;
        localStorage.setItem("currentUser", JSON.stringify(cUser));
      });
    }

  },
  created: async function () {
    await this.confirmSignIn(this.url);
  },
  computed: {
    emailVerified: function () {
      return localStorage.getItem("emailVerified") == "true";
    },
  },
};
</script>
