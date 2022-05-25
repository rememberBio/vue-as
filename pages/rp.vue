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
        <RPHeader/>
        <rememberPageDemo />
        <RPFooter/>
    </div>

  </div>
</template>

<script>
import rememberPageDemo from "../components/rememberPage/rememberPageDemo.vue";
import SidebarFooter from '../components/rememberPage/sidebarFooter.vue';
import SidebarHeader from '../components/rememberPage/sidebarHeader.vue';
import RPFooter from '../components/rememberPage/rememberPageFooter.vue';
import RPHeader from '../components/rememberPage/rememberPageHeader.vue';
import Loader from '../components/general/loader.vue';


import "@/assets/css/mainRememberPage.css";

export default {
    name:"CreateRememebrpMain",
    components: { rememberPageDemo,SidebarHeader,SidebarFooter,Loader,RPFooter,RPHeader },
    data() {
      return {
        token: null,
      };
    },
    methods: {
  },
   created: async function () {
  },
  computed: {},
}
</script>