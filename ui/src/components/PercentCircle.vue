<template>
  <svg
    v-bind:width="border"
    v-bind:height="border"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g>
      <title>Layer 1</title>
      <circle
        id="circle"
        v-bind:r="r"
        v-bind:cy="c"
        v-bind:cx="c"
        v-bind:stroke-width="width"
        stroke="#ffffff"
        fill="none"
        v-bind:stroke-dashoffset="offset"
        v-bind:stroke-dasharray="array"
      />
    </g>
  </svg>
</template>

<style scoped>
svg {
  transform: rotate(-90deg);
}

#circle {
  transition: all 1s linear;
}
</style>

<script>
export default {
  name: "percent-circle",
  props: ["percent", "radius"],
  computed: {
    border() {
      return this.r * 2.2;
    },
    r() {
      if (this.radius) {
        return this.radius;
      }
      return 20;
    },
    c() {
      return this.border / 2;
    },
    width() {
      return this.r * 0.2;
    },
    array() {
      return 2 * this.r * 3.14;
    },
    offset() {
      if (this.percent) {
        return (1 - this.percent / 100) * 2 * this.r * 3.14;
      }
      return this.array;
    }
  }
};
</script>
