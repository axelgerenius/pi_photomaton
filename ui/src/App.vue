<template>
  <router-view></router-view>
</template>

<style lang="sass">
$danger: coral;
$primary: #00b2b2;
$size-1: 6rem;
$size-2: 5rem;
$size-3: 4rem;
$size-4: 3rem;
$size-5: 2rem;
$size-6: 1.5rem;
$size-7: 1rem;
@import "node_modules/bulma/bulma.sass"
</style>
<style lang="css">
@import "../node_modules/animate.css/animate.css";
@import "../node_modules/loaders.css/loaders.css";
</style>

<style>
body {
  cursor: none;
}
::-webkit-scrollbar {
  display: none;
}
.button {
  cursor: none;
}
</style>

<script>
export default {
  name: "app",
};
</script>
