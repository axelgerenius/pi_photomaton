<template>
  <div id="app">
    <photo-taker />
  </div>
</template>

<style lang="css">
@import "../node_modules/bulma/css/bulma.css";
@import "../node_modules/animate.css/animate.css";
</style>

<script>
import PhotoTaker from "./components/PhotoTaker.vue";

export default {
  name: "app",
  components: {
    PhotoTaker
  }
};
</script>
