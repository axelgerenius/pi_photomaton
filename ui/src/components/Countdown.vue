<template>
  <transition enter-active-class="animated heartBeat" mode="out-in">
    <h1 v-if="showCountdown" class="title" v-bind:key="countdown">
      {{ countdown }}
    </h1>
    <h1 v-if="showSmile" class="title">Say cheese !</h1>
  </transition>
</template>

<script>
import config from "../config.js";

export default {
  name: "countdown",
  data() {
    return {
      countdown: config.countdownTime,
      showCountdown: true,
      showSmile: false
    };
  },
  mounted() {
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
          this.$mqtt.publish(config.mqttTopicTakePhoto, "go");
        } else {
          this.update();
        }
      }, 1000);
    }
  }
};
</script>
