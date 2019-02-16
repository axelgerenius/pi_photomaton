<template>
  <transition enter-active-class="animated heartBeat" mode="out-in">
    <h1 v-if="showCountdown" class="title" v-bind:key="countdown">
      {{ countdown }}
    </h1>
    <h1 v-if="showSmile" class="title">Say cheese !</h1>
  </transition>
</template>

<script>
export default {
  name: "countdown",
  props: ["seconds"],
  data() {
    return {
      countdown: 3,
      showCountdown: true,
      showSmile: false
    };
  },
  mounted() {
    this.countdown = this.seconds;
    this.showCountdown = true;
    this.update();
  },
  methods: {
    update() {
      setTimeout(() => {
        this.countdown += -1;
        if (this.countdown == 0) {
          this.showCountdown = false;
          this.showSmile = true;
          this.$emit('end');
        } else {
          this.update();
        }
      }, 1000);
    }
  }
};
</script>
