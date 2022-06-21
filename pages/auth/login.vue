<template>
    <div class="login auth-page">
      <h1>LOGIN</h1>
      <div class="auth-link" >Log in to continue, or  <NuxtLink to="/auth/register" >sign up</NuxtLink> instead</div>
      <div class="wrap-auth">
        <form @submit.prevent="login">
        
          <div class="wrap-field">
            <label class="form-label">Email Address</label>
            <div class="wrap-input">
              <input
                required
                type="text"
                name="email"
                placeholder="Email Address"
                v-model="email"/>
            </div>
          </div>
          <div class="wrap-field">
            <label class="form-label"> Password</label>
            <div class="wrap-input wrap-password">
              <input
                required
                type="password"
                name="password"
                :id="'password_field' + 1"
                class="password-field"
                v-model="password"
                placeholder="Password"
              />
              <img
              class="show-password"
              alt="edit icon"
              :src="require('@/assets/images/show-password.svg')"
              @click="(event) => showPassword(event, 1)"
              />
            </div>
          </div>
          <div class='auth-error-message' v-if="errorMessage">{{errorMessage}}</div>
          <button type="submit" class="">
            <template v-if="showLoading">
              <img class="auth-loading" :src="require('@/assets/images/white-loader.gif')" alt="">
            </template>
            <template v-else>Log In </template>
          </button>
          
        </form>
        </div>
      </div>
</template>

<script>

import { getUserByEmail } from "~/services/userService.js";

export default {
  components: {  },
  name: "login",
  data() {
    return {
      password: "",
      email: "",
      errorMessage:"",
      showLoading: false
    };
  },
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
    async login() {
      let email = this.email;
      let password = this.password;
      let self = this;
      this.showLoading = true;
      await this.$fire.auth
        .signInWithEmailAndPassword(email, password)
        .then( async (response) => {
          await self.getLoginUser(email);
          this.showLoading = false;
        })
        .catch((error) => {
          if(error.code == "auth/user-not-found")
            this.errorMessage = "incorrect username";
          else if(error.code == 'auth/wrong-password') 
            this.errorMessage = "incorrect password";
          else
            this.errorMessage = error.message;
          this.showLoading = false;
        });
    },
    async getLoginUser(email) {
      const self = this;
      getUserByEmail(email).then((response) => {
        this.$store.commit("setState", {
            value: response,
            state: "currentUser",
        });
        localStorage.removeItem("currentEditedRP");
        let redirectTo = self.$route.query['redirect-to'];
        if(redirectTo) 
          self.$router.push({
              path: redirectTo
          });
        else
          self.$router.push({
              path: "/rp/create"
          });
      });
    },
  },
};
</script>