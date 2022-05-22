<template> 
  <div class="flex">
    <div class="wrap-loader" v-if="$store.state.playLoader">
      <Loader/>
    </div>
    <div class="left-side sidebar rp-scroll">
        <SidebarHeader />
        <NuxtChild/>
        <SidebarFooter />
    </div>
    <div class="right-side">
        <rememberPageDemo />
    </div>

  </div>
</template>

<script>
import rememberPageDemo from "../../components/rememberPage/rememberPageDemo.vue";
import SidebarFooter from '../../components/rememberPage/sidebarFooter.vue';
import SidebarHeader from '../../components/rememberPage/sidebarHeader.vue';
import Loader from '../../components/general/loader.vue';
import { rememberPage } from '../../models/rememberPage';

import { createToken } from '../../services/userService';
import "@/assets/css/mainRememberPage.css";

export default {
    name:"CreateRememebrpMain",
    components: { rememberPageDemo,SidebarHeader,SidebarFooter,Loader },
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
        value: new rememberPage(),
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