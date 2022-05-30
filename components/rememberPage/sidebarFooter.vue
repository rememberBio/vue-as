 <template>
 <div class="sidebar-footer">
    <div class="blue-sidebar">
        <!-- <a class="wrap-icon profile flex flex-col">
          <img :src="require('@/assets/images/createPage/settings.png')"  alt="">
          <span class="font-12">Setting</span>
        </a> -->
        <div class="wrap-btns flex">
          <input type="button"
          @click="submitForm($event)" 
          v-if="this.$store.state.curEditRP&&this.$store.state.curEditRP._id"
         :class="{ 'btn-lb-reverse': this.$store.state.curEditRP._id }" :value="'update'">
          <input type="button"
          v-else
          @click="submitForm($event)" 
         :class="{ 'btn-lb-reverse': this.$store.state.curEditRP&&this.$store.state.curEditRP._id }" :value="'create'">
          <a v-if="this.$store.state.curEditRP&&this.$store.state.curEditRP._id" class="btn-lb view-rp" target="_blank" :href="$store.state.curEditRP.link">View Remember Page</a>
        </div>
        <span style="width:100%" :class="{'error-massage': $store.state.messageUpdateRP.type == 'error','success-massage': $store.state.messageUpdateRP.type == 'success',}" v-if="$store.state.messageUpdateRP.message">{{$store.state.messageUpdateRP.message}}</span>

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
    color: red;
}
span.error-massage::before {
    background: url(@/assets/images/icons/error-icon.svg) no-repeat white;
}
span.success-massage {
    color: var(--custom-light-blue);
}
span.success-massage::before {
    background: url(@/assets/images/icons/success-icon.svg) no-repeat white;
}
span[class*='-massage']::before {
    content: "";
    display: inline-block;
    border: none;
    width: 14px;
    height: 14px;
    min-width: 14px;
}
span[class*='-massage'] {
  background: #FBFBFB 0% 0% no-repeat padding-box;
  box-shadow: 0px -1px 6px #00000029;
  position: absolute;
  min-height: 52px;
  bottom: 88px;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 19px;
  gap: 8px;
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
  margin-left: auto;
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

 