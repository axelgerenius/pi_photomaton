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
      <div class="column is-one-fifth" v-for="n in 15" v-bind:key="n">
        <figure class="image is-4by3">
          <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image">
        </figure>
      </div>
    </div>
    <div class="level">
      <div class="level-left">
        <div class="level-item">
          <i class="fas fa-chevron-left fa-3x"></i>
        </div>
      </div>
      <div class="level-right">
        <div class="level-item">
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
  data() {
    return {
      isLoading: true
    };
  },
  mounted() {
    this.$mqtt.on("photomaton/list", () => {
      this.connected = true;
    });
    this.$mqtt.on("message", (topic, message, packet) => {
      console.log(topic, message.toString(), packet);
      switch (topic) {
        case config.mqttTopicListResult:
          this.isLoading = false;
          break;

        default:
          break;
      }
    });
    this.$mqtt.subscribe(config.mqttTopicListAsk);
    this.$mqtt.subscribe(config.mqttTopicListResult);
    this.$mqtt.publish(config.mqttTopicListAsk);
  }
};
</script>
