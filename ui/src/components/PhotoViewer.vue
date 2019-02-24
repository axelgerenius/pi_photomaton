<template>
  <div>
    <transition enter-active-class="animated fadeIn">
      <figure v-show="isLoaded">
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
  /*padding: 1em 1em 2.6em 1em;
  background: white;*/
  margin: 10px;
  /*border: 1px #ccc solid;*/
}
img {
  max-height: -webkit-fill-available;
  display: block;
  margin: auto;
}
</style>

<script>
export default {
  name: "photo-viewer",
  props: ["src"],
  data() {
    return {
      file: "",
      isLoaded: false,
      error: false
    };
  },
  computed: {
    style() {
      return `max-height: ${document.body.clientHeight}px; 
              max-width: ${document.body.clientWidth}px;`;
    }
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
      this.isLoaded = false;
      this.error = false;
      this.file = file;
    },
    showPhoto() {
      this.isLoaded = true;
      this.$emit("load");
    },
    showError() {
      this.error = true;
    }
  }
};
</script>
