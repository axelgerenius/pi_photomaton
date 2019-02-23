<template>
  <div>
    <transition v-bind:enter-active-class="animation" mode="out-in">
      <h1 v-if="showCountdown" class="title" v-bind:key="countdown">
        {{ countdown }}
      </h1>
      <h1 v-if="showSmile" class="title">{{ finalText }}</h1>
    </transition>
  </div>
</template>

<script>
export default {
  name: "countdown",
  props: ["seconds", "text", "animated"],
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
