 <template>
 <div class="sidebar-header">
    <div class="blue-sidebar flex">
      <div class="logo">
        <img :src="require('@/assets/images/white-logo.png')"  alt="">
      </div>
      <div class="wrap-icons flex">
        <a class="wrap-icon profile flex flex-col">
          <img :src="require('@/assets/images/createPage/profile.svg')"  alt="">
          <span class="font-12">Edit profile</span>
        </a>
        <a class="wrap-icon notification flex flex-col">
          <img :src="require('@/assets/images/createPage/notifications.svg')"  alt="">
          <span class="font-12">notifications</span>
        </a>
      </div>
    </div>
   </div>
</template>

<script>
export default {
  name: "SidebarHeader",
};
</script>

<style>
.blue-sidebar {
  height: 88px;
  background-color: var(--custom-blue);
  width: 100%;
  color: white;
}
.sidebar-header .blue-sidebar {
    padding: 24px 28px;
    align-items: center;
    column-gap: 20%;
}
.blue-sidebar .wrap-icon {
  text-align: center;
  align-items: center;
  gap: 2px;
  color: white;
  justify-content: space-between;
}
.blue-sidebar .wrap-icons {
  gap: 10px;
}
.blue-sidebar .wrap-icon img {
  width: max-content;
}
.blue-sidebar .logo img {
  min-width: max-content;
}
.blue-sidebar .wrap-icon span {
  width: max-content;
}
.sidebar-header {
    position: fixed;
    width: 29%;
    z-index: 999;
}
</style>

 