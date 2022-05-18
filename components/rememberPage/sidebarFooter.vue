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
         :class="{ 'btn-lb-reverse': this.submitBtnText!='create' }" :value="this.submitBtnText">
          <a v-if="this.submitBtnText!='create'" class="btn-lb view-rp" href="">View Remember Page</a>
        </div>
    </div>
   </div>
</template>

<script>
export default {
  name: "SidebarFooter",
   data() {
    return {
      submitBtnText: 'create'
    }
  },
  methods: {
    submitForm () {
      this.$eventBus.emit('submit-form'); 
    }
  }
};
</script>

<style>

.sidebar-footer .blue-sidebar {
    display: flex;
    align-items: center;
    padding: 24px 28px;
    justify-content: space-between;
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

 