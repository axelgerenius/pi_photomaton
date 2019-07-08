<template>
  <div v-bind:style="style"></div>
</template>

<style scoped>
div {
  position: absolute;
  height: 100%;
  width: 100%;
  background-repeat: no-repeat;
  background-position-x: center;
  background-position-y: center;
  background-attachment: fixed;
  background-size: cover;
  transition: background-image 2s ease;
}
</style>

<script>
export default {
  name: "background",
  data() {
    return {
      duration: this.$config.backgroundDuration * 1000,
      current: 0
    };
  },
  computed: {
    file() {
      return this.$config.backgroundImages[this.current];
    },
    style() {
      return `background-image: url(${this.file});`;
    }
  },
  mounted() {
    this.tick();
  },
  methods: {
    tick() {
      setTimeout(() => {
        this.current += 1;
        if (this.current >= this.$config.backgroundImages.length)
          this.current = 0;
        this.tick();
      }, this.duration);
    }
  }
};
</script>
