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
    },
  computed: {},
}
</script>