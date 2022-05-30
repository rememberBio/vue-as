<template> 
  <div class="flex" >
    <div class="wrap-loader" v-if="!completeCreated">
      <Loader/>
    </div>
    <div class="wrap-sidebar-loader" v-if="$store.state.playLoader">
      <Loader/>
    </div>
    <div class="left-side sidebar rp-scroll" v-if="completeCreated">
        <SidebarHeader />
        <NuxtChild/>
        <SidebarFooter />
    </div>
    <div class="right-side" v-if="completeCreated">
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

import { rememberPage } from "~/models/rememberPage";
import { getRememberPageById } from "~/services/rememberPageService";

import moment from 'moment';

import "@/assets/css/mainRememberPage.css";

export default {
    name:"CreateRememebrpMain",
    components: { rememberPageDemo,SidebarHeader,SidebarFooter,Loader,RPFooter,RPHeader },
    
    data() {
      return {
        completeCreated : false
      };
    },
    methods: {
      accessToNotAllowedPage() {
        localStorage.removeItem('currentEditedRP');
        this.setRpStoreFromLocalStorage();
        this.$nuxt.error({ statusCode: 404, message: 'Page not found' })
      },
      setRpStoreFromLocalStorage() {
        //Get last edited page from cookie
        if (!this.$store.state.curEditRP) {
          let currendEditedFromLocalStorage = localStorage.getItem('currentEditedRP');
          if(!currendEditedFromLocalStorage) {
            currendEditedFromLocalStorage = new rememberPage();
            localStorage.setItem('currentEditedRP',JSON.stringify(currendEditedFromLocalStorage));
          } else {
            currendEditedFromLocalStorage = JSON.parse(currendEditedFromLocalStorage);
          }    

          this.$store.commit("setState", {
            value: currendEditedFromLocalStorage,
            state: "curEditRP",
          });
        }
      },
      convertDateToDatePickerVal: function (value) {
        if(value){
            if(typeof(value) != 'string') value = String(value);
            value = moment(value).format('YYYY-MM-DD');
            return value;
        }
      },
      setLoadingMessage(loaderMessage) {
        this.$store.commit('setState',{ 
          state: 'loaderMessage',
          value: loaderMessage
        })
      }
    },
    created: async function () {
      const rpId = this.$route.query['rp-id'];
      this.setLoadingMessage('Loading...');
      if( rpId ) {
        console.log('ther are rpId: ',rpId);
        let token = await this.$store.getters.getUserToken;
        await getRememberPageById( rpId,token ).then((rememberPage) => {
          console.log('get remember Page By Id');
          rememberPage = rememberPage.data;

          rememberPage.attributes.dateOfBirth = this.convertDateToDatePickerVal(rememberPage.attributes.dateOfBirth);
          rememberPage.attributes.dateOfDeath = this.convertDateToDatePickerVal(rememberPage.attributes.dateOfDeath);
          rememberPage.attributes.stories.forEach( story => story.date = this.convertDateToDatePickerVal(story.date) );

          localStorage.setItem('currentEditedRP',JSON.stringify(rememberPage));
          this.setRpStoreFromLocalStorage();
          this.completeCreated = true;
          this.setLoadingMessage('');
        }).catch((err) => {
          console.log( 'access To Not Allowed Page' );
          console.log(err);
          this.accessToNotAllowedPage();
          this.completeCreated = true;
          this.setLoadingMessage('');
        });
      } else {
        console.log("not get id param. go to func");
        this.setRpStoreFromLocalStorage();
        this.completeCreated = true;
        this.setLoadingMessage('');
      }
      console.log('end before create function');
    },
    computed: {},
}
</script>

<style>

.wrap-loader {
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
}

.wrap-loader .loader {
    width: 100%;
}
.wrap-loader .loader img {
    width: 4%;
    margin: auto;
    display: block;
}

@media screen and (max-width:900px) {
  .wrap-loader .loader img {
    width: 10%;
  }
}
</style>