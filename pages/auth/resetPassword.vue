<template>
  <div class="reset-password auth-page">
    <h1>CREATE PASSWORD</h1>
    <div class="auth-link">Continue to sign up, or <nuxt-link to="/auth/login">login</nuxt-link> instead</div>
    <div class="wrap-auth">
      <form @submit.prevent="createPassword">
        <div class="wrap-field">
          <label>New Password</label>
          <div class="wrap-input">
            <input
              required
              type="password"
              name="password"
              v-model="password"
              :id="'password_field' + 1"
              class="password-field"
              :class="{'no-valid' : (!isSame || !is8Char || !isContainsSpacial || !isMix)}"
              @input="changePassword()"
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
              required
              type="password"
              name="confirm password"
              v-model="confirmPassword"
              :id="'password_field' + 2"
              class="password-field"
              :class="{'no-valid' : (!isSame)}"
              @input="changePassword()"
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
        <div class='auth-error-message' v-if="errorMessage">{{errorMessage}}</div>

        <div class="form-terms">
          <div class="form-term">
            <img v-if="is8Char"
              class="term-icon"
              :src="require('@/assets/images/fill-rounded-v-icon.svg')"
            /> 
             <img v-else
              class="term-icon"
              :src="require('@/assets/images/v-rounded.png')"
            /> 
            <span>At least 8 characters</span>
          </div>
          <div class="form-term">
           <img v-if="isMix"
              class="term-icon"
              :src="require('@/assets/images/fill-rounded-v-icon.svg')"
            /> 
             <img v-else
              class="term-icon"
              :src="require('@/assets/images/v-rounded.png')"
            /> 
            <span>
            A mixture of both uppercase and lowercase letters A mixture of letters and numbers
            </span>
          </div>
          <div class="form-term">
            <img v-if="isContainsSpacial"
              class="term-icon"
              :src="require('@/assets/images/fill-rounded-v-icon.svg')"
            /> 
             <img v-else
              class="term-icon"
              :src="require('@/assets/images/v-rounded.png')"
            /> 
            <span>Inclusion of at least one special character, e.g., ! @ # ? ]</span>
          </div>
        </div>

        <button type="submit" class="">
            <template v-if="showLoading">
              <img class="auth-loading" :src="require('@/assets/images/white-loader.gif')" alt="">
            </template>
            <template v-else>Save </template>
          </button>
      </form>
      
    </div>
  </div>
</template>
<script>
//import useVuelidate from "vuelidate/core";
//import { required, minLength, sameAs } from "vuelidate/validators";
import { updateUserStatus } from "~/services/userService.js";

import { User } from "../../models/user";

export default {
  name: "CreatePassword",
  components: {  },
  data() {
    return {
      password: "",
      confirmPassword: "",
      errorMessage: "",
      showLoading: false,
      is8Char: false,
      isSame: false,
      isMix: false,
      isContainsSpacial: false,
      email:""
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
    changePassword() {
      this.isSame = this.password == this.confirmPassword;
      this.is8Char = this.password.length >= 8;
      this.isMix = (this.password.match('(?=.*?[A-Z])') != null) && (this.password.match('(?=.*?[a-z])') != null) && (this.password.match('(?=.*?[0-9])') != null);
      this.isContainsSpacial =  this.password.match('(?=.*?[#?!@$%^&*-])') != null;
    },
    createPassword: async function () {
      //let confirmPassword = await this.v$.$validate();
      //if (confirmPassword) {
        if(!this.isSame) {
          this.errorMessage = "Passwords do not match";
          return;
        } 
        if(!this.is8Char || !this.isMix || !this.isContainsSpacial ) {
          this.errorMessage = "Please fill in the fields according to the rules";
          return;
        }
        
        this.showLoading = true;
        //firebase
        const newPassword = this.password;
        const auth = this.$fire.auth
        let user = auth.currentUser;
        await user.updatePassword(newPassword).then(async () => {
          //res.password = newPassword;
          localStorage.removeItem("emailVerified");
          //init store variables
          this.$store.commit('setState',{
            state: 'curEditRP',
            value: null
          });
          this.$store.commit('setState',{
            state: 'currentUser',
            value: null
          });
          
          //save on mongo with isActive=true
          await this.updateUser(this.email, true);
            
        }).catch((err)=>{
          console.log(err);
          this.showLoading = false;
          this.errorMessage = "Internal Server Error, Please Contact us"
        });
      //}
    },
    confirmSignIn: async function () {
      if(this.$fire.auth.isSignInWithEmailLink(window.location.href)) {
        if(this.email) {
          this.$fire.auth.signInWithEmailLink(this.email, window.location.href)
          .then(async(result) => {
            // Clear email from storage.
            window.localStorage.removeItem("emailForSignIn");
            localStorage.setItem("emailVerified", true);
          })
          .catch((error) => {
            console.log("error occured in auth link");
            console.log(error);
            window.localStorage.setItem("emailForSignIn",this.email);
            this.$router.push({
              path: "/auth/register",
            });
          });
        }
      }
      else {
        this.$router.push({
          path: "/auth/register",
        });
      }
    },
    updateUser: async function (email, isActive) {
      //save on mongo with isActive=true
      let token = await this.$fire.auth.currentUser.getIdToken();
      await updateUserStatus(email, isActive, token).then((updateUser) => {
        localStorage.removeItem("currentEditedRP");
        this.$store.commit("setState", {
            value: updateUser,
            state: "currentUser",
        });
        
        this.$router.push({
          path: "/rp/create"
        });
      }).catch((err)=>{
        console.log("error in update user");
        console.log(err);
      });
    }

  },
  created: async function () {
    console.log("cerated reset pass component");
    this.email = localStorage.getItem("emailForSignIn");
    if(this.email) {
      await this.confirmSignIn(this.url);
    }
    else {
      this.$router.push({
        path: "/auth/register",
      });
    }
  },
  computed: {
    emailVerified: function () {
      return localStorage.getItem("emailVerified") == "true";
    },
  },
};
</script>
