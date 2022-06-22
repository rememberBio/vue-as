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
import { getUserRp } from "~/services/userService";

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
        this.setRpStoreFromUser();
        this.$nuxt.error({ statusCode: 404, message: 'Page not found' })
      },
      async setRpStoreFromUser() {
        //Get last edited page from cookie
        if (!this.$store.state.curEditRP) {
          let currendEditedFromUser = await this.getUserRpObj();
          if(!currendEditedFromUser) {
            let rpStorage = localStorage.getItem('currentEditedRP');
            if(rpStorage) {
              rpStorage = JSON.parse(rpStorage);
            }
            else {
              rpStorage = new rememberPage();
            }
            currendEditedFromUser = rpStorage;
          } else {
            currendEditedFromUser.attributes.dateOfBirth = this.convertDateToDatePickerVal(currendEditedFromUser.attributes.dateOfBirth);
            currendEditedFromUser.attributes.dateOfDeath = this.convertDateToDatePickerVal(currendEditedFromUser.attributes.dateOfDeath);
            currendEditedFromUser.attributes.stories.forEach( story => story.date = this.convertDateToDatePickerVal(story.date) );
          }

          this.$store.commit("setState", {
            value: currendEditedFromUser,
            state: "curEditRP",
          });
          localStorage.setItem('currentEditedRP',JSON.stringify(currendEditedFromUser));
        }
      },
      async getUserRpObj() {
        const userToken = await this.$fire.auth.currentUser.getIdToken();
        try {
          const rp = await getUserRp(userToken);
          return rp;
        } catch (error) {
          return null;
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
        //save on mongo with isActive=true
        let token = await this.$fire.auth.currentUser.getIdToken();
        await getRememberPageById( rpId,token ).then(async (rememberPage) => {
          rememberPage = rememberPage.data;

          rememberPage.attributes.dateOfBirth = this.convertDateToDatePickerVal(rememberPage.attributes.dateOfBirth);
          rememberPage.attributes.dateOfDeath = this.convertDateToDatePickerVal(rememberPage.attributes.dateOfDeath);
          rememberPage.attributes.stories.forEach( story => story.date = this.convertDateToDatePickerVal(story.date) );

          localStorage.setItem('currentEditedRP',JSON.stringify(rememberPage));
          await this.setRpStoreFromUser();
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
        try {
          await this.setRpStoreFromUser();

        } catch (error) {
          console.log(error)
        }
        this.completeCreated = true;
        this.setLoadingMessage('');
      }
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