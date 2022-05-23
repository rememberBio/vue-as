<template>
  <div class="page-container">
    <Header />
    <div class="login">
      <div class="register-link" >New to Remember?  <NuxtLink to="/auth/register" > Create an Account</NuxtLink></div>
      <form @submit.prevent="login">
      

        <label class="form-label">Email Address</label>
        <div class="wrap-input">
          <input
            type="text"
            name="email"
            v-model="email"/>
         
        </div>
       

        <label class="form-label"> Password</label>
        <div class="wrap-input wrap-password">
          <input
            type="password"
            name="password"
            :id="'password_field' + 1"
            class="password-field"
             v-model="password"
          />
        </div>
      
        <button type="submit" class="">Log In</button>
      </form>
     <div v-if="errorMessage">{{errorMessage}}</div>
    </div>
  </div>
</template>
<script>
import Header from "~/components/templateParts/header.vue";
import { getUserByEmailAndPassword } from "~/services/userService.js";

export default {
  components: { Header },
  name: "login",
  data() {
    return {
      password: "",
      email: "",
      errorMessage:""
    };
  },
  methods: {
    showPassword(event, id) {
      let password = document.getElementById("password_field" + id);
      let type;
      if (password.getAttribute("type") === "password") {
        type = "text";
      } else {
        type = "password";
      }
      password.setAttribute("type", type);
    },
    async login() {
      let email = this.email;
      let password = this.password;
      let self = this;
      await this.$fire.auth
        .signInWithEmailAndPassword(email, password)
        .then( async (response) => {
          await self.getLoginUser(email,password);
        })
        .catch((error) => {
          if(error.code == "auth/user-not-found")
            this.errorMessage = "incorrect username";
          else if(error.code == 'auth/wrong-password') 
            this.errorMessage = "incorrect password";
          else
            this.errorMessage = error.message;
        });
    },
    async getLoginUser(email,password) {
      const self = this;
      getUserByEmailAndPassword(email,password).then((response) => {
        localStorage.setItem("currentUser", JSON.stringify(response));
        self.$router.push({
            path: "/rp/main/create"
        });
      });
    },
  },
};
</script>

<style scoped>
.login {
  margin: auto;
  max-width: 808px;
  color: var(--custom-blue);
}

.register-link {
  margin-top: 10px;
  margin-bottom: 47px;
  font-size: 20px;
  font-weight: 500;
}
.register-link a {
  text-decoration: underline;
  color: var(--custom-blue);
}
button[type="submit"] {
  margin-top: 70px;
}
.forgot-password {
  margin-top: 10px;
  text-align: right;
  color: var(--custom-pink);
}
</style>