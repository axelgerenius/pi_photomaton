<template>
  <div>
    <div
      v-if="!connected"
      id="health"
      class="notification is-warning has-text-centered"
    >
      Not connected to MQTT
    </div>
    <router-view></router-view>
  </div>
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
<style lang="scss">
$fa-font-path: "../node_modules/@fortawesome/fontawesome-free/webfonts";
@import "../node_modules/@fortawesome/fontawesome-free/scss/fontawesome";
@import "../node_modules/@fortawesome/fontawesome-free/scss/solid";
</style>

<style>
html {
  background-color: coral;
}
body {
  cursor: none;
  color: white;
}
::-webkit-scrollbar {
  display: none;
}
.button {
  cursor: none;
}
#health {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
}
</style>

<script>
export default {
  name: "app",
  data() {
    return {
      connected: false,
    };
  },
  mounted() {
    this.$mqtt.on("connect", () => {
      this.connected = true;
    });
  },
  beforeUpdate() {
    this.connected = this.$mqtt.connected;
  }
};
</script>
