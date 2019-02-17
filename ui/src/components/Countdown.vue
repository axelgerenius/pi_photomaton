<template>
  <div>
    <div v-if="circle" id="CircleContainer">
      <percent-circle v-bind:percent="percent" radius="10" />
    </div>
    <transition v-else v-bind:enter-active-class="animation" mode="out-in">
      <h1 v-if="showCountdown" class="title" v-bind:key="countdown">
        {{ countdown }}
      </h1>
      <h1 v-if="showSmile" class="title">{{ finalText }}</h1>
    </transition>
  </div>
</template>

<style scoped>
#CircleContainer {
  margin-top: -20px;
}
</style>

<script>
import PercentCircle from "./PercentCircle.vue";

export default {
  name: "countdown",
  props: ["seconds", "text", "animated", "circle"],
  components: {
    PercentCircle
  },
  data() {
    return {
      countdown: 3,
      showCountdown: true,
      showSmile: false
    };
  },
  computed: {
    animation() {
      if (this.animated) {
        if (this.countdown == 0) return "animated bounceIn";
        else return "animated heartBeat";
      }
      return "";
    },
    finalText() {
      return this.text;
    },
    percent() {
      return (1 - (this.countdown - 1) / this.seconds) * 100;
    }
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
          this.$emit("end");
        } else {
          this.update();
        }
      }, 1000);
    }
  }
};
</script>
