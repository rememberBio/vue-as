 <template>
 <div class="header">
        <!-- <img
      alt="lendot logo"
      class="lendot-icon"
      :src="require('@/assets/images/logo.svg')"
    /> -->
    <div class="blue-header"></div>
   </div>
</template>

<script>
export default {
  name: "Header",
};
</script>

<style>
.blue-header {
  height: 120px;
  background-color: var(--custom-blue);
  width: 100%;
}
.lendot-icon {
  position: absolute;
  top: 0;
  left: 0;
}
</style>

 