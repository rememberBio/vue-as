<template> 
  <div id="wrap-auth">
    <AuthHeader/>
    <NuxtChild/>
  </div>
</template>

<script>

//comopnents
import AuthHeader from '../components/templateParts/authHeader.vue';
//css
import "@/assets/css/auth.css";

export default {
    name:"CreateRememebAuthMain",
    components: { AuthHeader },
    data() {
      return {
        token: null,
      };
    },
    methods: {
  },
   created: async function () {
     //get user token
    const updatedUser = this.$store.state.currentUser;
    if(updatedUser) {
      let email = updatedUser.email;
      let password = updatedUser.password;
      //this.token = await createToken(email,password);
    }
  },
  computed: {},
}
</script>