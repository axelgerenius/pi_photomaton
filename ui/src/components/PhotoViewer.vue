<template>
  <div>
    <transition enter-active-class="animated fadeIn">
      <figure v-show="show">
        <img
          v-bind:src="file"
          v-on:load="showPhoto()"
          v-on:error="showError()"
        />
      </figure>
    </transition>
    <p v-if="error">Error during photo load</p>
  </div>
</template>

<style scoped>
figure {
  box-shadow: 0px 0px 10px gray;
  padding: 1em 1em 2.6em 1em;
  background: white;
  margin: 1em;
  border: 1px #ccc solid;
}
img {
  border: 1px #ccc solid;
}
</style>

<script>
export default {
  name: "photo-viewer",
  props: ["src"],
  data() {
    return {
      file: "",
      show: false,
      error: false
    };
  },
  mounted() {
    this.show = false;
    this.file = this.src;
  },
  watch: {
    // whenever question changes, this function will run
    src: function(newSrc, oldSrc) {
      console.log(newSrc, oldSrc);
      this.loadPhoto(newSrc);
    }
  },
  methods: {
    loadPhoto(file) {
      this.show = false;
      this.error = false;
      this.file = file;
    },
    showPhoto() {
      this.show = true;
      this.$emit("load");
    },
    showError() {
      this.error = true;
    }
  }
};
</script>
