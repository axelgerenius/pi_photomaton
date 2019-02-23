<template>
  <div id="gallery">
    <div v-if="isLoading" class="hero is-fullheight has-text-centered">
      <div class="line-scale">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
    <div v-else class="columns is-multiline">
      <div
        v-for="image in pageContent"
        v-bind:key="image.timestamp"
        class="column is-one-fifth"
      >
        <figure class="image is-4by3">
          <a v-bind:href="`${path}${image.image}`">
            <img v-bind:src="`${path}thumbnails/${image.image}`" alt="" />
          </a>
        </figure>
      </div>
    </div>
    <div class="level">
      <div class="level-left">
        <div
          v-if="currentPage > 1"
          class="level-item"
          v-on:click="goPrevious()"
        >
          <i class="fas fa-chevron-left fa-3x"></i>
        </div>
      </div>
      <div class="level-item">
        <i v-on:click="goBack()" class="fas fa-chevron-down fa-3x"></i>
      </div>
      <div class="level-right">
        <div
          v-if="totalPage > currentPage"
          class="level-item"
          v-on:click="goNext()"
        >
          <i class="fas fa-chevron-right fa-3x"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
#gallery {
  margin: 1em;
  color: white;
}
.level {
  padding-left: 1em;
  padding-right: 1em;
}
</style>

<script>
import config from "../config.js";

export default {
  name: "gallery",
  props: ["page"],
  data() {
    return {
      isLoading: true,
      images: [],
      path: `http://${config.host}/images/`,
      pageLimit: 15
    };
  },
  computed: {
    currentPage() {
      return this.page ? Number.parseInt(this.page) : 1;
    },
    totalPage() {
      let count = Math.round(this.images.length / this.pageLimit);
      if (this.images.length % this.pageLimit > 0) count += 1;
      return count;
    },
    pageContent() {
      if (this.isLoading) return [];
      return this.images.slice(
        (this.currentPage - 1) * this.pageLimit,
        this.currentPage * this.pageLimit
      );
    }
  },
  mounted() {
    this.$mqtt.on("photomaton/list", () => {
      this.connected = true;
    });
    this.$mqtt.on("message", (topic, message, packet) => {
      console.log(topic, message.toString(), packet);
      switch (topic) {
        case config.mqttTopicListResult:
          this.images = JSON.parse(message.toString());
          this.isLoading = false;
          break;

        default:
          break;
      }
    });
    this.$mqtt.subscribe(config.mqttTopicListAsk);
    this.$mqtt.subscribe(config.mqttTopicListResult);
    this.$mqtt.publish(config.mqttTopicListAsk);
  },
  methods: {
    goNext() {
      this.$router.replace({ path: `/gallery/${this.currentPage + 1}` });
    },
    goPrevious() {
      this.$router.replace({ path: `/gallery/${this.currentPage - 1}` });
    },
    goBack() {
      this.$router.go(-1);
    }
  }
};
</script>
