<template>
  <progress
    class="progress"
    v-bind:value="countdown"
    v-bind:max="seconds"
  ></progress>
</template>

<style scoped>
.progress {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 2px;
}
.progress::-webkit-progress-bar {
  background-color: transparent;
}
.progress::-webkit-progress-value {
  transition: all 2s ease-out;
}
</style>

<script>
export default {
  name: "countdown-bar",
  props: ["seconds"],
  data() {
    return {
      countdown: 3
    };
  },
  mounted() {
    this.countdown = this.seconds;
    this.update();
  },
  methods: {
    update() {
      setTimeout(() => {
        this.countdown += -1;
        if (this.countdown == 0) {
          this.$emit("end");
        } else {
          this.update();
        }
      }, 1000);
    }
  }
};
</script>
