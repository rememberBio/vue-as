 <template>
 <div class="sidebar-footer">
    <div class="blue-sidebar">
        <a class="wrap-icon profile flex flex-col">
          <img :src="require('@/assets/images/createPage/settings.png')"  alt="">
          <span class="font-12">Setting</span>
        </a>
        <div class="wrap-btns flex">
          <input type="button"
          @click="submitForm($event)" 
          v-if="this.$store.state.curEditRP._id"
         :class="{ 'btn-lb-reverse': this.$store.state.curEditRP._id }" :value="'update'">
          <input type="button"
          v-else
          @click="submitForm($event)" 
         :class="{ 'btn-lb-reverse': this.$store.state.curEditRP._id }" :value="'create'">
          <a v-if="this.$store.state.curEditRP._id" class="btn-lb view-rp" target="_blank" :href="$store.state.curEditRP.link">View Remember Page</a>
        </div>
        <span style="width:100%" class="error-massage" v-if="$store.state.errorUpdateRP">{{$store.state.errorUpdateRP}}</span>

    </div>
   </div>
</template>

<script>
export default {
  name: "SidebarFooter",
   data() {
    return {}
  },
  methods: {
    submitForm () {
      this.$eventBus.emit('submit-form'); 
    }
  },
};
</script>

<style scoped>
span.error-massage {
    width: 100%;
    text-align: center;
}
.sidebar-footer .blue-sidebar {
    display: flex;
    align-items: center;
    padding: 24px 28px;
    justify-content: space-between;
    flex-wrap: wrap;
}
.sidebar-footer .blue-sidebar .wrap-btns {
  gap: 10px;
}
a.btn-lb.view-rp:before {
    content: "";
    width: 18px;
    height: 14px;
    background-image: url('~assets/images/createPage/eye.svg');
    display: inline-block;
    background-size: contain;
    margin-right: 5px;
}
a.btn-lb.view-rp {
    display: flex;
    align-items: center;
}
</style>

 