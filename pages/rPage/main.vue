<template>
  <div class="flex">
    <div class="left-side">
        <SidebarHeader />
        <NuxtChild/>
        <SidebarFooter />
    </div>
    <div class="right-side">
        <remeberPageDemo />
    </div>
  </div>
</template>

<script>
import remeberPageDemo from "../../components/rememberPage/remeberPageDemo.vue";
import SidebarFooter from '../../components/rememberPage/sidebarFooter.vue';
import SidebarHeader from '../../components/rememberPage/sidebarHeader.vue';
import { RememberPage } from '../../models/rememberPage';

import { createToken } from '../../services/user-service';
import "@/assets/css/mainRememberPage.css";

export default {
    name:"CreateRememebrPageMain",
    components: { remeberPageDemo,SidebarHeader,SidebarFooter },
    data() {
      return {
        token: null,
      };
    },
    methods: {
    reidrect: function () {
      
      if (!this.isSignIn) {
        this.$router.push({          // I've tried push and replace
          path: "/auth/login"
        });
      }
    },
   
  },
   created: async function () {
     //get user token
    const updatedUser = JSON.parse(localStorage.getItem("currentUser"));
    if(updatedUser) {
      let email = updatedUser.email;
      let password = updatedUser.password;
      //this.token = await createToken(email,password);
    }
    if(!this.$store.state.curEditRP) {
      this.$store.commit("setState", {
        value: new RememberPage(),
        state: "curEditRP",
      });
    }
    this.reidrect();
  },
  computed: {
    isSignIn: function () {
      let currentUser = localStorage.getItem("currentUser");
      if(currentUser!=null) {
        currentUser = JSON.parse(currentUser);
        return currentUser.isActive;
      }
      return false;
    },
  },
}
</script>