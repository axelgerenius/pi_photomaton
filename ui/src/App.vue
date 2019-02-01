<template>
  <div id="app">
    <pm-main />
  </div>
</template>

<style lang="css">
@import "../node_modules/bulma/css/bulma.min.css";

</style>

<script>
import PmMain from "./components/PmMain.vue";

export default {
  name: "app",
  components: {
    PmMain
  }
};
</script>
