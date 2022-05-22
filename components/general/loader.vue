<template>
  <div class="loader">
    <img :src="require('@/assets/images/loader.gif')" alt="">
    <div v-if="$store.state.loaderMessage">{{$store.state.loaderMessage}}</div>
  </div>
</template>

<script>
export default {
 name: "Loader",
};
</script>

<style>
</style>